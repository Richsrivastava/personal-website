import { useParams, Link } from "react-router-dom"
import articles from "../data/articles.json"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function ArticleDetail() {
  const { slug } = useParams()
  const article = articles.find((a) => a.slug === slug)

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

  return (
    <div className="content-wrapper  article-detail">
      <div className="max-w-3xl mx-auto">
        <div className="content-header">
          <Link to="/articles" className="btn mb-6 inline-block">
            ← Back to Writing
          </Link>

           <h1 className="article-title">{article.title}</h1>

          {article.summary && (
            <p
              className="mb-8"
              style={{
                fontSize: "1rem",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                marginBottom: "1.25rem",
              }}
            >
              {article.summary}
            </p>
          )}
        </div>

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
      </div>
    </div>
  )
}
