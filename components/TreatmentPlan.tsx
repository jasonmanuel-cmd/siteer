import { quickAuditOffer } from "@/lib/offers";

type IssueRow = {
    id: string;
    severity: string;
    category: string;
    description: string;
    recommendation: string;
};

function rankSeverity(severity: string): number {
    if (severity === "high") return 3;
    if (severity === "medium") return 2;
    return 1;
}

function badgeClass(severity: string): string {
    if (severity === "high") return "bg-red-100 text-red-700 border-red-200";
    if (severity === "medium") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
}

export default function TreatmentPlan({
    issues,
    locked = false,
}: {
    issues: IssueRow[];
    locked?: boolean;
}) {
    const sorted = [...issues].sort(
        (a, b) => rankSeverity(b.severity) - rankSeverity(a.severity),
    );
    const visibleIssues = locked ? sorted.slice(0, 3) : sorted.slice(0, 12);

    return (
        <section className="rounded-2xl border border-black/10 bg-white/95 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{locked ? "Treatment Plan Preview" : "Treatment Plan"}</h2>
            <p className="mt-2 text-sm text-black/60">
                {locked
                    ? `The full fix-by-fix recommendations unlock after the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name}.`
                    : "High-impact actions in plain English, ordered by urgency."}
            </p>
            <div className="mt-6 space-y-4">
                {visibleIssues.map((issue) => (
                    <article
                        key={issue.id}
                        className="rounded-xl border border-black/10 bg-white p-5"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="text-base font-semibold">{issue.description}</h3>
                            <span
                                className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase ${badgeClass(issue.severity)}`}
                            >
                                {issue.severity}
                            </span>
                        </div>
                        <p className="mt-2 text-sm text-black/65">
                            {locked
                                ? `Detailed recommendation hidden until the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name} is purchased.`
                                : issue.recommendation}
                        </p>
                        <div className="mt-3 text-xs uppercase tracking-wide text-black/45">
                            Category: {issue.category}
                        </div>
                    </article>
                ))}
                {sorted.length === 0 ? (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                        No major issues detected in this scan.
                    </div>
                ) : null}
            </div>
            {locked && sorted.length > visibleIssues.length ? (
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                    {sorted.length - visibleIssues.length} more issue{sorted.length - visibleIssues.length === 1 ? "" : "s"} and all step-by-step recommendations stay locked until payment.
                </div>
            ) : null}
        </section>
    );
}
