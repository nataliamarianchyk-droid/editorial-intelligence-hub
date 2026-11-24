import { shareImageMeta } from "@/lib/share-images";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { categories, categoryBySlug, homepageEditorialSelections } from "@/lib/insights-data";

export const Route = createFileRoute("/")({
  component: InsightsHome,
  head: () => ({
    meta: [
      ...shareImageMeta("home"),
      { title: "NM Insight - Marketing Insights" },
      {
        name: "description",
        content:
          "Editorial insights from the operational side of marketing - acquisition, attribution, content and the systems that connect them.",
      },
      { property: "og:title", content: "NM Insight - Marketing Insights" },
      {
        property: "og:description",
        content:
          "Editorial insights from the operational side of marketing - acquisition, attribution, content and the systems that connect them.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://insights.nm-insight.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://insights.nm-insight.com/" }],
  }),
});

function InsightsHome() {
  const { featured, calendar: rest } = homepageEditorialSelections();
  if (!featured) return null;
  const featuredCat = categoryBySlug(featured.category);

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <SiteHeader />
      <main>
        {/* Featured issue - the page opens straight into the reading */}
        <section className="border-b border-[var(--ink-deep)]/8">
          <div className="mx-auto max-w-6xl px-6 pt-14 pb-20 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
            <div>
              <p className="eyebrow">{featured.issue ? `${featured.issue} · Featured` : "Featured"}</p>
              <Link to="/$category/$articleSlug" params={{ category: featured.category, articleSlug: featured.slug }}>
                <h1 className="font-display text-4xl md:text-6xl text-[var(--ink-deep)] leading-[1.05] mt-4 hover:text-[var(--accent-cyan)] transition-colors">
                  {featured.title}
                </h1>
              </Link>
              <p className="mt-6 text-[var(--ink-deep)]/65 text-lg leading-relaxed max-w-xl">{featured.dek}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[var(--ink-deep)]/50">
                <span className="text-[var(--accent-cyan)] uppercase tracking-[0.18em] text-[11px]">
                  {featuredCat?.name}
                </span>
                <span>·</span>
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.read}</span>
              </div>
              <Link
                to="/$category/$articleSlug"
                params={{ category: featured.category, articleSlug: featured.slug }}
                className="inline-block mt-10 rounded-full bg-[var(--accent-cyan)] text-[var(--cream)] px-7 py-3 text-sm font-medium hover:brightness-110"
              >
                Read the issue →
              </Link>
            </div>
            {featured.cover ? <Link to="/$category/$articleSlug" params={{ category: featured.category, articleSlug: featured.slug }} aria-label={`Read ${featured.issue}: ${featured.title}`} className="block">
              <img src={featured.cover.src} alt={featured.cover.alt} width={featured.cover.width} height={featured.cover.height} className="w-full aspect-video object-cover rounded-md" />
            </Link> : <div className="aspect-[4/5] w-full rounded-md overflow-hidden border border-[var(--ink-deep)]/10 bg-gradient-to-br from-[var(--cream-deep)] to-[var(--cream)] relative p-10 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-display text-[var(--ink-deep)] text-lg">
                  NM <span className="text-[var(--accent-cyan)]">Insight</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
                  {featured.issue}
                </span>
              </div>
              <div>
                <h2 className="font-display text-[var(--ink-deep)] text-3xl md:text-5xl leading-[1.05]">
                  {featured.title}
                </h2>
                {featured.titleItalicSub && (
                  <p className="font-display italic text-[var(--ink-deep)]/55 text-xl md:text-2xl mt-2">
                    {featured.titleItalicSub}
                  </p>
                )}
              </div>
              <p className="text-[var(--ink-deep)]/65 text-xs uppercase tracking-[0.22em]">
                insights.nm-insight.com
              </p>
              <div className="absolute inset-y-0 right-0 w-1 bg-[var(--accent-cyan)]" />
            </div>}
          </div>
        </section>

        {/* Latest issues & field guides - straight into the reading */}
        <section className="border-b border-[var(--ink-deep)]/8">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="eyebrow">The editorial calendar</p>
                <h2 className="font-display text-3xl md:text-4xl text-[var(--ink-deep)] mt-2">
                  Latest issues &amp; field guides
                </h2>
              </div>
              <Link
                to="/issues"
                className="text-xs uppercase tracking-[0.18em] text-[var(--ink-deep)]/55 hover:text-[var(--accent-cyan)]"
              >
                Full archive →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((i) => {
                const cat = categoryBySlug(i.category);
                if (!cat) return null;
                const inner = (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-cyan)] font-semibold">
                        {cat.name}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--ink-deep)]/60">
                        {i.format === "field-guide" ? "Field guide" : i.status === "published" && i.issue ? i.issue : i.date}
                      </span>
                    </div>
                    <h3 className="font-display text-xl mt-4 leading-snug text-[var(--ink-deep)] group-hover:text-[var(--accent-cyan)] transition-colors">
                      {i.title}
                    </h3>
                    <p className="mt-3 text-sm text-[var(--ink-deep)]/55 leading-relaxed">{i.dek}</p>
                    <span className="mt-auto pt-6 text-xs text-[var(--ink-deep)]/65 flex justify-between">
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
                    className="group bg-[var(--ink-deep)]/[0.03] border border-[var(--ink-deep)]/8 rounded-sm p-7 flex flex-col min-h-[220px] hover:border-[var(--accent-cyan)]/40 transition-colors"
                  >
                    {inner}
                  </Link>
                ) : (
                  <article
                    key={i.slug}
                    className="group bg-[var(--ink-deep)]/[0.03] border border-[var(--ink-deep)]/8 rounded-sm p-7 flex flex-col min-h-[220px]"
                  >
                    {inner}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Compact topic browse */}
        <section className="border-b border-[var(--ink-deep)]/8">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <p className="eyebrow mb-7">Browse by topic</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    className="group flex items-baseline justify-between gap-3 border-b border-[var(--ink-deep)]/10 pb-2"
                  >
                    <span className="font-display text-lg text-[var(--ink-deep)] group-hover:text-[var(--accent-cyan)] transition-colors">
                      {c.name}
                    </span>
                    <span className="text-xs text-[var(--ink-deep)]/40 group-hover:text-[var(--accent-cyan)]">→</span>
                  </Link>
                  <p className="mt-2 text-xs text-[var(--ink-deep)]/50 leading-relaxed">{c.short}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Newsletter */}
        <UpdatesSection />
      </main>
      <SiteFooter />
    </div>
  );
}

