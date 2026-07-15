import { useState, useEffect } from "react";

const CHANGE_EVENT = "nm-consent:change";
const REOPEN_EVENT = "nm-consent:reopen";

type Decision = "granted" | "denied";

function readDecision(): Decision | null {
  if (typeof document === "undefined") return null;
  const c = document.cookie.match(/(?:^|;\s*)nm_consent=(granted|denied)/);
  return c ? (c[1] as Decision) : null;
}

export function getConsentDecision(): Decision | null {
  return readDecision();
}

export function openConsentPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(REOPEN_EVENT));
}

export function useConsentDecision(): Decision | null {
  const [decision, setDecision] = useState<Decision | null>(null);
  useEffect(() => {
    setDecision(readDecision());
    const onChange = () => setDecision(readDecision());
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);
  return decision;
}

export function ConsentBanner() {
  const [decided, setDecided] = useState(true);

  useEffect(() => {
    const c = document.cookie.match(/(?:^|;\s*)nm_consent=(granted|denied)/);
    if (!c) setDecided(false);
    else if (c[1] === "granted") grant();

    const onReopen = () => setDecided(false);
    window.addEventListener(REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(REOPEN_EVENT, onReopen);
  }, []);

  function grant() {
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
  }

  function choose(v: Decision) {
    document.cookie = `nm_consent=${v};path=/;max-age=15552000;SameSite=Lax`; // 180 days
    if (v === "granted") grant();
    window.dispatchEvent(new Event(CHANGE_EVENT));
    setDecided(true);
  }

  if (decided) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: "#1a1f3a", color: "#fff", padding: "16px 20px",
      display: "flex", gap: 16, alignItems: "center", justifyContent: "center",
      flexWrap: "wrap", fontFamily: "Montserrat, sans-serif", fontSize: 14,
    }}>
      <span style={{ maxWidth: 640 }}>
        We use analytics cookies to understand how the Intelligence Hub is read.
        You decide.{" "}
        <a href="/privacy" style={{ color: "#5ec8f0", textDecoration: "underline" }}>
          Privacy
        </a>
      </span>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => choose("denied")} style={{
          padding: "8px 16px", borderRadius: 8, border: "1px solid #5ec8f0",
          background: "transparent", color: "#5ec8f0", cursor: "pointer",
        }}>Decline</button>
        <button onClick={() => choose("granted")} style={{
          padding: "8px 16px", borderRadius: 8, border: "none",
          background: "#5ec8f0", color: "#1a1f3a", fontWeight: 600, cursor: "pointer",
        }}>Accept</button>
      </div>
    </div>
  );
}
