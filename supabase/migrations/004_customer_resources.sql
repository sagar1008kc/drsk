create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  username text unique,
  email text unique,
  avatar_url text,
  role text default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  storage_key text not null,
  thumbnail_url text,
  category text,
  resource_type text default 'PDF',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_resource_access (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_id uuid not null references public.resources(id) on delete cascade,
  access_type text not null default 'manual',
  granted_at timestamptz not null default now(),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, resource_id)
);

create table if not exists public.download_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_id uuid not null references public.resources(id) on delete cascade,
  downloaded_at timestamptz not null default now(),
  ip_address text,
  user_agent text
);

create index if not exists profiles_username_idx on public.profiles (username);
create index if not exists profiles_email_idx on public.profiles (email);
create index if not exists resources_slug_idx on public.resources (slug);
create index if not exists user_resource_access_user_idx on public.user_resource_access (user_id);
create index if not exists user_resource_access_resource_idx on public.user_resource_access (resource_id);
create index if not exists download_logs_user_idx on public.download_logs (user_id);
create index if not exists download_logs_resource_idx on public.download_logs (resource_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute procedure public.set_updated_at();

drop trigger if exists resources_set_updated_at on public.resources;
create trigger resources_set_updated_at
  before update on public.resources
  for each row
  execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.resources enable row level security;
alter table public.user_resource_access enable row level security;
alter table public.download_logs enable row level security;

drop policy if exists "Profiles: own read" on public.profiles;
create policy "Profiles: own read"
  on public.profiles
  for select
  using (auth.uid() = id);

drop policy if exists "Profiles: own update" on public.profiles;
create policy "Profiles: own update"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Resources via assigned access" on public.resources;
create policy "Resources via assigned access"
  on public.resources
  for select
  using (
    exists (
      select 1
      from public.user_resource_access ura
      where ura.resource_id = resources.id
      and ura.user_id = auth.uid()
      and (ura.expires_at is null or ura.expires_at > now())
    )
  );

drop policy if exists "User access: own records" on public.user_resource_access;
create policy "User access: own records"
  on public.user_resource_access
  for select
  using (auth.uid() = user_id);

drop policy if exists "Download logs: own records" on public.download_logs;
create policy "Download logs: own records"
  on public.download_logs
  for select
  using (auth.uid() = user_id);
