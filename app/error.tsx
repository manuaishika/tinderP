'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-white shadow rounded-xl p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          If this is happening on Vercel, it’s usually missing environment
          variables or a database connection issue. You can check{' '}
          <code className="px-1 py-0.5 bg-gray-100 rounded">/api/status</code>.
        </p>
        <pre className="text-xs bg-gray-900 text-gray-100 rounded-lg p-3 overflow-auto mb-4">
          {error.message}
        </pre>
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

