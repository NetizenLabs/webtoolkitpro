'use client'

import React, { useState } from 'react'
import { Layout, Search, BarChart3, Info, Trash2, ShieldCheck, Zap, Layers, FileCode } from 'lucide-react'

export default function DomAnalyzer() {
  const [html, setHtml] = useState('<div class="header">\n  <h1>Welcome</h1>\n  <nav>\n    <ul>\n      <li><a href="/">Home</a></li>\n      <li><a href="/about">About</a></li>\n    </ul>\n  </nav>\n</div>')
  const [stats, setStats] = useState<any>(null)
  const [error, setError] = useState('')

  const analyzeDom = () => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      
      const allElements = doc.querySelectorAll('*')
      const tagMap: Record<string, number> = {}
      let depth = 0
      let maxDepth = 0

      allElements.forEach(el => {
        const tag = el.tagName.toLowerCase()
        tagMap[tag] = (tagMap[tag] || 0) + 1
        
        let d = 0
        let current: any = el
        while (current.parentElement) {
          d++
          current = current.parentElement
        }
        maxDepth = Math.max(maxDepth, d)
      })

      setStats({
        totalElements: allElements.length,
        maxDepth,
        uniqueTags: Object.keys(tagMap).length,
        tagBreakdown: Object.entries(tagMap).sort((a, b) => b[1] - a[1]),
        ids: Array.from(doc.querySelectorAll('[id]')).map(el => el.id),
        classes: Array.from(new Set(Array.from(allElements).flatMap(el => Array.from(el.classList))))
      })
      setError('')
    } catch (e: any) {
      setError(e.message)
      setStats(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <FileCode className="w-4 h-4" /> HTML Source
            </label>
            <button onClick={() => setHtml('')} className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Clear</button>
          </div>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="w-full h-[500px] p-6 font-mono text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] outline-none resize-none dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
            placeholder="Paste your HTML here..."
          />
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Structural Insights
            </label>
          </div>

          <div className="bg-[#0B1120] border border-[#1E2D47] rounded-[2.5rem] p-8 h-[500px] overflow-auto custom-scrollbar shadow-2xl">
            {!stats ? (
              <div className="h-full flex items-center justify-center text-slate-500 font-mono text-xs">Click analyze to generate insights</div>
            ) : (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-[10px] font-bold text-[#00D4B4] uppercase block mb-1">Total Elements</span>
                    <span className="text-2xl font-black text-white">{stats.totalElements}</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-[10px] font-bold text-blue-400 uppercase block mb-1">Max Depth</span>
                    <span className="text-2xl font-black text-white">{stats.maxDepth}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/10 pb-2">Tag Breakdown</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {stats.tagBreakdown.map(([tag, count]: any) => (
                      <div key={tag} className="flex justify-between items-center px-3 py-2 bg-white/5 rounded-lg">
                        <span className="text-xs font-mono text-blue-400">&lt;{tag}&gt;</span>
                        <span className="text-xs font-bold text-white">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">Classes ({stats.classes.length})</h5>
                  <div className="flex flex-wrap gap-2">
                    {stats.classes.slice(0, 20).map((cls: string) => (
                      <span key={cls} className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-mono border border-emerald-500/20">.{cls}</span>
                    ))}
                    {stats.classes.length > 20 && <span className="text-[10px] text-gray-500 font-bold">+{stats.classes.length - 20} more</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={analyzeDom}
          className="px-12 py-5 bg-[#00D4B4] text-[#0B1120] rounded-[2rem] font-black hover:scale-105 transition-all shadow-xl shadow-[#00D4B4]/20 uppercase tracking-widest text-xs flex items-center gap-3"
        >
          <Layers className="w-4 h-4" /> Analyze DOM Structure
        </button>
      </div>
    </div>
  )
}
