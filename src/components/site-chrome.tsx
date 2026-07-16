import { useState } from "react";
import { Link } from "@tanstack/react-router";
import nmLogo from "@/assets/nm-insight-logo.png";
import { categories } from "@/lib/insights-data";
import { openConsentPreferences } from "@/components/consent-banner";

export function SiteHeader() {
  return (
    <header className="border-b border-white/8 bg-[var(--ink-deep)]/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={nmLogo} alt="NM Insight" width={44} height={44} fetchPriority="high" decoding="async" className="h-11 w-11 object-contain" />
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
          <Link
            to="/issues"
            activeProps={{ className: "text-[var(--accent-cyan)]" }}
            className="hover:text-[var(--accent-cyan)] transition-colors"
          >
            Issues
          </Link>
        </nav>
        <a
          href="https://calendly.com/natalia-marianchyk/strategic-intro-call"
          target="_blank"
          rel="noopener noreferrer"
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
            Insights from the operational side of performance marketing - where acquisition,
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
              <a
                href="https://nm-insight.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent-cyan)]"
              >
                nm-insight.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/nm-insight/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent-cyan)] inline-flex items-center gap-1.5"
                aria-label="NM Insight on LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 fill-current"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8h4.53v14H.24V8zm7.36 0h4.34v1.92h.06c.6-1.14 2.08-2.34 4.28-2.34 4.57 0 5.42 3 5.42 6.9V22h-4.53v-6.14c0-1.46-.03-3.34-2.04-3.34-2.04 0-2.35 1.6-2.35 3.24V22H7.6V8z" />
                </svg>
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:hello@nm-insight.com" className="hover:text-[var(--accent-cyan)]">
                Contact
              </a>
            </li>
            <li>
              <a
                href="https://calendly.com/natalia-marianchyk/strategic-intro-call"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent-cyan)]"
              >
                Clarity Call
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Subscribe</p>
          <p className="text-white/55 mb-3">One insight per week. No noise.</p>
          <FooterSubscribeForm />
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-white/65 flex justify-between">
          <span>© 2026 NM Insight · Berlin</span>
          <span>
            <Link to="/impressum" className="hover:text-white/70">Imprint</Link>
            <span className="mx-2">·</span>
            <Link to="/privacy" className="hover:text-white/70">Privacy</Link>
            <span className="mx-2">·</span>
            <CookieSettingsButton />
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterSubscribeForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const { submitSubscribe } = await import("@/lib/subscribe-client");
      const result = await submitSubscribe({ email });
      setState(result.ok ? "ok" : "error");
      setMessage(result.message);
      if (result.ok) setEmail("");
    } catch {
      setState("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-sm text-[var(--paper)] focus:outline-none focus:border-[var(--accent-cyan)]"
          placeholder="you@company.com"
          disabled={state === "loading" || state === "ok"}
        />
        <button
          type="submit"
          disabled={state === "loading" || state === "ok"}
          aria-label="Subscribe"
          className="bg-[var(--accent-cyan)] text-[var(--ink-deep)] px-4 text-sm font-medium disabled:opacity-60"
        >
          {state === "loading" ? "…" : state === "ok" ? "✓" : "→"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-2 text-[11px] ${
            state === "ok" ? "text-[var(--accent-cyan)]" : "text-[var(--accent-amber)]"
          }`}
        >
          {message}
        </p>
      )}
    </>
  );
}


function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openConsentPreferences}
      className="hover:text-white/70"
    >
      Cookie settings
    </button>
  );
}
