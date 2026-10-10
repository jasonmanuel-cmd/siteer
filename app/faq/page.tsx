import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "FAQ – Common Questions About SiteER",
  description:
    "Answers to common questions about SiteER website audits. What is the ER Report? How does the scan work? What's covered in the Fix Pack? All answered here.",
  alternates: { canonical: "https://siteer.dev/faq" },
};

const faqs = [
  {
    q: "What exactly is a SiteER scan?",
    a: "A SiteER scan is an automated check of your website across 20 different checkpoints including page speed, mobile usability, HTTPS security, SEO meta tags, local business schema markup, contact information, call-to-action effectiveness, and more. The free scan gives you a summary of the top issues. The $49 Deep ER Report provides a full scored breakdown with screenshots, explanations, and a priority action plan.",
  },
  {
    q: "Who is SiteER for?",
    a: "SiteER is built for local businesses in the Bakersfield, CA area — contractors, service providers, retail shops, restaurants, professional services, and anyone who relies on their website to generate phone calls or inquiries. If you've ever wondered why your site isn't getting you more customers, SiteER will tell you exactly why.",
  },
  {
    q: "How does the free scan work?",
    a: "Enter your website URL into the scanner on our homepage. Our system runs checks across speed, SEO, mobile, security, and more in about 60 seconds. You'll see a summary of your top issues right away — no signup, no credit card, no email required.",
  },
  {
    q: "What does the $49 Deep ER Report include?",
    a: "The Deep ER Report is a full 20-point audit combining automated tools and manual review by Jason. You receive: a scored breakdown of all 20 checkpoints, annotated screenshots showing exactly where problems appear, plain-English explanations of each issue, a prioritized fix roadmap ordered by impact, a basic competitor benchmark, and mobile vs. desktop comparisons. Delivered as a PDF within 2 business days.",
  },
  {
    q: "What is the $497 Fix Pack?",
    a: "The Fix Pack is the \"we do it for you\" option. After completing the Deep ER Report for your site, we implement all the recommended fixes ourselves — speed optimization, SEO meta tags, schema markup, mobile layout fixes, SSL resolution, contact info cleanup, CTA improvements, and more. We then send you a before-and-after report showing exactly what changed and by how much.",
  },
  {
    q: "What is the 20-point improvement guarantee?",
    a: "If your site's audit score doesn't improve by at least 20 points after we complete the Fix Pack, we'll issue a full refund. No questions asked. You have 14 days from delivery of your before-and-after report to request it. We're confident in our work — this guarantee is how we back that up.",
  },
  {
    q: "How long does the Fix Pack take?",
    a: "Most Fix Pack projects are completed within 5–7 business days from the time we receive access to your website (usually via a login or FTP credentials). We'll confirm the exact timeline when you order. Rush delivery may be available — contact us to ask.",
  },
  {
    q: "Do I need to give you access to my website?",
    a: "For the free scan and Deep ER Report, no — we work from the publicly visible version of your site. For the Fix Pack, yes, we'll need login access to your website's backend (WordPress admin, Squarespace, Wix, or similar) and/or your web host. We use a limited-access account and never store or share your credentials.",
  },
  {
    q: "What website platforms do you support?",
    a: "We work with any platform — WordPress, Squarespace, Wix, Weebly, Shopify, custom-built HTML sites, GoDaddy Website Builder, and others. Some fixes may be limited on fully locked platforms like certain Wix templates; we'll tell you upfront if that applies to your site.",
  },
  {
    q: "I already have a web developer. Why do I need SiteER?",
    a: "Many local business sites were built years ago and have never been audited for modern SEO, speed, or mobile standards. A fresh set of eyes with a structured 20-point checklist often finds issues that the original developer missed or that emerged after updates. The Deep ER Report gives you an objective score you can share with your developer to prioritize fixes.",
  },
];

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section
          style={{
            padding: "72px 0 56px",
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <div className="er-container" style={{ maxWidth: 760 }}>
            <h1
              style={{
                fontSize: "clamp(30px, 5vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: 16,
              }}
            >
              Frequently Asked Questions
            </h1>
            <p style={{ color: "var(--er-muted)", fontSize: 17, lineHeight: 1.65, maxWidth: 560 }}>
              Everything you need to know about SiteER website audits. Can&apos;t
              find your answer?{" "}
              <a
                href="/contact"
                style={{ color: "var(--er-cyan)", textDecoration: "none" }}
              >
                Contact us
              </a>{" "}
              or call{" "}
              <a
                href="tel:+16615694244"
                style={{ color: "var(--er-cyan)", textDecoration: "none" }}
              >
                (661) 569-4244
              </a>
              .
            </p>
          </div>
        </section>

        <section style={{ padding: "56px 0 80px" }}>
          <div className="er-container" style={{ maxWidth: 760 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {faqs.map((faq, i) => (
                <div
                  key={faq.q}
                  style={{
                    background: "var(--er-card)",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 12,
                    padding: "24px 28px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      marginBottom: 12,
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--er-cyan)",
                        fontSize: 13,
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {faq.q}
                  </h2>
                  <p
                    style={{
                      color: "var(--er-muted)",
                      fontSize: 15,
                      lineHeight: 1.7,
                      paddingLeft: 28,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: "64px 0",
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,.06)",
            background: "rgba(255,255,255,.02)",
          }}
        >
          <div className="er-container">
            <h2
              style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}
            >
              Still Have Questions?
            </h2>
            <p
              style={{
                color: "var(--er-muted)",
                fontSize: 16,
                marginBottom: 32,
                maxWidth: 400,
                margin: "0 auto 32px",
              }}
            >
              Jason is happy to answer any questions about your site before you
              order anything.
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
                href="/contact"
                style={{
                  background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                  color: "#19070a",
                  borderRadius: 8,
                  padding: "13px 28px",
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                Contact Jason
              </a>
              <a
                href="/#diagnosis"
                style={{
                  border: "1px solid rgba(255,255,255,.2)",
                  color: "var(--er-text)",
                  borderRadius: 8,
                  padding: "13px 28px",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                Scan My Site Free
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
