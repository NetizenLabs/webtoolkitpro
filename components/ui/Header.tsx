import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="WebToolkit Pro" width={36} height={36} className="rounded-lg" />
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              WebToolkit<span className="text-blue-600">Pro</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/tools" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">Tools</Link>
            <Link href="/blog" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">Blog</Link>
            <Link href="/about" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
          </nav>

          <Link href="/tools" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-blue-200 transition-all">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
