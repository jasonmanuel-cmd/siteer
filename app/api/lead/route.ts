import crypto from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const LeadSchema = z.object({
    email: z.string().email(),
    scanId: z.string().uuid().or(z.string().min(1)),
});

export async function POST(request: Request) {
    const ip = getClientIp(request);
    const limiter = consumeRateLimit(`lead:${ip}`, 20, 60_000);
    if (!limiter.ok) {
        return NextResponse.json(
            {
                ok: false,
                error: "Too many submissions. Please wait and try again.",
            },
            { status: 429 },
        );
    }

    try {
        const supabaseAdmin = getSupabaseAdmin();
        const body = LeadSchema.parse(await request.json());
        const email = body.email.trim().toLowerCase();

        let lead: { id: string; email: string } | null = null;
        const { data: inserted, error: insertError } = await supabaseAdmin
            .from("leads")
            .insert({ email })
            .select("id,email")
            .single();

        if (insertError) {
            if (insertError.code === "23505") {
                const { data: existing } = await supabaseAdmin
                    .from("leads")
                    .select("id,email")
                    .eq("email", email)
                    .single();
                lead = existing;
            } else {
                throw new Error(insertError.message || "Failed to capture lead");
            }
        } else {
            lead = inserted;
        }

        if (!lead) throw new Error("Failed to capture lead");

        const token = crypto.randomBytes(16).toString("hex");

        const { data: report, error: reportError } = await supabaseAdmin
            .from("reports")
            .insert({
                scan_id: body.scanId,
                lead_id: lead.id,
                public_token: token,
            })
            .select("public_token")
            .single();

        if (reportError || !report) {
            throw new Error(reportError?.message || "Failed to create report link");
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        return NextResponse.json({
            ok: true,
            reportUrl: `${appUrl}/scan/${report.public_token}`,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Lead capture failed";
        
        // Sanitize error message to not expose internal implementation
        const sanitizedError = message.includes("Supabase") ||
                               message.includes("connection") ||
                               message.includes("timeout")
            ? "Failed to capture your email. Please try again."
            : message;
        
        console.error("[/api/lead] Error:", message);
        return NextResponse.json({ ok: false, error: sanitizedError }, { status: 400 });
    }
}
