import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { insights } from "@/lib/insights-data";

export default defineTool({
  name: "list_insights",
  title: "List insights",
  description:
    "List NM Insight articles with title, dek (summary), category, author, date, read time, issue, and status. Optionally filter by category slug and/or status.",
  inputSchema: {
    category: z
      .string()
      .optional()
      .describe("Optional category slug (e.g. 'performance', 'analytics-tracking')."),
    status: z
      .enum(["published", "upcoming"])
      .optional()
      .describe("Optional publication status filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, status }) => {
    const filtered = insights.filter(
      (i) =>
        (!category || i.category === category) && (!status || i.status === status),
    );
    return {
      content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }],
      structuredContent: { insights: filtered, count: filtered.length },
    };
  },
});
