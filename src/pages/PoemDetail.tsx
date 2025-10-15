import { useParams } from 'react-router-dom'
import poems from '../data/poems.json'

export default function PoemDetail() {
  const { slug } = useParams()
  const poem = poems.find(p => p.slug === slug)

  if (!poem) return <p>Poem not found</p>

  return (
    <div>
      <h1>{poem.title}</h1>
      <p><em>{poem.topic}</em></p>
      <div style={{ whiteSpace: 'pre-line' }}>{poem.content}</div>
    </div>
  )
}
