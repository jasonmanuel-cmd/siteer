import { NextResponse } from "next/server";
import { z } from "zod";
import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";
import { normalizeUrl } from "@/lib/validators";
import { checkIndexingFiles, fetchHtml } from "@/lib/scan/fetchHtml";
import { analyzeHtml } from "@/lib/scan/analyzeHtml";
import { scoreFromIssues } from "@/lib/scan/score";
import { estimateLoss } from "@/lib/scan/money";

export const runtime = "nodejs";

const QuickScanSchema = z.object({
    url: z.string().trim().min(1).max(2048),
});

function severityRank(severity: string): number {
    if (severity === "high") return 3;
    if (severity === "medium") return 2;
    return 1;
}

function mergeIssues<T extends { category: string; description: string }>(...issueSets: T[][]): T[] {
    const seen = new Set<string>();
    const merged: T[] = [];
    for (const issueSet of issueSets) {
        for (const issue of issueSet) {
            const key = `${issue.category}:${issue.description}`;
            if (seen.has(key)) continue;
            seen.add(key);
            merged.push(issue);
        }
    }
    return merged;
}

/**
 * Quick diagnostic endpoint — runs a comprehensive SEO/performance audit
 * without requiring Supabase or authentication. Used for the free preview.
 */
export async function POST(request: Request) {
    const ip = getClientIp(request);
    const limiter = await consumeRateLimit(`quick-scan:${ip}`, 6, 60_000);
    if (!limiter.ok) {
        return NextResponse.json(
            { error: "Rate limit exceeded. Try again in a minute." },
            { status: 429 },
        );
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const parsed = QuickScanSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: "URL is required." }, { status: 400 });
    }

    const url = normalizeUrl(parsed.data.url);

    try {
        const fetched = await fetchHtml(url);
        const analysis = analyzeHtml(fetched);
        const issues = analysis.issues;
        const scoreResult = scoreFromIssues(issues);
        const moneyLeak = estimateLoss({ overallScore: scoreResult.overall });

        const categories = {
            seo: issues.filter((i) => i.category === "seo").length,
            performance: issues.filter((i) => i.category === "speed").length,
            mobile: issues.filter((i) => i.category === "mobile").length,
            trust: issues.filter((i) => i.category === "trust").length,
        };

        const highPriority = issues.filter((i) => i.severity === "high").slice(0, 5);

        return NextResponse.json({
            url,
            score: scoreResult.overall,
            grade: scoreResult.grade,
            scores: {
                speed: scoreResult.speed,
                mobile: scoreResult.mobile,
                seo: scoreResult.seo,
                trust: scoreResult.trust,
                overall: scoreResult.overall,
            },
            totalIssues: issues.length,
            categories,
            moneyLeak,
            highPriority,
            scanTime: Date.now(),
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Scan failed.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
