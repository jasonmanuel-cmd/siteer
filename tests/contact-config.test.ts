import { test } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/contact/route";

test("missing email configuration returns unavailable, never a false success", async () => {
  const previous = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    const result = await POST(new Request("https://siteer.dev/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ firstName: "Fixture", email: "fixture@example.invalid" }) }));
    assert.equal(result.status, 503);
    assert.equal((await result.json()).success, undefined);
  } finally {
    if (previous === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous;
  }
});
