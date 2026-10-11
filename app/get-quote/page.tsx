"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const plans = [
  {
    id: "report",
    name: "Deep ER Report",
    price: "$49",
    color: "rgba(110,231,255,.05)",
    border: "1px solid rgba(110,231,255,.25)",
    accentColor: "var(--er-cyan)",
    selectedBorder: "2px solid var(--er-cyan)",
    selectedBg: "rgba(110,231,255,.1)",
    features: [
      "Full 20-point manual + automated audit",
      "PDF report with annotated screenshots",
      "Priority fix roadmap",
      "SEO & content gap analysis",
      "Delivered within 2 business days",
    ],
  },
  {
    id: "fixpack",
    name: "Fix Pack",
    price: "$497",
    color: "linear-gradient(160deg, rgba(255,77,94,.08), rgba(255,177,92,.06))",
    border: "1px solid rgba(255,177,92,.3)",
    accentColor: "var(--er-orange)",
    selectedBorder: "2px solid var(--er-orange)",
    selectedBg: "rgba(255,177,92,.08)",
    badge: "Most Popular",
    features: [
      "Everything in the Deep ER Report",
      "We implement all the fixes",
      "Speed optimization (images, caching, code)",
      "Mobile layout fixes",
      "SEO meta tags & schema markup",
      "5–7 business day turnaround",
      "14-day money-back guarantee",
    ],
  },
];

