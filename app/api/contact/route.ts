import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isOfferId, offers, websiteAddress } from "@/lib/plans";

function field(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;
  const firstName = field(body.firstName, 100).replace(/[\r\n]+/g, " ");
  const businessName = field(body.businessName, 150).replace(/[\r\n]+/g, " ");
  const email = field(body.email, 254);
  const phone = field(body.phone, 40);
  const message = field(body.message, 4000);
  const website = websiteAddress(body.websiteUrl);
  const plan = isOfferId(body.plan)
    ? offers[body.plan]
    : Object.values(offers).find((offer) => offer.name === body.plan);

  if (!firstName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
  }
  if ((body.plan && !plan) || (plan && !website)) {
    return NextResponse.json({ error: "Choose a plan and enter a valid website address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: "Contact delivery is unavailable." }, { status: 503 });
  }

  const subject = `${plan ? `New ${plan.name} request (${plan.price}) from` : "New contact from"} ${firstName}${businessName ? ` — ${businessName}` : ""}`;
  const text = [
    plan && `Plan: ${plan.name} — ${plan.price}`,
    `Name: ${firstName}`,
    businessName && `Business: ${businessName}`,
    website && `Website: ${website}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    message && `\nMessage:\n${message}`,
  ].filter(Boolean).join("\n");

  try {
    const { data, error } = await new Resend(apiKey).emails.send({
      from: process.env.SITEER_EMAIL_FROM?.trim() || "SiteER <noreply@callharbison.com>",
      to: ["chaoticallyorganizedai@gmail.com"],
      replyTo: email,
      subject,
      text,
    });
    if (error || !data?.id) {
      console.error("[contact] Delivery rejected", error?.name);
      return NextResponse.json({ error: "Unable to send your request." }, { status: 502 });
    }
  } catch {
    console.error("[contact] Delivery request failed");
    return NextResponse.json({ error: "Unable to send your request." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
