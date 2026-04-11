import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import {
  buildAdminBookingEmail,
  buildCustomerConfirmationEmail,
} from '@/lib/emails/bookingEmails';
import type { BookingRow } from '@/types/booking';

let resendSingleton: Resend | null = null;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resendSingleton) resendSingleton = new Resend(key);
  return resendSingleton;
}

function getZohoTransport() {
  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASS;
  if (!user || !pass) return null;

  const host = process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com';
  const port = Number(process.env.ZOHO_SMTP_PORT || '465');

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function defaultFromAddress(): string | null {
  return (
    process.env.MAIL_FROM ||
    process.env.ZOHO_SMTP_USER ||
    process.env.RESEND_FROM_EMAIL ||
    process.env.CONTACT_EMAIL_USER ||
    null
  );
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
    console.error('[mail] No MAIL_FROM / ZOHO_SMTP_USER / RESEND_FROM_EMAIL');
    return false;
  }

  const zoho = getZohoTransport();
  if (zoho) {
    try {
      await zoho.sendMail({
        from: `"Dr. SK" <${from}>`,
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
  const to =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.CONTACT_EMAIL_TO ||
    process.env.ZOHO_SMTP_USER;
  if (!to) {
    console.error('[mail] Set ADMIN_NOTIFICATION_EMAIL (or CONTACT_EMAIL_TO)');
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

export async function sendCustomerBookingConfirmation(
  booking: BookingRow
): Promise<boolean> {
  const { subject, html } = buildCustomerConfirmationEmail(booking);
  return sendHtmlEmail({
    to: booking.customer_email,
    subject,
    html,
  });
}
