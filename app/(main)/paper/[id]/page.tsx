import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PaperDetail } from '@/components/paper/PaperDetail'
import { CommentsSection } from '@/components/discussion/CommentsSection'
import { transformPaper } from '@/lib/paper-helpers'

export default async function PaperPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const paper = await prisma.paper.findUnique({
    where: { id: params.id },
    include: {
      likes: {
        where: { liked: true },
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
    },
  })

  if (!paper) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-gray-500">Paper not found</p>
      </div>
    )
  }

  const userLike = await prisma.paperLike.findUnique({
    where: {
      userId_paperId: {
        userId: session.user.id,
        paperId: paper.id,
      },
    },
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <PaperDetail paper={transformPaper(paper)} userLiked={userLike?.liked || false} userId={session.user.id} />
      <div className="mt-8">
        <CommentsSection paperId={paper.id} comments={paper.comments} userId={session.user.id} />
      </div>
    </div>
  )
}
