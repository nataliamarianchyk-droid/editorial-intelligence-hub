import { test } from "node:test";
import assert from "node:assert/strict";
import { isValidYoutubeId, youtubeEmbedUrl, youtubeWatchUrl, issueVideoFor, isoDuration, formatDuration } from "./issue-videos";

test("valid 11-char id builds nocookie embed and watch URLs", () => {
  assert.equal(youtubeEmbedUrl("mZlnyETenXk"), "https://www.youtube-nocookie.com/embed/mZlnyETenXk?autoplay=1&rel=0");
  assert.equal(youtubeWatchUrl("mZlnyETenXk"), "https://www.youtube.com/watch?v=mZlnyETenXk");
});

test("invalid ids are rejected and build no URL", () => {
  for (const id of ["", "short", "mZlnyETenXk1", "mZlny/TenXk", "mZlny\"TenX"]) {
    assert.equal(isValidYoutubeId(id), false);
    assert.equal(youtubeEmbedUrl(id), null);
  }
});

test("only Issue 01 has a video, 1:15 long", () => {
  assert.equal(issueVideoFor("visibility-is-not-pipeline")?.youtubeId, "mZlnyETenXk");
  assert.equal(issueVideoFor("german-advertising-market-2026"), null);
  assert.equal(isoDuration(75), "PT1M15S");
  assert.equal(formatDuration(75), "1:15");
});
