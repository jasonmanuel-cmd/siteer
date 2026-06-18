import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import PageSignalBar from "@/components/PageSignalBar";
import { quickAuditOffer } from "@/lib/offers";
import { localGrowthPages, siteerCaseStudy } from "@/lib/localContent";
import {
    buildPageMetadata,
    buildPageStructuredData,
    buildServiceSchema,
} from "@/lib/siteSeo";

export const metadata: Metadata = buildPageMetadata({
    title: "Bakersfield Local SEO Help",
    description:
        `Bakersfield local SEO help for service businesses that need stronger location signals, better trust, and more calls from existing search demand before paying for a full rebuild.`,
    path: "/bakersfield-local-seo",
    keywords: [
        "Bakersfield local SEO",
        "local SEO help Bakersfield",
        "Bakersfield website SEO help",
        "Google Maps SEO Bakersfield",
        "service business SEO Bakersfield",
    ],
});

const localSeoFaqs = [
    {
        question: "Who is this Bakersfield local SEO page for?",
        answer: "It is for service businesses that need more nearby calls, form fills, and quote requests from Google Search and Maps.",
    },
    {
        question: "What does SiteER check first for local SEO?",
        answer: "SiteER checks whether the site clearly states what the business does, where it works, and whether the page earns trust fast enough to convert local intent.",
    },
    {
        question: "Should I buy the $20 audit or jump to implementation?",
        answer: `Start with the free scan. If it shows real damage, buy the ${quickAuditOffer.priceLabel} audit for ranked next steps or move straight into the implementation quote.`,
    },
] as const;

const structuredData = buildPageStructuredData({
    path: "/bakersfield-local-seo",
    title: "Bakersfield Local SEO Help",
    description:
        "Bakersfield local SEO help for service businesses that need better local visibility, stronger trust, and more qualified calls.",
    breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Bakersfield Local SEO Help", path: "/bakersfield-local-seo" },
    ],
    faqs: localSeoFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
    extras: [
        buildServiceSchema({
            path: "/bakersfield-local-seo",
            name: "Bakersfield Local SEO Help",
            description: "Local SEO help for Bakersfield service businesses that need more nearby calls and quote requests.",
            serviceType: "Bakersfield local SEO",
        }),
        {
            "@type": "ProfessionalService",
            name: "SiteER Local SEO Help",
            areaServed: {
                "@type": "City",
                name: "Bakersfield",
            },
        },
    ],
});

const relatedPages = localGrowthPages.filter((page) => page.href !== "/bakersfield-local-seo");

