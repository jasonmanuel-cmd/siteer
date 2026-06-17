"use client";

import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { trackEvent } from "@/lib/analyticsClient";
import { quickAuditOffer } from "@/lib/offers";

const ReportTeaser = dynamic(() => import("./ReportTeaser"), { ssr: false, loading: () => null });
const ScanningOverlay = dynamic(() => import("./ScanningOverlay"), { ssr: false, loading: () => null });
import type { Issue } from "@/lib/scan/analyzeHtml";

type TeaserPayload = {
    ok: boolean;
    scanId: string;
    scanSource?: "pagespeed" | "heuristic";
    scanNote?: string;
    grade: string;
    scores: { speed: number; mobile: number; seo: number; trust: number; overall: number };
    money: { lossLow: number; lossHigh: number; lossPct: number; visitors: number; conv: number; avg: number };
    topIssues: Issue[];
    error?: string;
};

const STEPS = [
    "🔍 Checking your website...",
    "⚡ Checking performance signals...",
    "🎯 Analyzing SEO, mobile & trust...",
    "✅ Creating your report...",
];

function normalizeInputUrl(input: string): string {
    const trimmed = input.trim();
    if (!trimmed) return "";
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
}

function getSiteLabel(input: string): string {
    const normalized = normalizeInputUrl(input);
    if (!normalized) return "your site";
    try {
        return new URL(normalized).hostname.replace(/^www\./, "");
    } catch {
        return input.trim() || "your site";
    }
}

function gradeColor(grade: string) {
    if (grade === "A") return "var(--er-green)";
    if (grade === "B") return "var(--er-cyan)";
    if (grade === "C") return "var(--er-orange)";
    return "var(--er-red)";
}

