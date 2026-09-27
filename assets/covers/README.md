# Editorial cover artwork

Abstract artworks by **Pawel Czerwinski**, downloaded from Unsplash. These are decorative covers, not research figures or the author's own photographs.

| Local file | Original work |
| --- | --- |
| `abstract-geometry.jpg` | [Geometric shapes create an abstract, minimalist composition](https://unsplash.com/photos/tnydtQWIr0c) |
| `abstract-curves.jpg` | [Abstract shapes of white paper gently curving](https://unsplash.com/photos/yKVBAM-gKJo) |
| `abstract-blue-ribbons.webp` | [Swirling, light blue ribbons create an abstract design](https://unsplash.com/photos/fZTKBU8OqXk) |

The source pages identify the works as free under the [Unsplash License](https://unsplash.com/license). Geometry and curves have 1400 × 2100 JPEG originals; blue ribbons is a 1400 × 933 WebP. CSS crops them to fit each cover. Keep the visible source credit on article pages; home-page cards intentionally omit these captions to reduce clutter. Research illustrations remain under `assets/articles/`.

The pages use optimized `.webp` copies (quality 82, unchanged dimensions), reducing the two cover downloads from 105/132 KB to 16/19 KB. JPEGs remain as the original downloaded assets. Article heads preload their cover; the homepage uses the same URL so the browser can reuse it after opening the featured article.

Assign a different work to each article: geometry for information filtering, curves for personal knowledge, and blue ribbons for LLM inference scheduling. Keep an article's Chinese/English cover identical, and reuse that same asset on its home-page card. When adding another article, select a new compatible work rather than copying the template's default cover; update image dimensions, head preload, and credit together.
