import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Pricing – Simple, Transparent Plans",
  description:
    "Free website scan, $49 Deep ER Report, or $497 Fix Pack with a 20-point improvement guarantee. No hidden fees. Serving Bakersfield, CA area businesses.",
  alternates: { canonical: "https://siteer.dev/pricing" },
};

const plans = [
  {
    name: "Free Scan",
    price: "$0",
    color: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.1)",
    accentColor: "var(--er-muted)",
    cta: "Scan My Site",
    href: "/#diagnosis",
    ctaStyle: {
      border: "1px solid rgba(255,255,255,.2)",
      color: "var(--er-text)",
      background: "transparent",
    },
    badge: null,
    features: [
      "Automated 20-checkpoint scan",
      "Top 3–5 issues identified",
      "Page speed score",
      "Mobile-friendly check",
      "HTTPS / SSL check",
      "Basic SEO check",
    ],
    notIncluded: [
      "Full 20-point breakdown",
      "PDF report",
      "Manual expert review",
      "Fix recommendations",
    ],
  },
  {
    name: "Deep ER Report",
    price: "$49",
    color: "rgba(110,231,255,.05)",
    border: "1px solid rgba(110,231,255,.25)",
    accentColor: "var(--er-cyan)",
    cta: "Order the Deep Report",
    href: "/get-quote",
    ctaStyle: {
      background: "rgba(110,231,255,.12)",
      border: "1px solid rgba(110,231,255,.3)",
      color: "var(--er-cyan)",
    },
    badge: null,
    features: [
      "Full 20-point manual + automated audit",
      "PDF report with annotated screenshots",
      "Priority fix roadmap",
      "SEO & content gap analysis",
      "Mobile usability review",
      "Trust signal & social proof review",
      "Competitor benchmark (top 1 result)",
      "Delivered within 2 business days",
    ],
    notIncluded: ["We implement the fixes for you"],
  },
  {
    name: "Fix Pack",
    price: "$497",
    color: "linear-gradient(160deg, rgba(255,77,94,.08), rgba(255,177,92,.06))",
    border: "1px solid rgba(255,177,92,.3)",
    accentColor: "var(--er-orange)",
    cta: "Get the Fix Pack →",
    href: "/get-quote",
    ctaStyle: {
      background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
      color: "#19070a",
    },
    badge: "Most Popular",
    features: [
      "Everything in the Deep ER Report",
      "We implement all the fixes",
      "Speed optimization (images, caching, code)",
      "Mobile layout fixes",
      "SEO meta tags & schema markup",
      "Contact info & CTA improvements",
      "SSL / HTTPS resolution",
      "Trust signal additions",
      "Before & after comparison report",
      "5–7 business day turnaround",
      "14-day money-back guarantee",
    ],
    notIncluded: [],
  },
];

