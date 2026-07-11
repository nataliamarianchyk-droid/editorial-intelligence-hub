import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ConsentCategory = "necessary" | "analytics" | "marketing";
export type ConsentState = Record<ConsentCategory, boolean>;

const STORAGE_KEY = "nmi.consent.v1";
const DEFAULT: ConsentState = { necessary: true, analytics: false, marketing: false };

type StoredConsent = { consent: ConsentState; decided: boolean; ts: number };

type Ctx = {
  consent: ConsentState;
  decided: boolean;
  hydrated: boolean;
  setConsent: (patch: Partial<ConsentState>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  openPreferences: () => void;
};

const ConsentContext = createContext<Ctx | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}

function persist(next: ConsentState) {
  try {
    const payload: StoredConsent = { consent: next, decided: true, ts: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota / private mode */
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState>(DEFAULT);
  const [decided, setDecided] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredConsent;
        setConsentState({ ...DEFAULT, ...parsed.consent, necessary: true });
        setDecided(!!parsed.decided);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const commit = useCallback((next: ConsentState) => {
    setConsentState(next);
    setDecided(true);
    persist(next);
  }, []);

  const setConsent = useCallback(
    (patch: Partial<ConsentState>) => {
      setConsentState((prev) => {
        const next: ConsentState = { ...prev, ...patch, necessary: true };
        persist(next);
        return next;
      });
      setDecided(true);
    },
    [],
  );

  const acceptAll = useCallback(
    () => commit({ necessary: true, analytics: true, marketing: true }),
    [commit],
  );
  const rejectAll = useCallback(
    () => commit({ necessary: true, analytics: false, marketing: false }),
    [commit],
  );
  const openPreferences = useCallback(() => setPrefsOpen(true), []);

  return (
    <ConsentContext.Provider
      value={{ consent, decided, hydrated, setConsent, acceptAll, rejectAll, openPreferences }}
    >
      {children}
      {hydrated && !decided && !prefsOpen && (
        <ConsentBanner
          onOpenPrefs={() => setPrefsOpen(true)}
          onAccept={acceptAll}
          onReject={rejectAll}
        />
      )}
      {hydrated && prefsOpen && (
        <ConsentPreferences
          initial={consent}
          onClose={() => setPrefsOpen(false)}
          onSave={(next) => {
            commit(next);
            setPrefsOpen(false);
          }}
          onAcceptAll={() => {
            acceptAll();
            setPrefsOpen(false);
          }}
          onRejectAll={() => {
            rejectAll();
            setPrefsOpen(false);
          }}
        />
      )}
    </ConsentContext.Provider>
  );
}

function ConsentBanner({
  onOpenPrefs,
  onAccept,
  onReject,
}: {
  onOpenPrefs: () => void;
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-5xl rounded-sm border border-white/12 bg-[var(--ink-navy)]/98 backdrop-blur shadow-2xl">
        <div className="p-6 sm:p-7 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="text-sm leading-relaxed text-white/75">
            <p className="eyebrow mb-2">Cookies</p>
            <p className="text-[var(--paper)]">
              We use essential cookies to run this site. With your consent, we also use analytics
              and marketing cookies - including the LinkedIn Insight Tag - to measure audience and
              improve editorial reach. You can change your choice at any time via{" "}
              <button
                type="button"
                onClick={onOpenPrefs}
                className="underline underline-offset-2 hover:text-[var(--accent-cyan)]"
              >
                Cookie settings
              </button>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            <button
              type="button"
              onClick={onReject}
              className="rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-white/80 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={onOpenPrefs}
              className="rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-white/80 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
            >
              Preferences
            </button>
            <button
              type="button"
              onClick={onAccept}
              className="rounded-full bg-[var(--accent-cyan)] text-[var(--ink-deep)] px-5 py-2.5 text-xs uppercase tracking-[0.14em] font-medium hover:brightness-110"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsentPreferences({
  initial,
  onClose,
  onSave,
  onAcceptAll,
  onRejectAll,
}: {
  initial: ConsentState;
  onClose: () => void;
  onSave: (next: ConsentState) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}) {
  const [draft, setDraft] = useState<ConsentState>(initial);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-black/70 p-4"
    >
      <div className="w-full max-w-2xl rounded-sm border border-white/12 bg-[var(--ink-navy)] shadow-2xl">
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-white/8">
          <div>
            <p className="eyebrow">Cookies</p>
            <h2 className="font-display text-2xl text-[var(--paper)] mt-1">Cookie preferences</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cookie preferences"
            className="text-white/60 hover:text-[var(--accent-cyan)] text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-7 py-5 space-y-4 text-sm text-white/70 max-h-[60vh] overflow-y-auto">
          <p>
            We group cookies by purpose. Essential cookies always run so the site works. You choose
            whether to allow analytics and marketing cookies.
          </p>

          <CategoryRow
            title="Essential"
            description="Required for the site to function. Cannot be turned off."
            checked
            disabled
          />
          <CategoryRow
            title="Analytics"
            description="Aggregated traffic and content performance measurement. No cross-site profiling."
            checked={draft.analytics}
            onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
          />
          <CategoryRow
            title="Marketing"
            description="LinkedIn Insight Tag and similar advertising pixels used to measure audience reach and remarketing eligibility."
            checked={draft.marketing}
            onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
          />
        </div>

        <div className="px-7 py-5 border-t border-white/8 flex flex-wrap gap-2 justify-end">
          <button
            type="button"
            onClick={onRejectAll}
            className="rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-white/80 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => onSave(draft)}
            className="rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-white/80 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
          >
            Save choices
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="rounded-full bg-[var(--accent-cyan)] text-[var(--ink-deep)] px-5 py-2.5 text-xs uppercase tracking-[0.14em] font-medium hover:brightness-110"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 border border-white/8 rounded-sm p-4">
      <div>
        <p className="font-display text-[var(--paper)] text-base">{title}</p>
        <p className="mt-1 text-white/60 leading-relaxed">{description}</p>
      </div>
      <label className="inline-flex items-start pt-1">
        <span className="sr-only">Toggle {title}</span>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="h-4 w-4 accent-[var(--accent-cyan)] disabled:opacity-60"
        />
      </label>
    </div>
  );
}
