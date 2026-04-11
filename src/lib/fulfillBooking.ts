import {
  getBookingById,
  setBookingEmailFlags,
  setBookingStatus,
  updateBookingMeeting,
} from '@/lib/booking';
import { createGoogleMeetEventForBooking } from '@/lib/googleCalendar';
import {
  sendAdminBookingNotification,
  sendCustomerBookingConfirmation,
} from '@/lib/mail';

/**
 * After payment is confirmed (Stripe) or a complimentary booking is claimed,
 * create Meet (if possible) and send notification emails. Idempotent via email flags.
 */
export async function fulfillBookingMeetAndEmails(bookingId: string): Promise<void> {
  let current = await getBookingById(bookingId);
  if (!current) return;

  if (current.admin_email_sent && current.customer_email_sent) {
    return;
  }

  const latestForMeet = await getBookingById(bookingId);
  if (latestForMeet) current = latestForMeet;

  if (!current.meeting_url && current.preferred_date && current.preferred_time) {
    const meet = await createGoogleMeetEventForBooking({
      bookingId,
      serviceType: current.service_type,
      customerName: current.customer_name,
      customerEmail: current.customer_email,
      preferredDate: current.preferred_date,
      preferredTime: current.preferred_time,
      timezone: current.timezone || 'America/Chicago',
      notes: current.notes,
      meetingPreference: current.meeting_preference || 'Google Meet',
      attendeeCount: current.attendee_count ?? 1,
    });

    if (meet) {
      await updateBookingMeeting(bookingId, meet);
    } else {
      console.warn(
        '[fulfillBooking] Google Meet was not created; emails will note follow-up for link.'
      );
    }

    const refreshed = await getBookingById(bookingId);
    if (refreshed) current = refreshed;
  }

  if (!current.admin_email_sent) {
    const latest = (await getBookingById(bookingId))!;
    const ok = await sendAdminBookingNotification(latest);
    if (ok) {
      await setBookingEmailFlags(bookingId, { admin_email_sent: true });
    } else {
      console.error('[fulfillBooking] Admin email failed for booking', bookingId);
    }
  }

  if (!current.customer_email_sent) {
    const latest = (await getBookingById(bookingId))!;
    const ok = await sendCustomerBookingConfirmation(latest);
    if (ok) {
      await setBookingEmailFlags(bookingId, { customer_email_sent: true });
    } else {
      console.error('[fulfillBooking] Customer email failed for booking', bookingId);
    }
  }

  const final = await getBookingById(bookingId);
  if (final?.admin_email_sent && final.customer_email_sent) {
    await setBookingStatus(bookingId, 'confirmed');
  } else {
    await setBookingStatus(bookingId, 'processing_error');
  }
}
