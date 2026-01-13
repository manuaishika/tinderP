import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { fetchArxivPapers, arxivPaperToDbFormat } from '@/lib/arxiv'
import { transformPapers } from '@/lib/paper-helpers'

/**
 * Fetch more papers from ArXiv and add to database
 * This endpoint is called when user runs out of papers to swipe
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { category = '', searchQuery = '' } = body

    // Get user's interests to personalize search
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { interests: true },
    })

    // Build search query from user interests if available
    let query = searchQuery
    if (!query && user?.interests.length > 0) {
      // Use first interest as search term
      query = user.interests[0]
    }

    // Fetch recent papers from ArXiv
    const arxivPapers = await fetchArxivPapers({
      searchQuery: query,
      category,
      maxResults: 20,
      sortBy: 'submittedDate',
      sortOrder: 'descending',
    })

    if (arxivPapers.length === 0) {
      return NextResponse.json({
        message: 'No new papers found',
        papers: [],
      })
    }

    // Get existing ArXiv IDs to avoid duplicates
    const existingArxivIds = await prisma.paper.findMany({
      where: {
        arxivId: { in: arxivPapers.map(p => p.id) },
      },
      select: { arxivId: true },
    })

    const existingIds = new Set(existingArxivIds.map(p => p.arxivId).filter(Boolean))

    // Import new papers
    const newPapers = []
    for (const arxivPaper of arxivPapers) {
      if (existingIds.has(arxivPaper.id)) {
        continue
      }

      try {
        const paperData = arxivPaperToDbFormat(arxivPaper)
        const paper = await prisma.paper.create({
          data: paperData,
          include: {
            likes: {
              where: { liked: true },
            },
          },
        })
        newPapers.push(paper)
      } catch (error) {
        console.error(`Error importing paper ${arxivPaper.id}:`, error)
      }
    }

    return NextResponse.json({
      message: `Fetched ${newPapers.length} new papers`,
      papers: transformPapers(newPapers),
      count: newPapers.length,
    })
  } catch (error) {
    console.error('Error fetching papers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch papers', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
