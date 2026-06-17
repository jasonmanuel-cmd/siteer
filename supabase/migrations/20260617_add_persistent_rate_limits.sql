create table if not exists public.rate_limits (
    key text primary key,
    hits integer not null default 0,
    reset_at timestamptz not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists rate_limits_reset_at_idx
    on public.rate_limits(reset_at);

create or replace function public.consume_rate_limit(
    p_key text,
    p_limit integer,
    p_window_ms integer
)
returns table(ok boolean, remaining integer, retry_after_ms bigint)
language plpgsql
security definer
set search_path = public
as $$
declare
    v_now timestamptz := now();
    v_window interval := (p_window_ms::text || ' milliseconds')::interval;
    v_hits integer;
    v_reset_at timestamptz;
begin
    if p_limit <= 0 then
        raise exception 'p_limit must be positive';
    end if;

    if p_window_ms <= 0 then
        raise exception 'p_window_ms must be positive';
    end if;

    insert into public.rate_limits as rl (key, hits, reset_at, created_at, updated_at)
    values (p_key, 1, v_now + v_window, v_now, v_now)
    on conflict (key) do update
    set hits = case
            when rl.reset_at <= v_now then 1
            else rl.hits + 1
        end,
        reset_at = case
            when rl.reset_at <= v_now then v_now + v_window
            else rl.reset_at
        end,
        updated_at = v_now
    returning hits, reset_at
    into v_hits, v_reset_at;

    return query
    select
        v_hits <= p_limit,
        greatest(p_limit - v_hits, 0),
        case
            when v_hits > p_limit then greatest((extract(epoch from (v_reset_at - v_now)) * 1000)::bigint, 0)
            else 0::bigint
        end;
end;
$$;

alter table public.rate_limits enable row level security;

do $$
begin
    if not exists (
        select 1
        from pg_policies
        where schemaname = 'public'
            and tablename = 'rate_limits'
            and policyname = 'siteer_server_access_rate_limits'
    ) then
        create policy siteer_server_access_rate_limits
            on public.rate_limits
            for all
            to anon
            using (siteer_has_server_access())
            with check (siteer_has_server_access());
    end if;
end $$;

grant execute on function public.consume_rate_limit(text, integer, integer) to anon, authenticated, service_role;
