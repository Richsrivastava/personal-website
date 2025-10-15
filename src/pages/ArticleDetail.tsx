import { useParams, Link } from 'react-router-dom'
import articles from '../data/articles.json'

export default function ArticleDetail() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Article Not Found</h1>
          <Link to="/articles" className="text-blue-600 hover:underline">
            ← Back to Writing
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/articles" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Writing
        </Link>

        {/* Article Header */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              {article.topic}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-lg text-slate-600 italic border-l-4 border-blue-600 pl-4">
            {article.summary}
          </p>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div 
            className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-slate-800"
            style={{ whiteSpace: 'pre-line' }}
          >
            {article.content}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 text-center">
          <Link 
            to="/articles" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            Read More Articles
          </Link>
        </div>
      </div>
    </div>
  )
}