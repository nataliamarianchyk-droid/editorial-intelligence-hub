import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { newsPublicationTimestamp } from "./news-schema";

// Called only after the handler has checked the control-room session.
export async function publishNewsDraft(db: SupabaseClient<Database>, id: string, date?: string, now = new Date()) {
  const published_at = newsPublicationTimestamp(date, now);
  const { data: saved, error } = await db.from("news_items")
    .update({ status: "published", published_at, updated_at: now.toISOString() })
    .eq("id", id).eq("status", "draft").select("id").maybeSingle();
  if (error || !saved) throw new Error("This item has changed. Refresh before trying again.");
}