import { test } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/scan/route";

test("API rejects cross-origin, malformed, oversized and private targets without leaking details", async () => {
  const send = (body: string, origin = "https://siteer.dev", contentType = "application/json") => POST(new Request("https://siteer.dev/api/scan", { method: "POST", headers: { origin, "content-type": contentType }, body }));
  assert.equal((await send('{"url":"https://siteer.dev"}', "https://other.example")).status, 403);
  assert.equal((await send("test", "https://siteer.dev", "text/plain")).status, 415);
  assert.equal((await send("{")).status, 400);
  assert.equal((await send("{} ".repeat(2000))).status, 413);
  assert.equal((await send('{"url":42}')).status, 400);
  const response = await send('{"url":"http://169.254.169.254"}');
  assert.equal(response.status, 400);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.ok(!(await response.text()).includes("169.254"));
  let status = 0;
  for (let i = 0; i < 20; i++) status = (await send("{}")).status;
  assert.equal(status, 429);
});
