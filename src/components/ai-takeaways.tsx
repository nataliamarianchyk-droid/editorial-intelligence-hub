import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, LoaderCircle, Sparkles, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { takeawaysSchema } from "@/lib/takeaways-validation";

export function AiTakeaways({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<{ text: string; evidence: string }[]>([]);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("Reading this article…");
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);
  async function generate() {
    if (loading || items.length) return;
    setOpen(true); setLoading(true); setError("");
    const controller = new AbortController(); abort.current = controller;
    try {
      const response = await fetch("/api/article-takeaways", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug }), signal: controller.signal });
      if (!response.ok) { const data = await response.json(); throw new Error(data.message); }
      if (response.headers.get("content-type")?.includes("application/json")) { setItems(takeawaysSchema.parse(await response.json()).takeaways); return; }
      if (!response.body) throw new Error("The AI returned no takeaways.");
      const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = ""; let complete = false;
      while (true) {
        const chunk = await reader.read(); if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });
        let boundary;
        while ((boundary = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, boundary); buffer = buffer.slice(boundary + 1); if (!line.trim()) continue;
          const event = JSON.parse(line);
          if (event.type === "progress") setProgress(event.message);
          if (event.type === "error") throw new Error(event.message);
          if (event.type === "result") { setItems(takeawaysSchema.parse({ takeaways: event.takeaways }).takeaways); complete = true; }
        }
      }
      if (!complete) throw new Error("The AI returned no verified takeaways.");
    } catch (e) { if (!controller.signal.aborted) setError(e instanceof Error ? e.message : "Takeaways are unavailable."); }
    finally { setLoading(false); abort.current = null; }
  }
  return <section aria-label="AI-generated key takeaways" className="mx-auto max-w-3xl px-6 pb-10">
    <div className="border-y border-border py-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink-navy"><Sparkles className="size-4 text-accent-cyan" aria-hidden="true" />AI-generated key takeaways</div>
        <Button variant="outline" size="sm" aria-expanded={open} aria-controls={`takeaways-${slug}`} onClick={() => { if (!open && !items.length && !error) void generate(); else setOpen(!open); }} className="text-ink-navy border-border">
          {open ? <ChevronUp /> : <ChevronDown />}{open ? "Hide" : items.length ? "Show takeaways" : "Generate takeaways"}
        </Button>
      </div>
      {open && <div id={`takeaways-${slug}`} className="mt-5">
        <p className="text-xs text-muted-foreground">AI-generated from this article only. Not reviewed by the author; check the original for context.</p>
        {loading && <div role="status" className="mt-5 flex flex-wrap items-center gap-3 text-sm text-ink-navy"><LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" />{progress}<Button variant="ghost" size="sm" onClick={() => { abort.current?.abort(); setLoading(false); }}><Square />Stop</Button></div>}
        {error && <p role="alert" className="mt-5 text-sm text-ink-navy">{error}</p>}
        {items.length > 0 && <ul className="mt-5 list-disc pl-5 space-y-5 text-sm leading-relaxed text-ink-navy">{items.map((item, index) => <li key={index}>{item.text}<details className="mt-2 text-xs text-muted-foreground"><summary className="cursor-pointer">Article evidence</summary><blockquote className="mt-2 border-l-2 border-accent-cyan pl-3">{item.evidence}</blockquote></details></li>)}</ul>}
      </div>}
    </div>
  </section>;
}