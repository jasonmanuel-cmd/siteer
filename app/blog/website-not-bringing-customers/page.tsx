import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Why Your Website Isn't Bringing in Customers",
  description:
    "You have a website. Customers aren't coming. Here's the honest reason why most small business websites fail to generate leads — and what actually changes the outcome.",
  alternates: {
    canonical:
      "https://siteer.dev/blog/website-not-bringing-customers",
  },
};

export default function BlogPost3() {
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
                    background: "rgba(110,231,255,.1)",
                    border: "1px solid rgba(110,231,255,.25)",
                    color: "var(--er-cyan)",
                    borderRadius: 12,
                    padding: "3px 10px",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Strategy
                </span>
                <span style={{ color: "var(--er-muted-2)", fontSize: 13 }}>
                  August 28, 2026
                </span>
                <span style={{ color: "var(--er-muted-2)", fontSize: 13 }}>
                  · 8 min read
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
                Why Your Website Isn&apos;t Bringing in Customers
              </h1>
              <p
                style={{
                  color: "var(--er-muted)",
                  fontSize: 18,
                  lineHeight: 1.65,
                }}
              >
                You paid someone to build a website. You figured customers would
                start finding you. They didn&apos;t. You&apos;re not alone — and the
                problem is almost never the website itself. It&apos;s what&apos;s been left
                out of it.
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
                  There&apos;s a moment most local business owners know well. You
                  spend $800, $2,000, maybe $5,000 on a website. It looks
                  professional. Your logo is on it. Your services are listed.
                  You share the link with friends and family and they say it
                  looks great. Then you wait. And wait. And eventually realize
                  that the phone isn&apos;t ringing any more than it was before.
                </p>
                <p>
                  The website isn&apos;t broken in any visible way. But it&apos;s not
                  working either. What went wrong?
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
                    The Problem Is Not Design — It&apos;s Discoverability
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    Most web designers are skilled at making sites look good.
                    Very few are trained in local SEO — the specific set of
                    practices that help a business appear in Google when someone
                    nearby searches for what they offer.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    A beautiful website that Google can&apos;t find or doesn&apos;t
                    understand is like a well-decorated store on a road with no
                    traffic. The people who already know you exist can navigate
                    there, but you&apos;re invisible to everyone else.
                  </p>
                  <p>
                    When we audit local business sites, we routinely find that
                    basic local SEO is missing: no title tags referencing the
                    city or service type, no LocalBusiness schema markup, no
                    clear geographic signals anywhere in the content. Google
                    can&apos;t confidently connect the business to its location and
                    services, so it doesn&apos;t rank it for local searches.
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
                    Your Website Has to Earn Its Ranking Every Day
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    There&apos;s a common misconception that having a website means
                    appearing in Google. It doesn&apos;t. Google&apos;s job is to return
                    the best possible result for each search query. To do that,
                    it evaluates hundreds of signals: how relevant is the
                    content, how fast does the page load, how trustworthy is the
                    site, how well does it match the searcher&apos;s intent and
                    location?
                  </p>
                  <p>
                    A website that was built three years ago and never updated
                    scores poorly on most of these signals — not because
                    anything is actively wrong, but because Google rewards
                    freshness, speed, and relevance, and an unmaintained site
                    delivers none of them.
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
                    The Trust Problem
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    Even when Google does send someone to your site, there&apos;s
                    another hurdle: trust. A visitor who has never heard of your
                    business is evaluating you in the first ten seconds of
                    landing on your page. They&apos;re asking: Is this a real
                    business? Do other people use them? Can I verify they&apos;re
                    legit?
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    Sites that answer these questions quickly — with reviews,
                    photos of real work, a name and face behind the business, a
                    clear physical address, and easy contact options — convert
                    visitors into customers at much higher rates than sites that
                    look generic and anonymous.
                  </p>
                  <p>
                    We call these &quot;trust signals,&quot; and they&apos;re one of the 20
                    checkpoints in our audit. When they&apos;re absent, visitors who
                    do find your site don&apos;t call — they back out and choose a
                    competitor who looks more established.
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
                    The Conversion Problem: Traffic Without Action
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    Some sites do get traffic — maybe from a Google Business
                    Profile, word of mouth, or an older domain with some
                    history. But the traffic doesn&apos;t convert. People visit and
                    leave.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    This is almost always a conversion problem: the site doesn&apos;t
                    clearly communicate what you want visitors to do, or it
                    makes them work too hard to do it. Common symptoms: no
                    prominent phone number, a contact form buried deep in a menu,
                    no clear service area, pricing that requires a call to
                    discover, and no social proof near the call-to-action.
                  </p>
                  <p>
                    The average person spends fewer than 15 seconds on a local
                    business website before deciding whether to engage. Every
                    second of that time is valuable, and most sites waste it.
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
                    What Actually Changes the Outcome
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    Based on the sites we&apos;ve audited and the Fix Packs we&apos;ve
                    delivered, the changes that reliably move the needle are:
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {[
                      "Fixing page speed to under 3 seconds on mobile",
                      "Adding local SEO meta tags (title, description, H1) with city name and service type",
                      "Adding LocalBusiness schema markup so Google understands your business",
                      "Making the phone number a tap-to-call link, visible above the fold",
                      "Adding a single clear CTA button on the homepage hero",
                      "Adding testimonials or reviews near the CTA",
                      "Displaying business hours somewhere visible",
                      "Adding a brief About section with a real person's name and photo",
                    ].map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--er-green)",
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                        >
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
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
                    None of This Requires Rebuilding Your Site
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    The list above can sound overwhelming, but in practice most
                    of these fixes take minutes to hours, not days or weeks. You
                    don&apos;t need a new website. You need the one you have to
                    actually work.
                  </p>
                  <p>
                    The biggest obstacle most business owners face is not knowing
                    which problems exist and in what order to address them. That&apos;s
                    exactly what the SiteER audit solves — a scored, prioritized
                    list of what&apos;s broken and what to fix first, in plain
                    language anyone can understand.
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
                    A Note on Expectations
                  </h2>
                  <p style={{ marginBottom: 12 }}>
                    SEO takes time. Fixing your site today won&apos;t double your
                    calls next week. Google re-indexes sites on its own schedule,
                    and ranking improvements from technical fixes typically show
                    up over weeks to months. Conversion improvements — like a
                    better CTA or tap-to-call links — can show results much
                    faster, since they affect visitors who are already there.
                  </p>
                  <p>
                    What we tell every client: the best time to fix these issues
                    was when the site was built. The second best time is now.
                    Every month you wait is another month of lost calls to
                    competitors whose sites work the way yours should.
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
                    Find Out What&apos;s Holding Your Site Back
                  </h3>
                  <p style={{ marginBottom: 20 }}>
                    The free SiteER scan runs 20 checks in about 60 seconds.
                    You&apos;ll see exactly what&apos;s broken, how serious it is, and what
                    to fix first. No signup required.
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
