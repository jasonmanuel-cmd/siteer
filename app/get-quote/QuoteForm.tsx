"use client";

import Link from "next/link";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import { offers, websiteAddress, type OfferId } from "@/lib/plans";

const plans = [
  {
    id: "free",
    ...offers.free,
    color: "rgba(62,226,143,.05)",
    border: "1px solid rgba(62,226,143,.25)",
    accentColor: "var(--er-green)",
    selectedBorder: "2px solid var(--er-green)",
    selectedBg: "rgba(62,226,143,.1)",
    badge: undefined,
    features: ["Manual review of your public website", "Top issues and next steps by email"],
  },
  {
    id: "report",
    ...offers.report,
    badge: undefined,
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
    ...offers.fixpack,
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
] as const;

export default function QuoteForm({
  initialPlan,
  initialWebsite,
}: {
  initialPlan: OfferId;
  initialWebsite: string;
}) {
  const [selected, setSelected] = useState<OfferId>(initialPlan);
  const [form, setForm] = useState({
    firstName: "",
    businessName: "",
    websiteUrl: initialWebsite,
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const [websiteError, setWebsiteError] = useState("");

  const selectedPlan = plans.find((p) => p.id === selected)!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const websiteUrl = websiteAddress(form.websiteUrl);
    if (!websiteUrl) {
      setWebsiteError("Enter a valid website address, such as example.com.");
      return;
    }
    setWebsiteError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          websiteUrl,
          plan: selected,
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
                {selected === "free" ? " review. No payment is needed." : " order and send a payment link."}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link
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
                </Link>
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
                out within one business day. For paid plans, you’ll receive a payment link after Jason confirms your request.
              </p>
            </div>

            <div
              className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12"
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
                        type="button"
                        aria-pressed={isSelected}
                        disabled={status === "submitting"}
                        onClick={() => setSelected(plan.id)}
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
                  {selected === "free" ? "We’ll email you about your review." : "Jason will confirm your request and send a payment link."}
                </p>

                <form onSubmit={handleSubmit}>
                  <div
                    className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
                  >
                    <div>
                      <label htmlFor="firstName" style={labelStyle}>
                        First Name <span style={{ color: "var(--er-red)" }}>*</span>
                      </label>
                      <input
                        required
                        style={inputStyle}
                        id="firstName"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        placeholder="Jason"
                      />
                    </div>
                    <div>
                      <label htmlFor="businessName" style={labelStyle}>Business Name</label>
                      <input
                        style={inputStyle}
                        id="businessName"
                        value={form.businessName}
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                        placeholder="Acme Plumbing"
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label htmlFor="websiteUrl" style={labelStyle}>
                      Website URL <span style={{ color: "var(--er-red)" }}>*</span>
                    </label>
                    <input
                      required
                      inputMode="url"
                      autoComplete="url"
                      aria-invalid={Boolean(websiteError)}
                      aria-describedby={websiteError ? "website-error" : undefined}
                      style={inputStyle}
                      id="websiteUrl"
                        value={form.websiteUrl}
                      onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                      placeholder="https://yourbusiness.com"
                    />
                    {websiteError && <p id="website-error" role="alert">{websiteError}</p>}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label htmlFor="email" style={labelStyle}>
                      Email <span style={{ color: "var(--er-red)" }}>*</span>
                    </label>
                    <input
                      required
                      type="email"
                      style={inputStyle}
                      id="email"
                        value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@yourbusiness.com"
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label htmlFor="phone" style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      style={inputStyle}
                      id="phone"
                        value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(661) 555-0000"
                    />
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label htmlFor="message" style={labelStyle}>Anything else we should know?</label>
                    <textarea
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical" }}
                      id="message"
                        value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="e.g. We get very little traffic from Google…"
                    />
                  </div>

                  {status === "error" && (
                    <div role="alert"
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
