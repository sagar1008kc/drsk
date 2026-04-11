-- Group pricing: store headcount used for $/person checkout totals.
alter table public.bookings
  add column if not exists attendee_count smallint not null default 1;
