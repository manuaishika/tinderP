import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { transformPaper } from '@/lib/paper-helpers'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { paper1Id, paper2Id } = body

    if (!paper1Id || !paper2Id) {
      return NextResponse.json(
        { error: 'Both paper IDs are required' },
        { status: 400 }
      )
    }

    // Fetch both papers
    const [paper1, paper2] = await Promise.all([
      prisma.paper.findUnique({
        where: { id: paper1Id },
        include: {
          likes: { where: { liked: true } },
        },
      }),
      prisma.paper.findUnique({
        where: { id: paper2Id },
        include: {
          likes: { where: { liked: true } },
        },
      }),
    ])

    if (!paper1 || !paper2) {
      return NextResponse.json(
        { error: 'One or both papers not found' },
        { status: 404 }
      )
    }

    const p1 = transformPaper(paper1)
    const p2 = transformPaper(paper2)

    // AI-powered comparison (simulated for now - you'd integrate with OpenAI/Anthropic)
    const comparison = await generateComparison(p1, p2)

    return NextResponse.json({ comparison })
  } catch (error) {
    console.error('Error comparing papers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function generateComparison(paper1: any, paper2: any) {
  // This is a simulated comparison - replace with actual AI API call
  // For now, using heuristics based on citations, recency, keywords, etc.

  const p1Score = calculatePromisingScore(paper1)
  const p2Score = calculatePromisingScore(paper2)

  let morePromising: 'paper1' | 'paper2' | 'equal' = 'equal'
  if (p1Score > p2Score + 0.1) morePromising = 'paper1'
  else if (p2Score > p1Score + 0.1) morePromising = 'paper2'

  const reasoning = `After analyzing both papers, ${
    morePromising === 'paper1'
      ? `the first paper "${paper1.title}" appears more promising`
      : morePromising === 'paper2'
      ? `the second paper "${paper2.title}" appears more promising`
      : 'both papers show similar promise'
  }. This assessment is based on factors including citation count, recency, novelty indicators, and research scope.`

  const paper1Strengths = [
    paper1.citations > 50 ? 'High citation count indicates impact' : 'Recent publication',
    paper1.keywords.length > 5 ? 'Well-categorized with multiple keywords' : 'Clear research focus',
    paper1.abstract.length > 500 ? 'Comprehensive abstract' : 'Concise and clear',
  ].filter(Boolean)

  const paper2Strengths = [
    paper2.citations > 50 ? 'High citation count indicates impact' : 'Recent publication',
    paper2.keywords.length > 5 ? 'Well-categorized with multiple keywords' : 'Clear research focus',
    paper2.abstract.length > 500 ? 'Comprehensive abstract' : 'Concise and clear',
  ].filter(Boolean)

  const paper1Weaknesses = [
    paper1.citations < 10 ? 'Low citation count may indicate limited impact' : null,
    paper1.abstract.length < 200 ? 'Abstract may lack detail' : null,
  ].filter(Boolean) as string[]

  const paper2Weaknesses = [
    paper2.citations < 10 ? 'Low citation count may indicate limited impact' : null,
    paper2.abstract.length < 200 ? 'Abstract may lack detail' : null,
  ].filter(Boolean) as string[]

  const recommendation = morePromising === 'paper1'
    ? `Focus on "${paper1.title}" if you're looking for the most promising direction. However, "${paper2.title}" may offer complementary insights worth exploring.`
    : morePromising === 'paper2'
    ? `Focus on "${paper2.title}" if you're looking for the most promising direction. However, "${paper1.title}" may offer complementary insights worth exploring.`
    : `Both papers offer valuable insights. Consider your specific research goals and how each aligns with your interests and available resources.`

  return {
    morePromising,
    reasoning,
    paper1Strengths,
    paper2Strengths,
    paper1Weaknesses,
    paper2Weaknesses,
    recommendation,
  }
}

function calculatePromisingScore(paper: any): number {
  let score = 0

  // Citation impact (0-0.3)
  if (paper.citations > 100) score += 0.3
  else if (paper.citations > 50) score += 0.2
  else if (paper.citations > 10) score += 0.1

  // Recency (0-0.2)
  if (paper.publishedDate) {
    const daysSincePublished = (Date.now() - new Date(paper.publishedDate).getTime()) / (1000 * 60 * 60 * 24)
    if (daysSincePublished < 365) score += 0.2
    else if (daysSincePublished < 730) score += 0.1
  }

  // Abstract quality (0-0.2)
  if (paper.abstract.length > 500) score += 0.2
  else if (paper.abstract.length > 300) score += 0.1

  // Keywords/categories (0-0.15)
  if (paper.keywords.length > 5) score += 0.15
  else if (paper.keywords.length > 3) score += 0.1

  // Popularity (likes) (0-0.15)
  if (paper.likes.length > 20) score += 0.15
  else if (paper.likes.length > 10) score += 0.1
  else if (paper.likes.length > 5) score += 0.05

  return Math.min(score, 1.0)
}