export default function GetQuotePage() {
  const [selected, setSelected] = useState<"report" | "fixpack">("fixpack");
  const [form, setForm] = useState({
    firstName: "",
    businessName: "",
    websiteUrl: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const selectedPlan = plans.find((p) => p.id === selected)!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          plan: selectedPlan.name,
          planPrice: selectedPlan.price,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,.07)",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 8,
    padding: "11px 14px",
    color: "var(--er-text)",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--er-cyan)",
    marginBottom: 6,
  };

  if (status === "success") {
    return (
      <>
        <SiteHeader />
        <main>
          <section style={{ padding: "100px 0", textAlign: "center" }}>
            <div className="er-container" style={{ maxWidth: 560 }}>
              <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
              <h1
                style={{
                  fontSize: "clamp(26px, 5vw, 40px)",
                  fontWeight: 800,
                  marginBottom: 16,
                }}
              >
                Request Received!
              </h1>
              <p
                style={{
                  color: "var(--er-muted)",
                  fontSize: 17,
                  lineHeight: 1.7,
                  marginBottom: 32,
                }}
              >
                Thanks{form.firstName ? `, ${form.firstName}` : ""}! Jason will
                review your request and reach out within one business day to
                confirm your{" "}
                <strong style={{ color: "var(--er-text)" }}>
                  {selectedPlan.name}
                </strong>{" "}
                order and send a payment link.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="/"
                  style={{
                    background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                    color: "#19070a",
                    borderRadius: 8,
                    padding: "13px 24px",
                    fontWeight: 700,
                    fontSize: 15,
                    textDecoration: "none",
                  }}
                >
                  Back to Home
                </a>
                <a
                  href="/contact"
                  style={{
                    border: "1px solid rgba(255,255,255,.2)",
                    color: "var(--er-text)",
                    borderRadius: 8,
                    padding: "13px 24px",
                    fontWeight: 600,
                    fontSize: 15,
                    textDecoration: "none",
                  }}
                >
                  Contact Jason
                </a>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section style={{ padding: "72px 0 80px" }}>
          <div className="er-container">
            {/* Header */}
            <div style={{ marginBottom: 52, maxWidth: 600 }}>
              <h1
                style={{
                  fontSize: "clamp(30px, 5vw, 48px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  marginBottom: 14,
                }}
              >
                Get Started
              </h1>
              <p
                style={{
                  color: "var(--er-muted)",
                  fontSize: 17,
                  lineHeight: 1.65,
                }}
              >
                Choose your plan, tell us about your site, and Jason will reach
                out within one business day to confirm and send a payment link.
                No charge until you approve.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 48,
                alignItems: "start",
              }}
            >
              {/* Left — plan picker */}
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--er-muted-2)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  Select your plan
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {plans.map((plan) => {
                    const isSelected = selected === plan.id;
                    return (
                      <button
                        key={plan.id}
                        onClick={() => setSelected(plan.id as "report" | "fixpack")}
                        style={{
                          background: isSelected ? plan.selectedBg : plan.color,
                          border: isSelected ? plan.selectedBorder : plan.border,
                          borderRadius: 14,
                          padding: "22px 24px",
                          textAlign: "left",
                          cursor: "pointer",
                          position: "relative",
                          transition: "border 0.15s",
                          width: "100%",
                        }}
                      >
                        {plan.badge && (
                          <div
                            style={{
                              position: "absolute",
                              top: -10,
                              right: 16,
                              background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                              color: "#19070a",
                              fontSize: 10,
                              fontWeight: 800,
                              padding: "3px 10px",
                              borderRadius: 20,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                            }}
                          >
                            {plan.badge}
                          </div>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                          <div>
                            <div
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: plan.accentColor,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                marginBottom: 4,
                              }}
                            >
                              {plan.name}
                            </div>
                            <div
                              style={{
                                fontSize: 32,
                                fontWeight: 800,
                                color: "var(--er-text)",
                                lineHeight: 1,
                              }}
                            >
                              {plan.price}
                            </div>
                          </div>
                          <div
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: "50%",
                              border: isSelected
                                ? `2px solid ${plan.accentColor}`
                                : "2px solid rgba(255,255,255,.2)",
                              background: isSelected ? plan.accentColor : "transparent",
                              flexShrink: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isSelected && (
                              <span style={{ color: "#08131f", fontSize: 12, fontWeight: 900 }}>✓</span>
                            )}
                          </div>
                        </div>
                        <ul style={{ listStyle: "none" }}>
                          {plan.features.map((f) => (
                            <li
                              key={f}
                              style={{
                                color: "var(--er-muted)",
                                fontSize: 13,
                                padding: "3px 0",
                                display: "flex",
                                gap: 8,
                              }}
                            >
                              <span style={{ color: "var(--er-green)", flexShrink: 0 }}>✓</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </div>

                {/* Guarantee note */}
                <div
                  style={{
                    marginTop: 20,
                    padding: "14px 16px",
                    background: "rgba(62,226,143,.05)",
                    border: "1px solid rgba(62,226,143,.15)",
                    borderRadius: 10,
                    fontSize: 13,
                    color: "var(--er-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  🛡️{" "}
                  <strong style={{ color: "var(--er-green)" }}>
                    Fix Pack includes a 14-day money-back guarantee.
                  </strong>{" "}
                  If your audit score doesn&apos;t improve by 20+ points, you
                  get a full refund.
                </div>
              </div>

              {/* Right — form */}
              <div
                style={{
                  background: "var(--er-card)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 16,
                  padding: "36px 32px",
                }}
              >
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
                  Your Details
                </h2>
                <p
                  style={{
                    color: "var(--er-muted)",
                    fontSize: 14,
                    marginBottom: 28,
                  }}
                >
                  No payment yet — Jason will confirm and send a link.
                </p>

                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                      marginBottom: 16,
                    }}
                  >
                    <div>
                      <label style={labelStyle}>
                        First Name <span style={{ color: "var(--er-red)" }}>*</span>
                      </label>
                      <input
                        required
                        style={inputStyle}
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        placeholder="Jason"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Business Name</label>
                      <input
                        style={inputStyle}
                        value={form.businessName}
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                        placeholder="Acme Plumbing"
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>
                      Website URL <span style={{ color: "var(--er-red)" }}>*</span>
                    </label>
                    <input
                      required
                      type="url"
                      style={inputStyle}
                      value={form.websiteUrl}
                      onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                      placeholder="https://yourbusiness.com"
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>
                      Email <span style={{ color: "var(--er-red)" }}>*</span>
                    </label>
                    <input
                      required
                      type="email"
                      style={inputStyle}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@yourbusiness.com"
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      style={inputStyle}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(661) 555-0000"
                    />
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={labelStyle}>Anything else we should know?</label>
                    <textarea
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical" }}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="e.g. We get very little traffic from Google…"
                    />
                  </div>

                  {status === "error" && (
                    <div
                      style={{
                        marginBottom: 16,
                        padding: "12px 14px",
                        background: "rgba(255,77,94,.1)",
                        border: "1px solid rgba(255,77,94,.3)",
                        borderRadius: 8,
                        color: "var(--er-red)",
                        fontSize: 14,
                      }}
                    >
                      Something went wrong. Please try again or email{" "}
                      <a
                        href="mailto:jasonm@coaibakersfield.com"
                        style={{ color: "var(--er-cyan)" }}
                      >
                        jasonm@coaibakersfield.com
                      </a>
                      .
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    style={{
                      width: "100%",
                      background:
                        selected === "fixpack"
                          ? "linear-gradient(135deg, #ff4d5e, #ffb15c)"
                          : "rgba(110,231,255,.15)",
                      border:
                        selected === "fixpack"
                          ? "none"
                          : "1px solid rgba(110,231,255,.3)",
                      color: selected === "fixpack" ? "#19070a" : "var(--er-cyan)",
                      borderRadius: 8,
                      padding: "14px",
                      fontWeight: 700,
                      fontSize: 16,
                      cursor: status === "submitting" ? "not-allowed" : "pointer",
                      opacity: status === "submitting" ? 0.7 : 1,
                    }}
                  >
                    {status === "submitting"
                      ? "Sending…"
                      : `Request ${selectedPlan.name} — ${selectedPlan.price}`}
                  </button>

                  <p
                    style={{
                      textAlign: "center",
                      color: "var(--er-muted-2)",
                      fontSize: 12,
                      marginTop: 12,
                    }}
                  >
                    No payment until Jason confirms. Replies within 1 business day.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
