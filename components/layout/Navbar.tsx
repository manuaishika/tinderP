'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import {
  Home,
  MessageSquare,
  Users,
  BookOpen,
  User,
  LogOut,
  Sparkles,
  Calendar,
  Mail,
  GitCompare,
  Lightbulb,
} from 'lucide-react'

export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const loggedInNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/swipe', label: 'Swipe', icon: BookOpen },
    { href: '/collection', label: 'Collection', icon: BookOpen },
    { href: '/compare', label: 'Compare', icon: GitCompare },
    { href: '/critique', label: 'Critique', icon: Lightbulb },
    { href: '/discussions', label: 'Discussions', icon: MessageSquare },
    { href: '/collaborations', label: 'Collaborate', icon: Users },
    { href: '/conferences', label: 'Conferences', icon: Calendar },
    { href: '/opportunities', label: 'Opportunities', icon: Mail },
    { href: '/recommendations', label: 'Recommendations', icon: Sparkles },
  ]

  const publicNavItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/conferences', label: 'Conferences', icon: Calendar },
    { href: '/opportunities', label: 'Opportunities', icon: Mail },
  ]

  const navItems = session ? loggedInNavItems : publicNavItems

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href={session ? '/dashboard' : '/'}
                className="text-2xl font-bold text-indigo-600"
              >
                Paper Platform
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center text-gray-700 hover:text-gray-900"
                >
                  <User className="w-5 h-5 mr-1" />
                  <span className="hidden sm:inline">
                    {session.user.name || session.user.username}
                  </span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
