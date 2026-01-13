/**
 * Seed script to populate database with papers from ArXiv
 * Run with: npx tsx prisma/seed.ts
 */

import { PrismaClient } from '@prisma/client'
import { fetchArxivPapers, arxivPaperToDbFormat } from '../lib/arxiv'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Fetch papers from ArXiv
  console.log('📥 Fetching papers from ArXiv...')
  
  const categories = ['cs.AI', 'cs.CV', 'cs.LG', 'cs.CL']
  let totalImported = 0

  for (const category of categories) {
    console.log(`\n📚 Fetching papers from category: ${category}`)
    
    try {
      const arxivPapers = await fetchArxivPapers({
        category,
        maxResults: 25,
        sortBy: 'submittedDate',
        sortOrder: 'descending',
      })

      console.log(`   Found ${arxivPapers.length} papers`)

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
            console.log(`   ⏭️  Skipping ${arxivPaper.id} (already exists)`)
            continue
          }

          // Convert and save to database
          const paperData = arxivPaperToDbFormat(arxivPaper)
          await prisma.paper.create({
            data: paperData,
          })

          totalImported++
          console.log(`   ✅ Imported: ${arxivPaper.title.substring(0, 50)}...`)
        } catch (error) {
          console.error(`   ❌ Error importing ${arxivPaper.id}:`, error)
        }
      }
    } catch (error) {
      console.error(`   ❌ Error fetching category ${category}:`, error)
    }
  }

  console.log(`\n✨ Seed completed! Imported ${totalImported} papers.`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
