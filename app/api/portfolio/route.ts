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
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">New Contact Form Submission</h1>
                  <p style="margin: 10px 0 0; color: #f0f0f0; font-size: 14px;">CWM Services</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #667eea; font-weight: bold; font-size: 16px;">Request Type: ${requestType}</p>
                  </div>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                        <strong style="color: #495057; font-size: 14px;">Name:</strong>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                        <span style="color: #212529; font-size: 14px;">${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                        <strong style="color: #495057; font-size: 14px;">Email:</strong>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                        <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 14px;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0;">
                        <strong style="color: #495057; font-size: 14px;">Submitted:</strong>
                      </td>
                      <td style="padding: 12px 0; text-align: right;">
                        <span style="color: #212529; font-size: 14px;">${new Date().toLocaleString('en-US', { 
                          dateStyle: 'full', 
                          timeStyle: 'short' 
                        })}</span>
                      </td>
                    </tr>
                  </table>
                  
                  <div style="margin-top: 30px;">
                    <h3 style="color: #495057; font-size: 16px; margin-bottom: 10px;">Message:</h3>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; border: 1px solid #e9ecef;">
                      <p style="margin: 0; color: #212529; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                  </div>
                  
                  <div style="margin-top: 30px; text-align: center;">
                    <a href="mailto:${email}?subject=Re: ${requestType}" 
                       style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
                      Reply to ${name}
                    </a>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                  <p style="margin: 0; color: #6c757d; font-size: 12px;">
                    This email was sent from your website contact form at CWM Services
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
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">Thank You, ${name}!</h1>
                  <p style="margin: 10px 0 0; color: #f0f0f0; font-size: 16px;">We've received your message</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 20px; color: #212529; font-size: 16px; line-height: 1.6;">
                    Hi ${name},
                  </p>
                  
                  <p style="margin: 0 0 20px; color: #212529; font-size: 16px; line-height: 1.6;">
                    Thank you for reaching out to us! We've successfully received your ${requestType.toLowerCase()} and our team will review it shortly.
                  </p>
                  
                  <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0;">
                    <p style="margin: 0 0 10px; color: #495057; font-weight: bold;">What happens next?</p>
                    <ul style="margin: 0; padding-left: 20px; color: #212529; font-size: 14px; line-height: 1.8;">
                      <li>Our team will review your message within 24-48 hours</li>
                      <li>We'll reach out to you at <strong>${email}</strong></li>
                      <li>You'll receive a personalized response addressing your inquiry</li>
                    </ul>
                  </div>
                  
                  <div style="background-color: #fff; border: 1px solid #e9ecef; border-radius: 6px; padding: 20px; margin: 30px 0;">
                    <h3 style="margin: 0 0 15px; color: #495057; font-size: 16px;">Your Message Summary:</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px;">Request Type:</td>
                        <td style="padding: 8px 0; color: #212529; font-size: 14px; text-align: right;"><strong>${requestType}</strong></td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px;">Submitted:</td>
                        <td style="padding: 8px 0; color: #212529; font-size: 14px; text-align: right;">${new Date().toLocaleString('en-US', { 
                          dateStyle: 'medium', 
                          timeStyle: 'short' 
                        })}</td>
                      </tr>
                    </table>
                  </div>
                  
                  <p style="margin: 30px 0 20px; color: #212529; font-size: 16px; line-height: 1.6;">
                    If you have any urgent questions, feel free to email us directly at <a href="mailto:masood@cwmservices.dev" style="color: #667eea; text-decoration: none;"><strong>masood@cwmservices.dev</strong></a>
                  </p>
                  
                  <p style="margin: 0; color: #212529; font-size: 16px; line-height: 1.6;">
                    Best regards,<br>
                    <strong>The CWM Services Team</strong>
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px 20px; text-align: center; border-top: 1px solid #e9ecef;">
                  <p style="margin: 0 0 10px; color: #6c757d; font-size: 14px;">
                    <strong>CWM Services</strong>
                  </p>
                  <p style="margin: 0; color: #6c757d; font-size: 12px;">
                    Transforming ideas into powerful digital solutions
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