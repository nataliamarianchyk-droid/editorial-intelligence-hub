import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { insights, authors } from "@/lib/insights-data";

const SITE_URL = "https://insights.nm-insight.com";

export default defineTool({
  name: "get_insight",
  title: "Get insight",
  description:
    "Get metadata for a single NM Insight article by its slug, including title, dek (summary), category, author bio, date, read time, and canonical URL. Returns article metadata; the full body lives on the public web page at the returned URL.",
  inputSchema: {
    slug: z.string().min(1).describe("The article slug, e.g. 'visibility-is-not-pipeline'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const insight = insights.find((i) => i.slug === slug);
    if (!insight) {
      return {
        content: [{ type: "text", text: `No insight found with slug '${slug}'.` }],
        isError: true,
      };
    }
    const author = authors[insight.authorKey];
    const url =
      insight.status === "published" ? `${SITE_URL}${insight.href}` : null;
    const payload = { ...insight, author, url };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
