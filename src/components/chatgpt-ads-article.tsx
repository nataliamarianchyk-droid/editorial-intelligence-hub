import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import markdown from "@/content/chatgpt-ads-germany-measurement.md?raw";

export function editorialHeadingId(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const chatgptAdsToc = [...markdown.matchAll(/^## (.+)$/gm)].map((match) => ({
  id: editorialHeadingId(match[1]), label: match[1],
}));

const components: Components = {
  h2: ({ children }) => <h2 id={editorialHeadingId(String(children))} className="font-display text-3xl md:text-4xl mt-14 mb-5 text-ink-navy scroll-mt-40">{children}</h2>,
  h3: ({ children }) => <h3 className="font-display text-2xl mt-10 mb-4 text-ink-navy">{children}</h3>,
  p: ({ children }) => <p className="my-5 font-sans text-[17px] leading-[1.85] text-ink-navy">{children}</p>,
  ul: ({ children }) => <ul className="my-5 list-disc pl-5 space-y-3 font-sans text-ink-navy leading-relaxed">{children}</ul>,
  ol: ({ children }) => <ol className="my-5 list-decimal pl-6 space-y-3 font-sans text-ink-navy leading-relaxed">{children}</ol>,
  blockquote: ({ children }) => <blockquote className="my-10 border-l-4 border-accent-cyan pl-6 py-2 [&_p]:font-display [&_p]:text-2xl [&_p]:leading-snug">{children}</blockquote>,
};

export function ChatgptAdsBody() {
  const body = markdown.slice(markdown.indexOf("## TL;DR"));
  const checklistStart = body.indexOf("## The NM Insight Readiness Checklist");
  const mainStart = body.indexOf("## Germany Has a New Advertising Environment");
  return <>
    <section aria-labelledby="tl-dr" className="border-y border-border pb-5 [&_h2]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{body.slice(0, checklistStart)}</ReactMarkdown>
    </section>
    <aside aria-labelledby="the-nm-insight-readiness-checklist" className="my-10 border border-border border-l-4 border-l-accent-cyan rounded-lg bg-cream p-5 sm:p-8 [&_h2]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{body.slice(checklistStart, mainStart)}</ReactMarkdown>
    </aside>
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{body.slice(mainStart)}</ReactMarkdown>
  </>;
}