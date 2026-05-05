import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
    title: "Terms & Conditions | SiteER",
    description: "Terms for using SiteER scans, estimates, and implementation services.",
    robots: { index: false, follow: false },
};

export default function TermsPage() {
    return (
        <SiteChrome>
            <main className="mx-auto max-w-4xl px-5 py-8 md:px-8 md:py-12">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffb15c]">Legal</p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">Terms &amp; Conditions</h1>
                <div className="mt-8 grid gap-4">
                    {[
                        ["Scope of service", "SiteER provides website diagnostics, written recommendations, and optional implementation work. Scan results and dollar estimates are informational, not guarantees of revenue or rankings."],
                        ["User responsibilities", "You are responsible for the URLs, content, access, and information you submit. Do not send confidential data you do not want used to generate reports or support replies."],
                        ["Quotes and billing", "Any quoted implementation work is separate from scanning unless stated otherwise in writing. Billing terms are defined in the proposal or invoice that accompanies the work."],
                        ["Limitations", "SiteER does not control third-party platforms, hosting providers, search engines, payment processors, or browser behavior. Outcomes can vary based on environment, competition, and technical constraints."],
                        ["Changes", "We may update these terms when services, legal requirements, or workflows change. Continued use of the site after an update means you accept the revised terms."],
                    ].map(([title, text]) => (
                        <section key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                            <h2 className="text-lg font-semibold text-white">{title}</h2>
                            <p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
                        </section>
                    ))}
                </div>
            </main>
        </SiteChrome>
    );
}
