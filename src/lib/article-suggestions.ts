import { insights } from "@/lib/insights-data";

type ArticleSuggestion = {
  slug: string;
  category: string;
  title: string;
  dek: string;
};

const newSuggestions: ArticleSuggestion[] = [
  {
    slug: "google-ads-offline-conversions",
    category: "performance",
    title: "Google Ads Can Find Leads. Can It Find Your Customers?",
    dek: "An operator's guide to offline conversion imports, qualified-lead signals and bidding toward revenue instead of form fills.",
  },
  {
    slug: "linkedin-ads-creative-testing",
    category: "performance",
    title: "LinkedIn Ads Creative Testing Without a Big Budget",
    dek: "How to separate the audience, offer and creative variables when your budget cannot support dozens of simultaneous experiments.",
  },
  {
    slug: "ga4-consent-mode-measurement",
    category: "analytics-tracking",
    title: "GA4 and Consent Mode v2: What Your Reports Can Actually Tell You",
    dek: "Observed events, modelled conversions and missing signals - a practical framework for reading acquisition reports under consent constraints.",
  },
  {
    slug: "lead-scoring-feedback-loop",
    category: "growth-systems",
    title: "Lead Scoring Is Only as Good as the Sales Feedback",
    dek: "Build a qualification loop around accepted leads, rejection reasons and real outcomes rather than an ever-growing list of engagement points.",
  },
  {
    slug: "pipeline-velocity-bottlenecks",
    category: "growth-systems",
    title: "Pipeline Velocity: Find the Delay Before You Buy More Leads",
    dek: "A stage-by-stage look at response times, stalled opportunities and handoff friction - and how to decide which bottleneck to fix first.",
  },
  {
    slug: "product-qualified-leads",
    category: "b2b-saas",
    title: "Product-Qualified Leads: Which Usage Signals Deserve a Sales Conversation?",
    dek: "Turn trial activity into a qualification model that distinguishes curiosity from buying intent without treating every login as demand.",
  },
  {
    slug: "ai-marketing-quality-control",
    category: "ai-marketing-operations",
    title: "AI Marketing Automation Needs a Quality-Control Layer",
    dek: "Where human review, source checks and exception handling belong in an automated marketing workflow - before mistakes reach customers.",
  },
  {
    slug: "shopify-contribution-margin",
    category: "ecommerce",
    title: "Shopify ROAS Is Not Your Contribution Margin",
    dek: "Connect acquisition spend to discounts, returns, fulfilment and repeat purchases so a successful campaign also makes economic sense.",
  },
  {
    slug: "retention-cohorts-repeat-purchase",
    category: "ecommerce",
    title: "Retention Cohorts: When Does a Second Purchase Actually Happen?",
    dek: "Use time-to-repeat and cohort contribution to plan retention campaigns around buying behaviour rather than a generic email calendar.",
  },
];

export function articleSuggestionsByCategory(category: string): ArticleSuggestion[] {
  const existing = insights
    .filter((item) => item.category === category && item.status === "upcoming")
    .map(({ slug, category: section, title, dek }) => ({ slug, category: section, title, dek }));
  return [...existing, ...newSuggestions.filter((item) => item.category === category)];
}