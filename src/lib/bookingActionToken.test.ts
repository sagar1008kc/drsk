import { beforeEach, describe, expect, it } from 'vitest';
import {
  createBookingActionToken,
  isValidBookingActionToken,
} from '@/lib/bookingActionToken';

const bookingId = '11111111-1111-4111-8111-111111111111';
const email = 'Customer@Example.com';

describe('booking action tokens', () => {
  beforeEach(() => {
    process.env.BOOKING_ACTION_TOKEN_SECRET = 'test-secret';
  });

  it('validates the token for the same booking and email', () => {
    const token = createBookingActionToken(bookingId, email);
    expect(isValidBookingActionToken(bookingId, email, token)).toBe(true);
    expect(isValidBookingActionToken(bookingId, 'customer@example.com', token)).toBe(
      true
    );
  });

  it('rejects tokens for another booking or malformed input', () => {
    const token = createBookingActionToken(bookingId, email);
    expect(
      isValidBookingActionToken(
        '22222222-2222-4222-8222-222222222222',
        email,
        token
      )
    ).toBe(false);
    expect(isValidBookingActionToken(bookingId, email, 'not-a-token')).toBe(false);
  });
});
