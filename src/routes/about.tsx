import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

const CALENDLY = "https://calendly.com/natalia-marianchyk/strategic-intro-call";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — NM Insight" },
      {
        name: "description",
        content:
          "NM Insight is a Berlin-based B2B performance marketing consultancy focused on the infrastructure between acquisition and revenue.",
      },
      { property: "og:title", content: "About — NM Insight" },
      {
        property: "og:description",
        content:
          "A Berlin-based B2B performance marketing consultancy focused on the infrastructure between acquisition and revenue.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--ink-deep)]">
      <SiteHeader />
      <main>
        <section className="border-b border-white/8">
          <div className="mx-auto max-w-4xl px-6 pt-24 pb-20">
            <p className="eyebrow">About</p>
            <h1 className="font-display mt-5 text-4xl md:text-6xl text-[var(--paper)] leading-[1.05] tracking-tight">
              A consultancy built on the operational side of marketing.
            </h1>

            <div className="mt-12 space-y-6 text-white/75 leading-relaxed text-lg max-w-2xl">
              <p>
                NM Insight is a Berlin-based B2B performance marketing consultancy. International
                background across B2B SaaS, e-commerce and industrial tech — sectors where
                acquisition looks nothing alike but the underlying revenue mechanics do.
              </p>
              <p>
                The focus is the infrastructure between acquisition and revenue: Google Ads,
                GA4/GTM, attribution, UTM governance, CRM handoff, growth systems. The layer most
                teams treat as plumbing — and where most pipeline is actually won or lost.
              </p>
              <p>
                Every engagement is run by an operator. Fewer decks. More decisions. Fewer
                opinions. More measurable outcomes.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/8 pt-12">
              <div>
                <p className="eyebrow">Base</p>
                <p className="mt-3 text-[var(--paper)]">Berlin · DACH-focused</p>
              </div>
              <div>
                <p className="eyebrow">Sectors</p>
                <p className="mt-3 text-[var(--paper)]">B2B SaaS · E-commerce · Industrial tech</p>
              </div>
              <div>
                <p className="eyebrow">Stack</p>
                <p className="mt-3 text-[var(--paper)]">
                  Google Ads · GA4 · GTM · Server-side tagging · HubSpot · Salesforce
                </p>
              </div>
            </div>

            <div className="mt-16 flex flex-wrap gap-3">
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
                See services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
