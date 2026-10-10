import type { Metadata } from "next";
import ScanForm from "@/components/ScanForm";

export const metadata: Metadata = {
  title: "SiteER – Free Website Audit for Local Businesses in Bakersfield",
  description:
    "Is your website costing you customers? Get a free website ER scan and find out what's broken. Serving Bakersfield, CA area businesses. $49 Deep ER Report or $497 Fix Pack.",
  alternates: { canonical: "https://siteer.dev/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://siteer.dev/#org",
      name: "SiteER",
      url: "https://siteer.dev",
      logo: "https://siteer.dev/siteer-logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-661-569-4244",
        contactType: "customer service",
        areaServed: "US-CA",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://siteer.dev/#service",
      name: "COA I Bakersfield – SiteER Website Audits",
      description:
        "Professional website audit and repair service for local businesses in the Bakersfield, CA area.",
      url: "https://siteer.dev",
      telephone: "+1-661-569-4244",
      email: "jasonm@coaibakersfield.com",
      areaServed: {
        "@type": "City",
        name: "Bakersfield",
        addressRegion: "CA",
        addressCountry: "US",
      },
      priceRange: "$0–$497",
      serviceType: "Website Audit & Optimization",
    },
    {
      "@type": "WebSite",
      "@id": "https://siteer.dev/#website",
      url: "https://siteer.dev",
      name: "SiteER",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://siteer.dev/scan?url={url}",
        },
        "query-input": "required name=url",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a SiteER free scan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SiteER runs an automated check of your website for common errors including broken links, missing meta tags, slow page speed, mobile issues, and missing contact information.",
          },
        },
        {
          "@type": "Question",
          name: "How long does the free scan take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The free scan returns results in about 60 seconds. You'll see a summary of issues immediately with no signup required.",
          },
        },
        {
          "@type": "Question",
          name: "What is included in the $49 Deep ER Report?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Deep ER Report is a full 20-point manual + automated audit. You get a detailed PDF report with prioritized recommendations, SEO analysis, speed analysis, mobile usability, trust signals, and a clear action plan.",
          },
        },
        {
          "@type": "Question",
          name: "What is the $497 Fix Pack guarantee?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We guarantee your site will score at least 20 points better on our audit scale after the Fix Pack is complete. If it doesn't, you get a full refund within 14 days.",
          },
        },
      ],
    },
  ],
};

const issues = [
  {
    icon: "🔴",
    title: "Missing or broken contact info",
    desc: "67% of small business sites have a phone number that's wrong, missing, or not click-to-call on mobile.",
  },
  {
    icon: "🟠",
    title: "Slow page load speed",
    desc: "If your site takes more than 3 seconds to load, 53% of mobile visitors leave before it finishes.",
  },
  {
    icon: "🔴",
    title: "No SSL / HTTPS",
    desc: "Google marks non-HTTPS sites as \"Not Secure\" and ranks them lower. Customers see the warning and bounce.",
  },
  {
    icon: "🟠",
    title: "Not mobile-friendly",
    desc: "Over 60% of local business searches happen on phones. A broken mobile layout means lost calls.",
  },
  {
    icon: "🔴",
    title: "Missing Google Business integration",
    desc: "No schema markup means Google can't confidently show your hours, address, and reviews in search.",
  },
  {
    icon: "🟡",
    title: "Weak or missing call-to-action",
    desc: "Most visitors don't know what you want them to do. A clear CTA can double your inquiry rate.",
  },
];

const steps = [
  {
    n: "01",
    title: "Enter Your URL",
    desc: "Type your website address into the scanner. Takes five seconds.",
  },
  {
    n: "02",
    title: "We Scan 20+ Checkpoints",
    desc: "Our engine checks speed, SEO, mobile, trust signals, contact info, and more — in about 60 seconds.",
  },
  {
    n: "03",
    title: "Get Your ER Report",
    desc: "See exactly what's wrong, how serious it is, and what to do about it. Free overview or $49 deep-dive.",
  },
];

