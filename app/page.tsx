import type { Metadata } from "next";
import dynamic from "next/dynamic";
const SplashIntro = dynamic(() => import("@/components/SplashIntro"), { ssr: false, loading: () => null });
const HeroUrlInput = dynamic(() => import("@/components/HeroUrlInput"), { ssr: false, loading: () => null });
const UrlScanForm = dynamic(() => import("@/components/UrlScanForm"), { ssr: false, loading: () => null });
const ExitIntentPopup = dynamic(() => import("@/components/ExitIntentPopup"), { ssr: false, loading: () => null });
const LiveChatButton = dynamic(() => import("@/components/LiveChatButton"), { ssr: false, loading: () => null });
const LiveScanCounter = dynamic(() => import("@/components/LiveScanCounter"), { ssr: false, loading: () => null });
import Image from "next/image";

const BASE_URL = "https://siteer.dev";

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
            geo: { "@type": "GeoCoordinates", latitude: 35.3733, longitude: -119.0187 },
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
            mainEntity: [
                { "@type": "Question", name: "Do I need a developer to use SiteER?", acceptedAnswer: { "@type": "Answer", text: "No. We scan your site, find every issue, and our team fixes everything for a flat $497. You don't touch a line of code." } },
                { "@type": "Question", name: "How long does the fix take?", acceptedAnswer: { "@type": "Answer", text: "Most sites are fully fixed within 3–5 business days. You receive a before/after re-scan when we're done." } },
                { "@type": "Question", name: "What platforms do you support?", acceptedAnswer: { "@type": "Answer", text: "WordPress, Wix, Squarespace, Webflow, Shopify, and custom HTML/CSS sites." } },
            ],
        },
    ],
};

export const metadata: Metadata = {
    title: "Is Your Website Costing You Customers? Free Scan — We Fix It For You",
    description:
        "Paste your URL and find out in 60 seconds what's broken and how much it's costing you. No developer needed — SiteER's team fixes everything for a flat $497.",
    alternates: { canonical: "/" },
};

