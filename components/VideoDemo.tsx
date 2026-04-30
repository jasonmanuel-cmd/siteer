"use client";

import { useState } from "react";

interface VideoDemoProps {
    loomUrl?: string;
    youtubeId?: string;
    title?: string;
}

export default function VideoDemo({ loomUrl = "https://www.loom.com/embed/your-video-id", youtubeId, title = "See the SiteER Scan in Action" }: VideoDemoProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    if (!youtubeId && !loomUrl) return null;

    return (
        <div style={{ marginTop: 34, borderRadius: 24, overflow: "hidden", background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)", boxShadow: "0 20px 60px rgba(0,0,0,.16)" }}>
            {!isPlaying ? (
                <div
                    onClick={() => setIsPlaying(true)}
                    style={{
                        position: "relative",
                        paddingBottom: "56.25%",
                        background: "#000",
                        cursor: "pointer",
                        overflow: "hidden",
                    }}
                >
                    {/* Placeholder thumbnail */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(135deg, rgba(255,77,94,.2), rgba(255,177,92,.2))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            gap: 16,
                        }}
                    >
                        <div style={{ fontSize: "3.5rem", opacity: 0.8 }}>▶️</div>
                        <div style={{ color: "white", fontSize: "1.1rem", fontWeight: 700, textAlign: "center" }}>
                            {title}
                        </div>
                        <div style={{ color: "rgba(255,255,255,.7)", fontSize: "0.9rem" }}>
                            Click to watch (30 seconds)
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                    {youtubeId ? (
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ position: "absolute", top: 0, left: 0 }}
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                            title={title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ position: "absolute", top: 0, left: 0 }}
                            src={`${loomUrl}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=false`}
                            frameBorder="0"
                            allowFullScreen
                        />
                    )}
                </div>
            )}
            <div style={{ padding: 16, background: "rgba(255,255,255,.05)", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                <p style={{ color: "var(--er-muted)", fontSize: "0.9rem", margin: 0 }}>
                    💡 See exactly how the scan works. Takes 60 seconds from URL to diagnosis.
                </p>
            </div>
        </div>
    );
}
