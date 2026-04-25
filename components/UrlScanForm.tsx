"use client";

import { useState, useRef } from "react";
import type { Issue } from "@/lib/scan/analyzeHtml";

type TeaserPayload = {
    ok: boolean;
    scanId: string;
    grade: string;
    scores: { speed: number; mobile: number; seo: number; trust: number; overall: number };
    money: { lossLow: number; lossHigh: number; lossPct: number; visitors: number; conv: number; avg: number };
    topIssues: Issue[];
    error?: string;
};

const STEPS = [
    "Fetching HTML with redirects and timeout",
    "Running speed, mobile, SEO, and trust checks",
    "Weighting severity and calculating grade",
    "Estimating revenue leak and preparing report",
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
    const [url, setUrl] = useState("");
    const [visitors, setVisitors] = useState("");
    const [conv, setConv] = useState("");
    const [avgVal, setAvgVal] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(-1);
    const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set());
    const [teaser, setTeaser] = useState<TeaserPayload | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [reportUrl, setReportUrl] = useState<string | null>(null);
    const [leadError, setLeadError] = useState<string | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    async function runScan(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setTeaser(null);
        setReportUrl(null);
        setEmail("");
        setLeadError(null);
        setActiveStep(0);
        setDoneSteps(new Set());

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
            setTeaser(data);
        } catch (err) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setActiveStep(-1);
            setError(err instanceof Error ? err.message : "Scan failed");
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
                body: JSON.stringify({ email, scanId: teaser.scanId }),
            });
            const data = (await res.json()) as { ok?: boolean; reportUrl?: string; error?: string };
            if (!res.ok || !data.ok || !data.reportUrl) throw new Error(data.error || "Unable to unlock report");
            setReportUrl(data.reportUrl);
        } catch (err) {
            setLeadError(err instanceof Error ? err.message : "Unable to unlock report");
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
                <h3 style={{ fontSize: "1.55rem", letterSpacing: "-.04em", marginBottom: 10 }}>Patient intake</h3>
                <p style={{ color: "var(--er-muted)", lineHeight: 1.65, marginBottom: 20 }}>Enter a website URL and optional business numbers to estimate the monthly revenue leak.</p>

                <div style={{ display: "grid", gap: 9, marginBottom: 14 }}>
                    <div style={{ borderRadius: 14, padding: "10px 12px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.035)", color: "var(--er-muted)", fontSize: "0.84rem" }}>
                        <strong style={{ color: "white" }}>Step 1:</strong> Enter any domain like <span style={{ color: "#ffd0d5" }}>coaibakersfield.com</span>. No need to include <span style={{ color: "#ffd0d5" }}>http://</span> or <span style={{ color: "#ffd0d5" }}>www</span>.
                    </div>
                    <div style={{ borderRadius: 14, padding: "10px 12px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.035)", color: "var(--er-muted)", fontSize: "0.84rem" }}>
                        <strong style={{ color: "white" }}>Step 2:</strong> Optional business inputs make your money-leak estimate more accurate.
                    </div>
                    <div style={{ borderRadius: 14, padding: "10px 12px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.035)", color: "var(--er-muted)", fontSize: "0.84rem" }}>
                        <strong style={{ color: "white" }}>Step 3:</strong> Click <span style={{ color: "#ffd0d5" }}>Start ER scan</span> to generate live issue scores and graph bars.
                    </div>
                </div>

                <form id="demoForm" onSubmit={runScan}>
                    <label style={{ display: "block", color: "#ccdae7", fontWeight: 700, marginBottom: 9, fontSize: "0.9rem" }}>Website URL</label>
                    <input
                        id="demoUrl"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onBlur={(e) => setUrl(normalizeInputUrl(e.target.value))}
                        placeholder="coaibakersfield.com"
                        required
                        style={{ width: "100%", border: "1px solid rgba(255,255,255,.12)", outline: "none", background: "rgba(0,0,0,.2)", color: "white", borderRadius: 16, padding: "15px 16px", marginBottom: 13 }}
                    />

                    <label style={{ display: "block", color: "#ccdae7", fontWeight: 700, marginBottom: 9, fontSize: "0.9rem" }}>Monthly visitors <span style={{ color: "var(--er-muted-2)", fontWeight: 400 }}>(optional)</span></label>
                    <input
                        type="number"
                        min="0"
                        value={visitors}
                        onChange={(e) => setVisitors(e.target.value)}
                        placeholder="e.g. 5000"
                        style={{ width: "100%", border: "1px solid rgba(255,255,255,.12)", outline: "none", background: "rgba(0,0,0,.2)", color: "white", borderRadius: 16, padding: "15px 16px", marginBottom: 13 }}
                    />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                            <label style={{ display: "block", color: "#ccdae7", fontWeight: 700, marginBottom: 9, fontSize: "0.9rem" }}>Conv. rate %</label>
                            <input
                                type="number"
                                min="0"
                                step="0.1"
                                value={conv}
                                onChange={(e) => setConv(e.target.value)}
                                placeholder="e.g. 2.4"
                                style={{ width: "100%", border: "1px solid rgba(255,255,255,.12)", outline: "none", background: "rgba(0,0,0,.2)", color: "white", borderRadius: 16, padding: "15px 16px" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", color: "#ccdae7", fontWeight: 700, marginBottom: 9, fontSize: "0.9rem" }}>Avg. value $</label>
                            <input
                                type="number"
                                min="0"
                                value={avgVal}
                                onChange={(e) => setAvgVal(e.target.value)}
                                placeholder="e.g. 85"
                                style={{ width: "100%", border: "1px solid rgba(255,255,255,.12)", outline: "none", background: "rgba(0,0,0,.2)", color: "white", borderRadius: 16, padding: "15px 16px" }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !url}
                        style={{ width: "100%", marginTop: 16, border: 0, cursor: loading || !url ? "not-allowed" : "pointer", borderRadius: 999, padding: "15px 19px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", boxShadow: "0 18px 42px rgba(255,77,94,.28)", opacity: loading || !url ? 0.7 : 1 }}
                    >
                        {loading ? "Scanning…" : "Start ER scan"}
                    </button>
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
                <h3 style={{ fontSize: "1.55rem", letterSpacing: "-.04em", marginBottom: 10 }}>Free teaser report</h3>
                <p style={{ color: "var(--er-muted)", lineHeight: 1.65, marginBottom: 20 }}>Your grade, top three issues, and money leak appear immediately after the scan.</p>

                {!teaser ? (
                    <div style={{ minHeight: 360, display: "grid", placeItems: "center", textAlign: "center", color: "var(--er-muted)", border: "1px dashed rgba(255,255,255,.14)", borderRadius: 24, padding: 28 }}>
                        <div>
                            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
                                <rect x="10" y="10" width="52" height="52" rx="18" fill="rgba(255,77,94,.16)" stroke="rgba(255,77,94,.38)" />
                                <path d="M36 21V51M21 36H51" stroke="#ff7380" strokeWidth="6" strokeLinecap="round" />
                            </svg>
                            <p style={{ marginTop: 14 }}>Scan results will appear here after the diagnostic sequence.</p>
                        </div>
                    </div>
                ) : (
                    <div className="fade-up">
                        {/* Grade header */}
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 18, marginBottom: 18 }}>
                            <div>
                                <h3 style={{ fontSize: "1.2rem", letterSpacing: "-.03em" }}>
                                    {getSiteLabel(url)}
                                </h3>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.9rem", marginTop: 4 }}>Automated scan complete · 20+ checks performed</p>
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
                                <a href="/get-quote" style={{ border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, padding: "10px 16px", fontWeight: 800, fontSize: "0.88rem", color: "white", background: "rgba(255,255,255,.08)", whiteSpace: "nowrap" }}>
                                    Get fixes
                                </a>
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
                                    <strong style={{ fontSize: "0.95rem" }}>Unlock the full shareable treatment plan</strong>
                                    <p style={{ margin: "6px 0 12px", color: "var(--er-muted)", lineHeight: 1.55, fontSize: "0.88rem" }}>
                                        Enter your email to receive the permanent report link with every issue and recommendation.
                                    </p>
                                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@company.com"
                                            required
                                            style={{ flex: 1, minWidth: 180, border: "1px solid rgba(255,255,255,.12)", outline: "none", background: "rgba(0,0,0,.2)", color: "white", borderRadius: 16, padding: "13px 16px" }}
                                        />
                                        <button
                                            type="submit"
                                            disabled={submitting || !email}
                                            style={{ border: 0, cursor: submitting || !email ? "not-allowed" : "pointer", borderRadius: 999, padding: "13px 18px", fontWeight: 800, fontSize: "0.88rem", color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", opacity: submitting || !email ? 0.7 : 1 }}
                                        >
                                            {submitting ? "Sending…" : "Send report"}
                                        </button>
                                    </div>
                                    {leadError && <p style={{ marginTop: 8, color: "#ff8792", fontSize: "0.85rem" }}>{leadError}</p>}
                                </form>
                            ) : (
                                <div>
                                    <strong style={{ fontSize: "0.95rem", color: "var(--er-green)" }}>Report ready</strong>
                                    <p style={{ margin: "6px 0 12px", color: "var(--er-muted)", lineHeight: 1.55, fontSize: "0.88rem" }}>
                                        Open your full report and share it with your team.
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
        </div>
    );
}
