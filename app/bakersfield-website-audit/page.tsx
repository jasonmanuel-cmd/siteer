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
    title: "Bakersfield Website Audit",
    description:
        `Free Bakersfield website audit with speed, SEO, mobile, and trust checks, plus a ${quickAuditOffer.priceLabel} human review if the scan shows real damage.`,
    path: "/bakersfield-website-audit",
    keywords: [
        "Bakersfield website audit",
        "Bakersfield SEO audit",
        "website audit Bakersfield CA",
        "local business website help Bakersfield",
        "website speed audit Bakersfield",
    ],
});

const localFaqs = [
    {
        question: "Who should use this Bakersfield website audit?",
        answer: "Local service businesses, contractors, law firms, med spas, retailers, and owner-operated companies that depend on calls, forms, or booked appointments.",
    },
    {
        question: "What does the free audit show?",
        answer: "It shows the A-F grade, the estimated money leak, and the biggest symptoms across speed, mobile, SEO, and trust.",
    },
    {
        question: "What happens if the site is in bad shape?",
        answer: `You can buy the ${quickAuditOffer.priceLabel} Quick ER Audit for a human-ranked next-step plan or move straight into the implementation quote path.`,
    },
];

const structuredData = buildPageStructuredData({
    path: "/bakersfield-website-audit",
    title: "Bakersfield Website Audit",
    description:
        "Free Bakersfield website audit for local businesses that need more calls, forms, and trust from their website.",
    breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Bakersfield Website Audit", path: "/bakersfield-website-audit" },
    ],
    faqs: localFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
    extras: [
        buildServiceSchema({
            path: "/bakersfield-website-audit",
            name: "Bakersfield Website Audit",
            description: "Local website audit and revenue-leak diagnosis for Bakersfield businesses.",
            serviceType: "Bakersfield website audit",
        }),
        {
            "@type": "ProfessionalService",
            name: "SiteER Bakersfield Website Audit",
            areaServed: {
                "@type": "City",
                name: "Bakersfield",
            },
            address: {
                "@type": "PostalAddress",
                addressLocality: "Bakersfield",
                addressRegion: "CA",
                addressCountry: "US",
            },
        },
    ],
});

