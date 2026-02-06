import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ActivityFeed } from '@/components/feed/ActivityFeed'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      _count: {
        select: {
          likedPapers: true,
          savedPapers: true,
          comments: true,
          collaborations: true,
          followers: true,
          following: true,
        },
      },
    },
  })

  const activities = await prisma.activity.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
      paper: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Overview of your activity, collection, and recommendations
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500 mb-1">Saved Papers</p>
          <p className="text-3xl font-bold text-gray-900">
            {user?._count.savedPapers ?? 0}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500 mb-1">Liked Papers</p>
          <p className="text-3xl font-bold text-gray-900">
            {user?._count.likedPapers ?? 0}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500 mb-1">Comments</p>
          <p className="text-3xl font-bold text-gray-900">
            {user?._count.comments ?? 0}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <ActivityFeed activities={activities} />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Quick Links
          </h2>
          <div className="bg-white rounded-xl shadow p-4 space-y-3">
            <Link
              href="/swipe"
              className="block text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Continue Swiping
            </Link>
            <Link
              href="/collection"
              className="block text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View Collection
            </Link>
            <Link
              href="/recommendations"
              className="block text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View Recommendations
            </Link>
            <Link
              href="/conferences"
              className="block text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Conferences & Journals
            </Link>
            <Link
              href="/opportunities"
              className="block text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Opportunities
            </Link>
            <Link
              href="/compare"
              className="block text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Compare Papers
            </Link>
            <Link
              href="/critique"
              className="block text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Critique Research Ideas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

