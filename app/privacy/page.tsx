export const metadata = {
    title: "Privacy Agreement | SiteER",
    description:
        "How SiteER stores and uses scan results, lead details, and support requests.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function PrivacyPage() {
    return (
        <main className="er-container" style={{ padding: "84px 0" }}>
            <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", letterSpacing: "-.04em", marginBottom: 16 }}>
                Privacy Agreement
            </h1>
            <p style={{ color: "var(--er-muted)", lineHeight: 1.75, maxWidth: 850 }}>
                SiteER stores scan and lead data to generate report links, improve diagnostics, and communicate requested results. We do not sell your personal information. Contact hello@siteer.dev for deletion or data access requests.
            </p>
        </main>
    );
}
