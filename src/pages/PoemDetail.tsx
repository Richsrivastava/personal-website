import { useParams, Link } from 'react-router-dom'
import poems from '../data/poems.json'

export default function PoemDetail() {
  const { slug } = useParams()
  const poem = poems.find(p => p.slug === slug)

  if (!poem) {
    return (
      <div className="content-wrapper">
        <div className="text-center py-16">
          <h1 className="mb-4">Poem Not Found</h1>
          <Link to="/poems" className="btn">← Back to Poetry</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="content-wrapper">
      <Link to="/poems" className="back-link">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Poetry
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="content-header text-center">
          <h1>{poem.title}</h1>
        </div>

        <div className="poetry-content">
          {poem.content}
        </div>

        <div className="mt-12 text-center">
          <Link to="/poems" className="btn">
            Read More Poems
          </Link>
        </div>
      </div>
    </div>
  )
}