import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import { fixPackDepositOffer, quickAuditOffer } from "@/lib/offers";

export const metadata: Metadata = {
    title: "Pricing",
    description:
        `See SiteER pricing for free website diagnosis, the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name}, and ER Fix Pack implementation powered by COAIBAKERSFIELD.COM.`,
    alternates: {
        canonical: "/pricing",
    },
    openGraph: {
        title: "Pricing | SiteER",
        description:
            `Compare the free scan, ${quickAuditOffer.name}, and ER Fix Pack options.`,
        url: "https://siteer.dev/pricing",
        siteName: "SiteER",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "SiteER pricing preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pricing | SiteER",
        description:
            `Compare the free scan, ${quickAuditOffer.name}, and ER Fix Pack options.`,
        images: ["/og-image.png"],
    },
};

const fixPackTotalLabel = "$497";

const careLevels = [
    {
        label: "Free ER Scan",
        price: "$0",
        note: "See the damage before you spend a dollar.",
        bullets: [
            "A-F grade in about 60 seconds",
            "Estimated monthly money leak",
            "Top symptoms surfaced instantly",
            "Private ER chart unlocked by email",
        ],
        ctaHref: "/#diagnosis",
        ctaLabel: "Run free scan →",
        featured: false,
    },
    {
        label: quickAuditOffer.name,
        price: quickAuditOffer.priceLabel,
        note: "Best first paid step when you want human next moves.",
        bullets: [
            "Manual review by a real operator",
            "Top 3 revenue leaks prioritized",
            "Copy, trust, and local SEO notes",
            "Plain-English action plan you can forward",
        ],
        ctaHref: "/#diagnosis",
        ctaLabel: "Unlock from your report →",
        featured: false,
    },
    {
        label: "ER Fix Pack",
        price: fixPackTotalLabel,
        note: `${fixPackDepositOffer.priceLabel} deposit today. Applied to the full implementation total.`,
        bullets: [
            "Speed, mobile, SEO, and trust fixes done for you",
            "Before-and-after re-scan proof",
            "Guaranteed 20+ point grade improvement or full refund",
            "Reserved implementation slot after deposit",
        ],
        ctaHref: "/get-quote",
        ctaLabel: `Start with ${fixPackDepositOffer.priceLabel} deposit →`,
        featured: true,
    },
];

const comparisonRows = [
    ["Who it is for", "Anyone who wants the diagnosis fast", "Owners who want a human to tell them what to do next", "Owners who want SiteER to implement the fixes"],
    ["Delivery", "Instant on-page teaser + email unlock", "Human review after you buy from the report", "Quote intake + secure Square deposit"],
    ["Best outcome", "See whether the leak is real", "Get the fastest paid clarity", "Get the site fixed without managing a developer"],
];

