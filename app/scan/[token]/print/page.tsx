import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

type IssueRow = {
    id: string;
    severity: string;
    category: string;
    description: string;
    recommendation: string;
};

function ScoreBar({ label, score }: { label: string; score: number }) {
    const color = score >= 80 ? "#3ee28f" : score >= 60 ? "#ffb15c" : "#ff4d5e";
    return (
        <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{label}</span>
                <span style={{ color }}>{score}/100</span>
            </div>
            <div className="score-track" style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.08)" }}>
                <div style={{ height: 8, borderRadius: 4, width: `${score}%`, background: color }} />
            </div>
        </div>
    );
}

function severityColor(severity: string) {
    if (severity === "high") return { bg: "#fef2f2", border: "#fecaca", text: "#b91c1c" };
    if (severity === "medium") return { bg: "#fffbeb", border: "#fde68a", text: "#92400e" };
    return { bg: "#f0fdf4", border: "#bbf7d0", text: "#166534" };
}

export default async function PrintPage({ params }: { params: { token: string } }) {
    let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
    try {
        supabaseAdmin = getSupabaseAdmin();
    } catch {
        return <p style={{ padding: 40 }}>Configuration error — Supabase credentials missing.</p>;
    }

    const { data: report } = await supabaseAdmin
        .from("reports")
        .select("scan_id")
        .eq("public_token", params.token)
        .single();

    if (!report?.scan_id) {
        return <p style={{ padding: 40 }}>Report not found.</p>;
    }

    const { data: scan } = await supabaseAdmin
        .from("scans")
        .select("id,created_at,overall_grade,speed_score,mobile_score,seo_score,trust_score,est_monthly_loss_low,est_monthly_loss_high,est_loss_pct,est_monthly_visitors,metrics")
        .eq("id", report.scan_id)
        .single();

    if (!scan) return <p style={{ padding: 40 }}>Scan data not found.</p>;

    const { data: issues } = await supabaseAdmin
        .from("scan_issues")
        .select("id,severity,category,description,recommendation")
        .eq("scan_id", scan.id)
        .returns<IssueRow[]>();

    const lossLow = Number(scan.est_monthly_loss_low) || 0;
    const lossHigh = Number(scan.est_monthly_loss_high) || 0;
    const lossPct = Math.round((Number(scan.est_loss_pct) || 0) * 100);
    const scanDate = new Date(scan.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const byCategory: Record<string, IssueRow[]> = {};
    for (const issue of issues ?? []) {
        if (!byCategory[issue.category]) byCategory[issue.category] = [];
        byCategory[issue.category].push(issue);
    }

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="robots"
                    content="noindex, nofollow"
                />
                <title>SiteER Report — {scanDate}</title>
                <meta
                    name="description"
                    content="Printable SiteER report with grade, money leak, vital signs, and treatment plan."
                />
                <style>{`
                    @media print {
                        @page { margin: 0.75in; size: letter; }
                        .no-print { display: none !important; }
                        body {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                            background: white !important;
                            color: #0f172a !important;
                        }
                        .print-page-wrap { background: white !important; color: #0f172a !important; padding: 0 !important; }
                        .screen-header { display: none !important; }
                    }

                    * { box-sizing: border-box; margin: 0; padding: 0; }

                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        background:
                            radial-gradient(circle at 15% 8%, rgba(255,77,94,0.28), transparent 34%),
                            radial-gradient(circle at 84% 14%, rgba(110,231,255,0.2), transparent 32%),
                            linear-gradient(180deg, #061019 0%, #08131f 45%, #060b12 100%);
                        background-attachment: fixed;
                        color: #eef7ff;
                        min-height: 100vh;
                    }

                    .screen-header {
                        position: sticky;
                        top: 0;
                        z-index: 50;
                        backdrop-filter: blur(18px);
                        background: rgba(7,16,24,.72);
                        border-bottom: 1px solid rgba(255,255,255,.08);
                        padding: 0 32px;
                        height: 64px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }

                    .screen-header-title {
                        font-size: 1.1rem;
                        font-weight: 800;
                        letter-spacing: -0.04em;
                        color: #eef7ff;
                    }

                    .screen-header-title span {
                        color: #ff4d5e;
                    }

                    .print-page-wrap {
                        background: rgba(255,255,255,0.04);
                        border: 1px solid rgba(255,255,255,0.1);
                        border-radius: 16px;
                        padding: 40px 48px;
                        max-width: 820px;
                        margin: 32px auto 48px;
                    }

                    /* Section headings */
                    h1 { color: #eef7ff; }
                    h2 { color: #eef7ff; }
                    h3 { color: #9fb1c3; }

                    /* Score bars get dark track */
                    .score-track { background: rgba(255,255,255,0.08) !important; }

                    /* Money leak card — dark */
                    .money-card {
                        background: rgba(255,77,94,0.12) !important;
                        border: 1px solid rgba(255,77,94,0.28) !important;
                        border-radius: 12px;
                        padding: 20px;
                        margin-bottom: 24px;
                    }
                    .money-card-label { color: #ff8792 !important; }
                    .money-card-amount { color: #ffcad0 !important; }
                    .money-card-sub { color: #9fb1c3 !important; }

                    /* CTA block — dark */
                    .cta-block {
                        background: rgba(255,255,255,0.06) !important;
                        border: 1px solid rgba(255,255,255,0.12) !important;
                        border-radius: 12px;
                        padding: 20px;
                    }
                    .cta-block h3 { color: #eef7ff !important; }
                    .cta-block p { color: #9fb1c3 !important; }
                    .cta-block-link { color: #ff8792 !important; }

                    /* Issue cards */
                    .issue-high { background: rgba(220,38,38,0.12) !important; border-color: rgba(220,38,38,0.3) !important; }
                    .issue-medium { background: rgba(217,119,6,0.12) !important; border-color: rgba(217,119,6,0.3) !important; }
                    .issue-low { background: rgba(22,163,74,0.12) !important; border-color: rgba(22,163,74,0.3) !important; }
                    .issue-desc { color: #eef7ff !important; }
                    .issue-fix { color: #9fb1c3 !important; }

                    /* Footer */
                    .report-footer { border-top: 1px solid rgba(255,255,255,0.08) !important; color: #71869a !important; }
                `}</style>
            </head>
            <body>

                {/* Screen-only nav bar */}
                <div className="screen-header no-print">
                    <div className="screen-header-title">Site<span>ER</span> — Website Health Report</div>
                    <button
                        onClick={() => window.print()}
                        style={{ background: "linear-gradient(135deg,#ff4d5e,#ffb15c)", color: "#1b080a", border: "none", borderRadius: 8, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "-0.02em" }}
                    >
                        Download / Print PDF
                    </button>
                </div>

                <div className="print-page-wrap">

                {/* Header */}
                <div style={{ borderBottom: "2px solid #ff4d5e", paddingBottom: 20, marginBottom: 28 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ff4d5e", marginBottom: 4 }}>SiteER — Emergency Room for Sick Websites</div>
                            <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>Website Health Report</h1>
                            <div style={{ fontSize: 13, color: "#9fb1c3", marginTop: 6 }}>Scan date: {scanDate}</div>
                        </div>
                        <div style={{ textAlign: "center", border: "2px solid rgba(255,77,94,0.4)", borderRadius: 16, padding: "12px 20px", minWidth: 90, background: "rgba(255,77,94,0.1)" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9fb1c3" }}>Grade</div>
                            <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, color: scan.overall_grade === "A" ? "#3ee28f" : scan.overall_grade === "B" ? "#6ee7ff" : scan.overall_grade === "C" ? "#ffb15c" : scan.overall_grade === "D" ? "#ffb15c" : "#ff4d5e" }}>
                                {scan.overall_grade}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Money Leak */}
                <div className="money-card">
                    <div className="money-card-label" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Estimated Monthly Revenue Loss</div>
                    <div className="money-card-amount" style={{ fontSize: 32, fontWeight: 800 }}>
                        ${lossLow.toLocaleString()} – ${lossHigh.toLocaleString()}
                    </div>
                    {lossPct > 0 && (
                        <div className="money-card-sub" style={{ fontSize: 13, marginTop: 6 }}>
                            Approximately {lossPct}% conversion drag from identified issues
                            {(scan.est_monthly_visitors ?? 0) > 0 ? ` · ${Number(scan.est_monthly_visitors).toLocaleString()} monthly visitors at risk` : ""}
                        </div>
                    )}
                </div>

                {/* Vital Signs */}
                <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>Vital Signs</h2>
                    <ScoreBar label="Speed" score={Number(scan.speed_score)} />
                    <ScoreBar label="Mobile" score={Number(scan.mobile_score)} />
                    <ScoreBar label="SEO" score={Number(scan.seo_score)} />
                    <ScoreBar label="Trust" score={Number(scan.trust_score)} />
                </div>

                {/* Issues by category */}
                <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
                        Treatment Plan ({(issues ?? []).length} issues found)
                    </h2>
                    {Object.entries(byCategory).map(([category, catIssues]) => (
                        <div key={category} style={{ marginBottom: 20 }}>
                            <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{category}</h3>
                            {catIssues.map((issue) => {
                                const issueClass = issue.severity === "high" ? "issue-high" : issue.severity === "medium" ? "issue-medium" : "issue-low";
                                const c = severityColor(issue.severity);
                                return (
                                    <div key={issue.id} className={issueClass} style={{ borderRadius: 10, padding: "12px 14px", marginBottom: 8, pageBreakInside: "avoid", border: "1px solid transparent" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                                            <div className="issue-desc" style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>{issue.description}</div>
                                            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: c.text, background: "rgba(0,0,0,0.3)", border: `1px solid ${c.border}`, borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap" }}>
                                                {issue.severity}
                                            </span>
                                        </div>
                                        <div className="issue-fix" style={{ fontSize: 13, marginTop: 6 }}>
                                            <span style={{ fontWeight: 600 }}>Fix: </span>{issue.recommendation}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* CTA Footer */}
                <div className="cta-block" style={{ pageBreakInside: "avoid" }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Ready to fix these issues?</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.6 }}>
                        The team at <strong style={{ color: "#ff8792" }}>COAIBAKERSFIELD.COM</strong> implements your highest-impact fixes and re-scans your site to prove the improvement. Starting at $450.
                    </p>
                    <div className="cta-block-link" style={{ marginTop: 12, fontSize: 13, fontWeight: 600 }}>
                        Visit coaibakersfield.com · Run a new scan at siteer.dev
                    </div>
                </div>

                {/* Footer */}
                <div className="report-footer" style={{ marginTop: 28, paddingTop: 16, display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                    <span>Generated by SiteER · siteer.dev</span>
                    <span>Fixes by COAIBAKERSFIELD.COM · AI-powered web solutions in Bakersfield, CA</span>
                </div>

                </div>{/* end print-page-wrap */}

            </body>
        </html>
    );
}
