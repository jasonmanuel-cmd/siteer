import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SiteER Privacy Policy. How we collect, use, and protect your information.",
  alternates: { canonical: "https://siteer.dev/privacy" },
};

const sections = [
  {
    title: "1. Who We Are",
    content: `SiteER is operated by COA I Bakersfield, run by Jason Manuel ("we", "us", "our"). Our website is siteer.dev. We provide website audit and optimization services for local businesses.

If you have questions about this Privacy Policy, contact us at: jasonm@coaibakersfield.com or (661) 569-4244.`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect information in the following ways:

Information you provide directly:
• Name, business name, phone number, and email address submitted through contact forms or order forms
• Website URLs you submit for scanning
• Communications you send to us by email or phone

Information collected automatically:
• Pages visited, browser type, device type, and IP address (via analytics)
• Referral source (how you found us)
• Session duration and page interactions

We do not collect payment information directly. All payment processing is handled by third-party processors who maintain their own privacy and security standards.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We use the information we collect to:
• Deliver the services you purchased (scan results, reports, Fix Pack completion)
• Respond to inquiries and provide customer support
• Send order confirmations and service updates
• Send follow-up emails related to your scan or purchase (you can opt out at any time)
• Improve our services and understand how visitors use our site
• Comply with legal obligations`,
  },
  {
    title: "4. Data Storage and Retention",
    content: `Website scan data, contact form submissions, and customer records are stored in Supabase, a secure cloud database provider. Data is stored on servers in the United States.

We retain customer data for up to 24 months from the date of last interaction. Scan results from the free scan may be retained for up to 90 days. You may request deletion of your data at any time by contacting jasonm@coaibakersfield.com.`,
  },
  {
    title: "5. Third Parties We Share Data With",
    content: `We share data with the following third-party service providers:

• Vercel — website hosting (vercel.com/privacy)
• Supabase — database storage (supabase.com/privacy)
• Resend — transactional email delivery (resend.com/privacy)
• Google Analytics — website usage analytics (policies.google.com/privacy)

We do not sell your personal information to third parties. We do not share your information with advertisers or data brokers.`,
  },
  {
    title: "6. Cookies",
    content: `Our website uses cookies and similar tracking technologies to:
• Remember your preferences (e.g., form fields)
• Analyze traffic via Google Analytics

Google Analytics cookies are set by Google and are subject to Google's privacy policy. You can opt out of Google Analytics tracking using Google's opt-out browser add-on (tools.google.com/dlpage/gaoptout).

You can configure your browser to block or delete cookies. Note that some features of the site may not function correctly without cookies.`,
  },
  {
    title: "7. Your Rights",
    content: `Depending on your location, you may have the following rights regarding your personal information:
• Access: Request a copy of the data we hold about you
• Correction: Request correction of inaccurate data
• Deletion: Request deletion of your data
• Portability: Request your data in a machine-readable format
• Opt-out: Opt out of marketing emails at any time by clicking unsubscribe or contacting us directly

To exercise any of these rights, contact us at jasonm@coaibakersfield.com. We will respond within 30 days.`,
  },
  {
    title: "8. California Privacy Rights (CCPA)",
    content: `If you are a California resident, you have the following additional rights under the California Consumer Privacy Act (CCPA):

• The right to know what personal information we collect, use, disclose, or sell
• The right to delete your personal information (subject to certain exceptions)
• The right to opt out of the sale of your personal information (we do not sell personal information)
• The right to non-discrimination for exercising your privacy rights

To submit a CCPA rights request, email jasonm@coaibakersfield.com with the subject line "CCPA Request."`,
  },
  {
    title: "9. Children's Privacy",
    content: `SiteER's services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete it promptly. If you believe we have received information from a child, please contact us immediately.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date. If we make material changes, we will notify current clients via email. Your continued use of our services after any change constitutes acceptance of the updated policy.`,
  },
  {
    title: "11. Contact",
    content: `For any privacy-related questions or requests:

COA I Bakersfield / SiteER
Jason Manuel
Phone: (661) 569-4244
Email: jasonm@coaibakersfield.com
Website: siteer.dev`,
  },
];

export default function PrivacyPage() {
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
                Privacy Policy
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
