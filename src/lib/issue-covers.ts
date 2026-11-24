import c01 from "@/assets/insights/covers/visibility-is-not-pipeline.jpg.asset.json";
import c02 from "@/assets/insights/covers/german-advertising-market-2026.jpg.asset.json";
import c03 from "@/assets/insights/covers/your-crm-is-the-real-marketing-tool.jpg.asset.json";
import c04 from "@/assets/insights/covers/b2b-performance-marketing-infrastructure-audit.jpg.asset.json";
import c05 from "@/assets/insights/covers/ai-found-66000-buyers.jpg.asset.json";
import c06 from "@/assets/insights/covers/dtc-attribution-after-att.jpg.asset.json";
import c07 from "@/assets/insights/covers/job-search-funnel.jpg.asset.json";
import c08 from "@/assets/insights/covers/chatgpt-ads-germany-measurement.jpg.asset.json";

export type IssueCover = { src: string; alt: string; width: number; height: number };

const make = (url: string, issue: string, title: string): IssueCover => ({
  src: new URL(url, "https://insights.nm-insight.com").href,
  alt: `NM Insight ${issue} cover: ${title} Cream editorial diagram in navy, turquoise and warm accent colours illustrating the issue topic.`,
  width: 1600,
  height: 900,
});

/** Shared issue covers in the NM Insight visual identity, keyed by article slug. */
export const issueCovers: Record<string, IssueCover> = {
  "visibility-is-not-pipeline": make(c01.url, "Issue 01", "Visibility is not pipeline."),
  "german-advertising-market-2026": make(c02.url, "Issue 02", "The €51 billion question."),
  "your-crm-is-the-real-marketing-tool": make(c03.url, "Issue 03", "Your CRM is the real marketing tool."),
  "b2b-performance-marketing-infrastructure-audit": make(c04.url, "Issue 04", "The marketing infrastructure audit."),
  "ai-found-66000-buyers": make(c05.url, "Issue 05", "AI found 66,000 buyers in seconds."),
  "dtc-attribution-after-att": make(c06.url, "Issue 06", "DTC attribution after ATT."),
  "job-search-funnel": make(c07.url, "Issue 07", "I ran my job search like a funnel."),
  "chatgpt-ads-germany-measurement": make(c08.url, "Issue 08", "ChatGPT Ads are live in Germany."),
};
