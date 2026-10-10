import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Blog – Website Tips for Local Business Owners",
  description:
    "Practical website advice for local business owners in Bakersfield, CA. Learn what's killing your site traffic, how to fix it, and how to get more calls from Google.",
  alternates: { canonical: "https://siteer.dev/blog" },
};

const posts = [
  {
    slug: "local-business-website-mistakes",
    title: "5 Website Mistakes Killing Your Local Business (And How to Fix Them)",
    excerpt:
      "Most local business websites have the same five problems. They're costing you real customers every week. Here's what they are, why they matter, and exactly how to fix each one.",
    date: "September 12, 2026",
    readTime: "7 min read",
    tag: "Website Tips",
    tagColor: "var(--er-red)",
  },
  {
    slug: "mobile-page-speed-fixes",
    title: "Why Your Mobile Page Speed Is Driving Away Customers",
    excerpt:
      "Over 60% of local searches happen on phones. If your site loads slowly on mobile, Google buries it — and the people who do find it leave before it finishes loading. Here's the fix.",
    date: "September 4, 2026",
    readTime: "6 min read",
    tag: "Speed & Performance",
    tagColor: "var(--er-orange)",
  },
  {
    slug: "website-not-bringing-customers",
    title: "Why Your Website Isn't Bringing in Customers",
    excerpt:
      "You paid someone to build a website. You figured customers would come. They didn't. Here's the honest reason why most small business websites fail to generate leads — and what changes the outcome.",
    date: "August 28, 2026",
    readTime: "8 min read",
    tag: "Strategy",
    tagColor: "var(--er-cyan)",
  },
];

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section
          style={{
            padding: "72px 0 56px",
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <div className="er-container">
            <h1
              style={{
                fontSize: "clamp(30px, 5vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: 16,
              }}
            >
              Website Tips for Local Business Owners
            </h1>
            <p style={{ color: "var(--er-muted)", fontSize: 17, lineHeight: 1.65, maxWidth: 560 }}>
              Practical advice from Jason Manuel — plain English, no jargon, all focused on getting
              your Bakersfield-area business more customers from the web.
            </p>
          </div>
        </section>

        <section style={{ padding: "56px 0 80px" }}>
          <div className="er-container">
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <article
                    style={{
                      background: "var(--er-card)",
                      border: "1px solid rgba(255,255,255,.08)",
                      borderRadius: 14,
                      padding: "32px 28px",
                      transition: "border-color 0.15s, transform 0.15s",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(110,231,255,.3)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.08)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <span
                        style={{
                          background: post.tagColor + "18",
                          border: `1px solid ${post.tagColor}44`,
                          color: post.tagColor,
                          borderRadius: 12,
                          padding: "3px 10px",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {post.tag}
                      </span>
                      <span style={{ color: "var(--er-muted-2)", fontSize: 13 }}>
                        {post.date}
                      </span>
                      <span style={{ color: "var(--er-muted-2)", fontSize: 13 }}>
                        · {post.readTime}
                      </span>
                    </div>
                    <h2
                      style={{
                        fontSize: "clamp(18px, 3vw, 24px)",
                        fontWeight: 700,
                        marginBottom: 12,
                        lineHeight: 1.3,
                        color: "var(--er-text)",
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      style={{
                        color: "var(--er-muted)",
                        fontSize: 15,
                        lineHeight: 1.65,
                        marginBottom: 20,
                        maxWidth: 640,
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <span
                      style={{
                        color: "var(--er-cyan)",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      Read article →
                    </span>
                  </article>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
