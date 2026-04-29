import crypto from "crypto";

/**
 * Generate a CSRF token for form submissions
 */
export function generateCsrfToken(): string {
    return crypto.randomBytes(32).toString("hex");
}

/**
 * Validate a CSRF token (in a real app, you'd store and retrieve these)
 */
export function validateCsrfToken(token: string): boolean {
    // For now, just validate it's a hex string of proper length (64 chars = 32 bytes)
    return /^[a-f0-9]{64}$/.test(token);
}
