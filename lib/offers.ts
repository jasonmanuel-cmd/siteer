export const quickAuditOffer = {
    name: "Quick ER Audit",
    priceCents: 2000,
    priceLabel: "$20",
    description: "Human review of your SiteER scan with a concise action plan and PDF summary.",
} as const;

export const fixPackDepositOffer = {
    name: "ER Fix Pack Deposit",
    priceCents: 20_000,
    priceLabel: "$200",
    description: "Required deposit to reserve implementation work. Applied to your final project total.",
} as const;
