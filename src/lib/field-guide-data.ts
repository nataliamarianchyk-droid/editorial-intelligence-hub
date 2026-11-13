import markdown0 from "@/content/field-guides/google-ads-offline-conversions.md?raw";
import markdown1 from "@/content/field-guides/linkedin-ads-creative-testing.md?raw";
import markdown2 from "@/content/field-guides/ga4-consent-mode-measurement.md?raw";
import markdown3 from "@/content/field-guides/lead-scoring-feedback-loop.md?raw";
import markdown4 from "@/content/field-guides/pipeline-velocity-bottlenecks.md?raw";
import markdown5 from "@/content/field-guides/product-qualified-leads.md?raw";
import markdown6 from "@/content/field-guides/ai-marketing-quality-control.md?raw";
import markdown7 from "@/content/field-guides/shopify-contribution-margin.md?raw";
import markdown8 from "@/content/field-guides/retention-cohorts-repeat-purchase.md?raw";
import markdown9 from "@/content/field-guides/utm-governance.md?raw";
import markdown10 from "@/content/field-guides/icp-precision.md?raw";
import markdown11 from "@/content/field-guides/internal-ai-marketing-stack.md?raw";

export function fieldGuideHeadingId(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const fieldGuides = [
  {
    slug: "google-ads-offline-conversions",
    category: "performance",
    title: "Google Ads Can Find Leads. Can It Find Your Customers?",
    dek: "An operator's guide to offline conversion imports, qualified-lead signals and bidding toward revenue instead of form fills.",
    markdown: markdown0,
    wordCount: 768,
    read: "4 min",
    datePublished: "2026-11-13",
    dateModified: "2026-11-13",
  },
  {
    slug: "linkedin-ads-creative-testing",
    category: "performance",
    title: "LinkedIn Ads Creative Testing Without a Big Budget",
    dek: "How to separate the audience, offer and creative variables when your budget cannot support dozens of simultaneous experiments.",
    markdown: markdown1,
    wordCount: 741,
    read: "4 min",
    datePublished: "2026-11-13",
    dateModified: "2026-11-13",
  },
  {
    slug: "ga4-consent-mode-measurement",
    category: "analytics-tracking",
    title: "GA4 and Consent Mode v2: What Your Reports Can Actually Tell You",
    dek: "Observed events, modelled conversions and missing signals - a practical framework for reading acquisition reports under consent constraints.",
    markdown: markdown2,
    wordCount: 753,
    read: "4 min",
    datePublished: "2026-11-13",
    dateModified: "2026-11-13",
  },
  {
    slug: "lead-scoring-feedback-loop",
    category: "growth-systems",
    title: "Lead Scoring Is Only as Good as the Sales Feedback",
    dek: "Build a qualification loop around accepted leads, rejection reasons and real outcomes rather than an ever-growing list of engagement points.",
    markdown: markdown3,
    wordCount: 720,
    read: "4 min",
    datePublished: "2026-11-13",
    dateModified: "2026-11-13",
  },
  {
    slug: "pipeline-velocity-bottlenecks",
    category: "growth-systems",
    title: "Pipeline Velocity: Find the Delay Before You Buy More Leads",
    dek: "A stage-by-stage look at response times, stalled opportunities and handoff friction - and how to decide which bottleneck to fix first.",
    markdown: markdown4,
    wordCount: 729,
    read: "4 min",
    datePublished: "2026-11-13",
    dateModified: "2026-11-13",
  },
  {
    slug: "product-qualified-leads",
    category: "b2b-saas",
    title: "Product-Qualified Leads: Which Usage Signals Deserve a Sales Conversation?",
    dek: "Turn trial activity into a qualification model that distinguishes curiosity from buying intent without treating every login as demand.",
    markdown: markdown5,
    wordCount: 731,
    read: "4 min",
    datePublished: "2026-11-13",
    dateModified: "2026-11-13",
  },
  {
    slug: "ai-marketing-quality-control",
    category: "ai-marketing-operations",
    title: "AI Marketing Automation Needs a Quality-Control Layer",
    dek: "Where human review, source checks and exception handling belong in an automated marketing workflow - before mistakes reach customers.",
    markdown: markdown6,
    wordCount: 737,
    read: "4 min",
    datePublished: "2026-11-13",
    dateModified: "2026-11-13",
  },
  {
    slug: "shopify-contribution-margin",
    category: "ecommerce",
    title: "Shopify ROAS Is Not Your Contribution Margin",
    dek: "Connect acquisition spend to discounts, returns, fulfilment and repeat purchases so a successful campaign also makes economic sense.",
    markdown: markdown7,
    wordCount: 701,
    read: "4 min",
    datePublished: "2026-11-13",
    dateModified: "2026-11-13",
  },
  {
    slug: "retention-cohorts-repeat-purchase",
    category: "ecommerce",
    title: "Retention Cohorts: When Does a Second Purchase Actually Happen?",
    dek: "Use time-to-repeat and cohort contribution to plan retention campaigns around buying behaviour rather than a generic email calendar.",
    markdown: markdown8,
    wordCount: 708,
    read: "4 min",
    datePublished: "2026-11-13",
    dateModified: "2026-11-13",
  },
  {
    slug: "utm-governance",
    title: "UTM Governance Is a Revenue System.",
    dek: "Tracking is not a plugin. It is the ledger every downstream decision is built on - and most teams keep it in a spreadsheet.",
    category: "analytics-tracking",
    markdown: markdown9,
    wordCount: 738,
    read: "4 min",
    datePublished: "2026-11-13",
    dateModified: "2026-11-13",
  },
  {
    slug: "icp-precision",
    title: "ICP Precision in Sub-1,000-Account Markets.",
    dek: "When your total addressable market fits on one screen, precision is not optional - it is the only viable strategy.",
    category: "b2b-saas",
    markdown: markdown10,
    wordCount: 732,
    read: "4 min",
    datePublished: "2026-11-13",
    dateModified: "2026-11-13",
  },
  {
    slug: "internal-ai-marketing-stack",
    title: "Designing an Internal AI Marketing Stack.",
    dek: "The teams that will compound the fastest are building operator-grade AI systems, not experimenting with prompts.",
    category: "ai-marketing-operations",
    markdown: markdown11,
    wordCount: 711,
    read: "4 min",
    datePublished: "2026-11-13",
    dateModified: "2026-11-13",
  },
];
