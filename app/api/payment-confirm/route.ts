import { NextResponse } from "next/server";
import { z } from "zod";
import { quickAuditOffer } from "@/lib/offers";
import { resolveAppUrl } from "@/lib/appUrl";
import { logPayment } from "@/lib/googleSheets";
import { getInternalNotificationRecipients, sendResendEmail } from "@/lib/resend";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import {
    isStatelessReportToken,
    isValidStatelessReportToken,
    verifyPaymentConfirmToken,
} from "@/lib/reportToken";

export const runtime = "nodejs";

const PaymentConfirmSchema = z.object({
    reportToken: z.string().min(1),
    email: z.string().email(),
    confirmToken: z.string().min(1),
});

export async function POST(request: Request) {
    try {
        const body = PaymentConfirmSchema.parse(await request.json());
        const email = body.email.trim().toLowerCase();
        const isValidToken = isStatelessReportToken(body.reportToken)
            ? isValidStatelessReportToken(body.reportToken)
            : false;

        if (isStatelessReportToken(body.reportToken)) {
            if (!isValidToken) {
                throw new Error("Invalid report token");
            }
        } else {
            const supabaseAdmin = getSupabaseAdmin();
            const { data: report } = await supabaseAdmin
                .from("reports")
                .select("public_token")
                .eq("public_token", body.reportToken)
                .single();

            if (!report?.public_token) {
                throw new Error("Report not found");
            }
        }

        if (!verifyPaymentConfirmToken(body.confirmToken, body.reportToken, email)) {
            throw new Error("Invalid payment confirmation token");
        }

        const appUrl = resolveAppUrl(request);
        const reportUrl = `${appUrl}/scan/${body.reportToken}?paid=true`;

        await logPayment({
            email,
            reportToken: body.reportToken,
            amountCents: quickAuditOffer.priceCents,
            status: "completed_redirect",
        });

        if (process.env.RESEND_API_KEY) {
            try {
                await sendResendEmail({
                    to: getInternalNotificationRecipients(),
                    subject: `Paid ${quickAuditOffer.name} Redirect — ${email}`,
                    html: `
                        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
                            <div style="background:#0f172a;padding:24px 28px;border-radius:12px 12px 0 0">
                                <div style="color:#3ee28f;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px">SiteER — Payment Return</div>
                                <h2 style="color:#eef7ff;margin:0;font-size:20px">${quickAuditOffer.name} appears completed</h2>
                            </div>
                            <div style="background:#1e293b;padding:24px 28px;border-radius:0 0 12px 12px">
                                <table style="border-collapse:collapse;width:100%;font-size:14px">
                                    <tr><td style="padding:8px 0;color:#94a3b8;width:130px">Buyer Email</td><td style="padding:8px 0;color:#6ee7ff"><a href="mailto:${email}" style="color:#6ee7ff">${email}</a></td></tr>
                                    <tr><td style="padding:8px 0;color:#94a3b8">Report Token</td><td style="padding:8px 0;color:#eef7ff;font-family:monospace;font-size:12px">${body.reportToken}</td></tr>
                                </table>
                                <div style="margin-top:20px">
                                    <a href="${reportUrl}" style="display:inline-block;background:linear-gradient(135deg,#ff4d5e,#ffb15c);color:#1b080a;font-weight:700;padding:12px 22px;border-radius:8px;text-decoration:none;font-size:14px">
                                        View Their Paid Report →
                                    </a>
                                </div>
                            </div>
                        </div>
                    `,
                });
            } catch (notificationError) {
                console.warn(
                    "[/api/payment-confirm] Resend notification failed:",
                    notificationError instanceof Error ? notificationError.message : "Unknown email error",
                );
            }
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Payment confirmation failed";
        console.error("[/api/payment-confirm] Error:", message);
        return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }
}
