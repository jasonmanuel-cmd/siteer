import nextDynamic from "next/dynamic";
const PrintReportButton = nextDynamic(() => import("@/components/PrintReportButton"), { ssr: false, loading: () => null });
const BuyReportButton = nextDynamic(() => import("@/components/BuyReportButton"), { ssr: false, loading: () => null });
const MoneyLeak = nextDynamic(() => import("@/components/MoneyLeak"), { ssr: false, loading: () => null });
const VitalSigns = nextDynamic(() => import("@/components/VitalSigns"), { ssr: false, loading: () => null });
import TreatmentPlan from "@/components/TreatmentPlan";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const BASE_URL = "https://siteer.dev";

type ScanRow = {
    id: string;
    created_at: string;
    overall_grade: string;
    speed_score: number;
    mobile_score: number;
    seo_score: number;
    trust_score: number;
    est_monthly_loss_low: number | string | null;
    est_monthly_loss_high: number | string | null;
    est_loss_pct: number | string | null;
    est_monthly_visitors: number | string | null;
};

type IssueRow = {
    id: string;
    severity: string;
    category: string;
    description: string;
    recommendation: string;
};

async function loadReportSummary(token: string) {
    const supabaseAdmin = getSupabaseAdmin();

    const { data: report } = await supabaseAdmin
        .from("reports")
        .select("scan_id,public_token")
        .eq("public_token", token)
        .single();

    if (!report?.scan_id) return null;

    const { data: scan } = await supabaseAdmin
        .from("scans")
        .select("id,created_at,overall_grade,speed_score,mobile_score,seo_score,trust_score")
        .eq("id", report.scan_id)
        .single<ScanRow>();

    if (!scan) return null;

    return scan;
}

