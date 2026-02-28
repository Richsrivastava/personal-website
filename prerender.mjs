// prerender.mjs
// Run after vite build to inject article content into static HTML files
// Usage: node prerender.mjs
// This makes article pages crawlable by Google, LinkedIn, and other bots

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const distDir = "dist/client";
const indexHtml = readFileSync(join(distDir, "index.html"), "utf-8");

// ── PATCH: Fix Cloudflare Vite plugin's generated wrangler config ──────────
// The plugin hardcodes "single-page-application" which overrides pre-rendered
// files. We patch it to "none" so static HTML files are served correctly.
const generatedWranglerPath = "dist/personal_website/wrangler.json";
const wranglerConfig = JSON.parse(readFileSync(generatedWranglerPath, "utf-8"));
if (wranglerConfig.assets?.not_found_handling === "single-page-application") {
  wranglerConfig.assets.not_found_handling = "none";
  writeFileSync(generatedWranglerPath, JSON.stringify(wranglerConfig), "utf-8");
  console.log("✓ Patched wrangler config: not_found_handling → none");
}
// ──────────────────────────────────────────────────────────────────────────

// Load data
const articles = JSON.parse(readFileSync("src/data/articles.json", "utf-8"));
const poems = JSON.parse(readFileSync("src/data/poems.json", "utf-8"));

function injectMeta(html, { title, description, url }) {
  // Use exact strings from index.html for reliable replacement
  return html
    .replace(
      "<title>Richa Srivastava | Portfolio</title>",
      `<title>${title}</title>`
    )
    .replace(
      `content="Richa Srivastava - Engineering &amp; AI Leader, Dancer, Poetess, Sketch Artist, Reiki Healer"`,
      `content="${description}"`
    )
    .replace(
      "</head>",
      `  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Richa Srivastava" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
</head>`
    );
}

function writeRoute(routePath, html) {
  const fullDir = join(distDir, ...routePath.split("/").filter(Boolean));
  if (!existsSync(fullDir)) {
    mkdirSync(fullDir, { recursive: true });
  }
  writeFileSync(join(fullDir, "index.html"), html, "utf-8");
  console.log(`✓ Pre-rendered: ${routePath}`);
}

// Pre-render article pages
for (const article of articles) {
  const html = injectMeta(indexHtml, {
    title: `${article.title} | Richa Srivastava`,
    description: article.summary,
    url: `https://richasrivastava.com/articles/${article.slug}`,
  });
  writeRoute(`/articles/${article.slug}`, html);
}

// Pre-render poem pages
for (const poem of poems) {
  const html = injectMeta(indexHtml, {
    title: `${poem.title} | Richa Srivastava`,
    description: poem.summary || poem.title,
    url: `https://richasrivastava.com/poems/${poem.slug}`,
  });
  writeRoute(`/poems/${poem.slug}`, html);
}

// Pre-render top-level pages with default meta
const staticRoutes = ["/articles", "/poems", "/github", "/contact"];
for (const route of staticRoutes) {
  writeRoute(route, indexHtml);
}

console.log("\n✅ Pre-rendering complete. Static HTML files written to dist/");
console.log("   Google, LinkedIn, and other crawlers can now index your content.");
