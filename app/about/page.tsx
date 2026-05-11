import React from 'react'
import Link from 'next/link'
import { Users, Zap, Shield, Heart, Code2, Globe2, Coffee, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'About Us - WebToolkit Pro',
  description: 'Learn about WebToolkit Pro, the free online developer tools platform built for web professionals. Discover our mission, privacy values, and the team behind the tools.',
  alternates: {
    canonical: 'https://wtkpro.site/about/',
  },
}

export default function AboutPage() {
  return (
    <div className="dynamic-padding max-w-4xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-16 pt-12">
        <span className="inline-block px-4 py-1.5 bg-[#00D4B4]/10 text-[#00D4B4] text-[10px] font-bold font-mono uppercase tracking-[0.2em] rounded-full mb-4 border border-[#00D4B4]/20">
          Our Story
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-[#1E2D47] dark:text-white mb-6 tracking-tighter">
          Engineering the <span className="text-[#00D4B4]">Future</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-[#8A9BBE] max-w-3xl mx-auto leading-relaxed">
          WebToolkit Pro is a premium ecosystem of 65+ secure, high-performance developer utilities designed for the modern engineering workflow.
        </p>
      </div>

      {/* Mission Section */}
      <div className="p-8 bg-gray-50 dark:bg-[#0D1526] rounded-[12px] border border-gray-100 dark:border-[#1E2D47] mb-20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4B4]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
            To eliminate the friction of modern web development by providing a suite of professional-grade, private, and lightning-fast tools that live where you work—in the browser.
          </p>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {[
          { 
            icon: Zap, 
            title: 'Zero Latency', 
            desc: 'Every tool is optimized for speed. No server round-trips mean instant results even on slow connections.' 
          },
          { 
            icon: Shield, 
            title: 'Privacy First', 
            desc: 'We never see your data. Our tools use client-side JavaScript to process everything locally in your browser.' 
          },
          { 
            icon: Globe2, 
            title: 'Global Scale', 
            desc: 'Designed to be lightweight and accessible from anywhere in the world, on any device.' 
          },
          { 
            icon: Code2, 
            title: 'Built for Pros', 
            desc: 'No fluff. Just the essential tools you need for modern web development, API testing, and design.' 
          },
        ].map((pill) => (
          <div key={pill.title} className="group bg-white dark:bg-[#0D1526] rounded-[12px] border border-gray-100 dark:border-[#1E2D47] p-8 hover:border-[#00D4B4]/30 transition-all duration-300 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00D4B4] to-[#0094FF] rounded-[10px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/10">
              <pill.icon className="w-6 h-6 text-[#0B1120]" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-[#1E2D47] dark:text-white mb-2">{pill.title}</h3>
            <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed font-medium">{pill.desc}</p>
          </div>
        ))}
      </div>

      {/* Trust Network Section */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-white shrink-0">The Trust Network</h2>
          <div className="flex-grow h-px bg-[#1E2D47]"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-[#0D1526] border border-[#1E2D47] rounded-3xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles className="w-12 h-12 text-[#00D4B4]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">DEVHUB INDEX</h3>
            <p className="text-sm text-[#8A9BBE] leading-relaxed mb-6 font-medium">
              Our high-velocity satellite hub dedicated to indexing technical documentation, API references, and emerging developer resources.
            </p>
            <a href="https://devhubindex.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-[#00D4B4] uppercase tracking-widest hover:gap-3 transition-all">
              Explore Node <Globe2 className="w-4 h-4" />
            </a>
          </div>

          <div className="p-8 bg-[#0D1526] border border-[#1E2D47] rounded-3xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Coffee className="w-12 h-12 text-[#0094FF]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Engineering Leadership</h3>
            <p className="text-sm text-[#8A9BBE] leading-relaxed mb-6 font-medium">
              Founded and architected by <a href="https://abusufyan.xyz" className="text-white hover:text-[#00D4B4] transition-colors">Abu Sufyan</a>, WebToolkit Pro follows a strict standard of engineering excellence and privacy-first design.
            </p>
            <Link href="/author/" className="inline-flex items-center gap-2 text-xs font-bold text-[#0094FF] uppercase tracking-widest hover:gap-3 transition-all">
              Author Profile <Users className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-20 border-t border-[#1E2D47]">
        <h2 className="text-3xl font-bold text-[#1E2D47] dark:text-white mb-8 tracking-tight">Ready to optimize your workflow?</h2>
        <Link href="/tools/" className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] px-10 py-4 rounded-[12px] font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all">
          Explore Directory <Zap className="w-4 h-4 fill-current" />
        </Link>
      </div>
    </div>
  )
}

