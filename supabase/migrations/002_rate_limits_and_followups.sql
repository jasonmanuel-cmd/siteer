-- Persistent rate limiting table (replaces in-memory Map on serverless)
create table if not exists public.rate_limits (
    key text primary key,
    hits int not null default 0,
    reset_at timestamptz not null
);

-- Scheduled follow-up emails for lead re-engagement
create table if not exists public.follow_up_emails (
    id uuid primary key default uuid_generate_v4(),
    lead_id uuid references public.leads(id) on delete cascade,
    email text not null,
    report_token text,
    send_at timestamptz not null,
    sent_at timestamptz,
    type text not null check (type in ('day_3', 'day_7')),
    created_at timestamptz default now()
);

create index if not exists follow_up_emails_send_at_idx
    on public.follow_up_emails(send_at)
    where sent_at is null;

create index if not exists follow_up_emails_lead_id_idx
    on public.follow_up_emails(lead_id);

-- RLS: service_role bypasses these, so block anon key access
alter table public.rate_limits enable row level security;
alter table public.follow_up_emails enable row level security;

-- Auto-clean stale rate limit rows older than 10 minutes (runs as background cleanup)
create or replace function public.cleanup_rate_limits()
returns void
language sql
security definer
as $$
    delete from public.rate_limits where reset_at < now() - interval '10 minutes';
$$;

-- Atomic upsert used by the persistent rate limiter
-- Returns: { hits, reset_at, allowed }
create or replace function public.upsert_rate_limit(
    p_key text,
    p_limit int,
    p_reset_at timestamptz
)
returns jsonb
language plpgsql
security definer
as $$
declare
    v_row public.rate_limits;
    v_allowed boolean;
begin
    -- Try to insert a new bucket; if it already exists, increment hits
    insert into public.rate_limits(key, hits, reset_at)
    values (p_key, 1, p_reset_at)
    on conflict (key) do update
        set hits = case
            when rate_limits.reset_at <= now() then 1
            else rate_limits.hits + 1
        end,
        reset_at = case
            when rate_limits.reset_at <= now() then p_reset_at
            else rate_limits.reset_at
        end
    returning * into v_row;

    v_allowed := v_row.hits <= p_limit;

    return jsonb_build_object(
        'hits', v_row.hits,
        'reset_at', v_row.reset_at,
        'allowed', v_allowed
    );
end;
$$;
