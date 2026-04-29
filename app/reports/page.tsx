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
                        Reports turn the scan into a shareable action plan.
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-black/65">
                        The homepage diagnosis produces the scan. The report gives you the grade, the issues, the revenue leak, and the next steps in a form you can send to a team or client.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <a className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white" href="/#diagnosis">
                            Run a diagnosis
                        </a>
                        <a className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-black/5" href="/faq">
                            Read the FAQ
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
                    <p className="mt-2 text-sm text-black/65">The teaser gets the lead, then sends the full report link to the user.</p>
                </article>
                <article>
                    <h2 className="text-lg font-semibold">Built for sharing</h2>
                    <p className="mt-2 text-sm text-black/65">Use it internally, send it to a client, or hand it to the implementation team.</p>
                </article>
                <article>
                    <h2 className="text-lg font-semibold">Tied to action</h2>
                    <p className="mt-2 text-sm text-black/65">Every report links naturally to pricing, FAQ, and the diagnosis funnel.</p>
                </article>
            </section>
        </main>
    );
}
