import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function getSafeServerSession() {
  try {
    return await getServerSession(authOptions)
  } catch (err) {
    console.error('getServerSession failed:', err)
    return null
  }
}

