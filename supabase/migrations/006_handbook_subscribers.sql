-- Leads / newsletter signups for the free handbook download.
-- Server uses service role (bypasses RLS). No public policies.

create extension if not exists "pgcrypto";

create table if not exists public.handbook_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  source text not null default 'the-mind-matters-handbook'
);

create unique index if not exists handbook_subscribers_email_lower_key
  on public.handbook_subscribers (lower(email));

create index if not exists handbook_subscribers_created_at_idx
  on public.handbook_subscribers (created_at desc);

alter table public.handbook_subscribers enable row level security;