const beforeAfter = [
  {
    metric: "Page Load Speed",
    before: "9.2 seconds",
    after: "1.8 seconds",
    delta: "5× faster",
  },
  {
    metric: "Google PageSpeed Score",
    before: "34 / 100",
    after: "91 / 100",
    delta: "+57 points",
  },
  {
    metric: "Mobile Usability",
    before: "Broken layout",
    after: "Fully responsive",
    delta: "Fixed",
  },
  {
    metric: "SEO Meta Tags",
    before: "0 of 5 set correctly",
    after: "5 of 5 set correctly",
    delta: "+5 tags",
  },
  {
    metric: "Local Schema Markup",
    before: "Missing",
    after: "Complete",
    delta: "Added",
  },
  {
    metric: "Audit Score",
    before: "41 / 100",
    after: "86 / 100",
    delta: "+45 points",
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section
          style={{
            padding: "72px 0 56px",
            textAlign: "center",
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <div className="er-container">
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: 16,
              }}
            >
              Simple, Transparent Pricing
            </h1>
            <p
              style={{
                color: "var(--er-muted)",
                fontSize: 18,
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Start free. Pay only when you need the full picture or want us to
              handle everything.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section style={{ padding: "64px 0" }}>
          <div className="er-container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 24,
                maxWidth: 960,
                margin: "0 auto",
              }}
            >
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  style={{
                    background: plan.color,
                    border: plan.border,
                    borderRadius: 16,
                    padding: "32px 28px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {plan.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: -12,
                        right: 20,
                        background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                        color: "#19070a",
                        fontSize: 11,
                        fontWeight: 800,
                        padding: "4px 12px",
                        borderRadius: 20,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {plan.badge}
                    </div>
                  )}

                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: plan.accentColor,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {plan.name}
                  </div>
                  <div
                    style={{
                      fontSize: 44,
                      fontWeight: 800,
                      lineHeight: 1,
                      marginBottom: 20,
                    }}
                  >
                    {plan.price}
                  </div>

                  <ul style={{ listStyle: "none", flex: 1, marginBottom: 28 }}>
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          color: "var(--er-muted)",
                          fontSize: 14,
                          padding: "5px 0",
                          display: "flex",
                          gap: 8,
                          alignItems: "flex-start",
                        }}
                      >
                        <span style={{ color: "var(--er-green)", flexShrink: 0 }}>✓</span>
                        {f}
                      </li>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <li
                        key={f}
                        style={{
                          color: "var(--er-muted-2)",
                          fontSize: 14,
                          padding: "5px 0",
                          display: "flex",
                          gap: 8,
                          alignItems: "flex-start",
                          opacity: 0.5,
                        }}
                      >
                        <span style={{ flexShrink: 0 }}>✗</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.href}
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "13px",
                      borderRadius: 8,
                      fontWeight: 700,
                      textDecoration: "none",
                      fontSize: 15,
                      ...plan.ctaStyle,
                    }}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee callout */}
        <section
          style={{
            padding: "0 0 64px",
          }}
        >
          <div className="er-container" style={{ maxWidth: 720 }}>
            <div
              style={{
                background: "rgba(62,226,143,.06)",
                border: "1px solid rgba(62,226,143,.2)",
                borderRadius: 16,
                padding: "36px 32px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🛡️</div>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  marginBottom: 12,
                  color: "var(--er-green)",
                }}
              >
                20-Point Improvement Guarantee
              </h2>
              <p
                style={{
                  color: "var(--er-muted)",
                  fontSize: 16,
                  lineHeight: 1.7,
                  maxWidth: 520,
                  margin: "0 auto",
                }}
              >
                The Fix Pack comes with a money-back guarantee. If your website
                audit score doesn&apos;t improve by at least 20 points after we
                complete our work, we&apos;ll issue a full refund — no questions
                asked — within 14 days.
              </p>
            </div>
          </div>
        </section>

        {/* Before & After */}
        <section
          style={{
            padding: "64px 0",
            borderTop: "1px solid rgba(255,255,255,.06)",
            background: "rgba(255,255,255,.01)",
          }}
        >
          <div className="er-container">
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 800,
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              Before & After: Real Fix Pack Results
            </h2>
            <p
              style={{
                color: "var(--er-muted)",
                textAlign: "center",
                marginBottom: 48,
              }}
            >
              Actual improvements from a Bakersfield service business client.
            </p>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto auto",
                  gap: "0 16px",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(255,255,255,.08)",
                  padding: "10px 0",
                  marginBottom: 4,
                }}
              >
                {["Metric", "Before", "After", "Change"].map((h) => (
                  <div
                    key={h}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--er-muted-2)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>
              {beforeAfter.map((row) => (
                <div
                  key={row.metric}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto auto",
                    gap: "0 16px",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(255,255,255,.05)",
                    padding: "14px 0",
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                    {row.metric}
                  </div>
                  <div style={{ color: "var(--er-red)", fontSize: 14, textAlign: "right" }}>
                    {row.before}
                  </div>
                  <div style={{ color: "var(--er-green)", fontSize: 14, textAlign: "right" }}>
                    {row.after}
                  </div>
                  <div
                    style={{
                      color: "var(--er-cyan)",
                      fontSize: 13,
                      fontWeight: 700,
                      textAlign: "right",
                      minWidth: 72,
                    }}
                  >
                    {row.delta}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          style={{
            padding: "80px 0",
            textAlign: "center",
          }}
        >
          <div className="er-container">
            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 800,
                marginBottom: 16,
              }}
            >
              Ready to Fix Your Website?
            </h2>
            <p
              style={{
                color: "var(--er-muted)",
                fontSize: 17,
                marginBottom: 36,
                maxWidth: 480,
                margin: "0 auto 36px",
              }}
            >
              Start with the free scan — it takes 60 seconds and costs nothing.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="/#diagnosis"
                style={{
                  background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                  color: "#19070a",
                  borderRadius: 8,
                  padding: "14px 28px",
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: "none",
                }}
              >
                Scan My Site Free
              </a>
              <a
                href="/contact"
                style={{
                  border: "1px solid rgba(255,255,255,.2)",
                  color: "var(--er-text)",
                  borderRadius: 8,
                  padding: "14px 28px",
                  fontWeight: 600,
                  fontSize: 16,
                  textDecoration: "none",
                }}
              >
                Talk to Jason
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
