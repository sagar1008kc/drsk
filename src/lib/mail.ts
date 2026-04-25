import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import {
  buildAdminBookingEmail,
  buildCustomerConfirmationEmail,
} from '@/lib/emails/bookingEmails';
import { buildWebsiteQuoteCustomerConfirmationEmail } from '@/lib/emails/contactEmails';
import { buildHandbookThankYouEmail } from '@/lib/emails/subscribeEmails';
import type { BookingRow } from '@/types/booking';

let resendSingleton: Resend | null = null;
const DEFAULT_NOTIFICATION_EMAIL = 'info@skcreation.org';

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resendSingleton) resendSingleton = new Resend(key);
  return resendSingleton;
}

function getZohoTransport() {
  const user = process.env.ZOHO_MAIL_USER;
  const pass = process.env.ZOHO_MAIL_PASS;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: process.env.ZOHO_MAIL_HOST || 'smtppro.zoho.com',
    port: Number(process.env.ZOHO_MAIL_PORT || '465'),
    secure: process.env.ZOHO_MAIL_SECURE === 'true',
    auth: { user, pass },
  });
}

function defaultFromAddress(): string | null {
  return (
    getNotificationInboxEmail() ||
    process.env.MAIL_FROM ||
    process.env.ZOHO_MAIL_USER ||
    process.env.RESEND_FROM_EMAIL ||
    DEFAULT_NOTIFICATION_EMAIL
  );
}

export function getNotificationInboxEmail(): string {
  return process.env.NOTIFICATION_TO_EMAIL || DEFAULT_NOTIFICATION_EMAIL;
}

/**
 * Zoho SMTP (recommended for @skcreation.org) → else Resend → else false.
 */
export async function sendHtmlEmail(opts: {
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const from = defaultFromAddress();
  if (!from) {
    console.error('[mail] No MAIL_FROM / ZOHO_MAIL_USER / RESEND_FROM_EMAIL set.');
    return false;
  }

  const zoho = getZohoTransport();
  if (zoho) {
    try {
      await zoho.sendMail({
        // Keep sender header plain to avoid exposing personal display names.
        from,
        to: opts.to,
        replyTo: opts.replyTo,
        subject: opts.subject,
        html: opts.html,
      });
      return true;
    } catch (e) {
      console.error('[mail] Zoho SMTP failed:', e);
    }
  }

  const resend = getResend();
  if (resend) {
    const { error } = await resend.emails.send({
      from,
      to: Array.isArray(opts.to) ? opts.to[0]! : opts.to,
      replyTo: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
    });
    if (error) {
      console.error('[mail] Resend failed:', error);
      return false;
    }
    return true;
  }

  console.error('[mail] No Zoho SMTP or Resend configured.');
  return false;
}

export async function sendAdminBookingNotification(
  booking: BookingRow
): Promise<boolean> {
  const to = getNotificationInboxEmail();
  if (!to) {
    console.error(
      '[mail] Missing notification inbox email (NOTIFICATION_TO_EMAIL).'
    );
    return false;
  }

  const { subject, html } = buildAdminBookingEmail(booking);
  return sendHtmlEmail({
    to,
    replyTo: booking.customer_email,
    subject,
    html,
  });
}

function siteOriginForEmails(): string {
  const vercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`.replace(/\/$/, '')
    : '';
  const raw = process.env.NEXT_PUBLIC_SITE_URL || vercel || 'https://www.skcreation.org';
  return raw.replace(/\/$/, '');
}

/**
 * Post–handbook-subscribe thank-you: PDF link, services, contact, login.
 */
export async function sendHandbookThankYouEmail(
  customerEmail: string
): Promise<boolean> {
  const { subject, html } = buildHandbookThankYouEmail({
    siteOrigin: siteOriginForEmails(),
  });
  return sendHtmlEmail({
    to: customerEmail,
    subject,
    html,
  });
}

export async function sendWebsiteQuoteCustomerConfirmation(input: {
  customerEmail: string;
  name: string;
  serviceType?: string;
  otherServiceType?: string;
}): Promise<boolean> {
  const customer = input.customerEmail.trim().toLowerCase();
  const inbox = getNotificationInboxEmail().trim().toLowerCase();
  if (customer && inbox && customer === inbox) {
    return true;
  }

  const { subject, html } = buildWebsiteQuoteCustomerConfirmationEmail({
    name: input.name,
    serviceType: input.serviceType,
    otherServiceType: input.otherServiceType,
  });

  return sendHtmlEmail({
    to: input.customerEmail,
    subject,
    html,
  });
}

export async function sendCustomerBookingConfirmation(
  booking: BookingRow
): Promise<boolean> {
  const customer = booking.customer_email.trim().toLowerCase();
  const inbox = getNotificationInboxEmail().trim().toLowerCase();
  if (customer && inbox && customer === inbox) {
    // Avoid duplicate internal notifications when customer and admin inbox are same.
    return true;
  }

  const { subject, html } = buildCustomerConfirmationEmail(booking);
  return sendHtmlEmail({
    to: booking.customer_email,
    subject,
    html,
  });
}