function UpdatesSection() {
  const { latest: published } = homepageEditorialSelections();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const { submitSubscribe } = await import("@/lib/subscribe-client");
      const result = await submitSubscribe({ email });
      if (!result.ok) {
        setState("error");
        setMessage(result.message);
        return;
      }
      setState("ok");
      setMessage(result.message);
      setEmail("");
    } catch {
      setState("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <section id="updates" className="bg-[var(--cream-deep)]/40">
      <div className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 items-start">
        <div>
          <p className="eyebrow">Get every issue</p>
          <h2 className="font-display text-3xl md:text-4xl text-[var(--ink-deep)] mt-3 leading-tight">
            One editorial email per month. No noise.
          </h2>
          <p className="mt-5 text-[var(--ink-deep)]/65 max-w-md leading-relaxed">
            Analysis, frameworks and field notes from the operational side of
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
              className="flex-1 bg-[var(--ink-deep)]/5 border border-[var(--ink-deep)]/10 px-4 py-3 text-sm text-[var(--ink-deep)] focus:outline-none focus:border-[var(--accent-cyan)]"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="bg-[var(--accent-cyan)] text-[var(--cream)] px-6 text-sm font-medium hover:brightness-110 disabled:opacity-60"
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
          <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[var(--ink-deep)]/45">
            Unsubscribe anytime · GDPR-compliant
          </p>
        </div>

        <div>
          <p className="eyebrow">Start with the latest</p>
          <ul className="mt-6 space-y-4">
            {published.map((i) => {
              const cat = categoryBySlug(i.category);
              if (!cat) return null;
              return (
                <li key={i.slug}>
                  <Link
                    to="/$category/$articleSlug"
                    params={{ category: i.category, articleSlug: i.slug }}
                    className="group block rounded-sm border border-[var(--ink-deep)]/10 bg-[var(--ink-deep)]/[0.03] p-6 hover:border-[var(--accent-cyan)]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
                      <span className="text-[var(--accent-cyan)]">{i.issue ?? "Field guide"}</span>
                      <span className="text-[var(--ink-deep)]/60">{cat.name}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl md:text-2xl text-[var(--ink-deep)] group-hover:text-[var(--accent-cyan)] leading-snug">
                      {i.title}
                    </h3>
                    <div className="mt-3 flex items-center justify-between text-xs text-[var(--ink-deep)]/60">
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
            className="inline-block mt-5 text-xs uppercase tracking-[0.18em] text-[var(--ink-deep)]/60 hover:text-[var(--accent-cyan)]"
          >
            Browse the full archive →
          </Link>
        </div>
      </div>
    </section>
  );
}
