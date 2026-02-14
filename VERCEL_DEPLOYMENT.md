# Vercel Deployment Guide

## ⚠️ CRITICAL: SQLite Doesn't Work on Vercel

**SQLite requires a writable filesystem, but Vercel's serverless functions are read-only.** You **MUST** switch to PostgreSQL (or another cloud database) for Vercel deployment.

## Quick Fix: Switch to PostgreSQL

### Step 1: Get a PostgreSQL Database

1. **Option A: Vercel Postgres** (Recommended - easiest)
   - Go to your Vercel project dashboard
   - Click "Storage" → "Create Database" → "Postgres"
   - Copy the `POSTGRES_PRISMA_URL` or `DATABASE_URL` from the connection string

2. **Option B: Supabase** (Free tier available)
   - Sign up at https://supabase.com
   - Create a new project
   - Go to Settings → Database
   - Copy the connection string (looks like `postgresql://...`)

3. **Option C: Neon** (Free tier available)
   - Sign up at https://neon.tech
   - Create a new project
   - Copy the connection string

### Step 2: Update Prisma Schema

Change `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

### Step 3: Update Environment Variables on Vercel

1. Go to your Vercel project → Settings → Environment Variables
2. Add/Update:
   - `DATABASE_URL` = Your PostgreSQL connection string
   - `NEXTAUTH_SECRET` = A random string (run `openssl rand -base64 32` to generate)
   - `NEXTAUTH_URL` = Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)

### Step 4: Push Schema to Database

Run locally (or use Vercel's build command):

```bash
npx prisma db push
```

Or create a migration:

```bash
npx prisma migrate dev --name init
```

### Step 5: Deploy

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Switch to PostgreSQL for Vercel"
   git push
   ```

2. Vercel will automatically redeploy

## Verify Deployment

1. Check `/api/status` - Should show:
   ```json
   {
     "ok": true,
     "env": {
       "DATABASE_URL_SCHEME": "postgresql",
       "HAS_DATABASE_URL": true,
       "HAS_NEXTAUTH_SECRET": true
     },
     "db": { "ok": true }
   }
   ```

2. If you see errors, check:
   - Environment variables are set correctly
   - Database connection string is valid
   - Database is accessible from Vercel's IP ranges

## Current Error Handling

The app now shows helpful error messages instead of crashing when:
- Database connection fails
- SQLite is detected (shows message about needing PostgreSQL)
- Environment variables are missing

Check `/api/status` for detailed diagnostics.
