import { test } from "node:test";
import assert from "node:assert/strict";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { authenticateNewsIntake, handleNewsIntake } from "./news-intake.server";
import { newsDraftSchema, berlinDay, newsPublicationDateBounds, newsPublicationDateSchema } from "./news-schema";
import { publishNewsDraft } from "./news-publication.server";
import { readPublishedNews } from "./news-repository.server";

const input = { title: "Platform measurement update", dek: "A reviewed update.", body_md: "## Context\nA sourced update.", slug: "measurement-update", category: "performance", sources: [{ publisher: "Example", title: "Announcement", url: "https://example.com/announcement", published: "2026-01-01" }], agent_draft_id: "agent-1" };
const request = (value: unknown = input) => new Request("https://example.com/api/news-drafts", { method: "POST", headers: { authorization: "Bearer unit-test-token" }, body: JSON.stringify(value) });
const fixedNow = new Date("2026-11-19T11:00:00Z");
function publicationRecorder() {
  const writes: Record<string, unknown>[] = [];
  const filters: [string, string][] = [];
  const builder = {
    update: (values: Record<string, unknown>) => { writes.push(values); return builder; },
    eq: (key: string, value: string) => { filters.push([key, value]); return builder; },
    select: () => builder, maybeSingle: async () => ({ data: { id: "unit-id" }, error: null }),
  };
  return { db: { from: () => builder } as unknown as SupabaseClient<Database>, writes, filters };
}
test("intake rejects future suggested_date before saving", async () => {
  const tomorrow = new Date(`${berlinDay()}T00:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  let saves = 0;
  const result = await handleNewsIntake(request({ ...input, suggested_date: tomorrow.toISOString().slice(0, 10) }), "unit-test-token", async () => { saves++; return { code: 200, id: "unit-id" }; });
  assert.equal(result.status, 400);
  assert.equal(saves, 0);
});
test("intake rejects suggested_date more than 30 Berlin calendar days old", async () => {
  const tooOld = new Date(`${newsPublicationDateBounds().min}T00:00:00Z`);
  tooOld.setUTCDate(tooOld.getUTCDate() - 1);
  let saves = 0;
  const result = await handleNewsIntake(request({ ...input, suggested_date: tooOld.toISOString().slice(0, 10) }), "unit-test-token", async () => { saves++; return { code: 200, id: "unit-id" }; });
  assert.equal(result.status, 400);
  assert.equal(saves, 0);
});
test("intake forwards a valid suggested_date", async () => {
  const suggested_date = newsPublicationDateBounds().min;
  let savedDate: string | undefined;
  const result = await handleNewsIntake(request({ ...input, suggested_date }), "unit-test-token", async (draft) => { savedDate = draft.suggested_date; return { code: 200, id: "unit-id" }; });
  assert.equal(result.status, 200);
  assert.equal(savedDate, suggested_date);
});
test("publication window includes exactly 30 days back and rejects impossible dates", () => {
  const schema = newsPublicationDateSchema(fixedNow);
  assert.equal(schema.safeParse("2026-10-20").success, true);
  assert.equal(schema.safeParse("2026-10-19").success, false);
  assert.equal(newsPublicationDateSchema(new Date("2026-03-10T12:00:00Z")).safeParse("2026-02-30").success, false);
});
test("publish rejects a future date without writing", async () => {
  const { db, writes } = publicationRecorder();
  await assert.rejects(() => publishNewsDraft(db, "unit-id", "2026-11-20", fixedNow));
  assert.equal(writes.length, 0);
});
test("publish rejects a date more than 30 days old without writing", async () => {
  const { db, writes } = publicationRecorder();
  await assert.rejects(() => publishNewsDraft(db, "unit-id", "2026-10-19", fixedNow));
  assert.equal(writes.length, 0);
});
test("publish stores a past date at 09:00 Berlin and only changes drafts", async () => {
  const { db, writes, filters } = publicationRecorder();
  await publishNewsDraft(db, "unit-id", "2026-11-12", fixedNow);
  assert.equal(writes[0]?.published_at, "2026-11-12T08:00:00.000Z");
  assert.equal(writes[0]?.status, "published");
  assert.deepEqual(filters, [["id", "unit-id"], ["status", "draft"]]);
});
test("omitting publication date stores today at 09:00 Berlin", async () => {
  const { db, writes } = publicationRecorder();
  await publishNewsDraft(db, "unit-id", undefined, new Date("2026-11-19T23:30:00Z"));
  assert.equal(writes[0]?.published_at, "2026-11-20T08:00:00.000Z");
});
test("publish accounts for Berlin daylight saving and its transition", async () => {
  for (const [date, expected] of [["2026-10-24", "2026-10-24T07:00:00.000Z"], ["2026-10-25", "2026-10-25T08:00:00.000Z"]]) {
    const { db, writes } = publicationRecorder();
    await publishNewsDraft(db, "unit-id", date, fixedNow);
    assert.equal(writes[0]?.published_at, expected);
  }
});
test("intake rejects missing token", () => {
  assert.equal(authenticateNewsIntake(new Request("https://example.com"), "unit-test-token")?.status, 401);
});
test("intake rejects wrong token", () => {
  assert.equal(authenticateNewsIntake(new Request("https://example.com", { headers: { authorization: "Bearer incorrect" } }), "unit-test-token")?.status, 401);
});
test("intake fails closed when the secret is missing", () => {
  assert.equal(authenticateNewsIntake(request(), undefined)?.status, 500);
});
test("intake always forces draft status even when the agent sends published", async () => {
  let status = "";
  const result = await handleNewsIntake(request({ ...input, status: "published" }), "unit-test-token", async (draft) => {
    status = draft.status;
    return { code: 200, id: "unit-id" };
  });
  assert.equal(status, "draft");
  assert.equal((await result.json()).status, "draft");
});
test("published conflict is returned without changing the approved item", async () => {
  const approved = Object.freeze({ ...input, status: "published" });
  const before = JSON.stringify(approved);
  const result = await handleNewsIntake(request(), "unit-test-token", async () => ({ code: 409 }));
  assert.equal(result.status, 409);
  assert.equal(JSON.stringify(approved), before);
});
test("daily intake limit returns 429", async () => {
  const result = await handleNewsIntake(request(), "unit-test-token", async () => ({ code: 429 }));
  assert.equal(result.status, 429);
});
test("Berlin calendar dates account for midnight and daylight saving time", () => {
  assert.equal(berlinDay(new Date("2026-11-16T23:30:00Z")), "2026-11-17");
  assert.equal(berlinDay(new Date("2026-06-16T22:30:00Z")), "2026-06-17");
});
test("intake enforces every requested length limit", () => {
  for (const [key, limit] of Object.entries({ title: 160, dek: 300, body_md: 20000, slug: 80, reviewer_notes: 2000, agent_draft_id: 40 })) {
    assert.equal(newsDraftSchema.safeParse({ ...input, [key]: "a".repeat(limit) }).success, true, key);
    assert.equal(newsDraftSchema.safeParse({ ...input, [key]: "a".repeat(limit + 1) }).success, false, key);
  }
});
test("intake requires one to six HTTPS sources with valid non-future ISO dates", () => {
  assert.equal(newsDraftSchema.safeParse({ ...input, sources: [] }).success, false);
  assert.equal(newsDraftSchema.safeParse({ ...input, sources: Array(6).fill(input.sources[0]) }).success, true);
  assert.equal(newsDraftSchema.safeParse({ ...input, sources: Array(7).fill(input.sources[0]) }).success, false);
  for (const source of [{ ...input.sources[0], url: "http://example.com" }, { ...input.sources[0], published: "2099-01-01" }, { ...input.sources[0], published: "2026-02-30" }]) {
    assert.equal(newsDraftSchema.safeParse({ ...input, sources: [source] }).success, false);
  }
});
test("intake accepts only six categories and lowercase slug characters", () => {
  for (const category of ["performance", "analytics-tracking", "growth-systems", "b2b-saas", "ai-marketing-operations", "ecommerce"]) assert.equal(newsDraftSchema.safeParse({ ...input, category }).success, true);
  assert.equal(newsDraftSchema.safeParse({ ...input, category: "other" }).success, false);
  assert.equal(newsDraftSchema.safeParse({ ...input, slug: "Upper-case" }).success, false);
});
test("public list, slug and category queries never return draft or withdrawn rows", async () => {
  const rows = ["draft", "published", "withdrawn"].map((status) => ({ ...input, id: status, status, published_at: "2026-01-02T00:00:00Z", updated_at: "2026-01-02T00:00:00Z" }));
  for (const options of [{}, { slug: input.slug }, { category: "performance" }]) {
    const filters: [string, string][] = [];
    const builder = {
      select: () => builder, order: () => builder,
      eq: (key: string, value: string) => { filters.push([key, value]); return builder; },
      range: async () => ({ data: rows.filter((row) => filters.every(([key, value]) => row[key as keyof typeof row] === value)), error: null }),
    };
    const db = { from: () => builder } as unknown as SupabaseClient<Database>;
    const result = await readPublishedNews(db, options);
    assert.deepEqual(result.map((row) => row.id), ["published"]);
    assert.ok(filters.some(([key, value]) => key === "status" && value === "published"));
  }
});