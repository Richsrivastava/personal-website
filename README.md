# richasrivastava.com

Personal site for Richa Srivastava — Engineering & AI Leader.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Markdown | gray-matter + unified/remark/rehype |
| Styling | Plain CSS (globals.css) |
| Hosting | Vercel |

## Project structure

```
content/
  articles/    ← one .md file per article
  poems/       ← one .md file per poem
src/
  app/
    layout.tsx
    page.tsx             ← Home
    writing/
      page.tsx           ← Article list
      [slug]/page.tsx    ← Article detail
    poetry/
      page.tsx           ← Poem list
      [slug]/page.tsx    ← Poem detail
    contact/page.tsx
  components/
    Header.tsx
  lib/
    content.ts           ← Markdown parsing helpers
```

## Development

```bash
npm install
npm run dev
```

Site runs at `http://localhost:3000`

## Adding an article

Create a new `.md` file in `content/articles/` with this frontmatter:

```markdown
---
title: "Your Article Title"
topic: Leadership
publishedDate: "2026-04"
linkedInPostUrl: null
summary: "A 1–2 sentence summary shown on the listing page."
---

Your article body in Markdown...
```

The slug is the filename without `.md`. Next.js picks it up automatically at build time — no code changes needed.

## Adding a poem

Create a new `.md` file in `content/poems/`:

```markdown
---
title: "Your Poem Title"
topic: Life
---

Your poem text here.
Line breaks are preserved.
```

## Deploying

Hosted on Vercel. Push to the main branch to trigger a deployment, or run:

```bash
npx vercel --prod
```
