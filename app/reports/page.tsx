import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import PageSignalBar from "@/components/PageSignalBar";
import { quickAuditOffer } from "@/lib/offers";
import {
    buildPageMetadata,
    buildPageStructuredData,
    buildServiceSchema,
} from "@/lib/siteSeo";

export const metadata: Metadata = buildPageMetadata({
    title: "Reports",
    description:
        `See what the SiteER report includes, how the email unlock works, and where the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name} fits after the scan.`,
    path: "/reports",
    keywords: [
        "website audit report",
        "SEO report example",
        "SiteER report",
        "local business website report",
    ],
});

const reportFaqs = [
    {
        question: "What does the free SiteER report show first?",
        answer: "The free view shows the grade, the money-leak estimate, and the top symptoms so the owner can judge the severity immediately.",
    },
    {
        question: "Why does the report unlock by email?",
        answer: "The email unlock keeps the report private, makes it shareable, and lets the owner reopen it later without rerunning the scan.",
    },
    {
        question: "Where does the $20 audit appear?",
        answer: "The Quick ER Audit appears inside the full report as the next paid step when the owner wants human prioritization.",
    },
] as const;

const structuredData = buildPageStructuredData({
    path: "/reports",
    title: "SiteER Reports",
    description: "What SiteER reports include, how the email unlock works, and how the report leads into the human audit or implementation path.",
    breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Reports", path: "/reports" },
    ],
    faqs: reportFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
    extras: [
        buildServiceSchema({
            path: "/reports",
            name: "SiteER Reports",
            description: "Private website reports for speed, mobile, SEO, trust, and revenue-leak analysis.",
            serviceType: "Website audit reporting",
        }),
    ],
});

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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
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

                <PageSignalBar
                    primaryCtaHref="/#diagnosis"
                    primaryCtaLabel="Run Free Scan →"
                    secondaryCtaHref="/pricing"
                    secondaryCtaLabel="Compare offers"
                />

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
                    <div className="mt-8 grid gap-4 lg:grid-cols-3">
                        {[
                            ["Owners use it to decide", "The grade and leak estimate tell the owner whether this is a cosmetic issue or a revenue issue."],
                            ["Developers use it to prioritize", "The ranked symptoms turn vague frustration into a clear order of work."],
                            ["Agencies use it to close work", "A private report is easier to forward and discuss than a loose collection of screenshots and opinions."],
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

                <section className="mt-12 grid gap-5 lg:grid-cols-3">
                    {[
                        ["/pricing", "Compare pricing", "Use the pricing page when you need to decide between scan, audit, and implementation."],
                        ["/faq", "Handle objections", "Use the FAQ when the owner wants practical answers before taking the next step."],
                        ["/get-quote", "Move to implementation", "Go straight to the quote form when the report already made the case."],
                    ].map(([href, title, text]) => (
                        <a key={href} href={href} className="er-link-card">
                            <div className="text-base font-semibold text-white">{title}</div>
                            <p className="mt-2 text-sm leading-6 text-[#c8d5e1]">{text}</p>
                        </a>
                    ))}
                </section>
            </main>
        </SiteChrome>
    );
}