function ScoreBar({ label, value }: { label: string; value: number }) {
    const safeValue = Math.max(0, Math.min(100, value));
    return (
        <div style={{ display: "grid", gridTemplateColumns: "72px 1fr 42px", alignItems: "center", gap: 11, color: "var(--er-muted)", fontSize: "0.9rem" }}>
            <span>{label}</span>
            <div style={{ height: 10, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden", position: "relative" }}>
                <div className="bar-fill" style={{ height: "100%", borderRadius: 999, background: "linear-gradient(90deg, #ff4d5e, #ffb15c)", width: `${safeValue}%`, boxShadow: "0 0 18px rgba(255,77,94,.32)" }} />
            </div>
            <span>{safeValue}</span>
        </div>
    );
}

export default function UrlScanForm() {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [leadEmail, setLeadEmail] = useState("");
    const [visitors, setVisitors] = useState("");
    const [conv, setConv] = useState("");
    const [avgVal, setAvgVal] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(-1);
    const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set());
    const [teaser, setTeaser] = useState<TeaserPayload | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [reportUrl, setReportUrl] = useState<string | null>(null);
    const [leadError, setLeadError] = useState<string | null>(null);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    async function runScan(e: React.FormEvent) {
        e.preventDefault();
        
        // Honeypot validation: if this hidden field has a value, reject (it's a bot)
        const form = e.currentTarget as HTMLFormElement;
        const honeypot = (form.querySelector('input[name="website_url"]') as HTMLInputElement)?.value;
        if (honeypot) {
            return; // Silently reject bot submissions
        }

        setLoading(true);
        setError(null);
        setTeaser(null);
        setReportUrl(null);
        setLeadError(null);
        setActiveStep(0);
        setDoneSteps(new Set());

        trackEvent("scan_started", {
            has_name: Boolean(name.trim()),
            has_email: Boolean(leadEmail.trim()),
            has_advanced_inputs: Boolean(visitors || conv || avgVal),
        });

        let step = 0;
        intervalRef.current = setInterval(() => {
            if (step < STEPS.length - 1) {
                setDoneSteps((prev) => {
                    const next = new Set(prev);
                    next.add(step);
                    return next;
                });
                step++;
                setActiveStep(step);
            }
        }, 1600);

        try {
            const sanitizedUrl = normalizeInputUrl(url);
            const body: Record<string, unknown> = { url: sanitizedUrl };
            if (name.trim()) body.name = name.trim();
            if (leadEmail.trim()) body.email = leadEmail.trim();
            if (visitors) body.estMonthlyVisitors = Number(visitors);
            if (conv) body.estConvRate = Number(conv) / 100;
            if (avgVal) body.estAvgValue = Number(avgVal);

            const res = await fetch("/api/scan", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = (await res.json()) as TeaserPayload;

            if (!res.ok || !data.ok) throw new Error(data.error || "Scan failed");

            if (intervalRef.current) clearInterval(intervalRef.current);
            setDoneSteps(new Set([0, 1, 2, 3]));
            setActiveStep(-1);
            trackEvent("scan_completed", {
                scan_source: data.scanSource ?? "unknown",
                grade: data.grade,
                overall_score: data.scores.overall,
                issue_count: data.topIssues.length,
                loss_low: data.money.lossLow,
                loss_high: data.money.lossHigh,
            });
            setTeaser(data);
        } catch (err) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setActiveStep(-1);
            const message = err instanceof Error ? err.message : "Scan failed";
            trackEvent("scan_failed", {
                reason: message.slice(0, 120),
            });
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    async function captureLead(e: React.FormEvent) {
        e.preventDefault();
        if (!teaser) return;
        setSubmitting(true);
        setLeadError(null);
        try {
            const res = await fetch("/api/lead", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email: leadEmail, scanId: teaser.scanId }),
            });
            const data = (await res.json()) as { ok?: boolean; reportUrl?: string; error?: string };
            if (!res.ok || !data.ok || !data.reportUrl) throw new Error(data.error || "Unable to unlock report");
            trackEvent("summary_unlocked", {
                scan_source: teaser.scanSource ?? "unknown",
                grade: teaser.grade,
                overall_score: teaser.scores.overall,
            });
            setReportUrl(data.reportUrl);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to unlock report";
            trackEvent("summary_unlock_failed", {
                reason: message.slice(0, 120),
            });
            setLeadError(message);
        } finally {
            setSubmitting(false);
        }
    }

    const lossLow = teaser ? Number(teaser.money.lossLow) || 0 : 0;
    const lossHigh = teaser ? Number(teaser.money.lossHigh) || 0 : 0;

    return (
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 22, alignItems: "stretch" }} className="!grid-cols-1 md:!grid-cols-[0.9fr_1.1fr]">
            {/* Left: Intake panel */}
            <div style={{ borderRadius: 30, background: "rgba(255,255,255,.075)", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 24px 80px rgba(0,0,0,.38)", padding: 26, overflow: "hidden" }}>
                <h3 style={{ fontSize: "1.55rem", letterSpacing: "-.04em", marginBottom: 10 }}>Start your free scan</h3>
                <p style={{ color: "var(--er-muted)", lineHeight: 1.65, marginBottom: 20 }}>
                    In about 60 seconds, you'll see your A–F grade, estimated monthly money leak, and top 3 critical symptoms. The shareable summary link comes right after. The detailed treatment plan unlocks with the {quickAuditOffer.priceLabel} audit.
                </p>

                <div style={{ display: "grid", gap: 9, marginBottom: 20 }}>
                    <div style={{ borderRadius: 14, padding: "14px 14px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.035)", color: "var(--er-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                        <strong style={{ color: "white" }}>1.</strong> Your A–F grade, so you know how sick the site really is
                    </div>
                    <div style={{ borderRadius: 14, padding: "14px 14px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.035)", color: "var(--er-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                        <strong style={{ color: "white" }}>2.</strong> Estimated monthly money leak, so the damage is easy to understand
                    </div>
                    <div style={{ borderRadius: 14, padding: "14px 14px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.035)", color: "var(--er-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                        <strong style={{ color: "white" }}>3.</strong> Top symptoms now, then the shareable summary report and {quickAuditOffer.priceLabel} detailed audit
                    </div>
                </div>

                <form id="demoForm" onSubmit={runScan}>
                    {/* Honeypot field to prevent bot submissions */}
                    <input
                        type="hidden"
                        name="website_url"
                        tabIndex={-1}
                        autoComplete="off"
                        style={{ display: "none" }}
                    />

                    <label style={{ display: "block", color: "#ccdae7", fontWeight: 700, marginBottom: 9, fontSize: "0.9rem" }}>
                        First name <span style={{ color: "var(--er-red)", fontSize: "1.1em" }}>*</span>
                        <span style={{ color: "var(--er-muted-2)", fontWeight: 500 }}> {" "}— so we can label your private report</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane"
                        required
                        maxLength={100}
                        style={{ width: "100%", border: "1px solid rgba(255,255,255,.12)", outline: "none", background: "rgba(255,255,255,.92)", color: "#111111", borderRadius: 16, padding: "18px 20px", minHeight: 56, marginBottom: 16, fontSize: "1rem" }}
                    />

                    <label style={{ display: "block", color: "#ccdae7", fontWeight: 700, marginBottom: 9, fontSize: "0.9rem" }}>
                        Email <span style={{ color: "var(--er-red)", fontSize: "1.1em" }}>*</span>
                        <span style={{ color: "var(--er-muted-2)", fontWeight: 500 }}> {" "}— where we send your private ER chart</span>
                    </label>
                    <input
                        type="email"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        maxLength={254}
                        style={{ width: "100%", border: "1px solid rgba(255,255,255,.12)", outline: "none", background: "rgba(255,255,255,.92)", color: "#111111", borderRadius: 16, padding: "18px 20px", minHeight: 56, marginBottom: 16, fontSize: "1rem" }}
                    />

                    <label style={{ display: "block", color: "#ccdae7", fontWeight: 700, marginBottom: 9, fontSize: "0.9rem" }}>
                        Website URL <span style={{ color: "var(--er-red)", fontSize: "1.1em" }}>*</span>
                        <span style={{ color: "var(--er-muted-2)", fontWeight: 500 }}> {" "}— homepage or highest-traffic page</span>
                    </label>
                    <input
                        id="demoUrl"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onBlur={(e) => setUrl(normalizeInputUrl(e.target.value))}
                        placeholder="coaibakersfield.com"
                        required
                        maxLength={2048}
                        style={{ width: "100%", border: "1px solid rgba(255,255,255,.12)", outline: "none", background: "rgba(255,255,255,.92)", color: "#111111", borderRadius: 16, padding: "18px 20px", minHeight: 56, marginBottom: 16, fontSize: "1rem" }}
                    />

                    {/* Advanced Options Toggle */}
                    {!showAdvanced && (
                        <button
                            type="button"
                            onClick={() => setShowAdvanced(true)}
                            style={{ width: "100%", marginBottom: 16, border: "1px dashed rgba(255,255,255,.25)", background: "transparent", color: "#ffb6bf", borderRadius: 14, padding: 12, fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", transition: "all .3s" }}
                        >
                            ⚙️ Want a more accurate estimate? Show advanced options
                        </button>
                    )}

                    {showAdvanced && (
                        <div style={{ borderRadius: 16, background: "rgba(255,77,94,.1)", border: "1px solid rgba(255,77,94,.2)", padding: 14, marginBottom: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                                <label style={{ color: "#ccdae7", fontWeight: 700, fontSize: "0.95rem" }}>Advanced Options</label>
                                <button
                                    type="button"
                                    onClick={() => setShowAdvanced(false)}
                                    style={{ background: "transparent", border: "none", color: "var(--er-muted)", cursor: "pointer", fontSize: "1.2rem" }}
                                >
                                    ✕
                                </button>
                            </div>

                            <label style={{ display: "block", color: "#ccdae7", fontWeight: 700, marginBottom: 9, fontSize: "0.9rem" }}>Monthly website visitors (optional)</label>
                            <input
                                type="number"
                                min="0"
                                value={visitors}
                                onChange={(e) => setVisitors(e.target.value)}
                                placeholder="e.g. 5000"
                                maxLength={10}
                                style={{ width: "100%", border: "1px solid rgba(255,255,255,.12)", outline: "none", background: "rgba(255,255,255,.92)", color: "#111111", borderRadius: 16, padding: "18px 20px", minHeight: 56, marginBottom: 12, fontSize: "1rem" }}
                            />

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                <div>
                                    <label style={{ display: "block", color: "#ccdae7", fontWeight: 700, marginBottom: 9, fontSize: "0.9rem" }}>Conversion rate % (optional)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.1"
                                        value={conv}
                                        onChange={(e) => setConv(e.target.value)}
                                        placeholder="e.g. 2.4"
                                        maxLength={6}
                                        style={{ width: "100%", border: "1px solid rgba(255,255,255,.12)", outline: "none", background: "rgba(255,255,255,.92)", color: "#111111", borderRadius: 16, padding: "18px 20px", minHeight: 56, fontSize: "1rem" }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: "block", color: "#ccdae7", fontWeight: 700, marginBottom: 9, fontSize: "0.9rem" }}>Avg. order value $ (optional)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={avgVal}
                                        onChange={(e) => setAvgVal(e.target.value)}
                                        placeholder="e.g. 85"
                                        maxLength={10}
                                        style={{ width: "100%", border: "1px solid rgba(255,255,255,.12)", outline: "none", background: "rgba(255,255,255,.92)", color: "#111111", borderRadius: 16, padding: "18px 20px", minHeight: 56, fontSize: "1rem" }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !url || !name.trim() || !leadEmail.trim()}
                        style={{ width: "100%", marginTop: 18, border: 0, cursor: loading || !url || !name.trim() || !leadEmail.trim() ? "not-allowed" : "pointer", borderRadius: 999, padding: "20px 24px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", boxShadow: "0 18px 42px rgba(255,77,94,.28)", opacity: loading || !url || !name.trim() || !leadEmail.trim() ? 0.7 : 1, fontSize: "1.05rem", minHeight: 60, transition: "transform .2s, box-shadow .2s" }}
                    >
                        {loading ? "Scanning…" : "Run Free Scan →"}
                    </button>
                    <p style={{ marginTop: 12, color: "var(--er-muted-2)", fontSize: "0.84rem", lineHeight: 1.55 }}>
                        No credit card. Your report is private. We do not share it, post it, or sell your data.
                    </p>
                </form>

                {(loading || doneSteps.size > 0) && (
                    <div style={{ marginTop: 22, display: "grid", gap: 12 }} aria-live="polite">
                        {STEPS.map((step, i) => {
                            const isDone = doneSteps.has(i);
                            const isActive = activeStep === i;
                            return (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        color: isActive ? "white" : isDone ? "var(--er-muted)" : "var(--er-muted-2)",
                                        padding: 12,
                                        borderRadius: 16,
                                        background: isActive ? "rgba(255,77,94,.075)" : "rgba(255,255,255,.045)",
                                        border: `1px solid ${isActive ? "rgba(255,77,94,.25)" : "rgba(255,255,255,.075)"}`,
                                        transition: "all .3s ease",
                                    }}
                                >
                                    <span style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: 9,
                                        display: "grid",
                                        placeItems: "center",
                                        background: isDone ? "var(--er-green)" : isActive ? "var(--er-red)" : "rgba(255,255,255,.1)",
                                        color: isDone ? "#062214" : "white",
                                        fontSize: "0.78rem",
                                        fontWeight: 900,
                                        flexShrink: 0,
                                    }}>
                                        {isDone ? "✓" : i + 1}
                                    </span>
                                    <span style={{ fontSize: "0.88rem" }}>{step}</span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {error && (
                    <div style={{ marginTop: 14, background: "rgba(255,77,94,.12)", border: "1px solid rgba(255,77,94,.3)", borderRadius: 14, padding: "12px 16px", color: "#ff8792", fontSize: "0.9rem" }}>
                        {error}
                    </div>
                )}
            </div>

            {/* Right: Results panel */}
            <div style={{ borderRadius: 30, background: "rgba(255,255,255,.075)", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 24px 80px rgba(0,0,0,.38)", padding: 26, overflow: "hidden" }}>
                <h3 style={{ fontSize: "1.55rem", letterSpacing: "-.04em", marginBottom: 10 }}>Your free preview looks like this</h3>
                <p style={{ color: "var(--er-muted)", lineHeight: 1.65, marginBottom: 20 }}>
                    The moment your scan completes, you'll see your grade, estimated money leak, and top 3 critical symptoms right on this page.
                </p>

                {!teaser ? (
                    <div style={{ minHeight: 360, display: "grid", gap: 16, color: "var(--er-muted)", border: "1px dashed rgba(255,255,255,.14)", borderRadius: 24, padding: 24 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 18 }}>
                            <div>
                                <strong style={{ display: "block", color: "white", fontSize: "1.05rem" }}>Example preview</strong>
                                <p style={{ marginTop: 6, fontSize: "0.9rem", lineHeight: 1.6 }}>
                                    Owners who see anything below a B usually open the shareable summary. The ones with leaks over $1,000/mo almost always add the {quickAuditOffer.priceLabel} audit for the detailed next steps.
                                </p>
                            </div>
                            <div style={{ width: 78, height: 78, borderRadius: 22, display: "grid", placeItems: "center", fontSize: "2.7rem", fontWeight: 900, letterSpacing: "-.08em", color: "#1b080a", background: "linear-gradient(135deg, #ffb15c, #ff4d5e)", flexShrink: 0 }}>
                                C-
                            </div>
                        </div>
                        <div style={{ borderRadius: 22, background: "linear-gradient(135deg, rgba(255,77,94,.15), rgba(255,177,92,.1))", border: "1px solid rgba(255,77,94,.22)", padding: 18 }}>
                            <span style={{ color: "var(--er-muted)", display: "block", marginBottom: 4, fontSize: "0.9rem" }}>Estimated monthly revenue leak</span>
                            <strong style={{ fontSize: "2rem", letterSpacing: "-.06em", color: "#ffd0d5" }}>$4,820/mo</strong>
                        </div>
                        <div style={{ display: "grid", gap: 10 }}>
                            {[
                                "Slow mobile load is bleeding impatient traffic",
                                "Missing trust signals create hesitation before calls",
                                "Weak meta titles bury the site in local search",
                            ].map((item) => (
                                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 13, borderRadius: 17, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)" }}>
                                    <span style={{ width: 28, height: 28, display: "grid", placeItems: "center", borderRadius: 10, fontWeight: 900, flexShrink: 0, background: "rgba(255,77,94,.18)", color: "#ff7d89" }}>!</span>
                                    <div style={{ fontSize: "0.93rem", color: "white" }}>{item}</div>
                                </div>
                            ))}
                        </div>
                        <p style={{ fontSize: "0.88rem", lineHeight: 1.55 }}>
                            Run the free scan to replace this example with your real numbers.
                        </p>
                    </div>
                ) : (
                    <div className="fade-up">
                        {/* Grade header */}
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 18, marginBottom: 18 }}>
                            <div>
                                <h3 style={{ fontSize: "1.2rem", letterSpacing: "-.03em" }}>
                                    {name.trim() ? `${name.trim()}, ` : ""}{getSiteLabel(url)}
                                </h3>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.9rem", marginTop: 4 }}>
                                    {teaser.scanSource === "pagespeed"
                                        ? "PageSpeed-backed scan complete"
                                        : "Quick structural scan complete"}
                                </p>
                                {teaser.scanNote && (
                                    <p style={{ color: "var(--er-muted-2)", fontSize: "0.8rem", marginTop: 6, lineHeight: 1.55 }}>
                                        {teaser.scanNote}
                                    </p>
                                )}
                            </div>
                            <div style={{ width: 92, height: 92, borderRadius: 25, display: "grid", placeItems: "center", fontSize: "3.3rem", fontWeight: 900, letterSpacing: "-.08em", color: "#1b080a", background: `linear-gradient(135deg, ${gradeColor(teaser.grade)}, ${gradeColor(teaser.grade)}cc)`, flexShrink: 0 }}>
                                {teaser.grade}
                            </div>
                        </div>

                        {/* Score bars */}
                        <div style={{ display: "grid", gap: 12, marginBottom: 18 }}>
                            <ScoreBar label="Speed" value={teaser.scores.speed} />
                            <ScoreBar label="Mobile" value={teaser.scores.mobile} />
                            <ScoreBar label="SEO" value={teaser.scores.seo} />
                            <ScoreBar label="Trust" value={teaser.scores.trust} />
                        </div>

                        {/* Money leak */}
                        {(lossLow > 0 || lossHigh > 0) && (
                            <div style={{ borderRadius: 22, background: "linear-gradient(135deg, rgba(255,77,94,.15), rgba(255,177,92,.1))", border: "1px solid rgba(255,77,94,.22)", padding: 18, marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                                <div>
                                    <span style={{ color: "var(--er-muted)", display: "block", marginBottom: 4, fontSize: "0.9rem" }}>Estimated monthly revenue leak</span>
                                    <strong style={{ fontSize: "2rem", letterSpacing: "-.06em", color: "#ffd0d5" }}>
                                        ${lossLow.toLocaleString()}–${lossHigh.toLocaleString()}/mo
                                    </strong>
                                </div>
                                <div style={{ border: "1px solid rgba(255,255,255,.2)", borderRadius: 18, padding: "10px 14px", background: "rgba(255,255,255,.08)", minWidth: 150 }}>
                                    <div style={{ color: "var(--er-muted)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 800 }}>Next step</div>
                                    <strong style={{ display: "block", fontSize: "0.95rem", marginTop: 3 }}>{quickAuditOffer.priceLabel} {quickAuditOffer.name}</strong>
                                    <span style={{ color: "var(--er-muted)", fontSize: "0.8rem" }}>Unlocks detailed plan</span>
                                </div>
                            </div>
                        )}

                        {/* Top issues */}
                        {teaser.topIssues.length > 0 && (
                            <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
                                {teaser.topIssues.map((issue) => (
                                    <div key={`${issue.category}-${issue.description}`} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 13, borderRadius: 17, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)" }}>
                                        <span style={{
                                            width: 28, height: 28, display: "grid", placeItems: "center", borderRadius: 10, fontWeight: 900, flexShrink: 0,
                                            background: issue.severity === "high" ? "rgba(255,77,94,.18)" : "rgba(255,177,92,.17)",
                                            color: issue.severity === "high" ? "#ff7d89" : "#ffc983",
                                        }}>!</span>
                                        <div>
                                            <div style={{ fontSize: "0.93rem", marginBottom: 3 }}>{issue.description}</div>
                                            <div style={{ color: "var(--er-muted)", fontSize: "0.82rem" }}>{issue.severity.toUpperCase()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Email gate */}
                        <div style={{ marginTop: 8, padding: 16, borderRadius: 22, background: "rgba(0,0,0,.18)", border: "1px solid rgba(255,255,255,.1)" }}>
                            {!reportUrl ? (
                                <form onSubmit={captureLead}>
                                    <strong style={{ fontSize: "0.95rem" }}>Unlock the shareable summary report</strong>
                                    <p style={{ margin: "6px 0 12px", color: "var(--er-muted)", lineHeight: 1.55, fontSize: "0.88rem" }}>
                                        Enter your email to receive the permanent report link with your grade, money leak estimate, and summary symptoms. The detailed treatment plan unlocks with the {quickAuditOffer.priceLabel} {quickAuditOffer.name}.
                                    </p>
                                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                        <input
                                            type="email"
                                            value={leadEmail}
                                            onChange={(e) => setLeadEmail(e.target.value)}
                                            placeholder="you@company.com"
                                            required
                                            style={{ flex: 1, minWidth: 180, border: "1px solid rgba(255,255,255,.12)", outline: "none", background: "rgba(255,255,255,.92)", color: "#111111", borderRadius: 16, padding: "13px 16px" }}
                                        />
                                        <button
                                            type="submit"
                                            disabled={submitting || !leadEmail}
                                            style={{ border: 0, cursor: submitting || !leadEmail ? "not-allowed" : "pointer", borderRadius: 999, padding: "13px 18px", fontWeight: 800, fontSize: "0.88rem", color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", opacity: submitting || !leadEmail ? 0.7 : 1 }}
                                        >
                                            {submitting ? "Sending…" : "Send Full Report"}
                                        </button>
                                    </div>
                                    {leadError && <p style={{ marginTop: 8, color: "#ff8792", fontSize: "0.85rem" }}>{leadError}</p>}
                                </form>
                            ) : (
                                <div>
                                    <strong style={{ fontSize: "0.95rem", color: "var(--er-green)" }}>Report ready</strong>
                                    <p style={{ margin: "6px 0 12px", color: "var(--er-muted)", lineHeight: 1.55, fontSize: "0.88rem" }}>
                                        Open your shareable summary report, forward it to your team, and use the built-in {quickAuditOffer.priceLabel} {quickAuditOffer.name} option if you want the detailed plan.
                                    </p>
                                    <a href={reportUrl} style={{ display: "block", borderRadius: 14, border: "1px solid rgba(255,255,255,.14)", background: "rgba(255,255,255,.06)", padding: "12px 16px", fontSize: "0.85rem", wordBreak: "break-all", color: "var(--er-cyan)", marginBottom: 12 }}>
                                        {reportUrl}
                                    </a>
                                    <a href={reportUrl} style={{ display: "inline-flex", alignItems: "center", border: 0, cursor: "pointer", borderRadius: 999, padding: "13px 19px", fontWeight: 800, fontSize: "0.88rem", color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", textDecoration: "none" }}>
                                        Open Report →
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {/* Lazy-loaded overlays (only load when needed) */}
            {loading && (
                <ScanningOverlay />
            )}
        </div>
    );
}
