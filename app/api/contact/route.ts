import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "SiteER <noreply@callharbison.com>";
const TO = "jasonm@coaibakersfield.com";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, businessName, phone, email, message, plan, planPrice, websiteUrl } = body;

  if (!firstName || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.log("[contact] RESEND_API_KEY not set, skipping email", { firstName, email });
    return NextResponse.json({ success: true });
  }

  const subject = plan
    ? `New order: ${plan} (${planPrice}) from ${firstName}${businessName ? ` — ${businessName}` : ""}`
    : `New contact from ${firstName}${businessName ? ` — ${businessName}` : ""}`;

  const text = [
    plan ? `PLAN: ${plan} — ${planPrice}` : null,
    `Name: ${firstName}`,
    businessName ? `Business: ${businessName}` : null,
    websiteUrl ? `Website: ${websiteUrl}` : null,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    message ? `\nMessage:\n${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: email,
    subject,
    text,
  });

  return NextResponse.json({ success: true });
}
