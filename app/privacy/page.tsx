export const metadata = {
    title: "Privacy Agreement | SiteER",
};

export default function PrivacyPage() {
    return (
        <main className="er-container" style={{ padding: "84px 0" }}>
            <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", letterSpacing: "-.04em", marginBottom: 16 }}>
                Privacy Agreement
            </h1>
            <p style={{ color: "var(--er-muted)", lineHeight: 1.75, maxWidth: 850 }}>
                SiteER stores scan and lead data to generate report links, improve diagnostics, and communicate requested results. We do not sell your personal information. Contact hello@siteer.app for deletion or data access requests.
            </p>
        </main>
    );
}
