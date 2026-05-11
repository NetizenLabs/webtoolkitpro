'use client'

import React from 'react'
import Link from 'next/link'
import { Zap, ArrowRight } from 'lucide-react'
import { ToolConfig } from '@/types/tool'

interface RelatedToolsSidebarProps {
  relatedTools: ToolConfig[]
}

export default function RelatedToolsSidebar({ relatedTools }: RelatedToolsSidebarProps) {
  if (relatedTools.length === 0) return null

  return (
    <div className="bg-[#0D1526] p-8 rounded-[12px] border border-[#1E2D47] shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <Zap className="w-5 h-5 text-[#00D4B4]" strokeWidth={1.5} />
        <h3 className="font-bold text-white uppercase tracking-[0.1em] text-xs">Related Utilities</h3>
      </div>
      
      <div className="space-y-4">
        {relatedTools.map((tool) => (
          <Link 
            key={tool.slug}
            href={`/tools/${tool.slug}/`}
            className="block group"
          >
            <div className="p-5 rounded-[12px] bg-[#0B1120] border border-[#1E2D47] hover:border-[#00D4B4]/30 transition-all">
              <h4 className="font-bold text-white group-hover:text-[#00D4B4] text-sm mb-1 transition-colors">
                {tool.name}
              </h4>
              <p className="text-xs text-[#8A9BBE] line-clamp-1 leading-relaxed">
                {tool.content.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-[10px] font-mono font-bold text-[#00D4B4] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                Launch Tool <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

