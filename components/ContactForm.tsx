"use client";

import { useState } from "react";

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,.07)",
  border: "1px solid rgba(255,255,255,.12)",
  color: "white",
  borderRadius: 6,
  padding: "10px 14px",
  width: "100%",
  fontSize: 15,
  outline: "none",
  transition: "border-color 0.15s",
};

const labelStyle: React.CSSProperties = {
  color: "var(--er-cyan)",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: 6,
};

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    businessName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          padding: "32px 24px",
          background: "rgba(62,226,143,.08)",
          border: "1px solid rgba(62,226,143,.25)",
          borderRadius: 12,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
        <h3 style={{ color: "var(--er-green)", marginBottom: 8 }}>
          Message Received!
        </h3>
        <p style={{ color: "var(--er-muted)" }}>
          Thanks! Jason will get back to you within one business day. You can
          also reach us directly at (661) 569-4244.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={labelStyle} htmlFor="firstName">
            First Name *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder="Jason"
            value={form.firstName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="businessName">
            Business Name
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            placeholder="Acme Plumbing"
            value={form.businessName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="phone">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(661) 555-0123"
          value={form.phone}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="email">
          Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your website and what you're hoping to improve..."
          value={form.message}
          onChange={handleChange}
          style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
        />
      </div>

      {status === "error" && (
        <div
          style={{
            color: "var(--er-red)",
            background: "rgba(255,77,94,.08)",
            border: "1px solid rgba(255,77,94,.25)",
            borderRadius: 6,
            padding: "10px 14px",
            fontSize: 14,
          }}
        >
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
          color: "#19070a",
          borderRadius: 8,
          padding: "13px 28px",
          fontWeight: 700,
          fontSize: 15,
          border: "none",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          opacity: status === "loading" ? 0.7 : 1,
          transition: "opacity 0.15s",
        }}
      >
        {status === "loading" ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}
