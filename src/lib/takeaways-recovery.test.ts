import { test } from "node:test";
import assert from "node:assert/strict";
import { assertRecoveryAllowed, classifyGatewayBlock, generationGate, recoveryInput } from "./takeaways-recovery";

test("402 pauses new generation until explicit owner recovery", () => {
  assert.equal(classifyGatewayBlock(402, {}), "billing");
  assert.equal(generationGate(undefined, true), "blocked");
  assert.throws(() => assertRecoveryAllowed(true, "v1", "v1", false));
  assert.doesNotThrow(() => assertRecoveryAllowed(true, "v1", "v1", true));
  assert.equal(generationGate(undefined, false), "generate");
});
test("non-owners cannot resume AI generation", () => {
  assert.throws(() => assertRecoveryAllowed(false, "v1", "v1", true), /Owner/);
});
test("provider denials remain terminal and are not classified as credit pauses", () => {
  assert.equal(classifyGatewayBlock(403, { error: { type: "permission_error" } }), "provider_denial");
  assert.equal(classifyGatewayBlock(403, {}), "provider_denial");
  assert.equal(generationGate(undefined, true), "blocked");
});
test("404 unavailability remains blocked without model or endpoint substitution", () => {
  assert.equal(classifyGatewayBlock(404, {}), "unavailable");
  assert.equal(generationGate("failed", true), "blocked");
});
test("workspace policy errors are distinct from provider denials", () => {
  assert.equal(classifyGatewayBlock(403, { type: "credit_limit_reached" }), "workspace_policy");
  assert.equal(classifyGatewayBlock(403, { type: "model_requires_retention_consent" }), "access_configuration");
});
test("saved verified results remain available while generation is paused", () => {
  assert.equal(generationGate("ready", true), "cached");
});
test("refused results are not replayed during recovery", () => {
  assert.equal(generationGate("refused", false), "refused");
});
test("stale recovery cannot clear a newer block", () => {
  assert.throws(() => assertRecoveryAllowed(true, "v2", "v1", true), /changed/);
  assert.throws(() => assertRecoveryAllowed(true, undefined, "v1", true), /changed/);
});
test("recovery requires explicit restoration confirmation", () => {
  assert.equal(recoveryInput.safeParse({ revision: "00000000-0000-4000-8000-000000000001", restored: false }).success, false);
});