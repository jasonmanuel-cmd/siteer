import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { firstName, businessName, phone, email, message } = body;

    if (!firstName || !email) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // To enable email delivery, add your email service here.
    // Example with Resend (resend.com — free tier available):
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "SiteER Contact <noreply@siteer.dev>",
    //   to: "jasonm@coaibakersfield.com",
    //   subject: `New contact from ${firstName}${businessName ? ` — ${businessName}` : ""}`,
    //   text: `Name: ${firstName}\nBusiness: ${businessName}\nPhone: ${phone}\nEmail: ${email}\n\n${message}`,
    // });

    console.log("Contact form submission:", { firstName, businessName, phone, email, message });

    return NextResponse.json({ success: true });
}
