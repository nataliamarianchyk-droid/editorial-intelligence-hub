import { createFileRoute } from "@tanstack/react-router";
import { handleTakeaways } from "@/lib/article-takeaways.server";

export const Route = createFileRoute("/api/article-takeaways")({
  server: { handlers: { POST: ({ request }) => handleTakeaways(request) } },
});