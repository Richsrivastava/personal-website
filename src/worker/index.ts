import { Hono } from "hono";
import articles from "../../src/data/articles.json";
import poems from "../../src/data/poems.json";

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

// Serve pre-rendered HTML with injected meta tags for article routes
app.get("/articles/:slug", (c) => {
  const slug = c.req.param("slug");
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return c.env.ASSETS.fetch(c.req.raw);
  }

  const title = `${article.title} | Richa Srivastava`;
  const description = article.summary;
  const url = `https://richasrivastava.com/articles/${article.slug}`;

  return c.html(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#0071e3" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="Richa Srivastava" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Richa Srivastava" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.summary,
      "author": { "@type": "Person", "name": "Richa Srivastava", "url": "https://richasrivastava.com" },
      "url": url,
      "mainEntityOfPage": url,
      "keywords": article.topic,
      "articleSection": article.topic
    })}</script>
    <script type="module" crossorigin src="/assets/index-DQ6thtcK.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-Baj4uMbM.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`);
});

// Serve pre-rendered HTML with injected meta tags for poem routes
app.get("/poems/:slug", (c) => {
  const slug = c.req.param("slug");
  const poem = poems.find((p) => p.slug === slug);

  if (!poem) {
    return c.env.ASSETS.fetch(c.req.raw);
  }

  const title = `${poem.title} | Richa Srivastava`;
  const description = poem.title;
  const url = `https://richasrivastava.com/poems/${poem.slug}`;

  return c.html(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#0071e3" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="Richa Srivastava" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Richa Srivastava" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <script type="module" crossorigin src="/assets/index-DQ6thtcK.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-Baj4uMbM.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`);
});

// All other routes — pass through to static assets
app.get("*", (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;