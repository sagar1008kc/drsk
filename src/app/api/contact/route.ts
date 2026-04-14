import { NextResponse } from 'next/server';
import { sendHtmlEmail } from '@/lib/mail';
import { isValidInternationalPhoneDigits } from '@/lib/phone';

type ContactRequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  type?: 'contact' | 'website_quote' | string;
  serviceType?: string;
  otherServiceType?: string;
  projectDetails?: string;
  message?: string;
  company?: string;
};

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactRequestBody;

    const name = body.name?.trim() || '';
    const email = body.email?.trim() || '';
    const phone = body.phone?.trim() || '';
    const requestType = body.type?.trim() || 'contact';
    const serviceType = body.serviceType?.trim() || '';
    const otherServiceType = body.otherServiceType?.trim() || '';
    const projectDetails = body.projectDetails?.trim() || '';
    const message = body.message?.trim() || '';
    const company = body.company?.trim() || '';

    if (company) {
      return NextResponse.json(
        { message: 'Message sent successfully.' },
        { status: 200 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
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

    const contactTo =
      process.env.CONTACT_TO_EMAIL ||
      process.env.CONTACT_EMAIL_TO ||
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      process.env.ZOHO_MAIL_USER;
    const to =
      requestType === 'website_quote' ? 'info@skcreation.org' : contactTo;

    if (!to) {
      console.error('[contact] Missing CONTACT_TO_EMAIL / ADMIN_NOTIFICATION_EMAIL');
      return NextResponse.json(
        { error: 'Server environment variables are missing.' },
        { status: 500 }
      );
    }

    const isWebsiteQuote = requestType === 'website_quote';
    if (isWebsiteQuote && (!phone || !serviceType || !projectDetails)) {
      return NextResponse.json(
        { error: 'Phone, service type, and project details are required.' },
        { status: 400 }
      );
    }

    if (isWebsiteQuote) {
      const digits = phone.replace(/\D/g, '');
      if (!isValidInternationalPhoneDigits(digits)) {
        return NextResponse.json(
          {
            error:
              'Phone must be 8–15 digits including country code (digits only).',
          },
          { status: 400 }
        );
      }
    }

    const subject = isWebsiteQuote
      ? `New Digital solutions quote request from ${name}`
      : `New Contact Form Message from ${name}`;
    const html = isWebsiteQuote
      ? `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Digital solutions quote request</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Service Type:</strong> ${escapeHtml(serviceType)}</p>
          ${
            otherServiceType
              ? `<p><strong>Other Service:</strong> ${escapeHtml(otherServiceType)}</p>`
              : ''
          }
          <p><strong>Project Details:</strong></p>
          <div style="padding:12px;background:#f5f5f5;border-radius:8px;white-space:pre-wrap;">
            ${escapeHtml(projectDetails)}
          </div>
          <p style="margin-top:12px;color:#666;font-size:12px;">Quotes start from $199.</p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <div style="padding:12px;background:#f5f5f5;border-radius:8px;white-space:pre-wrap;">
            ${escapeHtml(message)}
          </div>
        </div>
      `;

    const ok = await sendHtmlEmail({
      to,
      replyTo: email,
      subject,
      html,
    });

    if (!ok) {
      return NextResponse.json(
        { error: 'Could not send message. Try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to send email';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
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
