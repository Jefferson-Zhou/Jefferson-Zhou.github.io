# Adding an article

Use `_template.html` as the source for every new article. Keep the finished article in this directory and use a short, lowercase filename such as `building-a-personal-wiki.html`.

## Workflow

1. Duplicate `_template.html` and rename the copy.
2. Replace every `[REPLACE: ...]` placeholder.
3. Give every `h2` and `h3` a unique, readable `id` and the `data-outline` attribute. The Outline Popover is generated from these headings automatically.
4. Store images under `../assets/articles/<article-slug>/` and always add descriptive `alt`, `width`, and `height` attributes.
5. Update both the featured card and writing list in `../index.html` if the article should appear in both places.
   Keep published entries in descending **first-publication** order, not last-update order. Add `data-published="YYYY-MM-DD"` to each card and writing row, and show the original date. Update adjacent-article navigation chronologically as well.
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

For a Chinese-only article, mark `data-article-language="zh"` and set `data-language-url-en="../index.html"` so the language button returns to the English writing index without presenting Chinese text as an English translation. Label its English-index link “Chinese”; do not create a placeholder English article.

## Useful content blocks

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
