import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { listOwnerNews, updateOwnerNews, transitionOwnerNews } from "@/lib/news.functions";
import { berlinDay, newsEditableSchema, newsDate, newsPublicationDateBounds, newsPublicationDateSchema, type NewsItem } from "@/lib/news-schema";
import { categoryBySlug } from "@/lib/insights-data";
import { NewsArticle } from "./news-article";

export function NewsDrafts({ selectedId }: { selectedId?: string }) {
  const fetchNews = useServerFn(listOwnerNews);
  const query = useQuery({ queryKey: ["owner-news"], queryFn: () => fetchNews() });
  const [selected, setSelected] = useState<string | undefined>(selectedId);
  const [filter, setFilter] = useState<NewsItem["status"]>("draft");
  const [publicationDates, setPublicationDates] = useState<Record<string, string>>({});
  const chosenDate = (entry: NewsItem) => publicationDates[entry.id] ?? entry.suggested_date ?? berlinDay();
  const items = (query.data ?? []).filter((item) => item.status === filter);
  const item = query.data?.find((entry) => entry.id === selected);
  return <section id="news-drafts" className="mb-16 scroll-mt-24 text-foreground">
    <p className="eyebrow">Editorial review</p><h2 className="font-display text-4xl mt-3 mb-8">News drafts</h2>
    <div className="flex gap-2 mb-6" role="group" aria-label="News status">
      {(["draft", "published", "withdrawn"] as const).map((status) => <Button key={status} variant={filter === status ? "default" : "outline"} onClick={() => setFilter(status)}>{status === "draft" ? "Drafts" : status === "published" ? "Published" : "Withdrawn"}</Button>)}
    </div>
    {query.isPending && <p role="status">Loading news drafts…</p>}
    {query.isError && <p role="alert">Unable to load news drafts. <Button variant="outline" onClick={() => query.refetch()}>Retry</Button></p>}
    {!query.isPending && !query.isError && !items.length && <p className="text-muted-foreground py-6">No {filter === "draft" ? "news drafts" : `${filter} news`} yet.</p>}
    <div className="divide-y divide-border">
      {items.map((entry) => <article key={entry.id} className="py-6">
        <p className="text-sm text-muted-foreground">{categoryBySlug(entry.category)?.name} · {newsDate(entry.created_at)}</p>
        {entry.status === "draft" && <p className="text-sm text-muted-foreground mt-1">Publication date: {chosenDate(entry)}</p>}
        <h3 className="font-display text-2xl mt-2">{entry.title}</h3>
        {entry.reviewer_notes && <aside className="my-4 border-l-4 border-accent-cyan bg-muted p-4"><h4 className="font-semibold text-sm mb-2">Reviewer notes</h4><p className="whitespace-pre-wrap break-words">{entry.reviewer_notes}</p></aside>}
        <Button variant="outline" onClick={() => setSelected(entry.id)}>Review</Button>
      </article>)}
    </div>
    {item && <NewsReview key={`${item.id}-${item.updated_at}`} item={item} publicationDate={chosenDate(item)} onDateChange={(date) => setPublicationDates((current) => ({ ...current, [item.id]: date }))} onClose={() => setSelected(undefined)} onSaved={async () => { await query.refetch(); }} />}
  </section>;
}