export default function PricingPage() {
    return (
        <SiteChrome>
            <main className="er-page">
                <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                    <div>
                        <p className="er-kicker">Pricing</p>
                        <h1 className="er-title mt-4">
                            Start free. Escalate only if the damage is real.
                        </h1>
                        <p className="er-copy mt-5">
                            SiteER has three levels of care: the free diagnosis, the {quickAuditOffer.priceLabel} human review, and the ER Fix Pack with a {fixPackDepositOffer.priceLabel} deposit applied to the {fixPackTotalLabel} implementation total. Same ER system. Different depth. No subscription nonsense.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="er-chip">No credit card for the scan</span>
                            <span className="er-chip">Private report links</span>
                            <span className="er-chip">Deposit credited to the project</span>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a className="er-button-primary" href="/#diagnosis">
                                Run Free Scan →
                            </a>
                            <a className="er-button-secondary" href="/get-quote">
                                Go straight to implementation
                            </a>
                        </div>
                    </div>

                    <aside className="er-panel-accent">
                        <div className="er-kicker">What most owners do</div>
                        <div className="mt-4 grid gap-4">
                            {[
                                ["01", "Run the free ER scan", "See the grade, the leak, and whether this is a small fix or a bigger problem."],
                                ["02", `Buy the ${quickAuditOffer.priceLabel} review if needed`, "Best when you want a human to tell you the next three moves before spending more."],
                                ["03", `Drop the ${fixPackDepositOffer.priceLabel} deposit when you're done waiting`, "Use the deposit to reserve the Fix Pack and let the team handle the work for you."],
                            ].map(([step, title, text]) => (
                                <div key={step} className="rounded-[22px] border border-white/12 bg-white/[0.05] p-4">
                                    <div className="text-xs font-black tracking-[0.18em] text-[#ffd8dd]">{step}</div>
                                    <h2 className="mt-2 text-lg font-semibold text-white">{title}</h2>
                                    <p className="mt-2 text-sm leading-6 text-[#d6e2ee]">{text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm leading-6 text-[#fff0d7]">
                            Leak over $1,000/mo? That is usually where the {quickAuditOffer.priceLabel} audit or the Fix Pack becomes the obvious next move.
                        </p>
                    </aside>
                </section>

                <section className="mt-12 grid gap-5 xl:grid-cols-3">
                    {careLevels.map((level) => (
                        <article
                            key={level.label}
                            className={level.featured ? "er-panel-accent" : "er-panel"}
                        >
                            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#ffcad0]">
                                {level.label}
                            </div>
                            <div className="mt-3 flex items-end justify-between gap-4">
                                <div className="text-4xl font-black tracking-[-0.07em] text-white">{level.price}</div>
                                {level.featured ? (
                                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#fff0d7]">
                                        Done for you
                                    </span>
                                ) : null}
                            </div>
                            <p className="mt-3 text-sm leading-6 text-[#d6e2ee]">{level.note}</p>
                            <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#c7d2de]">
                                {level.bullets.map((bullet) => (
                                    <li key={bullet} className="flex gap-3">
                                        <span className="font-black text-[#3ee28f]">✓</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                            <a
                                className={level.featured ? "er-button-primary mt-6 w-full" : "er-button-secondary mt-6 w-full"}
                                href={level.ctaHref}
                            >
                                {level.ctaLabel}
                            </a>
                        </article>
                    ))}
                </section>

                <section className="mt-12 er-panel">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="er-kicker">Choose your level of care</p>
                            <h2 className="er-heading mt-3">Simple path, not a confusing pricing maze.</h2>
                        </div>
                        <p className="er-copy max-w-[420px]">
                            The free scan tells you whether the site is in critical condition. The other two options exist only to help you act on what the scan finds.
                        </p>
                    </div>
                    <div className="mt-8 grid gap-4">
                        {comparisonRows.map(([label, free, audit, fixPack]) => (
                            <div key={label} className="grid gap-3 rounded-[22px] border border-white/10 bg-white/[0.04] p-4 lg:grid-cols-[220px_1fr_1fr_1fr]">
                                <div className="text-sm font-semibold text-white">{label}</div>
                                <div className="text-sm leading-6 text-[#c8d5e1]">{free}</div>
                                <div className="text-sm leading-6 text-[#c8d5e1]">{audit}</div>
                                <div className="text-sm leading-6 text-[#c8d5e1]">{fixPack}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-12 grid gap-5 lg:grid-cols-2">
                    {[
                        {
                            name: "Joe's Plumbing",
                            before: "38 / Grade F",
                            after: "82 / Grade A",
                            impact: "40% more qualified calls and faster booking after the Fix Pack work was finished.",
                        },
                        {
                            name: "Williams & Co. Law",
                            before: "45 / Grade F",
                            after: "79 / Grade B+",
                            impact: "Mobile friction removed, local SEO cleaned up, and roughly $1,200/mo in recoverable revenue surfaced.",
                        },
                    ].map((study) => (
                        <article key={study.name} className="er-link-card">
                            <p className="er-kicker">Real results</p>
                            <h2 className="mt-3 text-2xl font-semibold text-white">{study.name}</h2>
                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-[20px] border border-[#ff4d5e]/20 bg-[#ff4d5e]/10 p-4">
                                    <div className="text-xs font-black tracking-[0.16em] text-[#ffcad0]">Before</div>
                                    <div className="mt-2 text-xl font-black text-white">{study.before}</div>
                                </div>
                                <div className="rounded-[20px] border border-[#3ee28f]/20 bg-[#3ee28f]/10 p-4">
                                    <div className="text-xs font-black tracking-[0.16em] text-[#bff7d9]">After</div>
                                    <div className="mt-2 text-xl font-black text-white">{study.after}</div>
                                </div>
                            </div>
                            <p className="mt-4 text-sm leading-6 text-[#c8d5e1]">{study.impact}</p>
                        </article>
                    ))}
                </section>

                <section className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="er-panel">
                        <p className="er-kicker">Built by the team that does the work</p>
                        <h2 className="er-heading mt-3">Chaotically Organized AI handles the diagnosis and the fix path.</h2>
                        <p className="er-copy mt-4">
                            This is not a faceless SaaS price sheet. The same Bakersfield team behind the scan handles the {quickAuditOffer.name}, implementation quotes, re-scans, and follow-through.
                        </p>
                        <a
                            href="https://coaibakersfield.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="er-button-secondary mt-6"
                        >
                            Visit coaibakersfield.com
                        </a>
                    </div>

                    <div className="er-panel">
                        <p className="er-kicker">Read before you buy</p>
                        <div className="mt-4 grid gap-3">
                            {[
                                ["/blog/local-business-website-mistakes", "Local business mistakes", "What leaks leads on service sites."],
                                ["/blog/mobile-page-speed-fixes", "Mobile speed fixes", "Fast wins for users on phones."],
                                ["/blog/website-not-bringing-customers", "Customer conversion leaks", "How to turn visits into calls."],
                            ].map(([href, title, text]) => (
                                <a key={href} className="er-link-card p-4" href={href}>
                                    <div className="text-base font-semibold text-white">{title}</div>
                                    <p className="mt-1 text-sm leading-6 text-[#c8d5e1]">{text}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <p className="mt-8 text-sm leading-6 text-[color:var(--er-muted-2)]">
                    Guarantee note: if the ER Fix Pack does not improve your grade by at least 20 points within the agreed scope, you receive a full refund.
                </p>
            </main>
        </SiteChrome>
    );
}
