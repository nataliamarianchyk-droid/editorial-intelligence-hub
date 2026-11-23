import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { readPublishedNews } from "./news-repository.server";

const DEFAULT_LIMIT = 4;
const MIN_LIMIT = 1;
const MAX_LIMIT = 10;

// The only public news read surface for external sites. It reuses
// readPublishedNews, so a draft or withdrawn row can never be returned, and it
// copies exactly five fields, so body text, sources, reviewer notes, agent ids
// and suggested dates stay behind this whitelist.
function feedItem(row: { slug: string; title: string; dek: string; category: string; published_at: string | null }) {
  return { slug: row.slug, title: row.title, dek: row.dek, category: row.category, published_at: row.published_at };
}

export function newsFeedLimit(raw: string | null): number {
  if (raw === null || raw.trim() === "") return DEFAULT_LIMIT;
  const parsed = Number(raw);
  return Number.isInteger(parsed) && parsed >= MIN_LIMIT && parsed <= MAX_LIMIT ? parsed : DEFAULT_LIMIT;
}

export function newsFeedMethodNotAllowed() {
  return new Response(null, { status: 405, headers: { Allow: "GET", "X-Robots-Tag": "noindex" } });
}

export async function handleNewsFeed(request: Request, db: SupabaseClient<Database>): Promise<Response> {
  const limit = newsFeedLimit(new URL(request.url).searchParams.get("limit"));
  try {
    const rows = await readPublishedNews(db);
    return Response.json({ items: rows.slice(0, limit).map(feedItem) }, {
      headers: { "Cache-Control": "public, max-age=60", "X-Robots-Tag": "noindex" },
    });
  } catch (error) {
    // The underlying reason stays in the server log; the response carries no details.
    console.error("[news-feed] published news read failed", error);
    return Response.json({ items: [] }, { status: 503, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
  }
}