export default function BakersfieldWebsiteAuditPage() {
    return (
        <SiteChrome>
            <main className="er-page">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />

                <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                    <div>
                        <p className="er-kicker">Bakersfield Website Audit</p>
                        <h1 className="er-title mt-4">
                            Bakersfield businesses should not lose calls to a sick website.
                        </h1>
                        <p className="er-copy mt-5">
                            SiteER gives local owners a free website audit built around one question:
                            is your site quietly costing you jobs, appointments, and trust? In about
                            60 seconds, it checks speed, mobile usability, SEO, and trust signals,
                            then turns the damage into an A-F grade and an estimated money leak.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="er-chip">Built in Bakersfield</span>
                            <span className="er-chip">Free scan first</span>
                            <span className="er-chip">Human help if the numbers are bad</span>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a className="er-button-primary" href="/#diagnosis">
                                Run Free Scan →
                            </a>
                            <a className="er-button-secondary" href="/get-quote">
                                Get a fix quote
                            </a>
                        </div>
                    </div>

                    <aside className="er-panel-accent">
                        <div className="er-kicker">What local owners care about</div>
                        <div className="mt-4 grid gap-4">
                            {[
                                ["Calls", "Can people tap, trust, and call without fighting the page on their phone?"],
                                ["Forms", "Does the site load fast enough and feel credible enough to finish the form?"],
                                ["Maps", "Do local SEO signals help Google understand who you serve and where?"],
                            ].map(([label, text]) => (
                                <div key={label} className="rounded-[22px] border border-white/12 bg-white/[0.05] p-4">
                                    <div className="text-xs font-black tracking-[0.18em] text-[#ffd8dd]">{label}</div>
                                    <p className="mt-2 text-sm leading-6 text-[#d6e2ee]">{text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm leading-6 text-[#fff0d7]">
                            Bakersfield service businesses often do not need more traffic first. They
                            need the existing traffic to trust the site and take action.
                        </p>
                    </aside>
                </section>

                <PageSignalBar
                    primaryCtaHref="/#diagnosis"
                    primaryCtaLabel="Run Free Scan →"
                    secondaryCtaHref="/pricing"
                    secondaryCtaLabel="See pricing"
                />

                <section className="mt-12 grid gap-5 md:grid-cols-3">
                    {[
                        [
                            "Speed problems kill local intent.",
                            "When a homeowner needs help now, a slow page costs the call before your offer even loads.",
                        ],
                        [
                            "Mobile friction costs booked jobs.",
                            "Tiny buttons, broken layouts, and long load times make phone traffic disappear.",
                        ],
                        [
                            "Weak trust signals lower conversions.",
                            "Missing proof, weak copy, and thin local credibility make buyers hesitate right at the decision point.",
                        ],
                    ].map(([title, text]) => (
                        <article key={title} className="er-link-card">
                            <h2 className="text-lg font-semibold text-white">{title}</h2>
                            <p className="mt-2 text-sm leading-6 text-[#c8d5e1]">{text}</p>
                        </article>
                    ))}
                </section>

                <section className="mt-12 er-panel">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="er-kicker">What the Bakersfield audit includes</p>
                            <h2 className="er-heading mt-3">Enough detail to act without drowning in jargon.</h2>
                        </div>
                        <p className="er-copy max-w-[470px]">
                            The free scan tells you whether the site is mildly underperforming or
                            actively leaking revenue. If the result is ugly, the next step is obvious.
                        </p>
                    </div>
                    <div className="mt-8 grid gap-4 lg:grid-cols-2">
                        {[
                            ["A-F website grade", "A fast urgency signal for owners who need to know whether this is cosmetic or serious."],
                            ["Estimated money leak", "A directional dollar range tied to the damage the scan finds."],
                            ["Speed, mobile, SEO, and trust scores", "The four buckets that matter most for local lead generation sites."],
                            [`${quickAuditOffer.priceLabel} Quick ER Audit`, "Optional human review when you want ranked next moves before paying for implementation."],
                        ].map(([title, text]) => (
                            <div key={title} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5">
                                <h3 className="text-lg font-semibold text-white">{title}</h3>
                                <p className="mt-2 text-sm leading-6 text-[#c8d5e1]">{text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-12 grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
                    <article className="er-panel">
                        <p className="er-kicker">Best fit</p>
                        <h2 className="er-heading mt-3">This page is built for lead-driven local businesses.</h2>
                        <div className="mt-5 grid gap-3 text-sm leading-6 text-[#c8d5e1]">
                            {[
                                "HVAC, plumbing, roofing, electrical, and contractor websites",
                                "Law firms, med spas, dentists, and appointment-heavy practices",
                                "Retail, restaurant, and service businesses that depend on local trust",
                                "Agencies that need a fast diagnostic to show a client where the leak is",
                            ].map((item) => (
                                <div key={item} className="flex gap-3 rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                                    <span className="font-black text-[#3ee28f]">✓</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="er-panel">
                        <p className="er-kicker">Next step</p>
                        <h2 className="er-heading mt-3">Run the free scan first. Escalate only if the numbers justify it.</h2>
                        <p className="mt-4 text-sm leading-6 text-[#c8d5e1]">
                            That is the entire model. No subscription, no long intake, and no pressure
                            to buy the human audit unless the free diagnosis proves the site is sick.
                        </p>
                        <div className="mt-6 grid gap-3">
                            <a className="er-button-primary w-full" href="/#diagnosis">
                                Start the free Bakersfield scan →
                            </a>
                            <a className="er-button-secondary w-full" href="/reports">
                                See the report anatomy
                            </a>
                        </div>
                    </article>
                </section>

                <section className="mt-12 grid gap-5 lg:grid-cols-3">
                    {[
                        ["/pricing", "Pricing", "Compare the free scan, the human audit, and the implementation path."],
                        ["/faq", "FAQ", "Handle objections before a prospect stalls out."],
                        ["/blog/local-business-website-mistakes", "Local business mistakes", "Read what usually breaks conversions on service websites."],
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
