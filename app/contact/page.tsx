import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
    title: "Contact | SiteER",
    description: "Contact SiteER for website diagnostics, fixes, and implementation help.",
    alternates: { canonical: "/contact" },
    robots: { index: true, follow: true },
};

export default function ContactPage() {
    return (
        <SiteChrome>
            <main className="mx-auto max-w-4xl px-5 py-8 md:px-8 md:py-12">
                <section className="max-w-2xl">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffb15c]">Contact</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                        Talk to SiteER about your website.
                    </h1>
                    <p className="mt-4 text-base leading-7 text-white/70">
                        Use the form below if you want a scan, a quote, or help fixing the issues the scan uncovered. We respond as quickly as possible during business hours.
                    </p>
                </section>

                <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
                    <form
                        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,.22)] backdrop-blur"
                        action="mailto:jasonm@coaibakersfield.com"
                        method="post"
                        encType="text/plain"
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="grid gap-2 text-sm font-medium text-white/80">
                                Name
                                <input className="rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none transition focus:border-[#ffb15c]" name="name" placeholder="Your name" />
                            </label>
                            <label className="grid gap-2 text-sm font-medium text-white/80">
                                Email
                                <input className="rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none transition focus:border-[#ffb15c]" type="email" name="email" placeholder="you@company.com" />
                            </label>
                        </div>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <label className="grid gap-2 text-sm font-medium text-white/80">
                                Phone
                                <input className="rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none transition focus:border-[#ffb15c]" type="tel" name="phone" placeholder="661-569-4244" />
                            </label>
                            <label className="grid gap-2 text-sm font-medium text-white/80">
                                Website
                                <input className="rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none transition focus:border-[#ffb15c]" type="url" name="website" placeholder="https://yourwebsite.com" />
                            </label>
                        </div>
                        <label className="mt-4 grid gap-2 text-sm font-medium text-white/80">
                            What do you need help with?
                            <textarea className="min-h-[160px] rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none transition focus:border-[#ffb15c]" name="message" placeholder="Tell us about the site, the issues you want fixed, and the outcome you want." />
                        </label>
                        <button className="mt-5 rounded-full bg-[linear-gradient(135deg,#ff4d5e,#ffb15c)] px-6 py-3 text-sm font-semibold text-[#19070a]">
                            Send message
                        </button>
                    </form>

                    <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white/72">
                        <h2 className="text-xl font-semibold text-white">Direct contact</h2>
                        <div className="mt-5 space-y-4 text-sm leading-6">
                            <p>
                                Phone: <a className="text-[#ffb15c] underline decoration-[#ffb15c]/40 underline-offset-4" href="tel:6615694244">661-569-4244</a>
                            </p>
                            <p>
                                Email: <a className="text-[#ffb15c] underline decoration-[#ffb15c]/40 underline-offset-4" href="mailto:jasonm@coaibakersfield.com">jasonm@coaibakersfield.com</a>
                            </p>
                            <p>Typical reply window: 1 business day.</p>
                            <p>Best for scan requests, implementation help, and quote follow-ups.</p>
                        </div>
                    </aside>
                </section>
            </main>
        </SiteChrome>
    );
}