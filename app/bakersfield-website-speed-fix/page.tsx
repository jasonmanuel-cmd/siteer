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
    title: "Bakersfield Website Speed Fix",
    description:
        "Bakersfield website speed fix help for service businesses that lose calls on mobile because pages load too slowly, jump around, or force people to wait before they can act.",
    path: "/bakersfield-website-speed-fix",
    keywords: [
        "Bakersfield website speed fix",
        "website speed optimization Bakersfield",
        "slow website fix Bakersfield",
        "mobile speed fix Bakersfield",
        "Core Web Vitals Bakersfield",
    ],
});

const speedFaqs = [
    {
        question: "Why does speed matter so much for local service websites?",
        answer: "A local buyer is often ready to act now. If the site is slow on mobile, the buyer usually leaves before trust or the offer can do their job.",
    },
    {
        question: "What does SiteER catch on slow pages?",
        answer: "SiteER flags slow loading, mobile friction, unstable layout, and other issues that make quote-ready traffic drop before it reaches the CTA.",
    },
    {
        question: "Is the free scan enough for speed issues?",
        answer: `The free scan shows urgency fast. The ${quickAuditOffer.priceLabel} human audit helps rank the fixes, and the implementation quote is the path if you want the work done for you.`,
    },
] as const;

const structuredData = buildPageStructuredData({
    path: "/bakersfield-website-speed-fix",
    title: "Bakersfield Website Speed Fix",
    description:
        "Bakersfield website speed fix help for businesses losing leads to slow mobile performance and load-related friction.",
    breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Bakersfield Website Speed Fix", path: "/bakersfield-website-speed-fix" },
    ],
    faqs: speedFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
    extras: [
        buildServiceSchema({
            path: "/bakersfield-website-speed-fix",
            name: "Bakersfield Website Speed Fix",
            description: "Website speed repair and mobile-performance help for Bakersfield lead-generation sites.",
            serviceType: "Bakersfield website speed fix",
        }),
    ],
});

const relatedPages = localGrowthPages.filter((page) => page.href !== "/bakersfield-website-speed-fix");

export default function BakersfieldWebsiteSpeedFixPage() {
    return (
        <SiteChrome>
            <main className="er-page">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />

                <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                    <div>
                        <p className="er-kicker">Bakersfield Website Speed Fix</p>
                        <h1 className="er-title mt-4">
                            A slow page makes local traffic disappear before your offer gets a chance.
                        </h1>
                        <p className="er-copy mt-5">
                            SiteER helps identify the speed problems that hurt lead-generation websites most:
                            slow mobile rendering, layout shifts, heavy scripts, and bloated pages that delay the first useful click. Faster pages do not just look better. They preserve intent long enough for the buyer to call or book.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="er-chip">Faster mobile first paint</span>
                            <span className="er-chip">Cleaner CTA access</span>
                            <span className="er-chip">Less bounce from paid and organic traffic</span>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a className="er-button-primary" href="/#diagnosis">
                                Run Free Scan →
                            </a>
                            <a className="er-button-secondary" href="/reports">
                                See the report anatomy
                            </a>
                        </div>
                    </div>

                    <aside className="er-panel-accent">
                        <div className="er-kicker">What slow pages usually break</div>
                        <div className="mt-4 grid gap-4">
                            {[
                                ["First impression", "A slow hero makes the business feel less credible before the copy has a chance to reassure the buyer."],
                                ["Mobile patience", "Phone traffic is less forgiving. The longer someone waits, the more likely they are to go back to search."],
                                ["Conversion path", "Forms, tap-to-call buttons, and proof blocks lose power when they load late or jump around."],
                            ].map(([title, text]) => (
                                <div key={title} className="rounded-[22px] border border-white/12 bg-white/[0.05] p-4">
                                    <div className="text-xs font-black tracking-[0.18em] text-[#ffd8dd]">{title}</div>
                                    <p className="mt-2 text-sm leading-6 text-[#d6e2ee]">{text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm leading-6 text-[#fff0d7]">
                            Speed is not a vanity metric here. It protects call-ready buyers from dropping out before they act.
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
                            "Images and scripts are usually the first leak.",
                            "Oversized media and unnecessary JavaScript often push the page past the patience threshold for mobile traffic.",
                        ],
                        [
                            "Layout stability matters too.",
                            "A page that shifts while someone tries to tap a CTA feels broken, even if it eventually finishes loading.",
                        ],
                        [
                            "Speed changes conversion quality.",
                            "When people can read, trust, and act quickly, a site usually produces better calls and more complete form submissions.",
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
                            <p className="er-kicker">What gets cleaned up first</p>
                            <h2 className="er-heading mt-3">SiteER translates speed problems into concrete repair work.</h2>
                        </div>
                        <p className="er-copy max-w-[470px]">
                            You do not need another abstract performance score. You need to know which bottlenecks are delaying trust, tapping, and conversion.
                        </p>
                    </div>
                    <div className="mt-8 grid gap-4 lg:grid-cols-2">
                        {[
                            ["Hero weight", "Heavy above-the-fold media is often the first thing making local traffic wait too long."],
                            ["Render blocking", "Too many client-side assets delay the moment the page becomes readable and clickable."],
                            ["Mobile spacing", "Speed issues often overlap with long scroll paths and weak CTA placement on narrow screens."],
                            ["Proof timing", "Reviews, badges, and contact cues have to appear fast enough to support the sale instead of arriving late."],
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
                        <h2 className="er-heading mt-3">Use this when the site feels slow, cluttered, or frustrating on a phone.</h2>
                        <div className="mt-5 grid gap-3 text-sm leading-6 text-[#c8d5e1]">
                            {[
                                "Businesses running paid ads or local SEO campaigns that are sending phone users to a weak landing experience",
                                "Sites with strong services but poor mobile patience and too much visual weight",
                                "Owners who hear complaints about slow load times or who see lots of traffic with weak conversion rates",
                                "Teams that need to separate a speed problem from a trust or offer problem before paying for implementation",
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
                        <h2 className="er-heading mt-3">Use the free scan to confirm whether speed is the top leak or just one layer of the problem.</h2>
                        <p className="mt-4 text-sm leading-6 text-[#c8d5e1]">
                            That is where the SiteER ladder helps. The scan shows urgency. The {quickAuditOffer.priceLabel} review ranks the fixes. The Fix Pack exists if you want the work completed and re-scanned.
                        </p>
                        <div className="mt-6 grid gap-3">
                            <a className="er-button-primary w-full" href="/#diagnosis">
                                Start the free scan →
                            </a>
                            <a className="er-button-secondary w-full" href={siteerCaseStudy.href}>
                                Read the speed-related case study
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
