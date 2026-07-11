import { useEffect } from "react";
import { useConsent } from "@/lib/consent";

// Set your LinkedIn Partner ID here (Campaign Manager → Account Assets → Insight Tag).
// Leave empty to disable. Also readable from VITE_LINKEDIN_PARTNER_ID at build time.
const PARTNER_ID: string =
  (import.meta.env.VITE_LINKEDIN_PARTNER_ID as string | undefined)?.trim() || "";

const SCRIPT_ID = "linkedin-insight-tag";
const NOSCRIPT_ID = "linkedin-insight-tag-noscript";

declare global {
  interface Window {
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
  }
}

export function LinkedInInsightTag() {
  const { consent } = useConsent();
  const enabled = consent.marketing && PARTNER_ID.length > 0;

  useEffect(() => {
    if (!enabled) return;
    if (document.getElementById(SCRIPT_ID)) return;

    window._linkedin_partner_id = PARTNER_ID;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    if (!window._linkedin_data_partner_ids.includes(PARTNER_ID)) {
      window._linkedin_data_partner_ids.push(PARTNER_ID);
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    document.body.appendChild(script);

    const noscript = document.createElement("noscript");
    noscript.id = NOSCRIPT_ID;
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.alt = "";
    img.src = `https://px.ads.linkedin.com/collect/?pid=${PARTNER_ID}&fmt=gif`;
    noscript.appendChild(img);
    document.body.appendChild(noscript);
  }, [enabled]);

  // If consent is withdrawn later, remove the loaded script so it stops running on next nav.
  useEffect(() => {
    if (enabled) return;
    document.getElementById(SCRIPT_ID)?.remove();
    document.getElementById(NOSCRIPT_ID)?.remove();
    delete window._linkedin_partner_id;
    if (window._linkedin_data_partner_ids && PARTNER_ID) {
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids.filter(
        (id) => id !== PARTNER_ID,
      );
    }
  }, [enabled]);

  return null;
}
