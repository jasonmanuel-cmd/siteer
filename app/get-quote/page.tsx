import type { Metadata } from "next";
import dynamic from "next/dynamic";
const QuoteForm = dynamic(() => import("@/components/QuoteForm"), { ssr: false, loading: () => null });

export const metadata: Metadata = {
    title: "Get a Fix Quote",
    description:
        "Request a custom SiteER fix quote and get implementation support for your highest-impact SEO, speed, and conversion issues.",
    alternates: {
        canonical: "/get-quote",
    },
    openGraph: {
        title: "Get a Fix Quote | SiteER",
        description:
            "Request a custom fix quote for your highest-impact website issues.",
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
            "Request a custom fix quote for your highest-impact website issues.",
        images: ["/og-image.png"],
    },
};

export default function GetQuotePage() {
    return (
        <>
            {/* Sticky nav — matches homepage */}
            <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(18px)", background: "rgba(7,16,24,.72)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                <div style={{ width: "min(1160px, calc(100% - 40px))", margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                        <div style={{ width: 32, height: 32, display: "grid", placeItems: "center", borderRadius: 9, background: "linear-gradient(135deg,#ff4d5e,#ffb15c)", color: "#1b080a", fontWeight: 900, fontSize: "1.1rem" }}>+</div>
                        <span style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.03em", color: "#eef7ff" }}>SiteER</span>
                    </a>
                    <a href="/pricing" style={{ fontSize: "0.9rem", color: "rgba(159,177,195,1)", fontWeight: 700, textDecoration: "none" }}>Pricing</a>
                </div>
            </header>

            <main style={{ minHeight: "100vh" }}>
                <div style={{ width: "min(680px, calc(100% - 40px))", margin: "0 auto", padding: "56px 0 80px" }}>

                    {/* Badge */}
                    <div style={{ display: "inline-flex", alignItems: "center", borderRadius: 999, border: "1px solid rgba(255,77,94,0.35)", background: "rgba(255,77,94,0.1)", padding: "6px 16px", fontFamily: "monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ff8792", marginBottom: 20 }}>
                        ER Fix Pack — Flat $497, We Handle Everything
                    </div>

                    <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.06em", fontWeight: 900, marginBottom: 20 }}>
                        No developer?{" "}
                        <span style={{ background: "linear-gradient(135deg,#ff4d5e,#ffb15c)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                            No problem.
                        </span>
                        <br />We fix it for you.
                    </h1>

                    <p style={{ fontSize: "1.05rem", color: "#9fb1c3", lineHeight: 1.7, marginBottom: 24 }}>
                        The team at{" "}
                        <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ff8792", fontWeight: 700, textDecoration: "none" }}>
                            COAIBAKERSFIELD.COM
                        </a>{" "}
                        handles every fix from your scan — speed, mobile, SEO, trust signals — then re-scans your site to prove the improvement in real numbers. Fill out the form below and we'll be in touch within 1 business day.
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 36, fontSize: "0.9rem", color: "#9fb1c3" }}>
                        {["We do all the work — no tech skills needed", "Flat $497 — no surprises", "+20 pts guaranteed or full refund"].map((item) => (
                            <span key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ color: "#ff4d5e", fontWeight: 900 }}>•</span> {item}
                            </span>
                        ))}
                    </div>

                    {/* Form card */}
                    <div style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", padding: "32px" }}>
                        <QuoteForm />
                    </div>

                    {/* Footer */}
                    <div style={{ marginTop: 36, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, fontSize: "0.8rem", color: "#71869a" }}>
                        SiteER diagnostics powered by{" "}
                        <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" style={{ color: "#9fb1c3", fontWeight: 600, textDecoration: "none" }}>
                            COAIBAKERSFIELD.COM
                        </a>
                        {" "}— AI-powered web solutions in Bakersfield, CA.
                    </div>

                </div>
            </main>
        </>
    );
}
