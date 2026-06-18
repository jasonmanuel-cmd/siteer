import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import PageSignalBar from "@/components/PageSignalBar";
import { quickAuditOffer } from "@/lib/offers";
import { localGrowthPages } from "@/lib/localContent";
import {
    buildPageMetadata,
    buildPageStructuredData,
    LAST_UPDATED_ISO,
    LAST_UPDATED_LABEL,
    SITE_AUTHOR_NAME,
    SITE_AUTHOR_URL,
} from "@/lib/siteSeo";

export const metadata: Metadata = buildPageMetadata({
    title: "Representative Contractor Website Repair Case Study",
    description:
        "A representative SiteER case study showing how a contractor-style website can move from slow, vague, and low-trust into a clearer quote-ready lead funnel.",
    path: "/case-studies/bakersfield-contractor-website-repair",
    keywords: [
        "contractor website case study",
        "Bakersfield website repair case study",
        "website conversion case study",
        "local business website fix example",
        "SiteER case study",
    ],
});

const caseStudyFaqs = [
    {
        question: "Is this a real client page or a representative walkthrough?",
        answer: "This is a representative case study built from the recurring issues SiteER finds on local contractor and service-business websites.",
    },
    {
        question: "Why use a representative case study here?",
        answer: "It shows the exact fix pattern without claiming a named client's private numbers or exposing their report details.",
    },
    {
        question: "What should I do if my site looks similar?",
        answer: `Run the free scan first. If the numbers are ugly, use the ${quickAuditOffer.priceLabel} audit or move into the implementation quote path.`,
    },
] as const;

const structuredData = buildPageStructuredData({
    path: "/case-studies/bakersfield-contractor-website-repair",
    title: "Representative Contractor Website Repair Case Study",
    description:
        "Representative SiteER case study for a contractor-style website that needed better speed, trust, and conversion flow.",
    breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Representative Contractor Website Repair Case Study", path: "/case-studies/bakersfield-contractor-website-repair" },
    ],
    faqs: caseStudyFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
    extras: [
        {
            "@type": "Article",
            "@id": "https://www.siteer.dev/case-studies/bakersfield-contractor-website-repair#article",
            headline: "Representative Contractor Website Repair Case Study",
            description:
                "Representative SiteER case study for a contractor-style website that needed better speed, trust, and conversion flow.",
            author: {
                "@type": "Person",
                name: SITE_AUTHOR_NAME,
                url: SITE_AUTHOR_URL,
            },
            publisher: {
                "@id": "https://www.siteer.dev/#org",
            },
            datePublished: LAST_UPDATED_ISO,
            dateModified: LAST_UPDATED_ISO,
            about: {
                "@id": "https://www.siteer.dev/#service",
            },
        },
    ],
});

