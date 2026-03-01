// prerender.mjs
// Run after vite build to inject article content into static HTML files
// Usage: node prerender.mjs
// This makes article pages crawlable by Google, LinkedIn, and other bots

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const distDir = "dist/client";
const indexHtml = readFileSync(join(distDir, "index.html"), "utf-8");

// ── PATCH: Fix Cloudflare Vite plugin's generated wrangler config ──────────
const generatedWranglerPath = "dist/personal_website/wrangler.json";
const wranglerConfig = JSON.parse(readFileSync(generatedWranglerPath, "utf-8"));
if (wranglerConfig.assets?.not_found_handling === "single-page-application") {
  wranglerConfig.assets.not_found_handling = "none";
  console.log("✓ Patched wrangler config: not_found_handling → none");
}
// Tell Cloudflare to run Worker code BEFORE checking static assets
// This allows Worker routes (/articles/:slug, /poems/:slug) to intercept requests
wranglerConfig.assets.run_worker_first = true;
writeFileSync(generatedWranglerPath, JSON.stringify(wranglerConfig), "utf-8");
console.log("✓ Patched wrangler config: run_worker_first → true");
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

// ── EXTRACT ASSET HASHES: patch worker with correct filenames ──────────────
const manifestPath = "dist/client/.vite/manifest.json";
if (existsSync(manifestPath)) {
  const clientManifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  const manifestValues = Object.values(clientManifest);
  const jsEntry = manifestValues.find((f) => f.isEntry);
  const jsFile = jsEntry?.file ?? "assets/index.js";
  const cssFile = jsEntry?.css?.[0] ?? "assets/index.css";

  const workerPath = "src/worker/index.ts";
  let workerSrc = readFileSync(workerPath, "utf-8");
  workerSrc = workerSrc
    .replace(/const jsFile = "assets\/index-[^"]+\.js"/, `const jsFile = "${jsFile}"`)
    .replace(/const cssFile = "assets\/index-[^"]+\.css"/, `const cssFile = "${cssFile}"`);
  writeFileSync(workerPath, workerSrc, "utf-8");
  console.log(`✓ Asset hashes updated in worker: ${jsFile}, ${cssFile}`);
} else {
  console.log("⚠ manifest.json not found — skipping asset hash update (enable build.manifest in vite.config.ts)");
}
// ────────────────────────────────────────────────────────────────────────────
writeFileSync(
  join(distDir, "_build.txt"),
  `Build timestamp: ${new Date().toISOString()}\n`,
  "utf-8"
);
console.log("✓ Cache-bust file written");

console.log("\n✅ Pre-rendering complete. Static HTML files written to dist/");
console.log("   Google, LinkedIn, and other crawlers can now index your content.");
