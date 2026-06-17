import type { Issue, Severity } from "@/lib/scan/analyzeHtml";

type Strategy = "desktop" | "mobile";

type Audit = {
    id: string;
    title: string;
    score: number | null;
    numericValue?: number;
    displayValue?: string;
};

type PageSpeedRun = {
    strategy: Strategy;
    finalUrl: string;
    fetchTime: string | null;
    performance: number;
    seo: number;
    accessibility: number;
    bestPractices: number;
    audits: Record<string, Audit>;
};

export type PageSpeedScan = {
    finalUrl: string;
    desktop: PageSpeedRun | null;
    mobile: PageSpeedRun | null;
    issues: Issue[];
    metrics: Record<string, unknown>;
    partial: boolean;
};

type ScoreSummary = {
    speed: number;
    mobile: number;
    seo: number;
    trust: number;
    overall: number;
    grade: string;
};

const PAGE_SPEED_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const PAGE_SPEED_CATEGORIES = [
    "performance",
    "accessibility",
    "best-practices",
    "seo",
] as const;

function clampScore(value: number): number {
    return Math.max(0, Math.min(100, Math.round(value)));
}

function gradeFromOverall(overall: number): string {
    if (overall >= 90) return "A";
    if (overall >= 80) return "B";
    if (overall >= 70) return "C";
    if (overall >= 60) return "D";
    return "F";
}

function readCategoryScore(categories: Record<string, { score?: number | null }> | undefined, key: string): number {
    const raw = categories?.[key]?.score;
    return typeof raw === "number" ? clampScore(raw * 100) : 0;
}

function normalizeAudit(id: string, raw: unknown): Audit | null {
    if (!raw || typeof raw !== "object") return null;

    const record = raw as {
        title?: unknown;
        score?: unknown;
        numericValue?: unknown;
        displayValue?: unknown;
    };

    return {
        id,
        title: typeof record.title === "string" ? record.title : id,
        score: typeof record.score === "number" ? record.score : null,
        numericValue:
            typeof record.numericValue === "number" ? record.numericValue : undefined,
        displayValue:
            typeof record.displayValue === "string" ? record.displayValue : undefined,
    };
}

function metricSeverity(
    audit: Audit | undefined,
    mediumThreshold: number,
    highThreshold: number,
): Severity | null {
    if (!audit || typeof audit.numericValue !== "number") return null;
    if (audit.numericValue >= highThreshold) return "high";
    if (audit.numericValue >= mediumThreshold) return "medium";
    return null;
}

function booleanSeverity(audit: Audit | undefined): Severity | null {
    if (!audit || typeof audit.score !== "number" || audit.score >= 0.99) return null;
    return audit.score <= 0.25 ? "high" : "medium";
}

function pushIssue(
    target: Issue[],
    seen: Set<string>,
    issue: Issue,
): void {
    const key = `${issue.category}:${issue.description}`;
    if (seen.has(key)) return;
    seen.add(key);
    target.push(issue);
}

