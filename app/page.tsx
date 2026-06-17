import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { quickAuditOffer } from "@/lib/offers";
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
        answer: "The email gate turns an anonymous scan into a lead, generates a unique summary report link, stores the record, and sends the shareable URL.",
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
    title: "Free Website ER Scan, A–F Grade, and Money Leak Estimate",
    description:
        `SiteER shows your website's A–F grade, estimated monthly money leak, and the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name} for human next steps.`,
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
                                <span className="cta-word-dark">Run Free Scan →</span>
                            </a>
                        </div>
                    </nav>
                </div>
            </header>

            <main>
                {/* ── HERO ── */}
                <section style={{ padding: "82px 0 58px" }}>
                    <div className="er-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
                        <div>
                            <LiveScanCounter />
                            <h1 style={{ fontSize: "clamp(3rem, 7vw, 6.45rem)", lineHeight: 0.92, letterSpacing: "-.075em", maxWidth: 850, marginTop: 22 }}>
                                Your website is <span className="cta-word">bleeding money.</span>{" "}
                                <span style={{ background: "linear-gradient(135deg, #ffffff 15%, #ffb6bf 48%, #ffb15c 78%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                                    SiteER shows exactly where.
                                </span>
                            </h1>
                            <p style={{ marginTop: 20, color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 640, fontSize: "1.06rem" }}>
                                Get your site's A–F grade and estimated monthly money leak in 60 seconds. If the numbers are ugly, a {quickAuditOffer.priceLabel} Quick ER Audit gets you a human action plan with no technical fog.
                            </p>
                            <div style={{ marginTop: 24, display: "grid", gap: 12, maxWidth: 650 }}>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.98rem", display: "flex", alignItems: "flex-start", gap: 12 }}>
                                    <span style={{ color: "var(--er-green)", fontWeight: 900, flexShrink: 0 }}>✓</span>
                                    <span>Free scan in 60 seconds — grade, money leak, top symptoms</span>
                                </p>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.98rem", display: "flex", alignItems: "flex-start", gap: 12 }}>
                                    <span style={{ color: "var(--er-green)", fontWeight: 900, flexShrink: 0 }}>✓</span>
                                    <span>Full ER chart unlocked by email — every critical issue prioritized</span>
                                </p>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.98rem", display: "flex", alignItems: "flex-start", gap: 12 }}>
                                    <span style={{ color: "var(--er-green)", fontWeight: 900, flexShrink: 0 }}>✓</span>
                                    <span>{quickAuditOffer.priceLabel} Quick ER Audit — a human action plan if the numbers scare you</span>
                                </p>
                            </div>
                            <HeroUrlInput />
                            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, maxWidth: 710 }}>
                                {[
                                    { step: "Step 1", title: "Intake", desc: "Run the free scan and see the damage fast." },
                                    { step: "Step 2", title: "Diagnosis", desc: "Unlock the shareable summary by email." },
                                    { step: "Step 3", title: "Treatment plan", desc: `${quickAuditOffer.priceLabel} detailed audit if needed.` },
                                ].map((item) => (
                                    <div key={item.step} style={{ borderRadius: 18, padding: "14px 16px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }}>
                                        <div style={{ color: "#ffb6bf", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 900 }}>{item.step}</div>
                                        <strong style={{ display: "block", marginTop: 4, fontSize: "0.96rem" }}>{item.title}</strong>
                                        <span style={{ display: "block", marginTop: 4, color: "var(--er-muted)", fontSize: "0.84rem", lineHeight: 1.45 }}>{item.desc}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 14, color: "var(--er-muted-2)", fontSize: "0.92rem" }}>
                                {["No credit card", "Private report, not public", "Unsubscribe anytime"].map((item) => (
                                    <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ color: "var(--er-green)", fontWeight: 900 }}>✓</span> {item}
                                    </span>
                                ))}
                            </div>
                            <p style={{ marginTop: 16, color: "#ffcad0", maxWidth: 650, lineHeight: 1.65, fontSize: "0.94rem" }}>
                                Most owners who see a leak above $1,000/mo choose the {quickAuditOffer.priceLabel} audit. It's the easiest decision they make all month.
                            </p>
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
                                                <h3 style={{ fontSize: "1.1rem" }}>Website ER chart</h3>
                                                <p style={{ color: "var(--er-muted)", fontSize: "0.88rem", marginTop: 4 }}>Your website's vitals on one screen</p>
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
                                <strong>7 symptoms need attention</strong>
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
                                <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Your website's vitals on one screen</div>
                                <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em", maxWidth: 780 }}>
                                    Enough detail for your developer. Plain language for you.
                                </h2>
                            </div>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 455, fontSize: "1.04rem" }}>
                                SiteER runs 20+ checks, blends in live PageSpeed data when available, and hands you a prioritized action plan instead of a wall of numbers.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
                            {[
                                { icon: "⚡", color: "rgba(255,77,94,.13)", textColor: "#ff8792", title: "Speed triage", desc: "Flags the bottlenecks making visitors leave before the page loads, from slow server response to render-blocking assets." },
                                { icon: "📱", color: "rgba(110,231,255,.12)", textColor: "var(--er-cyan)", title: "Mobile health", desc: "12+ mobile checks surface tiny text, broken layouts, and hard-to-tap buttons that push phone traffic to competitors." },
                                { icon: "🔎", color: "rgba(183,140,255,.13)", textColor: "var(--er-purple)", title: "SEO vitals", desc: "14 SEO checks surface the quiet issues keeping you off page one, from weak titles to broken meta and sitemap gaps." },
                                { icon: "🛡", color: "rgba(62,226,143,.12)", textColor: "var(--er-green)", title: "Trust signals", desc: "6 trust checks find the red flags that make customers hesitate right before they were about to call or buy." },
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
                                <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>See it for yourself</div>
                                <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Run a real scan on your actual site.</h2>
                            </div>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 455, fontSize: "1.04rem" }}>
                                This isn't a demo. Enter your real URL, get your real grade, and see your real money leak. If the numbers hurt, the {quickAuditOffer.priceLabel} Quick ER Audit unlocks the detailed treatment plan inside your private report.
                            </p>
                        </div>
                        <UrlScanForm />
                    </div>
                </section>

                {/* ── TRUST & SOCIAL PROOF ── */}
                <section style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ marginBottom: 34 }}>
                            <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>No surprises. No upsells. Just your data.</div>
                            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Free to start. Fast to finish. Human when you need one.</h2>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18, marginBottom: 48 }}>
                            {[
                                { icon: "💳", label: "No credit card", detail: "Free scan. No card, ever." },
                                { icon: "⏱", label: "60 seconds", detail: "Grade and leak in about a minute." },
                                { icon: "📊", label: "20+ checks", detail: "PageSpeed-backed scores plus structural checks." },
                                { icon: "🔒", label: "Private", detail: "Your report stays private." },
                                { icon: "📧", label: "Email delivery", detail: "Share it with your developer fast." },
                                { icon: "🎯", label: "Actionable", detail: "Biggest-impact fixes listed first." },
                            ].map((badge) => (
                                <article key={badge.label} style={{ borderRadius: 18, padding: 20, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)", textAlign: "center" }}>
                                    <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{badge.icon}</div>
                                    <h3 style={{ fontWeight: 700, marginBottom: 4 }}>{badge.label}</h3>
                                    <p style={{ color: "var(--er-muted)", fontSize: "0.9rem" }}>{badge.detail}</p>
                                </article>
                            ))}
                        </div>
                        <div style={{ background: "rgba(255,77,94,.08)", border: "1px solid rgba(255,77,94,.18)", borderRadius: 24, padding: 32, textAlign: "center" }}>
                            <p style={{ color: "var(--er-muted)", fontSize: "0.95rem", marginBottom: 8 }}>12,139 scans completed.</p>
                            <p style={{ color: "var(--er-muted)", fontSize: "0.95rem", marginBottom: 16 }}>Businesses scanned include HVAC companies, dentists, contractors, salons, law offices, and local retailers.</p>
                            <div style={{ color: "#ffb6bf", textTransform: "uppercase", letterSpacing: ".12em", fontSize: "0.74rem", fontWeight: 900, marginBottom: 14 }}>Local businesses are already in the ER</div>
                            <blockquote style={{ fontSize: "1.15rem", fontStyle: "italic", color: "white", lineHeight: 1.7, marginBottom: 18 }}>
                                "I sent this to my web developer and he fixed everything in a day. For $0, I got a roadmap that actually worked. Highly recommend."
                            </blockquote>
                            <div style={{ color: "var(--er-muted)", fontSize: "0.9rem" }}>
                                <strong>— Sarah M.</strong> Bakersfield Wellness Center
                            </div>
                            <p style={{ marginTop: 14, color: "#ffd0d5", fontSize: "0.94rem" }}>
                                "Fixed everything in a day." That's what a clear action plan does.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── WORKFLOW ── */}
                <section style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ marginBottom: 34 }}>
                            <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>The ER protocol</div>
                            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>What happens the moment you hit Run Free Scan.</h2>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, counterReset: "workflow" }}>
                            {[
                                { title: "Intake", desc: "We admit your site, pull the live page HTML, and start triage with nothing to install." },
                                { title: "Vitals & scans", desc: "20+ checks across speed, mobile, SEO, and trust run like lab work for your website." },
                                { title: "Diagnosis", desc: "Every issue is weighted by severity, then turned into an A–F grade and money leak estimate." },
                                { title: "Treatment plan", desc: `Free preview first. Full ER chart by email. ${quickAuditOffer.priceLabel} human-written next steps if you want a doctor, not just the lab report.` },
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
                                <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Explore further</div>
                                <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Most visitors scan first. Then explore.</h2>
                            </div>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 455, fontSize: "1.04rem" }}>
                                Run your free scan first. Once you see your numbers, the pages below make a lot more sense.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
                            {[
                                { title: "Reports", desc: "See what the free summary and paid treatment plan look like.", href: "/reports" },
                                { title: "Pricing", desc: `Free scan vs. ${quickAuditOffer.priceLabel} Quick ER Audit vs. implementation.`, href: "/pricing" },
                                { title: "FAQ", desc: "Common questions business owners ask before running their first scan.", href: "/faq" },
                                { title: "Bakersfield website audits", desc: "Local landing page for Kern County businesses that want faster calls, forms, and trust.", href: "/bakersfield-website-audit" },
                                { title: "Blog", desc: "Case studies, fixes, and the real cost of a sick website.", href: "/blog" },
                            ].map((item) => (
                                <article key={item.title} style={{ borderRadius: 24, padding: 22, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)" }}>
                                    <h3 style={{ fontSize: "1.1rem", letterSpacing: "-.03em", marginBottom: 10 }}>{item.title}</h3>
                                    <p style={{ color: "var(--er-muted)", lineHeight: 1.65, fontSize: "0.95rem" }}>{item.desc}</p>
                                    <a href={item.href} className="mt-4 inline-flex text-sm font-semibold text-white underline decoration-red-300 underline-offset-4">
                                        Open page
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
                        <a href="/contact" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <div style={{ fontSize: "0.85rem", textAlign: "right", lineHeight: 1.5 }}>
                        <div>© {new Date().getFullYear()} SiteER — The emergency room for sick websites.</div>
                        <div>Built by <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">Chaotically Organized AI</a> · Bakersfield, CA</div>
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
