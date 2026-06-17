import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import { quickAuditOffer } from "@/lib/offers";
import PageSignalBar from "@/components/PageSignalBar";
import {
    buildPageMetadata,
    buildPageStructuredData,
    buildServiceSchema,
    SITE_AUTHOR_NAME,
} from "@/lib/siteSeo";

export const metadata: Metadata = buildPageMetadata({
    title: "Contact",
    description: `Contact SiteER for website diagnostics, the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name}, implementation help, and local-business website strategy.`,
    path: "/contact",
    keywords: [
        "contact SiteER",
        "Bakersfield website help",
        "website audit contact",
        "local SEO help Bakersfield",
    ],
});

const structuredData = buildPageStructuredData({
    path: "/contact",
    title: "Contact SiteER",
    description: "Contact SiteER for website scan help, implementation quotes, and local-business website strategy.",
    breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
    ],
    extras: [
        buildServiceSchema({
            path: "/contact",
            name: "Contact SiteER",
            description: "Direct contact options for SiteER website audit buyers and implementation prospects.",
            serviceType: "Website consulting contact",
        }),
        {
            "@type": "ContactPage",
            name: "Contact SiteER",
            mainEntity: {
                "@type": "Organization",
                name: "SiteER",
                contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+1-661-569-4244",
                    contactType: "customer service",
                    email: "jasonm@coaibakersfield.com",
                    areaServed: "US-CA",
                },
            },
        },
    ],
});

export default function ContactPage() {
    return (
        <SiteChrome>
            <main className="er-page er-page-tight">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
                <section className="max-w-2xl">
                    <p className="er-kicker">Contact</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                        Talk to SiteER about your website.
                    </h1>
                    <p className="er-copy mt-4">
                        The fastest contact path depends on what you need. If you still need the diagnosis, run the free scan. If you already know the site needs work, go to the implementation quote. If you need a human answer first, call or email directly.
                    </p>
                </section>

                <PageSignalBar
                    primaryCtaHref="/#diagnosis"
                    primaryCtaLabel="Run Free Scan →"
                    secondaryCtaHref="/get-quote"
                    secondaryCtaLabel="Book implementation"
                />

                <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
                    <div className="grid gap-5">
                        {[
                            {
                                title: "Need the diagnosis first?",
                                text: "Run the free scan when you want the fastest answer on how much the site is leaking and what category is causing the damage.",
                                href: "/#diagnosis",
                                label: "Run Free Scan →",
                            },
                            {
                                title: "Already know you want the work done?",
                                text: "Use the implementation quote when you want SiteER to handle the fixes and move you straight into the deposit and scheduling flow.",
                                href: "/get-quote",
                                label: "Get a Fix Quote →",
                            },
                            {
                                title: "Only need the human next step?",
                                text: `Use the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name} after the scan if you want a human action plan before committing to implementation.`,
                                href: "/pricing",
                                label: "See pricing →",
                            },
                        ].map((card) => (
                            <article key={card.title} className="er-panel">
                                <h2 className="text-2xl font-semibold text-white">{card.title}</h2>
                                <p className="mt-3 text-sm leading-6 text-[#c8d5e1]">{card.text}</p>
                                <a className="er-button-primary mt-5" href={card.href}>
                                    {card.label}
                                </a>
                            </article>
                        ))}
                    </div>

                    <aside className="er-panel text-white/72">
                        <h2 className="text-xl font-semibold text-white">Direct contact</h2>
                        <div className="mt-5 space-y-4 text-sm leading-6">
                            <p>
                                Phone: <a className="text-[#ffb15c] underline decoration-[#ffb15c]/40 underline-offset-4" href="tel:6615694244">661-569-4244</a>
                            </p>
                            <p>
                                Email: <a className="text-[#ffb15c] underline decoration-[#ffb15c]/40 underline-offset-4" href="mailto:jasonm@coaibakersfield.com">jasonm@coaibakersfield.com</a>
                            </p>
                            <p>Typical reply window: 1 business day.</p>
                            <p>Best for scan requests, {quickAuditOffer.priceLabel} audit questions, implementation help, and quote follow-ups.</p>
                            <p>Primary editor and contact: {SITE_AUTHOR_NAME}.</p>
                        </div>
                        <div className="mt-6 rounded-2xl border border-white/10 bg-[#071018] p-4">
                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffb15c]">Fastest paid step</div>
                            <p className="mt-3 text-sm leading-6 text-white/72">
                                If you only need human next steps and are not ready for the full fix package, start with the {quickAuditOffer.priceLabel} {quickAuditOffer.name} from your private scan report.
                            </p>
                            <a className="er-button-primary mt-4" href="/#diagnosis">
                                Run free scan
                            </a>
                        </div>
                    </aside>
                </section>
            </main>
        </SiteChrome>
    );
}
