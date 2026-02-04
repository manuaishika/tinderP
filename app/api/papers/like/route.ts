import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { paperId, liked } = await request.json()

    if (!paperId || typeof liked !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    // Upsert like/dislike
    await prisma.paperLike.upsert({
      where: {
        userId_paperId: {
          userId: session.user.id,
          paperId,
        },
      },
      update: {
        liked,
      },
      create: {
        userId: session.user.id,
        paperId,
        liked,
      },
    })

    // If liked, also save to collection
    if (liked) {
      await prisma.savedPaper.upsert({
        where: {
          userId_paperId: {
            userId: session.user.id,
            paperId,
          },
        },
        update: {},
        create: {
          userId: session.user.id,
          paperId,
        },
      })
    } else {
      // Remove from collection if unliked
      await prisma.savedPaper.deleteMany({
        where: {
          userId: session.user.id,
          paperId,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving like:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
