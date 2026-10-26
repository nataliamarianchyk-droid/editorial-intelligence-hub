# Architecture rules

- Keep the German market FAQ in a browser-safe shared data module consumed by both the article body and route head, so visible answers and FAQPage structured data remain identical.
- Preserve Issue 07's final body as Markdown and render it through a scoped editorial renderer; reading tools must appear only on that article to avoid changing other page layouts.
- Use the existing Embla-backed carousel for Issue 07's end illustrations so arrows, keyboard navigation and touch dragging share the established controls.
- Store explicit publication/modification dates and counted article words in editorial metadata when available, keeping schema dates stable rather than using the viewer's current date.
- Keep share-sized CDN thumbnails in a shared browser-safe metadata helper, applied only in leaf route heads, so platform defaults cannot override page-specific previews.
- Preserve Issue 08 as source Markdown with a scoped renderer, splitting its lead sections without rewriting copy, so the checklist and TL;DR remain faithful.
- Use numeric issue ordering from shared editorial metadata for newest-issue selections, so future issues enter the homepage and archive without manual slot updates.
- Store editorial covers in shared browser-safe metadata and reuse their absolute CDN URL for rendered covers and social previews, so one image stays consistent across surfaces.