import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/news-drafts")({
  server: { handlers: { POST: async ({ request }) => {
    const { handleNewsIntake } = await import("@/lib/news-intake.server");
    return handleNewsIntake(request, process.env['NEWS_INGEST_SECRET'], async (draft) => {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin.rpc("ingest_news_draft", { payload: { ...draft } });
      if (error) throw error;
      return data as { code: number; id?: string; status?: string };
    });
  } } },
});