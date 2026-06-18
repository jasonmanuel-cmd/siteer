import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import PageSignalBar from "@/components/PageSignalBar";
import { quickAuditOffer } from "@/lib/offers";
import {
    buildPageMetadata,
    buildPageStructuredData,
    buildServiceSchema,
    LAST_UPDATED_ISO,
    LAST_UPDATED_LABEL,
} from "@/lib/siteSeo";

export const metadata: Metadata = buildPageMetadata({
    title: "About SiteER",
    description:
        `Learn why SiteER exists, who it is built for, how the Bakersfield team works, and why the free scan, ${quickAuditOffer.priceLabel} human audit, and implementation path are structured the way they are.`,
    path: "/about",
    keywords: [
        "about SiteER",
        "why trust SiteER",
        "Bakersfield website audit team",
        "website diagnostics company Bakersfield",
        "Chaotically Organized AI",
    ],
});

const aboutFaqs = [
    {
        question: "Who built SiteER?",
        answer: "SiteER is built by the Bakersfield team behind Chaotically Organized AI to help business owners diagnose and fix the website issues that quietly cost them calls, leads, and trust.",
    },
    {
        question: "Is SiteER just a score tool?",
        answer: "No. The score creates urgency, but the real point is to translate technical damage into a ranked business action plan and, when needed, into actual repair work.",
    },
    {
        question: "What makes SiteER different from a generic audit?",
        answer: "SiteER combines a fast diagnosis, human next-step help, and a direct implementation path, so owners can move from confusion to action without getting trapped in technical fog.",
    },
] as const;

const structuredData = buildPageStructuredData({
    path: "/about",
    title: "About SiteER",
    description:
        "Why SiteER exists, how the Bakersfield team works, and why the product is structured around real business action instead of vanity scores.",
    breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
    ],
    faqs: aboutFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
    extras: [
        buildServiceSchema({
            path: "/about",
            name: "About SiteER",
            description: "Background, positioning, and trust information for SiteER website audit and implementation services.",
            serviceType: "Website diagnostics company profile",
        }),
        {
            "@type": "AboutPage",
            name: "About SiteER",
            mainEntity: {
                "@id": "https://www.siteer.dev/#org",
            },
            dateModified: LAST_UPDATED_ISO,
        },
    ],
});

export default function AboutPage() {
    return (
        <SiteChrome>
            <main className="er-page">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />

                <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                    <div>
                        <p className="er-kicker">About SiteER</p>
                        <h1 className="er-title mt-4">
                            SiteER exists because too many business owners know the site feels off but cannot see where the money is leaking.
                        </h1>
                        <p className="er-copy mt-5">
                            The idea is simple: treat website problems like triage, not like a vague design discussion. SiteER shows the owner the damage fast, explains what category is causing it, and gives a clear next step whether they want to hand it to a developer, buy a human action plan, or have the Bakersfield team handle the work directly.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="er-chip">Bakersfield-built</span>
                            <span className="er-chip">Owner-first language</span>
                            <span className="er-chip">Diagnosis → action → proof</span>
                        </div>
                    </div>

                    <aside className="er-panel-accent">
                        <div className="er-kicker">Why owners trust it</div>
                        <div className="mt-4 grid gap-4">
                            {[
                                ["Fast diagnosis", "The free scan exists to answer the urgency question quickly instead of trapping people in a long intake."],
                                ["Human follow-through", `The ${quickAuditOffer.priceLabel} audit and implementation path exist for owners who need ranked next moves, not just another dashboard.`],
                                ["Proof after the work", "The repair path includes a re-scan so the outcome can be measured instead of hand-waved."],
                            ].map(([title, text]) => (
                                <div key={title} className="rounded-[22px] border border-white/12 bg-white/[0.05] p-4">
                                    <div className="text-xs font-black tracking-[0.18em] text-[#fff0d7]">{title}</div>
                                    <p className="mt-2 text-sm leading-6 text-[#d6e2ee]">{text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm leading-6 text-[#fff0d7]">
                            Updated {LAST_UPDATED_LABEL}. Built for owners who care more about booked work than vanity metrics.
                        </p>
                    </aside>
                </section>

                <PageSignalBar
                    primaryCtaHref="/#diagnosis"
                    primaryCtaLabel="Run Free Scan →"
                    secondaryCtaHref="/get-quote"
                    secondaryCtaLabel="Book implementation"
                />

                <section className="mt-12 grid gap-5 md:grid-cols-3">
                    {[
                        [
                            "SiteER makes the business case visible.",
                            "A grade and money-leak estimate help an owner decide whether the site problem is mild, serious, or already costing real revenue.",
                        ],
                        [
                            "SiteER is built for handoff.",
                            "The report is meant to be forwarded to a developer, partner, or internal team without needing a translation layer.",
                        ],
                        [
                            "SiteER is built to lead somewhere useful.",
                            "Free scan, human audit, and implementation are part of one ladder so the next step always matches the severity of the problem.",
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
                            <p className="er-kicker">What SiteER is for</p>
                            <h2 className="er-heading mt-3">A practical decision system for local-business websites.</h2>
                        </div>
                        <p className="er-copy max-w-[470px]">
                            The best fit is a business that depends on calls, forms, consultations, or quote requests and needs the website to stop getting in its own way.
                        </p>
                    </div>
                    <div className="mt-8 grid gap-4 lg:grid-cols-2">
                        {[
                            ["Best for", "Service businesses, local operators, and lead-driven companies that need a faster path from website problem to revenue fix."],
                            ["Not built for", "Teams looking for a vanity redesign without caring whether the page actually loads, ranks, or converts better."],
                            ["What the free scan does", "Creates urgency fast and shows whether the site is leaking enough to justify the next step."],
                            ["What the paid steps do", "Translate the diagnosis into either a human action plan or a done-for-you implementation path."],
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
                        <p className="er-kicker">Operating principles</p>
                        <div className="mt-5 grid gap-3 text-sm leading-6 text-[#c8d5e1]">
                            {[
                                "Show the owner the damage quickly, then let the numbers decide what happens next.",
                                "Use plain language first and technical depth second.",
                                "Keep the pricing ladder simple enough that the next move feels obvious.",
                                "Measure the repair with a follow-up scan instead of vague promises.",
                            ].map((item) => (
                                <div key={item} className="flex gap-3 rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                                    <span className="font-black text-[#3ee28f]">✓</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="er-panel">
                        <p className="er-kicker">Direct human path</p>
                        <h2 className="er-heading mt-3">If the scan makes you nervous, there is a real team behind it.</h2>
                        <p className="mt-4 text-sm leading-6 text-[#c8d5e1]">
                            SiteER is backed by Chaotically Organized AI in Bakersfield. If the website is actively hurting trust, speed, or lead flow, the team can review it manually or take the implementation path all the way through to re-scan proof.
                        </p>
                        <div className="mt-6 grid gap-3">
                            <a className="er-button-primary w-full" href="/contact">
                                Contact Jason →
                            </a>
                            <a className="er-button-secondary w-full" href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer">
                                Visit COAI Bakersfield
                            </a>
                        </div>
                    </article>
                </section>
            </main>
        </SiteChrome>
    );
}
