import { NextResponse } from 'next/server';
import {
  getNotificationInboxEmail,
  sendHtmlEmail,
  sendWebsiteQuoteCustomerConfirmation,
} from '@/lib/mail';
import { buildContactNotificationEmail } from '@/lib/emails/contactEmails';
import { isValidOptionalInternationalPhone } from '@/lib/phone';

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

    const to = getNotificationInboxEmail();

    if (!to) {
      console.error(
        '[contact] Missing notification inbox email (NOTIFICATION_TO_EMAIL).'
      );
      return NextResponse.json(
        { error: 'Server environment variables are missing.' },
        { status: 500 }
      );
    }

    const isWebsiteQuote = requestType === 'website_quote';
    if (isWebsiteQuote && (!serviceType || !projectDetails)) {
      return NextResponse.json(
        { error: 'Service type and project details are required.' },
        { status: 400 }
      );
    }

    if (isWebsiteQuote) {
      const digits = phone.replace(/\D/g, '');
      if (!isValidOptionalInternationalPhone(digits)) {
        return NextResponse.json(
          {
            error:
              'If provided, phone must be 8–15 digits including country code (digits only).',
          },
          { status: 400 }
        );
      }
    }

    const { subject, html } = buildContactNotificationEmail({
      requestType,
      name,
      email,
      phone,
      serviceType,
      otherServiceType,
      projectDetails,
      message,
    });

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

    if (isWebsiteQuote) {
      const customerOk = await sendWebsiteQuoteCustomerConfirmation({
        customerEmail: email,
        name,
        serviceType,
        otherServiceType,
      });
      if (!customerOk) {
        console.error(
          '[contact] Customer confirmation failed for website_quote:',
          email
        );
      }
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
