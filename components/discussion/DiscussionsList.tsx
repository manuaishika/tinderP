'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageSquare, ChevronRight, ThumbsUp, ThumbsDown } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import ReactMarkdown from 'react-markdown'

interface Paper {
  id: string
  title: string
  comments: Array<{
    id: string
    content: string
    upvotes: number
    downvotes: number
    createdAt: Date
    user: {
      id: string
      name: string | null
      username: string
      avatar: string | null
    }
    replies: Array<{
      id: string
      content: string
      upvotes: number
      downvotes: number
      createdAt: Date
      user: {
        id: string
        name: string | null
        username: string
      }
    }>
  }>
  _count: {
    comments: number
  }
}

interface DiscussionsListProps {
  papers: Paper[]
  userId: string
}

export function DiscussionsList({ papers, userId }: DiscussionsListProps) {
  if (papers.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No discussions yet</p>
        <p className="text-gray-400 mt-2">Be the first to start a discussion on a paper!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {papers.map((paper) => (
        <Link
          key={paper.id}
          href={`/paper/${paper.id}`}
          className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {paper.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {paper._count.comments} {paper._count.comments === 1 ? 'comment' : 'comments'}
                </span>
              </div>

              {paper.comments.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <div className="space-y-4">
                    {paper.comments.slice(0, 2).map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-600 text-sm font-medium">
                              {(comment.user.name || comment.user.username)[0].toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {comment.user.name || comment.user.username}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          <div className="text-sm text-gray-700 prose prose-sm max-w-none">
                            <ReactMarkdown>{comment.content.substring(0, 200)}</ReactMarkdown>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {comment.upvotes}
                            </span>
                            <span className="flex items-center">
                              <ThumbsDown className="w-3 h-3 mr-1" />
                              {comment.downvotes}
                            </span>
                            {comment.replies.length > 0 && (
                              <span>{comment.replies.length} replies</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
          </div>
        </Link>
      ))}
    </div>
  )
}
