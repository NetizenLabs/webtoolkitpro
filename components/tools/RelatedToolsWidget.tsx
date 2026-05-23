'use client'

import React from 'react'
import Link from '@/components/ui/NativeLink';
import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import DynamicIcon, { ICON_MAP } from '@/components/ui/DynamicIcon'

interface ToolCard {
  href: string
  name: string
  desc: string
  icon: string
  badge?: string
}

interface RelatedToolsWidgetProps {
  featured: ToolCard
  cards: ToolCard[]
  pills: { name: string; href: string }[]
}

export default function RelatedToolsWidget({ featured, cards, pills }: RelatedToolsWidgetProps) {
  // Function to render icon dynamically if it's a lucide icon name, else return as is (emoji)
  const renderIcon = (iconName: string) => {
    if (ICON_MAP[iconName]) {
      return <DynamicIcon name={iconName} className="w-6 h-6" strokeWidth={1.5} />
    }
    return <span className="text-xl">{iconName}</span>
  }

  return (
    <section className="mt-20 mb-12" aria-label="Related tools">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-blue-500" />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-[#8A9BBE]">
            You might also need
          </h2>
        </div>
        <Link 
          className="text-xs font-bold text-blue-600 dark:text-[#00D4B4] flex items-center gap-1.5 hover:gap-2 transition-all group" 
          href="/tools/"
        >
          Explore Registry <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Featured Card */}
        <Link 
          href={featured.href}
          className="group relative flex flex-col p-6 bg-gradient-to-br from-white to-gray-50 dark:from-[#0D1526] dark:to-[#0B1120] border-2 border-blue-500/20 dark:border-[#00D4B4]/20 rounded-3xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-3">
             <div className="bg-blue-500 dark:bg-[#00D4B4] text-[10px] font-black text-white dark:text-[#0B1120] px-2 py-1 rounded-full uppercase tracking-tighter">
               {featured.badge || 'PRO'}
             </div>
          </div>
          
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-[#00D4B4]/10 flex items-center justify-center mb-4 text-blue-600 dark:text-[#00D4B4] group-hover:scale-110 transition-transform">
            {renderIcon(featured.icon)}
          </div>
          
          <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-[#00D4B4] transition-colors">
            {featured.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed line-clamp-2 font-medium">
            {featured.desc}
          </p>
          
          <div className="mt-4 flex items-center text-[10px] font-bold text-blue-600 dark:text-[#00D4B4] opacity-0 group-hover:opacity-100 transition-opacity">
            OPEN TOOL <ArrowRight className="ml-1 w-3 h-3" />
          </div>
        </Link>

        {/* Other Cards */}
        {cards.map((card, idx) => (
          <Link 
            key={idx} 
            href={card.href}
            className="group flex flex-col p-6 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl transition-all hover:border-blue-500/30 dark:hover:border-[#00D4B4]/30 hover:shadow-xl hover:shadow-blue-500/5"
          >
            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] flex items-center justify-center mb-4 text-gray-600 dark:text-[#F0F6FF] group-hover:bg-blue-50 dark:group-hover:bg-[#00D4B4]/5 group-hover:text-blue-600 dark:group-hover:text-[#00D4B4] transition-all">
              {renderIcon(card.icon)}
            </div>
            
            <h3 className="font-bold text-gray-900 dark:text-white mb-1 transition-colors">
              {card.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed line-clamp-2 font-medium">
              {card.desc}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 dark:border-[#1E2D47]">
        <h4 className="text-[11px] font-bold text-gray-400 dark:text-[#4A6080] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          <Zap className="w-3 h-3" /> More tools in this category
        </h4>
        <div className="flex flex-wrap gap-2">
          {pills.map((pill, idx) => (
            <Link 
              key={idx} 
              href={pill.href}
              className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-[#8A9BBE] bg-gray-50 dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-xl hover:bg-white dark:hover:bg-[#0B1120] hover:text-blue-600 dark:hover:text-[#00D4B4] hover:border-blue-200 dark:hover:border-[#00D4B4]/30 transition-all shadow-sm"
            >
              {pill.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
