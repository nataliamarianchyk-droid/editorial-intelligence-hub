import { test } from "node:test";
import assert from "node:assert/strict";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { handleNewsFeed, newsFeedLimit, newsFeedMethodNotAllowed } from "./news-feed.server";

const source = { publisher: "Example", title: "Announcement", url: "https://example.com/announcement", published: "2026-01-01" };

const row = (slug: string, status: string, published_at: string) => ({
  id: slug, slug, title: `Title ${slug}`, dek: `Dek ${slug}`, body_md: "SECRET-BODY",
  category: "performance", sources: [source], reviewer_notes: "SECRET-NOTES",
  agent_draft_id: "SECRET-AGENT", suggested_date: "2026-01-01", status, published_at, updated_at: published_at,
});

// The draft and withdrawn rows are deliberately the newest, so a missing status
// filter would show them first.
const rows = [
  row("newest", "published", "2026-01-05T08:00:00Z"),
  row("older", "published", "2026-01-04T08:00:00Z"),
  row("oldest", "published", "2026-01-03T08:00:00Z"),
  row("earliest", "published", "2026-01-02T08:00:00Z"),
  row("extra", "published", "2026-01-01T08:00:00Z"),
  row("hidden-draft", "draft", "2026-01-06T08:00:00Z"),
  row("hidden-withdrawn", "withdrawn", "2026-01-07T08:00:00Z"),
];

function newsDb(failure = false) {
  const filters: [string, string][] = [];
  let newestFirst = false;
  const builder = {
    select: () => builder,
    order: (_key: string, options?: { ascending?: boolean }) => { newestFirst = options?.ascending === false; return builder; },
    eq: (key: string, value: string) => { filters.push([key, value]); return builder; },
    range: async (from: number, to: number) => {
      if (failure) return { data: null, error: { message: "SECRET-DATABASE-ERROR" } };
      let data = rows.filter((item) => filters.every(([key, value]) => (item as Record<string, unknown>)[key] === value));
      if (newestFirst) data = [...data].sort((a, b) => String(b.published_at).localeCompare(String(a.published_at)));
      return { data: data.slice(from, to + 1), error: null };
    },
  };
  return { db: { from: () => builder } as unknown as SupabaseClient<Database>, filters };
}

const feed = (db: SupabaseClient<Database>, query = "") =>
  handleNewsFeed(new Request(`https://example.com/api/news-feed${query}`), db);

test("feed returns only published rows, newest first, with exactly the five whitelisted fields", async () => {
  const { db, filters } = newsDb();
  const response = await feed(db);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "public, max-age=60");
  assert.equal(response.headers.get("x-robots-tag"), "noindex");
  assert.match(response.headers.get("content-type") ?? "", /application\/json/);
  assert.ok(filters.some(([key, value]) => key === "status" && value === "published"));
  const body = await response.json();
  assert.deepEqual(body.items.map((item: { slug: string }) => item.slug), ["newest", "older", "oldest", "earliest"]);
  assert.deepEqual(Object.keys(body.items[0]).sort(), ["category", "dek", "published_at", "slug", "title"]);
  const serialized = JSON.stringify(body);
  for (const secret of ["SECRET-BODY", "SECRET-NOTES", "SECRET-AGENT", "body_md", "sources", "reviewer_notes", "agent_draft_id", "suggested_date"]) {
    assert.ok(!serialized.includes(secret), secret);
  }
});

test("limit accepts integers one to ten and every other value falls back to four", async () => {
  const cases: [string, number][] = [["1", 1], ["2", 2], ["10", 5], ["0", 4], ["11", 4], ["-3", 4], ["1.5", 4], ["abc", 4], ["1e2", 4], ["", 4]];
  for (const [raw, expected] of cases) {
    const { db } = newsDb();
    const body = await (await feed(db, `?limit=${raw}`)).json();
    assert.equal(body.items.length, Math.min(expected, 5), raw);
  }
  assert.equal(newsFeedLimit(null), 4);
});

test("a database failure returns 503 with an empty feed, no-store and no internal details", async () => {
  const { db } = newsDb(true);
  const response = await feed(db);
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("x-robots-tag"), "noindex");
  const text = await response.text();
  assert.equal(text, '{"items":[]}');
  assert.ok(!text.includes("SECRET-DATABASE-ERROR"));
});

test("non-GET methods are refused with 405 and Allow: GET", () => {
  const response = newsFeedMethodNotAllowed();
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "GET");
});
