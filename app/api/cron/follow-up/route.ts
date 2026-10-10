import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : authHeader.trim();
  const secret = process.env.CRON_SECRET?.trim();

  if (!secret || token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: fetch follow_up_emails from Supabase and send via Resend
  return NextResponse.json({ ok: true, message: "Follow-up cron ran" });
}
