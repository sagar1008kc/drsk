export type PaymentStatus =
  | 'pending_payment'
  | 'complimentary_pending'
  | 'paid'
  | 'waived'
  | 'failed'
  | 'canceled';

export type BookingStatus = 'pending' | 'confirmed' | 'processing_error';

export type BookingRow = {
  id: string;
  created_at: string;
  updated_at: string;
  service_type: string;
  price_cents: number;
  /** Headcount for per-person pricing (group); defaults to 1 if absent in older rows. */
  attendee_count?: number;
  currency: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  language: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  timezone: string | null;
  meeting_preference: string | null;
  notes: string | null;
  company: string | null;
  consent: boolean;
  payment_status: PaymentStatus;
  booking_status: BookingStatus;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_customer_email: string | null;
  amount_total: number | null;
  meeting_provider: string | null;
  meeting_url: string | null;
  meeting_event_id: string | null;
  admin_email_sent: boolean;
  customer_email_sent: boolean;
};
