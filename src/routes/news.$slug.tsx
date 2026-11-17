import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getPublishedNews } from "@/lib/news.functions";
import { shareImageMeta } from "@/lib/share-images";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { NewsArticle } from "@/components/news-article";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const result = await getPublishedNews({ data: { slug: params.slug } });
    if (result.kind === "missing") throw notFound();
    return result;
  },
  head: ({ loaderData, params }) => {
    const item = loaderData?.kind === "published" ? loaderData.item : undefined;
    const title = item ? `${item.title} - NM Insight` : "News unavailable - NM Insight";
    const description = item?.dek ?? "This news item is no longer available.";
    const url = `https://insights.nm-insight.com/news/${params.slug}`;
    return {
      meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { property: "og:url", content: url }, { name: "twitter:card", content: "summary_large_image" }, ...shareImageMeta(), ...(!item ? [{ name: "robots", content: "noindex" }] : [])],
      links: [{ rel: "canonical", href: url }],
      scripts: item ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "NewsArticle", headline: item.title, description: item.dek, datePublished: item.published_at, dateModified: item.updated_at, author: { "@type": "Organization", name: "NM Editorial" }, publisher: { "@type": "Organization", name: "NM Insight", url: "https://nm-insight.com" }, image: shareImageMeta().find((meta) => meta.property === "og:image")?.content, mainEntityOfPage: url }).replace(/</g, "\\u003c") }] : [],
    };
  },
  component: NewsDetail,
  notFoundComponent: () => <><SiteHeader /><main className="mx-auto max-w-3xl p-10"><h1 className="font-display text-3xl">News not found</h1><Link to="/news" className="text-accent-cyan">Back to News</Link></main><SiteFooter /></>,
  errorComponent: () => <p role="alert" className="p-10">News is temporarily unavailable.</p>,
});
function NewsDetail() {
  const result = Route.useLoaderData();
  return <><SiteHeader /><main>{result.kind === "published" ? <NewsArticle item={result.item} /> : <div className="mx-auto max-w-3xl px-6 py-20"><p className="eyebrow">410</p><h1 className="font-display text-4xl mt-4">This news item has been withdrawn.</h1><Link to="/news" className="mt-6 block text-accent-cyan">Back to News</Link></div>}</main><SiteFooter /></>;
}