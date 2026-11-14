import { z } from "zod";

export type GatewayBlockKind = "billing" | "workspace_policy" | "provider_denial" | "unavailable" | "access_configuration" | "unknown";

export function classifyGatewayBlock(status: number, payload: unknown): GatewayBlockKind {
  const parsed = z.object({ type: z.string().optional(), error: z.object({ type: z.string().optional(), code: z.string().optional() }).passthrough().optional(), code: z.string().optional() }).passthrough().safeParse(payload);
  const value = parsed.success ? parsed.data : undefined;
  const type = value?.type ?? value?.error?.type ?? value?.code ?? value?.error?.code;
  if (status === 402) return "billing";
  if (status === 404) return "unavailable";
  if (status !== 403) return "unknown";
  if (["credit_limit_reached", "ai_disabled", "workspace_ai_disabled"].includes(type ?? "")) return "workspace_policy";
  if (["model_requires_retention_consent", "model_vendor_not_enabled", "provider_not_available_in_region"].includes(type ?? "")) return "access_configuration";
  // Unknown 403s are never interpreted as temporary credit problems.
  return "provider_denial";
}

export const recoveryInput = z.object({ revision: z.string().uuid(), restored: z.literal(true) }).strict();

export function assertRecoveryAllowed(owner: boolean, currentRevision: string | undefined, requestedRevision: string, restored: boolean) {
  if (!owner) throw new Error("Owner access is required.");
  if (!restored) throw new Error("Confirm that the underlying AI billing or access problem has been resolved.");
  if (!currentRevision || currentRevision !== requestedRevision) throw new Error("AI availability has changed. Refresh before resuming.");
}

export function generationGate(cachedStatus: string | undefined, blocked: boolean) {
  if (cachedStatus === "ready") return "cached";
  if (cachedStatus === "refused") return "refused";
  return blocked ? "blocked" : "generate";
}

export function recoveryRemedy(kind: string) {
  if (kind === "billing") return "Resolve the AI credit shortfall or temporary hold before resuming.";
  if (kind === "workspace_policy") return "Ask a workspace admin to restore AI access or adjust the workspace AI spending limit before resuming.";
  if (kind === "unavailable") return "Confirm that the requested AI model and endpoint are available again before resuming.";
  if (kind === "access_configuration") return "Resolve the model's workspace access requirements before resuming.";
  return "Confirm that AI provider access has been restored before resuming. This block will not be retried automatically.";
}