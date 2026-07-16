import { defineTool } from "@lovable.dev/mcp-js";
import { categories } from "@/lib/insights-data";

export default defineTool({
  name: "list_categories",
  title: "List categories",
  description:
    "List the editorial categories on NM Insight (Performance, Analytics & Tracking, Growth Systems, B2B SaaS, AI & Marketing Operations, E-commerce) with their slugs and descriptions.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(categories, null, 2) }],
    structuredContent: { categories },
  }),
});
