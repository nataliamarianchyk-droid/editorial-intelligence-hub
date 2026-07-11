import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import nmLogo from "@/assets/nm-insight-logo.png";

export const Route = createFileRoute("/control-room")({
  component: ControlRoom,
  head: () => ({
    meta: [
      { title: "Control Room - Internal" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Status = "todo" | "doing" | "done";

const statusLabel: Record<Status, string> = {
  todo: "Not started",
  doing: "In progress",
  done: "Done",
};

const roadmap: { id: string; phase: string; title: string; detail: string; status: Status }[] = [
  { id: "r1", phase: "Phase 1", title: "Choose & purchase hosting", detail: "WordPress.com Business plan, annual billing.", status: "done" },
  { id: "r2", phase: "Phase 1", title: "Configure DNS in Canva", detail: "Add CNAME / A records for insights subdomain only.", status: "doing" },
  { id: "r3", phase: "Phase 1", title: "Verify subdomain & issue SSL", detail: "Confirm insights.nm-insight.com resolves with HTTPS.", status: "todo" },
  { id: "r4", phase: "Phase 2", title: "Install Kadence theme + child theme", detail: "Apply NM Insight color tokens and typography.", status: "todo" },
  { id: "r5", phase: "Phase 2", title: "Install plugin stack", detail: "Rank Math, Site Kit, GTM4WP, Complianz, WP Rocket.", status: "todo" },
  { id: "r6", phase: "Phase 2", title: "Create six categories with clean slugs", detail: "Strip /category/ base via Rank Math.", status: "todo" },
  { id: "r7", phase: "Phase 3", title: "Wire GA4 + GTM + Consent Mode v2", detail: "Single GTM container, consent gating via Complianz.", status: "todo" },
  { id: "r8", phase: "Phase 3", title: "Deploy LinkedIn Insight Tag via GTM", detail: "Custom HTML tag, fires after analytics consent.", status: "todo" },
  { id: "r9", phase: "Phase 3", title: "Verify Search Console + submit sitemap", detail: "Connect via Site Kit, submit sitemap_index.xml.", status: "todo" },
  { id: "r10", phase: "Phase 4", title: "Build homepage & single-post template", detail: "Static front page, 8-block structure, FSE template.", status: "todo" },
  { id: "r11", phase: "Phase 4", title: "Publish 'Visibility Is Not Pipeline'", detail: "First article in /performance/.", status: "todo" },
  { id: "r12", phase: "Phase 4", title: "Announce launch on LinkedIn", detail: "Cross-post with Insight Tag attribution.", status: "todo" },
];

type Stage = "ideas" | "drafting" | "editing" | "seo" | "visuals" | "scheduled" | "published";
const stages: { id: Stage; label: string }[] = [
  { id: "ideas", label: "Ideas" },
  { id: "drafting", label: "Drafting" },
  { id: "editing", label: "Editing" },
  { id: "seo", label: "SEO Review" },
  { id: "visuals", label: "Visuals" },
  { id: "scheduled", label: "Scheduled" },
  { id: "published", label: "Published" },
];

const pipelineSeed: { id: string; title: string; category: string; stage: Stage }[] = [
  { id: "p1", title: "Visibility Is Not Pipeline", category: "Performance", stage: "drafting" },
  { id: "p2", title: "Server-Side GTM Without the Theater", category: "Analytics & Tracking", stage: "ideas" },
  { id: "p3", title: "The MQL Is a Latency Problem", category: "Growth Systems", stage: "ideas" },
  { id: "p4", title: "LinkedIn Ads for Long Sales Cycles", category: "B2B SaaS", stage: "ideas" },
  { id: "p5", title: "Designing an Internal AI Marketing Stack", category: "AI & Marketing Operations", stage: "ideas" },
  { id: "p6", title: "DTC Attribution After ATT", category: "E-commerce", stage: "ideas" },
  { id: "p7", title: "GA4 Events That Actually Matter", category: "Analytics & Tracking", stage: "ideas" },
];

const categories = [
  { name: "Performance", slug: "/performance/", purpose: "Paid acquisition, Google Ads, LinkedIn Ads, bidding, creative testing.", planned: 6 },
  { name: "Analytics & Tracking", slug: "/analytics-tracking/", purpose: "GA4, GTM, server-side tagging, attribution, measurement.", planned: 5 },
  { name: "Growth Systems", slug: "/growth-systems/", purpose: "Lifecycle, funnels, lead-first marketing, RevOps.", planned: 4 },
  { name: "B2B SaaS", slug: "/b2b-saas/", purpose: "B2B acquisition, PLG, demand gen, ABM.", planned: 4 },
  { name: "AI & Marketing Operations", slug: "/ai-marketing-operations/", purpose: "AI orchestration, MOps automation, internal tooling.", planned: 4 },
  { name: "E-commerce", slug: "/ecommerce/", purpose: "DTC growth, Shopify, marketplace dynamics, retention.", planned: 3 },
];

const firstArticle = {
  title: "Visibility Is Not Pipeline",
  url: "/performance/visibility-is-not-pipeline/",
  seoTitle: "Visibility Is Not Pipeline - Why Impressions Don't Build Demand",
  metaDescription:
    "Reach without intent does not produce pipeline. A field guide to separating brand visibility from acquisition velocity in B2B performance marketing.",
  outline: [
    "The visibility trap",
    "Three signals that masquerade as demand",
    "What pipeline actually looks like upstream",
    "A measurement stack that survives scrutiny",
    "The operator's reframe",
  ],
  assets: [
    { label: "Cover image - 1600×900, navy + cyan + amber", done: false },
    { label: "OpenGraph card - 1200×630 with category chip", done: false },
    { label: "Author headshot & bio block", done: false },
    { label: "Inline diagram: funnel vs intent compounding", done: false },
    { label: "Schema: Article + BreadcrumbList via Rank Math", done: false },
  ],
  ctaChecklist: [
    { label: "Article-end: Explore NM Insight Services", done: false },
    { label: "Author bio: Connect on LinkedIn", done: false },
    { label: "Masthead button: Book a Clarity Call", done: false },
    { label: "GA4 events wired: cta_services_click, cta_calendly_click, cta_linkedin_click", done: false },
  ],
};

const ctaMatrix = [
  { surface: "Masthead (every page)", services: false, calendly: true, linkedin: false },
  { surface: "Homepage CTA band", services: true, calendly: true, linkedin: false },
  { surface: "Article - end of body", services: true, calendly: false, linkedin: false },
  { surface: "Article - author bio", services: false, calendly: false, linkedin: true },
  { surface: "Category archive footer", services: true, calendly: false, linkedin: false },
  { surface: "About page", services: true, calendly: true, linkedin: true },
  { surface: "Site footer", services: false, calendly: false, linkedin: true },
];

const techChecklist = [
  { group: "Domain & Hosting", items: ["DNS records added in Canva", "Subdomain resolves to host", "SSL issued (HTTPS forced)"] },
  { group: "WordPress", items: ["Kadence theme + child theme active", "Six categories created with clean slugs", "Permalink base stripped (/%category%/%postname%/)"] },
  { group: "Plugins", items: ["Rank Math SEO", "Site Kit by Google", "GTM4WP", "Complianz GDPR", "WP Rocket", "Redirection"] },
  { group: "Analytics & Tags", items: ["GA4 property created", "GTM container deployed", "Consent Mode v2 wired through Complianz", "LinkedIn Insight Tag via GTM (consent-gated)"] },
  { group: "Search", items: ["Search Console verified via Site Kit", "Sitemap submitted (/sitemap_index.xml)", "robots.txt allows crawling"] },
  { group: "Launch", items: ["Homepage built (8-block structure)", "Single-post template built", "First article published in /performance/", "Cookie banner tested with EU IP"] },
];

/* ------------------------------------------------------------------ */
/* UI primitives                                                       */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

function SectionHeader({ index, title, lede }: { index: string; title: string; lede: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <Eyebrow>Module {index}</Eyebrow>
      <h2 className="font-display mt-3 text-4xl font-medium text-white md:text-5xl">{title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-white/60">{lede}</p>
    </div>
  );
}

function StatusDot({ status }: { status: Status }) {
  const color =
    status === "done"
      ? "bg-[var(--accent-cyan)]"
      : status === "doing"
      ? "bg-[var(--accent-amber)]"
      : "bg-white/20";
  return <span className={`inline-block h-2 w-2 rounded-full ${color}`} />;
}

function Pill({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "cyan" | "amber" }) {
  const cls =
    tone === "cyan"
      ? "border-[var(--accent-cyan)]/40 text-[var(--accent-cyan)]"
      : tone === "amber"
      ? "border-[var(--accent-amber)]/40 text-[var(--accent-amber)]"
      : "border-white/15 text-white/60";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] ${cls}`}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function ControlRoom() {
  const [roadmapState, setRoadmapState] = useState(roadmap);
  const [pipeline, setPipeline] = useState(pipelineSeed);
  const [assets, setAssets] = useState(firstArticle.assets);
  const [ctas, setCtas] = useState(firstArticle.ctaChecklist);
  const [techState, setTechState] = useState<Record<string, boolean>>({});

  const progress = useMemo(() => {
    const done = roadmapState.filter((r) => r.status === "done").length;
    return Math.round((done / roadmapState.length) * 100);
  }, [roadmapState]);

  const cycleStatus = (id: string) => {
    setRoadmapState((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "todo" ? "doing" : r.status === "doing" ? "done" : "todo" }
          : r,
      ),
    );
  };

  const moveCard = (id: string, dir: -1 | 1) => {
    setPipeline((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const idx = stages.findIndex((s) => s.id === c.stage);
        const next = Math.min(stages.length - 1, Math.max(0, idx + dir));
        return { ...c, stage: stages[next].id };
      }),
    );
  };

  return (
    <div className="min-h-screen bg-[var(--ink-deep)] text-white">
      {/* Masthead */}
      <header className="border-b border-white/5 bg-[var(--ink-navy)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <div className="flex items-center gap-3">
            <img src={nmLogo} alt="NM Insight" className="h-12 w-12 object-contain" />
            <div className="leading-tight">
              <div className="font-display text-base tracking-[0.08em] text-white">NM INSIGHT</div>
              <div className="text-[10px] tracking-[0.32em] text-white/60 uppercase">marketing</div>
            </div>
            <div className="hidden sm:block ml-3 border-l border-white/15 pl-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Insights Control Room</div>
            </div>
          </div>
          <div className="hidden items-center gap-6 text-sm text-white/60 md:flex">
            <a href="#roadmap" className="hover:text-white">Roadmap</a>
            <a href="#pipeline" className="hover:text-white">Pipeline</a>
            <a href="#categories" className="hover:text-white">Categories</a>
            <a href="#first-article" className="hover:text-white">First article</a>
            <a href="#cta" className="hover:text-white">CTAs</a>
            <a href="#tech" className="hover:text-white">Technical</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-white/5 bg-[var(--ink-navy)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <Eyebrow>Internal - not the public site</Eyebrow>
          <h1 className="font-display mt-4 max-w-4xl text-4xl font-medium leading-[1.1] text-white md:text-6xl">
            The control room behind insights.nm-insight.com.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            Planning surface for the WordPress Insights hub launch and the editorial cadence behind it.
            The public hub stays on WordPress. This is where the work gets coordinated.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Stat label="Launch progress" value={`${progress}%`} accent />
            <Stat label="Articles in pipeline" value={pipeline.length.toString()} />
            <Stat label="Categories live" value={`0 / ${categories.length}`} />
            <Stat label="First article" value={firstArticle.title} small />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        {/* 1. Roadmap */}
        <section id="roadmap" className="scroll-mt-24">
          <SectionHeader
            index="01"
            title="Launch roadmap"
            lede="Sequenced phases from hosting to first published article. Click a status chip to advance it."
          />

          <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>Overall launch progress</span>
              <span className="font-medium text-white">{progress}%</span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[var(--accent-cyan)] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ol className="relative space-y-3 border-l border-white/10 pl-6">
            {roadmapState.map((step) => (
              <li key={step.id} className="relative">
                <span className="absolute -left-[29px] top-4">
                  <StatusDot status={step.status} />
                </span>
                <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Pill>{step.phase}</Pill>
                      <span className="font-display text-base font-medium text-white">{step.title}</span>
                    </div>
                    <div className="mt-1.5 text-sm text-white/55">{step.detail}</div>
                  </div>
                  <button
                    onClick={() => cycleStatus(step.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.12em] transition ${
                      step.status === "done"
                        ? "border-[var(--accent-cyan)]/40 bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]"
                        : step.status === "doing"
                        ? "border-[var(--accent-amber)]/40 bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]"
                        : "border-white/15 bg-white/[0.02] text-white/60 hover:border-white/30"
                    }`}
                  >
                    <StatusDot status={step.status} />
                    {statusLabel[step.status]}
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <Divider />

        {/* 2. Pipeline */}
        <section id="pipeline" className="scroll-mt-24">
          <SectionHeader
            index="02"
            title="Editorial pipeline"
            lede="Seven-stage kanban from raw idea to published article. Use the arrows to advance a piece."
          />

          <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
            <div className="flex min-w-max gap-4 pb-2">
              {stages.map((stage) => {
                const items = pipeline.filter((p) => p.stage === stage.id);
                return (
                  <div key={stage.id} className="w-[260px] shrink-0">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                        {stage.label}
                      </div>
                      <span className="text-xs text-white/40">{items.length}</span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {items.length === 0 && (
                        <div className="rounded-lg border border-dashed border-white/10 p-4 text-xs text-white/30">
                          Empty
                        </div>
                      )}
                      {items.map((item) => {
                        const idx = stages.findIndex((s) => s.id === item.stage);
                        return (
                          <div
                            key={item.id}
                            className="rounded-lg border border-black/5 bg-[var(--paper)] p-3.5 text-[color:var(--card-foreground)] shadow-sm"
                          >
                            <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
                              {item.category}
                            </div>
                            <div className="font-display mt-1.5 text-[15px] font-medium leading-snug">
                              {item.title}
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex gap-1">
                                <button
                                  onClick={() => moveCard(item.id, -1)}
                                  disabled={idx === 0}
                                  className="rounded-md border border-slate-200 px-2 py-0.5 text-xs text-slate-600 transition hover:bg-slate-100 disabled:opacity-30"
                                  aria-label="Previous stage"
                                >
                                  ←
                                </button>
                                <button
                                  onClick={() => moveCard(item.id, 1)}
                                  disabled={idx === stages.length - 1}
                                  className="rounded-md border border-slate-200 px-2 py-0.5 text-xs text-slate-600 transition hover:bg-slate-100 disabled:opacity-30"
                                  aria-label="Next stage"
                                >
                                  →
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Divider />

        {/* 3. Categories */}
        <section id="categories" className="scroll-mt-24">
          <SectionHeader
            index="03"
            title="Category map"
            lede="Six topics that define the editorial perimeter. Each one a long-term content vertical, not a tag."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <article
                key={c.slug}
                className="group flex flex-col rounded-xl border border-black/5 bg-[var(--paper)] p-6 text-[color:var(--card-foreground)] transition hover:border-[var(--accent-cyan)]/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                    Category
                  </span>
                  <span className="text-xs text-slate-400">{c.planned} planned</span>
                </div>
                <h3 className="font-display mt-3 text-2xl font-medium leading-tight">{c.name}</h3>
                <code className="mt-2 text-xs text-slate-500">{c.slug}</code>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{c.purpose}</p>
                <div className="mt-5 h-px bg-slate-200" />
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-300" />
                  0 published
                </div>
              </article>
            ))}
          </div>
        </section>

        <Divider />

        {/* 4. First article */}
        <section id="first-article" className="scroll-mt-24">
          <SectionHeader
            index="04"
            title="First article tracker"
            lede="Single source of truth for the inaugural piece. Everything ships from this card."
          />

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="border-b border-white/10 p-8 md:p-10">
              <Pill tone="cyan">Performance</Pill>
              <h3 className="font-display mt-4 text-3xl font-medium leading-tight text-white md:text-4xl">
                {firstArticle.title}
              </h3>
              <code className="mt-3 inline-block text-xs text-white/50">
                insights.nm-insight.com{firstArticle.url}
              </code>

              <dl className="mt-8 grid gap-6 md:grid-cols-2">
                <Field label="SEO title">{firstArticle.seoTitle}</Field>
                <Field label="Meta description">{firstArticle.metaDescription}</Field>
              </dl>
            </div>

            <div className="grid gap-0 md:grid-cols-3">
              <Block title="H2 outline">
                <ol className="space-y-2 text-sm text-white/70">
                  {firstArticle.outline.map((h, i) => (
                    <li key={h} className="flex gap-3">
                      <span className="font-display text-[var(--accent-cyan)]">0{i + 1}</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ol>
              </Block>
              <Block title="Asset checklist">
                <CheckList items={assets} onToggle={(i) => setAssets((p) => p.map((x, idx) => (idx === i ? { ...x, done: !x.done } : x)))} />
              </Block>
              <Block title="CTA placement" last>
                <CheckList items={ctas} onToggle={(i) => setCtas((p) => p.map((x, idx) => (idx === i ? { ...x, done: !x.done } : x)))} />
              </Block>
            </div>
          </div>
        </section>

        <Divider />

        {/* 5. CTA matrix */}
        <section id="cta" className="scroll-mt-24">
          <SectionHeader
            index="05"
            title="CTA matrix"
            lede="Where each call-to-action surfaces, with the GA4 event each click fires."
          />

          <div className="mb-6 grid gap-3 md:grid-cols-3">
            <CtaCard title="Explore NM Insight Services" event="cta_services_click" href="https://nm-insight.com/services" tone="cyan" />
            <CtaCard title="Book a Clarity Call" event="cta_calendly_click" href="Calendly URL" tone="amber" />
            <CtaCard title="Connect on LinkedIn" event="cta_linkedin_click" href="LinkedIn profile" tone="default" />
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.04] text-[10px] uppercase tracking-[0.14em] text-white/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Surface</th>
                  <th className="px-4 py-3 text-center font-medium">Services</th>
                  <th className="px-4 py-3 text-center font-medium">Clarity Call</th>
                  <th className="px-4 py-3 text-center font-medium">LinkedIn</th>
                </tr>
              </thead>
              <tbody>
                {ctaMatrix.map((row, i) => (
                  <tr key={row.surface} className={i % 2 === 1 ? "bg-white/[0.015]" : ""}>
                    <td className="px-4 py-3 text-white/80">{row.surface}</td>
                    <Cell on={row.services} tone="cyan" />
                    <Cell on={row.calendly} tone="amber" />
                    <Cell on={row.linkedin} tone="default" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider />

        {/* 6. Technical checklist */}
        <section id="tech" className="scroll-mt-24">
          <SectionHeader
            index="06"
            title="Technical launch checklist"
            lede="The non-negotiables. Every box ticked before the site goes public."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {techChecklist.map((group) => (
              <div key={group.group} className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="font-display text-lg font-medium text-white">{group.group}</div>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => {
                    const key = `${group.group}::${item}`;
                    const checked = !!techState[key];
                    return (
                      <li key={key}>
                        <button
                          onClick={() => setTechState((p) => ({ ...p, [key]: !p[key] }))}
                          className="flex w-full items-start gap-3 text-left text-sm text-white/70 hover:text-white"
                        >
                          <span
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                              checked
                                ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)] text-[var(--ink-deep)]"
                                : "border-white/25"
                            }`}
                          >
                            {checked && (
                              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M2 6.5L5 9.5L10 3.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className={checked ? "line-through opacity-50" : ""}>{item}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[var(--ink-navy)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between md:px-10">
          <div>NM Insight · Insights Control Room · Internal planning surface</div>
          <div>Public hub: insights.nm-insight.com (WordPress)</div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */

function Divider() {
  return <div className="my-20 h-px w-full bg-white/5 md:my-28" />;
}

function Stat({ label, value, accent, small }: { label: string; value: string; accent?: boolean; small?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">{label}</div>
      <div
        className={`font-display mt-2 font-medium ${
          small ? "text-base text-white" : accent ? "text-3xl text-[var(--accent-cyan)]" : "text-3xl text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.14em] text-white/45">{label}</dt>
      <dd className="mt-2 text-sm leading-relaxed text-white/80">{children}</dd>
    </div>
  );
}

function Block({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`p-8 md:p-10 ${!last ? "border-b border-white/10 md:border-b-0 md:border-r" : ""}`}>
      <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function CheckList({
  items,
  onToggle,
}: {
  items: { label: string; done: boolean }[];
  onToggle: (index: number) => void;
}) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={item.label}>
          <button
            onClick={() => onToggle(i)}
            className="flex w-full items-start gap-3 text-left text-sm text-white/75 hover:text-white"
          >
            <span
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                item.done
                  ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)] text-[var(--ink-deep)]"
                  : "border-white/25"
              }`}
            >
              {item.done && (
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 6.5L5 9.5L10 3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className={item.done ? "line-through opacity-50" : ""}>{item.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function CtaCard({
  title,
  event,
  href,
  tone,
}: {
  title: string;
  event: string;
  href: string;
  tone: "cyan" | "amber" | "default";
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <Pill tone={tone}>CTA</Pill>
      <div className="font-display mt-3 text-lg font-medium text-white">{title}</div>
      <div className="mt-3 space-y-1.5 text-xs">
        <div className="text-white/45">Destination</div>
        <code className="block truncate text-white/75">{href}</code>
        <div className="pt-2 text-white/45">GA4 event</div>
        <code className="block text-[var(--accent-cyan)]">{event}</code>
      </div>
    </div>
  );
}

function Cell({ on, tone }: { on: boolean; tone: "cyan" | "amber" | "default" }) {
  const color =
    tone === "cyan"
      ? "text-[var(--accent-cyan)]"
      : tone === "amber"
      ? "text-[var(--accent-amber)]"
      : "text-white";
  return (
    <td className="px-4 py-3 text-center">
      {on ? (
        <span className={`inline-block ${color}`}>●</span>
      ) : (
        <span className="inline-block text-white/15"> - </span>
      )}
    </td>
  );
}
