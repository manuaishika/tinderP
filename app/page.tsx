import { redirect } from 'next/navigation'
import { getSafeServerSession } from '@/lib/safe-session'
import Link from 'next/link'
import { BookOpen, MessageSquare, Users, Sparkles, Heart, ArrowRight, Calendar, Mail, Zap, TrendingUp, Target } from 'lucide-react'

export default async function Home() {
  const session = await getSafeServerSession()

  if (session) {
    redirect('/dashboard')
  }

  const features = [
    {
      icon: BookOpen,
      title: 'Collection',
      description: 'Save and organize papers you love',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      icon: MessageSquare,
      title: 'Discussions',
      description: 'Engage with the research community',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      icon: Users,
      title: 'Collaborations',
      description: 'Find research partners worldwide',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Mail,
      title: 'Opportunities',
      description: 'Connect with researchers directly',
      color: 'from-orange-400 to-red-500',
    },
    {
      icon: Calendar,
      title: 'Conferences',
      description: 'Track upcoming academic events',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      icon: Sparkles,
      title: 'AI Recommendations',
      description: 'Personalized paper suggestions',
      color: 'from-yellow-400 to-orange-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-light/10">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full text-primary-dark font-semibold text-sm">
            🚀 Discover Research Papers Like Never Before
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-primary-dark mb-6 leading-tight">
            Swipe Your Way to <br />
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Research Success
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The modern way to discover academic papers. Swipe through papers from ArXiv, 
            build your collection, collaborate with researchers, and accelerate your research journey.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/register"
              className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2 text-lg"
            >
              Start Swiping Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/conferences"
              className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-gray-50 transition-all shadow-xl border-2 border-primary text-lg"
            >
              Browse Conferences
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20" id="features">
          <h2 className="text-3xl font-bold text-center text-primary-dark mb-8">
            Everything You Need in One Platform
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 border-t-4 border-primary"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Interactive Swipe Demo */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-20" id="demo">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6">
                Swipe Through Papers
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Browse through thousands of papers from ArXiv with an intuitive swipe interface. 
                Right swipe saves to your collection, left swipe moves to the next paper. 
                It&apos;s research discovery made simple and fun.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Swipe Right to Save</h4>
                    <p className="text-gray-600">Papers you love are instantly added to your collection</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-2xl">←</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Swipe Left to Skip</h4>
                    <p className="text-gray-600">Not interested? Just swipe left and move on</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">AI-Powered Recommendations</h4>
                    <p className="text-gray-600">Get smarter suggestions based on your interests</p>
                  </div>
                </div>
              </div>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition-all shadow-lg"
              >
                Try It Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-accent-light/10 rounded-2xl p-8 shadow-lg">
                <div className="bg-white rounded-xl shadow-2xl p-6 mb-4 transform hover:rotate-2 transition-transform">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500 font-medium">Paper 1 of 20</span>
                    <Heart className="w-5 h-5 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Attention Is All You Need
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    We propose a new simple network architecture, the Transformer, based solely on attention mechanisms...
                  </p>
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-semibold">NLP</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-semibold">Transformers</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-semibold">AI</span>
                  </div>
                  <div className="flex justify-center gap-6 pt-4 border-t">
                    <button className="p-4 bg-red-50 rounded-full hover:bg-red-100 transition-colors shadow-md">
                      <span className="text-3xl">←</span>
                    </button>
                    <button className="p-4 bg-green-50 rounded-full hover:bg-green-100 transition-colors shadow-md">
                      <Heart className="w-8 h-8 text-green-600 fill-current" />
                    </button>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-500 font-medium">
                  👆 Swipe left or right to discover papers
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-primary-dark mb-4">
            Powerful Features for Researchers
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            Everything you need to discover, organize, and collaborate on research
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-t-4 border-primary">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through thousands of papers in minutes. Our optimized interface makes paper discovery incredibly efficient.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-t-4 border-accent">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Stay Updated</h3>
              <p className="text-gray-600 leading-relaxed">
                Track conferences, deadlines, and latest papers in your field. Never miss an important opportunity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-t-4 border-primary-light">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-light to-primary rounded-xl flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Focused Research</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered recommendations ensure you only see papers relevant to your research interests.
              </p>
            </div>
          </div>
        </div>

        {/* Public Preview Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Link
            href="/conferences"
            className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 border-l-4 border-primary"
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900">Conferences</h3>
            </div>
            <p className="text-gray-600 mb-2">
              Browse upcoming conferences, workshops, and journals
            </p>
            <span className="text-primary font-semibold text-sm">Explore Now →</span>
          </Link>

          <Link
            href="/register"
            className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 border-l-4 border-primary cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-gray-900">Collection</h3>
            </div>
            <p className="text-gray-600 mb-2">
              Save and organize your favorite papers
            </p>
            <span className="text-primary font-semibold text-sm">Sign up to start →</span>
          </Link>

          <Link
            href="/register"
            className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 border-l-4 border-primary cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-gray-900">Discussions</h3>
            </div>
            <p className="text-gray-600 mb-2">
              Join conversations about research papers
            </p>
            <span className="text-primary font-semibold text-sm">Sign up to start →</span>
          </Link>

          <Link
            href="/register"
            className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 border-l-4 border-primary cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-gray-900">Collaborations</h3>
            </div>
            <p className="text-gray-600 mb-2">
              Find research partners worldwide
            </p>
            <span className="text-primary font-semibold text-sm">Sign up to start →</span>
          </Link>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Research?</h2>
          <p className="text-primary-50 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of researchers discovering papers the smart way. Start swiping, build your collection, and accelerate your research journey today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/register"
              className="px-10 py-4 bg-white text-primary rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl text-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="px-10 py-4 bg-primary-dark/50 backdrop-blur text-white rounded-xl font-bold hover:bg-primary-dark/70 transition-all border-2 border-white/30 text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
