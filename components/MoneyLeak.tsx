"use client";

import { useState } from "react";

type MoneyScan = {
    est_monthly_loss_low: number | string | null;
    est_monthly_loss_high: number | string | null;
    est_loss_pct: number | string | null;
    est_monthly_visitors?: number | string | null;
    est_conv_rate?: number | string | null;
    est_avg_value?: number | string | null;
};

function toCurrency(value: number | string | null): string {
    const numeric = Number(value) || 0;
    return numeric.toLocaleString();
}

function gradeBand(lossPct: number): string {
    if (lossPct <= 0.1) return "A (90–100)";
    if (lossPct <= 0.25) return "B–C (70–89)";
    if (lossPct <= 0.4) return "D (60–69)";
    return "F (below 60)";
}

export default function MoneyLeak({ scan }: { scan: MoneyScan }) {
    const [showFormula, setShowFormula] = useState(false);

    const pct = Math.round((Number(scan.est_loss_pct) || 0) * 100);
    const visitorsRaw = Number(scan.est_monthly_visitors) || 800;
    const convRaw = Number(scan.est_conv_rate) || 0.04;
    const avgRaw = Number(scan.est_avg_value) || 250;
    const visitorsLost = Math.round(visitorsRaw * (Number(scan.est_loss_pct) || 0));
    const usingDefaults = !scan.est_monthly_visitors;
    const grade = gradeBand(Number(scan.est_loss_pct) || 0);

    return (
        <section className="rounded-2xl border border-black/10 bg-white/95 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold">Your Site's Financial Impact</h2>
                <button
                    type="button"
                    onClick={() => setShowFormula(!showFormula)}
                    className="shrink-0 rounded-full border border-black/10 bg-slate-50 px-3 py-1 text-xs font-medium text-black/50 hover:bg-slate-100 transition-colors"
                    aria-label="Show how this estimate is calculated"
                >
                    {showFormula ? "Hide formula" : "How is this calculated?"}
                </button>
            </div>

            <p className="mt-2 text-sm text-black/65">
                Based on website speed, mobile experience, and customer trust signals, here's the estimated monthly revenue impact:
            </p>

            {showFormula && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-black/70">
                    <p className="font-semibold text-black mb-2">Formula</p>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Baseline monthly revenue = visitors × conversion rate × average order value</li>
                        <li>Loss % by grade: A = 10%, B–C = 25%, D = 40%, F = 55%</li>
                        <li>Range = baseline × loss% × 0.7 to baseline × loss% × 1.3</li>
                    </ol>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                        <div className="rounded-lg bg-white border border-slate-200 p-2">
                            <div className="text-black/45 mb-1">Monthly visitors</div>
                            <div className="font-semibold">{visitorsRaw.toLocaleString()}{usingDefaults ? " (default)" : ""}</div>
                        </div>
                        <div className="rounded-lg bg-white border border-slate-200 p-2">
                            <div className="text-black/45 mb-1">Conversion rate</div>
                            <div className="font-semibold">{(convRaw * 100).toFixed(1)}%{usingDefaults ? " (default)" : ""}</div>
                        </div>
                        <div className="rounded-lg bg-white border border-slate-200 p-2">
                            <div className="text-black/45 mb-1">Avg. order value</div>
                            <div className="font-semibold">${avgRaw}{usingDefaults ? " (default)" : ""}</div>
                        </div>
                    </div>
                    <p className="mt-3 text-xs text-black/45">
                        Your grade band: <strong>{grade}</strong> → {pct}% loss rate applied.{" "}
                        {usingDefaults && "Enter your real numbers on the homepage for a more precise estimate."}
                    </p>
                </div>
            )}

            <div className="mt-4 rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-amber-50 p-4">
                <div className="text-xs uppercase tracking-wider text-black/55">
                    Estimated Monthly Sales at Risk
                </div>
                <div className="mt-1 text-3xl font-semibold">
                    ${toCurrency(scan.est_monthly_loss_low)} – ${toCurrency(scan.est_monthly_loss_high)}
                </div>
                <div className="mt-2 text-sm text-black/65">
                    That's about {pct}% of potential sales being lost each month
                </div>
                {visitorsLost > 0 ? (
                    <div className="mt-1 text-sm text-black/65">
                        Affected visitors per month: ~{visitorsLost.toLocaleString()}
                    </div>
                ) : null}
            </div>

            {usingDefaults && (
                <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    Using default assumptions (800 visitors/mo, 4% conversion, $250 AOV).{" "}
                    <a href="/" className="underline font-medium">Re-scan with your real numbers</a> for a more accurate estimate.
                </p>
            )}

            <p className="mt-3 text-xs text-black/45">
                This estimate is directional — a benchmark to frame the cost of inaction, not a guaranteed revenue figure.
            </p>
        </section>
    );
}
