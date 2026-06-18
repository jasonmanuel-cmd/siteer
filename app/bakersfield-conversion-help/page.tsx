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
    title: "Bakersfield Conversion Help",
    description:
        "Bakersfield conversion help for service websites that get traffic but not enough calls, form fills, and booked jobs because the offer, proof, or CTA path is too weak.",
    path: "/bakersfield-conversion-help",
    keywords: [
        "Bakersfield conversion help",
        "website conversion help Bakersfield",
        "Bakersfield lead generation website help",
        "more website calls Bakersfield",
        "website quote form optimization Bakersfield",
    ],
});

const conversionFaqs = [
    {
        question: "What does conversion help mean for a local business site?",
        answer: "It means improving the parts of the page that turn interest into action: the headline, trust proof, mobile flow, CTA placement, and form or call path.",
    },
    {
        question: "Can a site have traffic but still have a conversion problem?",
        answer: "Yes. Many sites get visits but lose buyers because the message is vague, the page feels untrustworthy, or the next step is too hard.",
    },
    {
        question: "How does SiteER fit into conversion work?",
        answer: `SiteER finds the weak spots first, then gives you the choice between the free diagnosis, the ${quickAuditOffer.priceLabel} human action plan, or the implementation path.`,
    },
] as const;

const structuredData = buildPageStructuredData({
    path: "/bakersfield-conversion-help",
    title: "Bakersfield Conversion Help",
    description:
        "Bakersfield conversion help for service businesses that need stronger offers, better proof, and more call or quote completions from the same traffic.",
    breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Bakersfield Conversion Help", path: "/bakersfield-conversion-help" },
    ],
    faqs: conversionFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
    extras: [
        buildServiceSchema({
            path: "/bakersfield-conversion-help",
            name: "Bakersfield Conversion Help",
            description: "Conversion-focused website help for Bakersfield lead-generation sites that need more calls and quote requests.",
            serviceType: "Bakersfield website conversion help",
        }),
    ],
});

const relatedPages = localGrowthPages.filter((page) => page.href !== "/bakersfield-conversion-help");

export default function BakersfieldConversionHelpPage() {
    return (
        <SiteChrome>
            <main className="er-page">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />

                <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                    <div>
                        <p className="er-kicker">Bakersfield Conversion Help</p>
                        <h1 className="er-title mt-4">
                            Traffic is not the win if the page still cannot turn interest into a call.
                        </h1>
                        <p className="er-copy mt-5">
                            SiteER helps local service businesses diagnose the quieter leaks: vague offers, weak trust, confusing mobile layouts, and calls to action that do not feel urgent or obvious enough. Conversion help is about making the next step clear, credible, and easy.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="er-chip">Clearer offer</span>
                            <span className="er-chip">Stronger trust proof</span>
                            <span className="er-chip">Simpler quote path</span>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a className="er-button-primary" href="/#diagnosis">
                                Run Free Scan →
                            </a>
                            <a className="er-button-secondary" href="/pricing">
                                Compare the next steps
                            </a>
                        </div>
                    </div>

                    <aside className="er-panel-accent">
                        <div className="er-kicker">What conversion work usually changes</div>
                        <div className="mt-4 grid gap-4">
                            {[
                                ["Message", "The buyer should understand what you do, who it is for, and why it is worth contacting you almost immediately."],
                                ["Proof", "Reviews, examples, numbers, and credibility cues need to support the first CTA instead of hiding near the bottom."],
                                ["Path", "The page should make calling, booking, or requesting a quote feel easier than leaving."],
                            ].map(([title, text]) => (
                                <div key={title} className="rounded-[22px] border border-white/12 bg-white/[0.05] p-4">
                                    <div className="text-xs font-black tracking-[0.18em] text-[#ffd8dd]">{title}</div>
                                    <p className="mt-2 text-sm leading-6 text-[#d6e2ee]">{text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm leading-6 text-[#fff0d7]">
                            Conversion help is usually cheaper than chasing more traffic into the same weak page.
                        </p>
                    </aside>
                </section>

                <PageSignalBar
                    primaryCtaHref="/#diagnosis"
                    primaryCtaLabel="Run Free Scan →"
                    secondaryCtaHref="/get-quote"
                    secondaryCtaLabel="Get a fix quote"
                />

                <section className="mt-12 grid gap-5 md:grid-cols-3">
                    {[
                        [
                            "The headline has to carry real weight.",
                            "If the top of the page is vague, the buyer spends their energy figuring out what you do instead of deciding whether to contact you.",
                        ],
                        [
                            "Proof should sit near the first decision.",
                            "Reviews, examples, and clear contact details work best when they support the first CTA, not when they are buried late on the page.",
                        ],
                        [
                            "One CTA path usually wins.",
                            "Local service sites often convert better when the page repeats one clear next step instead of making buyers choose between too many weak options.",
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
                            <p className="er-kicker">What gets tightened first</p>
                            <h2 className="er-heading mt-3">SiteER diagnoses where buyers lose confidence or momentum.</h2>
                        </div>
                        <p className="er-copy max-w-[470px]">
                            Most conversion problems are not mysterious. They are stacked friction points that stop a ready buyer from taking the obvious next step.
                        </p>
                    </div>
                    <div className="mt-8 grid gap-4 lg:grid-cols-2">
                        {[
                            ["Offer framing", "The service promise should sound specific, useful, and valuable instead of generic."],
                            ["CTA placement", "Important actions should appear where buyers naturally make decisions, especially on mobile."],
                            ["Form friction", "Quote forms work better when they ask only for the information needed to start the conversation."],
                            ["Trust sequencing", "Credibility cues need to show up before hesitation has time to build."],
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
                        <h2 className="er-heading mt-3">Use this when the site is getting attention but not enough action.</h2>
                        <div className="mt-5 grid gap-3 text-sm leading-6 text-[#c8d5e1]">
                            {[
                                "Businesses with decent traffic but weak calls, quote requests, or booked consultations",
                                "Owners who suspect the site feels vague, cluttered, or low-trust even if the service itself is strong",
                                "Teams that want to separate a conversion problem from a pure SEO or speed problem",
                                "Sites that need a stronger sales path before buying more ads or more SEO",
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
                        <h2 className="er-heading mt-3">Let the scan tell you whether the leak is conversion, speed, trust, or all three at once.</h2>
                        <p className="mt-4 text-sm leading-6 text-[#c8d5e1]">
                            That is the point of the SiteER ladder. Diagnose first. Rank the fixes second. Implement only when the page has already proven the business case.
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