function extractIssuesForRun(run: PageSpeedRun, seen: Set<string>): Issue[] {
    const issues: Issue[] = [];
    const label = run.strategy === "desktop" ? "Desktop" : "Mobile";
    const lcpSeverity = metricSeverity(run.audits["largest-contentful-paint"], 2_500, 4_000);
    if (lcpSeverity) {
        pushIssue(issues, seen, {
            category: run.strategy === "desktop" ? "speed" : "mobile",
            severity: lcpSeverity,
            description: `${label} Largest Contentful Paint is slow${run.audits["largest-contentful-paint"]?.displayValue ? ` (${run.audits["largest-contentful-paint"]?.displayValue})` : ""}.`,
            recommendation: "Improve server response time, compress hero media, and defer render-blocking scripts.",
        });
    }

    const serverSeverity = metricSeverity(run.audits["server-response-time"], 800, 1_800);
    if (serverSeverity) {
        pushIssue(issues, seen, {
            category: run.strategy === "desktop" ? "speed" : "mobile",
            severity: serverSeverity,
            description: `${label} server response is slow${run.audits["server-response-time"]?.displayValue ? ` (${run.audits["server-response-time"]?.displayValue})` : ""}.`,
            recommendation: "Add caching, reduce backend work, and move the site to faster hosting if needed.",
        });
    }

    const blockingSeverity = metricSeverity(run.audits["render-blocking-resources"], 200, 800);
    if (blockingSeverity) {
        pushIssue(issues, seen, {
            category: run.strategy === "desktop" ? "speed" : "mobile",
            severity: blockingSeverity,
            description: `${label} render-blocking files are delaying first paint${run.audits["render-blocking-resources"]?.displayValue ? ` (${run.audits["render-blocking-resources"]?.displayValue})` : ""}.`,
            recommendation: "Inline critical CSS, defer non-critical scripts, and trim unused third-party assets.",
        });
    }

    const tbtSeverity = metricSeverity(run.audits["total-blocking-time"], 200, 600);
    if (run.strategy === "mobile" && tbtSeverity) {
        pushIssue(issues, seen, {
            category: "mobile",
            severity: tbtSeverity,
            description: `Mobile Total Blocking Time is high${run.audits["total-blocking-time"]?.displayValue ? ` (${run.audits["total-blocking-time"]?.displayValue})` : ""}.`,
            recommendation: "Reduce long main-thread tasks, cut heavy JavaScript, and lazy-load non-critical widgets.",
        });
    }

    const clsSeverity = metricSeverity(run.audits["cumulative-layout-shift"], 0.1, 0.25);
    if (run.strategy === "mobile" && clsSeverity) {
        pushIssue(issues, seen, {
            category: "mobile",
            severity: clsSeverity,
            description: `Mobile layout shifts during load${run.audits["cumulative-layout-shift"]?.displayValue ? ` (${run.audits["cumulative-layout-shift"]?.displayValue})` : ""}.`,
            recommendation: "Reserve space for images, embeds, and banners so the layout stays stable while loading.",
        });
    }

    const tapTargetsSeverity = booleanSeverity(run.audits["tap-targets"]);
    if (run.strategy === "mobile" && tapTargetsSeverity) {
        pushIssue(issues, seen, {
            category: "mobile",
            severity: tapTargetsSeverity,
            description: "Mobile tap targets are too small or crowded.",
            recommendation: "Increase tap area size and spacing so buttons and links are easy to use on phones.",
        });
    }

    const fontSizeSeverity = booleanSeverity(run.audits["font-size"]);
    if (run.strategy === "mobile" && fontSizeSeverity) {
        pushIssue(issues, seen, {
            category: "mobile",
            severity: fontSizeSeverity,
            description: "Mobile text is too small to read comfortably.",
            recommendation: "Increase base font sizes and line height so key content is readable without zooming.",
        });
    }

    return issues;
}

function extractSeoIssues(run: PageSpeedRun, seen: Set<string>): Issue[] {
    const issues: Issue[] = [];
    const addSeoIssue = (
        auditId: string,
        description: string,
        recommendation: string,
    ) => {
        const severity = booleanSeverity(run.audits[auditId]);
        if (!severity) return;
        pushIssue(issues, seen, {
            category: "seo",
            severity,
            description,
            recommendation,
        });
    };

    addSeoIssue(
        "document-title",
        "Page title is missing or weak.",
        "Write a clear title with the main service and location.",
    );
    addSeoIssue(
        "meta-description",
        "Meta description is missing or weak.",
        "Add a concise meta description that explains the offer and next step.",
    );
    addSeoIssue(
        "robots-txt",
        "robots.txt is missing or blocking crawlers.",
        "Publish a valid robots.txt and confirm important pages can be crawled.",
    );
    addSeoIssue(
        "crawlable-anchors",
        "Some links are not crawlable by search engines.",
        "Use standard anchor links so search engines can follow important navigation paths.",
    );
    addSeoIssue(
        "image-alt",
        "Important images are missing alt text.",
        "Add descriptive alt text to key images so search engines and screen readers understand them.",
    );
    addSeoIssue(
        "link-text",
        "Some links use vague or empty anchor text.",
        "Use specific link text so visitors and search engines know what each link does.",
    );

    return issues;
}

