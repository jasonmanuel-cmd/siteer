import { lookup } from "node:dns/promises";
import http from "node:http";
import https from "node:https";
import ipaddr from "ipaddr.js";
import { loadBuffer } from "cheerio";

export class ScanError extends Error {
  constructor(message: string, public status = 422) { super(message); }
}
export const LIMITS = { bytes: 1_048_576, redirects: 3, milliseconds: 15_000 };
export function publicAddress(address: string): boolean {
  try {
    const ip = ipaddr.parse(address);
    if (ip.kind() === "ipv6" && (!ip.match(ipaddr.parse("2000::"), 3) || ip.match(ipaddr.parse("2001::"), 23))) return false;
    // Fail closed on mapped/transition IPv6, reserved and non-global ranges.
    return ip.range() === "unicast";
  } catch { return false; }
}
export function normalizeTarget(raw: string): URL {
  if (!raw || raw.length > 2048 || /[\s\\]/.test(raw)) throw new ScanError("Enter a valid public website address.", 400);
  let url: URL;
  try { url = new URL(/^[a-z][a-z\d+.-]*:/i.test(raw) ? raw : `https://${raw}`); }
  catch { throw new ScanError("Enter a valid public website address.", 400); }
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.port || url.search || url.hash) {
    throw new ScanError("Use HTTP or HTTPS on its standard port, without passwords, query parameters or fragments.", 400);
  }
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (ipaddr.isValid(host) ? !publicAddress(host) : !host.includes(".") || /\.(localhost|local|internal|test|invalid|onion)\.?$/i.test(host)) {
    throw new ScanError("Only public internet websites can be scanned.", 400);
  }
  return url;
}
type Address = { address: string; family: number };
export async function resolvePublic(url: URL, resolve = lookup): Promise<Address> {
  const host = url.hostname.replace(/^\[|\]$/g, "");
  const addresses = ipaddr.isValid(host)
    ? [{ address: host, family: ipaddr.parse(host).kind() === "ipv4" ? 4 : 6 }]
    : await resolve(host, { all: true, verbatim: true });
  if (!addresses.length || addresses.some(a => !publicAddress(a.address))) throw new ScanError("This address does not resolve exclusively to public internet servers.");
  return addresses[0];
}
// Connect directly to the validated IP. Host and TLS identity remain the original
// hostname; no second DNS lookup, pooled connection, proxy, cookies or credentials.
export function requestOptions(url: URL, address: Address) {
  const host = url.hostname.replace(/^\[|\]$/g, "");
  return {
    hostname: address.address, family: address.family, port: url.protocol === "https:" ? 443 : 80,
    path: url.pathname, method: "GET", agent: false as const, maxHeaderSize: 16384,
    servername: ipaddr.isValid(host) ? "" : host,
    headers: { Host: url.host, "User-Agent": "SiteER/1.0 (public HTML check)", Accept: "text/html", "Accept-Encoding": "identity" },
  };
}
type Page = { body: Buffer; status: number; headers: http.IncomingHttpHeaders };
export function requestPage(url: URL, address: Address, signal: AbortSignal): Promise<Page> {
  return new Promise((resolve, reject) => {
    const req = (url.protocol === "https:" ? https : http).request({ ...requestOptions(url, address), signal }, res => {
      const status = res.statusCode ?? 0;
      if ([301,302,303,307,308].includes(status)) {
        resolve({ body: Buffer.alloc(0), status, headers: res.headers }); res.destroy(); return;
      }
      if (status < 200 || status >= 300) { reject(new ScanError(`The website returned HTTP ${status}. No report was generated.`)); res.destroy(); return; }
      if (!/^text\/html(?:;|$)/i.test(res.headers["content-type"] ?? "")) { reject(new ScanError("The address did not return an HTML page.")); res.destroy(); return; }
      if (res.headers["content-encoding"] && res.headers["content-encoding"] !== "identity") { reject(new ScanError("The website returned unsupported compressed content. No report was generated.")); res.destroy(); return; }
      let bytes = 0; const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => {
        bytes += chunk.length;
        if (bytes > LIMITS.bytes) { reject(new ScanError("The page exceeds the 1 MiB scan limit. No partial report was generated.")); res.destroy(); }
        else chunks.push(chunk);
      });
      res.on("end", () => resolve({ body: Buffer.concat(chunks), status, headers: res.headers }));
      res.on("error", reject);
      res.on("aborted", () => reject(new ScanError("The website closed the connection before the page finished.")));
    });
    req.on("error", reject); req.end();
  });
}
export type Finding = { name: string; status: "observed" | "review"; evidence: string; advice: string };
export function analyze(body: Buffer, url: URL) {
  const $ = loadBuffer(body);
  const findings: Finding[] = [];
  const check = (name: string, ok: boolean, evidence: string, advice: string) => findings.push({ name, status: ok ? "observed" : "review", evidence, advice });
  check("HTTPS", url.protocol === "https:", `Final page uses ${url.protocol.slice(0,-1).toUpperCase()}.`, "Use HTTPS. This check is not a security audit.");
  const title = $("title").first().text().trim();
  check("Page title", !!title, title ? "A non-empty title element was found." : "No non-empty title element found.", "Write a descriptive title for this page.");
  const description = $('meta[name="description" i]').attr("content")?.trim();
  check("Meta description", !!description, description ? "A non-empty meta description was found." : "No non-empty meta description found.", "Add a useful summary of this page.");
  const h1 = $("h1").length;
  check("Main heading", h1 === 1, `${h1} H1 elements in the returned HTML.`, "Review the heading structure and give this page a clear main heading.");
  const viewport = $('meta[name="viewport" i]').attr("content") ?? "";
  check("Mobile viewport", /width\s*=\s*device-width/i.test(viewport), /width\s*=\s*device-width/i.test(viewport) ? "Device-width viewport declaration found." : "No device-width viewport declaration found.", "Set a responsive viewport and manually test mobile layout.");
  const lang = $("html").attr("lang")?.trim();
  check("Document language", !!lang, lang ? "A non-empty html lang attribute was found." : "No document language found.", "Declare the page language for assistive technology.");
  const images = $("img"); const missing = images.filter((_, el) => $(el).attr("alt") === undefined).length;
  check("Image alt attributes", missing === 0, `${missing} of ${images.length} images lack an alt attribute. Empty alt text may be appropriate for decorative images.`, "Review image purpose and write meaningful alternatives where needed.");
  const canonical = $('link[rel~="canonical" i]').attr("href")?.trim();
  check("Canonical declaration", !!canonical, canonical ? "A canonical href was found; its destination was not fetched or validated." : "No canonical href found.", "Review whether a canonical URL is appropriate for this page.");
  const robots = $('meta[name="robots" i]').map((_, el) => $(el).attr("content") ?? "").get().join(",");
  check("Indexing directive", !/\b(noindex|none)\b/i.test(robots), /\b(noindex|none)\b/i.test(robots) ? "An HTML noindex directive was found." : "No HTML noindex directive found; indexing is not guaranteed.", "Confirm whether this page should appear in search results.");
  const phone = $('a[href^="tel:" i]').length;
  check("Phone links", phone > 0, `${phone} telephone links found. Numbers and delivery were not tested.`, "If phone calls matter to this page, provide a working click-to-call link.");
  const schema = $('script[type="application/ld+json" i]'); let valid = 0;
  schema.each((_, el) => { try { const value: unknown = JSON.parse($(el).text()); if (value && typeof value === "object") valid++; } catch { /* observation below */ } });
  check("Structured data", valid > 0, `${valid} of ${schema.length} JSON-LD blocks parse as objects or arrays. Schema meaning was not validated.`, "Review structured data relevance and validate it with a schema testing tool.");
  return findings;
}
export async function scanWebsite(raw: string, deps = { resolve: resolvePublic, request: requestPage }) {
  let url = normalizeTarget(raw); const started = Date.now();
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new ScanError("The website did not finish within 15 seconds. Try again later.", 504)); }, LIMITS.milliseconds); });
  try {
    return await Promise.race([timeout, (async () => {
      for (let redirects = 0; redirects <= LIMITS.redirects; redirects++) {
        controller.signal.throwIfAborted();
        const address = await deps.resolve(url);
        controller.signal.throwIfAborted();
        const page = await deps.request(url, address, controller.signal);
        if ([301,302,303,307,308].includes(page.status)) {
          if (redirects === LIMITS.redirects || !page.headers.location) throw new ScanError("The website has too many redirects or a missing redirect destination.");
          const next = normalizeTarget(new URL(page.headers.location, url).href);
          if (url.protocol === "https:" && next.protocol !== "https:") throw new ScanError("The website redirects from HTTPS to insecure HTTP.");
          url = next; continue;
        }
        return { url: url.href, scannedAt: new Date().toISOString(), bytes: page.body.length, fetchMilliseconds: Date.now() - started, redirects, findings: analyze(page.body, url) };
      }
      throw new ScanError("Unable to finish this scan.");
    })()]);
  } catch (error) {
    if (error instanceof ScanError) throw error;
    throw new ScanError("The website could not be reached securely. Check the address or try again later.");
  } finally { clearTimeout(timer); controller.abort(); }
}
export type ScanReport = Awaited<ReturnType<typeof scanWebsite>>;
