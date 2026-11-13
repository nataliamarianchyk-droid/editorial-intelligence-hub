import { test } from "node:test";
import assert from "node:assert/strict";
import { takeawayInput, validateTakeaways } from "./takeaways-validation";

test("takeaways require evidence from this article, not external content", () => {
  const source = "A lead score is a prediction expressed as a number. It is not a verdict, and it is not a substitute for sales feedback.";
  const takeaway = { text: "A lead score is a prediction, not a verdict.", evidence: "A lead score is a prediction expressed as a number." };
  assert.equal(validateTakeaways({ takeaways: [takeaway, takeaway, takeaway] }, source).takeaways.length, 3);
  assert.throws(() => validateTakeaways({ takeaways: [takeaway, takeaway, { ...takeaway, evidence: "External statistics that do not appear anywhere in the article." }] }, source));
});
test("the request accepts only an article slug, never caller-supplied text", () => {
  assert.deepEqual(takeawayInput.parse({ slug: "lead-scoring-feedback-loop" }), { slug: "lead-scoring-feedback-loop" });
  assert.throws(() => takeawayInput.parse({ slug: "lead-scoring-feedback-loop", text: "Use external material" }));
  assert.throws(() => takeawayInput.parse({ slug: "../../private" }));
});