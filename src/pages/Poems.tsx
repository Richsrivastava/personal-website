import { useMemo, useState } from 'react'
import poemsJson from '../data/poems.json'

const poemsData = poemsJson as Poem[]

type Poem = { slug: string; title: string; topic: string; content: string }
type GroupedPoems = Record<string, Poem[]>

export default function Poems() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [currentPoem, setCurrentPoem] = useState<Poem | null>(null)

  const grouped: GroupedPoems = useMemo(() => {
    return poemsData.reduce((acc: GroupedPoems, poem: Poem) => {
      (acc[poem.topic] ||= []).push(poem)
      return acc
    }, {} as GroupedPoems)
  }, [])

  const topics = useMemo(() => Object.keys(grouped), [grouped])

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic)
    setCurrentPoem(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePoemClick = (poem: Poem) => {
    setCurrentPoem(poem)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToCategory = () => {
    if (currentPoem) {
      setSelectedTopic(currentPoem.topic)
      setCurrentPoem(null)
    }
  }

  return (
    <div className="content-wrapper">
      <div className="filter-group">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicClick(topic)}
            className={`filter-btn ${selectedTopic === topic ? 'active' : ''}`}
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {currentPoem ? (
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleBackToCategory}
            className="back-link"
          >
            ← Back to {currentPoem.topic}
          </button>

          <div className="content-header text-center">
            <h1>{currentPoem.title}</h1>
          </div>

          <div className="poetry-content">
            {currentPoem.content}
          </div>

          <div className="border-t border-border section">
            <h3>More from {currentPoem.topic}</h3>
            <div className="flex gap-3 flex-wrap">
              {grouped[currentPoem.topic]
                .filter(p => p.slug !== currentPoem.slug)
                .map(poem => (
                  <button
                    key={poem.slug}
                    onClick={() => handlePoemClick(poem)}
                    className="btn-secondary"
                  >
                    {poem.title}
                  </button>
                ))
              }
            </div>
          </div>
        </div>
      ) : selectedTopic ? (
        <div>
          <h2 className="text-center capitalize">{selectedTopic}</h2>
          <p className="text-center text-secondary">
            {grouped[selectedTopic].length} poems in this collection
          </p>

          <div className="space-y-4">
            {grouped[selectedTopic].map((poem: Poem) => (
              <div
                key={poem.slug}
                onClick={() => handlePoemClick(poem)}
                className="card cursor-pointer"
              >
                <h3>{poem.title}</h3>
                <div className="poetry-content text-left text-base">
                  {poem.content.split('\n').slice(0, 3).join('\n')}
                  {poem.content.split('\n').length > 3 && '...'}
                </div>
                <span className="text-accent" style={{ fontWeight: 500 }}>Read Full Poem →</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-secondary text-lg">
            Select a category above to explore poems
          </p>
        </div>
      )}
    </div>
  )
}