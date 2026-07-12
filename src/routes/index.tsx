import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { categories, insights, categoryBySlug } from "@/lib/insights-data";

export const Route = createFileRoute("/")({
  component: InsightsHome,
  head: () => ({
    meta: [
      { title: "NM Insight - Insights on B2B Performance Marketing" },
      {
        name: "description",
        content:
          "Editorial insights from the operational side of B2B performance marketing - acquisition, attribution, content and the systems that connect them.",
      },
      { property: "og:title", content: "NM Insight - Insights on B2B Performance Marketing" },
      {
        property: "og:description",
        content:
          "Editorial insights from the operational side of B2B performance marketing - acquisition, attribution, content and the systems that connect them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function InsightsHome() {
  const featured = insights.find((i) => i.slug === "german-advertising-market-2026")!;
  const issue1 = insights.find((i) => i.slug === "visibility-is-not-pipeline")!;
  const issue2 = insights.find((i) => i.slug === "german-advertising-market-2026")!;
  const upcoming = insights.filter((i) => i.status === "upcoming");
  const rest = [issue1, issue2, ...upcoming];
  const featuredCat = categoryBySlug(featured.category)!;

  return (
    <div className="min-h-screen bg-[var(--ink-deep)]">
      <SiteHeader />
      <main>

      {/* Masthead */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-14 text-center">
          <p className="eyebrow">NM Insight · Editorial</p>
          <h1 className="font-display mt-5 text-5xl md:text-7xl text-[var(--paper)] leading-[1.02]">
            Insights for operators building the
            <span className="italic text-white/60"> infrastructure between marketing and revenue.</span>
          </h1>
          <p className="mt-8 text-white/60 max-w-2xl mx-auto text-base leading-relaxed">
            A weekly, editorial-grade publication on B2B performance marketing - analysis,
            frameworks and field notes from the operational side of the discipline.
          </p>
          <div className="mt-8 text-xs uppercase tracking-[0.22em] text-white/65">
            One issue per week · No noise
          </div>
        </div>
      </section>

      {/* Featured Issue */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <div>
            <p className="eyebrow">{featured.issue} · Featured</p>
            <Link to="/$category/$articleSlug" params={{ category: featured.category, articleSlug: featured.slug }}>
              <h2 className="font-display text-4xl md:text-6xl text-[var(--paper)] leading-[1.05] mt-4 hover:text-[var(--accent-cyan)] transition-colors">
                {featured.title}
              </h2>
            </Link>
            <p className="mt-6 text-white/65 text-lg leading-relaxed max-w-xl">{featured.dek}</p>
            <div className="mt-8 flex items-center gap-4 text-sm text-white/50">
              <span className="text-[var(--accent-cyan)] uppercase tracking-[0.18em] text-[11px]">
                {featuredCat.name}
              </span>
              <span>·</span>
              <span>{featured.author}</span>
              <span>·</span>
              <span>{featured.read}</span>
            </div>
            <Link
              to="/$category/$articleSlug"
              params={{ category: featured.category, articleSlug: featured.slug }}
              className="inline-block mt-10 rounded-full bg-[var(--accent-cyan)] text-[var(--ink-deep)] px-7 py-3 text-sm font-medium hover:brightness-110"
            >
              Read the issue →
            </Link>
          </div>
          <div className="aspect-[4/5] w-full rounded-md overflow-hidden border border-white/10 bg-gradient-to-br from-[var(--ink-navy)] to-[var(--ink-deep)] relative p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-display text-[var(--paper)] text-lg">
                NM <span className="text-[var(--accent-cyan)]">Insight</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
                {featured.issue}
              </span>
            </div>
            <div>
              <h3 className="font-display text-[var(--paper)] text-3xl md:text-5xl leading-[1.05]">
                {featured.title}
              </h3>
              {featured.titleItalicSub && (
                <p className="font-display italic text-white/55 text-xl md:text-2xl mt-2">
                  {featured.titleItalicSub}
                </p>
              )}
            </div>
            <p className="text-white/65 text-xs uppercase tracking-[0.22em]">
              insights.nm-insight.com
            </p>
            <div className="absolute inset-y-0 right-0 w-1 bg-[var(--accent-cyan)]" />
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="eyebrow">The six sections</p>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--paper)] mt-2">
                What we cover
              </h2>
            </div>
            <p className="text-sm text-white/50 max-w-md">
              Six editorial verticals - each written from the operational side, not the promotional one.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="group bg-[var(--paper)] text-[#0f172a] rounded-sm p-7 flex flex-col min-h-[190px] hover:-translate-y-0.5 transition-transform"
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#0a8a8d] font-semibold">
                  {c.short}
                </span>
                <h3 className="font-display text-2xl mt-3 leading-snug text-[var(--ink-navy)] group-hover:text-[#0a8a8d]">
                  {c.name}
                </h3>
                <p className="mt-3 text-sm text-black/60 leading-relaxed">{c.description}</p>
                <span className="mt-auto pt-6 text-xs text-black/45 group-hover:text-[#0a8a8d]">
                  Explore section →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest / upcoming issues */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow">The editorial calendar</p>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--paper)] mt-2">
                Latest &amp; upcoming issues
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((i) => {
              const cat = categoryBySlug(i.category)!;
              const inner = (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-cyan)] font-semibold">
                      {cat.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/60">
                      {i.status === "published" && i.issue ? i.issue : i.date}
                    </span>
                  </div>
                  <h3 className="font-display text-xl mt-4 leading-snug text-[var(--paper)] group-hover:text-[var(--accent-cyan)] transition-colors">
                    {i.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/55 leading-relaxed">{i.dek}</p>
                  <span className="mt-auto pt-6 text-xs text-white/65 flex justify-between">
                    <span>{i.read} read</span>
                    {i.status === "published" ? (
                      <span className="text-[var(--accent-cyan)]">Read →</span>
                    ) : (
                      <span>Upcoming</span>
                    )}
                  </span>
                </>
              );
              return i.status === "published" ? (
                <Link
                  key={i.slug}
                  to="/$category/$articleSlug"
                  params={{ category: i.category, articleSlug: i.slug }}
                  className="group bg-white/[0.03] border border-white/8 rounded-sm p-7 flex flex-col min-h-[220px] hover:border-[var(--accent-cyan)]/40 transition-colors"
                >
                  {inner}
                </Link>
              ) : (
                <article
                  key={i.slug}
                  className="group bg-white/[0.03] border border-white/8 rounded-sm p-7 flex flex-col min-h-[220px]"
                >
                  {inner}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Updates prompt with latest issues */}
      <UpdatesSection />

      {/* CTA band */}
      <section className="bg-[var(--ink-navy)]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <p className="eyebrow">The consultancy behind Insight</p>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--paper)] mt-4 leading-tight">
            When the reading is done, the work begins.
          </h2>
          <p className="mt-5 text-white/65 max-w-xl mx-auto">
            NM Insight is a Berlin-based B2B performance marketing consultancy. If your marketing
            is active but your pipeline is inconsistent, a Clarity Call maps the exact gap.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="https://calendly.com/natalia-marianchyk/strategic-intro-call"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--accent-cyan)] text-[var(--ink-deep)] px-7 py-3 text-sm font-medium hover:brightness-110"
            >
              Book a Clarity Call
            </a>
            <a
              href="https://nm-insight.com/services"
              className="rounded-full border border-white/25 text-[var(--paper)] px-7 py-3 text-sm hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
            >
              Explore NM Insight Services
            </a>
          </div>
        </div>
      </section>

      </main>
      <SiteFooter />
    </div>
  );
}

function UpdatesSection() {
  const published = insights
    .filter((i) => i.status === "published")
    .slice()
    .sort((a, b) => (a.issue && b.issue ? b.issue.localeCompare(a.issue) : 0));
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/public/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setState("error");
        setMessage(data.message ?? "Something went wrong. Try again.");
        return;
      }
      setState("ok");
      setMessage(data.message ?? "You're on the list.");
      setEmail("");
    } catch {
      setState("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <section className="border-b border-white/8 bg-[var(--ink-navy)]/40">
      <div className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 items-start">
        <div>
          <p className="eyebrow">Get every issue</p>
          <h2 className="font-display text-3xl md:text-4xl text-[var(--paper)] mt-3 leading-tight">
            One editorial email per week. No noise.
          </h2>
          <p className="mt-5 text-white/65 max-w-md leading-relaxed">
            Analysis, frameworks and field notes from the operational side of B2B performance
            marketing - delivered the moment each new issue publishes.
          </p>
          <form onSubmit={onSubmit} className="mt-8 flex max-w-md">
            <label htmlFor="updates-email" className="sr-only">
              Email address
            </label>
            <input
              id="updates-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-[var(--paper)] focus:outline-none focus:border-[var(--accent-cyan)]"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="bg-[var(--accent-cyan)] text-[var(--ink-deep)] px-6 text-sm font-medium hover:brightness-110 disabled:opacity-60"
            >
              {state === "loading" ? "…" : "Subscribe"}
            </button>
          </form>
          {message && (
            <p
              className={`mt-3 text-xs ${
                state === "ok" ? "text-[var(--accent-cyan)]" : "text-[var(--accent-amber)]"
              }`}
            >
              {message}
            </p>
          )}
          <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/45">
            Unsubscribe anytime · GDPR-compliant
          </p>
        </div>

        <div>
          <p className="eyebrow">Start with the latest</p>
          <ul className="mt-6 space-y-4">
            {published.map((i) => {
              const cat = categoryBySlug(i.category)!;
              return (
                <li key={i.slug}>
                  <Link
                    to="/$category/$articleSlug"
                    params={{ category: i.category, articleSlug: i.slug }}
                    className="group block rounded-sm border border-white/10 bg-white/[0.03] p-6 hover:border-[var(--accent-cyan)]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
                      <span className="text-[var(--accent-cyan)]">{i.issue}</span>
                      <span className="text-white/60">{cat.name}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl md:text-2xl text-[var(--paper)] group-hover:text-[var(--accent-cyan)] leading-snug">
                      {i.title}
                    </h3>
                    <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                      <span>{i.read} read · {i.date}</span>
                      <span className="text-[var(--accent-cyan)]">Read →</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            to="/issues"
            className="inline-block mt-5 text-xs uppercase tracking-[0.18em] text-white/60 hover:text-[var(--accent-cyan)]"
          >
            Browse the full archive →
          </Link>
        </div>
      </div>
    </section>
  );
}
