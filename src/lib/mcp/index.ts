import { defineMcp } from "@lovable.dev/mcp-js";
import listCategoriesTool from "./tools/list-categories";
import listInsightsTool from "./tools/list-insights";
import getInsightTool from "./tools/get-insight";

export default defineMcp({
  name: "nm-insight-mcp",
  title: "NM Insight",
  version: "0.1.0",
  instructions:
    "Read-only access to NM Insight's editorial catalog on B2B performance marketing. Use `list_categories` to see topic areas, `list_insights` to browse articles (optionally filtered by category or status), and `get_insight` to fetch metadata and the canonical URL for a specific article by slug.",
  tools: [listCategoriesTool, listInsightsTool, getInsightTool],
});
