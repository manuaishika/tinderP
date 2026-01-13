import { stringToArray } from './json-helpers'

/**
 * Transform paper data from database (JSON strings) to component format (arrays)
 */
export function transformPaper(paper: any) {
  return {
    ...paper,
    authors: stringToArray(paper.authors),
    keywords: stringToArray(paper.keywords),
    categories: stringToArray(paper.categories),
  }
}

export function transformPapers(papers: any[]) {
  return papers.map(transformPaper)
}
