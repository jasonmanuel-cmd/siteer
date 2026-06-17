import http from "http";
import https from "https";

export type FetchHtmlResult = {
    ok: boolean;
    status: number;
    contentType: string;
    html: string;
    finalUrl: string;
    headers: Record<string, string>;
    ttfbMs: number;
    loadMs: number;
    sizeBytes: number;
};

const SCAN_USER_AGENT =
    "SiteERBot/1.0 (+https://www.siteer.dev) Website audit for business owners";
const HTML_LIMIT_BYTES = 1_000_000;
const MAX_REDIRECTS = 5;

type RequestMethod = "GET" | "HEAD";

type RequestResult = {
    status: number;
    headers: Record<string, string>;
    body: Buffer;
    finalUrl: string;
};

function normalizeHeaderValue(value: string | string[] | undefined): string {
    if (Array.isArray(value)) return value.join(", ");
    return value ?? "";
}

function shouldRetryOverHttp(error: unknown): boolean {
    if (!(error instanceof Error)) return false;
    const cause = "cause" in error ? String((error as Error & { cause?: unknown }).cause ?? "") : "";
    const details = `${error.message} ${cause}`;

    return /(certificate|ssl|tls|econnreset|econnrefused|enotfound|eai_again|timed out|socket disconnected|network)/i.test(details);
}

function requestUrl(
    targetUrl: string,
    method: RequestMethod,
    timeoutMs: number,
    redirectCount = 0,
): Promise<RequestResult> {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(targetUrl);
        const transport = parsedUrl.protocol === "https:" ? https : http;

        const request = transport.request(
            {
                protocol: parsedUrl.protocol,
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || undefined,
                path: `${parsedUrl.pathname}${parsedUrl.search}`,
                method,
                headers: {
                    "User-Agent": SCAN_USER_AGENT,
                    Accept: "text/html,application/xhtml+xml",
                    "Accept-Encoding": "identity",
                },
                // Force IPv4. Vercel's runtime can resolve IPv6 first and fail
                // for arbitrary external websites even when IPv4 would succeed.
                family: 4,
            },
            (response) => {
                const status = response.statusCode ?? 0;
                const location = response.headers.location;

                if (
                    location &&
                    [301, 302, 303, 307, 308].includes(status) &&
                    redirectCount < MAX_REDIRECTS
                ) {
                    response.resume();
                    const nextUrl = new URL(location, parsedUrl).toString();
                    const nextMethod = status === 303 ? "GET" : method;
                    resolve(requestUrl(nextUrl, nextMethod, timeoutMs, redirectCount + 1));
                    return;
                }

                const headers = Object.fromEntries(
                    Object.entries(response.headers).map(([key, value]) => [
                        key,
                        normalizeHeaderValue(value),
                    ]),
                ) as Record<string, string>;

                if (method === "HEAD") {
                    response.resume();
                    resolve({
                        status,
                        headers,
                        body: Buffer.alloc(0),
                        finalUrl: parsedUrl.toString(),
                    });
                    return;
                }

                const chunks: Buffer[] = [];
                let totalBytes = 0;

                response.on("data", (chunk: Buffer | string) => {
                    if (totalBytes >= HTML_LIMIT_BYTES) return;

                    const bufferChunk = Buffer.isBuffer(chunk)
                        ? chunk
                        : Buffer.from(chunk);
                    const remaining = HTML_LIMIT_BYTES - totalBytes;
                    const nextChunk =
                        bufferChunk.length > remaining
                            ? bufferChunk.subarray(0, remaining)
                            : bufferChunk;

                    chunks.push(nextChunk);
                    totalBytes += nextChunk.length;
                });

                response.on("end", () => {
                    resolve({
                        status,
                        headers,
                        body: Buffer.concat(chunks),
                        finalUrl: parsedUrl.toString(),
                    });
                });
            },
        );

        request.setTimeout(timeoutMs, () => {
            request.destroy(new Error("Request timed out"));
        });

        request.on("error", (error) => {
            reject(error);
        });

        request.end();
    });
}

async function fetchUrlWithFallback(
    targetUrl: string,
    method: RequestMethod,
    timeoutMs: number,
): Promise<RequestResult> {
    try {
        return await requestUrl(targetUrl, method, timeoutMs);
    } catch (error) {
        const parsedUrl = new URL(targetUrl);
        if (parsedUrl.protocol === "https:" && shouldRetryOverHttp(error)) {
            parsedUrl.protocol = "http:";
            return requestUrl(parsedUrl.toString(), method, timeoutMs);
        }

        throw error;
    }
}

export async function fetchHtml(url: string): Promise<FetchHtmlResult> {
    const start = Date.now();

    const result = await fetchUrlWithFallback(url, "GET", 12_000);
    const ttfbMs = Date.now() - start;
    const contentType = result.headers["content-type"] || "";
    const html = contentType.includes("text/html")
        ? result.body.toString("utf8")
        : "";

    return {
        ok: result.status >= 200 && result.status < 300,
        status: result.status,
        contentType,
        html,
        finalUrl: result.finalUrl,
        headers: result.headers,
        ttfbMs,
        loadMs: Date.now() - start,
        sizeBytes: Buffer.byteLength(html, "utf8"),
    };
}

async function safeHead(url: string): Promise<boolean> {
    try {
        const response = await fetchUrlWithFallback(url, "HEAD", 5_000);
        return response.status >= 200 && response.status < 300;
    } catch {
        return false;
    }
}

export async function checkIndexingFiles(
    finalUrl: string,
): Promise<{ hasRobots: boolean; hasSitemap: boolean }> {
    const base = new URL(finalUrl);
    const robotsUrl = new URL("/robots.txt", base).toString();
    const sitemapUrl = new URL("/sitemap.xml", base).toString();

    const [hasRobots, hasSitemap] = await Promise.all([
        safeHead(robotsUrl),
        safeHead(sitemapUrl),
    ]);

    return { hasRobots, hasSitemap };
}
