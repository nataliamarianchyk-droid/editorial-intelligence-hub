import { createFileRoute } from "@tanstack/react-router";
import { listPublishedNews } from "@/lib/news.functions";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { NewsList } from "@/components/news-list";
import { shareImageMeta } from "@/lib/share-images";

export const Route = createFileRoute("/news/")({
  loader: () => listPublishedNews({ data: {} }),
  head: () => ({ meta: [
    { title: "Marketing News - NM Insight" }, { name: "description", content: "Owner-reviewed marketing news, measurement updates and platform changes from NM Editorial." },
    { property: "og:title", content: "Marketing News - NM Insight" }, { property: "og:description", content: "Owner-reviewed marketing news, measurement updates and platform changes from NM Editorial." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "https://insights.nm-insight.com/news" }, { name: "twitter:card", content: "summary_large_image" }, ...shareImageMeta(),
  ], links: [{ rel: "canonical", href: "https://insights.nm-insight.com/news" }] }),
  component: NewsPage,
  errorComponent: () => <p role="alert" className="p-10">News is temporarily unavailable.</p>,
  notFoundComponent: () => <p className="p-10">News not found.</p>,
});
function NewsPage() {
  const items = Route.useLoaderData();
  return <><SiteHeader /><main className="mx-auto max-w-5xl px-6 py-16"><p className="eyebrow">NM Editorial</p><h1 className="font-display text-5xl mt-4 mb-10">News</h1>{items.length ? <NewsList items={items} /> : <p className="py-10 text-muted-foreground">No published news yet.</p>}</main><SiteFooter /></>;
}