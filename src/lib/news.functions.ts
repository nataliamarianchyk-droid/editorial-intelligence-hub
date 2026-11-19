import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader, setResponseStatus } from "@tanstack/react-start/server";
import { z } from "zod";
import { newsEditableSchema, newsCategories, type NewsItem } from "./news-schema";

export const listPublishedNews = createServerFn({ method: "GET" })
  .inputValidator((input: { category?: string }) => z.object({ category: z.enum(newsCategories).optional() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { readPublishedNews } = await import("./news-repository.server");
    setResponseHeader("Cache-Control", "no-store");
    return readPublishedNews(supabaseAdmin, data);
  });

export const getPublishedNews = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: newsEditableSchema.shape.slug }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { readPublishedNews } = await import("./news-repository.server");
    setResponseHeader("Cache-Control", "no-store");
    const [item] = await readPublishedNews(supabaseAdmin, data);
    if (item) return { kind: "published" as const, item };
    // Returns only a boolean, never reads a withdrawn article's content.
    const { data: withdrawn, error } = await supabaseAdmin.rpc("news_slug_withdrawn", { news_slug: data.slug });
    if (error) throw new Error("News is temporarily unavailable.");
    if (withdrawn) { setResponseStatus(410); return { kind: "withdrawn" as const }; }
    return { kind: "missing" as const };
  });

export const listOwnerNews = createServerFn({ method: "GET" }).handler(async () => {
  const { assertControlRoomSession } = await import("./control-room-session.server");
  await assertControlRoomSession();
  setResponseHeader("Cache-Control", "no-store");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("news_items").select("*").order("created_at", { ascending: false });
  if (error) throw new Error("Unable to load news drafts.");
  return (data ?? []) as NewsItem[];
});

export const updateOwnerNews = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ id: z.uuid(), fields: newsEditableSchema }).parse(input))
  .handler(async ({ data }) => {
    const { assertControlRoomSession } = await import("./control-room-session.server");
    await assertControlRoomSession();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: saved, error } = await supabaseAdmin.from("news_items").update({ ...data.fields, updated_at: new Date().toISOString() }).eq("id", data.id).eq("status", "draft").select("id").maybeSingle();
    if (error || !saved) throw new Error("Unable to save. Only drafts can be edited; slugs must be unique.");
    return { ok: true };
  });

export const transitionOwnerNews = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ id: z.uuid(), action: z.enum(["publish", "withdraw", "delete"]), confirmDelete: z.boolean().optional(), publication_date: z.string().optional() }).parse(input))
  .handler(async ({ data }) => {
    const { assertControlRoomSession } = await import("./control-room-session.server");
    await assertControlRoomSession();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const now = new Date().toISOString();
    if (data.action === "delete") {
      if (!data.confirmDelete) throw new Error("Deletion confirmation is required.");
      const { data: deleted, error } = await supabaseAdmin.from("news_items").delete().eq("id", data.id).eq("status", "draft").select("id").maybeSingle();
      if (error || !deleted) throw new Error("Only drafts can be deleted.");
    } else if (data.action === "publish") {
      const { publishNewsDraft } = await import("./news-publication.server");
      await publishNewsDraft(supabaseAdmin, data.id, data.publication_date);
    } else {
      const { data: saved, error } = await supabaseAdmin.from("news_items").update({ status: "withdrawn", updated_at: now }).eq("id", data.id).in("status", ["draft", "published"]).select("id").maybeSingle();
      if (error || !saved) throw new Error("This item has changed. Refresh before trying again.");
    }
    return { ok: true };
  });