# Restore AI takeaways after billing or access recovery

## Confirmed issue

One saved AI billing or access error blocks every subsequent generation indefinitely. There is no recovery control. No saved block exists currently, so readers are not currently affected.

Automatically expiring all blocks would be unsafe: provider access denials and unavailable endpoints must remain stopped until their underlying problem is resolved. The existing shared-password control room does not establish a verified owner identity.

## What will change

- Add an owner-only AI availability control showing the saved error and its required remedy.
- Let the verified owner explicitly resume generation after resolving a credit or workspace-policy problem, without manually editing stored records.
- Keep provider access denials and unavailable models/endpoints blocked until restoration is confirmed; do not use retries or model substitutions to test those blocks.
- Continue serving previously verified, saved takeaways during a pause, without making new AI calls.
- Let readers start a fresh generation after recovery; never automatically replay a failed request. Keep the original safe error visible while paused.
- Leave all article bodies, existing takeaways, and the requested AI model unchanged.

## Technical details

- Establish a narrowly scoped, authenticated owner permission using Lovable Cloud accounts; do not treat the shared site password as owner authentication. Identify and authorize the requesting owner's account rather than choosing an arbitrary account.
- Add structured error classification to the private availability state using an additive migration. Retain original status and safe message; treat ambiguous legacy access errors conservatively.
- Use an authenticated server function that verifies the owner's protected role before privileged recovery writes. Explicit resume clears only the eligible saved pause and does not issue an AI request itself.
- For terminal access/unavailability blocks, require confirmation that access or availability has been restored before clearing the block; subsequent generation still requires fresh reader action.
- Move the saved-result lookup ahead of the generation pause check. Keep the pause check before any new generation claim or gateway call.
- Guard recovery against concurrent changes so an old recovery action cannot remove a newer block.

## Verification

- Add and run regression tests for a 402 pause, owner recovery, unauthorized recovery attempts, persistent provider denial and 404 blocks, saved-result reads during a pause, and concurrent state changes.
- Verify the owner recovery flow through the running app using a controlled billing-error fixture, without manufacturing a live provider denial or changing workspace credits.
- Verify a fresh reader request succeeds after recovery, keeps the article unchanged, and saves a reusable result. Inspect the actual AI Gateway response before reporting success.
- Mark the monitoring finding fixed only after implementation and verification.
