'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Box, ChevronRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'

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
    { name: 'About', href: '/about/' },
    { name: 'Contact', href: '/contact/' },
    { name: 'Submit Tool', href: '/contact/' },
  ]

  return (
    <header 
      className={`bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md border-b border-gray-100 dark:border-[#1E2D47] sticky top-0 z-[100] h-20 transition-all duration-300 ${
        scrolled ? 'shadow-md shadow-blue-500/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
            <span className="sr-only">WebToolkit Pro Home</span>
            <Logo className="transition-all group-hover:scale-105" />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isCTA = link.name === 'Submit Tool';
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-3 py-2 ${
                    isCTA 
                      ? 'bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] rounded-lg px-5 py-2.5 shadow-lg shadow-blue-500/10' 
                      : 'text-gray-600 dark:text-[#8A9BBE] hover:text-blue-600 dark:hover:text-[#00D4B4]'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
            
            <div className="h-6 w-px bg-gray-100 dark:bg-[#1E2D47]" />
            <ThemeToggle />
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-[#8A9BBE] hover:bg-gray-100 dark:hover:bg-[#0D1526] focus:outline-none focus:ring-2 focus:ring-[#00D4B4] transition-all"
              aria-expanded={isOpen}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0D1526] border-b border-gray-100 dark:border-[#1E2D47] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col p-6 gap-3">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-[#00D4B4] p-5 rounded-[12px] hover:bg-gray-50 dark:hover:bg-[#0B1120] transition-all"
            >
              {link.name}
              <ChevronRight className="w-6 h-6 text-gray-300 dark:text-[#4A6080]" strokeWidth={1.5} />
            </Link>
          ))}
          <div className="mt-4 pt-6 border-t border-gray-100 dark:border-[#1E2D47] space-y-4">
            <Link 
              href="/tools/" 
              onClick={() => setIsOpen(false)}
              className="w-full py-5 rounded-[12px] text-lg font-bold bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] flex items-center justify-center shadow-xl shadow-blue-500/10"
            >
              Explore All Tools
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
