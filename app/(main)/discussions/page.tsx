import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { DiscussionsList } from '@/components/discussion/DiscussionsList'

export default async function DiscussionsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  // Get papers with most comments
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
    take: 20,
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Discussions</h1>
        <p className="text-gray-600">Join the conversation on research papers</p>
      </div>
      <DiscussionsList papers={papersWithComments} userId={session.user.id} />
    </div>
  )
}
