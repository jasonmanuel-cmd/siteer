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
    const color = score >= 80 ? "#16a34a" : score >= 60 ? "#d97706" : "#dc2626";
    return (
        <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{label}</span>
                <span style={{ color }}>{score}/100</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: "#f1f5f9" }}>
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
                        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    }
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a; background: white; }
                `}</style>
            </head>
            <body style={{ padding: "40px 48px", maxWidth: 800, margin: "0 auto" }}>

                {/* Print button — hidden when printing */}
                <div className="no-print" style={{ marginBottom: 24, textAlign: "right" }}>
                    <button
                        onClick={() => window.print()}
                        style={{ background: "#dc2626", color: "white", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                    >
                        Download / Print PDF
                    </button>
                </div>

                {/* Header */}
                <div style={{ borderBottom: "2px solid #dc2626", paddingBottom: 20, marginBottom: 28 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#dc2626", marginBottom: 4 }}>SiteER — Emergency Room for Sick Websites</div>
                            <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>Website Health Report</h1>
                            <div style={{ fontSize: 13, color: "#64748b", marginTop: 6 }}>Scan date: {scanDate}</div>
                        </div>
                        <div style={{ textAlign: "center", border: "2px solid #fecaca", borderRadius: 16, padding: "12px 20px", minWidth: 90 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b" }}>Grade</div>
                            <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, color: scan.overall_grade === "A" ? "#16a34a" : scan.overall_grade === "B" ? "#65a30d" : scan.overall_grade === "C" ? "#d97706" : scan.overall_grade === "D" ? "#ea580c" : "#dc2626" }}>
                                {scan.overall_grade}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Money Leak */}
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 20, marginBottom: 24 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#dc2626", marginBottom: 8 }}>Estimated Monthly Revenue Loss</div>
                    <div style={{ fontSize: 32, fontWeight: 800 }}>
                        ${lossLow.toLocaleString()} – ${lossHigh.toLocaleString()}
                    </div>
                    {lossPct > 0 && (
                        <div style={{ fontSize: 13, color: "#64748b", marginTop: 6 }}>
                            Approximately {lossPct}% conversion drag from identified issues
                            {(scan.est_monthly_visitors ?? 0) > 0 ? ` · ${Number(scan.est_monthly_visitors).toLocaleString()} monthly visitors at risk` : ""}
                        </div>
                    )}
                </div>

                {/* Vital Signs */}
                <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, borderBottom: "1px solid #e2e8f0", paddingBottom: 8 }}>Vital Signs</h2>
                    <ScoreBar label="Speed" score={Number(scan.speed_score)} />
                    <ScoreBar label="Mobile" score={Number(scan.mobile_score)} />
                    <ScoreBar label="SEO" score={Number(scan.seo_score)} />
                    <ScoreBar label="Trust" score={Number(scan.trust_score)} />
                </div>

                {/* Issues by category */}
                <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, borderBottom: "1px solid #e2e8f0", paddingBottom: 8 }}>
                        Treatment Plan ({(issues ?? []).length} issues found)
                    </h2>
                    {Object.entries(byCategory).map(([category, catIssues]) => (
                        <div key={category} style={{ marginBottom: 20 }}>
                            <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: 10 }}>{category}</h3>
                            {catIssues.map((issue) => {
                                const c = severityColor(issue.severity);
                                return (
                                    <div key={issue.id} style={{ border: `1px solid ${c.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8, background: c.bg, pageBreakInside: "avoid" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                                            <div style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>{issue.description}</div>
                                            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: c.text, background: "white", border: `1px solid ${c.border}`, borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap" }}>
                                                {issue.severity}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>
                                            <span style={{ fontWeight: 600 }}>Fix: </span>{issue.recommendation}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* CTA Footer */}
                <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 20, background: "#f8fafc", pageBreakInside: "avoid" }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Ready to fix these issues?</h3>
                    <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>
                        The team at <strong>COAIBAKERSFIELD.COM</strong> implements your highest-impact fixes and re-scans your site to prove the improvement. Starting at $450.
                    </p>
                    <div style={{ marginTop: 12, fontSize: 13, fontWeight: 600, color: "#dc2626" }}>
                        Visit coaibakersfield.com or run a new scan at siteer.dev
                    </div>
                </div>

                {/* Footer */}
                <div style={{ borderTop: "1px solid #e2e8f0", marginTop: 28, paddingTop: 16, display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94a3b8" }}>
                    <span>Generated by SiteER · siteer.dev</span>
                    <span>Fixes by COAIBAKERSFIELD.COM · AI-powered web solutions in Bakersfield, CA</span>
                </div>

            </body>
        </html>
    );
}
