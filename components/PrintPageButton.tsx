"use client";

export default function PrintPageButton() {
    return (
        <button
            onClick={() => window.print()}
            style={{
                background: "linear-gradient(135deg,#ff4d5e,#ffb15c)",
                color: "#1b080a",
                border: "none",
                borderRadius: 8,
                padding: "10px 22px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "-0.02em",
            }}
        >
            Download / Print PDF
        </button>
    );
}
