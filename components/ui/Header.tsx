'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Box, ChevronRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Tools', href: '/tools' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header 
      className={`bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 sticky top-0 z-[100] transition-all duration-300 ${
        scrolled ? 'h-16 shadow-md dark:shadow-blue-900/10' : 'h-20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img 
              src="/logo-full.png" 
              alt="WebToolkit Pro" 
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="text-sm font-bold text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <ThemeToggle />
            <Link 
              href="/tools" 
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 dark:hover:shadow-none transition-all duration-300"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Right Section */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button 
              className="p-2.5 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-gray-100 dark:border-slate-800"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 shadow-2xl dark:shadow-blue-900/20 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-lg font-bold text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-900 p-4 rounded-xl transition-all"
            >
              {link.name}
              <ChevronRight className="w-5 h-5 text-gray-300 dark:text-slate-600" />
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-50 dark:border-slate-900">
            <Link 
              href="/tools" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 dark:shadow-none transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
