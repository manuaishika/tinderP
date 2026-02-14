import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { PaperSwipe } from '@/components/paper/PaperSwipe'
import { transformPapers } from '@/lib/paper-helpers'
import { FetchArxivButton } from '@/components/paper/FetchArxivButton'

export default async function SwipePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  let papers: any[] = []
  let dbError: string | null = null

  try {
    // Get papers user hasn't interacted with
    const userLikes = await prisma.paperLike.findMany({
      where: { userId: session.user.id },
      select: { paperId: true },
    })

    const likedPaperIds = userLikes.map((l) => l.paperId)

    // Get papers to swipe on
    papers = await prisma.paper.findMany({
      where: {
        id: { notIn: likedPaperIds },
      },
      include: {
        likes: {
          where: { liked: true },
        },
      },
      take: 20,
      orderBy: {
        createdAt: 'desc',
      },
    })
  } catch (error: any) {
    console.error('Database error in swipe page:', error)
    dbError = error.message || 'Database connection failed'
  }

  if (dbError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-900 mb-2">
            Database Connection Error
          </h2>
          <p className="text-red-700 mb-4">
            {dbError.includes('SQLite') || dbError.includes('file:')
              ? "SQLite doesn't work on Vercel. You need to use PostgreSQL. Check /api/status for details."
              : dbError}
          </p>
          <Link
            href="/api/status"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Check Status →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Discover Papers</h1>
      {papers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow p-8">
          <p className="text-gray-500 text-lg mb-4">No papers in database yet!</p>
          <p className="text-gray-400 mb-6">Fetch papers from ArXiv to get started.</p>
          <FetchArxivButton />
        </div>
      ) : (
        <PaperSwipe initialPapers={transformPapers(papers)} userId={session.user.id} />
      )}
    </div>
  )
}
