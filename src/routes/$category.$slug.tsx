import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { categoryBySlug, insights } from "@/lib/insights-data";

export const Route = createFileRoute("/$category/$slug")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.category);
    if (!category) throw notFound();
    const article = insights.find(
      (i) => i.slug === params.slug && i.category === params.category && i.status === "published",
    );
    if (!article) throw notFound();
    return { category, article };
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
  component: ArticlePrototype,
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

const toc = [
  { id: "illusion", label: "The Illusion of Traction" },
  { id: "gaps", label: "The Four Gaps That Kill Pipeline" },
  { id: "connects", label: "What Connects Visibility to Revenue" },
  { id: "specialist", label: "Why This Matters in Specialist Markets" },
  { id: "question", label: "The Question Worth Asking" },
];

const related = [
  { cat: "Analytics", title: "UTM Governance Is a Revenue System", read: "6 min" },
  { cat: "Systems", title: "Why Your CRM Is the Real Marketing Tool", read: "8 min" },
  { cat: "Strategy", title: "ICP Precision in Sub-1,000-Account Markets", read: "5 min" },
];

function ArticlePrototype() {
  const [active, setActive] = useState("illusion");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    toc.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--ink-deep)]">
      <SiteHeader />
      <main>

      {/* Article hero on dark */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-cyan)]/40 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--accent-cyan)]">
          Performance · Issue 01
        </span>
        <h1 className="font-display mt-6 text-5xl md:text-6xl leading-[1.05] text-[var(--paper)]">
          Visibility Is Not Pipeline.
          <span className="block text-white/55 italic font-normal mt-3 text-3xl md:text-4xl">
            Here is what is.
          </span>
        </h1>
        <p className="mt-8 text-white/60 text-sm tracking-wide">
          By Natalia Marianchyk · May 2026 · 7 min read
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
                {toc.map((t) => (
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
                <a href="#" className="hover:text-[var(--ink-navy)]">LinkedIn</a>
                <a href="#" className="hover:text-[var(--ink-navy)]">Copy link</a>
              </div>
            </div>
          </aside>

          {/* Body */}
          <article className="font-serif">
            <p className="text-xl md:text-2xl leading-relaxed text-[#0f172a]">
              You launched the product. You hired someone to run LinkedIn. You set up Google Ads.
              You are active, consistent, and spending real money on marketing.
            </p>
            <p className="mt-6 text-xl md:text-2xl leading-relaxed font-medium text-[var(--ink-navy)]">
              And yet the sales team is still waiting.
            </p>
            <p className="mt-6 text-[17px] leading-[1.85] font-sans text-[#1f2937]">
              This is the most common and least discussed problem in specialist markets. Not a lack
              of effort. Not a lack of budget. A structural gap between visibility and revenue - 
              and most companies do not even know it exists until the pipeline dries up.
            </p>

            <h2 id="illusion" className="font-display text-3xl md:text-4xl mt-14 mb-5 text-[var(--ink-navy)]">
              The Illusion of Traction
            </h2>
            <div className="font-sans text-[17px] leading-[1.85] text-[#1f2937] space-y-5">
              <p>
                When campaigns are running and content is being published, it feels like marketing
                is working. Impressions go up. Followers grow. The website gets traffic.
              </p>
              <p>
                But impressions do not pay salaries. Followers do not close deals. And traffic
                without attribution tells you nothing about what is actually driving interest.
              </p>
              <p>
                According to the CMO Insights Report 2025, nearly half of marketing leaders say
                they do not have sufficient access to relevant data to achieve their goals - and
                almost a quarter are not confident in the data they do have.
              </p>
            </div>

            <PullQuote>
              The problem is not the campaigns. It is the infrastructure underneath them.
            </PullQuote>

            <h2 id="gaps" className="font-display text-3xl md:text-4xl mt-14 mb-5 text-[var(--ink-navy)]">
              The Four Gaps That Kill Pipeline
            </h2>
            <p className="font-sans text-[17px] leading-[1.85] text-[#1f2937]">
              In specialist markets - where audiences are small, buying cycles are long, and every
              conversation matters - four structural gaps appear again and again.
            </p>

            <ol className="mt-8 space-y-6">
              {[
                ["Diffuse visibility", "Content reaches people, but not the right ones. There is no ICP filter anchoring the targeting, so reach grows but qualified enquiries do not."],
                ["Ad-hoc content", "Every post is created from scratch. There is no system, no reuse, no compounding effect. The effort is high and the output is inconsistent."],
                ["Missing tracking", "Without UTM governance, GA4 event mapping, and channel-level conversion data, budget gets allocated by gut feeling rather than evidence."],
                ["The gap to sales", "Leads come in but fall through. There is no CRM handoff, no nurture sequence, no structured process connecting marketing to a sales conversation."],
              ].map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[56px_1fr] gap-5 border-t border-black/10 pt-6">
                  <span className="font-display text-3xl text-[var(--accent-cyan)] leading-none">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-[var(--ink-navy)]">{t}</h3>
                    <p className="mt-2 font-sans text-[16px] leading-[1.8] text-[#374151]">{d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 font-sans italic text-[16px] text-black/60">
              Any one of these gaps is damaging. All four together make growth unpredictable.
            </p>

            <h2 id="connects" className="font-display text-3xl md:text-4xl mt-14 mb-5 text-[var(--ink-navy)]">
              What Actually Connects Visibility to Revenue
            </h2>
            <div className="font-sans text-[17px] leading-[1.85] text-[#1f2937] space-y-5">
              <p>
                The answer is not more campaigns. It is a system that connects every element - 
                targeting, content, tracking, and CRM - into one coherent flow.
              </p>
              <p>
                This means starting with a precise ICP definition before touching any channel.
                Building tracking infrastructure so every lead can be attributed. Setting up
                LinkedIn and paid search as coordinated parts of a single acquisition engine. And
                connecting that engine to a CRM so marketing activity lands inside a sales
                process, not beside it.
              </p>
            </div>

            <PullQuote>
              This is the difference between running campaigns and building pipeline.
            </PullQuote>

            <h2 id="specialist" className="font-display text-3xl md:text-4xl mt-14 mb-5 text-[var(--ink-navy)]">
              Why This Matters More in Specialist Markets
            </h2>
            <div className="font-sans text-[17px] leading-[1.85] text-[#1f2937] space-y-5">
              <p>
                In broad consumer markets, volume compensates for imprecision. A 1% conversion
                rate against millions still generates meaningful numbers.
              </p>
              <p>
                In specialist markets, that logic breaks. If your TAM is a few thousand companies,
                every touchpoint matters. Every wasted impression is a real cost. Every lead that
                falls through is a real loss.
              </p>
              <p className="font-medium text-[var(--ink-navy)]">
                Precision is not optional. It is the only viable strategy.
              </p>
            </div>

            <h2 id="question" className="font-display text-3xl md:text-4xl mt-14 mb-5 text-[var(--ink-navy)]">
              The Question Worth Asking
            </h2>
            <div className="font-sans text-[17px] leading-[1.85] text-[#1f2937] space-y-5">
              <p>
                If your marketing is active but your pipeline is inconsistent, the question is not
                "how do we do more?" It is "where exactly is the system breaking down?"
              </p>
              <p>
                The answer is almost always structural - not creative, not strategic, not about
                channel choice. It is about the infrastructure connecting what marketing does to
                what sales needs.
              </p>
              <p className="font-display text-2xl text-[var(--ink-navy)] mt-8 leading-snug">
                That gap is closeable. But it requires building something, not just running
                something.
              </p>
            </div>

            {/* Byline block */}
            <div className="mt-16 border-t border-black/10 pt-10 grid grid-cols-[64px_1fr] gap-5">
              <div className="h-16 w-16 rounded-full bg-[var(--ink-navy)] text-[var(--paper)] flex items-center justify-center font-display text-xl">
                NM
              </div>
              <div>
                <p className="font-display text-lg text-[var(--ink-navy)]">Natalia Marianchyk</p>
                <p className="mt-1 text-sm text-black/65 font-sans leading-relaxed">
                  Founder of NM Insight - a Berlin-based B2B performance marketing consultancy
                  focused on the infrastructure between acquisition and revenue.
                </p>
                <p className="mt-2 text-xs text-black/45 font-sans">
                  hello@nm-insight.com · nm-insight.com
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
            <a href="https://calendly.com/natalia-marianchyk/strategic-intro-call" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--accent-cyan)] text-[var(--ink-deep)] px-7 py-3 text-sm font-medium hover:brightness-110">
              Book a Clarity Call
            </a>
            <a href="#" className="rounded-full border border-white/25 text-[var(--paper)] px-7 py-3 text-sm hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]">
              Explore NM Insight Services
            </a>
            <a href="#" className="rounded-full border border-transparent text-white/60 px-7 py-3 text-sm hover:text-[var(--accent-cyan)]">
              Connect on LinkedIn →
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
              <h3 className="font-display text-3xl text-[var(--paper)] mt-2">Related insights</h3>
            </div>
            <a href="#" className="text-sm text-[var(--accent-cyan)] hover:underline">All insights →</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <article key={r.title} className="group bg-[var(--paper)] text-[#0f172a] rounded-sm p-7 flex flex-col min-h-[220px] hover:-translate-y-0.5 transition-transform">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#0a8a8d] font-semibold">
                  {r.cat}
                </span>
                <h4 className="font-display text-xl mt-3 leading-snug text-[var(--ink-navy)] group-hover:text-[#0a8a8d]">
                  {r.title}
                </h4>
                <div className="mt-auto pt-6 text-xs text-black/55 font-sans flex justify-between">
                  <span>{r.read} read</span>
                  <span>Read →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      </main>
      <SiteFooter />
    </div>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-4 border-[var(--accent-cyan)] pl-6 py-2">
      <p className="font-display text-2xl md:text-3xl leading-snug text-[var(--ink-navy)]">
        {children}
      </p>
    </blockquote>
  );
}
