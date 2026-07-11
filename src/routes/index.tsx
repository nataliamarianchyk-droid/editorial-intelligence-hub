import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

const CALENDLY = "https://calendly.com/natalia-marianchyk/strategic-intro-call";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "NM Insight — B2B Performance Marketing Consultancy · Berlin" },
      {
        name: "description",
        content:
          "Results first. Buzzwords later. A Berlin B2B performance marketing consultancy building the infrastructure between acquisition and revenue.",
      },
      { property: "og:title", content: "NM Insight — Results First. Buzzwords Later." },
      {
        property: "og:description",
        content:
          "A Berlin B2B performance marketing consultancy building the infrastructure between acquisition and revenue.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const pillars = [
  {
    title: "Strategy built to work, not to impress",
    body:
      "Decks don't drive revenue. Systems do. Every recommendation ties to a measurable outcome — pipeline, CAC, contribution margin — or it doesn't ship.",
  },
  {
    title: "Less chaos, more clarity",
    body:
      "Most teams don't have a strategy problem. They have a signal problem. We collapse noisy dashboards, orphan campaigns and half-instrumented funnels into one operating picture.",
  },
  {
    title: "Outcomes over opinions",
    body:
      "No brand-vs-performance debates. No taste-based decisions. What the data says, what the market rewards, and what your team can actually execute — in that order.",
  },
  {
    title: "Human-led, AI-enhanced",
    body:
      "AI handles the mechanical layer — reporting, tagging, first-pass creative, research. Humans own judgment, positioning and the calls that move the P&L.",
  },
];

const services = [
  {
    slug: "clarity-sprint",
    name: "Marketing Clarity Sprint",
    for: "Brands with campaigns running everywhere but no idea what's working.",
    outcome: "Smarter budget allocation. One coherent system.",
  },
  {
    slug: "fix-my-funnel",
    name: "Fix My Funnel",
    for: "E-commerce businesses generating traffic but losing money to leaks and drop-offs.",
    outcome: "Higher conversion from existing traffic.",
  },
  {
    slug: "growth-audit",
    name: "Growth System Audit",
    for: "B2B companies where marketing is active but pipeline is inconsistent.",
    outcome: "Knowing exactly what to fix first.",
  },
  {
    slug: "fractional",
    name: "Fractional Growth Marketing",
    for: "DACH B2B companies needing senior marketing infrastructure without a full-time hire.",
    outcome: "Operator-grade leadership, on retainer.",
  },
];

