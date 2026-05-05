import type { Metadata } from "next";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: false, loading: () => null });

export const metadata: Metadata = {
    title: "Contact",
    description: "Reach Jason at SiteER directly — call (661) 569-4244, email jasonm@coaibakersfield.com, or use the form below. Same-day response.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contact | SiteER",
        description: "Reach Jason directly — call, email, or send a message. Same business day response.",
        url: "https://siteer.dev/contact",
        siteName: "SiteER",
        type: "website",
    },
};

export default function ContactPage() {
    return (
        <>
            <SiteHeader />
            <main className="er-container" style={{ padding: "64px 0 0" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>

                    {/* Left — contact info */}
                    <div>
                        <p style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Get in touch</p>
                        <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", lineHeight: 1.0, letterSpacing: "-.055em", marginBottom: 36 }}>
                            Talk to a human.<br />Not a chatbot.
                        </h1>

                        <div style={{ marginBottom: 32 }}>
                            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--er-muted)", marginBottom: 10 }}>Direct Line</p>
                            <a href="tel:+16615694244" style={{ fontSize: "2rem", fontWeight: 900, color: "var(--er-cyan)", letterSpacing: "-.03em", display: "block", marginBottom: 6 }}>
                                (661) 569-4244
                            </a>
                            <p style={{ color: "var(--er-muted)", fontSize: "0.9rem" }}>Jason picks up. No receptionist gatekeeping.</p>
                        </div>

                        <div style={{ marginBottom: 40 }}>
                            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--er-muted)", marginBottom: 10 }}>Email</p>
                            <a href="mailto:jasonm@coaibakersfield.com" style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", display: "block" }}>
                                jasonm@coaibakersfield.com
                            </a>
                        </div>

                        <div style={{ borderRadius: 20, padding: 24, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)" }}>
                            {[
                                "No high-pressure sales",
                                "Clear scope before any contract",
                                "Free diagnostic, always",
                            ].map((item) => (
                                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                                    <span style={{ color: "var(--er-green)", fontWeight: 900, fontSize: "1rem", flexShrink: 0 }}>✓</span>
                                    <span style={{ color: "var(--er-muted)", fontSize: "0.95rem" }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — form */}
                    <div style={{ borderRadius: 24, padding: 32, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)" }}>
                        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: 6 }}>Send a Message</h2>
                        <p style={{ color: "var(--er-muted)", fontSize: "0.9rem", marginBottom: 28 }}>
                            Submissions go to jasonm@coaibakersfield.com. Jason responds same business day.
                        </p>
                        <ContactForm />
                    </div>
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