function NewsReview({ item, publicationDate, onDateChange, onClose, onSaved }: { item: NewsItem; publicationDate: string; onDateChange: (date: string) => void; onClose: () => void; onSaved: () => Promise<void> }) {
  const dateBounds = newsPublicationDateBounds();
  const [fields, setFields] = useState({ title: item.title, dek: item.dek, slug: item.slug, body_md: item.body_md });
  const [preview, setPreview] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const save = useServerFn(updateOwnerNews);
  const transition = useServerFn(transitionOwnerNews);
  async function perform(action: "save" | "publish" | "withdraw" | "delete") {
    setMessage(""); setBusy(true);
    try {
      if (action === "publish") {
        const date = newsPublicationDateSchema().safeParse(publicationDate);
        if (!date.success) { setMessage(date.error.issues[0]?.message ?? "Check the publication date."); return; }
      }
      if (action === "save" || action === "publish") {
        const validated = newsEditableSchema.safeParse(fields);
        if (!validated.success) { setMessage(validated.error.issues[0]?.message ?? "Check the fields."); return; }
        await save({ data: { id: item.id, fields: validated.data } });
      }
      if (action !== "save") await transition({ data: { id: item.id, action, confirmDelete: action === "delete" && confirmDelete, ...(action === "publish" ? { publication_date: publicationDate } : {}) } });
      await onSaved();
      if (action !== "save") onClose();
      else setMessage("Draft saved.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to update news."); }
    finally { setBusy(false); }
  }
  return <div className="mt-10 border-t border-border pt-8">
    <div className="flex flex-wrap items-center justify-between gap-4"><h3 className="font-display text-2xl">Review news</h3><Button variant="outline" onClick={onClose} disabled={busy}>Close review</Button></div>
    {item.reviewer_notes && <aside className="my-5 border-l-4 border-accent-cyan bg-muted p-4"><h4 className="font-semibold mb-2">Reviewer notes</h4><p className="whitespace-pre-wrap break-words">{item.reviewer_notes}</p></aside>}
    <div className="flex gap-2 my-6" role="group" aria-label="Review mode"><Button variant={!preview ? "default" : "outline"} onClick={() => setPreview(false)}>Edit</Button><Button variant={preview ? "default" : "outline"} onClick={() => setPreview(true)}>Preview</Button></div>
    {preview ? <NewsArticle item={{ ...item, ...fields }} /> : <form onSubmit={(event) => { event.preventDefault(); void perform("save"); }} className="space-y-5">
      <label className="block text-sm">Title<Input className="mt-2" value={fields.title} maxLength={160} required disabled={item.status !== "draft" || busy} onChange={(e) => setFields({ ...fields, title: e.target.value })} /></label>
      <label className="block text-sm">Dek<Textarea className="mt-2" value={fields.dek} maxLength={300} required disabled={item.status !== "draft" || busy} onChange={(e) => setFields({ ...fields, dek: e.target.value })} /></label>
      <label className="block text-sm">Slug<Input className="mt-2" value={fields.slug} maxLength={80} pattern="[a-z0-9]+(-[a-z0-9]+)*" required disabled={item.status !== "draft" || busy} onChange={(e) => setFields({ ...fields, slug: e.target.value })} /></label>
      <label className="block text-sm">Body<Textarea className="mt-2 min-h-96 font-mono" value={fields.body_md} maxLength={20000} required disabled={item.status !== "draft" || busy} onChange={(e) => setFields({ ...fields, body_md: e.target.value })} /></label>
      {item.status === "draft" && <Button type="submit" disabled={busy}>Save draft</Button>}
    </form>}
    {message && <p className="my-5 text-sm" role="status">{message}</p>}
    <div className="flex flex-wrap items-end gap-3 mt-8">
      {item.status === "draft" && <>
        <label className="block text-sm">Publication date<Input type="date" className="mt-2 w-44" value={publicationDate} min={dateBounds.min} max={dateBounds.max} required disabled={busy} onChange={(event) => onDateChange(event.target.value)} /></label>
        <Button disabled={busy} onClick={() => perform("publish")}>Publish</Button>
      </>}
      {item.status !== "withdrawn" && <Button variant="outline" disabled={busy} onClick={() => perform("withdraw")}>Withdraw</Button>}
      {item.status === "draft" && <Button variant="destructive" disabled={busy} onClick={() => setConfirmDelete(true)}>Delete draft</Button>}
    </div>
    {confirmDelete && <div role="alert" className="mt-5 bg-muted p-5 border border-border"><p className="mb-4">Permanently delete this draft?</p><div className="flex gap-3"><Button variant="destructive" disabled={busy} onClick={() => perform("delete")}>Confirm deletion</Button><Button variant="outline" disabled={busy} onClick={() => setConfirmDelete(false)}>Cancel</Button></div></div>}
  </div>;
}