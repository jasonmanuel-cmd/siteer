import { LAST_UPDATED_LABEL, SITE_AUTHOR_NAME } from "@/lib/siteSeo";

type PageSignalBarProps = {
    primaryCtaHref: string;
    primaryCtaLabel: string;
    secondaryCtaHref?: string;
    secondaryCtaLabel?: string;
};

export default function PageSignalBar({
    primaryCtaHref,
    primaryCtaLabel,
    secondaryCtaHref,
    secondaryCtaLabel,
}: PageSignalBarProps) {
    return (
        <div className="er-signal-bar">
            <div className="er-signal-copy">
                <span className="er-signal-pill">Bakersfield-built for local business websites</span>
                <span>Updated {LAST_UPDATED_LABEL}</span>
                <span>By {SITE_AUTHOR_NAME}</span>
            </div>
            <div className="er-signal-actions">
                <a href={primaryCtaHref} className="er-button-primary">
                    {primaryCtaLabel}
                </a>
                {secondaryCtaHref && secondaryCtaLabel ? (
                    <a href={secondaryCtaHref} className="er-button-secondary">
                        {secondaryCtaLabel}
                    </a>
                ) : null}
            </div>
        </div>
    );
}
