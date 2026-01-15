import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3; // Max 3 quote submissions per hour per IP

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

    const formData = await req.formData();
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;

    // Server-side validation
    if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 40 || message.trim().length > 250) {
      return NextResponse.json(
        { error: "Message must be between 40 and 250 characters" },
        { status: 400 }
      );
    }

    // File validation (if provided)
    let fileInfo = null;
    if (file && file.size > 0) {
      const maxFileSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      
      if (file.size > maxFileSize) {
        return NextResponse.json(
          { error: "File size must be less than 5MB" },
          { status: 400 }
        );
      }

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: "Only image files are allowed" },
          { status: 400 }
        );
      }

      // Convert file to buffer for email attachment
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      fileInfo = {
        filename: file.name,
        content: buffer,
        contentType: file.type
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // HTML email template for admin notificationkljkl
    const adminEmailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Quote Request</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 40px 20px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">New Quote Request</h1>
                  <p style="margin: 10px 0 0; color: #f0f0f0; font-size: 14px;">Masood U. Portfolio</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #f97316; font-weight: bold; font-size: 16px;">💬 New Message from Client</p>
                  </div>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                        <strong style="color: #495057; font-size: 14px;">Email:</strong>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                        <a href="mailto:${email}" style="color: #f97316; text-decoration: none; font-size: 14px;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                        <strong style="color: #495057; font-size: 14px;">Attachment:</strong>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                        <span style="color: #212529; font-size: 14px;">${fileInfo ? '✅ Yes' : '❌ No'}</span>
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
                    <a href="mailto:${email}?subject=Re: Quote Request" 
                       style="display: inline-block; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
                      Reply to Client
                    </a>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                  <p style="margin: 0; color: #6c757d; font-size: 12px;">
                    This email was sent from your portfolio quote request form
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
      <title>Quote Request Received</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 40px 20px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">Thank You!</h1>
                  <p style="margin: 10px 0 0; color: #f0f0f0; font-size: 16px;">I've received your quote request</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 20px; color: #212529; font-size: 16px; line-height: 1.6;">
                    Hi there,
                  </p>
                  
                  <p style="margin: 0 0 20px; color: #212529; font-size: 16px; line-height: 1.6;">
                    Thank you for reaching out! I've successfully received your quote request and will review it carefully.
                  </p>
                  
                  <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 20px; margin: 30px 0;">
                    <p style="margin: 0 0 10px; color: #495057; font-weight: bold;">What happens next?</p>
                    <ul style="margin: 0; padding-left: 20px; color: #212529; font-size: 14px; line-height: 1.8;">
                      <li>I'll review your project details and requirements</li>
                      <li>You'll receive a personalized quote within 24-48 hours</li>
                      <li>I'll reach out to you at <strong>${email}</strong></li>
                      <li>We can schedule a call to discuss your project further</li>
                    </ul>
                  </div>
                  
                  <div style="background-color: #fff; border: 1px solid #e9ecef; border-radius: 6px; padding: 20px; margin: 30px 0;">
                    <h3 style="margin: 0 0 15px; color: #495057; font-size: 16px;">Your Request Summary:</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px;">Email:</td>
                        <td style="padding: 8px 0; color: #212529; font-size: 14px; text-align: right;"><strong>${email}</strong></td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px;">Attachment:</td>
                        <td style="padding: 8px 0; color: #212529; font-size: 14px; text-align: right;">${fileInfo ? '✅ Included' : '❌ None'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px;">Submitted:</td>
                        <td style="padding: 8px 0; color: #212529; font-size: 14px; text-align: right;">${new Date().toLocaleString('en-US', { 
                          dateStyle: 'medium', 
                          timeStyle: 'short' 
                        })}</td>
                      </tr>
                    </table>
                    
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef;">
                      <p style="margin: 0 0 10px; color: #6c757d; font-size: 12px;">Your Message:</p>
                      <p style="margin: 0; color: #212529; font-size: 14px; line-height: 1.6; font-style: italic;">"${message}"</p>
                    </div>
                  </div>
                  
                  <p style="margin: 30px 0 20px; color: #212529; font-size: 16px; line-height: 1.6;">
                    If you have any urgent questions in the meantime, feel free to email me directly at <a href="mailto:masood@cwmservices.dev" style="color: #f97316; text-decoration: none;"><strong>masood@cwmservices.dev</strong></a>
                  </p>
                  
                  <p style="margin: 0; color: #212529; font-size: 16px; line-height: 1.6;">
                    Looking forward to working with you!<br>
                    <strong>Masood U.</strong>
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px 20px; text-align: center; border-top: 1px solid #e9ecef;">
                  <p style="margin: 0 0 10px; color: #6c757d; font-size: 14px;">
                    <strong>Masood U.</strong>
                  </p>
                  <p style="margin: 0; color: #6c757d; font-size: 12px;">
                    Full Stack Developer | Building Digital Solutions
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

    // Prepare email options for admin
    const adminMailOptions: any = {
      from: `"Masood U. Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || "masood@cwmservices.dev",
      subject: `New Quote Request from ${email}`,
      html: adminEmailHTML,
      text: `New Quote Request\n\nEmail: ${email}\nMessage: ${message}\n${fileInfo ? `Attachment: ${fileInfo.filename}` : 'No attachment'}\n\nSubmitted: ${new Date().toLocaleString()}`,
    };

    // Add attachment if file exists
    if (fileInfo) {
      adminMailOptions.attachments = [{
        filename: fileInfo.filename,
        content: fileInfo.content,
        contentType: fileInfo.contentType
      }];
    }

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    // Send auto-reply to customer
    await transporter.sendMail({
      from: `"Masood U." <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `I received your quote request - Masood U.`,
      html: customerEmailHTML,
      text: `Hi there,\n\nThank you for reaching out! I've successfully received your quote request and will review it carefully.\n\nWhat happens next?\n- I'll review your project details and requirements\n- You'll receive a personalized quote within 24-48 hours\n- I'll reach out to you at ${email}\n- We can schedule a call to discuss your project further\n\nLooking forward to working with you!\nMasood U.`,
    });

    return NextResponse.json(
      { success: true, message: "Quote request sent successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Quote request error:", error);
    return NextResponse.json(
      { error: "Failed to send quote request. Please try again later." },
      { status: 500 }
    );
  }
}