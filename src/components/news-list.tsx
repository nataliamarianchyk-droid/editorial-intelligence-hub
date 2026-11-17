import { Link } from "@tanstack/react-router";
import { categoryBySlug } from "@/lib/insights-data";
import { newsDate, type PublicNews } from "@/lib/news-schema";

export function NewsList({ items }: { items: PublicNews[] }) {
  return <div className="divide-y divide-border">
    {items.map((item) => <article key={item.id} className="py-10 grid md:grid-cols-[160px_1fr] gap-5">
      <div className="text-sm text-muted-foreground"><p className="text-accent-cyan">{categoryBySlug(item.category)?.name}</p><time dateTime={item.published_at ?? undefined}>{newsDate(item.published_at)}</time></div>
      <div><h2 className="font-display text-2xl md:text-3xl leading-snug"><Link to="/news/$slug" params={{ slug: item.slug }} className="hover:text-accent-cyan">{item.title}</Link></h2><p className="mt-3 text-muted-foreground leading-relaxed">{item.dek}</p><p className="mt-4 text-xs text-muted-foreground">NM Editorial</p></div>
    </article>)}
  </div>;
}