# Deployment Guide

## Vercel Deployment

### Prisma Client Generation
The build script has been updated to run `prisma generate` before building. This is required for Vercel deployments.

### Database Configuration

**⚠️ Important:** This project currently uses SQLite, which **will not work on Vercel** because:
- Vercel is serverless and stateless
- SQLite requires a persistent file system
- Database files don't persist across deployments

### Solution: Switch to PostgreSQL

To deploy on Vercel, you need to:

1. **Set up a PostgreSQL database:**
   - Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (recommended)
   - Or use [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app)

2. **Update Prisma schema:**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Update environment variables in Vercel:**
   - Add `DATABASE_URL` with your PostgreSQL connection string
   - Add `NEXTAUTH_SECRET` (generate a random string)
   - Add `NEXTAUTH_URL` (your Vercel deployment URL)

4. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

5. **Update build settings:**
   - The `package.json` build script already includes `prisma generate`
   - Vercel will automatically run migrations if you add a build command

### Environment Variables for Vercel

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for NextAuth (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your production URL (e.g., `https://your-app.vercel.app`)

### Quick Migration Steps

1. Create a PostgreSQL database
2. Update `prisma/schema.prisma` to use `provider = "postgresql"`
3. Run `npx prisma migrate dev --name init` locally
4. Push to GitHub
5. In Vercel, add the `DATABASE_URL` environment variable
6. Redeploy

The build should now succeed!
