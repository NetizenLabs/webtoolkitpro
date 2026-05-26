'use client'

import React, { useState, useEffect } from 'react'
import Link from '@/components/ui/NativeLink';
import Image from 'next/image'
import { Menu, X, Box, ChevronRight, Search, Command } from 'lucide-react'
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
    { name: 'Submit Tool', href: '/submit-tool/' },
  ]

  return (
    <header 
      className={`bg-white/30 dark:bg-[#0D1117]/30 backdrop-blur-2xl border-b border-white/20 dark:border-white/10 sticky top-0 z-[100] h-20 transition-all duration-300 ${
        scrolled ? 'shadow-md shadow-blue-500/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <a href="/" className="flex items-center group shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
            <span className="sr-only">WebToolkit Pro Home</span>
            <Logo className="transition-all group-hover:scale-105" />
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-16 2xl:gap-24 transition-all duration-500">
            <div className="flex items-center gap-2 lg:gap-4 xl:gap-6">
              {navLinks.filter(l => l.name !== 'Submit Tool').map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="text-[10px] lg:text-[11px] xl:text-xs font-black uppercase tracking-[0.25em] text-muted-foreground hover:text-blue-600 dark:hover:text-[#00D4B4] transition-all px-4 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="h-6 w-px bg-border hidden xl:block opacity-50" />
            
            <div className="flex items-center gap-6 xl:gap-8">
              {/* Cmd+K Search Button */}
              <button 
                onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                className="hidden lg:flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors group"
              >
                <Search className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="font-medium mr-2">Search Tools...</span>
                <kbd className="hidden xl:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-background text-[10px] font-mono font-bold uppercase tracking-widest opacity-70">
                  <Command className="w-3 h-3" /> K
                </kbd>
              </button>

              <a 
                href="/submit-tool/" 
                className="hidden xl:flex bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0D1117] rounded-xl px-8 py-3.5 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/10 hover:scale-105 hover:shadow-2xl transition-all whitespace-nowrap"
              >
                Submit Tool
              </a>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00D4B4] transition-all"
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
        className={`md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col p-6 gap-3">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-lg font-bold text-foreground hover:text-blue-600 dark:hover:text-[#00D4B4] p-5 rounded-[12px] hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              {link.name}
              <ChevronRight className="w-6 h-6 text-muted-foreground/30" strokeWidth={1.5} />
            </a>
          ))}
          <div className="mt-4 pt-6 border-t border-border space-y-4">
            <a 
              href="/tools/" 
              onClick={() => setIsOpen(false)}
              className="w-full py-5 rounded-[12px] text-lg font-bold bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0D1117] flex items-center justify-center shadow-xl shadow-blue-500/10"
            >
              Explore All Tools
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
