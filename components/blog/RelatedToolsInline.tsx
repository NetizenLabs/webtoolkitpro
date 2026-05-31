import React from 'react'
import Link from '@/components/ui/NativeLink'
import { ToolConfig } from '@/lib/tools'
import DynamicIcon from '@/components/ui/DynamicIcon'
import { ArrowRight, Wrench } from 'lucide-react'

interface RelatedToolsInlineProps {
  tools: ToolConfig[]
}

export default function RelatedToolsInline({ tools }: RelatedToolsInlineProps) {
  if (!tools || tools.length === 0) return null

  return (
    <div className="my-16 p-8 bg-gradient-to-br from-gray-50 to-white dark:from-[#0D1526] dark:to-[#0B1120] rounded-[24px] border border-gray-100 dark:border-[#1E2D47] shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-[#1E2D47] flex items-center justify-center shrink-0">
          <Wrench className="w-5 h-5 text-blue-500 dark:text-[#00D4B4]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Recommended Developer Utilities</h3>
          <p className="text-xs text-gray-500 dark:text-[#8A9BBE] mt-1 font-medium">Free, private, client-side tools relevant to this guide.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link 
            key={tool.slug} 
            href={`/tools/${tool.slug}/`}
            className="group flex flex-col p-5 bg-white dark:bg-[#0A1120] border border-gray-100 dark:border-[#1E2D47] rounded-[16px] hover:border-[#00D4B4]/40 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-[#1E2D47] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <DynamicIcon name={tool.icon || 'Zap'} className="w-4 h-4 text-gray-600 dark:text-[#00D4B4]" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-[#00D4B4] transition-colors">{tool.name}</h4>
            </div>
            <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed flex-grow line-clamp-2 mb-4 font-medium">
              {tool.content?.description || tool.function?.primary}
            </p>
            <div className="flex items-center justify-between text-[10px] font-bold mt-auto">
              <span className="text-gray-400 dark:text-[#4A6080] uppercase tracking-widest">{tool.category}</span>
              <span className="text-blue-500 dark:text-[#00D4B4] uppercase tracking-widest flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                Open Tool <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
