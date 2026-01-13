'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ThumbsUp, ThumbsDown, Reply, Send } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Comment {
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
    votes: Array<{
      voteType: string
      userId: string
    }>
  }>
  votes: Array<{
    voteType: string
    userId: string
  }>
}

interface CommentsSectionProps {
  paperId: string
  comments: Comment[]
  userId: string
}

export function CommentsSection({ paperId, comments: initialComments, userId }: CommentsSectionProps) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperId,
          content: newComment,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setComments([data.comment, ...comments])
        setNewComment('')

        // Create activity
        await fetch('/api/activities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'comment',
            paperId,
            commentId: data.comment.id,
          }),
        })
      }
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  const handleVote = async (commentId: string, voteType: 'upvote' | 'downvote') => {
    try {
      const response = await fetch('/api/comments/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commentId,
          voteType,
        }),
      })

      if (response.ok) {
        setComments((prev) =>
          prev.map((comment) => {
            if (comment.id === commentId) {
              const existingVote = comment.votes.find((v) => v.userId === userId)
              let newUpvotes = comment.upvotes
              let newDownvotes = comment.downvotes

              if (existingVote) {
                if (existingVote.voteType === voteType) {
                  // Remove vote
                  if (voteType === 'upvote') newUpvotes--
                  else newDownvotes--
                  return {
                    ...comment,
                    upvotes: newUpvotes,
                    downvotes: newDownvotes,
                    votes: comment.votes.filter((v) => v.userId !== userId),
                  }
                } else {
                  // Change vote
                  if (voteType === 'upvote') {
                    newUpvotes++
                    newDownvotes--
                  } else {
                    newUpvotes--
                    newDownvotes++
                  }
                }
              } else {
                // New vote
                if (voteType === 'upvote') newUpvotes++
                else newDownvotes++
              }

              return {
                ...comment,
                upvotes: newUpvotes,
                downvotes: newDownvotes,
                votes: [
                  ...comment.votes.filter((v) => v.userId !== userId),
                  { voteType, userId },
                ],
              }
            }
            return comment
          })
        )
      }
    } catch (error) {
      console.error('Error voting:', error)
    }
  }

  const handleSubmitReply = async (commentId: string) => {
    if (!replyContent.trim()) return

    try {
      const response = await fetch('/api/comments/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commentId,
          content: replyContent,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setComments((prev) =>
          prev.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...comment.replies, data.reply],
              }
            }
            return comment
          })
        )
        setReplyContent('')
        setReplyingTo(null)
      }
    } catch (error) {
      console.error('Error posting reply:', error)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Discussion ({comments.length})
      </h2>

      <form onSubmit={handleSubmitComment} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment... (Markdown supported)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          rows={4}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Post Comment</span>
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => {
          const userVote = comment.votes.find((v) => v.userId === userId)
          return (
            <div key={comment.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                      {(comment.user.name || comment.user.username)[0].toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-gray-900">
                      {comment.user.name || comment.user.username}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="prose prose-sm max-w-none mb-3">
                    <ReactMarkdown>{comment.content}</ReactMarkdown>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleVote(comment.id, 'upvote')}
                      className={`flex items-center space-x-1 text-sm ${
                        userVote?.voteType === 'upvote'
                          ? 'text-indigo-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${userVote?.voteType === 'upvote' ? 'fill-current' : ''}`} />
                      <span>{comment.upvotes}</span>
                    </button>
                    <button
                      onClick={() => handleVote(comment.id, 'downvote')}
                      className={`flex items-center space-x-1 text-sm ${
                        userVote?.voteType === 'downvote'
                          ? 'text-red-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <ThumbsDown className={`w-4 h-4 ${userVote?.voteType === 'downvote' ? 'fill-current' : ''}`} />
                      <span>{comment.downvotes}</span>
                    </button>
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                      <Reply className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>

                  {replyingTo === comment.id && (
                    <div className="mt-4 pl-4 border-l-2 border-indigo-200">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-sm"
                        rows={3}
                      />
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => handleSubmitReply(comment.id)}
                          className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
                        >
                          Post Reply
                        </button>
                        <button
                          onClick={() => {
                            setReplyingTo(null)
                            setReplyContent('')
                          }}
                          className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-200">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 text-xs font-medium">
                                {(reply.user.name || reply.user.username)[0].toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium text-gray-900">
                                {reply.user.name || reply.user.username}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                            <div className="prose prose-sm max-w-none text-sm">
                              <ReactMarkdown>{reply.content}</ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  )
}
