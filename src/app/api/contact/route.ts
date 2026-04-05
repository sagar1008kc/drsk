import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ContactRequestBody = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
  token?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactRequestBody;

    const name = body.name?.trim() || '';
    const email = body.email?.trim() || '';
    const message = body.message?.trim() || '';
    const company = body.company?.trim() || '';
    const token = body.token?.trim() || '';

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

    if (!token) {
      return NextResponse.json(
        { error: 'Please complete the captcha.' },
        { status: 400 }
      );
    }

    if (
      !process.env.CONTACT_EMAIL_USER ||
      !process.env.CONTACT_EMAIL_PASS ||
      !process.env.CONTACT_EMAIL_TO ||
      !process.env.TURNSTILE_SECRET_KEY
    ) {
      console.error('Missing env vars:', {
        CONTACT_EMAIL_USER: !!process.env.CONTACT_EMAIL_USER,
        CONTACT_EMAIL_PASS: !!process.env.CONTACT_EMAIL_PASS,
        CONTACT_EMAIL_TO: !!process.env.CONTACT_EMAIL_TO,
        TURNSTILE_SECRET_KEY: !!process.env.TURNSTILE_SECRET_KEY,
      });

      return NextResponse.json(
        { error: 'Server environment variables are missing.' },
        { status: 500 }
      );
    }

    const formData = new URLSearchParams();
    formData.append('secret', process.env.TURNSTILE_SECRET_KEY);
    formData.append('response', token);

    const captchaResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      }
    );

    const captchaResult = await captchaResponse.json();

    if (!captchaResult.success) {
      console.error('Turnstile failed:', captchaResult);

      return NextResponse.json(
        { error: 'Captcha verification failed.' },
        { status: 400 }
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
    console.log('SMTP connection verified successfully');

    const info = await transporter.sendMail({
      from: `"Dr. SK Website" <${process.env.CONTACT_EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <div style="padding:12px;background:#f5f5f5;border-radius:8px;white-space:pre-wrap;">
            ${escapeHtml(message)}
          </div>
        </div>
      `,
    });

    console.log('Email sent:', info.messageId);

    return NextResponse.json(
      { message: 'Message sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to send email';

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