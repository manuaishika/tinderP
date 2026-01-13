import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ActivityFeed } from '@/components/feed/ActivityFeed'

export default async function FeedPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  // Get activities from users the current user follows
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      following: {
        include: {
          following: true,
        },
      },
    },
  })

  const followingIds = user?.following.map((f) => f.followingId) || []

  // Get recent activities
  const activities = await prisma.activity.findMany({
    where: {
      OR: [
        { userId: { in: followingIds } },
        { userId: session.user.id },
      ],
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
    take: 50,
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Activity Feed</h1>
      <ActivityFeed activities={activities} />
    </div>
  )
}
