import { getSupabaseAdmin } from '@/lib/supabase';
import { getServiceByType } from '@/lib/services';
import type { BookingRow, BookingStatus, PaymentStatus } from '@/types/booking';

export type InsertBookingInput = {
  service_type: string;
  price_cents: number;
  attendee_count: number;
  currency: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  language: string;
  preferred_date: string;
  preferred_time: string;
  timezone: string;
  meeting_preference: string;
  notes: string | null;
  company: string | null;
  consent: boolean;
  initial_payment_status: 'pending_payment' | 'complimentary_pending';
};

export async function insertBooking(
  input: InsertBookingInput
): Promise<{ id: string }> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      service_type: input.service_type,
      price_cents: input.price_cents,
      attendee_count: input.attendee_count,
      currency: input.currency,
      customer_name: input.customer_name,
      customer_email: input.customer_email,
      customer_phone: input.customer_phone,
      language: input.language,
      preferred_date: input.preferred_date,
      preferred_time: input.preferred_time,
      timezone: input.timezone,
      meeting_preference: input.meeting_preference,
      notes: input.notes,
      company: input.company,
      consent: input.consent,
      payment_status: input.initial_payment_status,
      booking_status: 'pending',
    })
    .select('id')
    .single();

  if (error || !data?.id) {
    console.error('insertBooking error:', error);
    const hint = error?.message ?? '';
    if (/attendee_count|column/i.test(hint)) {
      throw new Error(
        'Database is missing column attendee_count. Run supabase/migrations/003_booking_attendee_count.sql in Supabase SQL editor.'
      );
    }
    throw new Error(hint || 'Could not save booking.');
  }

  return { id: data.id };
}

export async function getBookingById(id: string): Promise<BookingRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('getBookingById error:', error);
    return null;
  }

  return data as BookingRow | null;
}

export async function getBookingByStripeSessionId(
  sessionId: string
): Promise<BookingRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('stripe_checkout_session_id', sessionId)
    .maybeSingle();

  if (error) {
    console.error('getBookingByStripeSessionId error:', error);
    return null;
  }

  return data as BookingRow | null;
}

/**
 * One-time transition for complimentary (free) bookings before Meet + emails.
 */
export async function claimComplimentaryBooking(
  bookingId: string
): Promise<BookingRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('bookings')
    .update({
      payment_status: 'waived' as PaymentStatus,
      amount_total: 0,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId)
    .eq('payment_status', 'complimentary_pending')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('claimComplimentaryBooking error:', error);
    return null;
  }

  return data as BookingRow | null;
}

export async function updateBookingStripeSession(
  bookingId: string,
  stripeCheckoutSessionId: string
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('bookings')
    .update({
      stripe_checkout_session_id: stripeCheckoutSessionId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId)
    .eq('payment_status', 'pending_payment');

  if (error) {
    console.error('updateBookingStripeSession error:', error);
    return false;
  }

  return true;
}

export type PaidClaimPatch = {
  stripe_payment_intent_id: string | null;
  amount_total: number | null;
  stripe_customer_email: string | null;
};

/**
 * Atomically marks a booking paid only if it was still pending_payment.
 * Returns the updated row if this invocation won the race; otherwise null.
 */
export async function claimBookingPaid(
  bookingId: string,
  patch: PaidClaimPatch
): Promise<BookingRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('bookings')
    .update({
      payment_status: 'paid' as PaymentStatus,
      stripe_payment_intent_id: patch.stripe_payment_intent_id,
      amount_total: patch.amount_total,
      stripe_customer_email: patch.stripe_customer_email,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId)
    .eq('payment_status', 'pending_payment')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('claimBookingPaid error:', error);
    return null;
  }

  return data as BookingRow | null;
}

export async function updateBookingMeeting(
  bookingId: string,
  fields: {
    meeting_provider: string;
    meeting_url: string;
    meeting_event_id: string;
  }
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('bookings')
    .update({
      ...fields,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('updateBookingMeeting error:', error);
  }
}

export async function setBookingEmailFlags(
  bookingId: string,
  flags: { admin_email_sent?: boolean; customer_email_sent?: boolean }
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('bookings')
    .update({
      ...flags,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('setBookingEmailFlags error:', error);
  }
}

export async function setBookingStatus(
  bookingId: string,
  status: BookingStatus
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('bookings')
    .update({
      booking_status: status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('setBookingStatus error:', error);
  }
}

export function getServiceTitleForBooking(serviceType: string): string {
  return getServiceByType(serviceType)?.title ?? serviceType;
}
