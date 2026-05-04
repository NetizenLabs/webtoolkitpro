'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Box, ChevronRight } from 'lucide-react'

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
      className={`bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-[100] transition-all duration-300 ${
        scrolled ? 'h-16 shadow-md' : 'h-20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-blue-600 p-1.5 rounded-xl group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-blue-200">
              <Box className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
              WebToolkit<span className="text-blue-600">Pro</span>
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors py-2 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link 
              href="/tools" 
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2.5 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-100"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay - Using max-h for more reliable transition */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-lg font-bold text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-4 rounded-xl transition-all"
            >
              {link.name}
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-50">
            <Link 
              href="/tools" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
