"use client";

interface PrintButtonProps {
    label?: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function PrintButton({ label = "Print / Save as PDF", className = "print-btn", style }: PrintButtonProps) {
    return (
        <button className={className} style={style} onClick={() => window.print()}>
            {label}
        </button>
    );
}
