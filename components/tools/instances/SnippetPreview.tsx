'use client'

import React, { useState } from 'react'
import { Search, Globe, MoreVertical, ShieldCheck, Sparkles } from 'lucide-react'

export default function SnippetPreview() {
  const [title, setTitle] = useState('WebToolkit Pro - 150+ Premium Developer Tools')
  const [url, setUrl] = useState('https://wtkpro.site/tools/snippet-preview')
  const [description, setDescription] = useState('Access our free SERP snippet preview tool to see how your website appears in Google search results. Optimize your titles and meta descriptions for better CTR.')

  const titleLength = title.length
  const descLength = description.length

  const getStatusColor = (length: number, max: number) => {
    if (length === 0) return 'text-gray-400'
    if (length > max) return 'text-red-500'
    if (length > max * 0.8) return 'text-amber-500'
    return 'text-emerald-500'
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Editor */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Page Title</label>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${getStatusColor(titleLength, 60)}`}>
                  {titleLength} / 60 characters
                </span>
              </div>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Display URL</label>
              <input 
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl text-xs font-medium text-gray-500 dark:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Meta Description</label>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${getStatusColor(descLength, 160)}`}>
                  {descLength} / 160 characters
                </span>
              </div>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-32 p-4 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl text-sm font-medium dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest px-4 block">Google Desktop Preview</label>
          
          <div className="bg-white dark:bg-[#171717] p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5 space-y-1">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-7 h-7 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
                <Globe className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#202124] dark:text-[#bdc1c6] font-medium leading-none mb-0.5">wtkpro.site</span>
                <span className="text-[10px] text-[#4d5156] dark:text-[#9aa0a6] leading-none">{url}</span>
              </div>
              <MoreVertical className="w-4 h-4 text-gray-400 ml-auto" />
            </div>
            
            <h3 className="text-xl text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-tight mb-1">
              {title || 'Enter a page title...'}
            </h3>
            
            <p className="text-sm text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed line-clamp-2 max-w-[600px]">
              {description || 'Enter a meta description to see how it will appear in search results. Optimization is key for CTR.'}
            </p>
          </div>

          <div className="p-8 bg-[#0B1120] border border-[#1E2D47] rounded-[2rem] mt-8">
            <div className="flex items-center gap-4 mb-4">
              <Sparkles className="w-6 h-6 text-[#00D4B4]" />
              <h5 className="text-sm font-bold text-white tracking-tight uppercase">CTR Optimization</h5>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              A well-crafted title and meta description don&apos;t just help with rankings—they are your <span className="text-white font-bold">Marketing Pitch</span>. Use this tool to ensure your snippets are not truncated and that they drive maximum clicks.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
