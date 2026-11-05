import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { analyze, normalizeTarget, publicAddress, requestOptions, requestPage, resolvePublic, scanWebsite, LIMITS } from "../lib/scanner";

test("blocks private, metadata, encoded and special-use addresses", () => {
  for (const ip of ["127.0.0.1", "10.1.2.3", "172.16.0.1", "192.168.1.2", "169.254.169.254", "100.64.0.1", "0.0.0.0", "224.0.0.1", "192.0.2.1", "198.18.0.1", "::1", "::", "fc00::1", "fe80::1", "::ffff:8.8.8.8", "2002:0808:0808::1", "2001:db8::1"]) assert.equal(publicAddress(ip), false, ip);
  for (const url of ["http://2130706433", "http://0x7f000001", "http://127.1", "http://[::1]", "https://localhost", "http://metadata.google.internal", "file:///etc/passwd", "ftp://example.com", "https://user:pass@example.com", "https://example.com:444", "https://example.com?token=secret", "https://example.com/#secret", "https://example.com\\@127.0.0.1"]) assert.throws(() => normalizeTarget(url), url);
  assert.equal(normalizeTarget("siteer.dev/path").href, "https://siteer.dev/path");
  assert.equal(publicAddress("8.8.8.8"), true);
  assert.equal(publicAddress("2606:4700:4700::1111"), true);
});

test("rejects mixed DNS answers and pins connection IP with original TLS identity", async () => {
  const url = new URL("https://siteer.dev/");
  await assert.rejects(resolvePublic(url, (async () => [{ address: "8.8.8.8", family: 4 }, { address: "127.0.0.1", family: 4 }]) as never));
  const address = await resolvePublic(url, (async () => [{ address: "8.8.8.8", family: 4 }]) as never);
  const options = requestOptions(url, address);
  assert.equal(options.hostname, "8.8.8.8"); assert.equal(options.servername, "siteer.dev");
  assert.equal(options.headers.Host, "siteer.dev"); assert.equal(options.agent, false);
  assert.equal("lookup" in options, false); assert.equal("Authorization" in options.headers, false);
});

test("redirect destination is revalidated before any further fetch", async () => {
  let calls = 0;
  const deps = { resolve: async () => ({ address: "8.8.8.8", family: 4 }), request: async () => { calls++; return { status: 302, headers: { location: "http://169.254.169.254/latest/meta-data" }, body: Buffer.alloc(0) }; } };
  await assert.rejects(scanWebsite("https://siteer.dev", deps)); assert.equal(calls, 1);
  calls = 0; deps.request = async () => { calls++; return { status: 302, headers: { location: "/again" }, body: Buffer.alloc(0) }; };
  await assert.rejects(scanWebsite("https://siteer.dev", deps), /too many redirects/); assert.equal(calls, 4);
});

test("changed DNS on redirect is rejected; HTTPS downgrade is rejected", async () => {
  let resolves = 0; let fetches = 0;
  const deps = { resolve: async (url: URL) => { resolves++; return resolvePublic(url, (async () => [{ address: resolves === 1 ? "8.8.8.8" : "127.0.0.1", family: 4 }]) as never); }, request: async () => { fetches++; return { status: 302, headers: { location: "/next" }, body: Buffer.alloc(0) }; } };
  await assert.rejects(scanWebsite("https://siteer.dev", deps), /public/); assert.equal(fetches, 1);
  await assert.rejects(scanWebsite("https://siteer.dev", { resolve: async () => ({ address: "8.8.8.8", family: 4 }), request: async () => ({ status: 302, headers: { location: "http://siteer.dev" }, body: Buffer.alloc(0) }) }), /insecure/);
});

test("HTML findings use parsed markup, do not execute scripts or invent scores", () => {
  const findings = analyze(Buffer.from('<html lang="en"><title>Fixture</title><meta name="description" content="Fixture"><meta name="viewport" content="width=device-width"><!-- <h1>fake</h1> --><h1>Real</h1><img src="x"><img alt=""><script>throw new Error("never execute")</script><script type="application/ld+json">invalid</script></html>'), new URL("https://siteer.dev"));
  assert.equal(findings.length, 11);
  assert.match(findings.find(f => f.name === "Main heading")!.evidence, /^1 H1/);
  assert.match(findings.find(f => f.name === "Image alt attributes")!.evidence, /^1 of 2/);
  assert.equal(findings.find(f => f.name === "Structured data")!.status, "review");
  assert.ok(!JSON.stringify(findings).includes("never execute"));
});

test("successful scan includes real observations and sanitizes network errors", async () => {
  const report = await scanWebsite("siteer.dev", { resolve: async () => ({ address: "8.8.8.8", family: 4 }), request: async () => ({ status: 200, headers: {}, body: Buffer.from("<h1>Fixture</h1>") }) });
  assert.equal(report.bytes, 16); assert.equal(report.findings.length, 11); assert.equal("score" in report, false);
  await assert.rejects(scanWebsite("siteer.dev", { resolve: async () => { throw Error("secret credentials"); }, request: requestPage }), error => error instanceof Error && !error.message.includes("secret"));
});

test("overall deadline includes DNS and prevents late DNS completion from fetching", async (context) => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  let finishDns!: (value: { address: string; family: number }) => void;
  let requests = 0;
  const pending = scanWebsite("siteer.dev", {
    resolve: () => new Promise(resolve => { finishDns = resolve; }),
    request: async () => { requests++; return { status: 200, headers: {}, body: Buffer.from("<h1>late</h1>") }; },
  });
  context.mock.timers.tick(LIMITS.milliseconds);
  await assert.rejects(pending, /15 seconds/);
  finishDns({ address: "8.8.8.8", family: 4 });
  await Promise.resolve(); await Promise.resolve();
  assert.equal(requests, 0);
});

test("controlled HTTP fixtures enforce body, content type, status and deadline limits", async (context) => {
  // Test transport alone with explicit loopback fixture. Production always calls resolvePublic first.
  const server = http.createServer((req, res) => {
    if (req.url === "/hang") return;
    res.setHeader("Content-Type", req.url === "/json" ? "application/json" : "text/html");
    if (req.url === "/error") res.statusCode = 503;
    if (req.url === "/compressed") res.setHeader("Content-Encoding", "gzip");
    res.end(req.url === "/large" ? "x".repeat(LIMITS.bytes + 1) : "<h1>Fixture</h1>");
  });
  await new Promise<void>((resolve, reject) => { server.once("error", reject); server.listen(0, "127.0.0.1", resolve); });
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const originalRequest = http.request;
  // Redirect only this test's transport to an ephemeral fixture port. The
  // production implementation continues to force standard HTTP/HTTPS ports.
  context.mock.method(http, "request", ((options: http.RequestOptions, callback: (response: http.IncomingMessage) => void) => originalRequest({ ...options, port: address.port }, callback)) as typeof http.request);
  try {
    const fetch = (path: string, signal = AbortSignal.timeout(2000)) => requestPage(new URL(`http://fixture.example${path}`), { address: "127.0.0.1", family: 4 }, signal);
    assert.equal((await fetch("/")).status, 200);
    await assert.rejects(fetch("/large"), /1 MiB/);
    await assert.rejects(fetch("/json"), /HTML/);
    await assert.rejects(fetch("/error"), /503/);
    await assert.rejects(fetch("/compressed"), /compressed/);
    await assert.rejects(fetch("/hang", AbortSignal.timeout(50)));
  } finally { server.closeAllConnections(); await new Promise<void>(resolve => server.close(() => resolve())); }
});
