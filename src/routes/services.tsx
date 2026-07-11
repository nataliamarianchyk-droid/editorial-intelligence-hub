import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

const CALENDLY = "https://calendly.com/natalia-marianchyk/strategic-intro-call";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — NM Insight" },
      {
        name: "description",
        content:
          "Four ways to work with NM Insight: Clarity Sprint, Fix My Funnel, Growth System Audit, and Fractional Growth Marketing for DACH B2B.",
      },
      { property: "og:title", content: "Services — NM Insight" },
      {
        property: "og:description",
        content:
          "Four ways to work with NM Insight: Clarity Sprint, Fix My Funnel, Growth System Audit, Fractional Growth Marketing.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

type Service = {
  slug: string;
  name: string;
  for: string;
  includes: string[];
  outcome: string;
};

const services: Service[] = [
  {
    slug: "clarity-sprint",
    name: "Marketing Clarity Sprint",
    for: "Brands with campaigns running everywhere but no idea what's actually working.",
    includes: [
      "Positioning & messaging alignment",
      "Full campaign audit (paid + organic)",
      "90-day strategy",
      "Tracking dashboards + KPI setup",
      "Channel recommendations",
    ],
    outcome: "Smarter budget allocation. One coherent system.",
  },
  {
    slug: "fix-my-funnel",
    name: "Fix My Funnel",
    for: "E-commerce businesses generating traffic but losing money through leaks and drop-offs.",
    includes: [
      "Funnel mapping",
      "Catalog analysis",
      "Checkout / UX audit",
      "A/B test plan",
      "90-day optimization roadmap",
    ],
    outcome: "Higher conversion from existing traffic.",
  },
  {
    slug: "growth-audit",
    name: "Growth System Audit",
    for: "B2B companies where marketing is active but pipeline is inconsistent.",
    includes: [
      "GA4 / GTM attribution review",
      "UTM governance",
      "CRM handoff diagnosis",
      "Channel-level ROI clarity",
    ],
    outcome: "Knowing exactly what to fix first.",
  },
  {
    slug: "fractional",
    name: "Fractional Growth Marketing",
    for: "DACH B2B companies that need senior marketing infrastructure without a full-time hire.",
    includes: [
      "Ongoing operator support",
      "Channel strategy & execution oversight",
      "Team, agency and vendor management",
      "Attribution, reporting and revenue accountability",
    ],
    outcome: "Operator-grade leadership, on retainer.",
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--ink-deep)]">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-white/8">
          <div className="mx-auto max-w-5xl px-6 pt-20 pb-16">
            <p className="eyebrow">Services</p>
            <h1 className="font-display mt-5 text-4xl md:text-6xl text-[var(--paper)] leading-[1.05] tracking-tight">
              Four engagements. Each one ends with a system, not a slide deck.
            </h1>
            <p className="mt-8 text-white/70 max-w-2xl text-lg leading-relaxed">
              Every offer follows the same discipline: define who it's for, name exactly what's
              inside, commit to a measurable outcome. If it doesn't move the P&L, it isn't scope.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="border-b border-white/8">
          <div className="mx-auto max-w-5xl px-6 py-20 space-y-16">
            {services.map((s, i) => (
              <article
                key={s.slug}
                id={s.slug}
                className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-14 scroll-mt-28"
              >
                <div className="md:pt-2">
                  <span className="font-display text-5xl md:text-6xl text-[var(--accent-cyan)]">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl text-[var(--paper)] leading-tight">
                    {s.name}
                  </h2>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <p className="eyebrow">For</p>
                      <p className="mt-3 text-white/75 leading-relaxed text-[15px]">{s.for}</p>
                    </div>
                    <div>
                      <p className="eyebrow">Includes</p>
                      <ul className="mt-3 space-y-2 text-white/75 text-[15px] leading-relaxed">
                        {s.includes.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-[var(--accent-cyan)]">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="eyebrow">Outcome</p>
                      <p className="mt-3 text-[var(--paper)] leading-relaxed text-[15px] font-medium">
                        {s.outcome}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href={CALENDLY}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full border border-white/25 text-[var(--paper)] px-6 py-2.5 text-sm hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
                    >
                      Discuss this engagement →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-[var(--ink-navy)]">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center">
            <h2 className="font-display text-4xl md:text-5xl text-[var(--paper)] leading-tight">
              Not sure which one fits?
            </h2>
            <p className="mt-6 text-white/70 max-w-xl mx-auto">
              A Clarity Call is the fastest way to find out. 30 minutes, no pitch, direct read.
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
