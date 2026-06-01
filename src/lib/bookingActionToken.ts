import { createHmac, timingSafeEqual } from 'crypto';

function getTokenSecret() {
  const secret =
    process.env.BOOKING_ACTION_TOKEN_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    throw new Error('Missing BOOKING_ACTION_TOKEN_SECRET');
  }

  return secret;
}

function tokenPayload(bookingId: string, customerEmail: string) {
  return `${bookingId}:${customerEmail.trim().toLowerCase()}`;
}

export function createBookingActionToken(bookingId: string, customerEmail: string) {
  return createHmac('sha256', getTokenSecret())
    .update(tokenPayload(bookingId, customerEmail))
    .digest('hex');
}

export function isValidBookingActionToken(
  bookingId: string,
  customerEmail: string,
  token: string | undefined
) {
  if (!token || !/^[a-f0-9]{64}$/i.test(token)) return false;

  const expected = Buffer.from(
    createBookingActionToken(bookingId, customerEmail),
    'hex'
  );
  const supplied = Buffer.from(token, 'hex');

  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}
