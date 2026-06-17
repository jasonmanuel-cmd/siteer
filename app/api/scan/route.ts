import { NextResponse } from "next/server";
import { z } from "zod";
import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";
import { normalizeUrl } from "@/lib/validators";
import { checkIndexingFiles, fetchHtml } from "@/lib/scan/fetchHtml";
import { analyzeHtml, type Analysis } from "@/lib/scan/analyzeHtml";
import { scoreFromIssues } from "@/lib/scan/score";
import { hasPageSpeedApiKey, runPageSpeedScan, scoreFromPageSpeed } from "@/lib/scan/pagespeed";
import { estimateLoss } from "@/lib/scan/money";
import type { Json } from "@/lib/database.types";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { createScanUnlockToken } from "@/lib/reportToken";

export const runtime = "nodejs";

const ScanSchema = z.object({
    url: z.string().min(1),
    estMonthlyVisitors: z.coerce.number().int().positive().optional(),
    estConvRate: z.coerce.number().positive().optional(),
    estAvgValue: z.coerce.number().positive().optional(),
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

export async function POST(request: Request) {
    const ip = getClientIp(request);
    const limiter = await consumeRateLimit(`scan:${ip}`, 12, 60_000);
    if (!limiter.ok) {
        return NextResponse.json(
            {
                ok: false,
                error: "Too many scans. Please wait a minute and try again.",
            },
            { status: 429 },
        );
    }

    try {
        const body = ScanSchema.parse(await request.json());
        const url = normalizeUrl(body.url);
        const pageSpeedEnabled = hasPageSpeedApiKey();
        const pageSpeed = pageSpeedEnabled
            ? await runPageSpeedScan(url).catch((error) => {
                console.warn(
                    "[/api/scan] PageSpeed fallback:",
                    error instanceof Error ? error.message : "Unknown PageSpeed error",
                );
                return null;
            })
            : null;

        let fetched: Awaited<ReturnType<typeof fetchHtml>> | null = null;
        let htmlFetchError: string | null = null;
        let analysis: Analysis = { issues: [], metrics: {} };

        try {
            fetched = await fetchHtml(url);
            const indexing = await checkIndexingFiles(fetched.finalUrl);
            analysis = analyzeHtml(fetched, indexing);
        } catch (error) {
            htmlFetchError = error instanceof Error ? error.message : "Failed to fetch HTML";
            if (!pageSpeed) throw error;
            console.warn("[/api/scan] HTML fetch fallback:", htmlFetchError);
        }

        const heuristicScores = scoreFromIssues(analysis.issues);
        const scores = pageSpeed
            ? scoreFromPageSpeed(pageSpeed, heuristicScores.trust)
            : heuristicScores;
        const source = pageSpeed ? "pagespeed" : "heuristic";
        const allIssues = pageSpeed
            ? mergeIssues(pageSpeed.issues, analysis.issues)
            : analysis.issues;
        const finalUrl = fetched?.finalUrl ?? pageSpeed?.finalUrl ?? url;
        const money = estimateLoss({
            estMonthlyVisitors: body.estMonthlyVisitors,
            estConvRate: body.estConvRate,
            estAvgValue: body.estAvgValue,
            overallScore: scores.overall,
        });
        const scanNote = pageSpeed
            ? htmlFetchError
                ? "PageSpeed-backed scores returned, but direct HTML access was limited, so some on-page findings may be missing."
                : "PageSpeed-backed scores blended with SiteER structural checks."
            : pageSpeedEnabled
                ? "Live PageSpeed data was unavailable, so this result used a structural quick check and may differ from Lighthouse."
                : "This result used a structural quick check because Google PageSpeed API is not configured in production.";
        const persistedMetrics: Record<string, Json | undefined> = {
            ...(analysis.metrics as Record<string, Json | undefined>),
            scan_source: source,
            scan_note: scanNote,
        };
        if (pageSpeed) {
            persistedMetrics.pagespeed = pageSpeed.metrics as Json;
        }
        if (fetched) {
            persistedMetrics.fetch = {
                status: fetched.status,
                contentType: fetched.contentType,
                finalUrl: fetched.finalUrl,
                ttfbMs: fetched.ttfbMs,
                loadMs: fetched.loadMs,
                sizeBytes: fetched.sizeBytes,
            };
        }
        if (htmlFetchError) {
            persistedMetrics.fetch_error = htmlFetchError;
        }
        let persistedScanId: string | null = null;
        let persistedCreatedAt: string | null = null;

        try {
            const supabaseAdmin = getSupabaseAdmin();
            let site: { id: string; url: string } | null = null;
            const { data: insertedSite, error: siteInsertError } = await supabaseAdmin
                .from("sites")
                .insert({ url: finalUrl })
                .select("id,url")
                .single();

            if (siteInsertError) {
                if (siteInsertError.code === "23505") {
                    const { data: existingSite } = await supabaseAdmin
                        .from("sites")
                        .select("id,url")
                        .eq("url", finalUrl)
                        .single();
                    site = existingSite;
                } else {
                    throw new Error(siteInsertError.message || "Failed to store site");
                }
            } else {
                site = insertedSite;
            }

            if (!site) throw new Error("Failed to store site");

            const { data: scan, error: scanError } = await supabaseAdmin
                .from("scans")
                .insert({
                    site_id: site.id,
                    overall_grade: scores.grade,
                    speed_score: scores.speed,
                    mobile_score: scores.mobile,
                    seo_score: scores.seo,
                    trust_score: scores.trust,
                    est_monthly_visitors: money.visitors,
                    est_conv_rate: money.conv,
                    est_avg_value: money.avg,
                    est_loss_pct: money.lossPct,
                    est_monthly_loss_low: money.estMonthlyLossLow,
                    est_monthly_loss_high: money.estMonthlyLossHigh,
                    metrics: persistedMetrics as Json,
                })
                .select(
                    "id,created_at,overall_grade,speed_score,mobile_score,seo_score,trust_score,est_monthly_loss_low,est_monthly_loss_high,est_loss_pct,est_monthly_visitors,est_conv_rate,est_avg_value",
                )
                .single();

            if (scanError || !scan) {
                throw new Error(scanError?.message || "Failed to store scan");
            }

            persistedScanId = scan.id;
            persistedCreatedAt = scan.created_at ?? new Date().toISOString();

            if (allIssues.length > 0) {
                const issueRows = allIssues.map((issue) => ({
                    scan_id: scan.id,
                    category: issue.category,
                    severity: issue.severity,
                    description: issue.description,
                    recommendation: issue.recommendation,
                }));

                const { error: issueError } = await supabaseAdmin
                    .from("scan_issues")
                    .insert(issueRows);

                if (issueError) {
                    throw new Error(issueError.message || "Failed to store scan issues");
                }
            }
        } catch (persistenceError) {
            console.warn(
                "[/api/scan] Persistence fallback:",
                persistenceError instanceof Error
                    ? persistenceError.message
                    : "Unknown persistence error",
            );
        }

        const statelessScanId = createScanUnlockToken({
            version: 1,
            scan: {
                id: persistedScanId ?? "stateless",
                created_at: persistedCreatedAt ?? new Date().toISOString(),
                overall_grade: scores.grade,
                speed_score: scores.speed,
                mobile_score: scores.mobile,
                seo_score: scores.seo,
                trust_score: scores.trust,
                est_monthly_loss_low: money.estMonthlyLossLow,
                est_monthly_loss_high: money.estMonthlyLossHigh,
                est_loss_pct: money.lossPct,
                est_monthly_visitors: money.visitors,
                metrics: persistedMetrics as Record<string, unknown>,
            },
            issues: persistedScanId ? [] : allIssues,
        });

        const topIssues = allIssues
            .slice()
            .sort((a, b) => severityRank(b.severity) - severityRank(a.severity))
            .slice(0, 3);

        return NextResponse.json({
            ok: true,
            scanId: statelessScanId,
            scanSource: source,
            scanNote,
            grade: scores.grade,
            scores: {
                speed: scores.speed,
                mobile: scores.mobile,
                seo: scores.seo,
                trust: scores.trust,
                overall: scores.overall,
            },
            money: {
                lossLow: money.estMonthlyLossLow,
                lossHigh: money.estMonthlyLossHigh,
                lossPct: money.lossPct,
                visitors: money.visitors,
                conv: money.conv,
                avg: money.avg,
            },
            topIssues,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Scan failed";
        const cause = error instanceof Error && "cause" in error
            ? String((error as Error & { cause?: unknown }).cause ?? "")
            : "";
        
        // Sanitize error message to not expose internal implementation
        const sanitizedError = message.includes("Supabase") || 
                               message.includes("connection") ||
                               message.includes("timeout") ||
                               message.includes("Cheerio") ||
                               message.includes("Failed to store")
            ? "Failed to process your URL. Please try again or contact support."
            : message.includes("fetch failed") ||
              message.includes("timed out") ||
              message.includes("socket") ||
              message.includes("network")
                ? "Could not fetch that website. It may block automated scans, have an SSL issue, or be temporarily down."
            : message;
        
        console.error("[/api/scan] Error:", { message, cause, error });
        return NextResponse.json({ ok: false, error: sanitizedError }, { status: 400 });
    }
}