function extractTrustIssues(run: PageSpeedRun, seen: Set<string>): Issue[] {
    const issues: Issue[] = [];
    const addTrustIssue = (
        auditId: string,
        description: string,
        recommendation: string,
    ) => {
        const severity = booleanSeverity(run.audits[auditId]);
        if (!severity) return;
        pushIssue(issues, seen, {
            category: "trust",
            severity,
            description,
            recommendation,
        });
    };

    addTrustIssue(
        "is-on-https",
        "PageSpeed detected incomplete HTTPS protection.",
        "Serve every page and asset over HTTPS only.",
    );
    addTrustIssue(
        "errors-in-console",
        "Browser console errors were detected.",
        "Fix frontend runtime errors so visitors do not hit broken interactions.",
    );
    addTrustIssue(
        "external-anchors-use-rel-noopener",
        "External links are missing rel=noopener protections.",
        "Add rel=noopener noreferrer to links that open new tabs.",
    );
    addTrustIssue(
        "geolocation-on-start",
        "The site requests location access on page load.",
        "Only request location after the visitor clearly asks for a feature that needs it.",
    );
    addTrustIssue(
        "notification-on-start",
        "The site requests notification permission on page load.",
        "Delay notification prompts until the visitor has a clear reason to opt in.",
    );

    return issues;
}

async function runPageSpeedStrategy(
    url: string,
    strategy: Strategy,
    apiKey: string,
): Promise<PageSpeedRun> {
    const endpoint = new URL(PAGE_SPEED_ENDPOINT);
    endpoint.searchParams.set("url", url);
    endpoint.searchParams.set("strategy", strategy);
    endpoint.searchParams.set("key", apiKey);
    for (const category of PAGE_SPEED_CATEGORIES) {
        endpoint.searchParams.append("category", category);
    }

    const response = await fetch(endpoint.toString(), {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(45_000),
    });

    const payloadText = await response.text();
    const payload = payloadText ? JSON.parse(payloadText) as {
        lighthouseResult?: {
            finalDisplayedUrl?: string;
            fetchTime?: string;
            categories?: Record<string, { score?: number | null }>;
            audits?: Record<string, unknown>;
        };
    } : {};

    if (!response.ok) {
        throw new Error(`PageSpeed request failed (${response.status})`);
    }

    const lighthouseResult = payload.lighthouseResult;
    if (!lighthouseResult?.categories || !lighthouseResult.audits) {
        throw new Error(`PageSpeed response missing Lighthouse data for ${strategy}`);
    }

    const audits = Object.fromEntries(
        Object.entries(lighthouseResult.audits)
            .map(([id, audit]) => [id, normalizeAudit(id, audit)])
            .filter((entry): entry is [string, Audit] => Boolean(entry[1])),
    );

    return {
        strategy,
        finalUrl: lighthouseResult.finalDisplayedUrl || url,
        fetchTime: lighthouseResult.fetchTime ?? null,
        performance: readCategoryScore(lighthouseResult.categories, "performance"),
        seo: readCategoryScore(lighthouseResult.categories, "seo"),
        accessibility: readCategoryScore(lighthouseResult.categories, "accessibility"),
        bestPractices: readCategoryScore(lighthouseResult.categories, "best-practices"),
        audits,
    };
}

export function hasPageSpeedApiKey(): boolean {
    return Boolean(process.env.GOOGLE_PAGESPEED_API_KEY?.trim());
}

