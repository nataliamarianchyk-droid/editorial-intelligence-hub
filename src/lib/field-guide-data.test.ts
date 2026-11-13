import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { fieldGuides } from "./field-guide-data";
import { authors, categories, insights, publishedInsightsNewestFirst } from "./insights-data";

describe("Published field guides", () => {
  test("all twelve guides credit NM Editorial while Natalia retains her existing bylines", () => {
    const guides = insights.filter((item) => item.format === "field-guide");
    assert.equal(guides.length, 12);
    assert.ok(guides.every((item) => item.author === "NM Editorial" && item.authorKey === "editorial"));
    assert.equal(authors.editorial.name, "NM Editorial");
    assert.equal(insights.find((item) => item.issue === "Issue 08")?.author, "Natalia Marianchyk");
    assert.equal(insights.find((item) => item.issue === "Issue 07")?.author, "Natalia Marianchyk");
  });
  test("all twelve topics are published, with two in every menu section", () => {
    assert.equal(fieldGuides.length, 12);
    for (const category of categories) {
      assert.equal(fieldGuides.filter((guide) => guide.category === category.slug).length, 2);
    }
    for (const guide of fieldGuides) {
      const article = insights.find((item) => item.slug === guide.slug);
      assert.equal(article?.status, "published");
      assert.equal(article?.href, `/${guide.category}/${guide.slug}`);
      assert.ok(guide.wordCount > 600);
      assert.equal(guide.datePublished, "2026-11-13");
      assert.ok(guide.markdown.includes("https://"));
    }
    assert.equal(new Set(insights.map((item) => item.slug)).size, insights.length);
    assert.equal(insights.filter((item) => item.status === "upcoming").length, 0);
  });
  test("field guides leave the eight numbered issues and Issue 08 feature intact", () => {
    assert.equal(publishedInsightsNewestFirst().length, 8);
    assert.equal(publishedInsightsNewestFirst()[0]?.issue, "Issue 08");
    assert.ok(insights.filter((item) => item.format === "field-guide").every((item) => !item.issue && item.authorKey === "editorial"));
  });
});