# Copilot Instructions

## Project Overview
Personal website for Richa Srivastava featuring a **React + Vite + TypeScript frontend** deployed as a **Cloudflare Workers application**. The site showcases articles, poems, GitHub projects, and a contact form. It follows a **serverless architecture** with edge deployment.

## Architecture

### Frontend Stack
- **React 19** with TypeScript for UI components
- **React Router v6** for SPA routing (pages in `src/pages/`, routes defined in `src/App.tsx`)
- **Vite 6** for bundling and development server (HMR enabled)
- **Tailwind CSS** for styling with custom portfolio CSS (`src/portfolio_styles.css`)

### Backend & Deployment
- **Hono** framework for API routes (ultra-lightweight, Cloudflare-native)
- **Cloudflare Workers** edge deployment via `wrangler`
- API endpoints routed through `functions/api/` (currently `contact.ts` stub with TODO for email/DB integration)
- **Cloudflare Pages** for static site hosting (`pages_build_output_dir = "dist"`)

### Data Model
- Static JSON files in `src/data/` (`articles.json`, `poems.json`) with schema: `{ slug, title, topic, summary, content }`
- Filtering implemented client-side (Articles.tsx uses topic filtering)
- No database currently; TODO items exist in contact endpoint for persistence

## Key Developer Workflows

### Development
```bash
npm run dev          # Starts Vite dev server at http://localhost:5173
npm run cf-typegen   # Generate Cloudflare Worker type definitions
```

### Validation & Build
```bash
npm run build        # TypeScript + Vite build (outputs to dist/)
npm run check        # Full validation: tsc + vite build + wrangler dry-run
npm run preview      # Preview built output locally
```

### Deployment
```bash
npm run deploy       # Deploy to Cloudflare Workers (runs wrangler)
npx wrangler tail    # Monitor live Worker logs
```

## Project Structure & Responsibilities

| Path | Purpose |
|------|---------|
| `src/components/` | Reusable UI components (Layout, Header, Footer) |
| `src/pages/` | Route-level components (Home, Articles, Poems, Contact, Github, etc.) |
| `src/data/` | Static JSON content (articles, poems) |
| `functions/api/` | Hono API endpoints (serverless functions on Workers) |
| `public/` | Static assets (manifest, about.txt) |
| `tailwind.config.js` | Tailwind customizations |
| `vite.config.ts` | Vite + Cloudflare plugin config (minimal) |
| `wrangler.toml` | Cloudflare Workers build & deployment config |

## Code Patterns & Conventions

### Component Structure
- Functional components with hooks (useState, etc.)
- Layout wraps all pages with fixed `<Header />` and `<Footer />` and calculates `minHeight` to keep footer at bottom
- CSS classes use Tailwind + portfolio-specific custom CSS

### Data & Routing
- Static content loaded from JSON (not API calls currently)
- URL slugs used as unique identifiers (`articles/:slug`, `poems/:slug`)
- Articles/Poems filtered client-side by topic/category before render

### Styling
- Primary: Tailwind CSS with responsive utilities
- Fallback: `portfolio_styles.css` and `index.css` for custom styling (e.g., `.content-wrapper`, `.card`, `.filter-btn`)
- ESLint configured for code quality

### API Endpoint Patterns
- Hono routes use `basePath('/api')` → all endpoints prefixed `/api/*`
- POST `/api/contact` validates `email` and `message` fields (stub implementation)
- Error handling returns `{ error: string }` with appropriate HTTP status

## Critical Integration Points

1. **Vite + Cloudflare Plugin**: `cloudflare()` plugin in vite.config.ts enables Worker build integration
2. **React Router**: BrowserRouter wrapping all Routes; ensure slug-based links use React Router's `<Link>` component
3. **Wrangler Deployment**: Reads `wrangler.toml` for build settings; `pages_build_output_dir = "dist"` must match Vite output
4. **Type Safety**: `worker-configuration.d.ts` provides Cloudflare env types; regenerate via `cf-typegen` if env vars change

## Common Tasks & Gotchas

- **Adding new routes**: Update `src/App.tsx` with `<Route>` + create page component in `src/pages/`
- **Static content**: Edit `src/data/articles.json` or `src/data/poems.json` directly; no rebuild needed if served client-side
- **API changes**: Modify `functions/api/` files; `wrangler` automatically detects and builds
- **Styling issues**: Check both `portfolio_styles.css` AND `tailwind.config.js`; utility-first order matters
- **Build failures**: Run `npm run check` before deploy to catch TypeScript/Vite/wrangler errors early