export async function runPageSpeedScan(url: string): Promise<PageSpeedScan> {
    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY?.trim();
    if (!apiKey) {
        throw new Error("GOOGLE_PAGESPEED_API_KEY is not configured");
    }

    const [desktopResult, mobileResult] = await Promise.allSettled([
        runPageSpeedStrategy(url, "desktop", apiKey),
        runPageSpeedStrategy(url, "mobile", apiKey),
    ]);
    const desktop = desktopResult.status === "fulfilled" ? desktopResult.value : null;
    const mobile = mobileResult.status === "fulfilled" ? mobileResult.value : null;

    if (!desktop && !mobile) {
        const reasons = [desktopResult, mobileResult]
            .filter((result): result is PromiseRejectedResult => result.status === "rejected")
            .map((result) =>
                result.reason instanceof Error ? result.reason.message : "unknown PageSpeed error",
            );
        throw new Error(reasons.join("; "));
    }

    const seen = new Set<string>();
    const issues = [
        ...(desktop ? extractIssuesForRun(desktop, seen) : []),
        ...(mobile ? extractIssuesForRun(mobile, seen) : []),
        ...(desktop ? extractSeoIssues(desktop, seen) : mobile ? extractSeoIssues(mobile, seen) : []),
        ...(desktop ? extractTrustIssues(desktop, seen) : mobile ? extractTrustIssues(mobile, seen) : []),
    ];

    return {
        finalUrl: mobile?.finalUrl || desktop?.finalUrl || url,
        desktop,
        mobile,
        issues,
        partial: !(desktop && mobile),
        metrics: {
            source: "google-pagespeed-api",
            partial: !(desktop && mobile),
            desktop: {
                finalUrl: desktop?.finalUrl ?? null,
                fetchTime: desktop?.fetchTime ?? null,
                performance: desktop?.performance ?? null,
                seo: desktop?.seo ?? null,
                accessibility: desktop?.accessibility ?? null,
                bestPractices: desktop?.bestPractices ?? null,
                lcp: desktop?.audits["largest-contentful-paint"]?.displayValue ?? null,
                tbt: desktop?.audits["total-blocking-time"]?.displayValue ?? null,
                serverResponse: desktop?.audits["server-response-time"]?.displayValue ?? null,
            },
            mobile: {
                finalUrl: mobile?.finalUrl ?? null,
                fetchTime: mobile?.fetchTime ?? null,
                performance: mobile?.performance ?? null,
                seo: mobile?.seo ?? null,
                accessibility: mobile?.accessibility ?? null,
                bestPractices: mobile?.bestPractices ?? null,
                lcp: mobile?.audits["largest-contentful-paint"]?.displayValue ?? null,
                tbt: mobile?.audits["total-blocking-time"]?.displayValue ?? null,
                cls: mobile?.audits["cumulative-layout-shift"]?.displayValue ?? null,
            },
        },
    };
}

export function scoreFromPageSpeed(
    pageSpeed: PageSpeedScan,
    heuristicTrustScore?: number,
): ScoreSummary {
    const desktopRun = pageSpeed.desktop ?? pageSpeed.mobile;
    const mobileRun = pageSpeed.mobile ?? pageSpeed.desktop;

    if (!desktopRun || !mobileRun) {
        throw new Error("PageSpeed scan did not return any usable run");
    }

    const speed = clampScore(desktopRun.performance);
    const mobile = clampScore(mobileRun.performance);
    const seoRuns = [pageSpeed.desktop?.seo, pageSpeed.mobile?.seo].filter(
        (value): value is number => typeof value === "number",
    );
    const seo = clampScore(
        seoRuns.reduce((sum, value) => sum + value, 0) / seoRuns.length,
    );
    const trustRuns = [
        pageSpeed.desktop
            ? (pageSpeed.desktop.bestPractices + pageSpeed.desktop.accessibility) / 2
            : null,
        pageSpeed.mobile
            ? (pageSpeed.mobile.bestPractices + pageSpeed.mobile.accessibility) / 2
            : null,
    ].filter((value): value is number => typeof value === "number");
    const lighthouseTrust = clampScore(
        trustRuns.reduce((sum, value) => sum + value, 0) / trustRuns.length,
    );
    const trust = typeof heuristicTrustScore === "number"
        ? clampScore(lighthouseTrust * 0.75 + heuristicTrustScore * 0.25)
        : lighthouseTrust;
    const overall = clampScore((speed + mobile + seo + trust) / 4);

    return {
        speed,
        mobile,
        seo,
        trust,
        overall,
        grade: gradeFromOverall(overall),
    };
}
