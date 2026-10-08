# Architecture rules

- Keep the German market FAQ in a browser-safe shared data module consumed by both the article body and route head, so visible answers and FAQPage structured data remain identical.
- Preserve Issue 07's final body as Markdown and render it through a scoped editorial renderer; reading tools must appear only on that article to avoid changing other page layouts.
- Store explicit publication/modification dates and counted article words in editorial metadata when available, keeping schema dates stable rather than using the viewer's current date.