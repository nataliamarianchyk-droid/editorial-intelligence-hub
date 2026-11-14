import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertRecoveryAllowed, recoveryInput } from "@/lib/takeaways-recovery";

export const readTakeawaysAvailability = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const role = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "takeaways_owner").maybeSingle();
    if (role.error || !role.data) return { owner: false as const, state: null };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const state = await supabaseAdmin.from("article_ai_gateway_state").select("revision,status_code,message,error_kind,updated_at").eq("id", "takeaways").maybeSingle();
    if (state.error) throw new Error("AI availability could not be checked.");
    return { owner: true as const, state: state.data };
  });

export const resumeTakeaways = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => recoveryInput.parse(input))
  .handler(async ({ context, data }) => {
    const role = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "takeaways_owner").maybeSingle();
    if (role.error || !role.data) throw new Error("Owner access is required.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const current = await supabaseAdmin.from("article_ai_gateway_state").select("revision").eq("id", "takeaways").maybeSingle();
    if (current.error) throw new Error("AI availability could not be checked.");
    assertRecoveryAllowed(true, current.data?.revision, data.revision, data.restored);
    // Compare-and-delete protects a newer denial from an older recovery action.
    const removed = await supabaseAdmin.from("article_ai_gateway_state").delete().eq("id", "takeaways").eq("revision", data.revision).select("id");
    if (removed.error) throw new Error("AI generation could not be resumed.");
    if (removed.data?.length !== 1) throw new Error("AI availability has changed. Refresh before resuming.");
    // No gateway call or automatic replay: a fresh reader action is required.
    return { ok: true };
  });