export default function HomePage() {
    return (
        <>
            <SplashIntro />
            {/* Skip to main content — accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-bold focus:rounded-lg focus:shadow-lg"
            >
                Skip to main content
            </a>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* ── NAV ── */}
            <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(18px)", background: "rgba(7,16,24,.72)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                <div className="er-container">
                    <nav aria-label="Main navigation" style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
                        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12 }} aria-label="SiteER home">
                            <Image
                                src="/siteer-logo.png"
                                alt="SiteER logo"
                                width={280}
                                height={80}
                                priority
                                fetchPriority="high"
                                style={{ width: "auto", height: 42 }}
                            />
                        </a>
                        <div style={{ display: "flex", gap: 32, alignItems: "center", color: "var(--er-muted)", fontSize: "1.05rem" }}>
                            <a href="/reports" className="nav-link" style={{ fontWeight: 700 }}>Reports</a>
                            <a href="/pricing" className="nav-link" style={{ fontWeight: 700 }}>Pricing</a>
                            <a href="/faq" className="nav-link" style={{ fontWeight: 700 }}>FAQ</a>
                        </div>
                        <a href="#diagnosis" style={{ border: 0, borderRadius: 999, padding: "14px 22px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", boxShadow: "0 18px 42px rgba(255,77,94,.28)", fontSize: "0.95rem", minHeight: 48, display: "inline-flex", alignItems: "center" }}>
                            <span className="cta-word-dark">Scan My Site Free</span>
                        </a>
                    </nav>
                </div>
            </header>

            <main id="main-content" className="ambulance-flash">

                {/* ── HERO ── */}
                <section aria-labelledby="hero-heading" style={{ padding: "82px 0 58px" }}>
                    <div className="er-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
                        <div>
                            <LiveScanCounter />
                            <h1 id="hero-heading" style={{ fontSize: "clamp(3rem, 7vw, 6.45rem)", lineHeight: 0.92, letterSpacing: "-.075em", maxWidth: 850, marginTop: 22 }}>
                                Your website is{" "}
                                <span style={{ background: "linear-gradient(135deg, #ffffff 15%, #ffb6bf 48%, #ffb15c 78%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                                    losing you money.
                                </span>
                            </h1>
                            <div style={{ marginTop: 24, display: "grid", gap: 12, maxWidth: 650 }}>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.98rem", display: "flex", alignItems: "flex-start", gap: 12 }}>
                                    <span style={{ color: "var(--er-green)", fontWeight: 900, flexShrink: 0 }}>✓</span>
                                    <span>A–F grade in 60 seconds — 20+ checks across speed, mobile, SEO, and trust</span>
                                </p>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.98rem", display: "flex", alignItems: "flex-start", gap: 12 }}>
                                    <span style={{ color: "var(--er-green)", fontWeight: 900, flexShrink: 0 }}>✓</span>
                                    <span>Dollar estimate of what your broken site costs you each month</span>
                                </p>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.98rem", display: "flex", alignItems: "flex-start", gap: 12 }}>
                                    <span style={{ color: "#ffb15c", fontWeight: 900, flexShrink: 0 }}>★</span>
                                    <span><strong style={{ color: "white" }}>No developer? We fix everything</strong> — flat $497, 3–5 days, guaranteed.</span>
                                </p>
                            </div>
                            <HeroUrlInput />
                            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 14, color: "var(--er-muted-2)", fontSize: "0.92rem" }}>
                                {["Free — no card needed", "Works on any website", "WordPress · Wix · Webflow · Shopify"].map((item) => (
                                    <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ color: "var(--er-green)", fontWeight: 900 }}>✓</span> {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Report preview mockup */}
                        <div style={{ position: "relative", minHeight: 520, maxWidth: 620, width: "100%", justifySelf: "end" }}>
                            <div style={{ borderRadius: 34, padding: 18, background: "linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.055))", border: "1px solid rgba(255,255,255,.18)", boxShadow: "0 34px 100px rgba(0,0,0,.42)", overflow: "hidden" }}>
                                <div style={{ borderRadius: 24, overflow: "hidden", background: "#08111a", border: "1px solid rgba(255,255,255,.12)" }}>
                                    <div style={{ height: 48, background: "rgba(255,255,255,.055)", display: "flex", alignItems: "center", gap: 9, padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                                        {["#ff6171", "#ffc05f", "#4ee997"].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: 99, background: c }} />)}
                                        <span style={{ marginLeft: 10, color: "var(--er-muted-2)", fontSize: "0.84rem", background: "rgba(0,0,0,.2)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 999, padding: "7px 12px" }}>siteer.dev/report/abc123</span>
                                    </div>
                                    <div style={{ padding: 22 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                                            <div>
                                                <h3 style={{ fontSize: "1.1rem" }}>Website ER Chart</h3>
                                                <p style={{ color: "var(--er-muted)", fontSize: "0.88rem", marginTop: 4 }}>Scan completed 38s ago · 21 checks · 7 critical issues</p>
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
                                        {/* Issue list preview */}
                                        <div style={{ marginTop: 14, padding: "12px 0 0", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                                            {[
                                                { sev: "HIGH", text: "Page loads in 8.4s — visitors leave after 3s" },
                                                { sev: "HIGH", text: "No mobile viewport set — broken on phones" },
                                                { sev: "MED", text: "Missing meta description — hurts click-through" },
                                            ].map((issue) => (
                                                <div key={issue.text} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                                                    <span style={{ fontSize: "0.65rem", fontWeight: 800, background: issue.sev === "HIGH" ? "rgba(255,77,94,.2)" : "rgba(255,177,92,.2)", color: issue.sev === "HIGH" ? "#ff8792" : "#ffb15c", borderRadius: 4, padding: "2px 6px", flexShrink: 0, marginTop: 1 }}>{issue.sev}</span>
                                                    <span style={{ color: "var(--er-muted)", fontSize: "0.8rem", lineHeight: 1.4 }}>{issue.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ position: "absolute", bottom: 46, left: -32, width: 228, borderRadius: 22, padding: 16, background: "rgba(9,20,31,.86)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 24px 70px rgba(0,0,0,.36)" }}>
                                <span style={{ display: "block", color: "var(--er-muted)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: ".09em", fontWeight: 850, marginBottom: 7 }}>Estimated monthly loss</span>
                                <strong style={{ color: "#ffcad0", fontSize: "2.15rem", letterSpacing: "-.06em" }}>$4,820/mo</strong>
                                <span style={{ display: "block", color: "var(--er-muted)", fontSize: "0.72rem", marginTop: 4 }}>Based on your traffic &amp; conversion rate</span>
                            </div>
                            <div style={{ position: "absolute", top: 86, right: -22, width: 210, borderRadius: 22, padding: 16, background: "rgba(9,20,31,.86)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 24px 70px rgba(0,0,0,.36)" }}>
                                <span style={{ display: "block", color: "var(--er-muted)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: ".09em", fontWeight: 850, marginBottom: 7 }}>Critical symptoms</span>
                                <strong>7 issues found</strong>
                                <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden", marginTop: 12 }}>
                                    <div style={{ width: "74%", height: "100%", background: "linear-gradient(90deg, var(--er-red), var(--er-orange))", borderRadius: 999 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── DIAGNOSTIC CHECKS ── */}
                <section id="diagnose" aria-labelledby="diagnose-heading" style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginBottom: 34, flexWrap: "wrap" }}>
                            <div>
                                <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>20 checks in 60 seconds</div>
                                <h2 id="diagnose-heading" style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em", maxWidth: 780 }}>
                                    We find the revenue leaks. Then we fix them.
                                </h2>
                            </div>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 455, fontSize: "1.04rem" }}>
                                Every issue is translated into plain English and ranked by how much money it's costing you — not by how hard it is to understand.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
                            {[
                                { icon: "⚡", color: "rgba(255,77,94,.13)", textColor: "#ff8792", title: "Slow site killing leads?", desc: "We pinpoint every speed issue dragging you down — oversized images, missing compression, render-blocking scripts — then fix them all.", checks: "8 checks" },
                                { icon: "📱", color: "rgba(110,231,255,.12)", textColor: "var(--er-cyan)", title: "Mobile broken?", desc: "Over 60% of local searches happen on phones. One broken viewport or unreadable font and you're invisible. We find it and fix it.", checks: "5 checks" },
                                { icon: "🔎", color: "rgba(183,140,255,.13)", textColor: "var(--er-purple)", title: "Not showing on Google?", desc: "Missing title tags, no meta descriptions, no schema markup — every signal Google uses to rank your business, we check and repair.", checks: "5 checks" },
                                { icon: "🛡", color: "rgba(62,226,143,.12)", textColor: "var(--er-green)", title: "Customers don't trust it?", desc: "No HTTPS, missing contact info, no visible reviews — we surface every trust gap that makes visitors leave without calling.", checks: "4 checks" },
                            ].map((card) => (
                                <article key={card.title} style={{ borderRadius: 24, padding: 24, background: "var(--er-card)", border: "1px solid var(--er-stroke)", boxShadow: "0 20px 60px rgba(0,0,0,.16)", minHeight: 250, transition: "transform .2s ease, background .2s ease" }}
                                    className="hover:-translate-y-1">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                                        <div style={{ width: 48, height: 48, display: "grid", placeItems: "center", borderRadius: 17, background: card.color, color: card.textColor, fontSize: "1.35rem" }}>{card.icon}</div>
                                        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: card.textColor, background: card.color, borderRadius: 999, padding: "4px 10px" }}>{card.checks}</span>
                                    </div>
                                    <h3 style={{ fontSize: "1.22rem", letterSpacing: "-.03em", marginBottom: 10 }}>{card.title}</h3>
                                    <p style={{ color: "var(--er-muted)", lineHeight: 1.65, fontSize: "0.96rem" }}>{card.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SCAN FORM ── */}
                <section id="diagnosis" aria-labelledby="scan-heading" style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginBottom: 34, flexWrap: "wrap" }}>
                            <div>
                                <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Free — no card, no signup</div>
                                <h2 id="scan-heading" style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Scan your site <span className="cta-word">right now</span>.</h2>
                            </div>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 455, fontSize: "1.04rem" }}>
                                Paste your URL and see your grade in 60 seconds. Enter your email to unlock the full report — every issue ranked by revenue impact.
                            </p>
                        </div>
                        <UrlScanForm />
                        <p style={{ marginTop: 18, color: "var(--er-muted-2)", fontSize: "0.85rem", maxWidth: 560 }}>
                            <strong style={{ color: "var(--er-muted)" }}>How is the money leak calculated?</strong> We combine your grade with estimated traffic, industry conversion benchmarks, and average order value to project monthly revenue impact. It&apos;s directional — not a guarantee — but it&apos;s grounded in real performance data from thousands of local service sites.
                        </p>
                    </div>
                </section>

                {/* ── TESTIMONIALS ── */}
                <section aria-labelledby="proof-heading" style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ marginBottom: 48 }}>
                            <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Real results · Bakersfield &amp; surrounding areas</div>
                            <h2 id="proof-heading" style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Business owners who stopped bleeding leads.</h2>
                        </div>

                        {/* Testimonials grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, marginBottom: 48 }}>
                            {[
                                { quote: "I had no idea my website was this broken. SiteER found 9 issues in under a minute — then their team fixed all of them for $497. I'm getting more calls already.", name: "Marcus T.", biz: "Bakersfield HVAC & Air", before: "F", after: "B+" },
                                { quote: "The money leak estimate said $2,400/mo. I was skeptical, but after the fix our contact form went from 2 leads a week to 9. These guys know what they're doing.", name: "Maria L.", biz: "Bakersfield Family Dentistry", before: "C", after: "A" },
                                { quote: "I didn't have a developer and didn't know where to start. SiteER diagnosed the problems AND fixed them. The whole thing took less than a week.", name: "James R.", biz: "Kern County Roofing", before: "F", after: "B" },
                                { quote: "Sent the report to my landlord — he had our site fixed that week. We're ranking on Google Maps now for the first time in three years.", name: "Priya N.", biz: "Downtown Bakersfield Café", before: "D", after: "A" },
                            ].map((t) => (
                                <article key={t.name} style={{ borderRadius: 24, padding: 24, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)" }}>
                                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                                        {[1,2,3,4,5].map((s) => <span key={s} style={{ color: "#ffb15c", fontSize: "1rem" }}>★</span>)}
                                    </div>
                                    <blockquote style={{ color: "rgba(255,255,255,.85)", lineHeight: 1.65, fontSize: "0.95rem", fontStyle: "italic", marginBottom: 18 }}>
                                        &ldquo;{t.quote}&rdquo;
                                    </blockquote>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <strong style={{ display: "block", fontSize: "0.9rem" }}>— {t.name}</strong>
                                            <span style={{ color: "var(--er-muted)", fontSize: "0.82rem" }}>{t.biz}</span>
                                        </div>
                                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                                            <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--er-red)" }}>{t.before}</span>
                                            <span style={{ color: "var(--er-muted)", fontSize: "0.75rem" }}>→</span>
                                            <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--er-green)" }}>{t.after}</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Before/after metric bar */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
                            {[
                                { biz: "Joe's Plumbing", type: "Local plumbing — Bakersfield", before: 38, after: 82, result: "+40% qualified calls · leads booked 2–3 days faster" },
                                { biz: "Williams & Co. Law", type: "Local law firm — Kern County", before: 45, after: 79, result: "Mobile restored · estimated $1,200/mo revenue recovered" },
                            ].map((cs) => (
                                <div key={cs.biz} style={{ borderRadius: 24, padding: 24, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)" }}>
                                    <div style={{ marginBottom: 14 }}>
                                        <strong style={{ fontSize: "1rem" }}>{cs.biz}</strong>
                                        <span style={{ display: "block", color: "var(--er-muted)", fontSize: "0.82rem", marginTop: 2 }}>{cs.type}</span>
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center", marginBottom: 14 }}>
                                        <div style={{ background: "rgba(255,77,94,.12)", borderRadius: 14, padding: "12px", textAlign: "center" }}>
                                            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--er-red)", marginBottom: 4 }}>BEFORE</div>
                                            <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--er-red)" }}>{cs.before}</div>
                                        </div>
                                        <span style={{ color: "var(--er-muted)", fontSize: "1.2rem" }}>→</span>
                                        <div style={{ background: "rgba(62,226,143,.1)", borderRadius: 14, padding: "12px", textAlign: "center" }}>
                                            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--er-green)", marginBottom: 4 }}>AFTER</div>
                                            <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--er-green)" }}>{cs.after}</div>
                                        </div>
                                    </div>
                                    <p style={{ color: "var(--er-muted)", fontSize: "0.85rem", lineHeight: 1.5 }}><strong style={{ color: "white" }}>Impact:</strong> {cs.result}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── WHAT $497 INCLUDES ── */}
                <section aria-labelledby="fixpack-heading" style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginBottom: 34, flexWrap: "wrap" }}>
                            <div>
                                <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>ER Fix Pack · $497 flat</div>
                                <h2 id="fixpack-heading" style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Exactly what we fix.<br />Exactly what it costs.</h2>
                            </div>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 455, fontSize: "1.04rem" }}>
                                No hourly billing. No scope creep. One flat fee, one clear deliverable, one before/after re-scan to prove it worked.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
                            {/* Included */}
                            <div style={{ borderRadius: 24, padding: 28, background: "rgba(62,226,143,.07)", border: "1px solid rgba(62,226,143,.18)" }}>
                                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--er-green)", marginBottom: 20, textTransform: "uppercase", letterSpacing: ".08em" }}>✓ What's included</h3>
                                {[
                                    ["Speed optimization", "Image compression, caching, render-blocking removal"],
                                    ["Mobile usability fixes", "Viewport, font sizes, touch targets, overflow"],
                                    ["SEO fundamentals", "Titles, meta descriptions, H1 structure, schema markup"],
                                    ["Trust signal improvements", "HTTPS headers, contact info, review visibility"],
                                    ["CTA & conversion review", "Button placement, clarity, call-to-action copy"],
                                    ["Before/after re-scan", "Side-by-side score comparison report delivered to you"],
                                ].map(([item, detail]) => (
                                    <div key={item} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                                        <strong style={{ display: "block", fontSize: "0.9rem" }}>{item}</strong>
                                        <span style={{ color: "var(--er-muted)", fontSize: "0.82rem" }}>{detail}</span>
                                    </div>
                                ))}
                                <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
                                    <span style={{ background: "rgba(62,226,143,.15)", color: "var(--er-green)", fontSize: "0.78rem", fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>⏱ 3–5 business days</span>
                                    <span style={{ background: "rgba(62,226,143,.15)", color: "var(--er-green)", fontSize: "0.78rem", fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>+20 pts guaranteed</span>
                                </div>
                            </div>
                            {/* Not included + platforms */}
                            <div style={{ display: "grid", gap: 18 }}>
                                <div style={{ borderRadius: 24, padding: 24, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)" }}>
                                    <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--er-muted)", marginBottom: 14, textTransform: "uppercase", letterSpacing: ".08em" }}>✗ Not included (so you're not surprised)</h3>
                                    {["Full site redesigns", "New content creation or copywriting", "Paid advertising management", "Platform migrations"].map((item) => (
                                        <p key={item} style={{ color: "var(--er-muted)", fontSize: "0.88rem", marginBottom: 6, display: "flex", gap: 10 }}>
                                            <span style={{ color: "rgba(255,255,255,.3)" }}>—</span> {item}
                                        </p>
                                    ))}
                                    <p style={{ color: "var(--er-muted)", fontSize: "0.82rem", marginTop: 12 }}>If your site needs something outside this scope, we&apos;ll tell you upfront — before charging anything.</p>
                                </div>
                                <div style={{ borderRadius: 24, padding: 24, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)" }}>
                                    <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--er-muted)", marginBottom: 14, textTransform: "uppercase", letterSpacing: ".08em" }}>Works with every major platform</h3>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                        {["WordPress", "Wix", "Squarespace", "Webflow", "Shopify", "Custom HTML"].map((p) => (
                                            <span key={p} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 999, padding: "5px 14px", fontSize: "0.83rem", fontWeight: 600 }}>{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <a href="/get-quote" style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 18, padding: "18px 24px", fontWeight: 800, fontSize: "1rem", color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", boxShadow: "0 18px 42px rgba(255,77,94,.28)", textDecoration: "none", minHeight: 60 }}>
                                    Let us fix it — $497 flat →
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── HOW IT WORKS ── */}
                <section aria-labelledby="how-heading" style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ marginBottom: 34 }}>
                            <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>The treatment protocol</div>
                            <h2 id="how-heading" style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Triage in 60 seconds. Stabilized in days.</h2>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
                            {[
                                { title: "Admit your site", desc: "Paste your URL. No account, no credit card, no waiting room. Triage starts immediately.", tag: "Instant" },
                                { title: "Run diagnostics", desc: "20+ automated checks across speed, mobile, SEO, and trust. Your A–F grade in under 60 seconds.", tag: "60 seconds" },
                                { title: "Read the chart", desc: "Every issue in plain English, ranked by how much revenue it's costing you monthly.", tag: "Free report" },
                                { title: "Discharge — fixed", desc: "Our team implements every fix, then re-scans to prove your grade improved by 20+ points or you pay nothing.", tag: "3–5 days" },
                            ].map((card, i) => (
                                <article key={card.title} style={{ position: "relative", borderRadius: 24, padding: 24, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)", minHeight: 210 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                                        <div style={{ display: "inline-flex", color: "#071018", background: "linear-gradient(135deg, var(--er-cyan), var(--er-green))", borderRadius: 999, padding: "6px 10px", fontSize: "0.78rem", fontWeight: 950 }}>
                                            0{i + 1}
                                        </div>
                                        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--er-muted)", background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "4px 10px" }}>{card.tag}</span>
                                    </div>
                                    <h3 style={{ fontSize: "1.14rem", marginBottom: 9 }}>{card.title}</h3>
                                    <p style={{ color: "var(--er-muted)", lineHeight: 1.6, fontSize: "0.94rem" }}>{card.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── OBJECTION CRUSHER + FINAL CTA ── */}
                <section aria-labelledby="cta-heading" style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ marginBottom: 34 }}>
                            <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Still on the fence?</div>
                            <h2 id="cta-heading" style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Your questions — answered.</h2>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, marginBottom: 48 }}>
                            {[
                                { q: "What if my site has bigger problems than the scan finds?", a: "We scope before we charge. If your site needs work outside the Fix Pack, we tell you upfront with a custom quote — no surprise bills." },
                                { q: "How do I know the fixes actually worked?", a: "Every Fix Pack includes a before/after re-scan. You see your old grade and your new grade side-by-side. If we don't hit +20 points, you get a full refund." },
                                { q: "I already have a developer — is this still useful?", a: "Absolutely. The free report is the fastest diagnostic brief your developer will ever receive. Send it to them and skip the back-and-forth." },
                            ].map((item) => (
                                <article key={item.q} style={{ borderRadius: 24, padding: 24, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)" }}>
                                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: 12, lineHeight: 1.4 }}>{item.q}</h3>
                                    <p style={{ color: "var(--er-muted)", lineHeight: 1.65, fontSize: "0.92rem" }}>{item.a}</p>
                                </article>
                            ))}
                        </div>

                        {/* Final CTA block */}
                        <div style={{ borderRadius: 28, padding: "52px 40px", background: "linear-gradient(135deg, rgba(255,77,94,.12), rgba(255,177,92,.08))", border: "1px solid rgba(255,77,94,.22)", textAlign: "center" }}>
                            <p style={{ color: "var(--er-muted)", fontSize: "0.9rem", marginBottom: 10 }}>Built by COAIBAKERSFIELD.COM · Bakersfield, CA · serving local businesses nationwide</p>
                            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.0, letterSpacing: "-.055em", marginBottom: 18 }}>
                                Stop guessing. Start with a free scan.
                            </h2>
                            <p style={{ color: "var(--er-muted)", fontSize: "1rem", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>
                                60 seconds. No credit card. You'll know exactly what's broken, how much it's costing you, and what it would take to fix it — before spending a dollar.
                            </p>
                            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                                <a href="#diagnosis" style={{ border: 0, borderRadius: 999, padding: "16px 36px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", boxShadow: "0 18px 42px rgba(255,77,94,.28)", fontSize: "1.05rem", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                                    Run my free scan →
                                </a>
                                <a href="/pricing" style={{ border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, padding: "16px 36px", fontWeight: 700, color: "white", fontSize: "1.05rem", textDecoration: "none", display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,.06)" }}>
                                    See Fix Pack details
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ── FOOTER ── */}
            <footer style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "28px 0", color: "var(--er-muted-2)" }}>
                <div className="er-container" style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
                    <a href="/" aria-label="SiteER home" style={{ display: "flex", alignItems: "center" }}>
                        <Image src="/siteer-logo.png" alt="SiteER logo" width={180} height={50} style={{ width: "auto", height: 30 }} />
                    </a>
                    <nav aria-label="Footer navigation" style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
                        <a href="#diagnosis" className="hover:text-white transition-colors">Free scan</a>
                        <a href="/pricing" className="hover:text-white transition-colors">Pricing</a>
                        <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
                        <a href="/blog" className="hover:text-white transition-colors">Blog</a>
                        <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                        <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
                        <a href="mailto:hello@siteer.dev" className="hover:text-white transition-colors">Contact</a>
                    </nav>
                    <div style={{ fontSize: "0.85rem", textAlign: "right" }}>
                        © {new Date().getFullYear()} SiteER · Built by{" "}
                        <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">coaibakersfield.com</a>
                    </div>
                </div>
            </footer>

            <ExitIntentPopup />
            <LiveChatButton />
        </>
    );
}
