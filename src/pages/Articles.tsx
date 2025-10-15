import { useState } from 'react'
import articles from '../data/articles.json'
import { Link } from 'react-router-dom'

export default function Articles() {
  const [selectedTopic, setSelectedTopic] = useState<string>('All')
  
  // Get unique topics
  const topics = ['All', ...Array.from(new Set(articles.map(a => a.topic)))]
  
  // Filter articles by topic
  const filteredArticles = selectedTopic === 'All' 
    ? articles 
    : articles.filter(a => a.topic === selectedTopic)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Topic Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedTopic === topic
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-700 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {filteredArticles.map(article => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className="block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-102 border border-slate-100"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-2xl font-bold text-slate-800 hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full whitespace-nowrap ml-4">
                  {article.topic}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {article.summary}
              </p>
              <div className="mt-4 text-blue-600 font-medium flex items-center">
                Read more 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <p className="text-center text-slate-500 py-12">
            No articles found in this category.
          </p>
        )}
      </div>
    </div>
  )
}