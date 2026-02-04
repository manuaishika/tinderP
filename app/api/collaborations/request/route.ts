import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = (await req.json()) as {
      collaborationId?: string
      message?: string
    }
    const { collaborationId, message } = body

    if (!collaborationId) {
      return NextResponse.json(
        { error: 'Collaboration ID is required' },
        { status: 400 }
      )
    }

    // Check if collaboration exists and is open
    const collaboration = await prisma.collaboration.findUnique({
      where: { id: collaborationId },
    })

    if (!collaboration) {
      return NextResponse.json(
        { error: 'Collaboration not found' },
        { status: 404 }
      )
    }

    if (collaboration.status !== 'open') {
      return NextResponse.json(
        { error: 'Collaboration is not open for requests' },
        { status: 400 }
      )
    }

    if (collaboration.userId === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot request your own collaboration' },
        { status: 400 }
      )
    }

    // Check if request already exists
    const existingRequest = await prisma.collaborationRequest.findUnique({
      where: {
        collaborationId_userId: {
          collaborationId,
          userId: session.user.id,
        },
      },
    })

    if (existingRequest) {
      return NextResponse.json(
        { error: 'You have already requested this collaboration' },
        { status: 400 }
      )
    }

    const request = await prisma.collaborationRequest.create({
      data: {
        collaborationId,
        userId: session.user.id,
        message: message || null,
        status: 'pending',
      },
    })

    return NextResponse.json({ request })
  } catch (error) {
    console.error('Error creating collaboration request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
