import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type BookingRequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  language?: string;
  preferredDate?: string;
  selectedTime?: string;
  notes?: string;
  serviceTitle?: string;
  serviceTag?: string;
  serviceKey?: string;
  price?: string;
  duration?: string;
  paymentLink?: string;
  paymentMethod?: string;
  paymentStatus?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingRequestBody;

    const name = body.name?.trim() || '';
    const email = body.email?.trim() || '';
    const phone = body.phone?.trim() || '';
    const language = body.language?.trim() || '';
    const preferredDate = body.preferredDate?.trim() || '';
    const selectedTime = body.selectedTime?.trim() || '';
    const notes = body.notes?.trim() || '';
    const serviceTitle = body.serviceTitle?.trim() || '';
    const serviceTag = body.serviceTag?.trim() || '';
    const serviceKey = body.serviceKey?.trim() || '';
    const price = body.price?.trim() || '';
    const duration = body.duration?.trim() || '';
    const paymentLink = body.paymentLink?.trim() || '';
    const paymentMethod = body.paymentMethod?.trim() || '';
    const paymentStatus = body.paymentStatus?.trim() || '';

    if (!name || !email || !serviceTitle) {
      return NextResponse.json(
        { error: 'Name, email, and service are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (
      !process.env.CONTACT_EMAIL_USER ||
      !process.env.CONTACT_EMAIL_PASS ||
      !process.env.CONTACT_EMAIL_TO
    ) {
      console.error('Missing env vars:', {
        CONTACT_EMAIL_USER: !!process.env.CONTACT_EMAIL_USER,
        CONTACT_EMAIL_PASS: !!process.env.CONTACT_EMAIL_PASS,
        CONTACT_EMAIL_TO: !!process.env.CONTACT_EMAIL_TO,
      });

      return NextResponse.json(
        { error: 'Server environment variables are missing.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.CONTACT_EMAIL_USER,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Dr. SK Website" <${process.env.CONTACT_EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `New Booking Request from ${name} — ${serviceTitle}`,
      text: `
New Booking Request

Service: ${serviceTitle}
Category: ${serviceTag}
Service key: ${serviceKey || 'N/A'}
Price: ${price}
Duration: ${duration}

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Language: ${language || 'N/A'}
Preferred Date: ${preferredDate || 'N/A'}
Selected Time: ${selectedTime || 'N/A'}

Payment Method: ${paymentMethod || 'N/A'}
Payment Link Used: ${paymentLink || 'N/A'}
Payment status note: ${paymentStatus || 'N/A'}

Notes:
${notes || 'N/A'}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Booking Request</h2>

          <p><strong>Service:</strong> ${escapeHtml(serviceTitle)}</p>
          <p><strong>Category:</strong> ${escapeHtml(serviceTag || 'N/A')}</p>
          <p><strong>Service key:</strong> ${escapeHtml(serviceKey || 'N/A')}</p>
          <p><strong>Price:</strong> ${escapeHtml(price || 'N/A')}</p>
          <p><strong>Duration:</strong> ${escapeHtml(duration || 'N/A')}</p>

          <hr style="margin:16px 0;border:none;border-top:1px solid #e5e5e5;" />

          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || 'N/A')}</p>
          <p><strong>Language:</strong> ${escapeHtml(language || 'N/A')}</p>
          <p><strong>Preferred Date:</strong> ${escapeHtml(preferredDate || 'N/A')}</p>
          <p><strong>Selected Time:</strong> ${escapeHtml(selectedTime || 'N/A')}</p>

          <hr style="margin:16px 0;border:none;border-top:1px solid #e5e5e5;" />

          <p><strong>Payment Method:</strong> ${escapeHtml(paymentMethod || 'N/A')}</p>
          <p><strong>Payment Link Used:</strong> ${escapeHtml(paymentLink || 'N/A')}</p>
          <p><strong>Payment status note:</strong> ${escapeHtml(paymentStatus || 'N/A')}</p>

          <p><strong>Notes:</strong></p>
          <div style="padding:12px;background:#f5f5f5;border-radius:8px;white-space:pre-wrap;">
            ${escapeHtml(notes || 'N/A')}
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Booking request sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking API error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to send booking request';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}