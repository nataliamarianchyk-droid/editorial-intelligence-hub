import { z } from "zod";

export const newsCategories = ["performance", "analytics-tracking", "growth-systems", "b2b-saas", "ai-marketing-operations", "ecommerce"] as const;
export function berlinDay(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const value = (key: string) => parts.find((p) => p.type === key)?.value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}
const shortText = (max: number) => z.string().trim().min(1).max(max);
export function newsPublicationDateBounds(now = new Date()) {
  const max = berlinDay(now);
  const earliest = new Date(`${max}T00:00:00Z`);
  earliest.setUTCDate(earliest.getUTCDate() - 30);
  return { min: earliest.toISOString().slice(0, 10), max };
}
export function newsPublicationDateSchema(now?: Date) {
  return z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((date) => {
    const parsed = new Date(`${date}T00:00:00Z`);
    const { min, max } = newsPublicationDateBounds(now);
    return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date && date >= min && date <= max;
  }, "Publication date must be a real date between today and 30 days ago (Europe/Berlin).");
}
export function newsPublicationTimestamp(date?: string, now = new Date()) {
  const chosen = newsPublicationDateSchema(now).parse(date ?? berlinDay(now));
  const utcNine = new Date(`${chosen}T09:00:00Z`);
  const hour = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", hour: "2-digit", hourCycle: "h23" }).formatToParts(utcNine).find((part) => part.type === "hour")?.value;
  if (!hour) throw new Error("Unable to determine Berlin publication time.");
  utcNine.setUTCHours(9 - (Number(hour) - 9));
  return utcNine.toISOString();
}
export const newsEditableSchema = z.object({
  title: shortText(160), dek: shortText(300), body_md: shortText(20_000),
  slug: z.string().min(1).max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});
export const newsDraftSchema = newsEditableSchema.extend({
  category: z.enum(newsCategories),
  sources: z.array(z.object({
    publisher: shortText(160), title: shortText(300),
    url: z.url().max(2048).refine((url) => new URL(url).protocol === "https:", "HTTPS required"),
    published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((date) => {
      const parsed = new Date(`${date}T00:00:00Z`);
      return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date && date <= berlinDay();
    }, "A valid, non-future publication date is required"),
  })).min(1).max(6),
  reviewer_notes: z.string().max(2000).optional(), agent_draft_id: shortText(40),
  suggested_date: newsPublicationDateSchema().optional(),
});
export type NewsDraft = z.infer<typeof newsDraftSchema>;
export type NewsSource = NewsDraft["sources"][number];
export type NewsItem = Omit<NewsDraft, "reviewer_notes" | "suggested_date"> & {
  id: string; status: "draft" | "published" | "withdrawn";
  reviewer_notes: string | null; created_at: string; updated_at: string; published_at: string | null;
  suggested_date: string | null;
};
export type PublicNews = Pick<NewsItem, "id" | "slug" | "title" | "dek" | "body_md" | "category" | "sources" | "published_at" | "updated_at">;
export function newsDate(value: string | null) {
  return value ? new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", day: "numeric", month: "long", year: "numeric" }).format(new Date(value)) : "Unpublished";
}