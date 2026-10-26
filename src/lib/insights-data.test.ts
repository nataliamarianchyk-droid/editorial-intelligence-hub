import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { insights, publishedInsightsNewestFirst } from "./insights-data";

describe("Issue 08 editorial rules", () => {
  test("Issue 08 leads the published issues without replacing Issue 07 or older issues", () => {
    const published = publishedInsightsNewestFirst();
    assert.deepEqual(published.map((i) => i.issue), ["Issue 08", "Issue 07", "Issue 06", "Issue 05", "Issue 04", "Issue 03", "Issue 02", "Issue 01"]);
    assert.equal(new Set(insights.map((i) => i.slug)).size, insights.length);
  });
  test("Issue 08 retains its requested section, author, date and reading duration", () => {
    const issue = insights.find((i) => i.issue === "Issue 08");
    assert.equal(issue?.category, "ai-marketing-operations");
    assert.equal(issue?.authorKey, "natalia");
    assert.equal(issue?.date, "October 2026");
    assert.equal(issue?.read, "9 min");
    assert.equal(issue?.datePublished, "2026-10-26");
    assert.equal(issue?.wordCount, 3160);
  });
});