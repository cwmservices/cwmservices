import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import {data} from "../../data";

// Prevent Next.js 13 static-cache streaming optimisation that causes
// ERR_INVALID_STATE when the internal flush timer fires after the stream closes.
export const dynamic = 'force-dynamic';

export const GET = (req:Request,res:Response)=>{
    return NextResponse.json(data);
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // Max 5 submissions per hour per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  
  // Remove old requests outside the window
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, requestType, message } = body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { error: "Invalid name" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!requestType || !['Service Request', 'Career Opportunity'].includes(requestType)) {
      return NextResponse.json(
        { error: "Invalid request type" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 2000) {
      return NextResponse.json(
        { error: "Invalid message" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use SMTP settings
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use App Password for Gmail
      },
    });

    // HTML email template for admin notification
    const adminEmailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0A0B10; color: #f3f4f6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0B10; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #12141D; border-radius: 12px; overflow: hidden; border: 1px solid #1E2028; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 30px; text-align: center; border-bottom: 1px solid #1E2028;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">New Request Received</h1>
                  <p style="margin: 8px 0 0; color: #8b949e; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">CWM Services</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="background-color: #1A1C24; border-left: 3px solid #6366f1; padding: 16px; margin-bottom: 30px; border-radius: 0 6px 6px 0;">
                    <p style="margin: 0; color: #a5b4fc; font-weight: 600; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Type: \${requestType}</p>
                  </div>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <tr>
                      <td style="padding: 16px 0; border-bottom: 1px solid #1E2028;">
                        <strong style="color: #8b949e; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name</strong>
                      </td>
                      <td style="padding: 16px 0; border-bottom: 1px solid #1E2028; text-align: right;">
                        <span style="color: #e5e7eb; font-size: 16px; font-weight: 500;">\${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 16px 0; border-bottom: 1px solid #1E2028;">
                        <strong style="color: #8b949e; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                      </td>
                      <td style="padding: 16px 0; border-bottom: 1px solid #1E2028; text-align: right;">
                        <a href="mailto:\${email}" style="color: #818cf8; text-decoration: none; font-size: 16px; font-weight: 500;">\${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 16px 0; border-bottom: 1px solid #1E2028;">
                        <strong style="color: #8b949e; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Date</strong>
                      </td>
                      <td style="padding: 16px 0; border-bottom: 1px solid #1E2028; text-align: right;">
                        <span style="color: #9ca3af; font-size: 14px;">\${new Date().toLocaleString('en-US', { 
                          dateStyle: 'medium', 
                          timeStyle: 'short' 
                        })}</span>
                      </td>
                    </tr>
                  </table>
                  
                  <div>
                    <strong style="display: block; color: #8b949e; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Message</strong>
                    <div style="background-color: #0A0B10; padding: 24px; border-radius: 8px; border: 1px solid #1E2028;">
                      <p style="margin: 0; color: #d1d5db; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">\${message}</p>
                    </div>
                  </div>
                  
                  <div style="margin-top: 40px; text-align: center;">
                    <a href="mailto:\${email}?subject=Re: \${requestType} - CWM Services" 
                       style="display: inline-block; background-color: #ffffff; color: #0A0B10; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; transition: opacity 0.2s;">
                      Reply to \${name}
                    </a>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #0A0B10; padding: 24px; text-align: center; border-top: 1px solid #1E2028;">
                  <p style="margin: 0; color: #6b7280; font-size: 13px;">
                    Secure notification from CWM Services
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    // HTML email template for customer auto-reply
    const customerEmailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Us</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0A0B10; color: #f3f4f6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0B10; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #12141D; border-radius: 12px; overflow: hidden; border: 1px solid #1E2028; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 30px; text-align: center; border-bottom: 1px solid #1E2028;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Message Received</h1>
                  <p style="margin: 10px 0 0; color: #8b949e; font-size: 15px;">Thank you for reaching out, \${name}</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 24px; color: #d1d5db; font-size: 16px; line-height: 1.7;">
                    Hi \${name},
                  </p>
                  
                  <p style="margin: 0 0 30px; color: #d1d5db; font-size: 16px; line-height: 1.7;">
                    We've successfully received your <strong style="color: #ffffff;">\${requestType.toLowerCase()}</strong> request. Our team will review your inquiry and get back to you shortly.
                  </p>
                  
                  <div style="background-color: #1A1C24; border-left: 3px solid #6366f1; padding: 24px; margin-bottom: 30px; border-radius: 0 6px 6px 0;">
                    <p style="margin: 0 0 12px; color: #e5e7eb; font-weight: 600; font-size: 15px;">What's next?</p>
                    <ul style="margin: 0; padding-left: 20px; color: #9ca3af; font-size: 15px; line-height: 1.8;">
                      <li style="margin-bottom: 8px;">We typically respond within 24-48 hours.</li>
                      <li style="margin-bottom: 8px;">We'll reach out to you directly at <span style="color: #e5e7eb;">\${email}</span>.</li>
                      <li>You'll receive a detailed, personalized response.</li>
                    </ul>
                  </div>
                  
                  <div style="background-color: #0A0B10; border: 1px solid #1E2028; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
                    <h3 style="margin: 0 0 16px; color: #e5e7eb; font-size: 15px; font-weight: 600;">Request Summary</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #1E2028; color: #8b949e; font-size: 14px;">Type</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #1E2028; color: #d1d5db; font-size: 14px; text-align: right; font-weight: 500;">\${requestType}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #8b949e; font-size: 14px;">Date</td>
                        <td style="padding: 10px 0; color: #d1d5db; font-size: 14px; text-align: right;">\${new Date().toLocaleString('en-US', { 
                          dateStyle: 'medium', 
                          timeStyle: 'short' 
                        })}</td>
                      </tr>
                    </table>
                  </div>
                  
                  <p style="margin: 0 0 24px; color: #9ca3af; font-size: 15px; line-height: 1.7;">
                    If you need immediate assistance or want to add more details, simply reply to this email.
                  </p>
                  
                  <p style="margin: 0; color: #d1d5db; font-size: 16px; line-height: 1.7;">
                    Best regards,<br>
                    <strong style="color: #ffffff;">The CWM Services Team</strong>
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #0A0B10; padding: 30px 20px; text-align: center; border-top: 1px solid #1E2028;">
                  <p style="margin: 0 0 8px; color: #e5e7eb; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">
                    CWM Services
                  </p>
                  <p style="margin: 0; color: #6b7280; font-size: 13px;">
                    Building the future of digital solutions.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: `"CWM Services Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || "masood@cwmservices.dev",
      subject: `New ${requestType}: ${name}`,
      html: adminEmailHTML,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nRequest Type: ${requestType}\nMessage: ${message}\n\nSubmitted: ${new Date().toLocaleString()}`,
    });

    // Send auto-reply to customer
    await transporter.sendMail({
      from: `"CWM Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your message - CWM Services`,
      html: customerEmailHTML,
      text: `Hi ${name},\n\nThank you for reaching out to us! We've successfully received your ${requestType.toLowerCase()} and our team will review it shortly.\n\nWhat happens next?\n- Our team will review your message within 24-48 hours\n- We'll reach out to you at ${email}\n- You'll receive a personalized response addressing your inquiry\n\nBest regards,\nThe CWM Services Team`,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}