import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { categoryBySlug, insightsByCategory, categories, type Insight } from "@/lib/insights-data";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category, items: insightsByCategory(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Section not found - NM Insight" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { category } = loaderData;
    return {
      meta: [
        { title: `${category.name} - NM Insight` },
        { name: "description", content: category.description },
        { property: "og:title", content: `${category.name} - NM Insight` },
        { property: "og:description", content: category.description },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[var(--ink-deep)]">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="eyebrow">404</p>
        <h1 className="font-display text-4xl text-[var(--paper)] mt-4">
          That section doesn't exist.
        </h1>
        <Link
          to="/"
          className="inline-block mt-8 rounded-full bg-[var(--accent-cyan)] text-[var(--ink-deep)] px-6 py-2.5 text-sm"
        >
          Back to Insights
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: () => (
    <div className="min-h-screen bg-[var(--ink-deep)]">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center text-white/70">
        Something went wrong loading this section.
      </div>
      <SiteFooter />
    </div>
  ),
});

function CategoryPage() {
  const { category, items } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[var(--ink-deep)]">
      <SiteHeader />
      <main>

      {/* Category masthead */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-5xl px-6 pt-20 pb-16">
          <p className="eyebrow">Section</p>
          <h1 className="font-display mt-4 text-5xl md:text-6xl text-[var(--paper)] leading-[1.05]">
            {category.name}
          </h1>
          <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-2xl">
            {category.description}
          </p>
        </div>
      </section>

      {/* Article list */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-5xl px-6 py-16">
          {items.length === 0 && (
            <p className="text-white/65 text-sm">
              No published issues in this section yet. Subscribe below to be notified when the
              first one lands.
            </p>
          )}
          <div className="divide-y divide-white/8">
            {items.map((i: Insight) => (
              <article key={i.slug} className="py-10 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6">
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/65">
                  {i.date}
                  <div className="mt-1 text-white/60">{i.read} read</div>
                </div>
                <div>
                  {i.status === "published" ? (
                    <Link
                      to="/$category/$slug"
                      params={{ category: i.category, slug: i.slug }}
                      className="font-display text-2xl md:text-3xl text-[var(--paper)] leading-snug hover:text-[var(--accent-cyan)]"
                    >
                      {i.title}
                    </Link>
                  ) : (
                    <h2 className="font-display text-2xl md:text-3xl text-white/55 leading-snug">
                      {i.title}
                    </h2>
                  )}
                  <p className="mt-3 text-white/60 max-w-2xl leading-relaxed">{i.dek}</p>
                  <div className="mt-4 text-xs text-white/65 flex gap-3">
                    <span>{i.author}</span>
                    {i.status === "upcoming" && (
                      <>
                        <span>·</span>
                        <span className="text-[var(--accent-amber)] uppercase tracking-[0.14em]">
                          Upcoming
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Other sections */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="eyebrow">Other sections</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      </main>
      <SiteFooter />
    </div>
  );
}
