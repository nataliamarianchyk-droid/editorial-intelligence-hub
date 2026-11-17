import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { editorialMarkdownComponents } from "./field-guide-article";
import { categoryBySlug } from "@/lib/insights-data";
import { newsDate, type PublicNews } from "@/lib/news-schema";

export function NewsArticle({ item }: { item: PublicNews }) {
  return <article className="min-w-0 text-foreground">
    <header className="border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <p className="eyebrow">News · {categoryBySlug(item.category)?.name}</p>
        <h1 className="font-display mt-5 text-4xl md:text-5xl leading-tight break-words">{item.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{item.dek}</p>
        <p className="mt-6 text-sm text-muted-foreground">NM Editorial · <time dateTime={item.published_at ?? undefined}>{newsDate(item.published_at)}</time></p>
      </div>
    </header>
    <div className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-16 min-w-0">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={editorialMarkdownComponents}>{item.body_md}</ReactMarkdown>
        <section className="mt-14 border-t border-border pt-8" aria-label="Sources">
          <h2 className="font-display text-2xl">Sources</h2>
          <ul className="mt-5 space-y-5 text-sm">
            {item.sources.map((source, index) => <li key={`${source.url}-${index}`}>
              <p className="text-muted-foreground">{source.publisher} · <time dateTime={source.published}>{newsDate(`${source.published}T12:00:00Z`)}</time></p>
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-1 block text-accent-cyan underline underline-offset-4 break-words">{source.title}</a>
            </li>)}
          </ul>
        </section>
      </div>
    </div>
  </article>;
}