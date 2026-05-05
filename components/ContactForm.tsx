"use client";
import { useState } from "react";

const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,.07)",
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 12,
    padding: "14px 16px",
    color: "white",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    outline: "none",
};

const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: ".1em",
    textTransform: "uppercase",
    color: "var(--er-cyan)",
    marginBottom: 8,
};

export default function ContactForm() {
    const [form, setForm] = useState({ firstName: "", businessName: "", phone: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setStatus(res.ok ? "sent" : "error");
        } catch {
            setStatus("error");
        }
    }

    if (status === "sent") {
        return (
            <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(62,226,143,.15)", border: "2px solid var(--er-green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "1.8rem" }}>✓</div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: 10 }}>Message received!</h3>
                <p style={{ color: "var(--er-muted)", lineHeight: 1.65 }}>
                    Jason responds same business day.<br />
                    You can also call directly: <a href="tel:+16615694244" style={{ color: "var(--er-cyan)", fontWeight: 700 }}>(661) 569-4244</a>
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                    <label style={labelStyle}>First Name</label>
                    <input name="firstName" required value={form.firstName} onChange={handleChange} placeholder="First name" style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Business Name</label>
                    <input name="businessName" value={form.businessName} onChange={handleChange} placeholder="Business name" style={inputStyle} />
                </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                    <label style={labelStyle}>Phone</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(661) 000-0000" style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Email</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@yourbiz.com" style={inputStyle} />
                </div>
            </div>
            <div>
                <label style={labelStyle}>Message</label>
                <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What's your biggest digital challenge right now?"
                    style={{ ...inputStyle, resize: "vertical" }}
                />
            </div>
            <button
                type="submit"
                disabled={status === "sending"}
                style={{ width: "100%", padding: "18px", borderRadius: 14, border: 0, fontWeight: 800, fontSize: "1rem", color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", cursor: status === "sending" ? "not-allowed" : "pointer", opacity: status === "sending" ? 0.7 : 1, boxShadow: "0 18px 42px rgba(255,77,94,.28)" }}
            >
                {status === "sending" ? "Sending…" : "Send Message →"}
            </button>
            {status === "error" && (
                <p style={{ color: "var(--er-red)", fontSize: "0.88rem", textAlign: "center" }}>
                    Something went wrong. Call us directly at <a href="tel:+16615694244" style={{ color: "var(--er-red)", fontWeight: 700 }}>(661) 569-4244</a>.
                </p>
            )}
            <p style={{ fontSize: "0.8rem", color: "var(--er-muted-2)", textAlign: "center", lineHeight: 1.6 }}>
                Or skip the form — call <a href="tel:+16615694244" style={{ color: "var(--er-muted)" }}>(661) 569-4244</a> directly.<br />
                Submissions go to jasonm@coaibakersfield.com
            </p>
        </form>
    );
}
