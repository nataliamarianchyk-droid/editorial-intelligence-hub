import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { fieldGuides, fieldGuideHeadingId } from "@/lib/field-guide-data";
import fieldGuideCover from "@/assets/insights/field-guides-cover.jpg";

const components: Components = {
  h2: ({ children }) => <h2 id={fieldGuideHeadingId(String(children))} className="font-display text-3xl md:text-4xl mt-14 mb-5 text-ink-navy scroll-mt-40">{children}</h2>,
  p: ({ children }) => <p className="my-5 font-sans text-[17px] leading-[1.85] text-ink-navy">{children}</p>,
  a: ({ children, href }) => <a href={href} className="text-accent-cyan underline underline-offset-4 break-words focus-visible:outline-2 focus-visible:outline-accent-cyan">{children}</a>,
  ul: ({ children }) => <ul className="my-5 list-disc pl-6 space-y-3 font-sans text-ink-navy">{children}</ul>,
  ol: ({ children }) => <ol className="my-5 list-decimal pl-6 space-y-3 font-sans text-ink-navy">{children}</ol>,
  blockquote: ({ children }) => <blockquote className="my-10 border-l-4 border-accent-cyan pl-6 py-2 [&_p]:font-display [&_p]:text-2xl">{children}</blockquote>,
  table: ({ children }) => <div className="my-8 overflow-x-auto rounded-sm border border-border"><table className="w-full min-w-[520px] text-left font-sans text-sm text-ink-navy">{children}</table></div>,
  th: ({ children }) => <th scope="col" className="bg-cream px-4 py-4 font-semibold border-b border-border">{children}</th>,
  td: ({ children }) => <td className="px-4 py-4 align-top border-b border-border">{children}</td>,
};

export const fieldGuideContent = Object.fromEntries(fieldGuides.map((guide) => [guide.slug, {
  toc: [...guide.markdown.matchAll(/^## (.+)$/gm)].map((match) => ({ id: fieldGuideHeadingId(match[1]), label: match[1] })),
  Body: () => <>
    <figure className="mb-10">
      <img src={fieldGuideCover} alt="Editorial notebooks showing acquisition funnels, measurement, workflows and customer cohorts" width={1536} height={864} loading="lazy" className="w-full aspect-video object-cover rounded-sm" />
    </figure>
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{guide.markdown}</ReactMarkdown>
    <p className="mt-10 border-t border-border pt-5 font-sans text-sm text-muted-foreground">Editorial field guide · Sources checked 13 November 2026. Platform settings and eligibility can change; consult the linked documentation before implementation.</p>
  </>,
}]));