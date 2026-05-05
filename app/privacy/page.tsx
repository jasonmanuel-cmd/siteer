import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
    title: "Privacy Agreement | SiteER",
    description: "How SiteER stores and uses scan results, lead details, and support requests.",
    robots: { index: false, follow: false },
};

export default function PrivacyPage() {
    return (
        <SiteChrome>
            <main className="mx-auto max-w-4xl px-5 py-8 md:px-8 md:py-12">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffb15c]">Privacy</p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">Privacy Agreement</h1>
                <div className="mt-8 grid gap-4">
                    {[
                        ["What we collect", "We collect the information you send in forms, such as your name, email, phone number, website URL, and message content. We also collect basic usage and diagnostic data needed to operate the site."],
                        ["How we use it", "We use this information to generate scan results, respond to inquiries, prepare quotes, deliver reports, and improve the service. We do not sell your personal information."],
                        ["Storage and retention", "We keep information only as long as needed for the service, support, legal, or accounting purposes. We may retain anonymized diagnostic trends to improve our tooling."],
                        ["Sharing", "We may share data with vendors that help us operate the site, such as hosting, analytics, and email services, but only as needed to provide the service."],
                        ["Your requests", "To request access, correction, or deletion of your data, contact jasonm@coaibakersfield.com. We will review and respond within a reasonable time."],
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
