import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { BookOpen, MessageSquare, Users, Sparkles, Heart, ArrowRight, Calendar, ExternalLink } from 'lucide-react'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/feed')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section - MVP Focus */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Swipe Your Way to <span className="text-indigo-600">Research Success</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The Tinder of academic research! Swipe right on papers you love, 
            swipe left on ones you don't. Discover relevant research papers from ArXiv in seconds.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg flex items-center gap-2"
            >
              Start Swiping <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border-2 border-indigo-600"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* MVP Feature - Swiping */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                🎯 Our MVP Feature
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Swipe Left. Swipe Right. Discover Papers.
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Just like Tinder, but for research papers! Our intuitive swipe interface makes 
                discovering academic papers fun and effortless. Swipe right to save papers you're 
                interested in, swipe left to skip. It's that simple.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">Swipe right to like and save papers</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">👈</span>
                  <span className="text-gray-700">Swipe left to skip papers you're not interested in</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">AI-powered recommendations based on your swipes</span>
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Papers automatically fetched from ArXiv</span>
                </li>
              </ul>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Try It Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-8 shadow-lg">
                <div className="bg-white rounded-lg shadow-xl p-6 mb-4 transform rotate-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Paper 1 of 20</span>
                    <Heart className="w-5 h-5 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Deep Learning for Computer Vision
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    This paper presents a novel approach to computer vision using deep learning...
                  </p>
                  <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">AI</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">CV</span>
                  </div>
                  <div className="flex justify-center gap-4 pt-4 border-t">
                    <button className="p-3 bg-red-100 rounded-full">
                      <span className="text-2xl">👈</span>
                    </button>
                    <button className="p-3 bg-green-100 rounded-full">
                      <Heart className="w-6 h-6 text-green-600 fill-current" />
                    </button>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-500">
                  Swipe left or right to discover papers
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Conferences Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              📅 Conference Calendar
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Upcoming Conferences
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest academic conferences and submission deadlines
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI/ML Conferences */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-900">NeurIPS 2025</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Neural Information Processing Systems - One of the top ML conferences
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-500"><strong>Abstract Deadline:</strong> May 2025</p>
                <p className="text-sm text-gray-500"><strong>Paper Deadline:</strong> May 2025</p>
                <p className="text-sm text-gray-500"><strong>Conference:</strong> Dec 2025</p>
              </div>
              <a
                href="https://neurips.cc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Visit Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-900">ICML 2025</h3>
              </div>
              <p className="text-gray-600 mb-4">
                International Conference on Machine Learning - Premier ML conference
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-500"><strong>Abstract Deadline:</strong> Jan 2025</p>
                <p className="text-sm text-gray-500"><strong>Paper Deadline:</strong> Feb 2025</p>
                <p className="text-sm text-gray-500"><strong>Conference:</strong> Jul 2025</p>
              </div>
              <a
                href="https://icml.cc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Visit Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-900">CVPR 2025</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Computer Vision and Pattern Recognition - Top CV conference
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-500"><strong>Abstract Deadline:</strong> Nov 2024</p>
                <p className="text-sm text-gray-500"><strong>Paper Deadline:</strong> Nov 2024</p>
                <p className="text-sm text-gray-500"><strong>Conference:</strong> Jun 2025</p>
              </div>
              <a
                href="https://cvpr.thecvf.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Visit Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-900">ICLR 2025</h3>
              </div>
              <p className="text-gray-600 mb-4">
                International Conference on Learning Representations - Leading deep learning conference
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-500"><strong>Abstract Deadline:</strong> Sep 2024</p>
                <p className="text-sm text-gray-500"><strong>Paper Deadline:</strong> Sep 2024</p>
                <p className="text-sm text-gray-500"><strong>Conference:</strong> May 2025</p>
              </div>
              <a
                href="https://iclr.cc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Visit Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-900">ACL 2025</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Association for Computational Linguistics - Top NLP conference
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-500"><strong>Abstract Deadline:</strong> Jan 2025</p>
                <p className="text-sm text-gray-500"><strong>Paper Deadline:</strong> Feb 2025</p>
                <p className="text-sm text-gray-500"><strong>Conference:</strong> Jul 2025</p>
              </div>
              <a
                href="https://2025.aclweb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Visit Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-900">AAAI 2025</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Association for the Advancement of Artificial Intelligence
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-500"><strong>Abstract Deadline:</strong> Aug 2024</p>
                <p className="text-sm text-gray-500"><strong>Paper Deadline:</strong> Aug 2024</p>
                <p className="text-sm text-gray-500"><strong>Conference:</strong> Feb 2025</p>
              </div>
              <a
                href="https://aaai.org/aaai-conference/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Visit Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Want to add more conferences? <Link href="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">Join us</Link> to contribute!
            </p>
          </div>
        </div>

        {/* Other Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">More Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Discussions</h3>
              <p className="text-gray-600">
                Comment on papers, ask questions, and get answers. Stack Overflow-style Q&A for research.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaborations</h3>
              <p className="text-gray-600">
                Find and post collaboration opportunities. Connect with researchers working on similar topics.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Recommendations</h3>
              <p className="text-gray-600">
                Get personalized paper recommendations based on your interests and swiping history.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to start swiping?</h2>
          <p className="text-indigo-100 mb-6 text-lg">
            Join researchers from around the world. Swipe through papers, discover new research, and build your library.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  )
}
