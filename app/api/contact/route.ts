import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, businessName, phone, email, message } = body;

  if (!firstName || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  // TODO: wire Resend when RESEND_API_KEY is set in Vercel env vars
  console.log("[contact]", {
    firstName,
    businessName,
    phone,
    email,
    message: message?.slice(0, 200),
  });

  return NextResponse.json({ success: true });
}
