type SendResendEmailParams = {
    html: string;
    subject: string;
    to: string[];
};

const DEFAULT_SENDER_EMAIL = "SiteER <reports@siteer.dev>";
const DEFAULT_NOTIFICATION_RECIPIENTS = [
    "jasonm@coaibakersfield.com",
    "frankh@coaibakersfield.com",
];

export function getInternalNotificationRecipients(): string[] {
    const configured = process.env.CONTACT_EMAIL?.trim().toLowerCase();
    return Array.from(
        new Set(
            [configured, ...DEFAULT_NOTIFICATION_RECIPIENTS]
                .filter((value): value is string => Boolean(value))
                .map((value) => value.toLowerCase()),
        ),
    );
}

function normalizeSenderAddress(address: string): string {
    const trimmed = address.trim();
    if (trimmed.includes("@")) {
        return trimmed;
    }

    // Recover from env values saved as "user.domain.tld" instead of "user@domain.tld".
    const parts = trimmed.split(".");
    if (parts.length === 3 && parts.every(Boolean)) {
        return `${parts[0]}@${parts[1]}.${parts[2]}`;
    }

    return trimmed;
}

export function resolveSenderEmail(rawValue = process.env.SENDER_EMAIL): string {
    const trimmed = rawValue?.trim();
    if (!trimmed) {
        return DEFAULT_SENDER_EMAIL;
    }

    const bracketMatch = trimmed.match(/^(.*)<([^<>]+)>$/);
    if (!bracketMatch) {
        return normalizeSenderAddress(trimmed);
    }

    const displayName = bracketMatch[1].trim();
    const normalizedAddress = normalizeSenderAddress(bracketMatch[2]);
    return displayName ? `${displayName} <${normalizedAddress}>` : normalizedAddress;
}

export async function sendResendEmail({
    html,
    subject,
    to,
}: SendResendEmailParams): Promise<string> {
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
        throw new Error("Resend is not configured.");
    }

    const senderEmail = resolveSenderEmail();

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
            from: senderEmail,
            to,
            subject,
            html,
        }),
    });

    const payload = await response.json().catch(() => null) as
        | { id?: string; message?: string; error?: string; errors?: Array<{ message?: string }> }
        | null;

    if (!response.ok) {
        const detail = payload?.message
            ?? payload?.error
            ?? payload?.errors?.[0]?.message
            ?? `Resend request failed with status ${response.status}`;
        throw new Error(`Resend request failed: ${detail}`);
    }

    if (!payload?.id) {
        throw new Error("Resend request failed: missing message id");
    }

    return payload.id;
}
