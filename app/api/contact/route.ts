import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  language?: string;
}

// Email templates for contact form
const contactEmailTemplates = {
  en: {
    subject: 'Contact Form Submission - AXA Barbershop',
    getCustomerHtml: (data: ContactRequest) => `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1F4D3A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f5f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
            .footer { color: #666; font-size: 12px; text-align: center; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AXA BARBERSHOP</h1>
              <p>Message Received</p>
            </div>
            <div class="content">
              <p>Hi ${data.name},</p>
              <p>Thank you for contacting AXA Barbershop! We have received your message and will get back to you as soon as possible.</p>
              
              <p><strong>Your Message:</strong></p>
              <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #d4a574;">
                ${data.message.replace(/\n/g, '<br>')}
              </p>
              
              <p>Our team will review your message and respond to you shortly at ${data.email}.</p>
              
              <p>If you have an urgent matter, please call us at:</p>
              <p><strong>+358 41 3134978</strong></p>
              
              <p>Best regards,<br><strong>AXA Barbershop Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    getBusinessHtml: (data: ContactRequest) => `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1F4D3A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f5f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #d4a574; }
            .label { font-weight: bold; color: #1F4D3A; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="details">
                <p><span class="label">Name:</span> ${data.name}</p>
                <p><span class="label">Email:</span> ${data.email}</p>
              </div>
              
              <p><strong>Message:</strong></p>
              <div class="details">
                <p>${data.message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <p>Please respond to the customer as soon as possible.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
  fi: {
    subject: 'Yhteydenottolomakkeen lähetys - AXA Parturipalvelu',
    getCustomerHtml: (data: ContactRequest) => `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1F4D3A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f5f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
            .footer { color: #666; font-size: 12px; text-align: center; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AXA PARTURIPALVELU</h1>
              <p>Viesti vastaanotettu</p>
            </div>
            <div class="content">
              <p>Hei ${data.name},</p>
              <p>Kiitos yhteydenotostasi AXA Parturipalveluun! Olemme vastaanottaneet viestisi ja vastaamme siihen mahdollisimman pian.</p>
              
              <p><strong>Viestisi:</strong></p>
              <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #d4a574;">
                ${data.message.replace(/\n/g, '<br>')}
              </p>
              
              <p>Tiimimme tarkistaa viestisi ja vastaa sinulle pian osoitteeseen ${data.email}.</p>
              
              <p>Jos asiasi on kiireellinen, soita meille:</p>
              <p><strong>+358 41 3134978</strong></p>
              
              <p>Ystävällisin terveisin,<br><strong>AXA Parturipalvelu -tiimi</strong></p>
            </div>
            <div class="footer">
              <p>Tämä on automaattinen viesti, älä vastaa tähän sähköpostiin.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    getBusinessHtml: (data: ContactRequest) => `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1F4D3A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f5f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #d4a574; }
            .label { font-weight: bold; color: #1F4D3A; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Uusi yhteydenottolomakkeen lähetys</h1>
            </div>
            <div class="content">
              <div class="details">
                <p><span class="label">Nimi:</span> ${data.name}</p>
                <p><span class="label">Sähköposti:</span> ${data.email}</p>
              </div>
              
              <p><strong>Viesti:</strong></p>
              <div class="details">
                <p>${data.message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <p>Vastaa asiakkaalle mahdollisimman pian.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const data: ContactRequest = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate message length
    if (data.message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Get the appropriate email template
    const language = (data.language || 'en') as keyof typeof contactEmailTemplates;
    const template = contactEmailTemplates[language] || contactEmailTemplates.en;

    // Send confirmation email to customer
    // Note: In testing mode, Resend only allows sending to the account owner's email.
    // For production, verify your domain at resend.com/domains
    const customerEmailContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .info-box { background-color: #fff3cd; padding: 10px; margin-bottom: 15px; border-radius: 4px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="info-box">
            <p><strong>TESTING MODE:</strong> This email would be sent to ${data.email}</p>
          </div>
          ${template.getCustomerHtml(data)}
        </body>
      </html>
    `;
    
    const customerEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'migatron2012@gmail.com',
      subject: `[TO: ${data.email}] ${template.subject}`,
      html: customerEmailContent,
    });

    // Send notification email to business
    const businessEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'migatron2012@gmail.com',
      subject: `New Contact Form - ${data.name}`,
      html: template.getBusinessHtml(data),
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
        contactId: customerEmail.data?.id || 'sent',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json(
      { error: errorMessage || 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
