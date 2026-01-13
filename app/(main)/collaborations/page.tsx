import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { CollaborationsList } from '@/components/collaboration/CollaborationsList'

export default async function CollaborationsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const collaborations = await prisma.collaboration.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
      requests: {
        include: {
          collaboration: true,
        },
      },
      _count: {
        select: {
          requests: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Collaborations</h1>
        <a
          href="/collaborations/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Post Collaboration
        </a>
      </div>
      <CollaborationsList collaborations={collaborations} userId={session.user.id} />
    </div>
  )
}
