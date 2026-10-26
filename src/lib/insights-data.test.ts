import { describe, expect, test } from "bun:test";
import { insights, publishedInsightsNewestFirst } from "./insights-data";

describe("Issue 08 editorial rules", () => {
  test("Issue 08 leads the published issues without replacing Issue 07 or older issues", () => {
    const published = publishedInsightsNewestFirst();
    expect(published.map((i) => i.issue)).toEqual(["Issue 08", "Issue 07", "Issue 06", "Issue 05", "Issue 04", "Issue 03", "Issue 02", "Issue 01"]);
    expect(new Set(insights.map((i) => i.slug)).size).toBe(insights.length);
  });
  test("Issue 08 retains its requested section, author, date and reading duration", () => {
    const issue = insights.find((i) => i.issue === "Issue 08");
    expect(issue?.category).toBe("ai-marketing-operations");
    expect(issue?.authorKey).toBe("natalia");
    expect(issue?.date).toBe("October 2026");
    expect(issue?.read).toBe("9 min");
    expect(issue?.datePublished).toBe("2026-10-26");
    expect(issue?.wordCount).toBe(3160);
  });
});