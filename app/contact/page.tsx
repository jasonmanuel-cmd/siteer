import type { Metadata } from "next";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact – Talk to Jason",
  description:
    "Contact SiteER / COA I Bakersfield. Call (661) 569-4244 or email jasonm@coaibakersfield.com. Free website consultations for Bakersfield area businesses.",
  alternates: { canonical: "https://siteer.dev/contact" },
};

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        color: "var(--er-muted-2)",
        fontSize: 14,
      }}
    >
      Loading form…
    </div>
  ),
});

const trustBullets = [
  {
    icon: "🤝",
    title: "No obligation",
    desc: "Ask questions before you spend a dime. Jason will give you honest advice about whether your site needs work.",
  },
  {
    icon: "📍",
    title: "Serving Bakersfield, CA",
    desc: "We work with local businesses in Bakersfield and throughout Kern County.",
  },
  {
    icon: "⚡",
    title: "Fast response",
    desc: "We reply to every inquiry within one business day, usually sooner.",
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section
          style={{
            padding: "72px 0 80px",
          }}
        >
          <div className="er-container">
            {/* Header */}
            <div style={{ marginBottom: 56, maxWidth: 600 }}>
              <h1
                style={{
                  fontSize: "clamp(30px, 5vw, 48px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  marginBottom: 14,
                }}
              >
                Talk to Jason
              </h1>
              <p style={{ color: "var(--er-muted)", fontSize: 17, lineHeight: 1.65 }}>
                Have a question about your website? Not sure which plan is right
                for you? Reach out — no sales pitch, just a straight answer.
              </p>
            </div>

            {/* Two-column layout */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 48,
                alignItems: "start",
              }}
            >
              {/* Left column */}
              <div>
                {/* Phone */}
                <div style={{ marginBottom: 36 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--er-muted-2)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Phone
                  </div>
                  <a
                    href="tel:+16615694244"
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      color: "var(--er-cyan)",
                      textDecoration: "none",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    (661) 569-4244
                  </a>
                  <div style={{ color: "var(--er-muted-2)", fontSize: 14 }}>
                    Mon–Fri, 9am–5pm Pacific
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: 48 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--er-muted-2)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Email
                  </div>
                  <a
                    href="mailto:jasonm@coaibakersfield.com"
                    style={{
                      fontSize: 17,
                      color: "var(--er-cyan)",
                      textDecoration: "none",
                    }}
                  >
                    jasonm@coaibakersfield.com
                  </a>
                </div>

                {/* Trust bullets */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {trustBullets.map((bullet) => (
                    <div
                      key={bullet.title}
                      style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                    >
                      <span style={{ fontSize: 22, flexShrink: 0 }}>
                        {bullet.icon}
                      </span>
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 15,
                            marginBottom: 4,
                          }}
                        >
                          {bullet.title}
                        </div>
                        <div style={{ color: "var(--er-muted)", fontSize: 14, lineHeight: 1.6 }}>
                          {bullet.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column – form */}
              <div
                style={{
                  background: "var(--er-card)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 16,
                  padding: "36px 32px",
                }}
              >
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  Send a Message
                </h2>
                <p
                  style={{
                    color: "var(--er-muted)",
                    fontSize: 14,
                    marginBottom: 28,
                  }}
                >
                  We&apos;ll get back to you within one business day.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
