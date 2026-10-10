import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Sample ER Report – See What a Website Audit Looks Like",
  description:
    "See a real example of a SiteER Deep ER Report. 20-point audit with scored sections, screenshots, and a priority fix roadmap for local businesses.",
  alternates: { canonical: "https://siteer.dev/reports" },
};

const auditSections = [
  {
    category: "Page Speed",
    score: 34,
    maxScore: 100,
    status: "critical",
    issues: [
      "Page load time: 9.4 seconds (target: under 3s)",
      "Images not compressed – 4 images over 1MB each",
      "No browser caching configured",
      "Render-blocking JavaScript in <head>",
    ],
    recommendation:
      "Compress all images, enable caching headers, and defer non-critical scripts. Expected improvement: load time under 2 seconds.",
  },
  {
    category: "Mobile Usability",
    score: 52,
    maxScore: 100,
    status: "warning",
    issues: [
      "Phone number is not a tap-to-call link",
      "CTA button too small on mobile (under 44px touch target)",
      "Horizontal scroll on screens under 375px wide",
    ],
    recommendation:
      "Wrap phone number in <a href='tel:'>, increase button size, fix viewport overflow.",
  },
  {
    category: "SEO Basics",
    score: 41,
    maxScore: 100,
    status: "critical",
    issues: [
      "Title tag: missing keyword, over 60 characters",
      "Meta description: not set",
      "H1 tag: none found on homepage",
      "No sitemap.xml",
    ],
    recommendation:
      "Rewrite title and meta description with local keyword. Add clear H1. Submit sitemap to Google Search Console.",
  },
  {
    category: "Local Schema Markup",
    score: 0,
    maxScore: 100,
    status: "critical",
    issues: [
      "No LocalBusiness schema present",
      "Google can't confirm your address, phone, or hours",
      "Missing OpenGraph tags (social sharing broken)",
    ],
    recommendation:
      "Add LocalBusiness JSON-LD with name, address, phone, hours, and service type. Add OG tags for social previews.",
  },
  {
    category: "Trust Signals",
    score: 58,
    maxScore: 100,
    status: "warning",
    issues: [
      "No reviews or testimonials visible on homepage",
      "No business license or credential mentions",
      "About page missing – who runs this business?",
    ],
    recommendation:
      "Add a testimonials section. Write a brief About section with name and photo. Display any certifications or licenses.",
  },
  {
    category: "SSL / Security",
    score: 100,
    maxScore: 100,
    status: "good",
    issues: [],
    recommendation: "HTTPS is properly configured. No action needed.",
  },
  {
    category: "Contact & CTA",
    score: 45,
    maxScore: 100,
    status: "warning",
    issues: [
      "No clear call-to-action above the fold",
      "Contact form: 8 fields – too long, most visitors abandon",
      "Business hours not shown anywhere on site",
    ],
    recommendation:
      "Add a visible CTA button above the fold. Reduce form to 3–4 fields. Display hours in header or footer.",
  },
];

const statusConfig = {
  critical: { color: "var(--er-red)", label: "Critical", bg: "rgba(255,77,94,.1)" },
  warning: { color: "var(--er-orange)", label: "Needs Work", bg: "rgba(255,177,92,.08)" },
  good: { color: "var(--er-green)", label: "Good", bg: "rgba(62,226,143,.08)" },
};

