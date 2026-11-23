import { createFileRoute } from "@tanstack/react-router";

async function notAllowed() {
  const { newsFeedMethodNotAllowed } = await import("@/lib/news-feed.server");
  return newsFeedMethodNotAllowed();
}

export const Route = createFileRoute("/api/news-feed")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { handleNewsFeed } = await import("@/lib/news-feed.server");
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        return handleNewsFeed(request, supabaseAdmin);
      },
      POST: notAllowed,
      PUT: notAllowed,
      PATCH: notAllowed,
      DELETE: notAllowed,
      OPTIONS: notAllowed,
    },
  },
});
