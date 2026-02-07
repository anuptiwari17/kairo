'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    router.push('/')
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav')) {
        setIsOpen(false)
      }
      if (showUserMenu && !event.target.closest('.user-menu')) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen, showUserMenu])

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="section-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="text-2xl font-display font-bold gradient-text">Kairo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium">
              How It Works
            </Link>
            <Link href="/#impact" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium">
              Impact
            </Link>
            
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  /* Authenticated User Menu */
                  <div className="flex items-center space-x-4">
                    <Link href="/dashboard" className="text-primary-600 hover:text-primary-700 transition-colors duration-200 font-medium">
                      Dashboard
                    </Link>
                    <div className="relative user-menu">
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
                      >
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <User size={16} className="text-primary-600" />
                        </div>
                        <span className="max-w-24 truncate">{user?.name}</span>
                      </button>
                      
                      {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <div className="py-1">
                            <div className="px-4 py-2 border-b border-gray-100">
                              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                              <p className="text-xs text-gray-600">{user?.email}</p>
                            </div>
                            <Link
                              href="/dashboard"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setShowUserMenu(false)}
                            >
                              Dashboard
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                            >
                              <LogOut size={16} />
                              <span>Logout</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Non-authenticated Links */
                  <>
                    <Link href="/login" className="text-primary-600 hover:text-primary-700 transition-colors duration-200 font-medium">
                      Login
                    </Link>
                    <Link href="/signup" className="btn-primary">
                      Get Started
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-slide-down">
            <Link 
              href="/#features" 
              className="block py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/#how-it-works" 
              className="block py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              href="/#impact" 
              className="block py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Impact
            </Link>
            
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  /* Authenticated Mobile Menu */
                  <>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <User size={18} className="text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user?.name}</p>
                          <p className="text-sm text-gray-600">{user?.email}</p>
                        </div>
                      </div>
                      <Link
                        href="/dashboard"
                        className="block py-2 text-primary-600 hover:text-primary-700 transition-colors font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  /* Non-authenticated Mobile Menu */
                  <>
                    <Link 
                      href="/login" 
                      className="block py-2 text-primary-600 hover:text-primary-700 transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      href="/signup" 
                      className="block w-full btn-primary text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}