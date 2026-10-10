import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "5 Website Mistakes Killing Your Local Business (And How to Fix Them)",
  description:
    "Most local business websites share the same five critical mistakes. Find out what they are and how to fix them to turn your site into a customer-generating machine.",
  alternates: {
    canonical:
      "https://siteer.dev/blog/local-business-website-mistakes",
  },
};

export default function BlogPost1() {
  return (
    <>
      <SiteHeader />
      <main>
        <article>
          {/* Header */}
          <section
            style={{
              padding: "72px 0 48px",
              borderBottom: "1px solid rgba(255,255,255,.06)",
            }}
          >
            <div className="er-container" style={{ maxWidth: 760 }}>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    background: "rgba(255,77,94,.12)",
                    border: "1px solid rgba(255,77,94,.3)",
                    color: "var(--er-red)",
                    borderRadius: 12,
                    padding: "3px 10px",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Website Tips
                </span>
                <span style={{ color: "var(--er-muted-2)", fontSize: 13 }}>
                  September 12, 2026
                </span>
                <span style={{ color: "var(--er-muted-2)", fontSize: 13 }}>
                  · 7 min read
                </span>
              </div>
              <h1
                style={{
                  fontSize: "clamp(28px, 5vw, 44px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                  marginBottom: 20,
                }}
              >
                5 Website Mistakes Killing Your Local Business (And How to Fix
                Them)
              </h1>
              <p
                style={{
                  color: "var(--er-muted)",
                  fontSize: 18,
                  lineHeight: 1.65,
                }}
              >
                After auditing more than 200 local business websites in the
                Bakersfield area, we see the same five mistakes over and over.
                Each one is quietly costing you calls and inquiries every week —
                and every single one is fixable.
              </p>
            </div>
          </section>

          {/* Body */}
          <section style={{ padding: "48px 0 80px" }}>
            <div className="er-container" style={{ maxWidth: 760 }}>
              <div
                style={{
                  color: "var(--er-muted)",
                  fontSize: 16,
                  lineHeight: 1.8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 32,
                }}
              >
                <p>
                  Let&apos;s be direct: most small business websites aren&apos;t just
                  &quot;not working&quot; — they&apos;re actively turning customers away.
                  The good news is that the same errors appear on nearly every
                  site we audit, which means the fixes are well-known and
                  achievable without rebuilding anything from scratch.
                </p>

                <div>
                  <h2
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "var(--er-text)",
                      marginBottom: 12,
                    }}
                  >
                    Mistake #1: Your Phone Number Isn&apos;t Clickable on Mobile
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    This is the single most common issue we find, and the most
                    baffling. Someone searches for &quot;plumber near me,&quot; finds your
                    site, sees your phone number — and then has to manually dial
                    those 10 digits because the number isn&apos;t linked.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    On mobile, people expect one tap to call. If your number is
                    just plain text, 40–60% of mobile visitors who see it won&apos;t
                    bother dialing manually. That&apos;s not an estimate — it&apos;s what
                    the data shows when businesses switch from plain text to a
                    tap-to-call link.
                  </p>
                  <div
                    style={{
                      background: "rgba(62,226,143,.06)",
                      border: "1px solid rgba(62,226,143,.2)",
                      borderRadius: 8,
                      padding: "16px 20px",
                    }}
                  >
                    <strong style={{ color: "var(--er-green)", display: "block", marginBottom: 6 }}>
                      The Fix:
                    </strong>
                    Wrap every phone number on your site in an anchor tag:{" "}
                    <code
                      style={{
                        background: "rgba(255,255,255,.08)",
                        padding: "2px 6px",
                        borderRadius: 4,
                        fontSize: 14,
                        fontFamily: "monospace",
                        color: "var(--er-cyan)",
                      }}
                    >
                      &lt;a href=&quot;tel:+16615694244&quot;&gt;(661) 569-4244&lt;/a&gt;
                    </code>
                    . Done.
                  </div>
                </div>

                <div>
                  <h2
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "var(--er-text)",
                      marginBottom: 12,
                    }}
                  >
                    Mistake #2: Your Page Takes Longer Than 3 Seconds to Load
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    Google has published data on this: 53% of mobile users
                    abandon a site that takes more than three seconds to load.
                    And yet, when we audit local business sites, the average
                    mobile load time we see is 8–11 seconds.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    This matters for two reasons. First, you lose the visitor
                    before they even see your content. Second, Google uses page
                    speed as a ranking signal — slow sites are pushed down in
                    search results, so fewer people find you in the first place.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    The most common causes are uncompressed images (a 3MB photo
                    on your homepage takes seconds to download on a cell
                    connection), render-blocking scripts loaded in the page
                    header, and no caching configured on the server.
                  </p>
                  <div
                    style={{
                      background: "rgba(62,226,143,.06)",
                      border: "1px solid rgba(62,226,143,.2)",
                      borderRadius: 8,
                      padding: "16px 20px",
                    }}
                  >
                    <strong style={{ color: "var(--er-green)", display: "block", marginBottom: 6 }}>
                      The Fix:
                    </strong>
                    Run your site through Google PageSpeed Insights
                    (pagespeed.web.dev). Compress every image using a tool like
                    Squoosh or TinyPNG before uploading. If you&apos;re on WordPress,
                    install a caching plugin like WP Rocket or W3 Total Cache.
                    Move third-party scripts to load after the main content.
                  </div>
                </div>

                <div>
                  <h2
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "var(--er-text)",
                      marginBottom: 12,
                    }}
                  >
                    Mistake #3: Missing or Generic Meta Title and Description
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    Your meta title is what appears as the clickable blue link
                    in Google search results. Your meta description is the short
                    paragraph under it. Together, they determine whether someone
                    clicks your result or scrolls past it.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    We see two common failures: the meta title is either missing
                    (defaulting to something like &quot;Home – WordPress&quot; or &quot;Welcome
                    to Our Website&quot;), or it&apos;s the business name with no
                    indication of what the business does or where it operates.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    A title like &quot;Smith&apos;s Plumbing&quot; tells Google nothing useful.
                    A title like &quot;Emergency Plumber in Bakersfield, CA |
                    Smith&apos;s Plumbing&quot; tells Google — and your potential customers
                    — exactly what you do and where.
                  </p>
                  <div
                    style={{
                      background: "rgba(62,226,143,.06)",
                      border: "1px solid rgba(62,226,143,.2)",
                      borderRadius: 8,
                      padding: "16px 20px",
                    }}
                  >
                    <strong style={{ color: "var(--er-green)", display: "block", marginBottom: 6 }}>
                      The Fix:
                    </strong>
                    Write a title tag in the format: [Primary Keyword] in
                    [City] | [Business Name]. Keep it under 60 characters.
                    Write a meta description of 140–160 characters that
                    describes what you do, mentions Bakersfield, and includes a
                    call to action like &quot;Call today for a free estimate.&quot;
                  </div>
                </div>

                <div>
                  <h2
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "var(--er-text)",
                      marginBottom: 12,
                    }}
                  >
                    Mistake #4: No Local Business Schema Markup
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    Schema markup is invisible code you add to your website that
                    tells Google exactly what your business is, where it&apos;s
                    located, what it does, when it&apos;s open, and how to contact
                    it. Without it, Google has to guess — and when Google
                    guesses, it often gets things wrong or simply doesn&apos;t show
                    your information in the rich snippets that appear in search
                    results.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    For a local service business, the LocalBusiness schema type
                    is the most important. It can help you appear in the &quot;local
                    pack&quot; — the map and three-business block that appears at the
                    top of local search results. That placement is worth
                    significantly more traffic than a standard blue-link result.
                  </p>
                  <div
                    style={{
                      background: "rgba(62,226,143,.06)",
                      border: "1px solid rgba(62,226,143,.2)",
                      borderRadius: 8,
                      padding: "16px 20px",
                    }}
                  >
                    <strong style={{ color: "var(--er-green)", display: "block", marginBottom: 6 }}>
                      The Fix:
                    </strong>
                    Add a JSON-LD LocalBusiness schema block to your homepage.
                    Include your business name, address, phone, hours, service
                    type, and URL. Use Google&apos;s Rich Results Test tool to
                    verify it works correctly.
                  </div>
                </div>

                <div>
                  <h2
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "var(--er-text)",
                      marginBottom: 12,
                    }}
                  >
                    Mistake #5: Weak or Missing Call-to-Action
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    Here&apos;s a question: when someone lands on your homepage, is
                    it immediately obvious what you want them to do next? Is
                    there a clear button or link that says &quot;Call Now,&quot; &quot;Get a
                    Free Estimate,&quot; or &quot;Book an Appointment?&quot; Is it visible
                    without scrolling?
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    If not, you&apos;re relying on visitors to figure out on their
                    own what to do — and most won&apos;t. They&apos;ll leave and call your
                    competitor who made it obvious. Research consistently shows
                    that a single, prominent call-to-action above the fold
                    outperforms pages with multiple small links or no clear
                    action button.
                  </p>
                  <p>
                    This isn&apos;t about being pushy. It&apos;s about making it easy.
                    When a customer wants to call you, the path should be
                    frictionless: they see your site, they see the button, they
                    tap, and they&apos;re calling. Every extra step between seeing
                    your site and contacting you costs you conversions.
                  </p>
                  <div
                    style={{
                      background: "rgba(62,226,143,.06)",
                      border: "1px solid rgba(62,226,143,.2)",
                      borderRadius: 8,
                      padding: "16px 20px",
                      marginTop: 16,
                    }}
                  >
                    <strong style={{ color: "var(--er-green)", display: "block", marginBottom: 6 }}>
                      The Fix:
                    </strong>
                    Place one primary CTA button in your header or hero section
                    — above the fold, every time. Use action language: &quot;Call
                    Now,&quot; &quot;Get Your Free Quote,&quot; &quot;Book Online.&quot; Make it a
                    contrasting color that stands out from your background.
                    Don&apos;t put three CTAs and hope one works — pick one primary
                    action and make it unmissable.
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(110,231,255,.05)",
                    border: "1px solid rgba(110,231,255,.2)",
                    borderRadius: 12,
                    padding: "28px 24px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "var(--er-cyan)",
                      marginBottom: 12,
                    }}
                  >
                    Does Your Site Have These Problems?
                  </h3>
                  <p style={{ marginBottom: 20 }}>
                    The fastest way to find out is the free SiteER scan. Enter
                    your URL and we&apos;ll check your site against 20 checkpoints —
                    including all five mistakes listed above — in about 60
                    seconds.
                  </p>
                  <a
                    href="/#diagnosis"
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                      color: "#19070a",
                      borderRadius: 8,
                      padding: "12px 24px",
                      fontWeight: 700,
                      fontSize: 15,
                      textDecoration: "none",
                    }}
                  >
                    Scan My Site Free →
                  </a>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
