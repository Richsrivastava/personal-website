import { useParams, Link } from 'react-router-dom'
import articles from '../data/articles.json'

export default function ArticleDetail() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return (
      <div className="content-wrapper">
        <div className="text-center py-16">
          <h1 className="mb-4">Article Not Found</h1>
          <Link to="/articles" className="btn">← Back to Writing</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="content-wrapper">
      <Link to="/articles" className="back-link">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Writing
      </Link>

      <div className="content-header">
        <span className="tag mb-4">{article.topic}</span>
        <h1 className="mb-4">{article.title}</h1>
        <p className="text-lg italic border-l-4 border-accent pl-4">
          {article.summary}
        </p>
      </div>

      <div className="content-body" style={{ whiteSpace: 'pre-line' }}>
        {article.content}
      </div>

      <div className="mt-12 text-center">
        <Link to="/articles" className="btn">
          Read More Articles
        </Link>
      </div>
    </div>
  )
}