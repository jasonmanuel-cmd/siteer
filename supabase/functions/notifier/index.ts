import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SENDER_EMAIL = Deno.env.get("SENDER_EMAIL") ?? "SiteER <reports@yourdomain.com>";
const APP_URL = Deno.env.get("NEXT_PUBLIC_APP_URL") ?? "https://siteer.dev";

serve(async (req) => {
    try {
        if (!RESEND_API_KEY) {
            console.error("RESEND_API_KEY not set");
            return new Response("Config Error", { status: 500 });
        }

        const { record } = await req.json();
        const email = record.email as string;
        const leadId = record.id as string;

        // Look up the report token for this lead
        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        );

        const { data: report } = await supabase
            .from("reports")
            .select("public_token")
            .eq("lead_id", leadId)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

        const reportUrl = report?.public_token
            ? `${APP_URL}/scan/${report.public_token}`
            : APP_URL;

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: SENDER_EMAIL,
                to: email,
                subject: "Your Website Health Report is Ready",
                html: `
          <h1>Your SiteER Report</h1>
          <p>We've finished analyzing your website.</p>
          <p>Click the link below to see your grade and the estimated monthly revenue you're losing.</p>
          <a href="${reportUrl}">View My Full Report</a>
          <br/><br/>
          <p>Best,<br/>The SiteER Team</p>
        `,
            }),
        });

        const data = await res.json();
        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return new Response(JSON.stringify({ error: message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
});
