import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { DiscussionsList } from '@/components/discussion/DiscussionsList'
import Link from 'next/link'
import { MessageSquare, Plus } from 'lucide-react'

export default async function DiscussionsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  // Get all discussions (papers with comments)
  const papersWithComments = await prisma.paper.findMany({
    include: {
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                },
              },
              votes: true,
            },
          },
          votes: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    where: {
      comments: {
        some: {},
      },
    },
    orderBy: {
      comments: {
        _count: 'desc',
      },
    },
    take: 50,
  })

  // Get general discussions (not tied to specific papers) - we'll need to add this feature
  // For now, we'll show paper discussions

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discussions</h1>
          <p className="text-gray-600">Join conversations about research papers and topics</p>
        </div>
        <Link
          href="/discussions/new"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Discussion</span>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex gap-4 border-b">
          <Link
            href="/discussions"
            className="px-4 py-2 border-b-2 border-indigo-600 text-indigo-600 font-medium"
          >
            All Discussions
          </Link>
          <Link
            href="/discussions/general"
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            General Topics
          </Link>
        </div>
      </div>

      {papersWithComments.length > 0 ? (
        <DiscussionsList papers={papersWithComments} userId={session.user.id} />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No discussions yet</p>
          <p className="text-gray-400 mt-2">Be the first to start a discussion!</p>
        </div>
      )}
    </div>
  )
}
