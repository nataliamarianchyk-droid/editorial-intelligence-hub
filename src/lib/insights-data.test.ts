import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  insights,
  publishedInsightsNewestFirst,
  publishedPiecesNewestFirst,
  homepageEditorialSelections,
} from "./insights-data";

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

describe("Homepage editorial limits", () => {
  test("the calendar contains six prominent published pieces without repeating the featured issue", () => {
    const { featured, calendar } = homepageEditorialSelections();
    assert.equal(calendar.length, 6);
    assert.deepEqual(calendar.map((i) => i.slug), ["lead-scoring-feedback-loop", "pipeline-velocity-bottlenecks", "product-qualified-leads", "job-search-funnel", "dtc-attribution-after-att", "ai-found-66000-buyers"]);
    assert.ok(calendar.slice(0, 3).every((i) => i.format === "field-guide"));
    assert.ok(calendar.every((i) => i.status === "published" && i.slug !== featured?.slug));
  });

  test("Start with the latest holds the three newest published pieces across formats", () => {
    const { latest } = homepageEditorialSelections();
    assert.equal(latest.length, 3);
    assert.deepEqual(latest.map((i) => i.slug), ["google-ads-offline-conversions", "linkedin-ads-creative-testing", "ga4-consent-mode-measurement"]);
    assert.deepEqual(latest, publishedPiecesNewestFirst().slice(0, 3));
    assert.ok(latest.every((i) => i.status === "published"));
  });

  test("published pieces rank by date across numbered issues and field guides", () => {
    const pieces = publishedPiecesNewestFirst();
    assert.equal(pieces[0]?.format, "field-guide");
    assert.equal(pieces[0]?.datePublished, "2026-11-13");
    assert.ok(pieces.findIndex((i) => i.issue === "Issue 08") > pieces.findIndex((i) => i.format === "field-guide"));
    assert.ok(pieces.findIndex((i) => i.issue === "Issue 08") < pieces.findIndex((i) => i.issue === "Issue 07"));
    assert.ok(pieces.findIndex((i) => i.issue === "Issue 06") < pieces.findIndex((i) => i.issue === "Issue 05"));
    assert.ok(pieces.findIndex((i) => i.issue === "Issue 05") < pieces.findIndex((i) => i.issue === "Issue 02"));
    assert.equal(pieces.length, insights.filter((i) => i.status === "published").length);
  });

  test("the calendar never repeats an article from Start with the latest", () => {
    const { latest, calendar } = homepageEditorialSelections();
    const latestSlugs = new Set(latest.map((i) => i.slug));
    assert.ok(calendar.length <= 6);
    assert.ok(calendar.every((i) => !latestSlugs.has(i.slug)));
  });
});