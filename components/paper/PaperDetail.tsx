'use client'

import { Heart, Bookmark, ExternalLink, Users, Calendar, Tag, ThumbsUp } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'

interface Paper {
  id: string
  title: string
  abstract: string
  authors: string[]
  doi: string | null
  arxivId: string | null
  url: string | null
  pdfUrl: string | null
  publishedDate: Date | null
  venue: string | null
  keywords: string[]
  categories: string[]
  citations: number
  views: number
  likes: Array<{
    id: string
    user: {
      id: string
      name: string | null
      username: string
    }
  }>
}

interface PaperDetailProps {
  paper: Paper
  userLiked: boolean
  userId: string
}

export function PaperDetail({ paper, userLiked, userId }: PaperDetailProps) {
  const [liked, setLiked] = useState(userLiked)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(paper.likes.length)

  const handleLike = async () => {
    try {
      const response = await fetch('/api/papers/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperId: paper.id,
          liked: !liked,
        }),
      })

      if (response.ok) {
        setLiked(!liked)
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1))

        // Create activity
        await fetch('/api/activities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: !liked ? 'like' : 'unlike',
            paperId: paper.id,
          }),
        })
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/papers/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperId: paper.id,
          saved: !saved,
        }),
      })

      if (response.ok) {
        setSaved(!saved)
      }
    } catch (error) {
      console.error('Error toggling save:', error)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex-1">{paper.title}</h1>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={handleLike}
            className={`p-3 rounded-lg transition-colors ${
              liked
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleSave}
            className={`p-3 rounded-lg transition-colors ${
              saved
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-start space-x-2">
          <Users className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Authors:</span>{' '}
              {paper.authors.join(', ')}
            </p>
          </div>
        </div>

        {paper.publishedDate && (
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <p className="text-sm text-gray-600">
              Published: {format(new Date(paper.publishedDate), 'MMMM d, yyyy')}
            </p>
          </div>
        )}

        {paper.venue && (
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-gray-400" />
            <p className="text-sm text-gray-600">{paper.venue}</p>
          </div>
        )}

        {paper.keywords.length > 0 && (
          <div className="flex items-start space-x-2">
            <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex flex-wrap gap-2">
              {paper.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Abstract</h2>
        <p className="text-gray-700 leading-relaxed">{paper.abstract}</p>
      </div>

      <div className="flex items-center justify-between pt-6 border-t">
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <span className="flex items-center">
            <ThumbsUp className="w-4 h-4 mr-1" />
            {likeCount} likes
          </span>
          <span>{paper.citations} citations</span>
          <span>{paper.views} views</span>
        </div>

        <div className="flex space-x-2">
          {paper.pdfUrl && (
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View PDF</span>
            </a>
          )}
          {paper.url && (
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Paper</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
