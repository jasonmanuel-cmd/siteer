create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text,
    created_at timestamptz default now()
);

create table if not exists public.leads (
    id uuid primary key default uuid_generate_v4(),
    email text not null unique,
    created_at timestamptz default now()
);

create table if not exists public.sites (
    id uuid primary key default uuid_generate_v4(),
    url text not null unique,
    created_at timestamptz default now()
);

create table if not exists public.scans (
    id uuid primary key default uuid_generate_v4(),
    site_id uuid references public.sites(id) on delete cascade,
    created_at timestamptz default now(),
    overall_grade text not null,
    speed_score int not null,
    mobile_score int not null,
    seo_score int not null,
    trust_score int not null,
    est_monthly_visitors int,
    est_conv_rate numeric,
    est_avg_value numeric,
    est_loss_pct numeric,
    est_monthly_loss_low numeric,
    est_monthly_loss_high numeric,
    status text default 'pending',
    metrics jsonb default '{}'::jsonb
);

create table if not exists public.scan_issues (
    id uuid primary key default uuid_generate_v4(),
    scan_id uuid references public.scans(id) on delete cascade,
    category text not null,
    severity text not null,
    description text not null,
    recommendation text not null
);

create table if not exists public.reports (
    id uuid primary key default uuid_generate_v4(),
    scan_id uuid references public.scans(id) on delete cascade,
    lead_id uuid references public.leads(id) on delete set null,
    public_token text not null unique,
    created_at timestamptz default now()
);

-- Indexes
create index if not exists scans_site_id_idx on public.scans(site_id);
create index if not exists scan_issues_scan_id_idx on public.scan_issues(scan_id);
create index if not exists reports_public_token_idx on public.reports(public_token);
create index if not exists reports_lead_id_idx on public.reports(lead_id);

create table if not exists public.quotes (
    id uuid primary key default uuid_generate_v4(),
    first_name text not null,
    last_name text not null,
    email text not null,
    phone text,
    business_name text not null,
    website_url text,
    created_at timestamptz default now()
);

create table if not exists public.payments (
    id uuid primary key default uuid_generate_v4(),
    scan_id uuid references public.scans(id) on delete set null,
    report_token text,
    email text,
    square_link_id text,
    amount_cents int not null default 4900,
    status text not null default 'pending',
    created_at timestamptz default now()
);

create index if not exists payments_report_token_idx on public.payments(report_token);

-- Row Level Security
-- All app operations use the service_role key (which bypasses RLS).
-- RLS is enabled here to block direct anon-key access to every table.
alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.sites enable row level security;
alter table public.scans enable row level security;
alter table public.scan_issues enable row level security;
alter table public.reports enable row level security;
alter table public.quotes enable row level security;
alter table public.payments enable row level security;
