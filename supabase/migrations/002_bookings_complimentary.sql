-- Allow complimentary (free) sessions: price_cents may be 0.
-- Run in Supabase SQL editor if you already applied the original schema.

alter table public.bookings drop constraint if exists bookings_price_cents_check;

alter table public.bookings
  add constraint bookings_price_cents_non_negative check (price_cents >= 0);
