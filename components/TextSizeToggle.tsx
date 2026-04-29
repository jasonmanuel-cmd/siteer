"use client";

import { useEffect, useState } from "react";

export default function TextSizeToggle() {
    const [isLargeText, setIsLargeText] = useState(false);

    useEffect(() => {
        // Restore from localStorage on mount
        const saved = localStorage.getItem("siteer-large-text");
        if (saved === "true") {
            setIsLargeText(true);
            document.body.classList.add("large-text");
        }
    }, []);

    function toggleTextSize() {
        const newState = !isLargeText;
        setIsLargeText(newState);
        
        if (newState) {
            document.body.classList.add("large-text");
            localStorage.setItem("siteer-large-text", "true");
        } else {
            document.body.classList.remove("large-text");
            localStorage.setItem("siteer-large-text", "false");
        }
    }

    return (
        <button
            onClick={toggleTextSize}
            aria-label={isLargeText ? "Switch to normal text size" : "Switch to larger text size"}
            title={isLargeText ? "Normal text" : "Larger text (easier to read)"}
            style={{
                position: "fixed",
                bottom: 24,
                right: 24,
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: isLargeText ? "var(--er-green)" : "rgba(255, 77, 94, 0.2)",
                border: `2px solid ${isLargeText ? "var(--er-green)" : "var(--er-red)"}`,
                color: isLargeText ? "#1b080a" : "var(--er-red)",
                fontSize: "1.2rem",
                fontWeight: 900,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 40,
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
        >
            {isLargeText ? "A" : "A"}
        </button>
    );
}
