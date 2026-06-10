import React from 'react'
import { Metadata } from 'next'
import Link from '@/components/ui/NativeLink'
import { GUIDES_DATA } from '@/lib/guides-data'
import { BookOpen, ArrowRight, Shield, Zap, Search, TerminalSquare, LineChart, Key, Braces } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Developer Guides & Technical Topic Hubs | WebToolkit Pro',
  description: 'Comprehensive developer guides covering JSON, JWT, Regex, Technical SEO, and Web Security. Master modern web development with our expert topic hubs.',
  alternates: {
    canonical: 'https://wtkpro.site/guides/',
  }
}

// Map string icons from config to Lucide components
const IconMap: Record<string, React.ElementType> = {
  Key: Key,
  Braces: Braces,
  TerminalSquare: TerminalSquare,
  LineChart: LineChart,
  Shield: Shield
}

export default function GuidesIndexPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 pt-12">
          <div className="inline-flex items-center gap-2 bg-[#00D4B4]/10 text-[#00D4B4] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-[#00D4B4]/20">
            <BookOpen className="w-4 h-4" /> Technical Hubs
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Comprehensive Topic Guides
          </h1>
          <p className="text-xl text-gray-500 dark:text-[#8A9BBE] max-w-2xl mx-auto leading-relaxed">
            Master complex web development concepts. Our topic hubs aggregate the best tutorials, tools, and technical deep-dives into structured learning paths.
          </p>
        </div>

        {/* Feature Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Curated Paths</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Structured learning flows</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-[#00D4B4]/10 rounded-full flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-[#00D4B4]" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Integrated Tools</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Practice with live utilities</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center shrink-0">
              <Search className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Quick References</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Cheat sheets & core concepts</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {GUIDES_DATA.map((guide) => {
            const Icon = IconMap[guide.icon] || BookOpen
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}/`}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-[#00D4B4]/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4B4]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="w-12 h-12 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00D4B4]/10 transition-all">
                    <Icon className="w-6 h-6 text-gray-500 dark:text-slate-400 group-hover:text-[#00D4B4] transition-colors" />
                  </div>
                  <div className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest text-gray-500 dark:text-slate-400">
                    {guide.articleSlugs.length} Articles
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#00D4B4] transition-colors relative z-10">
                  {guide.title}
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-[#8A9BBE] leading-relaxed mb-8 flex-grow relative z-10">
                  {guide.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100 dark:border-slate-800 relative z-10">
                  <span className="text-[#00D4B4] font-bold uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    Explore Topic Hub <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
