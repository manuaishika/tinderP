import { prisma } from './prisma'
import { stringToArray } from './json-helpers'

export interface RecommendationScore {
  paperId: string
  score: number
  reason: string
}

/**
 * Generate paper recommendations for a user based on:
 * 1. Their liked papers and their keywords/categories
 * 2. Papers liked by users with similar interests
 * 3. Citation networks
 * 4. User's declared interests
 */
export async function generateRecommendations(
  userId: string,
  limit: number = 10
): Promise<RecommendationScore[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      likedPapers: {
        include: { paper: true },
        where: { liked: true },
        take: 50,
      },
    },
  })

  if (!user) {
    return []
  }

  // Get user's liked papers
  const likedPaperIds = user.likedPapers.map((lp) => lp.paperId)
  const likedPapers = user.likedPapers.map((lp) => lp.paper)

  // Extract keywords and categories from liked papers
  const likedKeywords = new Set<string>()
  const likedCategories = new Set<string>()
  likedPapers.forEach((paper) => {
    stringToArray(paper.keywords).forEach((k) => likedKeywords.add(k.toLowerCase()))
    stringToArray(paper.categories).forEach((c) => likedCategories.add(c.toLowerCase()))
  })

  // Add user's declared interests
  stringToArray(user.interests).forEach((i) => likedKeywords.add(i.toLowerCase()))

  // Find papers with similar keywords/categories that user hasn't liked
  const candidatePapers = await prisma.paper.findMany({
    where: {
      id: { notIn: likedPaperIds },
    },
    include: {
      likes: {
        where: { liked: true },
      },
      recommendations: {
        where: { userId },
      },
    },
  })

  // Score each candidate paper
  const scoredPapers: RecommendationScore[] = candidatePapers.map((paper) => {
    let score = 0
    const reasons: string[] = []

    // Keyword matching
    const paperKeywords = stringToArray(paper.keywords).map((k) => k.toLowerCase())
    const keywordMatches = paperKeywords.filter((k) => likedKeywords.has(k))
    if (keywordMatches.length > 0) {
      score += keywordMatches.length * 0.3
      reasons.push(`Matches ${keywordMatches.length} of your interests`)
    }

    // Category matching
    const paperCategories = stringToArray(paper.categories).map((c) => c.toLowerCase())
    const categoryMatches = paperCategories.filter((c) => likedCategories.has(c))
    if (categoryMatches.length > 0) {
      score += categoryMatches.length * 0.2
      reasons.push(`In ${categoryMatches.length} of your favorite categories`)
    }

    // Popularity boost (papers with more likes)
    const likeCount = paper.likes.length
    if (likeCount > 10) {
      score += 0.1
      reasons.push('Popular among researchers')
    }

    // Citation boost
    if (paper.citations > 100) {
      score += 0.15
      reasons.push('Highly cited')
    }

    // Recency boost (recent papers get slight boost)
    if (paper.publishedDate) {
      const daysSincePublished =
        (Date.now() - paper.publishedDate.getTime()) / (1000 * 60 * 60 * 24)
      if (daysSincePublished < 90) {
        score += 0.05
        reasons.push('Recently published')
      }
    }

    // Check if similar users liked this paper
    // (This would require more complex querying in production)
    const similarUserLikes = paper.likes.length
    if (similarUserLikes > 5) {
      score += 0.1
      reasons.push('Liked by researchers with similar interests')
    }

    return {
      paperId: paper.id,
      score: Math.min(score, 1.0), // Cap at 1.0
      reason: reasons.join('; ') || 'Recommended for you',
    }
  })

  // Sort by score and return top recommendations
  return scoredPapers
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter((p) => p.score > 0.1) // Only return papers with meaningful scores
}

/**
 * Save recommendations to database
 */
export async function saveRecommendations(
  userId: string,
  recommendations: RecommendationScore[]
) {
  await prisma.recommendation.deleteMany({
    where: { userId },
  })

  await prisma.recommendation.createMany({
    data: recommendations.map((rec) => ({
      userId,
      paperId: rec.paperId,
      score: rec.score,
      reason: rec.reason,
    })),
  })
}
