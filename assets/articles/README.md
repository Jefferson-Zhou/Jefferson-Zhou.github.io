# Article images

Create one folder per article slug:

```text
assets/articles/
└── building-a-personal-wiki/
    ├── workflow.png
    └── search-example.webp
```

Use lowercase, descriptive filenames. Keep source artwork outside the website repository when it is not needed by the published page.

## Image delivery

Published pages use lossless `.webp` copies of PNG illustrations to reduce transfer size without changing pixels. Original PNG and SVG sources are retained. Content illustrations load eagerly on article entry; cover artwork has its own preload and attribution under `../covers/`.
