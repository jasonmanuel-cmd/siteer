import type { Metadata } from "next";
import dynamic from "next/dynamic";
import SiteChrome from "@/components/SiteChrome";
import { quickAuditOffer } from "@/lib/offers";
import { fixPackDepositOffer } from "@/lib/offers";
const QuoteForm = dynamic(() => import("@/components/QuoteForm"), { ssr: false, loading: () => null });

export const metadata: Metadata = {
    title: "Get a Fix Quote",
    description:
        `Request a custom SiteER fix quote for full implementation, or start with the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name} if you only need human next steps.`,
    alternates: {
        canonical: "/get-quote",
    },
    openGraph: {
        title: "Get a Fix Quote | SiteER",
        description:
            `Request a custom fix quote for your highest-impact website issues, or start with the ${quickAuditOffer.name}.`,
        url: "https://siteer.dev/get-quote",
        siteName: "SiteER",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "SiteER quote preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Get a Fix Quote | SiteER",
        description:
            `Request a custom implementation quote, or start with the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name}.`,
        images: ["/og-image.png"],
    },
};

export default function GetQuotePage() {
    return (
        <SiteChrome>
            <main className="er-page er-page-narrow">
                <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                    <div>
                        <p className="er-kicker">Implementation</p>
                        <h1 className="er-heading mt-3">
                            Need it fixed for you? Book the ER Fix Pack.
                        </h1>
                        <p className="er-copy mt-4">
                            No developer, no time, or no desire to manage the cleanup yourself? The SiteER team handles the highest-impact fixes, then re-scans the site to prove the improvement in real numbers.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="er-chip">{fixPackDepositOffer.priceLabel} deposit reserves the work</span>
                            <span className="er-chip">Deposit applied to the final total</span>
                            <span className="er-chip">20+ point grade guarantee</span>
                        </div>
                    </div>

                    <aside className="er-panel-accent">
                        <div className="er-kicker">What happens next</div>
                        <div className="mt-4 grid gap-4">
                            {[
                                ["1", "Submit the form", "Tell us who you are and which site needs treatment."],
                                ["2", `Pay the ${fixPackDepositOffer.priceLabel} deposit`, "We redirect you to secure Square checkout immediately after the form saves."],
                                ["3", "Get contacted within 1 business day", "You receive the implementation plan, scheduling details, and the remaining balance outline."],
                            ].map(([step, title, text]) => (
                                <div key={step} className="rounded-[20px] border border-white/12 bg-white/[0.05] p-4">
                                    <div className="text-xs font-black tracking-[0.18em] text-[#fff0d7]">STEP {step}</div>
                                    <h2 className="mt-2 text-lg font-semibold text-white">{title}</h2>
                                    <p className="mt-2 text-sm leading-6 text-[#d6e2ee]">{text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm leading-6 text-[#fff0d7]">
                            Not ready for the full implementation? Run the free scan and unlock the {quickAuditOffer.priceLabel} {quickAuditOffer.name} from your report instead.
                        </p>
                        <a className="er-button-secondary mt-5 w-full" href="/#diagnosis">
                            Run free scan for the {quickAuditOffer.priceLabel} path
                        </a>
                    </aside>
                </section>

                <section className="mt-10 er-panel">
                    <div className="mb-6">
                        <p className="er-kicker">Reserve the work</p>
                        <h2 className="mt-3 text-2xl font-semibold text-white">
                            {fixPackDepositOffer.priceLabel} deposit today, applied to your final ER Fix Pack total.
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-[#c8d5e1]">
                            After you submit, you will be redirected to Square for the implementation deposit. The deposit is not extra. It is credited toward the project and secures the next slot.
                        </p>
                    </div>
                    <QuoteForm />
                </section>
            </main>
        </SiteChrome>
    );
}