export async function generateMetadata({ params }: { params: { token: string } }): Promise<Metadata> {
    try {
        const scan = await loadReportSummary(params.token);

        if (!scan) {
            return {
                title: "SiteER Report",
                description: "View your SiteER scan results and treatment plan.",
                robots: {
                    index: false,
                    follow: false,
                },
            };
        }

        return {
            title: `SiteER Report - Grade ${scan.overall_grade}`,
            description: `View the SiteER scan for this site. Grade ${scan.overall_grade} across speed, mobile, SEO, and trust with a prioritized treatment plan.`,
            robots: {
                index: false,
                follow: false,
            },
            openGraph: {
                title: `SiteER Report - Grade ${scan.overall_grade}`,
                description: `Scan results for this site with a prioritized treatment plan.`,
                url: `${BASE_URL}/scan/${params.token}`,
                siteName: "SiteER",
                type: "website",
            },
        };
    } catch {
        return {
            title: "SiteER Report",
            description: "View your SiteER scan results and treatment plan.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }
}

export default async function ReportPage({
    params,
    searchParams,
}: {
    params: { token: string };
    searchParams: { paid?: string };
}) {
    const token = params.token;
    const isPaid = searchParams.paid === "true";

    let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
    try {
        supabaseAdmin = getSupabaseAdmin();
    } catch (error) {
        return (
            <main className="mx-auto max-w-3xl px-5 py-10">
                <h1 className="text-2xl font-semibold">Configuration required</h1>
                <p className="mt-2 text-black/60">
                    {error instanceof Error ? error.message : "Supabase credentials are missing."}
                </p>
            </main>
        );
    }

    const { data: report, error: reportError } = await supabaseAdmin
        .from("reports")
        .select("scan_id,public_token")
        .eq("public_token", token)
        .single();

    if (reportError || !report) {
        return (
            <main className="mx-auto max-w-3xl px-5 py-10">
                <h1 className="text-2xl font-semibold">Report not found</h1>
                <p className="mt-2 text-black/60">This link is invalid or may have expired.</p>
            </main>
        );
    }

    if (!report.scan_id) {
        return (
            <main className="mx-auto max-w-3xl px-5 py-10">
                <h1 className="text-2xl font-semibold">Scan missing</h1>
                <p className="mt-2 text-black/60">This report is not linked to a scan.</p>
            </main>
        );
    }

    const { data: scan, error: scanError } = await supabaseAdmin
        .from("scans")
        .select(
            "id,created_at,overall_grade,speed_score,mobile_score,seo_score,trust_score,est_monthly_loss_low,est_monthly_loss_high,est_loss_pct,est_monthly_visitors",
        )
        .eq("id", report.scan_id)
        .single<ScanRow>();

    if (scanError || !scan) {
        return (
            <main className="mx-auto max-w-3xl px-5 py-10">
                <h1 className="text-2xl font-semibold">Scan missing</h1>
                <p className="mt-2 text-black/60">We could not load scan data.</p>
            </main>
        );
    }

    const { data: issues } = await supabaseAdmin
        .from("scan_issues")
        .select("id,severity,category,description,recommendation")
        .eq("scan_id", scan.id)
        .returns<IssueRow[]>();

    return (
        <main className="light-page mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
            <header className="flex flex-wrap items-center justify-between gap-3">
                <a className="text-sm font-semibold tracking-tight" href="/">
                    SiteER <span className="text-black/45">/ Report</span>
                </a>
                <div className="flex flex-wrap items-center gap-3">
                    <PrintReportButton />
                    <a className="text-sm text-black/60 hover:text-black" href="/pricing">
                        Pricing
                    </a>
                </div>
            </header>

            <section className="mt-10 flex flex-wrap items-start justify-between gap-5">
                <div>
                    <h1 className="text-3xl font-semibold md:text-4xl">SiteER Report</h1>
                    <p className="mt-2 text-sm text-black/60">
                        Scan date: {new Date(scan.created_at).toLocaleString()}
                    </p>
                </div>
                <div className="rounded-2xl border border-red-200 bg-white/95 px-6 py-4 text-center shadow-sm">
                    <div className="text-xs uppercase tracking-wider text-black/55">Overall Grade</div>
                    <div className="mt-1 text-5xl font-bold">{scan.overall_grade}</div>
                </div>
            </section>

            <section className="mt-8 grid gap-6 md:grid-cols-2">
                <MoneyLeak scan={scan} />

                <div className="rounded-2xl border border-black/10 bg-white/95 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold">Need this fixed fast?</h2>
                    <p className="mt-2 text-sm text-black/65">
                        The team at{" "}
                        <a
                            href="https://coaibakersfield.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-red-600 hover:underline"
                        >
                            COAIBAKERSFIELD.COM
                        </a>{" "}
                        implements the top fixes and runs a second scan to verify improvement.
                    </p>
                    <a
                        className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white"
                        href="/get-quote"
                    >
                        Get a Fix Quote
                    </a>
                    <p className="mt-3 text-xs text-black/50">Typical turnaround is 3-7 business days. Need the exact next steps first? Unlock the $20 Quick ER Audit below.</p>

                    {isPaid ? (
                        <a
                            href={`/scan/${token}/print`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-green-300 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-800 hover:bg-green-100 transition-colors"
                        >
                            Download PDF Report ↗
                        </a>
                    ) : (
                        <BuyReportButton reportToken={token} />
                    )}
                </div>
            </section>

            <section className="mt-8">
                <VitalSigns scan={scan} />
            </section>

            <section className="mt-8">
                <TreatmentPlan issues={issues || []} />
            </section>

            {/* COAIBAKERSFIELD attribution */}
            <footer className="mt-16 border-t border-slate-100 pt-8">
                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
                    <span>Generated by SiteER</span>
                    <span>
                        Professional fixes by{" "}
                        <a
                            href="https://coaibakersfield.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-slate-500 hover:text-red-600 transition-colors"
                        >
                            COAIBAKERSFIELD.COM
                        </a>
                        {" "}— AI-powered web solutions in Bakersfield, CA
                    </span>
                </div>
            </footer>
        </main>
    );
}
