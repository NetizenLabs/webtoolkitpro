'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--foreground)]/5 bg-[var(--background)]/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="font-extrabold text-xl tracking-tight flex items-center gap-2 group transition-opacity hover:opacity-80">
          <div className="w-6 h-6 rounded-md bg-[var(--foreground)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[var(--background)]"></div>
          </div>
          Netizen Labs
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-80">
          <Link href="/#services" className="transition-colors hover:text-[var(--accent)] active:scale-95">Services</Link>
          <Link href="/tools" className="transition-colors hover:text-[var(--accent)] active:scale-95">Tools</Link>
          <Link href="/blog" className="transition-colors hover:text-[var(--accent)] active:scale-95">Blog</Link>
        </nav>

        {/* Desktop Action & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link 
            href="/contact" 
            className="hidden md:inline-flex text-sm font-bold px-4 py-2 rounded-full bg-[var(--foreground)] text-[var(--background)] transition-all duration-[160ms] ease-out-custom hover:scale-[1.02] active:scale-[0.97] select-none"
          >
            Book Audit
          </Link>
          <button 
            className="md:hidden p-2 opacity-80 hover:opacity-100"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[var(--background)] border-b border-[var(--foreground)]/5 shadow-xl p-6 flex flex-col gap-6 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4 text-base font-medium opacity-90">
            <Link href="/#services" onClick={() => setIsOpen(false)} className="transition-colors hover:text-[var(--accent)]">Services</Link>
            <Link href="/tools" onClick={() => setIsOpen(false)} className="transition-colors hover:text-[var(--accent)]">Tools</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="transition-colors hover:text-[var(--accent)]">Blog</Link>
          </nav>
          <Link 
            href="/contact" 
            onClick={() => setIsOpen(false)}
            className="text-center text-sm font-bold px-4 py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] transition-all hover:opacity-90 active:scale-[0.98]"
          >
            Book Audit
          </Link>
        </div>
      )}
    </header>
  );
}