function ScoreBar({ score, max, status }: { score: number; max: number; status: string }) {
  const pct = (score / max) * 100;
  const cfg = statusConfig[status as keyof typeof statusConfig];
  return (
    <div style={{ marginTop: 8 }}>
      <div
        style={{
          height: 6,
          background: "rgba(255,255,255,.08)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: cfg.color,
            borderRadius: 3,
            transition: "width 0.5s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const totalScore = auditSections.reduce((a, s) => a + s.score, 0);
  const totalMax = auditSections.reduce((a, s) => a + s.maxScore, 0);
  const overallPct = Math.round((totalScore / totalMax) * 100);

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section
          style={{
            padding: "72px 0 56px",
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <div className="er-container">
            <div
              style={{
                display: "inline-block",
                background: "rgba(110,231,255,.1)",
                border: "1px solid rgba(110,231,255,.25)",
                color: "var(--er-cyan)",
                borderRadius: 20,
                padding: "5px 14px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Sample Deep ER Report
            </div>
            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: 16,
                maxWidth: 640,
              }}
            >
              This Is What We Find — And Fix
            </h1>
            <p
              style={{
                color: "var(--er-muted)",
                fontSize: 17,
                maxWidth: 560,
                lineHeight: 1.65,
                marginBottom: 32,
              }}
            >
              Below is a real-format Deep ER Report for a fictional Bakersfield
              service business. Every paying client receives a report in this
              format with their actual site data, screenshots, and a priority
              fix roadmap.
            </p>

            {/* Testimonial */}
            <div
              style={{
                background: "rgba(255,177,92,.06)",
                border: "1px solid rgba(255,177,92,.2)",
                borderRadius: 12,
                padding: "20px 24px",
                maxWidth: 520,
              }}
            >
              <div style={{ color: "var(--er-orange)", marginBottom: 8 }}>
                ★★★★★
              </div>
              <p
                style={{
                  color: "var(--er-muted)",
                  fontSize: 15,
                  fontStyle: "italic",
                  lineHeight: 1.65,
                  marginBottom: 12,
                }}
              >
                &ldquo;Best $49 I ever spent. I had no idea my site had so many
                problems. The report was clear, the fixes made sense, and we
                saw more calls within two weeks of the Fix Pack being done.&rdquo;
              </p>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Sarah K.</div>
              <div style={{ fontSize: 13, color: "var(--er-muted-2)" }}>
                Bakersfield · Residential Cleaning
              </div>
            </div>
          </div>
        </section>

        {/* Overall score */}
        <section style={{ padding: "56px 0 0" }}>
          <div className="er-container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                flexWrap: "wrap",
                marginBottom: 48,
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "conic-gradient(#ff4d5e 0% 41%, rgba(255,255,255,.08) 41% 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: "#08131f",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: "var(--er-red)",
                    }}
                  >
                    {overallPct}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--er-muted-2)",
                    }}
                  >
                    / 100
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--er-muted-2)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Overall Site Health Score
                </div>
                <h2
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    marginBottom: 8,
                    color: "var(--er-red)",
                  }}
                >
                  Critical – Immediate Action Needed
                </h2>
                <p style={{ color: "var(--er-muted)", fontSize: 15, lineHeight: 1.6, maxWidth: 520 }}>
                  This site has {auditSections.filter((s) => s.status === "critical").length} critical
                  issues and {auditSections.filter((s) => s.status === "warning").length} areas needing
                  improvement. Estimated revenue impact: moderate to high, especially on mobile.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Audit sections */}
        <section style={{ padding: "0 0 80px" }}>
          <div className="er-container">
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {auditSections.map((section) => {
                const cfg = statusConfig[section.status as keyof typeof statusConfig];
                return (
                  <div
                    key={section.category}
                    style={{
                      background: cfg.bg,
                      border: `1px solid ${cfg.color}33`,
                      borderRadius: 12,
                      padding: "24px 28px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 16,
                        flexWrap: "wrap",
                        marginBottom: 10,
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            marginBottom: 4,
                          }}
                        >
                          {section.category}
                        </h3>
                        <span
                          style={{
                            display: "inline-block",
                            background: cfg.bg,
                            border: `1px solid ${cfg.color}55`,
                            color: cfg.color,
                            borderRadius: 12,
                            padding: "2px 10px",
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 28,
                            fontWeight: 800,
                            color: cfg.color,
                          }}
                        >
                          {section.score}
                          <span
                            style={{
                              fontSize: 14,
                              color: "var(--er-muted-2)",
                            }}
                          >
                            /{section.maxScore}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ScoreBar
                      score={section.score}
                      max={section.maxScore}
                      status={section.status}
                    />

                    {section.issues.length > 0 && (
                      <ul
                        style={{
                          listStyle: "none",
                          marginTop: 16,
                          marginBottom: 16,
                        }}
                      >
                        {section.issues.map((issue) => (
                          <li
                            key={issue}
                            style={{
                              color: "var(--er-muted)",
                              fontSize: 14,
                              padding: "4px 0",
                              display: "flex",
                              gap: 8,
                              alignItems: "flex-start",
                            }}
                          >
                            <span style={{ color: cfg.color, flexShrink: 0 }}>
                              ⚠
                            </span>
                            {issue}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div
                      style={{
                        background: "rgba(255,255,255,.04)",
                        borderRadius: 8,
                        padding: "12px 16px",
                        borderLeft: `3px solid ${cfg.color}`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "var(--er-muted-2)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          marginBottom: 4,
                        }}
                      >
                        Recommendation
                      </div>
                      <p style={{ color: "var(--er-muted)", fontSize: 14, lineHeight: 1.6 }}>
                        {section.recommendation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: "72px 0",
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,.06)",
            background: "rgba(255,255,255,.02)",
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
              Want a Report Like This for Your Site?
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
              Start with the free scan or order the full Deep ER Report for $49.
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
                href="/get-quote"
                style={{
                  border: "1px solid rgba(110,231,255,.3)",
                  color: "var(--er-cyan)",
                  borderRadius: 8,
                  padding: "14px 28px",
                  fontWeight: 600,
                  fontSize: 16,
                  textDecoration: "none",
                }}
              >
                Order Deep ER Report – $49
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
