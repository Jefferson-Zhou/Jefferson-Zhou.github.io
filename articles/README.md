# Adding an article

Use `_template.html` as the source for every new article. Keep the finished article in this directory and use a short, lowercase filename such as `building-a-personal-wiki.html`.

## Workflow

1. Duplicate `_template.html` and rename the copy.
2. Replace every `[REPLACE: ...]` placeholder.
3. Give every `h2` and `h3` a unique, readable `id` and the `data-outline` attribute. The Outline Popover is generated from these headings automatically.
4. Store images under `../assets/articles/<article-slug>/` and always add descriptive `alt`, `width`, and `height` attributes.
5. Update both the featured card and writing list in `../index.html` if the article should appear in both places.
   Keep published entries in descending **first-publication** order, not last-update order. Add `data-published="YYYY-MM-DD"` to each card and writing row, and show the original date. Update adjacent-article navigation chronologically as well.
   In the writing list, put each row inside the matching `.blog-year-group`. For a new year, add a group with `data-year="YYYY"` and a `.blog-year-title` heading; keep groups newest first. Topic filters hide empty year groups automatically.
   Archive rows use the aligned layout: year at the left, date/type/topic/read time in `.blog-row-meta`, and the linked title in `h4` with its original summary below at the right. Preserve the article summaries and metadata when changing layout.
6. Preview the page at desktop and mobile widths. Test the outline, menu, language control, internal links, and horizontal overflow.

## Path rules

Article files in this folder use paths relative to `articles/`:

- Shared stylesheet: `../styles.css`
- Shared script: `../main.js`
- Home page: `../index.html`
- About page: `../about.html`
- Article image: `../assets/articles/<article-slug>/<image-name>`

Do not move the existing root-level `article.html`; it is the first hand-formatted article and intentionally remains unchanged.

## Bilingual articles

Keep each language version as a separate HTML file so long-form article markup is never overwritten by the interface translator. Add `data-article-language` and the counterpart URL to each page's `<body>`, following `../article.html` and `aggregate-your-personal-knowledge.html` as the working example. On the home page, use `data-href-en` and `data-href-zh` so each language opens the matching article.

For a technical article with tables, figures, margin notes, and numbered references, use `llm-inference-scheduling.html` (Chinese) and `llm-inference-scheduling-en.html` (English) as a complete paired example. Both translations retain the same first-publication and update dates, share image assets, and link back to one another.

For a Chinese-only article, mark `data-article-language="zh"` and set `data-language-url-en="../index.html"` so the language button returns to the English writing index without presenting Chinese text as an English translation. Label its English-index link “Chinese”; do not create a placeholder English article.

## Useful content blocks

The article header uses `.article-header-copy` for the breadcrumb, title, subtitle, and dates, alongside `.article-header-cover` for decorative artwork. The template already includes this structure. To change its cover, replace the image path and its Unsplash credit together; see `../assets/covers/README.md`. Do not place research figures in this decorative header.

The reading column is centered independently of the left outline. On desktop the outline stays short and scrollable with its scrollbar hidden; narrow screens use the Outline Popover. Shared typography and spacing live in `../styles.css`, so do not add per-article layout overrides.

Use the normal `.article-note` markup beside its related paragraph or figure. `main.js` places these notes in the right margin on screens at least 1280px wide, aligning them with the preceding block and preventing overlap. Narrow screens and printing retain inline notes; do not duplicate note text or citation IDs in a separate sidebar.

For fast article entry, use `loading="eager" decoding="async"` on content images and preload the decorative cover in the document head. Prefer lossless WebP copies for research figures, retain their original assets, and preserve `alt`, `width`, and `height`. The Chinese and English information-filtering examples both use `<details class="research-example" open>`.

- Lead paragraph: `<p class="article-lead">...</p>`
- Section summary: `<p class="section-deck">...</p>`
- Callout: `<aside class="article-note"><p>...</p></aside>`
- List: `<ul class="article-list">...</ul>`
- Figure: `<figure class="article-figure">...</figure>`
- Wide data table: wrap `<table>` in `<div class="article-table-wrap">`
- Code: `<pre><code>...</code></pre>`
- Prompt sample: `<pre class="prompt-example"><code>...</code></pre>`
- Quote: `<blockquote><p>...</p></blockquote>`

Delete unused example blocks from the copied page before publishing.
