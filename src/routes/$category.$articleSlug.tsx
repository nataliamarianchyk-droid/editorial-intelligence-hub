import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { categoryBySlug, insights, authors } from "@/lib/insights-data";
import { articleContent, type TocItem } from "@/lib/article-content";

export const Route = createFileRoute("/$category/$articleSlug")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.category);
    if (!category) throw notFound();
    const article = insights.find(
      (i) =>
        i.slug === params.articleSlug &&
        i.category === params.category &&
        i.status === "published",
    );
    if (!article) throw notFound();
    const content = articleContent[article.slug];
    if (!content) throw notFound();
    return { category, article, content, author: authors[article.authorKey] };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found - NM Insight" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} - NM Insight` },
        { name: "description", content: article.dek },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.dek },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: ArticleNotFound,
});

function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-[var(--ink-deep)]">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="eyebrow">404</p>
        <h1 className="font-display text-4xl text-[var(--paper)] mt-4">
          That article doesn't exist.
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
  );
}

function ArticlePage() {
  const { category, article, content, author } = Route.useLoaderData();
  const [active, setActive] = useState(content.toc[0]?.id ?? "");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    content.toc.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [content]);

  // Related: other published insights, excluding this one
  const related = insights
    .filter((i) => i.slug !== article.slug && i.status === "published")
    .slice(0, 3);
  // If fewer than 3 published, pad with upcoming
  if (related.length < 3) {
    const filler = insights
      .filter(
        (i) =>
          i.slug !== article.slug &&
          i.status === "upcoming" &&
          !related.find((r) => r.slug === i.slug),
      )
      .slice(0, 3 - related.length);
    related.push(...filler);
  }

  return (
    <div className="min-h-screen bg-[var(--ink-deep)]">
      <SiteHeader />
      <main>
        {/* Article hero on dark */}
        <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-cyan)]/40 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--accent-cyan)]">
            {category.name}
            {article.issue ? ` · ${article.issue}` : ""}
          </span>
          <h1 className="font-display mt-6 text-5xl md:text-6xl leading-[1.05] text-[var(--paper)]">
            {article.title}
            {article.titleItalicSub ? (
              <span className="block text-white/55 italic font-normal mt-3 text-3xl md:text-4xl">
                {article.titleItalicSub}
              </span>
            ) : null}
          </h1>
          <p className="mt-8 text-white/60 text-sm tracking-wide">
            By {article.author} · {article.date} · {article.read} read
          </p>
        </section>

        {/* Paper article body */}
        <div className="bg-[var(--paper)] text-[#0f172a]">
          <div className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-16">
            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="eyebrow !text-[#7a5e2a] mb-4">In this insight</p>
                <ul className="space-y-3 text-sm">
                  {content.toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className={`block leading-snug border-l-2 pl-3 transition-colors ${
                          active === t.id
                            ? "border-[var(--accent-cyan)] text-[#0f172a] font-medium"
                            : "border-black/10 text-black/55 hover:text-[#0f172a]"
                        }`}
                      >
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 hairline !border-black/10" />
                <p className="mt-6 text-xs uppercase tracking-[0.14em] text-black/45">Share</p>
                <div className="mt-3 flex gap-3 text-sm text-black/60">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://insights.nm-insight.com/${article.category}/${article.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--ink-navy)]"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://insights.nm-insight.com/${article.category}/${article.slug}`}
                    className="hover:text-[var(--ink-navy)]"
                  >
                    Copy link
                  </a>
                </div>
              </div>
            </aside>

            {/* Body */}
            <article className="font-serif">
              <content.Body />

              {/* Byline block */}
              <div className="mt-16 border-t border-black/10 pt-10 grid grid-cols-[64px_1fr] gap-5">
                <div className="h-16 w-16 rounded-full bg-[var(--ink-navy)] text-[var(--accent-cyan)] flex items-center justify-center font-display text-xl border border-[var(--accent-cyan)]/40">
                  NM
                </div>
                <div>
                  <p className="font-display text-lg text-[var(--ink-navy)]">{author.name}</p>
                  <p className="mt-1 text-sm text-black/65 font-sans leading-relaxed">
                    {author.bio}
                  </p>
                  <p className="mt-2 text-xs text-black/45 font-sans">
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--ink-navy)] underline decoration-black/20"
                    >
                      Connect on LinkedIn
                    </a>
                    <span className="mx-2">·</span>
                    <a
                      href="https://nm-insight.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--ink-navy)]"
                    >
                      nm-insight.com
                    </a>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* End CTA on dark */}
        <section className="bg-[var(--ink-navy)]">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center">
            <p className="eyebrow">Next step</p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--paper)] mt-4 leading-tight">
              Find where your system is breaking down.
            </h2>
            <p className="mt-5 text-white/65 max-w-xl mx-auto">
              A 30-minute Clarity Call mapping the exact gap between your marketing activity and
              your pipeline - no pitch, no follow-up sequence.
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
                href="https://nm-insight.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 text-[var(--paper)] px-7 py-3 text-sm hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
              >
                Explore NM Insight Services
              </a>
              <a
                href="https://www.linkedin.com/company/nm-insight/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-transparent text-white/60 px-7 py-3 text-sm hover:text-[var(--accent-cyan)]"
              >
                Follow NM Insight on LinkedIn →
              </a>
            </div>
          </div>
        </section>

        {/* Related insights */}
        <section className="bg-[var(--ink-deep)] border-t border-white/8">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="eyebrow">Continue reading</p>
                <h3 className="font-display text-3xl text-[var(--paper)] mt-2">
                  Related insights
                </h3>
              </div>
              <Link to="/" className="text-sm text-[var(--accent-cyan)] hover:underline">
                All insights →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => {
                const cat = categoryBySlug(r.category)!;
                const card = (
                  <>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#0a8a8d] font-semibold">
                      {cat.name}
                    </span>
                    <h4 className="font-display text-xl mt-3 leading-snug text-[var(--ink-navy)] group-hover:text-[#0a8a8d]">
                      {r.title}
                    </h4>
                    <div className="mt-auto pt-6 text-xs text-black/55 font-sans flex justify-between">
                      <span>{r.read} read</span>
                      <span>{r.status === "published" ? "Read →" : "Upcoming"}</span>
                    </div>
                  </>
                );
                return r.status === "published" ? (
                  <Link
                    key={r.slug}
                    to="/$category/$articleSlug"
                    params={{ category: r.category, articleSlug: r.slug }}
                    className="group bg-[var(--paper)] text-[#0f172a] rounded-sm p-7 flex flex-col min-h-[220px] hover:-translate-y-0.5 transition-transform"
                  >
                    {card}
                  </Link>
                ) : (
                  <article
                    key={r.slug}
                    className="group bg-[var(--paper)]/90 text-[#0f172a] rounded-sm p-7 flex flex-col min-h-[220px]"
                  >
                    {card}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
