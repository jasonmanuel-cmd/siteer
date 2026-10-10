import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "SiteER Terms of Service. Last updated May 1, 2026.",
  alternates: { canonical: "https://siteer.dev/terms" },
};

const sections = [
  {
    title: "1. Agreement to Terms",
    content: `By accessing siteer.dev or purchasing any SiteER service, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service. These Terms constitute a legally binding agreement between you ("Client") and COA I Bakersfield, operated by Jason Manuel ("SiteER", "we", "us", or "our").`,
  },
  {
    title: "2. Services Provided",
    content: `SiteER provides website audit, analysis, and optimization services for local businesses, including:

• Free automated website scan (the "Free Scan")
• Deep ER Report — a full 20-point website audit delivered as a PDF report ($49)
• Fix Pack — full website implementation of audit recommendations with a 20-point improvement guarantee ($497)

We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice.`,
  },
  {
    title: "3. Scan Disclaimer",
    content: `The Free Scan and Deep ER Report are diagnostic tools based on publicly accessible information about your website. They are provided for informational purposes only. Results reflect the state of your website at the time of the scan and may not capture every possible issue. SiteER does not guarantee that fixing identified issues will result in specific business outcomes, increased traffic, or revenue.`,
  },
  {
    title: "4. Payment Terms",
    content: `Deep ER Report: Payment of $49 is due at time of order. Reports are delivered within two (2) business days of payment. No refunds are available once the report has been delivered.

Fix Pack: Payment of $497 is due at time of order. Work begins after payment is received and access credentials are provided. The 14-day money-back guarantee described in Section 5 applies.

All prices are in US dollars. Payments are processed through secure third-party payment processors. SiteER does not store credit card information.`,
  },
  {
    title: "5. Money-Back Guarantee",
    content: `The Fix Pack includes a 20-point improvement guarantee. If your website's SiteER audit score does not improve by at least 20 points following our completion of the Fix Pack work, you may request a full refund within fourteen (14) calendar days of receiving your before-and-after report.

To request a refund, email jasonm@coaibakersfield.com with your order information and a description of your concern. Refunds will be processed within 5–10 business days.

This guarantee applies only to the audit score improvement metric as defined by SiteER's 20-point rubric. It does not guarantee improvements to Google rankings, organic traffic, or revenue.`,
  },
  {
    title: "6. Client Responsibilities",
    content: `To receive Fix Pack services, you must:
• Provide accurate website access credentials (CMS login, FTP, or equivalent)
• Respond to communications within three (3) business days
• Own or have legal authority to authorize changes to the website

You are responsible for maintaining backups of your website before granting access. SiteER will take reasonable care when accessing your site but is not liable for data loss resulting from technical failures beyond our control.`,
  },
  {
    title: "7. Intellectual Property",
    content: `All content on siteer.dev — including text, graphics, logos, and software — is owned by or licensed to SiteER and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written consent.

Reports delivered to clients (Deep ER Report, Fix Pack summary) are licensed to the client for personal and business use. They may not be resold or published without permission.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `To the fullest extent permitted by law, SiteER's total liability for any claim arising from these Terms or our Services shall not exceed the amount you paid for the applicable service.

SiteER is not liable for: indirect, incidental, special, or consequential damages; lost revenue or profits; loss of data; or business interruption, even if we have been advised of the possibility of such damages.`,
  },
  {
    title: "9. Privacy",
    content: `Your use of SiteER is also governed by our Privacy Policy, available at siteer.dev/privacy. By using our services, you consent to the data practices described therein.`,
  },
  {
    title: "10. Changes to These Terms",
    content: `We may update these Terms from time to time. When we do, we will update the "Last Updated" date at the top of this page. Continued use of our services after changes take effect constitutes acceptance of the revised Terms. For material changes, we will make reasonable efforts to notify clients via email.`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms are governed by the laws of the State of California without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Kern County, California.`,
  },
  {
    title: "12. Contact",
    content: `For questions about these Terms, contact us at:

COA I Bakersfield / SiteER
Jason Manuel
Phone: (661) 569-4244
Email: jasonm@coaibakersfield.com
Website: siteer.dev`,
  },
];

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section style={{ padding: "72px 0 80px" }}>
          <div className="er-container" style={{ maxWidth: 800 }}>
            <div style={{ marginBottom: 48 }}>
              <h1
                style={{
                  fontSize: "clamp(28px, 5vw, 44px)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  marginBottom: 12,
                }}
              >
                Terms of Service
              </h1>
              <p style={{ color: "var(--er-muted-2)", fontSize: 14 }}>
                Last Updated: May 1, 2026
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {sections.map((section) => (
                <div key={section.title}>
                  <h2
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 14,
                      color: "var(--er-text)",
                      borderBottom: "1px solid rgba(255,255,255,.06)",
                      paddingBottom: 10,
                    }}
                  >
                    {section.title}
                  </h2>
                  <div
                    style={{
                      color: "var(--er-muted)",
                      fontSize: 15,
                      lineHeight: 1.75,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
