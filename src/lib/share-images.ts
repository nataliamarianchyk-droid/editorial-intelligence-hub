import image0 from "@/assets/share/home.jpg.asset.json";
import image1 from "@/assets/share/issues.jpg.asset.json";
import image2 from "@/assets/share/privacy.jpg.asset.json";
import image3 from "@/assets/share/impressum.jpg.asset.json";
import image4 from "@/assets/share/unlock.jpg.asset.json";
import image5 from "@/assets/share/control-room.jpg.asset.json";
import image6 from "@/assets/share/category-performance.jpg.asset.json";
import image7 from "@/assets/share/category-analytics-tracking.jpg.asset.json";
import image8 from "@/assets/share/category-growth-systems.jpg.asset.json";
import image9 from "@/assets/share/category-b2b-saas.jpg.asset.json";
import image10 from "@/assets/share/category-ai-marketing-operations.jpg.asset.json";
import image11 from "@/assets/share/category-ecommerce.jpg.asset.json";
import image12 from "@/assets/share/job-search-funnel.jpg.asset.json";
import image13 from "@/assets/share/german-advertising-market-2026.jpg.asset.json";
import image14 from "@/assets/share/visibility-is-not-pipeline.jpg.asset.json";
import image15 from "@/assets/share/b2b-performance-marketing-infrastructure-audit.jpg.asset.json";
import image16 from "@/assets/share/ai-found-66000-buyers.jpg.asset.json";
import image17 from "@/assets/share/your-crm-is-the-real-marketing-tool.jpg.asset.json";
import image18 from "@/assets/share/dtc-attribution-after-att.jpg.asset.json";
import { issueEightCover } from "@/lib/issue-eight-cover";

const images: Record<string, string> = {
  "home": image0.url,
  "issues": image1.url,
  "privacy": image2.url,
  "impressum": image3.url,
  "unlock": image4.url,
  "control-room": image5.url,
  "category-performance": image6.url,
  "category-analytics-tracking": image7.url,
  "category-growth-systems": image8.url,
  "category-b2b-saas": image9.url,
  "category-ai-marketing-operations": image10.url,
  "category-ecommerce": image11.url,
  "job-search-funnel": image12.url,
  "german-advertising-market-2026": image13.url,
  "visibility-is-not-pipeline": image14.url,
  "b2b-performance-marketing-infrastructure-audit": image15.url,
  "ai-found-66000-buyers": image16.url,
  "your-crm-is-the-real-marketing-tool": image17.url,
  "dtc-attribution-after-att": image18.url,
};

export function shareImageMeta(key: string = "home") {
  if (key === "chatgpt-ads-germany-measurement") {
    return [
      { property: "og:image", content: issueEightCover.src },
      { property: "og:image:width", content: String(issueEightCover.width) },
      { property: "og:image:height", content: String(issueEightCover.height) },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:alt", content: issueEightCover.alt },
      { name: "twitter:image", content: issueEightCover.src },
      { name: "twitter:image:alt", content: issueEightCover.alt },
    ];
  }
  const path = images[key] ?? images.home;
  const url = new URL(path, "https://insights.nm-insight.com").href;
  return [
    { property: "og:image", content: url },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:alt", content: "NM Insight editorial preview" },
    { name: "twitter:image", content: url },
  ];
}
