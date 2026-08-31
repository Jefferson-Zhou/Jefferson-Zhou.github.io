# Adding an article

Use `_template.html` as the source for every new article. Keep the finished article in this directory and use a short, lowercase filename such as `building-a-personal-wiki.html`.

## Workflow

1. Duplicate `_template.html` and rename the copy.
2. Replace every `[REPLACE: ...]` placeholder.
3. Give every `h2` and `h3` a unique, readable `id` and the `data-outline` attribute. The Outline Popover is generated from these headings automatically.
4. Store images under `../assets/articles/<article-slug>/` and always add descriptive `alt`, `width`, and `height` attributes.
5. Update both the featured card and writing list in `../index.html` if the article should appear in both places.
6. Preview the page at desktop and mobile widths. Test the outline, menu, language control, internal links, and horizontal overflow.

## Path rules

Article files in this folder use paths relative to `articles/`:

- Shared stylesheet: `../styles.css`
- Shared script: `../main.js`
- Home page: `../index.html`
- About page: `../about.html`
- Article image: `../assets/articles/<article-slug>/<image-name>`

Do not move the existing root-level `article.html`; it is the first hand-formatted article and intentionally remains unchanged.

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
