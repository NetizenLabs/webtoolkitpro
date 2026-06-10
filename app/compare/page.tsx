import React from 'react'
import { Metadata } from 'next'
import Link from '@/components/ui/NativeLink'
import { COMPARE_DATA } from '@/lib/compare-data'
import { Scale, ArrowRight, Shield, Zap, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Developer Tool Comparisons | WebToolkit Pro',
  description: 'Technical, side-by-side comparisons of popular web development tools, algorithms, and protocols. Find the best solution for your next project.',
  alternates: {
    canonical: 'https://wtkpro.site/compare/',
  }
}

export default function CompareIndexPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 pt-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-purple-200 dark:border-purple-800/50">
            <Scale className="w-4 h-4" /> Technical Comparisons
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Compare Developer Tools
          </h1>
          <p className="text-xl text-gray-500 dark:text-[#8A9BBE] max-w-2xl mx-auto leading-relaxed">
            Side-by-side technical breakdowns of algorithms, protocols, and developer utilities. 
            Make informed architecture decisions based on speed, security, and standards.
          </p>
        </div>

        {/* Feature Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Performance First</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Real-world speed metrics</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Security Audited</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Vulnerability tradeoffs</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center shrink-0">
              <Search className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">SEO Optimized</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Impact on search ranking</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMPARE_DATA.map((item) => (
            <Link
              key={item.slug}
              href={`/compare/${item.slug}/`}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Scale className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest text-gray-500 dark:text-slate-400">
                  Winner: {item.winner}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-sm text-gray-500 dark:text-[#8A9BBE] leading-relaxed mb-8 flex-grow">
                {item.description}
              </p>

              <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100 dark:border-slate-800">
                <span className="text-purple-600 dark:text-purple-400 font-bold uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                  Read Comparison <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
