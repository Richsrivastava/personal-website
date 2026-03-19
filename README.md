# richasrivastava.com

Personal portfolio and writing site for Richa Srivastava — Engineering & AI Leader.

Live at **[richasrivastava.com](https://richasrivastava.com)**

## What this is

A professional portfolio site featuring:

- **Writing** — long-form articles on enterprise AI, engineering leadership, and insurance technology
- **Poetry** — creative writing
- **GitHub** — project showcase
- **Contact** — get in touch

Articles are authored in a structured JSON format and rendered as markdown. The site is pre-rendered at build time for SEO — article pages get full Open Graph meta tags, schema.org structured data, and sitemap entries so they're indexable by Google and render correctly when shared on LinkedIn.

## Stack

| Layer | Technology |
|---|---|
| UI | React 19 + TypeScript |
| Styling | Custom CSS + Tailwind utilities |
| Routing | React Router v6 |
| Markdown | react-markdown + remark-gfm |
| Build | Vite 6 |
| Hosting | Cloudflare Workers (edge) |
| Pre-rendering | Custom `prerender.mjs` script |

## Project structure

```
src/
  components/       # Layout, Header, Footer
  pages/            # Home, Articles, ArticleDetail, Poems, PoemDetail, Github, Contact
  data/
    articles.json   # Article content — slug, title, topic, publishedDate, content
    poems.json      # Poem content
  portfolio_styles.css
  worker/           # Cloudflare Worker entry point
public/
  images/articles/  # Hero images for articles
prerender.mjs       # SEO pre-rendering script — runs after vite build
```

## Adding an article

Add a new entry to `src/data/articles.json`:

```json
{
  "slug": "your-article-slug",
  "title": "Article Title",
  "topic": "Artificial Intelligence",
  "publishedDate": "YYYY-MM",
  "linkedInPostUrl": null,
  "heroImage": null,
  "heroImageAlt": null,
  "summary": "2-3 sentence summary shown on listing page and in OG tags.",
  "content": "Full article in markdown. Use **bold**, ## headers, and \\n for line breaks."
}
```

Once you publish the article on LinkedIn, update `linkedInPostUrl` with the post URL (no tracking parameters) and redeploy — a "Continue the conversation" CTA will appear at the bottom of the article.

## Development

```bash
npm install
npm run dev
```

Site runs at `http://localhost:5173`

## Production build and deploy

```bash
npm run build      # TypeScript compile + Vite build + prerender.mjs
npm run deploy     # Deploy to Cloudflare Workers
```

The build script automatically:
- Pre-renders article and poem pages with full meta tags
- Generates `sitemap.xml`
- Patches the Cloudflare wrangler config for correct asset routing

## Deployment

Hosted on Cloudflare Workers. The Worker runs before static assets so dynamic routes (`/articles/:slug`, `/poems/:slug`) are handled correctly while static files are served from the edge.
