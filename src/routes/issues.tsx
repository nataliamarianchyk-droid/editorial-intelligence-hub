import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { insights, categoryBySlug } from "@/lib/insights-data";

export const Route = createFileRoute("/issues")({
  component: IssuesArchive,
  head: () => ({
    meta: [
      { title: "Issues Archive - NM Insight" },
      {
        name: "description",
        content:
          "Every issue of NM Insight - the editorial archive of analysis, frameworks and field notes on B2B performance marketing.",
      },
      { property: "og:title", content: "Issues Archive - NM Insight" },
      {
        property: "og:description",
        content:
          "Every issue of NM Insight - the editorial archive of analysis, frameworks and field notes on B2B performance marketing.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://insights.nm-insight.com/issues" },
    ],
    links: [{ rel: "canonical", href: "https://insights.nm-insight.com/issues" }],
  }),
});

function IssuesArchive() {
  const published = insights
    .filter((i) => i.status === "published")
    .slice()
    .sort((a, b) => (a.issue && b.issue ? b.issue.localeCompare(a.issue) : 0));
  const upcoming = insights.filter((i) => i.status === "upcoming");

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <SiteHeader />
      <main>
        {/* Masthead */}
        <section className="border-b border-[var(--ink-deep)]/8">
          <div className="mx-auto max-w-5xl px-6 pt-20 pb-14">
            <p className="eyebrow">The archive</p>
            <h1 className="font-display mt-4 text-5xl md:text-6xl text-[var(--ink-deep)] leading-[1.05]">
              Every issue, in order.
            </h1>
            <p className="mt-6 text-[var(--ink-deep)]/60 text-lg leading-relaxed max-w-2xl">
              One issue per week. Each one written from the operational side of B2B performance
              marketing - never the promotional one.
            </p>
          </div>
        </section>

        {/* Published */}
        <section className="border-b border-[var(--ink-deep)]/8">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <p className="eyebrow">Published</p>
            <div className="mt-6 divide-y divide-[var(--ink-deep)]/8">
              {published.map((i) => {
                const cat = categoryBySlug(i.category)!;
                return (
                  <article
                    key={i.slug}
                    className="py-10 grid grid-cols-1 md:grid-cols-[160px_1fr_120px] gap-6 items-start"
                  >
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink-deep)]/65">
                      <div className="text-[var(--accent-cyan)]">{i.issue}</div>
                      <div className="mt-1 text-[var(--ink-deep)]/60">{i.date}</div>
                      <div className="mt-1 text-[var(--ink-deep)]/60">{i.read} read</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-cyan)]">
                        {cat.name}
                      </div>
                      <Link
                        to="/$category/$articleSlug"
                        params={{ category: i.category, articleSlug: i.slug }}
                        className="block mt-2 font-display text-2xl md:text-3xl text-[var(--ink-deep)] leading-snug hover:text-[var(--accent-cyan)]"
                      >
                        {i.title}
                        {i.titleItalicSub && (
                          <span className="italic text-[var(--ink-deep)]/55 font-normal">
                            {" "}
                            {i.titleItalicSub}
                          </span>
                        )}
                      </Link>
                      <p className="mt-3 text-[var(--ink-deep)]/60 max-w-2xl leading-relaxed">{i.dek}</p>
                      <div className="mt-3 text-xs text-[var(--ink-deep)]/65">{i.author}</div>
                    </div>
                    <div className="md:text-right">
                      <Link
                        to="/$category/$articleSlug"
                        params={{ category: i.category, articleSlug: i.slug }}
                        className="inline-block rounded-full bg-[var(--accent-cyan)] text-[var(--cream)] px-5 py-2 text-sm font-medium hover:brightness-110"
                      >
                        Read →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="border-b border-[var(--ink-deep)]/8">
            <div className="mx-auto max-w-5xl px-6 py-16">
              <p className="eyebrow">Upcoming</p>
              <div className="mt-6 divide-y divide-[var(--ink-deep)]/8">
                {upcoming.map((i) => {
                  const cat = categoryBySlug(i.category)!;
                  return (
                    <article
                      key={i.slug}
                      className="py-8 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6"
                    >
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink-deep)]/50">
                        <div className="text-[var(--accent-amber)]">Upcoming</div>
                        <div className="mt-1 text-[var(--ink-deep)]/50">{i.read} read</div>
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink-deep)]/55">
                          {cat.name}
                        </div>
                        <h2 className="mt-2 font-display text-2xl md:text-3xl text-[var(--ink-deep)]/55 leading-snug">
                          {i.title}
                        </h2>
                        <p className="mt-3 text-[var(--ink-deep)]/50 max-w-2xl leading-relaxed">{i.dek}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