const testimonials = [
  {
    quote:
      "I had no idea my site was loading in 11 seconds on mobile. Jason found 14 issues in the free scan and fixed all of them in the Fix Pack. We got two new calls the first week.",
    name: "Maria R.",
    biz: "Bakersfield Cleaning Co.",
  },
  {
    quote:
      "The $49 Deep ER Report was the best money I've spent on marketing this year. Finally knew exactly what was broken and why Google wasn't sending me traffic.",
    name: "Derek T.",
    biz: "Central Valley HVAC",
  },
  {
    quote:
      "Skeptical at first but the free scan showed real problems. The Fix Pack took about a week and my Google ranking went from page 4 to page 1 for my main keyword.",
    name: "Alicia M.",
    biz: "Kern County Pet Grooming",
  },
];

const faqs = [
  {
    q: "Do I have to pay for the scan?",
    a: "No. The basic scan is completely free — no credit card, no signup. You get a summary of the top issues on your site. For the full 20-point breakdown with a PDF report and priority fix list, that's the $49 Deep ER Report.",
  },
  {
    q: "I'm not tech-savvy. Will I understand the report?",
    a: "Yes. We wrote every section in plain English. Each issue is explained in one sentence — what it is, why it matters, and what to do about it. If something's unclear, call us: (661) 569-4244.",
  },
  {
    q: "How is SiteER different from other website checkers?",
    a: "Most automated tools give you a score and a list of jargon. SiteER is backed by a real person — Jason Manuel — who reviews your site and explains what actually matters for a local business in Bakersfield.",
  },
  {
    q: "What does the $497 Fix Pack include?",
    a: "Everything: we fix the issues ourselves. Speed optimization, mobile fixes, SSL, meta tags, schema markup, contact info cleanup, CTA improvements, and more — all covered. Guaranteed to improve your audit score by 20 points or your money back within 14 days.",
  },
  {
    q: "How long does the Fix Pack take?",
    a: "Most sites are fully fixed within 5–7 business days. We send you a before-and-after report when we're done.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Header ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(18px)",
          background: "rgba(7,16,24,.72)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div className="er-container">
          <nav
            aria-label="Main navigation"
            style={{
              height: 76,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <a
              href="/"
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "var(--er-cyan)",
                textDecoration: "none",
                letterSpacing: "-0.02em",
              }}
            >
              Site<span style={{ color: "var(--er-red)" }}>ER</span>
            </a>
            <div
              style={{
                display: "flex",
                gap: 28,
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              <a
                href="/reports"
                style={{ color: "var(--er-muted)", textDecoration: "none" }}
              >
                Reports
              </a>
              <a
                href="/pricing"
                style={{ color: "var(--er-muted)", textDecoration: "none" }}
              >
                Pricing
              </a>
              <a
                href="/blog"
                style={{ color: "var(--er-muted)", textDecoration: "none" }}
              >
                Blog
              </a>
              <a
                href="/faq"
                style={{ color: "var(--er-muted)", textDecoration: "none" }}
              >
                FAQ
              </a>
            </div>
            <a
              href="#diagnosis"
              style={{
                background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                color: "#19070a",
                padding: "10px 20px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Scan My Site Free
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        style={{
          padding: "100px 0 80px",
          textAlign: "center",
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(110,231,255,.07) 0%, transparent 70%)",
        }}
      >
        <div className="er-container">
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,77,94,.12)",
              border: "1px solid rgba(255,77,94,.3)",
              color: "var(--er-red)",
              borderRadius: 20,
              padding: "5px 14px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Free Website ER Scan
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 24,
              maxWidth: 780,
              margin: "0 auto 24px",
            }}
          >
            Is Your Website{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Costing You Customers?
            </span>
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: "var(--er-muted)",
              maxWidth: 600,
              margin: "0 auto 48px",
              lineHeight: 1.6,
            }}
          >
            Most local business websites have 8–14 fixable errors that push
            customers away every day. Enter your URL below — we'll show you
            exactly what's broken in under 60 seconds.
          </p>

          {/* Scan form */}
          <div id="diagnosis">
            <ScanForm />
          </div>

          {/* Social proof */}
          <div
            style={{
              marginTop: 48,
              display: "flex",
              gap: 32,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              ["200+", "Sites Scanned"],
              ["94%", "Found Critical Errors"],
              ["4.9★", "Avg. Client Rating"],
            ].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "var(--er-cyan)",
                  }}
                >
                  {num}
                </div>
                <div style={{ fontSize: 13, color: "var(--er-muted-2)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Common Issues ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="er-container">
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            The Errors We Find Most Often
          </h2>
          <p
            style={{
              color: "var(--er-muted)",
              textAlign: "center",
              marginBottom: 48,
              maxWidth: 540,
              margin: "0 auto 48px",
            }}
          >
            These are the issues killing conversion rates for Bakersfield
            businesses right now.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {issues.map((issue) => (
              <div
                key={issue.title}
                style={{
                  background: "var(--er-card)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 12,
                  padding: "24px",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 10 }}>
                  {issue.icon}
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {issue.title}
                </h3>
                <p style={{ color: "var(--er-muted)", fontSize: 14, lineHeight: 1.6 }}>
                  {issue.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        style={{
          padding: "80px 0",
          background: "rgba(110,231,255,.03)",
          borderTop: "1px solid rgba(255,255,255,.06)",
          borderBottom: "1px solid rgba(255,255,255,.06)",
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
            How It Works
          </h2>
          <p
            style={{
              color: "var(--er-muted)",
              textAlign: "center",
              marginBottom: 56,
            }}
          >
            Three steps from URL to actionable fixes.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 32,
            }}
          >
            {steps.map((step) => (
              <div key={step.n} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ff4d5e22, #ffb15c22)",
                    border: "1px solid rgba(255,177,92,.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "var(--er-orange)",
                  }}
                >
                  {step.n}
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: "var(--er-muted)", fontSize: 15, lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Teaser ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="er-container">
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Simple, Honest Pricing
          </h2>
          <p
            style={{
              color: "var(--er-muted)",
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Start free. Upgrade when you're ready to fix things fast.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            {/* Free */}
            <div
              style={{
                background: "var(--er-card)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 16,
                padding: "32px 28px",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--er-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Free Scan
              </div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  marginBottom: 4,
                }}
              >
                $0
              </div>
              <p style={{ color: "var(--er-muted)", fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
                Instant overview of your biggest issues. No signup required.
              </p>
              <ul style={{ listStyle: "none", marginBottom: 32 }}>
                {[
                  "Automated 20-checkpoint scan",
                  "Top 3–5 issues identified",
                  "Speed score",
                  "Mobile-friendly check",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      color: "var(--er-muted)",
                      fontSize: 14,
                      padding: "5px 0",
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "var(--er-green)" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <a
                href="#diagnosis"
                style={{
                  display: "block",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,.2)",
                  color: "var(--er-text)",
                  padding: "12px",
                  borderRadius: 8,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Scan My Site
              </a>
            </div>

            {/* Deep ER Report */}
            <div
              style={{
                background: "rgba(110,231,255,.05)",
                border: "1px solid rgba(110,231,255,.25)",
                borderRadius: 16,
                padding: "32px 28px",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--er-cyan)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Deep ER Report
              </div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  marginBottom: 4,
                }}
              >
                $49
              </div>
              <p style={{ color: "var(--er-muted)", fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
                Full 20-point audit with a PDF report and priority action plan.
              </p>
              <ul style={{ listStyle: "none", marginBottom: 32 }}>
                {[
                  "Full 20-point manual + automated audit",
                  "PDF report with screenshots",
                  "Priority fix recommendations",
                  "SEO & content analysis",
                  "Trust signal review",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      color: "var(--er-muted)",
                      fontSize: 14,
                      padding: "5px 0",
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "var(--er-green)" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <a
                href="/get-quote"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "rgba(110,231,255,.12)",
                  border: "1px solid rgba(110,231,255,.3)",
                  color: "var(--er-cyan)",
                  padding: "12px",
                  borderRadius: 8,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Get the Deep Report
              </a>
            </div>

            {/* Fix Pack */}
            <div
              style={{
                background: "linear-gradient(160deg, rgba(255,77,94,.08), rgba(255,177,92,.08))",
                border: "1px solid rgba(255,177,92,.3)",
                borderRadius: 16,
                padding: "32px 28px",
                position: "relative",
              }}
            >
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
                Most Popular
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--er-orange)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Fix Pack
              </div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  marginBottom: 4,
                }}
              >
                $497
              </div>
              <p style={{ color: "var(--er-muted)", fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
                We fix everything. Guaranteed 20-point improvement or full refund.
              </p>
              <ul style={{ listStyle: "none", marginBottom: 32 }}>
                {[
                  "Everything in the Deep ER Report",
                  "We implement all the fixes",
                  "Speed, SEO, mobile, trust & CTA",
                  "Before & after comparison report",
                  "14-day money-back guarantee",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      color: "var(--er-muted)",
                      fontSize: 14,
                      padding: "5px 0",
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "var(--er-green)" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <a
                href="/get-quote"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                  color: "#19070a",
                  padding: "13px",
                  borderRadius: 8,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Get the Fix Pack →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        style={{
          padding: "80px 0",
          background: "rgba(255,255,255,.02)",
          borderTop: "1px solid rgba(255,255,255,.06)",
        }}
      >
        <div className="er-container">
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            What Bakersfield Business Owners Say
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "var(--er-card)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 12,
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    color: "var(--er-orange)",
                    fontSize: 18,
                    marginBottom: 14,
                  }}
                >
                  ★★★★★
                </div>
                <p
                  style={{
                    color: "var(--er-muted)",
                    fontSize: 15,
                    lineHeight: 1.7,
                    marginBottom: 20,
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: "var(--er-muted-2)", fontSize: 13 }}>
                    {t.biz}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="er-container" style={{ maxWidth: 720 }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {faqs.map((faq) => (
              <div
                key={faq.q}
                style={{
                  background: "var(--er-card)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 10,
                  padding: "22px 24px",
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {faq.q}
                </h3>
                <p style={{ color: "var(--er-muted)", fontSize: 15, lineHeight: 1.65 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        style={{
          padding: "80px 0",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,.06)",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,77,94,.06) 0%, transparent 70%)",
        }}
      >
        <div className="er-container">
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            Your Customers Are Searching Right Now
          </h2>
          <p
            style={{
              color: "var(--er-muted)",
              fontSize: 18,
              maxWidth: 520,
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            Don&apos;t let website errors send them to your competitor. Scan free in 60
            seconds and find out what&apos;s broken.
          </p>
          <a
            href="#diagnosis"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
              color: "#19070a",
              borderRadius: 8,
              padding: "16px 36px",
              fontWeight: 700,
              fontSize: 17,
              textDecoration: "none",
            }}
          >
            Scan My Site Free →
          </a>
          <p
            style={{
              marginTop: 16,
              color: "var(--er-muted-2)",
              fontSize: 13,
            }}
          >
            No signup · No credit card · Instant results
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,.08)",
          padding: "28px 0",
          color: "var(--er-muted-2)",
          fontSize: 14,
        }}
      >
        <div
          className="er-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "var(--er-cyan)",
              letterSpacing: "-0.02em",
            }}
          >
            Site<span style={{ color: "var(--er-red)" }}>ER</span>
          </span>
          <nav style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {(
              [
                ["/#diagnosis", "Free Scan"],
                ["/pricing", "Pricing"],
                ["/blog", "Blog"],
                ["/faq", "FAQ"],
                ["/contact", "Contact"],
                ["/terms", "Terms"],
                ["/privacy", "Privacy"],
              ] as [string, string][]
            ).map(([href, label]) => (
              <a
                key={href}
                href={href}
                style={{ color: "var(--er-muted-2)", textDecoration: "none" }}
              >
                {label}
              </a>
            ))}
          </nav>
          <div>
            © {new Date().getFullYear()} SiteER · (661) 569-4244
          </div>
        </div>
      </footer>
    </>
  );
}
