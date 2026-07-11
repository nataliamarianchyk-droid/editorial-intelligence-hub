import { Link } from "@tanstack/react-router";
import nmLogo from "@/assets/nm-insight-logo.png";

const CALENDLY = "https://calendly.com/natalia-marianchyk/strategic-intro-call";

export function SiteHeader() {
  return (
    <header className="border-b border-white/8 bg-[var(--ink-deep)]/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={nmLogo} alt="NM Insight" width={44} height={44} fetchPriority="high" decoding="async" className="h-11 w-11 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-base tracking-[0.08em] text-white">NM INSIGHT</div>
            <div className="text-[10px] tracking-[0.32em] text-white/60 uppercase">consultancy</div>
          </div>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm text-white/70">
          <Link
            to="/services"
            activeProps={{ className: "text-[var(--accent-cyan)]" }}
            className="hover:text-[var(--accent-cyan)] transition-colors"
          >
            Services
          </Link>
          <Link
            to="/about"
            activeProps={{ className: "text-[var(--accent-cyan)]" }}
            className="hover:text-[var(--accent-cyan)] transition-colors"
          >
            About
          </Link>
          <a
            href="https://insights.nm-insight.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent-cyan)] transition-colors"
          >
            Insights ↗
          </a>
          <a
            href="#contact"
            className="hover:text-[var(--accent-cyan)] transition-colors"
          >
            Contact
          </a>
        </nav>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex text-xs uppercase tracking-[0.14em] text-[var(--ink-deep)] bg-[var(--accent-cyan)] rounded-full px-4 py-2 hover:brightness-110"
        >
          Clarity Call
        </a>
      </div>
      {/* Mobile strip */}
      <div className="md:hidden border-t border-white/8 overflow-x-auto">
        <div className="mx-auto max-w-7xl px-6 py-3 flex gap-6 text-xs text-white/65 whitespace-nowrap">
          <Link to="/services" activeProps={{ className: "text-[var(--accent-cyan)]" }}>Services</Link>
          <Link to="/about" activeProps={{ className: "text-[var(--accent-cyan)]" }}>About</Link>
          <a href="https://insights.nm-insight.com" target="_blank" rel="noopener noreferrer">Insights ↗</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-[var(--ink-deep)] border-t border-white/8">
      <div className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        <div>
          <p className="font-display text-[var(--paper)] text-lg">
            NM <span className="text-[var(--accent-cyan)]">Insight</span>
          </p>
          <p className="mt-3 text-white/60 leading-relaxed max-w-sm">
            Berlin-based B2B performance marketing consultancy. The infrastructure between
            acquisition and revenue.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Contact</p>
          <ul className="space-y-2 text-white/70">
            <li>
              <a href="mailto:hello@nm-insight.com" className="hover:text-[var(--accent-cyan)]">
                hello@nm-insight.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/nm-insight"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent-cyan)]"
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent-cyan)]"
              >
                Book a Clarity Call
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Explore</p>
          <ul className="space-y-2 text-white/70">
            <li><Link to="/services" className="hover:text-[var(--accent-cyan)]">Services</Link></li>
            <li><Link to="/about" className="hover:text-[var(--accent-cyan)]">About</Link></li>
            <li>
              <a
                href="https://insights.nm-insight.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent-cyan)]"
              >
                Insights ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-white/60 flex justify-between">
          <span>© NM Insight · Berlin</span>
          <span>Results First. Buzzwords Later.</span>
        </div>
      </div>
    </footer>
  );
}
