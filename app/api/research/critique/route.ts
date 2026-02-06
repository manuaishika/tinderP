import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { idea, context } = body

    if (!idea || !idea.trim()) {
      return NextResponse.json(
        { error: 'Research idea is required' },
        { status: 400 }
      )
    }

    // AI-powered critique (simulated for now - you'd integrate with OpenAI/Anthropic)
    const critique = await generateCritique(idea, context)

    return NextResponse.json({ critique })
  } catch (error) {
    console.error('Error critiquing research idea:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function generateCritique(idea: string, context?: string): Promise<any> {
  // This is a simulated critique - replace with actual AI API call
  // For now, using heuristics and pattern matching

  const ideaLower = idea.toLowerCase()
  const isIncremental = checkIfIncremental(ideaLower)
  const isFoundational = checkIfFoundational(ideaLower)

  const assessment = `Your research idea appears to be ${
    isFoundational
      ? 'foundational research that could establish new directions in the field'
      : isIncremental
      ? 'incremental research that builds upon existing work'
      : 'a mix of incremental and foundational elements'
  }. ${isFoundational ? 'This suggests significant potential impact but also higher risk and time investment.' : 'This approach is typically lower risk but may have limited novelty.'}`

  const strengths = [
    idea.length > 200 ? 'Well-articulated problem statement' : null,
    idea.includes('novel') || idea.includes('new') ? 'Identifies novelty' : null,
    idea.includes('problem') || idea.includes('challenge') ? 'Clearly defines the problem' : null,
    idea.includes('method') || idea.includes('approach') ? 'Proposes a methodology' : null,
  ].filter(Boolean) as string[]

  const weaknesses = [
    idea.length < 100 ? 'Idea description is too brief - more detail needed' : null,
    !idea.includes('problem') && !idea.includes('challenge') ? 'Problem statement could be clearer' : null,
    !idea.includes('method') && !idea.includes('approach') ? 'Methodology needs more detail' : null,
    !idea.includes('novel') && !idea.includes('new') && !idea.includes('improve') ? 'Novelty claim needs strengthening' : null,
  ].filter(Boolean) as string[]

  const potentialIssues = [
    isFoundational ? 'Foundational research typically requires 6+ months and significant resources' : null,
    ideaLower.includes('requires') && ideaLower.includes('data') ? 'Data requirements may be a bottleneck' : null,
    ideaLower.includes('requires') && ideaLower.includes('compute') ? 'Computational requirements may be high' : null,
    !ideaLower.includes('evaluate') && !ideaLower.includes('validate') ? 'Consider how you will evaluate/validate your approach' : null,
  ].filter(Boolean) as string[]

  const suggestions = [
    'Consider conducting a thorough literature review to identify gaps',
    'Define clear success metrics and evaluation criteria',
    'Break down the research into smaller, testable milestones',
    'Consider pilot studies or proof-of-concept experiments',
    isFoundational ? 'Plan for longer timeline and potential setbacks' : 'Consider how to demonstrate clear improvement over baselines',
  ]

  const timeInvestment: 'low' | 'medium' | 'high' = isFoundational
    ? 'high'
    : idea.length > 500 && ideaLower.includes('comprehensive')
    ? 'medium'
    : 'low'

  const riskLevel: 'low' | 'medium' | 'high' = isFoundational
    ? 'high'
    : weaknesses.length > 2
    ? 'medium'
    : 'low'

  const recommendation = isFoundational
    ? 'This appears to be foundational research with high potential impact. However, it comes with significant risk and time investment. Consider starting with a smaller proof-of-concept to validate core assumptions before committing to the full project.'
    : isIncremental
    ? 'This incremental approach is lower risk and can be completed in a shorter timeframe. Focus on clearly demonstrating improvements over existing methods and ensuring your contributions are well-defined.'
    : 'This research combines incremental and foundational elements. Consider breaking it into phases: start with incremental improvements to establish a foundation, then explore more foundational aspects.'

  return {
    isIncremental,
    isFoundational,
    assessment,
    strengths,
    weaknesses,
    potentialIssues,
    suggestions,
    timeInvestment,
    riskLevel,
    recommendation,
  }
}

function checkIfIncremental(text: string): boolean {
  const incrementalKeywords = [
    'improve', 'enhance', 'extend', 'optimize', 'better', 'faster', 'more accurate',
    'incremental', 'baseline', 'state-of-the-art', 'sota', 'existing method',
  ]
  return incrementalKeywords.some((keyword) => text.includes(keyword))
}

function checkIfFoundational(text: string): boolean {
  const foundationalKeywords = [
    'novel', 'new paradigm', 'fundamental', 'foundational', 'breakthrough',
    'first to', 'pioneering', 'establish', 'introduce', 'propose new',
    'unexplored', 'unaddressed', 'new direction',
  ]
  return foundationalKeywords.some((keyword) => text.includes(keyword))
}
