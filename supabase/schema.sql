-- Bookings table for Stripe + Resend + Google Calendar flow
-- Run in Supabase SQL editor or via migration tool.

create extension if not exists "pgcrypto";

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  service_type text not null,
  price_cents integer not null check (price_cents >= 0),
  attendee_count smallint not null default 1,
  currency text not null default 'usd',

  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  language text,
  preferred_date date,
  preferred_time text,
  timezone text,
  meeting_preference text,
  notes text,
  company text,

  consent boolean not null default false,

  payment_status text not null default 'pending_payment',
  booking_status text not null default 'pending',

  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  stripe_customer_email text,
  amount_total integer,

  meeting_provider text,
  meeting_url text,
  meeting_event_id text,

  admin_email_sent boolean not null default false,
  customer_email_sent boolean not null default false
);

create index if not exists bookings_stripe_checkout_session_id_idx
  on public.bookings (stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;

create index if not exists bookings_customer_email_idx
  on public.bookings (customer_email);

create index if not exists bookings_payment_status_idx
  on public.bookings (payment_status);

create index if not exists bookings_created_at_idx
  on public.bookings (created_at desc);

-- Optional: keep updated_at fresh on any update
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
  before update on public.bookings
  for each row
  execute procedure public.set_updated_at();

-- RLS: no anonymous access; server uses service role (bypasses RLS).
alter table public.bookings enable row level security;

-- No policies = only service role can read/write (recommended for this app).
