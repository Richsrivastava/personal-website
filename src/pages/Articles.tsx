import { useState } from 'react'
import articles from '../data/articles.json'
import { Link } from 'react-router-dom'

export default function Articles() {
  const [selectedTopic, setSelectedTopic] = useState<string>('All')
  
  const topics = ['All', ...Array.from(new Set(articles.map(a => a.topic)))]
  
  const filteredArticles = selectedTopic === 'All' 
    ? articles 
    : articles.filter(a => a.topic === selectedTopic)

  return (
    <div className="content-wrapper">
      <div className="filter-group">
        {topics.map(topic => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`filter-btn ${selectedTopic === topic ? 'active' : ''}`}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredArticles.map(article => (
          <Link
            key={article.slug}
            to={`/articles/${article.slug}`}
            className="card block no-underline"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <span className="tag">{article.topic}</span>
            </div>
            <p className="mb-3">{article.summary}</p>
            <span className="text-accent font-medium">Read more →</span>
          </Link>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <p className="text-center py-12 text-secondary">
          No articles found in this category.
        </p>
      )}
    </div>
  )
}