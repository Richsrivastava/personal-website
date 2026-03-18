import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import articles from "../data/articles.json"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatPublishedDate(dateStr?: string): string {
  if (!dateStr) return ""
  const [year, month] = dateStr.split("-")
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 220))
  return `${minutes} min read`
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ArticleDetail() {
  const { slug } = useParams()
  const article = articles.find((a) => a.slug === slug)

  useEffect(() => {
    if (!article) return

    // Remove any existing schema tag
    const existing = document.getElementById("article-schema")
    if (existing) existing.remove()

    // Build the schema object
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.summary,
      "author": {
        "@type": "Person",
        "name": "Richa Srivastava",
        "url": "https://richasrivastava.com"
      },
      "publisher": {
        "@type": "Person",
        "name": "Richa Srivastava",
        "url": "https://richasrivastava.com"
      },
      "url": `https://richasrivastava.com/articles/${article.slug}`,
      "mainEntityOfPage": `https://richasrivastava.com/articles/${article.slug}`,
      "keywords": article.topic,
      "articleSection": article.topic,
      // datePublished added when publishedDate field exists
      ...(article.publishedDate && {
        "datePublished": `${article.publishedDate}-01`
      }),
    }

    // Inject schema into page head
    const script = document.createElement("script")
    script.id = "article-schema"
    script.type = "application/ld+json"
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)

    // Update page title and meta description
    document.title = `${article.title} | Richa Srivastava`
    const metaDesc = document.querySelector("meta[name='description']")
    if (metaDesc) {
      metaDesc.setAttribute("content", article.summary)
    } else {
      const meta = document.createElement("meta")
      meta.name = "description"
      meta.content = article.summary
      document.head.appendChild(meta)
    }

    // OG image — remove stale tag then inject if heroImage exists
    document.querySelectorAll("meta[property='og:image']").forEach((el) => el.remove())
    document.querySelectorAll("meta[name='twitter:image']").forEach((el) => el.remove())
    document.querySelectorAll("meta[name='twitter:card']").forEach((el) => el.remove())

    if (article.heroImage) {
      const ogImg = document.createElement("meta")
      ogImg.setAttribute("property", "og:image")
      ogImg.setAttribute("content", `https://richasrivastava.com${article.heroImage}`)
      document.head.appendChild(ogImg)

      const twImg = document.createElement("meta")
      twImg.setAttribute("name", "twitter:image")
      twImg.setAttribute("content", `https://richasrivastava.com${article.heroImage}`)
      document.head.appendChild(twImg)

      const twCard = document.createElement("meta")
      twCard.setAttribute("name", "twitter:card")
      twCard.setAttribute("content", "summary_large_image")
      document.head.appendChild(twCard)
    }

    // Cleanup when leaving the page
    return () => {
      const tag = document.getElementById("article-schema")
      if (tag) tag.remove()
      document.title = "Richa Srivastava"
      document.querySelectorAll("meta[property='og:image']").forEach((el) => el.remove())
      document.querySelectorAll("meta[name='twitter:image']").forEach((el) => el.remove())
      document.querySelectorAll("meta[name='twitter:card']").forEach((el) => el.remove())
    }
  }, [article])

  // ── Not found ──────────────────────────────────────────────────────────────

  if (!article) {
    return (
      <div className="content-wrapper">
        <div className="text-center py-16">
          <h1 className="mb-4">Article Not Found</h1>
          <Link to="/articles" className="btn">
            ← Back to Writing
          </Link>
        </div>
      </div>
    )
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="content-wrapper article-detail">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="content-header">
          <Link to="/articles" className="btn mb-6 inline-block">
            ← Back to Writing
          </Link>

          {/* Topic label */}
          <span
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "0.6rem",
            }}
          >
            {article.topic}
          </span>

          {/* Title */}
          <h1 className="article-title">{article.title}</h1>

          {/* Date + read time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              marginBottom: "1.25rem",
              opacity: 0.75,
            }}
          >
            {article.publishedDate && (
              <>
                <span>{formatPublishedDate(article.publishedDate)}</span>
                <span style={{ opacity: 0.5 }}>·</span>
              </>
            )}
            <span>{estimateReadTime(article.content)}</span>
          </div>

          {/* Summary — styled as a pull quote */}
          {article.summary && (
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                marginBottom: "1.75rem",
                fontStyle: "italic",
                borderLeft: "3px solid var(--accent)",
                paddingLeft: "1rem",
              }}
            >
              {article.summary}
            </p>
          )}
        </div>

        {/* ── Hero image (optional) ───────────────────────────────────────── */}
        {article.heroImage && (
          <div
            style={{
              margin: "0 0 2rem 0",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <img
              src={article.heroImage}
              alt={article.heroImageAlt ?? article.title}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                maxHeight: "420px",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* ── Article body ────────────────────────────────────────────────── */}
        <div
          className="content-body"
          style={{
            fontSize: "1rem",
            lineHeight: 1.65,
            color: "var(--text-secondary)",
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 style={{ fontSize: "2rem", lineHeight: 1.2, margin: "0 0 1rem 0" }}>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 style={{ fontSize: "1.25rem", lineHeight: 1.3, margin: "2rem 0 0.75rem 0" }}>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 style={{ fontSize: "1.1rem", lineHeight: 1.35, margin: "1.5rem 0 0.6rem 0" }}>
                  {children}
                </h3>
              ),
              p: ({ children }) => <p style={{ margin: "0 0 1rem 0" }}>{children}</p>,
              ul: ({ children }) => <ul style={{ margin: "0 0 1rem 1.25rem" }}>{children}</ul>,
              ol: ({ children }) => <ol style={{ margin: "0 0 1rem 1.25rem" }}>{children}</ol>,
              li: ({ children }) => <li style={{ margin: "0.25rem 0" }}>{children}</li>,
              hr: () => <hr style={{ margin: "1.5rem 0", opacity: 0.35 }} />,
              blockquote: ({ children }) => (
                <blockquote
                  style={{
                    borderLeft: "3px solid var(--accent)",
                    paddingLeft: "1rem",
                    margin: "1rem 0",
                    opacity: 0.95,
                  }}
                >
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code
                  style={{
                    fontSize: "0.95em",
                    padding: "0.1em 0.35em",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.06)",
                  }}
                >
                  {children}
                </code>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* ── LinkedIn CTA — only renders when linkedInPostUrl is set ─────── */}
        {article.linkedInPostUrl && (
          <div
            style={{
              marginTop: "3rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border, rgba(255,255,255,0.1))",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                marginBottom: "0.75rem",
                opacity: 0.8,
              }}
            >
              Have thoughts on this? I'd love to hear them.
            </p>
            <button
              onClick={() =>
                window.open(article.linkedInPostUrl!, "_blank", "noopener,noreferrer")
              }
              className="btn"
              style={{ cursor: "pointer" }}
            >
              Continue the conversation on LinkedIn →
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
