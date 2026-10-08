import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import markdown from "@/content/job-search-funnel.md?raw";
import heroImage from "@/assets/insights/job-search/1_hero_funnel.png.asset.json";
import funnelImage from "@/assets/insights/job-search/2_funnel_table_v2.png.asset.json";
import leaksImage from "@/assets/insights/job-search/3_where_it_leaked_v2.png.asset.json";
import changesImage from "@/assets/insights/job-search/4_five_changes.png.asset.json";
import playbookImage from "@/assets/insights/job-search/5_operators_playbook.png.asset.json";

function ArticleImage({ src, alt, width, height, experimental = false }: { src: string; alt: string; width: number; height: number; experimental?: boolean }) {
  return <figure className="my-10 mx-auto max-w-2xl">
    <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="block h-auto w-full rounded-sm" />
    {experimental ? <figcaption className="mt-3 font-sans text-sm leading-relaxed text-ink-navy">The positioning line is being tested within this experiment, not adopted as a permanent CV or LinkedIn rebrand.</figcaption> : null}
  </figure>;
}

export const jobSearchToc = [
  { id: "the-funnel-stated-plainly", label: "The Funnel, Stated Plainly" },
  { id: "where-it-leaked", label: "Where It Leaked" },
  { id: "five-changes-same-system", label: "Five Changes, Same System" },
  { id: "the-verdict", label: "The Verdict" },
  { id: "operators-playbook", label: "The Operator's Playbook" },
];

const components: Components = {
  h2: ({ children }) => {
    const label = String(children);
    const id = jobSearchToc.find((item) => item.label === label)?.id;
    return <>
      <h2 id={id} className="font-display text-3xl md:text-4xl mt-14 mb-5 text-ink-navy scroll-mt-40">{children}</h2>
      {id === "where-it-leaked" ? <ArticleImage src={leaksImage.url} alt="Three funnel leaks: wrong channel at the top, weak positioning in the message, and under-preparation at the interview stage." width={768} height={991} /> : null}
      {id === "five-changes-same-system" ? <ArticleImage src={changesImage.url} alt="Five changes: test one positioning line, stop the generic channel, apply to a role shape, run outbound on myself, and rehearse the numbers." width={434} height={454} experimental /> : null}
    </>;
  },
  h3: ({ children }) => <h2 id="operators-playbook" className="font-display text-2xl mb-3 text-ink-navy scroll-mt-40">{children}</h2>,
  p: ({ children }) => <p className="my-5 font-sans text-[17px] leading-[1.85] text-ink-navy">{children}</p>,
  blockquote: ({ children }) => <blockquote className="my-10 border-l-4 border-accent-cyan pl-6 py-2 [&_p]:font-display [&_p]:text-2xl md:[&_p]:text-3xl [&_p]:leading-snug">{children}</blockquote>,
  table: ({ children }) => <div role="region" aria-label="Job search funnel data" tabIndex={0} className="my-8 overflow-x-auto rounded-sm border border-border bg-paper font-sans focus-visible:outline-2 focus-visible:outline-accent-cyan"><table aria-describedby="funnel-footnote" className="w-full min-w-[480px] text-left text-sm md:text-base">{children}</table></div>,
  thead: ({ children }) => <thead className="bg-cream border-b border-border">{children}</thead>,
  th: ({ children }) => <th scope="col" className="px-5 py-3 text-xs uppercase font-semibold text-ink-navy">{children}</th>,
  tr: ({ children }) => <tr className="border-b border-border last:border-0">{children}</tr>,
  td: ({ children }) => <td className="px-5 py-3 text-ink-navy">{children}</td>,
  ul: ({ children }) => <ul className="list-disc pl-5 space-y-4 font-sans text-ink-navy leading-relaxed">{children}</ul>,
  hr: () => <hr className="my-8 border-border" />,
};

export function JobSearchBody() {
  const [summary, ...rest] = markdown.split("\n\n");
  const remainder = rest.join("\n\n");
  const [body, playbook] = remainder.split("### The Operator's Playbook");
  return <>
    <aside aria-label="TL;DR" className="border-l-4 border-accent-cyan bg-cream px-5 py-2">
      <ReactMarkdown components={components}>{summary}</ReactMarkdown>
    </aside>
    <ArticleImage src={heroImage.url} alt="Natalia's job-search funnel: 58 closed processes, 42 rejected at CV screen, 14 reaching interview stage, and zero offers." width={630} height={994} />
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ ...components,
        p: ({ children, node }) => {
          const text = JSON.stringify(node?.children ?? []);
          const isFootnote = text.includes("Of the 14 processes recorded");
          return <>
            <p id={isFootnote ? "funnel-footnote" : undefined} className={`my-5 font-sans leading-[1.85] text-ink-navy ${isFootnote ? "text-sm" : "text-[17px]"}`}>{children}</p>
            {isFootnote ? <ArticleImage src={funnelImage.url} alt="Funnel at a glance: 58 closed processes; 42 CV-screen rejections (72%); 14 interview-stage processes (24%); zero offers. Eight interview-stage processes were confirmed through calendar entries only, with no separate outcome recorded." width={768} height={944} /> : null}
          </>;
        },
      }}>{body}</ReactMarkdown>
    </div>
    <aside aria-labelledby="operators-playbook" className="my-10 rounded-lg border border-border bg-cream p-5 sm:p-8">
      <ReactMarkdown components={components}>{`### The Operator's Playbook${playbook?.split("\n---")[0] ?? ""}`}</ReactMarkdown>
    </aside>
    <ArticleImage src={playbookImage.url} alt="The Operator's Playbook: write the funnel down, read rejections as a set, measure conversion by channel, test one positioning line, use your own skill as the method, and rehearse numbers out loud." width={422} height={454} experimental />
    <p className="text-sm italic text-ink-navy">NM Insight · Issue 07</p>
    <div id="job-search-reading-end" />
  </>;
}

export function JobSearchReadingTools() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const start = document.getElementById("job-search-article-body");
      const end = document.getElementById("job-search-reading-end");
      if (!start || !end) return;
      const top = start.getBoundingClientRect().top + window.scrollY;
      const bottom = end.getBoundingClientRect().top + window.scrollY;
      const distance = Math.max(1, bottom - top - window.innerHeight + 160);
      setProgress(Math.round(Math.min(100, Math.max(0, (window.scrollY - top + 160) / distance * 100))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <div className="sticky top-28 z-30 border-y border-border bg-paper">
    <div className="mx-auto max-w-6xl px-6 py-2 flex items-center gap-5">
      <progress aria-label="Article reading progress" max={100} value={progress} className="h-1 w-full min-w-0 appearance-none overflow-hidden rounded-sm bg-cream-deep [&::-webkit-progress-bar]:bg-cream-deep [&::-webkit-progress-value]:bg-accent-cyan [&::-moz-progress-bar]:bg-accent-cyan" />
      <Button asChild variant="ghost" className="shrink-0 text-ink-navy hover:bg-cream focus-visible:ring-accent-cyan">
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://insights.nm-insight.com/growth-systems/job-search-funnel")}`} target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" /> Share on LinkedIn</a>
      </Button>
    </div>
  </div>;
}