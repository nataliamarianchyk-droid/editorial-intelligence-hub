import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { unlockSite } from "@/lib/gate.functions";
import nmLogo from "@/assets/nm-insight-logo.png";

export const Route = createFileRoute("/unlock")({
  component: Unlock,
  head: () => ({
    meta: [
      { title: "Unlock - NM Insight" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function Unlock() {
  const router = useRouter();
  const unlock = useServerFn(unlockSite);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(false);
    const password = String(new FormData(event.currentTarget).get("password") ?? "");
    try {
      const result = await unlock({ data: { password } });
      if (result.ok) {
        await router.navigate({ to: "/control-room" });
        return;
      }
      setError(true);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--cream)] px-6 py-16 text-[var(--ink-deep)]">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-3">
          <img src={nmLogo} alt="NM Insight" className="h-10 w-10 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-sm tracking-[0.08em] text-[var(--ink-deep)]">NM INSIGHT</div>
            <div className="text-[10px] tracking-[0.28em] text-[var(--ink-deep)]/60 uppercase">Internal</div>
          </div>
        </div>
        <h1 className="font-display text-3xl font-medium text-[var(--ink-deep)]">Restricted area</h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--ink-deep)]/60">
          This page is for the NM Insight team. Enter the access password to continue.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-[11px] uppercase tracking-[0.16em] text-[var(--ink-deep)]/60"
            >
              Access password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              required
              disabled={busy}
              className="mt-2 w-full rounded-md border border-[var(--ink-deep)]/15 bg-[var(--ink-deep)]/[0.04] px-3 py-2.5 text-sm text-[var(--ink-deep)] placeholder-[var(--ink-deep)]/30 outline-none focus:border-[var(--accent-cyan)]/60 focus:ring-1 focus:ring-[var(--accent-cyan)]/40"
            />
          </div>
          {error && (
            <p className="text-sm text-[var(--accent-amber)]" role="alert">
              Incorrect password. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center rounded-md border border-[var(--accent-cyan)]/40 bg-[var(--accent-cyan)]/10 px-4 py-2.5 text-sm font-medium text-[var(--accent-cyan)] transition hover:bg-[var(--accent-cyan)]/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
