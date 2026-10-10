import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Why Your Mobile Page Speed Is Driving Away Customers",
  description:
    "Over 60% of local searches happen on phones. If your site loads slowly on mobile, you're losing customers to Google and to your competitors. Here's how to fix it.",
  alternates: {
    canonical: "https://siteer.dev/blog/mobile-page-speed-fixes",
  },
};

export default function BlogPost2() {
  return (
    <>
      <SiteHeader />
      <main>
        <article>
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
                    background: "rgba(255,177,92,.12)",
                    border: "1px solid rgba(255,177,92,.3)",
                    color: "var(--er-orange)",
                    borderRadius: 12,
                    padding: "3px 10px",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Speed & Performance
                </span>
                <span style={{ color: "var(--er-muted-2)", fontSize: 13 }}>
                  September 4, 2026
                </span>
                <span style={{ color: "var(--er-muted-2)", fontSize: 13 }}>
                  · 6 min read
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
                Why Your Mobile Page Speed Is Driving Away Customers
              </h1>
              <p
                style={{
                  color: "var(--er-muted)",
                  fontSize: 18,
                  lineHeight: 1.65,
                }}
              >
                Speed isn&apos;t a techie concern — it&apos;s a revenue concern. If your
                site loads in eight seconds on a phone, over half the people who
                clicked are already gone. Here&apos;s what&apos;s causing it and how to
                fix it without hiring a developer.
              </p>
            </div>
          </section>

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
                  When we run a scan on a local business website and see a
                  mobile load time above five seconds, we know what comes next:
                  the owner is frustrated that Google isn&apos;t sending them traffic,
                  that the site &quot;isn&apos;t working,&quot; that they paid to have it built
                  and it hasn&apos;t paid off. Page speed is usually the first thing
                  to look at, and it&apos;s almost always fixable.
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
                    The Numbers Are Not on Your Side
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    Google&apos;s own research shows that 53% of mobile visitors
                    abandon a page if it takes more than three seconds to load.
                    Not three minutes — three seconds. And for every additional
                    second of delay, conversion rates drop by roughly 7%.
                  </p>
                  <p>
                    Consider what that means for a local plumbing business with
                    a site that loads in 9 seconds on mobile. If 100 people
                    found that site through Google in a month, 53 left
                    immediately. Of the remaining 47, many more dropped off
                    during the additional loading time. The business is
                    effectively paying to exist on the web but capturing only a
                    fraction of its potential customers.
                  </p>
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
                    Google Uses Speed as a Ranking Factor
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    Speed doesn&apos;t just affect the visitors who arrive on your
                    site — it affects whether they find you at all. Google
                    introduced Core Web Vitals as official ranking signals. These
                    metrics measure how fast your largest content loads (LCP),
                    how responsive the page is to first interaction (FID/INP),
                    and how stable your layout is as it loads (CLS).
                  </p>
                  <p>
                    A slow site with poor Core Web Vitals scores will rank lower
                    than a faster competitor, even if your content and
                    reputation are better. This is particularly impactful for
                    local searches — the businesses in the top three local pack
                    positions get the overwhelming majority of clicks.
                  </p>
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
                    The Most Common Speed Culprits
                  </h2>

                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--er-text)",
                      marginBottom: 8,
                      marginTop: 20,
                    }}
                  >
                    1. Unoptimized Images
                  </h3>
                  <p style={{ marginBottom: 12 }}>
                    This is the most common cause by far. A professional
                    photographer delivers a beautiful 8MB JPEG. It gets uploaded
                    to the website as-is. Now every visitor on a cell connection
                    has to download 8 megabytes just to see your homepage photo.
                  </p>
                  <p>
                    The fix is compressing images before uploading. A 3000px
                    wide photo displayed at 600px wide on a website should be
                    resized and compressed to under 150KB without visible quality
                    loss. Tools like Squoosh (squoosh.app) are free and make
                    this easy.
                  </p>

                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--er-text)",
                      marginBottom: 8,
                      marginTop: 20,
                    }}
                  >
                    2. No Browser Caching
                  </h3>
                  <p>
                    Without caching, every time someone visits your site their
                    browser downloads everything from scratch — every image,
                    every script, every stylesheet. With caching configured
                    properly, returning visitors (and even first-time visitors
                    navigating between your pages) load content from their local
                    cache instead of re-downloading it. This can cut load times
                    in half for returning users.
                  </p>

                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--er-text)",
                      marginBottom: 8,
                      marginTop: 20,
                    }}
                  >
                    3. Render-Blocking Scripts
                  </h3>
                  <p>
                    Many websites load JavaScript in the{" "}
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
                      &lt;head&gt;
                    </code>{" "}
                    of the HTML. This forces the browser to stop, download, and
                    execute each script before it renders any visible content.
                    Moving scripts to the bottom of the page or adding{" "}
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
                      defer
                    </code>{" "}
                    attributes can dramatically improve perceived load time.
                  </p>

                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--er-text)",
                      marginBottom: 8,
                      marginTop: 20,
                    }}
                  >
                    4. Shared Hosting at Capacity
                  </h3>
                  <p>
                    Entry-level shared hosting plans put hundreds or thousands
                    of websites on the same server. When traffic spikes, that
                    server slows down for everyone on it. If your host is the
                    bottleneck, even a perfectly optimized website will be slow.
                    Consider upgrading to a managed WordPress host or a VPS if
                    your current host consistently delivers slow response times.
                  </p>
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
                    How to Check Your Site&apos;s Speed Right Now
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    Google provides a free tool at{" "}
                    <strong style={{ color: "var(--er-text)" }}>
                      pagespeed.web.dev
                    </strong>
                    . Enter your URL and switch to the Mobile tab. Your score
                    should be above 70 to be competitive. Below 50 is a serious
                    problem. The tool also tells you exactly what to fix, though
                    the recommendations can be technical.
                  </p>
                  <p>
                    Alternatively, the free SiteER scan runs a speed check as
                    part of its 20-point audit and translates the results into
                    plain language — no technical knowledge required.
                  </p>
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
                    What a Fast Site Actually Feels Like
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    One of our Fix Pack clients — a cleaning service in
                    southeast Bakersfield — had a homepage that loaded in 11.4
                    seconds on mobile. After optimizing images, enabling
                    caching, deferring scripts, and upgrading their hosting
                    plan, the load time dropped to 1.7 seconds.
                  </p>
                  <p>
                    Within three weeks, their Google ranking for their primary
                    keyword moved from page three to page one. They went from
                    averaging one to two inbound calls per week from the website
                    to five to eight. Same market, same business — just a faster
                    site.
                  </p>
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
                    Find Out How Slow Your Site Is
                  </h3>
                  <p style={{ marginBottom: 20 }}>
                    The free SiteER scan checks your site&apos;s speed along with 19
                    other checkpoints. See your score in 60 seconds — no signup
                    required.
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
