import type { BookingRow } from '@/types/booking';
import { getServiceByType } from '@/lib/services';
import { buildEmailTemplate, escapeHtml } from '@/lib/emails/template';

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

  const subject = complimentary
    ? `Complimentary booking — ${serviceLabel} — ${booking.customer_name}`
    : `Paid booking — ${serviceLabel} — ${booking.customer_name}`;

  const html = buildEmailTemplate({
    title: complimentary ? 'New Complimentary Booking' : 'New Paid Booking',
    subtitle: 'Booking details below',
    sections: [
      {
        title: 'Session Details',
        details: [
          { label: 'Service', value: serviceLabel },
          {
            label: 'Amount',
            value: formatMoney(
              booking.amount_total ?? booking.price_cents,
              booking.currency
            ),
          },
          { label: 'Payment status', value: booking.payment_status },
          { label: 'Date', value: booking.preferred_date || '—' },
          {
            label: 'Time (Central Time)',
            value: booking.preferred_time || '—',
          },
          { label: 'Timezone', value: booking.timezone || 'America/Chicago' },
          {
            label: 'Group size',
            value:
              (booking.attendee_count ?? 1) > 1
                ? `${booking.attendee_count} people`
                : '1 person',
          },
          {
            label: 'Meeting preference',
            value: booking.meeting_preference || 'Google Meet',
          },
        ],
      },
      {
        title: 'Customer Details',
        details: [
          { label: 'Name', value: booking.customer_name },
          { label: 'Email', value: booking.customer_email },
          { label: 'Phone', value: booking.customer_phone || '—' },
          { label: 'Language', value: booking.language || '—' },
        ],
      },
      {
        title: 'Meeting',
        bodyHtml:
          booking.meeting_url && booking.meeting_provider === 'google_meet'
            ? `<p style="margin:0 0 10px 0;color:#111827;font-size:14px;line-height:22px;"><strong>Google Meet:</strong> <a href="${escapeHtml(booking.meeting_url)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(booking.meeting_url)}</a></p>`
            : '<p style="margin:0 0 10px 0;color:#111827;font-size:14px;line-height:22px;">Google Meet link not created. Share manually in follow-up.</p>',
      },
      {
        title: 'Notes',
        bodyHtml: `<div style="margin:0 0 10px 0;padding:12px;background:#f8fafc;border-radius:8px;color:#111827;font-size:14px;line-height:22px;white-space:pre-wrap;">${escapeHtml(booking.notes || '—')}</div>`,
      },
    ],
    reference: `Booking ID: ${booking.id} • Stripe session: ${booking.stripe_checkout_session_id || '—'}`,
  });

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
  const timeValue = booking.preferred_time
    ? `${booking.preferred_time} (Central Time)`
    : 'To be confirmed (Central Time)';
  const timezoneValue = booking.timezone || 'America/Chicago';
  const amountLabel = complimentary ? 'Complimentary (No Charge)' : amount;
  const meetingContent =
    booking.meeting_url && booking.meeting_provider === 'google_meet'
      ? `
      <p style="margin:0;color:#1f2937;font-size:14px;line-height:22px;">
        Your meeting link is ready:<br />
        <a href="${escapeHtml(booking.meeting_url)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(booking.meeting_url)}</a>
      </p>
      `
      : `
      <p style="margin:0;color:#1f2937;font-size:14px;line-height:22px;">
        Meeting link will be shared in a follow-up email.
      </p>
      `;

  const subject = `You're Booked - ${serviceLabel}`;

  const html = buildEmailTemplate({
    title: `You're Booked - ${serviceLabel}`,
    subtitle: 'Confirmation details below',
    sections: [
      {
        title: 'Session Details',
        details: [
          { label: 'Service', value: serviceLabel },
          { label: 'Fee', value: amountLabel },
          { label: 'Date', value: booking.preferred_date || 'To be confirmed' },
          { label: 'Time', value: timeValue },
          { label: 'Timezone', value: timezoneValue },
        ],
      },
      {
        title: 'Meeting',
        bodyHtml: meetingContent,
      },
    ],
    reference: `Booking reference: ${booking.id}`,
  });

  return { subject, html };
}
