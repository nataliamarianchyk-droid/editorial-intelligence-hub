import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { categories, insights } from "./insights-data";
import { articleSuggestionsByCategory } from "./article-suggestions";

describe("Section article suggestions", () => {
  test("every menu section has article suggestions", () => {
    assert.equal(categories.length, 6);
    for (const category of categories) {
      const suggestions = articleSuggestionsByCategory(category.slug);
      assert.equal(suggestions.length, 2, category.slug);
      assert.ok(suggestions.every((item) => item.category === category.slug));
    }
  });

  test("suggestions do not duplicate published articles or each other", () => {
    const suggestions = categories.flatMap((category) => articleSuggestionsByCategory(category.slug));
    const publishedSlugs = new Set(insights.filter((item) => item.status === "published").map((item) => item.slug));
    assert.equal(new Set(suggestions.map((item) => item.slug)).size, suggestions.length);
    assert.ok(suggestions.every((item) => !publishedSlugs.has(item.slug)));
  });
});