export default function BakersfieldLocalSeoPage() {
    return (
        <SiteChrome>
            <main className="er-page">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />

                <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                    <div>
                        <p className="er-kicker">Bakersfield Local SEO</p>
                        <h1 className="er-title mt-4">
                            If Google cannot place your business locally, the call usually goes elsewhere.
                        </h1>
                        <p className="er-copy mt-5">
                            SiteER helps Bakersfield service businesses line up the three signals that matter most on local pages:
                            what you do, where you do it, and why a buyer should trust you fast. That is the difference between a page that gets impressions and a page that gets calls.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="er-chip">Service area clarity</span>
                            <span className="er-chip">Local trust signals</span>
                            <span className="er-chip">Maps + website alignment</span>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a className="er-button-primary" href="/#diagnosis">
                                Run Free Scan →
                            </a>
                            <a className="er-button-secondary" href="/bakersfield-website-audit">
                                See the Bakersfield audit hub
                            </a>
                        </div>
                    </div>

                    <aside className="er-panel-accent">
                        <div className="er-kicker">What local SEO actually changes</div>
                        <div className="mt-4 grid gap-4">
                            {[
                                ["Relevance", "The page needs to say what service is being offered, who it is for, and which local market it serves."],
                                ["Trust", "Reviews, clear contact details, proof, and focused copy help nearby traffic feel safe enough to act."],
                                ["Prominence", "A stronger local page makes it easier for citations, links, mentions, and your Business Profile to reinforce each other."],
                            ].map(([title, text]) => (
                                <div key={title} className="rounded-[22px] border border-white/12 bg-white/[0.05] p-4">
                                    <div className="text-xs font-black tracking-[0.18em] text-[#ffd8dd]">{title}</div>
                                    <p className="mt-2 text-sm leading-6 text-[#d6e2ee]">{text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm leading-6 text-[#fff0d7]">
                            The point is not more generic traffic. The point is to win more of the nearby intent that is already searching.
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
                            "Service pages need a local point of view.",
                            "A Bakersfield local SEO page should connect the service, the city, and the buyer problem in plain language instead of hiding behind vague marketing copy.",
                        ],
                        [
                            "Trust has to show early.",
                            "Phone numbers, proof, real offers, and a clear next step help local traffic convert instead of bouncing back to search.",
                        ],
                        [
                            "Internal links build consensus.",
                            "Your audit hub, pricing page, report page, and service pages should reinforce each other so Google and AI engines see a coherent story.",
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
                            <p className="er-kicker">What gets fixed first</p>
                            <h2 className="er-heading mt-3">SiteER turns local SEO into a tighter sales page, not keyword wallpaper.</h2>
                        </div>
                        <p className="er-copy max-w-[470px]">
                            The best local pages are specific enough for Google to understand and simple enough for a busy buyer to trust in under ten seconds.
                        </p>
                    </div>
                    <div className="mt-8 grid gap-4 lg:grid-cols-2">
                        {[
                            ["Headline clarity", "The page should state the service, city, and outcome without making the reader guess."],
                            ["Service area signals", "City, region, contact details, and location language need to support the actual market you serve."],
                            ["Proof placement", "Reviews, before-and-after outcomes, or clear credibility cues should appear close to the first CTA."],
                            ["Friction control", "Fast load times and simple CTAs protect the local traffic you already worked to earn."],
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
                        <h2 className="er-heading mt-3">Use this when the site has traffic but weak local traction.</h2>
                        <div className="mt-5 grid gap-3 text-sm leading-6 text-[#c8d5e1]">
                            {[
                                "Contractors, trades, law firms, med spas, and appointment-heavy service businesses",
                                "Owners who show up sometimes but not consistently for nearby searches",
                                "Sites that mention the service but do not connect it clearly to Bakersfield and Kern County intent",
                                "Businesses that need the website and Google Business Profile to reinforce each other better",
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
                        <h2 className="er-heading mt-3">Start with the scan. Then decide whether the problem is visibility, speed, or conversion.</h2>
                        <p className="mt-4 text-sm leading-6 text-[#c8d5e1]">
                            The free scan gives you the first answer. The {quickAuditOffer.priceLabel} human review ranks the fixes. The implementation path exists for owners who want the work handled end to end.
                        </p>
                        <div className="mt-6 grid gap-3">
                            <a className="er-button-primary w-full" href="/#diagnosis">
                                Start the free scan →
                            </a>
                            <a className="er-button-secondary w-full" href={siteerCaseStudy.href}>
                                Read the contractor case study
                            </a>
                        </div>
                    </article>
                </section>

                <section className="mt-12 grid gap-5 lg:grid-cols-3">
                    {relatedPages.map((page) => (
                        <a key={page.href} href={page.href} className="er-link-card">
                            <div className="text-base font-semibold text-white">{page.title}</div>
                            <p className="mt-2 text-sm leading-6 text-[#c8d5e1]">{page.summary}</p>
                        </a>
                    ))}
                    <a href={siteerCaseStudy.href} className="er-link-card">
                        <div className="text-base font-semibold text-white">{siteerCaseStudy.title}</div>
                        <p className="mt-2 text-sm leading-6 text-[#c8d5e1]">{siteerCaseStudy.summary}</p>
                    </a>
                </section>
            </main>
        </SiteChrome>
    );
}
