import { NextResponse } from "next/server";
import { ScanError, scanWebsite } from "@/lib/scanner";

export const runtime = "nodejs";
export const maxDuration = 20;
let active = 0;
let windowStart = 0;
let requests = 0;
const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex", "Referrer-Policy": "no-referrer" };

export async function POST(request: Request) {
  const respond = (body: unknown, status: number) => NextResponse.json(body, { status, headers });
  if (request.headers.get("origin") !== new URL(request.url).origin) return respond({ error: "Open the scanner on this website to run a scan." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return respond({ error: "Send a JSON website address." }, 415);
  // A process-wide ceiling also limits callers who spoof forwarding headers.
  // Production needs a distributed edge limit across server instances (see README).
  if (Date.now() - windowStart > 60_000) { windowStart = Date.now(); requests = 0; }
  if (active >= 3 || requests >= 20) return respond({ error: "The scanner is busy. Please try again in a minute." }, 429);
  requests++; active++;
  try {
    const reader = request.body?.getReader();
    if (!reader) return respond({ error: "Enter a website address." }, 400);
    let size = 0; const chunks: Uint8Array[] = [];
    try {
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        size += value.length;
        if (size > 4096) { await reader.cancel(); return respond({ error: "Request is too large." }, 413); }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }
    let body: unknown;
    try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
    catch { return respond({ error: "Send a valid website address." }, 400); }
    if (!body || typeof body !== "object" || !("url" in body) || typeof body.url !== "string") return respond({ error: "Enter a website address." }, 400);
    return respond(await scanWebsite(body.url.trim()), 200);
  } catch (error) {
    return respond({ error: error instanceof ScanError ? error.message : "The scan could not finish. Please try again." }, error instanceof ScanError ? error.status : 500);
  } finally { active--; }
}
