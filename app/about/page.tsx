import React from 'react'
import Link from 'next/link'
import { Users, Zap, Shield, Heart, Code2, Globe2, Coffee, Sparkles, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About WebToolkit Pro: Our Mission, Privacy & Developer Tools',
  description: 'Learn about WebToolkit Pro, the free online developer tools platform built for web professionals. Discover our mission, privacy values, and the team behind the tools.',
  alternates: {
    canonical: 'https://wtkpro.site/about/',
  },
}

export default function AboutPage() {
  return (
    <div className="dynamic-padding max-w-4xl mx-auto min-h-screen">
      {/* Organization & AboutPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['AboutPage', 'Organization'],
            'name': 'WebToolkit Pro',
            'url': 'https://wtkpro.site/about',
            'logo': 'https://wtkpro.site/logo.png',
            'description': 'A premium ecosystem of secure, high-performance developer utilities designed for the modern engineering workflow.',
            'founder': {
              '@type': 'Person',
              'name': 'Abu Sufyan',
              'url': 'https://abusufyan.xyz'
            },
            'sameAs': [
              'https://x.com/WebToolkitPro',
              'https://dev.to/webtoolkitpro'
            ]
          })
        }}
      />

      {/* Header Section */}
      <div className="text-center mb-16 pt-12">
        <span className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-[#00D4B4]/10 text-blue-600 dark:text-[#00D4B4] text-[10px] font-bold font-mono uppercase tracking-[0.2em] rounded-full mb-4 border border-blue-100 dark:border-[#00D4B4]/20">
          Our Story
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tighter">
          Engineering the <span className="text-blue-600 dark:text-[#00D4B4]">Future</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-[#8A9BBE] max-w-3xl mx-auto leading-relaxed">
          WebToolkit Pro is a premium ecosystem of 150+ secure, high-performance developer utilities designed for the modern 2026 engineering workflow.
        </p>
      </div>

      {/* Mission Section */}
      <div className="p-8 bg-gray-50 dark:bg-[#0D1526] rounded-[12px] border border-gray-100 dark:border-[#1E2D47] mb-20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-[#00D4B4]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Our Mission</h2>
          <p className="text-gray-600 dark:text-[#8A9BBE] leading-relaxed font-medium">
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
          <div key={pill.title} className="group bg-white dark:bg-[#0D1526] rounded-[12px] border border-gray-100 dark:border-[#1E2D47] p-8 hover:border-blue-500/30 dark:hover:border-[#00D4B4]/30 transition-all duration-300 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-[#00D4B4] dark:to-[#0094FF] rounded-[10px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/10">
              <pill.icon className="w-6 h-6 text-white dark:text-[#0B1120]" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{pill.title}</h3>
            <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed font-medium">{pill.desc}</p>
          </div>
        ))}
      </div>

      {/* Trust Network Section */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white shrink-0">The Trust Network</h2>
          <div className="flex-grow h-px bg-gray-200 dark:bg-[#1E2D47]"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-gray-50 dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
              <Sparkles className="w-12 h-12 text-blue-600 dark:text-[#00D4B4]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">DEVHUB INDEX</h3>
            <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed mb-6 font-medium">
              Our high-velocity satellite hub dedicated to indexing technical documentation, API references, and emerging developer resources.
            </p>
            <a href="https://devhubindex.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-[#00D4B4] uppercase tracking-widest hover:gap-3 transition-all">
              Explore Node <Globe2 className="w-4 h-4" />
            </a>
          </div>

          <div className="p-8 bg-gray-50 dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
              <Zap className="w-12 h-12 text-amber-500 dark:text-[#00D4B4]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">TradeConvert.pro</h3>
            <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed mb-6 font-medium">
              A specialized utility hub for the building trades, providing verified unit conversion and technical reference for construction engineers.
            </p>
            <a href="https://tradeconvert.pro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-[#00D4B4] uppercase tracking-widest hover:gap-3 transition-all">
              Launch Site <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="p-8 bg-gray-50 dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl relative group overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
              <Shield className="w-12 h-12 text-emerald-600 dark:text-[#00D4B4]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Severance Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed mb-6 font-medium">
              A precise, localized legal toolkit designed for navigating global labor law. Provides secure severance calculations for the USA, Canada, and the Philippines.
            </p>
            <a href="https://severancecalculator.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-[#00D4B4] uppercase tracking-widest hover:gap-3 transition-all">
              View Toolkit <Shield className="w-4 h-4" />
            </a>
          </div>

          <div className="p-8 bg-gray-50 dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
              <Coffee className="w-12 h-12 text-indigo-600 dark:text-[#0094FF]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Engineering Leadership</h3>
            <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed mb-4 font-medium">
              Founded and architected by <a href="https://abusufyan.xyz" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-[#00D4B4] transition-colors font-bold">Abu Sufyan</a>, WebToolkit Pro follows strict standards of engineering excellence.
            </p>
            <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed mb-6 font-medium">
              {"Track Abu Sufyan's latest publications, Myers algorithm breakdowns, and badges on CoderLegion (Points: 684 | Badges: 2)."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/author/" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-[#0094FF] uppercase tracking-widest hover:gap-3 transition-all">
                Author Profile <Users className="w-4 h-4" />
              </Link>
              <a href="https://coderlegion.com/user/abusuyfan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-[#00D4B4] uppercase tracking-widest hover:underline">
                CoderLegion <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-20 border-t border-gray-100 dark:border-[#1E2D47]">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Ready to optimize your workflow?</h2>
        <Link href="/tools/" className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-[#00D4B4] dark:to-[#0094FF] text-white dark:text-[#0B1120] px-10 py-4 rounded-[12px] font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
          Explore Directory <Zap className="w-4 h-4 fill-current" />
        </Link>
      </div>
    </div>
  )
}

