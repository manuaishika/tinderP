import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { UserProfile } from '@/components/profile/UserProfile'
import { stringToArray } from '@/lib/json-helpers'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      likedPapers: {
        include: {
          paper: true,
        },
        where: { liked: true },
        take: 10,
      },
      savedPapers: {
        include: {
          paper: true,
        },
        take: 10,
      },
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

  if (!user) {
    return <div>User not found</div>
  }

  // Transform user data to include parsed interests
  const userWithInterests = {
    ...user,
    interests: stringToArray(user.interests),
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <UserProfile user={userWithInterests} isOwnProfile={true} />
    </div>
  )
}
