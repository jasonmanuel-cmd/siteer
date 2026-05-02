import { analyzeHtml } from "@/lib/scan/analyzeHtml";
import type { FetchHtmlResult } from "@/lib/scan/fetchHtml";

function mockFetch(overrides: Partial<FetchHtmlResult> = {}): FetchHtmlResult {
    return {
        html: `<!DOCTYPE html><html><head>
            <title>Joe's Plumbing Bakersfield — Licensed Local Plumber</title>
            <meta name="description" content="Reliable plumbing in Bakersfield CA. Licensed and insured. Call for a free estimate." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="canonical" href="https://example.com" />
        </head><body>
            <h1>Bakersfield's Trusted Plumber</h1>
            <p>Licensed and insured. Call us at 661-555-0100. Get a free estimate today!</p>
            <a href="/contact">Contact Us</a>
            <button>Get a Quote</button>
        </body></html>`,
        finalUrl: "https://example.com",
        status: 200,
        contentType: "text/html",
        ttfbMs: 200,
        loadMs: 800,
        sizeBytes: 50_000,
        ...overrides,
    };
}

describe("analyzeHtml", () => {
    test("clean site has no high-severity issues", () => {
        const result = analyzeHtml(mockFetch());
        const high = result.issues.filter((i) => i.severity === "high");
        expect(high).toHaveLength(0);
    });

    test("missing title generates high seo issue", () => {
        const result = analyzeHtml(mockFetch({ html: "<html><body><h1>Test</h1></body></html>" }));
        const titleIssue = result.issues.find(
            (i) => i.category === "seo" && i.description.includes("title"),
        );
        expect(titleIssue).toBeDefined();
        expect(titleIssue?.severity).toBe("high");
    });

    test("missing viewport generates high mobile issue", () => {
        const html = `<html><head><title>Test Title Page Here</title></head><body><h1>Hello</h1></body></html>`;
        const result = analyzeHtml(mockFetch({ html }));
        const viewportIssue = result.issues.find(
            (i) => i.category === "mobile" && i.description.includes("viewport"),
        );
        expect(viewportIssue).toBeDefined();
        expect(viewportIssue?.severity).toBe("high");
    });

    test("HTTP status 500 generates technical high issue", () => {
        const result = analyzeHtml(mockFetch({ status: 500 }));
        const serverError = result.issues.find(
            (i) => i.category === "technical" && i.description.includes("500"),
        );
        expect(serverError).toBeDefined();
        expect(serverError?.severity).toBe("high");
    });

    test("slow page (>5s) generates high speed issue", () => {
        const result = analyzeHtml(mockFetch({ loadMs: 6_000 }));
        const speedIssue = result.issues.find(
            (i) => i.category === "speed" && i.severity === "high",
        );
        expect(speedIssue).toBeDefined();
    });

    test("borderline speed (3-5s) generates medium speed issue", () => {
        const result = analyzeHtml(mockFetch({ loadMs: 4_000 }));
        const speedIssue = result.issues.find(
            (i) => i.category === "speed" && i.severity === "medium",
        );
        expect(speedIssue).toBeDefined();
    });

    test("non-HTTPS URL generates technical high issue", () => {
        const result = analyzeHtml(mockFetch({ finalUrl: "http://example.com" }));
        const httpsIssue = result.issues.find(
            (i) => i.category === "technical" && i.description.includes("HTTPS"),
        );
        expect(httpsIssue).toBeDefined();
        expect(httpsIssue?.severity).toBe("high");
    });

    test("missing H1 generates high seo issue", () => {
        const html = `<html><head><title>Page Title Here Example</title><meta name="viewport" content="width=device-width, initial-scale=1"/></head><body><p>Content</p></body></html>`;
        const result = analyzeHtml(mockFetch({ html }));
        const h1Issue = result.issues.find(
            (i) => i.category === "seo" && i.description.includes("H1"),
        );
        expect(h1Issue).toBeDefined();
        expect(h1Issue?.severity).toBe("high");
    });

    test("robots.txt absent generates low seo issue when indexing provided", () => {
        const result = analyzeHtml(mockFetch(), { hasRobots: false, hasSitemap: true });
        const robotsIssue = result.issues.find(
            (i) => i.category === "seo" && i.description.includes("robots"),
        );
        expect(robotsIssue).toBeDefined();
        expect(robotsIssue?.severity).toBe("low");
    });

    test("metrics include core fields", () => {
        const result = analyzeHtml(mockFetch());
        expect(result.metrics).toHaveProperty("https");
        expect(result.metrics).toHaveProperty("title_length");
        expect(result.metrics).toHaveProperty("h1_count");
        expect(result.metrics).toHaveProperty("meta_description_length");
    });

    test("large page (>1MB) generates high speed issue", () => {
        const result = analyzeHtml(mockFetch({ sizeBytes: 1_500_000 }));
        const sizeIssue = result.issues.find(
            (i) => i.category === "speed" && i.description.includes("KB"),
        );
        expect(sizeIssue).toBeDefined();
        expect(sizeIssue?.severity).toBe("high");
    });

    test("no CTA detected generates high conversion issue", () => {
        const html = `<html><head><title>Service Page Title Here</title><meta name="viewport" content="width=device-width"/></head><body><h1>Welcome</h1><p>We offer services. Visit us anytime.</p></body></html>`;
        const result = analyzeHtml(mockFetch({ html }));
        const ctaIssue = result.issues.find(
            (i) => i.category === "conversion" && i.description.includes("call-to-action"),
        );
        expect(ctaIssue).toBeDefined();
        expect(ctaIssue?.severity).toBe("high");
    });
});
