'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, BookOpen, ExternalLink } from 'lucide-react'
import { PaperCard } from './PaperCard'

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
  likes: Array<{ id: string }>
}

interface PaperSwipeProps {
  initialPapers: Paper[]
  userId: string
}

export function PaperSwipe({ initialPapers, userId }: PaperSwipeProps) {
  const [papers, setPapers] = useState(initialPapers)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [loading, setLoading] = useState(false)
  const [fetchingMore, setFetchingMore] = useState(false)

  const currentPaper = papers[currentIndex]

  const fetchMorePapers = async () => {
    if (fetchingMore) return

    setFetchingMore(true)
    try {
      const response = await fetch('/api/papers/fetch-more', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })

      const data = await response.json()
      if (data.papers && data.papers.length > 0) {
        setPapers((prev) => [...prev, ...data.papers])
      }
    } catch (error) {
      console.error('Error fetching more papers:', error)
    } finally {
      setFetchingMore(false)
    }
  }

  const handleSwipe = async (liked: boolean) => {
    if (!currentPaper) return

    setDirection(liked ? 1 : -1)

    // Send like/dislike to API
    try {
      await fetch('/api/papers/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperId: currentPaper.id,
          liked,
        }),
      })

      // Create activity
      await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: liked ? 'like' : 'skip',
          paperId: currentPaper.id,
        }),
      })
    } catch (error) {
      console.error('Error saving like:', error)
    }

    // Move to next paper
    setTimeout(() => {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setDirection(0)

      // If we're near the end, fetch more papers
      if (nextIndex >= papers.length - 3 && !fetchingMore) {
        fetchMorePapers()
      }
    }, 300)
  }

  if (!currentPaper) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No more papers to swipe!</p>
        <p className="text-gray-400 mt-2 mb-4">
          {fetchingMore ? 'Fetching more papers from ArXiv...' : 'Fetch more papers from ArXiv'}
        </p>
        <button
          onClick={fetchMorePapers}
          disabled={fetchingMore}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {fetchingMore ? 'Fetching...' : 'Fetch from ArXiv'}
        </button>
      </div>
    )
  }

  return (
    <div className="relative h-[600px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPaper.id}
          initial={{ 
            opacity: 0, 
            x: direction * 300,
            scale: 0.9,
            rotateY: direction * 15
          }}
          animate={{ 
            opacity: 1, 
            x: 0,
            scale: 1,
            rotateY: 0
          }}
          exit={{ 
            opacity: 0, 
            x: direction * -300,
            scale: 0.9,
            rotateY: direction * -15
          }}
          transition={{ 
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
            opacity: { duration: 0.3 }
          }}
          className="absolute inset-0"
        >
          <PaperCard paper={currentPaper} />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
        <motion.button
          onClick={() => handleSwipe(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white rounded-full p-4 shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Dislike"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <X className="w-8 h-8 text-red-500" />
          </motion.div>
        </motion.button>
        <motion.button
          onClick={() => handleSwipe(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white rounded-full p-4 shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Like"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <Heart className="w-8 h-8 text-green-500" />
          </motion.div>
        </motion.button>
      </div>

      <motion.div 
        className="absolute top-4 right-4 text-sm text-gray-500 bg-white/80 px-3 py-1 rounded-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {currentIndex + 1} / {papers.length}
      </motion.div>
    </div>
  )
}
