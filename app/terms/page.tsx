export const metadata = {
    title: "Terms & Conditions | SiteER",
};

export default function TermsPage() {
    return (
        <main className="er-container" style={{ padding: "84px 0" }}>
            <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", letterSpacing: "-.04em", marginBottom: 16 }}>
                Terms & Conditions
            </h1>
            <p style={{ color: "var(--er-muted)", lineHeight: 1.75, maxWidth: 850 }}>
                By using SiteER, you agree that scan results are informational, estimates are not financial guarantees, and implementation work requires a separate service agreement. You are responsible for the URLs and data you submit.
            </p>
        </main>
    );
}
