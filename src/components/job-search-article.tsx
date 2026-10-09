import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import markdown from "@/content/job-search-funnel.md?raw";
import heroImage from "@/assets/insights/job-search/1_hero_funnel.png.asset.json";
import funnelImage from "@/assets/insights/job-search/2_funnel_table_v2.png.asset.json";
import leaksImage from "@/assets/insights/job-search/3_where_it_leaked_v2.png.asset.json";
import changesImage from "@/assets/insights/job-search/4_five_changes.png.asset.json";
import playbookImage from "@/assets/insights/job-search/5_operators_playbook.png.asset.json";

const slides = [
  { src: heroImage.url, alt: "Job-search funnel: 58 closed processes, 42 CV-screen rejections, 14 interview-stage processes, zero offers." },
  { src: funnelImage.url, alt: "The funnel at a glance, including the calendar-only interview-stage footnote." },
  { src: leaksImage.url, alt: "Where it leaked: wrong channel, weak positioning, and under-preparation." },
  { src: changesImage.url, alt: "Five changes: positioning, channel, role shape, outbound, and rehearsing numbers." },
  { src: playbookImage.url, alt: "The Operator's Playbook: six moves for measuring and improving a job-search funnel." },
];

function JobSearchCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => { api.off("select", update); api.off("reInit", update); };
  }, [api]);
  return <Carousel setApi={setApi} opts={{ loop: false }} aria-label="Issue 07 illustrations" tabIndex={0} className="my-10 mx-auto max-w-2xl focus-visible:outline-2 focus-visible:outline-accent-cyan">
    <CarouselContent>
      {slides.map((slide, index) => <CarouselItem key={slide.src} aria-label={`${index + 1} of 5`} aria-hidden={selected !== index}>
        <div className="aspect-[630/994] flex items-center justify-center bg-paper">
          <img src={slide.src} alt={slide.alt} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain rounded-sm" />
        </div>
      </CarouselItem>)}
    </CarouselContent>
    <div className="mt-4 flex items-center justify-center gap-3">
      <CarouselPrevious className="static translate-y-0 h-11 w-11" />
      <div className="flex items-center" aria-label="Choose illustration">
        {slides.map((slide, index) => <Button key={slide.src} variant="ghost" size="icon" aria-label={`Show image ${index + 1}`} aria-current={selected === index ? "true" : undefined} onClick={() => api?.scrollTo(index)} className="h-11 w-9">
          <span aria-hidden="true" className={`h-2 w-2 rounded-full ${selected === index ? "bg-accent-cyan" : "bg-ink-navy/30"}`} />
        </Button>)}
      </div>
      <CarouselNext className="static translate-y-0 h-11 w-11" />
    </div>
    <p className="sr-only" aria-live="polite">Image {selected + 1} of 5</p>
  </Carousel>;
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
    return <h2 id={id} className="font-display text-3xl md:text-4xl mt-14 mb-5 text-ink-navy scroll-mt-40">{children}</h2>;
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
  const remainder = markdown.slice(markdown.indexOf("If you handed me a B2B pipeline"));
  const [body, playbook] = remainder.split("### The Operator's Playbook");
  return <>
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ ...components,
        p: ({ children, node }) => {
          const text = JSON.stringify(node?.children ?? []);
          const isFootnote = text.includes("Of the 14 processes recorded");
          return <p id={isFootnote ? "funnel-footnote" : undefined} className={`my-5 font-sans leading-[1.85] text-ink-navy ${isFootnote ? "text-sm" : "text-[17px]"}`}>{children}</p>;
        },
      }}>{body}</ReactMarkdown>
    </div>
    <aside aria-labelledby="operators-playbook" className="my-10 rounded-lg border border-border bg-cream p-5 sm:p-8">
      <ReactMarkdown components={components}>{`### The Operator's Playbook${playbook?.split("\n---")[0] ?? ""}`}</ReactMarkdown>
    </aside>
    <p className="text-sm italic text-ink-navy">NM Insight · Issue 07</p>
    <JobSearchCarousel />
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
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://insights.nm-insight.com/ai-marketing-operations/job-search-funnel")}`} target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" /> Share on LinkedIn</a>
      </Button>
    </div>
  </div>;
}