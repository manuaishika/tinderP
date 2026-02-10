import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const dbUrl = process.env.DATABASE_URL ?? null
  const env = {
    NODE_ENV: process.env.NODE_ENV ?? null,
    HAS_DATABASE_URL: Boolean(dbUrl),
    HAS_NEXTAUTH_SECRET: Boolean(process.env.NEXTAUTH_SECRET),
    NEXTAUTH_URL_HOST: process.env.NEXTAUTH_URL
      ? safeHost(process.env.NEXTAUTH_URL)
      : null,
    DATABASE_URL_SCHEME: dbUrl ? safeScheme(dbUrl) : null,
  }

  // Avoid importing Prisma at module-load time so this endpoint can still respond
  // even when DATABASE_URL is missing or DB is unreachable.
  try {
    const { prisma } = await import('@/lib/prisma')
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ ok: true, env, db: { ok: true } })
  } catch (err: any) {
    const message =
      typeof err?.message === 'string' ? err.message : 'Unknown error'
    const name = typeof err?.name === 'string' ? err.name : null
    return NextResponse.json(
      {
        ok: false,
        env,
        db: {
          ok: false,
          name,
          message: message.slice(0, 500),
        },
      },
      { status: 500 }
    )
  }
}

function safeHost(url: string): string | null {
  try {
    const u = new URL(url)
    return u.host
  } catch {
    return null
  }
}

function safeScheme(url: string): string | null {
  // Prisma URLs can be like: file:./dev.db, postgresql://..., mysql://...
  const idx = url.indexOf(':')
  if (idx <= 0) return null
  return url.slice(0, idx)
}

