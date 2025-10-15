import { useMemo, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import poemsJson from '../data/poems.json'

const poemsData = poemsJson as Poem[]

type Poem = { slug: string; title: string; topic: string; content: string }
type GroupedPoems = Record<string, Poem[]>

export default function PoetryCategoriesView() {
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
  }

  const handleBackToCategory = () => {
    if (currentPoem) {
      setSelectedTopic(currentPoem.topic)
      setCurrentPoem(null)
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
        
        .handwritten {
          font-family: 'Dancing Script', 'Brush Script MT', 'Lucida Handwriting', cursive;
        }
      `}</style>

      {/* Header with Categories */}
      <div className="bg-white shadow-lg border-b-2 border-sky-200">
        <div className="mx-auto w-full max-w-7xl p-6">
          <h1 className="text-5xl font-bold text-center mb-8 handwritten text-sky-800">
            Poetry Collection
          </h1>
          
          <div className="flex gap-6 justify-center items-center flex-wrap">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`px-6 py-3 text-2xl handwritten transition-all duration-300 ${
                  selectedTopic === topic
                    ? 'text-sky-800 border-b-4 border-sky-600 scale-110'
                    : 'text-gray-600 hover:text-sky-700 hover:scale-105'
                }`}
              >
                {topic.charAt(0).toUpperCase() + topic.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="mx-auto w-full max-w-7xl px-6 py-8">
        {currentPoem ? (
          // Single Poem View
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-sky-200">
              {/* Poem Header */}
              <div className="bg-gradient-to-r from-sky-100 via-blue-100 to-sky-100 px-8 py-6 border-b border-sky-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">{currentPoem.title}</h2>
                    <p className="text-sky-700 italic text-lg capitalize handwritten">
                      From the {currentPoem.topic} collection
                    </p>
                  </div>
                  <button
                    onClick={handleBackToCategory}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-200 hover:bg-sky-300 rounded-lg transition-colors text-sky-800 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to List
                  </button>
                </div>
              </div>

              {/* Poem Content */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed text-xl font-serif"
                    style={{ 
                      lineHeight: '2',
                      whiteSpace: 'pre-line',
                      textAlign: 'center'
                    }}
                  >
                    {currentPoem.content}
                  </div>
                </div>

                {/* Related Poems */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    More from {currentPoem.topic}
                  </h3>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {grouped[currentPoem.topic]
                      .filter(p => p.slug !== currentPoem.slug)
                      .map(poem => (
                        <button
                          key={poem.slug}
                          onClick={() => handlePoemClick(poem)}
                          className="flex-shrink-0 px-4 py-2 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors text-sky-800 text-sm font-medium whitespace-nowrap"
                        >
                          {poem.title}
                        </button>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : selectedTopic ? (
          // Category List View - Scrollable
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-5xl font-bold text-gray-800 mb-2 capitalize handwritten">
                {selectedTopic}
              </h2>
              <p className="text-gray-600 text-lg">
                {grouped[selectedTopic].length} poems in this collection
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {grouped[selectedTopic].map((poem: Poem) => (
                <div
                  key={poem.slug}
                  onClick={() => handlePoemClick(poem)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden border border-sky-200"
                >
                  <div className="p-6 border-l-4 border-sky-400">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{poem.title}</h3>
                    <div className="text-gray-600 text-base leading-relaxed mb-4 font-serif">
                      {poem.content.split('\n').slice(0, 3).join('\n')}
                      {poem.content.split('\n').length > 3 && '...'}
                    </div>
                    <button className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-semibold text-sm transition-colors group">
                      Read Full Poem 
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Welcome State
          <div className="text-center py-16">
            <div className="text-gray-600 text-2xl handwritten">
              Select a category above to explore poems
            </div>
          </div>
        )}
      </div>
    </div>
  )
}