import type { BookingRow } from '@/types/booking';
import { getServiceByType } from '@/lib/services';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatMoney(cents: number | null, currency: string): string {
  if (cents == null || cents === 0) {
    return 'Complimentary (no charge)';
  }
  const amount = cents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
}

function isComplimentaryBooking(booking: BookingRow): boolean {
  return booking.price_cents === 0 || booking.payment_status === 'waived';
}

export type AdminEmailContent = { subject: string; html: string };
export type CustomerEmailContent = { subject: string; html: string };

export function buildAdminBookingEmail(booking: BookingRow): AdminEmailContent {
  const service = getServiceByType(booking.service_type);
  const serviceLabel = service?.title ?? booking.service_type;
  const complimentary = isComplimentaryBooking(booking);
  const meet =
    booking.meeting_url && booking.meeting_provider === 'google_meet'
      ? `<p><strong>Google Meet:</strong> <a href="${escapeHtml(booking.meeting_url)}">${escapeHtml(booking.meeting_url)}</a></p>`
      : '<p><strong>Google Meet:</strong> Not created — check logs or follow up manually.</p>';

  const subject = complimentary
    ? `Complimentary booking — ${serviceLabel} — ${booking.customer_name}`
    : `Paid booking — ${serviceLabel} — ${booking.customer_name}`;

  const html = `
  <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#111;">
    <h2>${complimentary ? 'New complimentary booking' : 'New paid booking'}</h2>
    <p><strong>Booking ID:</strong> ${escapeHtml(booking.id)}</p>
    <p><strong>Payment status:</strong> ${escapeHtml(booking.payment_status)}</p>
    <p><strong>Amount:</strong> ${escapeHtml(formatMoney(booking.amount_total ?? booking.price_cents, booking.currency))}</p>
    <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
    <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
    <p><strong>Customer name:</strong> ${escapeHtml(booking.customer_name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(booking.customer_email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(booking.customer_phone || '—')}</p>
    <p><strong>Language:</strong> ${escapeHtml(booking.language || '—')}</p>
    <p><strong>Preferred date:</strong> ${escapeHtml(booking.preferred_date || '—')}</p>
    <p><strong>Preferred time (Central Time):</strong> ${escapeHtml(booking.preferred_time || '—')}</p>
    <p><strong>Timezone:</strong> ${escapeHtml(booking.timezone || 'America/Chicago')}</p>
    ${
      (booking.attendee_count ?? 1) > 1
        ? `<p><strong>Group size:</strong> ${escapeHtml(String(booking.attendee_count))} people</p>`
        : ''
    }
    <p><strong>Video:</strong> ${escapeHtml(booking.meeting_preference || 'Google Meet')}</p>
    <p><strong>Notes:</strong></p>
    <div style="padding:12px;background:#f5f5f5;border-radius:8px;white-space:pre-wrap;">${escapeHtml(booking.notes || '—')}</div>
    <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
    ${meet}
    <p style="font-size:12px;color:#666;">Stripe session: ${escapeHtml(booking.stripe_checkout_session_id || '—')}</p>
  </div>`;

  return { subject, html };
}

export function buildCustomerConfirmationEmail(
  booking: BookingRow
): CustomerEmailContent {
  const service = getServiceByType(booking.service_type);
  const serviceLabel = service?.title ?? booking.service_type;
  const complimentary = isComplimentaryBooking(booking);
  const amount = formatMoney(
    booking.amount_total ?? booking.price_cents,
    booking.currency
  );

  const meetBlock =
    booking.meeting_url && booking.meeting_provider === 'google_meet'
      ? `<p style="margin:16px 0;"><a href="${escapeHtml(booking.meeting_url)}" style="display:inline-block;padding:12px 20px;background:#111;color:#fff;text-decoration:none;border-radius:999px;font-weight:600;">Join Google Meet</a></p><p style="font-size:14px;color:#444;">Or copy this link: ${escapeHtml(booking.meeting_url)}</p>`
      : '<p style="color:#444;">Your meeting link will be included in a follow-up if it is not shown here yet.</p>';

  const subject = `You’re booked — ${serviceLabel}`;

  const intro = complimentary
    ? `<p>Your complimentary session request is confirmed. Details below are based on what you submitted.</p>`
    : `<p>Your payment was received. Your session is confirmed, and the details below reflect your booking request.</p>`;

  const amountLabel = complimentary ? 'Session fee' : 'Amount paid';

  const html = `
  <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.7;color:#111;max-width:560px;">
    <h2 style="margin-bottom:8px;">Thank you, ${escapeHtml(booking.customer_name)}</h2>
    ${intro}
    <div style="margin:20px 0;padding:16px 20px;border-radius:16px;background:#f6f6f6;">
      <p style="margin:0 0 8px;"><strong>Service</strong><br/>${escapeHtml(serviceLabel)}</p>
      ${
        (booking.attendee_count ?? 1) > 1
          ? `<p style="margin:8px 0;"><strong>Participants</strong><br/>${escapeHtml(String(booking.attendee_count))} people</p>`
          : ''
      }
      <p style="margin:8px 0;"><strong>${amountLabel}</strong><br/>${escapeHtml(amount)}</p>
      <p style="margin:8px 0;"><strong>Preferred date</strong><br/>${escapeHtml(booking.preferred_date || '—')}</p>
      <p style="margin:8px 0;"><strong>Preferred time</strong><br/>${escapeHtml(booking.preferred_time || '—')} <span style="color:#666;">(Central Time)</span></p>
      <p style="margin:8px 0 0;"><strong>Timezone</strong><br/>${escapeHtml(booking.timezone || 'America/Chicago')}</p>
    </div>
    <h3 style="margin-top:24px;">Meeting</h3>
    ${meetBlock}
    <p style="margin-top:24px;font-size:14px;color:#555;">If you need to reschedule, reply to this email.</p>
    <p style="font-size:13px;color:#888;">Booking reference: ${escapeHtml(booking.id)}</p>
  </div>`;

  return { subject, html };
}
