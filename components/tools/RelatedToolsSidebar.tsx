'use client'

import React from 'react'
import Link from 'next/link'
import { Zap, ArrowRight, Boxes } from 'lucide-react'
import { ToolConfig } from '@/types/tool'

interface RelatedToolsSidebarProps {
  relatedTools: ToolConfig[]
}

export default function RelatedToolsSidebar({ relatedTools }: RelatedToolsSidebarProps) {
  if (relatedTools.length === 0) return null

  return (
    <div className="bg-white dark:bg-[#0D1526] p-6 rounded-3xl border border-gray-100 dark:border-[#1E2D47] shadow-xl transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <Boxes className="w-4 h-4 text-blue-500 dark:text-[#00D4B4]" />
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-[0.1em] text-xs">Related Utilities</h3>
      </div>
      
      <div className="space-y-3">
        {relatedTools.map((tool) => (
          <Link 
            key={tool.slug}
            href={`/tools/${tool.slug}/`}
            className="block group"
          >
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] hover:border-blue-500/30 dark:hover:border-[#00D4B4]/30 transition-all shadow-sm">
              <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#00D4B4] text-sm mb-1 transition-colors">
                {tool.name}
              </h4>
              <p className="text-[11px] text-gray-500 dark:text-[#8A9BBE] line-clamp-1 leading-relaxed font-medium">
                {tool.content?.description || tool.function.primary}
              </p>
              <div className="mt-2 flex items-center gap-1 text-[9px] font-bold text-blue-600 dark:text-[#00D4B4] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                Launch <ArrowRight className="w-3 h-3" strokeWidth={2} />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <Link 
        href="/tools/" 
        className="mt-6 block text-center py-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 dark:hover:text-[#00D4B4] transition-colors border-t border-gray-100 dark:border-[#1E2D47] pt-6"
      >
        Browse Full Catalog
      </Link>
    </div>
  )
}
