import { Link } from "@tanstack/react-router";
import nmLogo from "@/assets/nm-insight-logo.png";
import { categories } from "@/lib/insights-data";

export function SiteHeader() {
  return (
    <header className="border-b border-white/8 bg-[var(--ink-deep)]/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={nmLogo} alt="NM Insight" className="h-11 w-11 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-base tracking-[0.08em] text-white">NM INSIGHT</div>
            <div className="text-[10px] tracking-[0.32em] text-white/60 uppercase">insights</div>
          </div>
        </Link>
        <nav className="hidden lg:flex gap-7 text-sm text-white/70">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              activeProps={{ className: "text-[var(--accent-cyan)]" }}
              className="hover:text-[var(--accent-cyan)] transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </nav>
        <a
          href="https://calendly.com/"
          className="hidden md:inline-flex text-xs uppercase tracking-[0.14em] text-[var(--ink-deep)] bg-[var(--accent-cyan)] rounded-full px-4 py-2 hover:brightness-110"
        >
          Clarity Call
        </a>
      </div>
      {/* Mobile category strip */}
      <div className="lg:hidden border-t border-white/8 overflow-x-auto">
        <div className="mx-auto max-w-7xl px-6 py-3 flex gap-5 text-xs text-white/60 whitespace-nowrap">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              activeProps={{ className: "text-[var(--accent-cyan)]" }}
              className="hover:text-[var(--accent-cyan)]"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[var(--ink-deep)] border-t border-white/8">
      <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        <div>
          <p className="font-display text-[var(--paper)] text-lg">
            NM <span className="text-[var(--accent-cyan)]">Insight</span>
          </p>
          <p className="mt-3 text-white/55 leading-relaxed">
            Insights from the operational side of performance marketing — where acquisition,
            attribution, content and systems connect.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Sections</p>
          <ul className="space-y-2 text-white/65">
            {categories.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="hover:text-[var(--accent-cyan)]"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Company</p>
          <ul className="space-y-2 text-white/65">
            <li>
              <a href="https://nm-insight.com" className="hover:text-[var(--accent-cyan)]">
                Services
              </a>
            </li>
            <li>
              <a href="https://nm-insight.com/about" className="hover:text-[var(--accent-cyan)]">
                About
              </a>
            </li>
            <li>
              <a href="mailto:hello@nm-insight.com" className="hover:text-[var(--accent-cyan)]">
                Contact
              </a>
            </li>
            <li>
              <a href="https://calendly.com/" className="hover:text-[var(--accent-cyan)]">
                Clarity Call
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Subscribe</p>
          <p className="text-white/55 mb-3">One insight per week. No noise.</p>
          <form className="flex">
            <input
              className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-sm text-[var(--paper)] focus:outline-none focus:border-[var(--accent-cyan)]"
              placeholder="you@company.com"
            />
            <button className="bg-[var(--accent-cyan)] text-[var(--ink-deep)] px-4 text-sm font-medium">
              →
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-white/40 flex justify-between">
          <span>© 2026 NM Insight · Berlin</span>
          <span>
            <a href="#" className="hover:text-white/70">Imprint</a>
            <span className="mx-2">·</span>
            <a href="#" className="hover:text-white/70">Privacy</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
