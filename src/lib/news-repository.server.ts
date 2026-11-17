import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { PublicNews } from "./news-schema";

// This projection and status filter are the sole public news read path.
const publicColumns = "id,slug,title,dek,body_md,category,sources,published_at,updated_at";
export async function readPublishedNews(db: SupabaseClient<Database>, options: { slug?: string; category?: string } = {}): Promise<PublicNews[]> {
  let query = db.from("news_items").select(publicColumns).eq("status", "published").order("published_at", { ascending: false });
  if (options.slug) query = query.eq("slug", options.slug);
  if (options.category) query = query.eq("category", options.category);
  const rows: PublicNews[] = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await query.range(offset, offset + 499);
    if (error) throw new Error("News is temporarily unavailable.");
    for (const row of data ?? []) rows.push({ ...row, sources: row.sources as PublicNews["sources"] });
    if (!data || data.length < 500) break;
  }
  return rows;
}