/**
 * Helper functions to convert between JSON strings and arrays for SQLite compatibility
 */

export function stringToArray(str: string | null | undefined): string[] {
  if (!str) return []
  try {
    const parsed = JSON.parse(str)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function arrayToString(arr: string[] | null | undefined): string {
  if (!arr || arr.length === 0) return '[]'
  return JSON.stringify(arr)
}
