'use client'

import React, { useState } from 'react'
import { Link2, Sparkles, Copy, Check, RotateCcw } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function SlugOptimizer() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [copied, setCopied] = useState(false)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const optimizeSlug = () => {
    const processStr = (s: string) => s
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

    if (isBulkMode) {
      const lines = title.split('\n')
      const resultLines = lines.map(line => {
        if (!line.trim()) return ''
        return processStr(line)
      })
      setSlug(resultLines.join('\n'))
    } else {
      setSlug(processStr(title))
    }
  }

  const copySlug = () => {
    navigator.clipboard.writeText(slug)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Slug Optimizer" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">URL Slug Optimizer</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-1">Page Title</label>
            {isBulkMode ? (
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 10 Best SEO Tools for 2026! (one per line)"
                className="w-full h-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none focus:ring-2 focus:ring-blue-500/20 resize-none font-mono"
              />
            ) : (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 10 Best SEO Tools for 2026!"
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            )}
          </div>
          <button 
            onClick={optimizeSlug}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-all"
          >
            Optimize Slug
          </button>
        </div>
      </div>

      {slug && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">SEO-Friendly URL</h3>
            <button onClick={copySlug} className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex items-start gap-2 p-4 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47]">
            <Link2 className="w-4 h-4 text-gray-400 mt-1" />
            {isBulkMode ? (
              <textarea
                readOnly
                value={slug}
                className="w-full h-32 bg-transparent text-sm font-mono text-blue-600 dark:text-[#00D4B4] outline-none resize-none whitespace-pre"
              />
            ) : (
              <span className="text-sm font-mono text-blue-600 dark:text-[#00D4B4]">{slug}</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
