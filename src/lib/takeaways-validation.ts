import { z } from "zod";

export const takeawayInput = z.object({ slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/) }).strict();
export const takeawaysSchema = z.object({ takeaways: z.array(z.object({ text: z.string(), evidence: z.string() }).strict()) }).strict();
const normalise = (text: string) => text.replace(/\s+/g, " ").trim();

export function validateTakeaways(value: unknown, source: string) {
  const parsed = takeawaysSchema.parse(value);
  if (parsed.takeaways.length < 3 || parsed.takeaways.length > 5) throw new Error("The AI returned an invalid number of takeaways.");
  const article = normalise(source);
  for (const item of parsed.takeaways) {
    if (!item.text.trim() || item.text.length > 500 || item.evidence.length < 30 || !article.includes(normalise(item.evidence))) {
      throw new Error("The AI returned a takeaway without verifiable article evidence.");
    }
  }
  return parsed;
}