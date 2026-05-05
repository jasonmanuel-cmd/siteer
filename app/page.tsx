import type { Metadata } from "next";
import dynamic from "next/dynamic";
const SplashIntro = dynamic(() => import("@/components/SplashIntro"), { ssr: false, loading: () => null });
const HeroUrlInput = dynamic(() => import("@/components/HeroUrlInput"), { ssr: false, loading: () => null });
const UrlScanForm = dynamic(() => import("@/components/UrlScanForm"), { ssr: false, loading: () => null });
const ExitIntentPopup = dynamic(() => import("@/components/ExitIntentPopup"), { ssr: false, loading: () => null });
const LiveChatButton = dynamic(() => import("@/components/LiveChatButton"), { ssr: false, loading: () => null });
const LiveScanCounter = dynamic(() => import("@/components/LiveScanCounter"), { ssr: false, loading: () => null });
// Video demo intentionally removed from homepage per design request
import Image from "next/image";

const BASE_URL = "https://siteer.dev";

const faqEntities = [
    {
        question: "Who is SiteER for?",
        answer: "SiteER is for small business owners, agencies, consultants, and operators who want fast website diagnostics without a long technical audit.",
    },
    {
        question: "What does the email gate do?",
        answer: "The email gate turns an anonymous scan into a lead, generates a unique report link, stores the record, and sends the shareable report URL.",
    },
    {
        question: "How is money leak calculated?",
        answer: "The estimate combines scan score with optional business inputs like monthly visitors, conversion rate, and average order value.",
    },
    {
        question: "What should the brand feel like?",
        answer: "Urgent but trustworthy: medical triage language, red/orange accents, clear scores, and business-impact messaging.",
    },
];

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": `${BASE_URL}/#org`,
            name: "SiteER",
            url: BASE_URL,
            logo: `${BASE_URL}/siteer-logo.png`,
            sameAs: ["https://coaibakersfield.com"],
        },
        {
            "@type": "ProfessionalService",
            "@id": `${BASE_URL}/#service`,
            name: "SiteER",
            url: BASE_URL,
            areaServed: [
                { "@type": "City", name: "Bakersfield" },
                { "@type": "AdministrativeArea", name: "California" },
                { "@type": "Country", name: "United States" },
            ],
            geo: {
                "@type": "GeoCoordinates",
                latitude: 35.3733,
                longitude: -119.0187,
            },
            serviceType: ["Website Audit", "SEO Audit", "Performance Optimization"],
            provider: { "@id": `${BASE_URL}/#org` },
        },
        {
            "@type": "WebSite",
            "@id": `${BASE_URL}/#website`,
            name: "SiteER",
            url: BASE_URL,
            inLanguage: "en-US",
        },
        {
            "@type": "FAQPage",
            "@id": `${BASE_URL}/#faq`,
            mainEntity: faqEntities.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                },
            })),
        },
    ],
};

export const metadata: Metadata = {
    title: "Is Your Website Costing You Customers? Free Scan — We Fix It For You",
    description:
        "Paste your URL and find out in 60 seconds what's broken and how much it's costing you. No developer needed — SiteER's team fixes everything for a flat $497.",
    alternates: {
        canonical: "/",
    },
};

