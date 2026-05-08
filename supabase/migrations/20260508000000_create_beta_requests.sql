create extension if not exists pgcrypto;

create table if not exists public.beta_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  organisation text null,
  role text not null,
  message text null,
  source text not null default 'landing-page',
  status text not null default 'new',
  user_agent text null,
  ip_hash text null,
  reviewed_at timestamptz null,
  notes text null,
  constraint beta_requests_email_contains_at check (position('@' in email) > 1),
  constraint beta_requests_status_check check (status in ('new', 'reviewed', 'invited', 'rejected', 'spam')),
  constraint beta_requests_source_not_blank check (length(trim(source)) > 0)
);

create index if not exists beta_requests_created_at_desc_idx
  on public.beta_requests (created_at desc);

create index if not exists beta_requests_status_idx
  on public.beta_requests (status);

create index if not exists beta_requests_email_idx
  on public.beta_requests (email);

alter table public.beta_requests enable row level security;

revoke all on table public.beta_requests from anon;
revoke all on table public.beta_requests from authenticated;

-- The website API route should insert with SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
-- No public select/update/delete policies are created, so website users cannot read requests.
grant insert on table public.beta_requests to service_role;

-- Optional fallback for server-side use with SUPABASE_ANON_KEY only.
-- This allows insert-only access and still does not allow public reads.
grant insert on table public.beta_requests to anon;

create policy "Allow anon insert-only beta requests"
  on public.beta_requests
  for insert
  to anon
  with check (
    source = 'landing-page'
    and status = 'new'
    and name is not null
    and email is not null
    and role is not null
  );