export default function ContractorCaseStudyPage() {
    return (
        <SiteChrome>
            <main className="er-page er-page-tight">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />

                <section className="max-w-4xl">
                    <p className="er-kicker">Representative Case Study</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                        How a contractor-style site can move from slow and low-trust to quote-ready.
                    </h1>
                    <p className="mt-4 max-w-3xl text-lg leading-8 text-white/72">
                        This is a representative SiteER walkthrough based on the recurring issues we find on local contractor and service-business websites. The point is not to show off a vanity redesign. The point is to show the exact repair pattern that turns a weak page into a stronger lead funnel.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3 text-sm text-[#d6e2ee]">
                        <span className="er-chip">Updated {LAST_UPDATED_LABEL}</span>
                        <span className="er-chip">By {SITE_AUTHOR_NAME}</span>
                        <span className="er-chip">Representative, not client-identifying</span>
                    </div>
                </section>

                <PageSignalBar
                    primaryCtaHref="/#diagnosis"
                    primaryCtaLabel="Run Free Scan →"
                    secondaryCtaHref="/get-quote"
                    secondaryCtaLabel="Book implementation"
                />

                <section className="mt-10 grid gap-5 lg:grid-cols-3">
                    {[
                        {
                            label: "Before",
                            metric: "39 / Grade F",
                            body: "The page loaded slowly on mobile, hid the offer behind weak copy, and delayed trust signals until too late in the scroll.",
                            tone: "border-[#ff4d5e]/20 bg-[#ff4d5e]/10",
                        },
                        {
                            label: "Repair plan",
                            metric: "Speed + trust + CTA flow",
                            body: "SiteER treated this as a layered leak instead of a one-metric problem: faster load, clearer promise, stronger proof, and a tighter quote path.",
                            tone: "border-white/10 bg-white/[0.05]",
                        },
                        {
                            label: "After pattern",
                            metric: "82 / Grade A",
                            body: "The repaired page became faster to trust, easier to tap, and clearer about the next step, which is what lead-generation sites actually need.",
                            tone: "border-[#3ee28f]/20 bg-[#3ee28f]/10",
                        },
                    ].map((item) => (
                        <article key={item.label} className={`rounded-[24px] border p-5 ${item.tone}`}>
                            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#ffd8dd]">{item.label}</div>
                            <div className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">{item.metric}</div>
                            <p className="mt-3 text-sm leading-6 text-[#d6e2ee]">{item.body}</p>
                        </article>
                    ))}
                </section>

                <section className="mt-12 er-panel">
                    <p className="er-kicker">Baseline symptoms</p>
                    <h2 className="er-heading mt-3">What was hurting the page before the repair work.</h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {[
                            ["Slow mobile entry", "Heavy hero media and unnecessary scripts delayed the first useful interaction."],
                            ["Weak headline clarity", "The promise was too generic, so buyers had to work to understand what the contractor actually offered."],
                            ["Late proof", "Trust cues and credibility appeared too far down the page to support the first decision."],
                            ["Soft CTA path", "The quote action lacked urgency and did not feel like the obvious next step."],
                        ].map(([title, text]) => (
                            <div key={title} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5">
                                <h3 className="text-lg font-semibold text-white">{title}</h3>
                                <p className="mt-2 text-sm leading-6 text-[#c8d5e1]">{text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-12 er-panel">
                    <p className="er-kicker">Treatment plan</p>
                    <h2 className="er-heading mt-3">What the repair sequence looked like.</h2>
                    <div className="mt-6 grid gap-4">
                        {[
                            ["1. Tighten the hero", "The page should say who the service is for, what gets solved, and what the buyer should do next without generic filler."],
                            ["2. Remove mobile drag", "Compress heavy assets, reduce render-blocking work, and make the first screen usable faster."],
                            ["3. Move proof earlier", "Bring reviews, contact cues, and credibility signals close to the first CTA so hesitation has less time to grow."],
                            ["4. Simplify the quote path", "Use one stronger CTA and a cleaner quote flow so the page asks for action clearly."],
                        ].map(([title, text]) => (
                            <div key={title} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5">
                                <h3 className="text-lg font-semibold text-white">{title}</h3>
                                <p className="mt-2 text-sm leading-6 text-[#c8d5e1]">{text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-12 er-panel-accent">
                    <p className="er-kicker">Takeaway</p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">Most local websites do not need more complexity. They need a cleaner trust-and-action path.</h2>
                    <p className="mt-4 max-w-[820px] text-sm leading-7 text-[#fff0d7]">
                        This case study pattern shows why SiteER works as a revenue tool instead of a vanity-grade tool. The grade matters because it exposes urgency. The repair plan matters because it turns that urgency into a sequence the owner or developer can actually execute.
                    </p>
                </section>

                <section className="mt-12 grid gap-5 lg:grid-cols-3">
                    <a href="/bakersfield-website-audit" className="er-link-card">
                        <div className="text-base font-semibold text-white">Bakersfield audit hub</div>
                        <p className="mt-2 text-sm leading-6 text-[#c8d5e1]">
                            Start with the main Bakersfield page if you want the full local diagnostic path first.
                        </p>
                    </a>
                    {localGrowthPages.map((page) => (
                        <a key={page.href} href={page.href} className="er-link-card">
                            <div className="text-base font-semibold text-white">{page.title}</div>
                            <p className="mt-2 text-sm leading-6 text-[#c8d5e1]">{page.summary}</p>
                        </a>
                    ))}
                </section>
            </main>
        </SiteChrome>
    );
}
