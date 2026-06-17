import { z } from "zod";

type ValidationCopyOptions = {
    fieldLabels?: Record<string, string>;
    fieldMessages?: Record<string, string>;
    fallback?: string;
};

function humanList(items: string[]): string {
    if (items.length <= 1) return items[0] ?? "";
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function isRequiredLikeIssue(issue: z.ZodIssue): boolean {
    if (issue.code === "invalid_type") return true;
    if (issue.code === "too_small" && "minimum" in issue) {
        return issue.minimum === 1;
    }
    return false;
}

export function formatPublicValidationError(
    error: z.ZodError,
    options: ValidationCopyOptions = {},
): string {
    const fieldLabels = options.fieldLabels ?? {};
    const fieldMessages = options.fieldMessages ?? {};
    const fallback = options.fallback ?? "Please check your information and try again.";
    const fieldKeys = Array.from(
        new Set(
            error.issues
                .map((issue) => issue.path[0])
                .filter((value): value is string => typeof value === "string" && value.length > 0),
        ),
    );

    if (fieldKeys.length === 0) {
        return fallback;
    }

    if (fieldKeys.length === 1) {
        const fieldKey = fieldKeys[0];
        return fieldMessages[fieldKey]
            ?? `Please check your ${fieldLabels[fieldKey] ?? fieldKey} and try again.`;
    }

    const fieldList = humanList(fieldKeys.map((fieldKey) => fieldLabels[fieldKey] ?? fieldKey));

    if (error.issues.every(isRequiredLikeIssue)) {
        return `Please complete ${fieldList}.`;
    }

    return `Please review ${fieldList} and try again.`;
}
