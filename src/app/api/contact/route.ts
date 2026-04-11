import { NextResponse } from 'next/server';
import { sendHtmlEmail } from '@/lib/mail';

type ContactRequestBody = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactRequestBody;

    const name = body.name?.trim() || '';
    const email = body.email?.trim() || '';
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

    const to =
      process.env.CONTACT_EMAIL_TO ||
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      process.env.ZOHO_SMTP_USER;

    if (!to) {
      console.error('Missing CONTACT_EMAIL_TO / ADMIN_NOTIFICATION_EMAIL');
      return NextResponse.json(
        { error: 'Server environment variables are missing.' },
        { status: 500 }
      );
    }

    const subject = `New Contact Form Message from ${name}`;
    const html = `
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
