import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "How SiteER collects, stores, and uses your data — including scan results, emails, and business inputs.",
    alternates: { canonical: "/privacy" },
};

const sections = [
    {
        title: "1. Who We Are",
        body: `SiteER is a website diagnostic service operated by COAIBAKERSFIELD.COM, located in Bakersfield, California. Contact: jasonm@coaibakersfield.com · (661) 569-4244.`,
    },
    {
        title: "2. Information We Collect",
        body: `We collect information you provide directly: the website URLs you scan, your email address (when you request a full report), optional business inputs (monthly visitors, conversion rate, average order value), contact form submissions (name, phone, email, message), and payment information (processed securely by our payment provider — we do not store card numbers). We also collect limited technical data automatically: browser type, device type, IP address, and page interaction data via Google Analytics and Vercel Analytics.`,
    },
    {
        title: "3. How We Use Your Information",
        body: `We use the information we collect to: generate and deliver your website scan report; send your report link and related follow-up via email; improve our diagnostic algorithms and benchmarks; communicate pricing, support, and service updates you've requested; and respond to contact form submissions. We do not use your data for advertising to third parties.`,
    },
    {
        title: "4. Data Storage & Security",
        body: `Scan data and lead records are stored in Supabase (a secure cloud database). Email communications are sent via our email service provider. We use HTTPS everywhere. Sensitive form data (payment) is handled by a PCI-compliant third-party processor. We retain scan data for up to 24 months. We retain contact and lead data until you request deletion.`,
    },
    {
        title: "5. Third-Party Services",
        body: `We use the following third-party services, each with their own privacy policies: Vercel (hosting and analytics), Google Analytics (anonymized usage data), Supabase (database), and our payment processor. We do not sell your personal data to any third party.`,
    },
    {
        title: "6. Cookies",
        body: `SiteER uses essential cookies for site functionality and analytics cookies (Google Analytics) to understand how visitors use the site. You can disable analytics cookies in your browser settings. We do not use advertising or tracking cookies.`,
    },
    {
        title: "7. Your Rights",
        body: `You have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, and opt out of marketing emails (unsubscribe link in every email). To exercise any of these rights, email jasonm@coaibakersfield.com with the subject "Data Request." We will respond within 10 business days.`,
    },
    {
        title: "8. California Residents (CCPA)",
        body: `California residents have additional rights under the California Consumer Privacy Act. You may request to know what personal information we've collected, request deletion, and opt out of any sale of personal information. We do not sell personal information. To submit a CCPA request, contact jasonm@coaibakersfield.com.`,
    },
    {
        title: "9. Children's Privacy",
        body: `SiteER is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has submitted information through our service, contact us immediately at jasonm@coaibakersfield.com.`,
    },
    {
        title: "10. Changes to This Policy",
        body: `We may update this Privacy Policy periodically. Material changes will be noted with a revised "Last updated" date. Continued use of SiteER after changes are posted constitutes acceptance of the updated policy.`,
    },
    {
        title: "11. Contact",
        body: `Privacy questions or data requests: jasonm@coaibakersfield.com · (661) 569-4244 · COAIBAKERSFIELD.COM, Bakersfield, CA 93301.`,
    },
];

export default function PrivacyPage() {
    return (
        <>
            <SiteHeader />
            <main className="er-container" style={{ padding: "64px 0 0", maxWidth: 800 }}>
                <p style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Legal</p>
                <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-.04em", marginBottom: 8 }}>Privacy Policy</h1>
                <p style={{ color: "var(--er-muted)", fontSize: "0.9rem", marginBottom: 48 }}>Last updated: May 1, 2026 · Effective immediately</p>

                <div style={{ display: "grid", gap: 36 }}>
                    {sections.map((s) => (
                        <section key={s.title}>
                            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: 12, color: "white" }}>{s.title}</h2>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.8, fontSize: "0.96rem" }}>{s.body}</p>
                        </section>
                    ))}
                </div>

                <div style={{ marginTop: 64, borderRadius: 20, padding: 24, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)" }}>
                    <p style={{ color: "var(--er-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                        <strong style={{ color: "white" }}>Questions or data requests?</strong> Email <a href="mailto:jasonm@coaibakersfield.com" style={{ color: "var(--er-cyan)" }}>jasonm@coaibakersfield.com</a> or call <a href="tel:+16615694244" style={{ color: "var(--er-cyan)" }}>(661) 569-4244</a>.
                    </p>
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
