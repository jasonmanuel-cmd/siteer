import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import { quickAuditOffer } from "@/lib/offers";

export const metadata: Metadata = {
    title: "Reports",
    description:
        `What SiteER reports include, how the unlock flow works, and where the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name} fits after the homepage diagnosis.`,
    alternates: {
        canonical: "/reports",
    },
    openGraph: {
        title: "Reports | SiteER",
        description:
            `What the report includes, how to unlock it, and how the ${quickAuditOffer.name} fits into the diagnosis funnel.`,
        url: "https://siteer.dev/reports",
        siteName: "SiteER",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Reports | SiteER",
        description:
            `See what the report includes, how email unlock works, and where the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name} fits next.`,
        images: ["/og-image.png"],
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
        <SiteChrome>
            <main className="er-page">
                <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                    <div>
                        <p className="er-kicker">Reports</p>
                        <h1 className="er-heading mt-3">
                            This is the report people actually forward to the developer.
                        </h1>
                        <p className="er-copy mt-4">
                            SiteER is not just a score screen. The report turns the scan into a usable treatment plan: grade, issue priority, money leak estimate, and the fastest next move, including the {quickAuditOffer.priceLabel} {quickAuditOffer.name} when a human review makes sense.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <a className="er-button-primary" href="/#diagnosis">Run Free Scan →</a>
                            <a className="er-button-secondary" href="/pricing">See pricing</a>
                        </div>
                    </div>

                    <div className="er-panel">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="er-kicker">Sample report view</p>
                                <h2 className="mt-2 text-2xl font-semibold text-white">Website ER Chart</h2>
                                <p className="mt-2 text-sm leading-6 text-[#c8d5e1]">Vitals, symptoms, and the next move on one screen.</p>
                            </div>
                            <div className="rounded-[22px] bg-[linear-gradient(135deg,#ff4d5e,#ffb15c)] px-5 py-4 text-4xl font-black text-[#19070a]">
                                D
                            </div>
                        </div>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {reportFeatures.map((feature) => (
                                <div key={feature.title} className="rounded-[20px] border border-white/10 bg-white/[0.05] p-4">
                                    <div className="text-base font-semibold text-white">{feature.title}</div>
                                    <p className="mt-1 text-sm leading-6 text-[#c8d5e1]">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mt-12 grid gap-5 md:grid-cols-3">
                    {[
                        ["Unlocked by email", "The free teaser shows the grade and top symptoms. The full ER chart unlocks by email so the report can stay private and shareable."],
                        ["Built for sharing", "Forward it to a developer, a client, or your own team without having to translate a pile of technical jargon."],
                        ["Tied to action", `Every report points to pricing, FAQ, the ${quickAuditOffer.priceLabel} audit, and implementation options so the next step is obvious.`],
                    ].map(([title, text]) => (
                        <article key={title} className="er-link-card">
                            <h2 className="text-xl font-semibold text-white">{title}</h2>
                            <p className="mt-3 text-sm leading-6 text-[#c8d5e1]">{text}</p>
                        </article>
                    ))}
                </section>

                <section className="mt-12 er-panel">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="er-kicker">What the report does best</p>
                            <h2 className="er-heading mt-3">It turns panic into a ranked action list.</h2>
                        </div>
                        <p className="er-copy max-w-[450px]">
                            Owners do not need another vague audit. They need the fastest path from “something feels wrong” to “here is what gets fixed first.”
                        </p>
                    </div>
                    <div className="mt-8 grid gap-4 lg:grid-cols-3">
                        {[
                            ["Show the damage", "A grade and money leak estimate put a real business consequence on the page."],
                            ["Rank the symptoms", "The treatment plan pushes the highest-impact problems to the top so nobody debates where to begin."],
                            ["Create the upsell", `If the chart looks bad, the ${quickAuditOffer.priceLabel} human audit or the Fix Pack becomes a rational next step instead of a pushy offer.`],
                        ].map(([title, text]) => (
                            <div key={title} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5">
                                <h3 className="text-lg font-semibold text-white">{title}</h3>
                                <p className="mt-2 text-sm leading-6 text-[#c8d5e1]">{text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-12 er-panel-accent">
                    <p className="er-kicker">Real customer feedback</p>
                    <blockquote className="mt-4 max-w-[900px] text-xl font-medium leading-8 text-white">
                        “I sent this to my web guy and he fixed 4 issues in a day. Best $0 I ever spent. Then we got the ER Fix Pack and our site jumped from a D to a B. Now we&apos;re getting 30% more calls.”
                    </blockquote>
                    <footer className="mt-4 text-sm font-semibold text-[#fff0d7]">— Mike D., Local Contractor</footer>
                </section>
            </main>
        </SiteChrome>
    );
}