const latestInsights = [
  {
    eyebrow: "Performance",
    title: "Visibility Is Not Pipeline.",
    dek: "Why marketing activity rarely converts to revenue in specialist markets — and the four structural gaps that close the loop.",
    href: "https://insights.nm-insight.com/article",
  },
  {
    eyebrow: "Analytics & Tracking",
    title: "UTM Governance Is a Revenue System.",
    dek: "Tracking is not a plugin. It's the ledger every downstream decision is built on — and most teams keep it in a spreadsheet.",
    href: "https://insights.nm-insight.com",
  },
  {
    eyebrow: "Growth Systems",
    title: "Your CRM Is the Real Marketing Tool.",
    dek: "The handoff between marketing and sales is where most pipeline dies. The fix is structural, not cultural.",
    href: "https://insights.nm-insight.com",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-[var(--ink-deep)]">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-white/8">
          <div className="mx-auto max-w-6xl px-6 pt-24 pb-20">
            <p className="eyebrow">B2B performance marketing · Berlin</p>
            <h1 className="font-display mt-6 text-5xl md:text-7xl lg:text-8xl text-[var(--paper)] leading-[0.98] tracking-tight">
              Results First.
              <br />
              <span className="text-[var(--accent-cyan)]">Buzzwords</span> Later.
            </h1>
            <p className="mt-8 text-white/70 max-w-2xl text-lg md:text-xl leading-relaxed">
              You don't need another marketing idea — you need a system that actually delivers.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--accent-cyan)] text-[var(--ink-deep)] px-7 py-3 text-sm font-medium hover:brightness-110"
              >
                Book a Clarity Call →
              </a>
              <Link
                to="/services"
                className="rounded-full border border-white/25 text-[var(--paper)] px-7 py-3 text-sm hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
              >
                See how we work
              </Link>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="border-b border-white/8">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="eyebrow">How we operate</p>
                <h2 className="font-display text-3xl md:text-5xl text-[var(--paper)] mt-3 leading-tight">
                  Four principles. No exceptions.
                </h2>
              </div>
              <p className="text-sm text-white/60 max-w-sm">
                Every engagement runs on the same operating rules — the ones that separate marketing
                that compounds from marketing that just runs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  className="bg-[var(--ink-deep)] p-10 flex flex-col"
                >
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-cyan)] font-semibold">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-[var(--paper)] mt-4 leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-white/65 leading-relaxed text-[15px]">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="border-b border-white/8">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="eyebrow">Engagements</p>
                <h2 className="font-display text-3xl md:text-5xl text-[var(--paper)] mt-3 leading-tight">
                  Four ways to work together.
                </h2>
              </div>
              <Link
                to="/services"
                className="text-sm text-[var(--accent-cyan)] hover:brightness-110"
              >
                All services →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to="/services"
                  hash={s.slug}
                  className="group bg-[var(--paper)] text-[#0f172a] rounded-sm p-8 flex flex-col hover:-translate-y-0.5 transition-transform"
                >
                  <h3 className="font-display text-2xl md:text-3xl text-[var(--ink-navy)] leading-snug group-hover:text-[#0a8a8d]">
                    {s.name}
                  </h3>
                  <p className="mt-4 text-sm text-black/65 leading-relaxed">
                    <span className="uppercase tracking-[0.16em] text-[10px] text-black/45 font-semibold">For — </span>
                    {s.for}
                  </p>
                  <p className="mt-3 text-sm text-black/75 leading-relaxed">
                    <span className="uppercase tracking-[0.16em] text-[10px] text-[#0a8a8d] font-semibold">Outcome — </span>
                    {s.outcome}
                  </p>
                  <span className="mt-auto pt-6 text-xs text-black/50 group-hover:text-[#0a8a8d]">
                    Read the scope →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Insights */}
        <section className="border-b border-white/8">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="eyebrow">The publication</p>
                <h2 className="font-display text-3xl md:text-5xl text-[var(--paper)] mt-3 leading-tight">
                  Latest Insights.
                </h2>
              </div>
              <a
                href="https://insights.nm-insight.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--accent-cyan)] hover:brightness-110"
              >
                insights.nm-insight.com ↗
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {latestInsights.map((a) => (
                <a
                  key={a.title}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/[0.03] border border-white/8 rounded-sm p-7 flex flex-col hover:border-[var(--accent-cyan)]/60 transition-colors"
                >
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-cyan)] font-semibold">
                    {a.eyebrow}
                  </span>
                  <h3 className="font-display text-xl mt-4 leading-snug text-[var(--paper)] group-hover:text-[var(--accent-cyan)]">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed">{a.dek}</p>
                  <span className="mt-auto pt-6 text-xs text-white/60">Read the issue ↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* About / Positioning */}
        <section id="about" className="border-b border-white/8">
          <div className="mx-auto max-w-4xl px-6 py-24">
            <p className="eyebrow">About</p>
            <h2 className="font-display text-3xl md:text-5xl text-[var(--paper)] mt-4 leading-[1.1]">
              Built on the operational side of marketing — where acquisition, attribution and
              revenue actually meet.
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-white/70 leading-relaxed">
              <p>
                International background across B2B SaaS, e-commerce and industrial tech. The focus
                is the infrastructure between acquisition and revenue — Google Ads, GA4/GTM,
                attribution and the growth systems most teams treat as an afterthought.
              </p>
              <p>
                Every engagement is run by an operator, not an account manager. Fewer decks. More
                decisions. Fewer opinions. More measurable outcomes.
              </p>
            </div>
            <div className="mt-10">
              <Link
                to="/about"
                className="text-sm text-[var(--accent-cyan)] hover:brightness-110"
              >
                Full positioning →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-[var(--ink-navy)]">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center">
            <p className="eyebrow">Next step</p>
            <h2 className="font-display text-4xl md:text-6xl text-[var(--paper)] mt-4 leading-[1.05]">
              Map the gap between activity and revenue.
            </h2>
            <p className="mt-6 text-white/70 max-w-xl mx-auto text-lg">
              30 minutes. No pitch. A direct read on where your marketing system is leaking — and
              what to fix first.
            </p>
            <div className="mt-10">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--accent-cyan)] text-[var(--ink-deep)] px-8 py-4 text-sm font-medium hover:brightness-110 inline-block"
              >
                Book a Clarity Call →
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
