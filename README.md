# Jefferson Zhou — personal homepage

A restrained, bilingual personal website for academic applications, research notes, and long-form writing. The site is plain HTML, CSS, and JavaScript so it can be published directly with GitHub Pages.

## Project map

```text
.
├── index.html                     # Blog home and article index
├── about.html                     # Academic profile
├── article.html                   # First published article (keep unchanged)
├── articles/
│   ├── README.md                  # New-article workflow and checklist
│   └── _template.html             # Copy this file for every new article
├── assets/
│   ├── personal-wiki-workflow.png # Image used by the first article
│   └── articles/                  # Images for future articles, grouped by slug
├── styles.css                     # Shared visual system and page styles
├── main.js                        # Shared navigation, language, filters, outline
└── .github/workflows/pages.yml    # GitHub Pages deployment
```

## Add a new article

1. Copy `articles/_template.html` to `articles/your-article-slug.html`.
2. Follow the placeholders and checklist in `articles/README.md`.
3. Put article images in `assets/articles/your-article-slug/`.
4. Add the new title, summary, category, and link to `index.html`.

The template already includes the shared header, long-form typography, reading progress, responsive Outline Popover, previous/next navigation, and footer.

## Editing boundaries

- `article.html` is the hand-formatted first article. Treat it as published content and do not use automated formatting on it.
- Shared behavior belongs in `main.js`; shared presentation belongs in `styles.css`.
- New article-specific content belongs in `articles/`, not in the shared files.
- Generated screenshots and local test output belong in `output/`, which is ignored by Git.

## Preview and publish

Serve the repository with a static web server, for example:

```sh
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`. Pushing the `main` branch triggers the GitHub Pages workflow in `.github/workflows/pages.yml`.
