import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { fetchArxivPapers, arxivPaperToDbFormat } from '@/lib/arxiv'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      searchQuery = '',
      category = '',
      maxResults = 20,
      sortBy = 'submittedDate',
      sortOrder = 'descending',
    } = body

    // Fetch papers from ArXiv
    const arxivPapers = await fetchArxivPapers({
      searchQuery,
      category,
      maxResults: Math.min(maxResults, 100), // Limit to 100
      sortBy,
      sortOrder,
    })

    if (arxivPapers.length === 0) {
      return NextResponse.json({
        message: 'No papers found',
        imported: 0,
      })
    }

    // Import papers to database
    let imported = 0
    let skipped = 0

    for (const arxivPaper of arxivPapers) {
      try {
        // Check if paper already exists
        const existing = await prisma.paper.findFirst({
          where: {
            OR: [
              { arxivId: arxivPaper.id },
              { doi: arxivPaper.doi || undefined },
            ],
          },
        })

        if (existing) {
          skipped++
          continue
        }

        // Convert and save to database
        const paperData = arxivPaperToDbFormat(arxivPaper)
        await prisma.paper.create({
          data: paperData,
        })

        imported++
      } catch (error) {
        console.error(`Error importing paper ${arxivPaper.id}:`, error)
        skipped++
      }
    }

    return NextResponse.json({
      message: 'Papers imported successfully',
      imported,
      skipped,
      total: arxivPapers.length,
    })
  } catch (error) {
    console.error('Error importing papers:', error)
    return NextResponse.json(
      { error: 'Failed to import papers', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
