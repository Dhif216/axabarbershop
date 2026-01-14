import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

interface BookingRequest {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  notes?: string;
}

// Service prices in EUR
const SERVICE_PRICES: Record<string, number> = {
  'Haircut': 25,
  'Beard Trim': 15,
  'Hair & Beard': 35,
  'Kids Haircut': 20,
  'Hair Wash': 10,
  'Styling': 20,
  'Combo': 50,
  'Leikkaus': 25,
  'Parran Leikkaus': 15,
  'Leikkaus & Parta': 35,
  'Lasten Leikkaus': 20,
  'Hiusten Pesu': 10,
  'Kampaus': 20,
  'Combo-paketti': 50,
};

// Email templates
const emailTemplates = {
  en: {
    subject: 'Booking Confirmation - AXA Barbershop',
    getHtml: (data: BookingRequest) => `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1F4D3A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f5f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #d4a574; }
            .label { font-weight: bold; color: #1F4D3A; }
            .footer { color: #666; font-size: 12px; text-align: center; margin-top: 20px; }
            .button { background-color: #1F4D3A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AXA BARBERSHOP</h1>
              <p>Booking Confirmation</p>
            </div>
            <div class="content">
              <p>Hi ${data.name},</p>
              <p>Thank you for booking with AXA Barbershop! Your appointment has been confirmed.</p>
              
              <div class="details">
                <p><span class="label">Service:</span> ${data.service}</p>
                <p><span class="label">Date:</span> ${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><span class="label">Time:</span> ${data.time}</p>
                <p><span class="label">Phone:</span> ${data.phone}</p>
                ${data.notes ? `<p><span class="label">Notes:</span> ${data.notes}</p>` : ''}
              </div>
              
              <p>Our address:</p>
              <p>Rullakkotori 1 LT 2<br>00240 Helsinki<br>Finland</p>
              
              <p>If you need to reschedule or cancel, please contact us at:</p>
              <p>Phone: +358 41 3134978<br>Email: info@axabarbershop.fi</p>
              
              <p>We look forward to seeing you!</p>
              <p>Best regards,<br><strong>AXA Barbershop Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
  fi: {
    subject: 'Varausvahvistus - AXA Parturipalvelu',
    getHtml: (data: BookingRequest) => `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1F4D3A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f5f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #d4a574; }
            .label { font-weight: bold; color: #1F4D3A; }
            .footer { color: #666; font-size: 12px; text-align: center; margin-top: 20px; }
            .button { background-color: #1F4D3A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AXA PARTURIPALVELU</h1>
              <p>Varausvahvistus</p>
            </div>
            <div class="content">
              <p>Hei ${data.name},</p>
              <p>Kiitos varauksestasi AXA Parturipalveluun! Varauksesi on vahvistettu.</p>
              
              <div class="details">
                <p><span class="label">Palvelu:</span> ${data.service}</p>
                <p><span class="label">Päivä:</span> ${new Date(data.date).toLocaleDateString('fi-FI', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><span class="label">Aika:</span> ${data.time}</p>
                <p><span class="label">Puhelin:</span> ${data.phone}</p>
                ${data.notes ? `<p><span class="label">Huomautukset:</span> ${data.notes}</p>` : ''}
              </div>
              
              <p>Osoitteemme:</p>
              <p>Rullakkotori 1 LT 2<br>00240 Helsinki<br>Suomi</p>
              
              <p>Jos haluat siirtää tai peruuttaa varauksen, ota yhteyttä:</p>
              <p>Puhelin: +358 41 3134978<br>Sähköposti: info@axabarbershop.fi</p>
              
              <p>Nähdään pian!</p>
              <p>Ystävällisin terveisin,<br><strong>AXA Parturipalvelu -tiimi</strong></p>
            </div>
            <div class="footer">
              <p>Tämä on automaattinen viesti, älä vastaa tähän sähköpostiin.</p>
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
    
    const data: BookingRequest = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.service || !data.date || !data.time) {
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

    // Get the appropriate email template
    const template = emailTemplates[data.language as keyof typeof emailTemplates] || emailTemplates.en;

    // Send email to customer
    const customerEmailContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
          </style>
        </head>
        <body>
          ${template.getHtml(data)}
        </body>
      </html>
    `;
    
    const customerEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: data.email,
      subject: template.subject,
      html: customerEmailContent,
    });

    if (customerEmail.error) {
      console.error('Failed to send customer email:', customerEmail.error);
    } else if (customerEmail.data) {
      console.log('Customer email sent:', customerEmail.data.id);
    }

    // Send notification email to business
    const businessEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'migatron2012@gmail.com',
      subject: `New Booking - ${data.name}`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif;">
            <h2>New Booking Notification</h2>
            <p><strong>Customer Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Service:</strong> ${data.service}</p>
            <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            ${data.notes ? `<p><strong>Customer Notes:</strong> ${data.notes}</p>` : ''}
          </body>
        </html>
      `,
    });

    if (businessEmail.error) {
      console.error('Failed to send business email:', businessEmail.error);
    } else if (businessEmail.data) {
      console.log('Business email sent:', businessEmail.data.id);
    }

    // Save booking to database
    const booking = await prisma.booking.create({
      data: {
        service: data.service,
        date: data.date,
        time: data.time,
        name: data.name,
        email: data.email,
        phone: data.phone,
        language: data.language,
        status: 'confirmed',
        price: SERVICE_PRICES[data.service] || 25,
        notes: data.notes || null,
      },
    });

    // Delete the reserved slot since booking is now confirmed
    await prisma.reservedSlot.deleteMany({
      where: {
        date: data.date,
        time: data.time,
      },
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Booking confirmed and email sent',
        bookingId: booking.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json(
      { error: errorMessage || 'Failed to process booking' },
      { status: 500 }
    );
  }
}
