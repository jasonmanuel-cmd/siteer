import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reports",
    description:
        "What SiteER reports include and how the unlock flow works after the homepage diagnosis.",
    alternates: {
        canonical: "/reports",
    },
    openGraph: {
        title: "Reports | SiteER",
        description:
            "What the report includes and how to unlock it from the diagnosis funnel.",
        url: "https://siteer.dev/reports",
        siteName: "SiteER",
        type: "website",
    },
};

const reportFeatures = [
    {
        title: "Overall grade",
        description: "An A-F score that shows how urgent the situation is.",
    },
    {
        title: "Category scores",
        description: "Speed, mobile, SEO, and trust scores with clear visual bars.",
    },
    {
        title: "Money leak estimate",
        description: "A directional revenue-loss range tied to business inputs.",
    },
    {
        title: "Treatment plan",
        description: "A prioritized list of fixes and practical recommendations.",
    },
];

export default function ReportsPage() {
    return (
        <main className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <a className="text-sm font-semibold tracking-tight" href="/#diagnosis">
                    SiteER <span className="text-black/45">/ Reports</span>
                </a>
                <div className="flex flex-wrap items-center gap-4 text-sm text-black/60">
                    <a className="hover:text-black" href="/pricing">
                        Pricing
                    </a>
                    <a className="hover:text-black" href="/#diagnosis">
                        Run diagnosis
                    </a>
                </div>
            </header>

            <section className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-red-600">Reports</p>
                    <h1 className="mt-2 text-4xl font-semibold text-balance md:text-5xl">
                        Send this report to your developer (or us) and get your site fixed in days, not months.
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-black/65">
                        The one PDF that gets your team to actually fix what's broken. Includes the grade, every issue prioritized, revenue-leak estimate, and a clear treatment plan.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <a className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white" href="/#diagnosis">
                            Run a diagnosis
                        </a>
                        <a className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-black/5" href="/pricing">
                            See pricing
                        </a>
                    </div>
                </div>

                <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                    <div className="rounded-2xl border border-black/10 bg-slate-950 p-5 text-white">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-red-300">Sample report view</p>
                                <h2 className="mt-2 text-2xl font-semibold">Website ER Chart</h2>
                            </div>
                            <div className="rounded-2xl bg-gradient-to-br from-red-500 to-amber-400 px-4 py-3 text-3xl font-black text-slate-950">
                                D
                            </div>
                        </div>
                        <div className="mt-5 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
                            {reportFeatures.map((feature) => (
                                <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="font-semibold text-white">{feature.title}</div>
                                    <p className="mt-1 text-sm text-slate-300">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-12 grid gap-4 rounded-2xl border border-black/10 bg-white/90 p-6 shadow-sm md:grid-cols-3">
                <article>
                    <h2 className="text-lg font-semibold">Unlocked by email</h2>
                    <p className="mt-2 text-sm text-black/65">The teaser shows the grade and top 3 issues free. The full report with treatment plan unlocks by email.</p>
                </article>
                <article>
                    <h2 className="text-lg font-semibold">Built for sharing</h2>
                    <p className="mt-2 text-sm text-black/65">Use it internally, send it to a client, hand it to a developer, or forward to your web team.</p>
                </article>
                <article>
                    <h2 className="text-lg font-semibold">Tied to action</h2>
                    <p className="mt-2 text-sm text-black/65">Every report links to pricing, FAQ, and implementation options. Drives conversions at every stage.</p>
                </article>
            </section>

            <section className="mt-12 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-8">
                <h2 className="text-2xl font-bold text-slate-900">Real customer feedback</h2>
                <blockquote className="mt-6 border-l-4 border-amber-400 pl-6 text-lg font-medium text-slate-900">
                    "I sent this to my web guy and he fixed 4 issues in a day. Best $0 I ever spent. Then we got the ER Fix Pack and our site jumped from a D to a B. Now we're getting 30% more calls."
                    <footer className="mt-3 text-sm text-slate-600">— Mike D., Local Contractor</footer>
                </blockquote>
            </section>
        </main>
    );
}
