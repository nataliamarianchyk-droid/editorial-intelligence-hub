import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/article")({
  beforeLoad: () => {
    throw redirect({
      to: "/$category/$articleSlug",
      params: { category: "performance", slug: "visibility-is-not-pipeline" },
      statusCode: 301,
    });
  },
});
