'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
    { name: 'Tools', href: '/tools/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'Submit Tool', href: '/submit-tool/' },
    { name: 'About', href: '/about/' },
    { name: 'Contact', href: '/contact/' },
  ]

  return (
    <header 
      className={`bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 sticky top-0 z-[100] h-20 transition-all duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg" style={{ width: '200px', height: '40px' }}>
            <span className="sr-only">WebToolkit Pro Home</span>
            <Image 
              src="/logo-optimized.webp" 
              alt="WebToolkit Pro" 
              width={200}
              height={40}
              priority
              fetchPriority="high"
              decoding="async"
              style={{ objectFit: 'contain' }}
              className="transition-all group-hover:scale-105"
            />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isCTA = link.name === 'Submit Tool';
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={isCTA 
                    ? "text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 border-2 border-blue-600/20 dark:border-blue-400/20 px-5 py-2.5 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-slate-950 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    : "text-xs font-black uppercase tracking-widest text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 relative group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                  }
                >
                  {link.name}
                  {!isCTA && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  )}
                </Link>
              );
            })}
            <div className="w-px h-6 bg-gray-100 dark:bg-slate-800 mx-2" />
            <ThemeToggle />
          </nav>

          {/* Mobile Right Section */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button 
              className="p-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-2xl transition-colors border border-gray-100 dark:border-slate-800 active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-blue-900/10 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col p-6 gap-3">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-[var(--font-size-xl)] font-black text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 p-5 rounded-[2rem] hover:bg-gray-50 dark:hover:bg-slate-900 transition-all"
            >
              {link.name}
              <ChevronRight className="w-6 h-6 text-gray-300 dark:text-slate-700" />
            </Link>
          ))}
          <div className="mt-4 pt-6 border-t border-gray-50 dark:border-slate-900 space-y-4">
            <Link 
              href="/submit-tool/" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-5 rounded-[2rem] text-lg font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800"
            >
              Submit a Tool Idea
            </Link>
            <Link 
              href="/tools/" 
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full py-5 rounded-[2rem] text-lg uppercase tracking-widest"
            >
              Start Building Now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
