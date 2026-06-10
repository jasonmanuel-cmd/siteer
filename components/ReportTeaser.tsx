"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Issue } from "@/lib/scan/analyzeHtml";
import { Button, Card, Input } from "@/components/ui";

type Teaser = {
    scanId: string;
    grade: string;
    scores: {
        speed: number;
        mobile: number;
        seo: number;
        trust: number;
        overall: number;
    };
    money: {
        lossLow: number;
        lossHigh: number;
        lossPct: number;
        visitors?: number;
    };
    topIssues: Issue[];
};

function severityBadge(severity: string): string {
    if (severity === "high") return "bg-red-100 text-red-700 border-red-200";
    if (severity === "medium") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
}

export default function ReportTeaser({
    teaser,
    customerName,
    initialEmail,
    onClose,
}: {
    teaser: Teaser;
    customerName?: string;
    initialEmail?: string;
    onClose: () => void;
}) {
    const [email, setEmail] = useState(initialEmail || "");
    const [submitting, setSubmitting] = useState(false);
    const [reportUrl, setReportUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);
    const emailInputId = "report-teaser-email";

    const lossLow = useMemo(() => Number(teaser.money.lossLow) || 0, [teaser.money.lossLow]);
    const lossHigh = useMemo(
        () => Number(teaser.money.lossHigh) || 0,
        [teaser.money.lossHigh],
    );
    const lossPct = Math.round((Number(teaser.money.lossPct) || 0) * 100);
    const estVisitorsLost = Math.round(
        (Number(teaser.money.visitors) || 0) * (Number(teaser.money.lossPct) || 0),
    );

    useEffect(() => {
        if (initialEmail) {
            setEmail(initialEmail);
        }
    }, [initialEmail]);

    useEffect(() => {
        closeButtonRef.current?.focus();

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== "Tab") return;

            const dialog = dialogRef.current;
            if (!dialog) return;

            const focusable = Array.from(
                dialog.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
                ),
            ).filter((element) => !element.hasAttribute("disabled"));

            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    async function captureLead() {
        setSubmitting(true);
        setError(null);
        try {
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email, scanId: teaser.scanId }),
            });

            const payload = (await response.json()) as {
                ok?: boolean;
                error?: string;
                reportUrl?: string;
            };

            if (!response.ok || !payload.ok || !payload.reportUrl) {
                throw new Error(payload.error || "Unable to unlock report");
            }

            setReportUrl(payload.reportUrl);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unable to unlock report";
            setError(message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <Card
                ref={dialogRef}
                className="w-full max-w-3xl border-red-200/70"
                role="dialog"
                aria-modal="true"
                aria-labelledby="report-teaser-title"
                aria-describedby="report-teaser-description"
                tabIndex={-1}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="text-xs font-mono uppercase tracking-[0.16em] text-red-600">
                            Emergency Summary
                        </div>
                        <h3 id="report-teaser-title" className="mt-1 text-2xl font-semibold text-balance">
                            {customerName ? `${customerName}, your website is likely leaking customers right now.` : "Your website is likely leaking customers right now."}
                        </h3>
                    </div>
                    <button
                        ref={closeButtonRef}
                        className="rounded-lg p-2 text-black/50 hover:bg-black/5"
                        onClick={onClose}
                        type="button"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                        <div className="text-xs text-black/60">Overall Grade</div>
                        <div className="mt-1 text-5xl font-bold">{teaser.grade}</div>
                        <div className="mt-2 text-sm text-black/60">
                            Score: {teaser.scores.overall}/100
                        </div>
                    </div>
                    <div className="rounded-2xl border border-black/10 bg-gradient-to-br from-red-50 to-amber-50 p-4 md:col-span-2">
                        <div className="text-xs text-black/60">
                            Estimated monthly revenue loss
                        </div>
                        <div className="mt-1 text-3xl font-semibold">
                            ${lossLow.toLocaleString()} - ${lossHigh.toLocaleString()}
                        </div>
                        <div className="mt-2 text-sm text-black/60">
                            Risk band: about {lossPct}% conversion drag
                        </div>
                        {estVisitorsLost > 0 ? (
                            <div className="mt-1 text-sm text-black/60">
                                Approx visitors at risk monthly: {estVisitorsLost}
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="mt-6">
                    <div className="text-sm font-semibold">Top critical issues</div>
                    <div className="mt-3 space-y-2">
                        {teaser.topIssues.map((issue) => (
                            <div
                                key={`${issue.category}-${issue.description}`}
                                className="rounded-xl border border-black/10 p-3"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="text-sm font-medium">{issue.description}</div>
                                    <span
                                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase ${severityBadge(issue.severity)}`}
                                    >
                                        {issue.severity}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 rounded-2xl border border-black/10 bg-black/[0.03] p-4">
                    <p id="report-teaser-description" className="sr-only">
                        Summary of your scan results with a field to unlock the full report by email.
                    </p>
                    {!reportUrl ? (
                        <>
                            <div className="text-sm font-semibold">Unlock the full ER report</div>
                            <p className="mt-1 text-sm text-black/65">
                                Enter your email to get the full treatment plan and a shareable
                                report link.
                            </p>
                            <div className="mt-4 flex flex-col gap-3 md:flex-row">
                                <label className="sr-only" htmlFor={emailInputId}>
                                    Email address
                                </label>
                                <Input
                                    id={emailInputId}
                                    type="email"
                                    placeholder="you@business.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    autoComplete="email"
                                    autoFocus
                                />
                                <Button
                                    type="button"
                                    onClick={captureLead}
                                    disabled={submitting || !email}
                                >
                                    {submitting ? "Unlocking..." : "Unlock Full Report"}
                                </Button>
                            </div>
                            {error ? (
                                <p className="mt-2 text-sm text-red-700">{error}</p>
                            ) : null}
                        </>
                    ) : (
                        <>
                            <div className="text-sm font-semibold">Report ready</div>
                            <p className="mt-1 text-sm text-black/65">
                                Open your full report and share it with your team.
                            </p>
                            <a
                                className="mt-3 block rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-red-300 hover:text-red-700 transition-colors"
                                href={reportUrl}
                            >
                                <span className="text-xs text-black/40 block mb-0.5">siteer.dev</span>
                                /scan/{reportUrl.split("/scan/")[1]}
                            </a>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        window.location.href = reportUrl;
                                    }}
                                >
                                    Open Report →
                                </Button>
                                <Button type="button" variant="ghost" onClick={onClose}>
                                    Close
                                </Button>
                            </div>
                        </>
                    )}
                </div>

                <p className="mt-4 text-xs text-black/50">
                    Estimates are directional to prioritize fixes, not guaranteed outcomes.
                </p>
            </Card>
        </div>
    );
}
