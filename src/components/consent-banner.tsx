import { useEffect, useState } from "react";

const COOKIE_NAME = "nm_consent";
const COOKIE_DAYS = 180;
const REOPEN_EVENT = "nm-consent:reopen";
const CHANGE_EVENT = "nm-consent:change";

type Decision = "granted" | "denied";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function writeCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function applyConsent(decision: Decision) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== "function") return;
  w.gtag("consent", "update", {
    ad_storage: decision,
    ad_user_data: decision,
    ad_personalization: decision,
    analytics_storage: decision,
  });
}

export function getConsentDecision(): Decision | null {
  const v = readCookie(COOKIE_NAME);
  return v === "granted" || v === "denied" ? v : null;
}

export function openConsentPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(REOPEN_EVENT));
}

export function useConsentDecision(): Decision | null {
  const [decision, setDecision] = useState<Decision | null>(null);
  useEffect(() => {
    setDecision(getConsentDecision());
    const onChange = () => setDecision(getConsentDecision());
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);
  return decision;
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getConsentDecision();
    if (existing === "granted") {
      applyConsent("granted");
    } else if (existing === null) {
      setVisible(true);
    }
    const onReopen = () => setVisible(true);
    window.addEventListener(REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(REOPEN_EVENT, onReopen);
  }, []);

  if (!visible) return null;

  const finish = (decision: Decision) => {
    writeCookie(COOKIE_NAME, decision, COOKIE_DAYS);
    applyConsent(decision);
    window.dispatchEvent(new Event(CHANGE_EVENT));
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: "#1a1f3a",
        color: "#ffffff",
        fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif",
        borderTop: "1px solid rgba(94, 200, 240, 0.35)",
        padding: "16px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 16,
          justifyContent: "space-between",
        }}
      >
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, flex: "1 1 320px" }}>
          We use cookies to measure audience and improve editorial reach. See our{" "}
          <a
            href="/privacy"
            style={{ color: "#5ec8f0", textDecoration: "underline" }}
          >
            privacy notice
          </a>
          .
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={() => finish("denied")}
            style={{
              padding: "10px 20px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "transparent",
              color: "#ffffff",
              fontFamily: "inherit",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => finish("granted")}
            style={{
              padding: "10px 20px",
              borderRadius: 9999,
              border: "1px solid #5ec8f0",
              background: "#5ec8f0",
              color: "#1a1f3a",
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
