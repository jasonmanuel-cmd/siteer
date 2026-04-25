"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashIntro() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = window.setTimeout(() => setVisible(false), 2600);
        return () => window.clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="splash-overlay" aria-hidden="true">
            <div className="splash-light" />
            <div className="splash-logo">
                <Image
                    src="/siteer-logo.png"
                    alt="SiteER"
                    width={420}
                    height={120}
                    priority
                    style={{ width: "min(72vw, 420px)", height: "auto" }}
                />
            </div>
        </div>
    );
}