export default function HomePage() {
    return (
        <>
            <SplashIntro />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            {/* ── NAV ── */}
            <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(18px)", background: "rgba(7,16,24,.72)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                <div className="er-container">
                    <nav style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
                        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12 }} aria-label="SiteER home">
                            <Image
                                src="/siteer-logo.png"
                                alt="SiteER logo"
                                width={280}
                                height={80}
                                priority
                                style={{ width: "auto", height: 42 }}
                            />
                        </a>
                        <div style={{ display: "flex", gap: 32, alignItems: "center", color: "var(--er-muted)", fontSize: "1.05rem" }}>
                            <a href="/reports" className="nav-link" style={{ fontWeight: 700 }}>Reports</a>
                            <a href="/pricing" className="nav-link" style={{ fontWeight: 700 }}>Pricing</a>
                            <a href="/faq" className="nav-link" style={{ fontWeight: 700 }}>FAQ</a>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <a href="#diagnosis" style={{ border: 0, borderRadius: 999, padding: "14px 22px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", boxShadow: "0 18px 42px rgba(255,77,94,.28)", fontSize: "0.95rem", minHeight: 48 }}>
                                <span className="cta-word-dark">Scan a Site</span>
                            </a>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="ambulance-flash">
                {/* ── HERO ── */}
                <section style={{ padding: "82px 0 58px" }}>
                    <div className="er-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
                        <div>
                            <LiveScanCounter />
                            <h1 style={{ fontSize: "clamp(3rem, 7vw, 6.45rem)", lineHeight: 0.92, letterSpacing: "-.075em", maxWidth: 850, marginTop: 22 }}>
                                Your website is{" "}
                                <span style={{ background: "linear-gradient(135deg, #ffffff 15%, #ffb6bf 48%, #ffb15c 78%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                                    costing you customers.
                                </span>
                            </h1>
                            <div style={{ marginTop: 24, display: "grid", gap: 12, maxWidth: 650 }}>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.98rem", display: "flex", alignItems: "flex-start", gap: 12 }}>
                                    <span style={{ color: "var(--er-green)", fontWeight: 900, flexShrink: 0 }}>✓</span>
                                    <span>See exactly what's broken — A–F grade in 60 seconds, free</span>
                                </p>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.98rem", display: "flex", alignItems: "flex-start", gap: 12 }}>
                                    <span style={{ color: "var(--er-green)", fontWeight: 900, flexShrink: 0 }}>✓</span>
                                    <span>Find the dollar amount you're leaking every single month</span>
                                </p>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.98rem", display: "flex", alignItems: "flex-start", gap: 12 }}>
                                    <span style={{ color: "#ffb15c", fontWeight: 900, flexShrink: 0 }}>★</span>
                                    <span><strong style={{ color: "white" }}>No developer? No problem.</strong> We fix everything we find.</span>
                                </p>
                            </div>
                            <HeroUrlInput />
                            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 14, color: "var(--er-muted-2)", fontSize: "0.92rem" }}>
                                {["Free scan — no card needed", "No tech skills required", "We handle fixes for you"].map((item) => (
                                    <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ color: "var(--er-green)", fontWeight: 900 }}>✓</span> {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Browser mockup */}
                        <div style={{ position: "relative", minHeight: 520, maxWidth: 620, width: "100%", justifySelf: "end" }}>
                            <div style={{ borderRadius: 34, padding: 18, background: "linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.055))", border: "1px solid rgba(255,255,255,.18)", boxShadow: "0 34px 100px rgba(0,0,0,.42)", overflow: "hidden" }}>
                                <div style={{ borderRadius: 24, overflow: "hidden", background: "#08111a", border: "1px solid rgba(255,255,255,.12)" }}>
                                    <div style={{ height: 48, background: "rgba(255,255,255,.055)", display: "flex", alignItems: "center", gap: 9, padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                                        {["#ff6171", "#ffc05f", "#4ee997"].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: 99, background: c }} />)}
                                        <span style={{ marginLeft: 10, color: "var(--er-muted-2)", fontSize: "0.84rem", background: "rgba(0,0,0,.2)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 999, padding: "7px 12px" }}>siteer.dev/diagnosis/critical-care</span>
                                    </div>
                                    <div style={{ padding: 22 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                                            <div>
                                                <h3 style={{ fontSize: "1.1rem" }}>Website ER Chart</h3>
                                                <p style={{ color: "var(--er-muted)", fontSize: "0.88rem", marginTop: 4 }}>Scan completed 38s ago · 21 checks</p>
                                            </div>
                                            <div style={{ minWidth: 80, height: 80, borderRadius: 22, display: "grid", placeItems: "center", background: "linear-gradient(135deg, rgba(255,77,94,.95), rgba(255,177,92,.95))", color: "#1b080a", fontSize: "3rem", fontWeight: 950, letterSpacing: "-.08em" }}>D</div>
                                        </div>
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
                                            {[["Speed","42"],["Mobile","58"],["SEO","63"],["Trust","71"]].map(([label, val]) => (
                                                <div key={label} style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 14, padding: 10 }}>
                                                    <span style={{ color: "var(--er-muted)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 800 }}>{label}</span>
                                                    <strong style={{ display: "block", marginTop: 5, fontSize: "1.2rem" }}>{val}</strong>
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ display: "grid", gap: 9 }}>
                                            {[["Speed",42],["Mobile",58],["SEO",63],["Trust",71]].map(([label, val]) => (
                                                <div key={label as string} style={{ display: "grid", gridTemplateColumns: "60px 1fr 36px", alignItems: "center", gap: 10, color: "var(--er-muted)", fontSize: "0.85rem" }}>
                                                    <span>{label}</span>
                                                    <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
                                                        <div style={{ height: "100%", borderRadius: 999, background: (val as number) >= 70 ? "linear-gradient(90deg, var(--er-green), var(--er-cyan))" : (val as number) >= 55 ? "linear-gradient(90deg, var(--er-orange), #ffe081)" : "linear-gradient(90deg, var(--er-red), var(--er-orange))", width: `${val}%` }} />
                                                    </div>
                                                    <span>{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ position: "absolute", bottom: 46, left: -32, width: 228, borderRadius: 22, padding: 16, background: "rgba(9,20,31,.86)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 24px 70px rgba(0,0,0,.36)" }}>
                                <span style={{ display: "block", color: "var(--er-muted)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: ".09em", fontWeight: 850, marginBottom: 7 }}>Estimated money leak</span>
                                <strong style={{ color: "#ffcad0", fontSize: "2.15rem", letterSpacing: "-.06em" }}>$4,820/mo</strong>
                            </div>
                            <div style={{ position: "absolute", top: 86, right: -22, width: 210, borderRadius: 22, padding: 16, background: "rgba(9,20,31,.86)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 24px 70px rgba(0,0,0,.36)" }}>
                                <span style={{ display: "block", color: "var(--er-muted)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: ".09em", fontWeight: 850, marginBottom: 7 }}>Critical symptoms</span>
                                <strong>7 issues need attention</strong>
                                <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden", marginTop: 12 }}>
                                    <div style={{ width: "74%", height: "100%", background: "linear-gradient(90deg, var(--er-red), var(--er-orange))", borderRadius: 999 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FEATURES ── */}
                <section id="diagnose" style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginBottom: 34, flexWrap: "wrap" }}>
                            <div>
                                <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>20+ checks • plain-English results • we fix it for you</div>
                                <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em", maxWidth: 780 }}>
                                    Find the leaks. We'll patch them.
                                </h2>
                            </div>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 455, fontSize: "1.04rem" }}>
                                No developer on your team? That's fine — we scan your site, show you every problem in plain English, then our team fixes everything for a flat fee.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
                            {[
                                { icon: "⚡", color: "rgba(255,77,94,.13)", textColor: "#ff8792", title: "Slow site killing leads?", desc: "We find every speed issue killing your rankings and conversions — then fix them. Images, compression, caching, the works." },
                                { icon: "📱", color: "rgba(110,231,255,.12)", textColor: "var(--er-cyan)", title: "Mobile broken?", desc: "Over 60% of local searches are on phones. If your site isn't mobile-friendly, you're invisible. We find it and fix it." },
                                { icon: "🔎", color: "rgba(183,140,255,.13)", textColor: "var(--er-purple)", title: "Not showing on Google?", desc: "Missing titles, no meta descriptions, broken SEO basics — we catch every signal Google uses to rank your business." },
                                { icon: "🛡", color: "rgba(62,226,143,.12)", textColor: "var(--er-green)", title: "Customers don't trust it?", desc: "No HTTPS, missing contact info, no reviews showing — we surface every trust gap that's making visitors leave without calling." },
                            ].map((card) => (
                                <article key={card.title} style={{ borderRadius: 24, padding: 24, background: "var(--er-card)", border: "1px solid var(--er-stroke)", boxShadow: "0 20px 60px rgba(0,0,0,.16)", minHeight: 250, transition: "transform .2s ease, background .2s ease" }}
                                    className="hover:-translate-y-1">
                                    <div style={{ width: 48, height: 48, display: "grid", placeItems: "center", borderRadius: 17, marginBottom: 18, background: card.color, color: card.textColor, fontSize: "1.35rem" }}>{card.icon}</div>
                                    <h3 style={{ fontSize: "1.22rem", letterSpacing: "-.03em", marginBottom: 10 }}>{card.title}</h3>
                                    <p style={{ color: "var(--er-muted)", lineHeight: 1.65, fontSize: "0.96rem" }}>{card.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SCAN DEMO ── */}
                <section id="diagnosis" style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginBottom: 34, flexWrap: "wrap" }}>
                            <div>
                                <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Free — no card, no signup</div>
                                <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Scan your site <span className="cta-word">right now</span>.</h2>
                            </div>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 455, fontSize: "1.04rem" }}>
                                Paste your URL, get your grade in 60 seconds. Enter your email to unlock the full report — then decide if you want us to fix it.
                            </p>
                        </div>
                        <UrlScanForm />
                    </div>
                </section>

                {/* ── TRUST & SOCIAL PROOF ── */}
                <section style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ marginBottom: 34 }}>
                            <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>No developer needed</div>
                            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Scan it yourself. We'll fix it for you.</h2>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18, marginBottom: 48 }}>
                            {[
                                { icon: "💳", label: "Free scan", detail: "No card, no signup" },
                                { icon: "⏱", label: "60 seconds", detail: "Results while you wait" },
                                { icon: "🔧", label: "We fix it", detail: "Flat $497 — we handle it all" },
                                { icon: "📋", label: "Plain English", detail: "No tech jargon" },
                                { icon: "📊", label: "Before & after", detail: "Re-scan proves results" },
                                { icon: "🛡️", label: "Guaranteed", detail: "+20 pts or money back" },
                            ].map((badge) => (
                                <article key={badge.label} style={{ borderRadius: 18, padding: 20, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)", textAlign: "center" }}>
                                    <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{badge.icon}</div>
                                    <h3 style={{ fontWeight: 700, marginBottom: 4 }}>{badge.label}</h3>
                                    <p style={{ color: "var(--er-muted)", fontSize: "0.9rem" }}>{badge.detail}</p>
                                </article>
                            ))}
                        </div>
                        <div style={{ background: "rgba(255,77,94,.08)", border: "1px solid rgba(255,77,94,.18)", borderRadius: 24, padding: 32, textAlign: "center" }}>
                            <p style={{ color: "var(--er-muted)", fontSize: "0.95rem", marginBottom: 16 }}>Trusted by local business owners, contractors, and service companies across Bakersfield</p>
                            <blockquote style={{ fontSize: "1.15rem", fontStyle: "italic", color: "white", lineHeight: 1.7, marginBottom: 18 }}>
                                "I had no idea my website was this broken. SiteER found 9 issues in under a minute — then their team fixed all of them for $497. I'm getting more calls already."
                            </blockquote>
                            <div style={{ color: "var(--er-muted)", fontSize: "0.9rem" }}>
                                <strong>— Marcus T.</strong>, Bakersfield HVAC &amp; Air
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── WORKFLOW ── */}
                <section style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ marginBottom: 34 }}>
                            <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>How it works</div>
                            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Diagnosis in 60 seconds. Fixed in days — not months.</h2>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, counterReset: "workflow" }}>
                            {[
                                { title: "Paste your URL", desc: "Type or paste your website address. No account, no credit card. Takes 5 seconds." },
                                { title: "Get your grade", desc: "We scan 20+ signals across speed, mobile, SEO, and trust. Your A–F grade is ready in under 60 seconds." },
                                { title: "See your money leak", desc: "Your free report shows exactly what's broken and estimates how much it's costing you every month." },
                                { title: "We fix it for you", desc: "No developer? No problem. Our team implements every fix for a flat fee, then re-scans to prove results." },
                            ].map((card, i) => (
                                <article key={card.title} style={{ position: "relative", borderRadius: 24, padding: 24, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)", minHeight: 210 }}>
                                    <div style={{ display: "inline-flex", marginBottom: 28, color: "#071018", background: "linear-gradient(135deg, var(--er-cyan), var(--er-green))", borderRadius: 999, padding: "6px 10px", fontSize: "0.78rem", fontWeight: 950 }}>
                                        0{i + 1}
                                    </div>
                                    <h3 style={{ fontSize: "1.14rem", marginBottom: 9 }}>{card.title}</h3>
                                    <p style={{ color: "var(--er-muted)", lineHeight: 1.6, fontSize: "0.94rem" }}>{card.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── NEXT STEPS ── */}
                <section style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginBottom: 34, flexWrap: "wrap" }}>
                            <div>
                                <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>What happens next</div>
                                <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Ready to stop losing money?</h2>
                            </div>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 455, fontSize: "1.04rem" }}>
                                After your scan, you decide what happens next. Keep the report and hand it to your team — or let us handle everything for a flat fee.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
                            {[
                                { title: "See your report", desc: "Every scan creates a permanent, shareable report link. See what's broken and what it's costing you.", href: "/reports" },
                                { title: "We fix it — $497 flat", desc: "No developer? We implement every fix, guaranteed. +20 point grade improvement or full refund.", href: "/pricing" },
                                { title: "Common questions", desc: "\"Do I need a developer?\" \"How long does it take?\" \"What exactly do you fix?\" Answered here.", href: "/faq" },
                                { title: "Website tips & guides", desc: "Free resources to understand why your site isn't bringing in customers — and what to do about it.", href: "/blog" },
                            ].map((item) => (
                                <article key={item.title} style={{ borderRadius: 24, padding: 22, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)" }}>
                                    <h3 style={{ fontSize: "1.1rem", letterSpacing: "-.03em", marginBottom: 10 }}>{item.title}</h3>
                                    <p style={{ color: "var(--er-muted)", lineHeight: 1.65, fontSize: "0.95rem" }}>{item.desc}</p>
                                    <a href={item.href} className="mt-4 inline-flex text-sm font-semibold text-white underline decoration-red-300 underline-offset-4">
                                        Learn more →
                                    </a>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* ── FOOTER ── */}
            <footer style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "28px 0", color: "var(--er-muted-2)" }}>
                <div className="er-container" style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
                    <a href="/" aria-label="SiteER home" style={{ display: "flex", alignItems: "center" }}>
                        <Image
                            src="/siteer-logo.png"
                            alt="SiteER logo"
                            width={180}
                            height={50}
                            style={{ width: "auto", height: 30 }}
                        />
                    </a>
                    <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
                        <a href="#diagnosis" className="hover:text-white transition-colors">Run a free scan</a>
                        <a href="/pricing" className="hover:text-white transition-colors">Pricing</a>
                        <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
                        <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                        <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
                        <a href="mailto:hello@siteer.dev" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <div style={{ fontSize: "0.85rem", textAlign: "right" }}>
                        © {new Date().getFullYear()} SiteER • Built by <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">coaibakersfield.com</a>
                    </div>
                </div>
            </footer>

            {/* Exit-intent popup */}
            <ExitIntentPopup />

            {/* Live chat button */}
            <LiveChatButton />
        </>
    );
}
