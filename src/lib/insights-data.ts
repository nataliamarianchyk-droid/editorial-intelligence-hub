export type Category = {
  name: string;
  slug: string;
  short: string;
  description: string;
};

export const categories: Category[] = [
  {
    name: "Performance",
    slug: "performance",
    short: "Paid acquisition, bidding, creative testing",
    description:
      "Paid acquisition, Google Ads, LinkedIn Ads, bidding architecture and creative testing for markets where every touchpoint counts.",
  },
  {
    name: "Analytics & Tracking",
    slug: "analytics-tracking",
    short: "GA4, GTM, server-side, attribution",
    description:
      "GA4, GTM, server-side tagging, attribution and measurement - the infrastructure behind decisions that actually hold up.",
  },
  {
    name: "Growth Systems",
    slug: "growth-systems",
    short: "Lifecycle, funnels, RevOps, strategy",
    description:
      "Lifecycle design, funnel engineering, RevOps and market strategy - how acquisition connects to revenue, and how the advertising economy is actually rebuilding around it.",
  },
  {
    name: "B2B SaaS",
    slug: "b2b-saas",
    short: "PLG, demand gen, ABM",
    description:
      "B2B acquisition, product-led growth, demand generation and account-based marketing for long, considered sales cycles.",
  },
  {
    name: "AI & Marketing Operations",
    slug: "ai-marketing-operations",
    short: "AI orchestration, MOps automation",
    description:
      "AI orchestration, marketing operations automation and internal tooling - the operator's stack behind the modern marketing team.",
  },
  {
    name: "E-commerce",
    slug: "ecommerce",
    short: "DTC, Shopify, retention",
    description:
      "DTC growth, Shopify economics, marketplace dynamics and retention systems in a post-ATT attribution world.",
  },
];

export type AuthorKey = "natalia" | "editorial";

export type Author = {
  key: AuthorKey;
  name: string;
  bio: string;
  linkedin: string;
};

export const authors: Record<AuthorKey, Author> = {
  natalia: {
    key: "natalia",
    name: "Natalia Marianchyk",
    bio: "Founder of NM Insight - a Berlin-based B2B performance marketing consultancy focused on the infrastructure between acquisition and revenue.",
    linkedin: "https://www.linkedin.com/in/nmarianchyk/",
  },
  editorial: {
    key: "editorial",
    name: "NM Editorial Team",
    bio: "Analysis and market intelligence from NM Insight - a Berlin-based B2B performance marketing consultancy.",
    linkedin: "https://www.linkedin.com/company/nm-insight/",
  },
};

export type Insight = {
  slug: string;
  title: string;
  titleItalicSub?: string;
  dek: string;
  category: string; // slug
  authorKey: AuthorKey;
  author: string;
  date: string;
  read: string;
  issue?: string;
  href: string;
  status: "published" | "upcoming";
};

export const insights: Insight[] = [
  {
    slug: "german-advertising-market-2026",
    title: "The €51 Billion Question",
    titleItalicSub: "Where Germany's advertising market is actually heading.",
    dek: "Germany's ad market crossed €50 billion for the first time. The growth is real - but where the money flows tells a more uncomfortable story about concentration, measurement, and what survives.",
    category: "growth-systems",
    authorKey: "editorial",
    author: "NM Editorial Team",
    date: "June 2026",
    read: "10 min",
    issue: "Issue 02",
    href: "/growth-systems/german-advertising-market-2026",
    status: "published",
  },
  {
    slug: "visibility-is-not-pipeline",
    title: "Visibility Is Not Pipeline.",
    titleItalicSub: "Here is what is.",
    dek: "Why marketing activity rarely converts to revenue in specialist markets - and the four structural gaps that close the loop.",
    category: "performance",
    authorKey: "natalia",
    author: "Natalia Marianchyk",
    date: "May 2026",
    read: "7 min",
    issue: "Issue 01",
    href: "/performance/visibility-is-not-pipeline",
    status: "published",
  },
  {
    slug: "utm-governance",
    title: "UTM Governance Is a Revenue System.",
    dek: "Tracking is not a plugin. It is the ledger every downstream decision is built on - and most teams keep it in a spreadsheet.",
    category: "analytics-tracking",
    authorKey: "natalia",
    author: "Natalia Marianchyk",
    date: "Upcoming",
    read: "6 min",
    href: "#",
    status: "upcoming",
  },
  {
    slug: "crm-is-the-real-marketing-tool",
    title: "Your CRM Is the Real Marketing Tool.",
    dek: "The handoff between marketing and sales is where most pipeline dies. The fix is structural, not cultural.",
    category: "growth-systems",
    authorKey: "natalia",
    author: "Natalia Marianchyk",
    date: "Upcoming",
    read: "8 min",
    href: "#",
    status: "upcoming",
  },
  {
    slug: "icp-precision",
    title: "ICP Precision in Sub-1,000-Account Markets.",
    dek: "When your total addressable market fits on one screen, precision is not optional - it is the only viable strategy.",
    category: "b2b-saas",
    authorKey: "natalia",
    author: "Natalia Marianchyk",
    date: "Upcoming",
    read: "5 min",
    href: "#",
    status: "upcoming",
  },
  {
    slug: "internal-ai-marketing-stack",
    title: "Designing an Internal AI Marketing Stack.",
    dek: "The teams that will compound the fastest are building operator-grade AI systems, not experimenting with prompts.",
    category: "ai-marketing-operations",
    authorKey: "natalia",
    author: "Natalia Marianchyk",
    date: "Upcoming",
    read: "9 min",
    href: "#",
    status: "upcoming",
  },
  {
    slug: "dtc-attribution-after-att",
    title: "DTC Attribution After ATT.",
    dek: "Deterministic attribution is gone. What replaces it is not another dashboard - it is a different way of deciding.",
    category: "ecommerce",
    authorKey: "natalia",
    author: "Natalia Marianchyk",
    date: "Upcoming",
    read: "7 min",
    href: "#",
    status: "upcoming",
  },
];

export function categoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function insightsByCategory(slug: string) {
  return insights.filter((i) => i.category === slug);
}
