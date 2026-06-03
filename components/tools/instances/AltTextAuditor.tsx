'use client'

import React, { useState } from 'react'
import { ImageIcon, AlertCircle, CheckCircle2, Search, Trash2, Info, Eye } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function AltTextAuditor() {
  const [html, setHtml] = useState('')
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [results, setResults] = useState<{ snippetIdx?: number; src: string; alt: string; status: 'pass' | 'fail' | 'warn'; issue?: string }[]>([])

  const auditAltTags = () => {
    let snippets = isBulkMode ? html.split('---') : [html]
    let allResults: any[] = []

    snippets.forEach((snippet, idx) => {
      if (!snippet.trim()) return
      const parser = new DOMParser()
      const doc = parser.parseFromString(snippet, 'text/html')
      const images = Array.from(doc.querySelectorAll('img'))
      
      const auditResults = images.map(img => {
        const src = img.getAttribute('src') || 'Unknown Source'
        const alt = img.getAttribute('alt')
        
        let status: 'pass' | 'fail' | 'warn' = 'pass'
        let issue = ''

        if (alt === null) {
          status = 'fail'
          issue = 'Missing ALT attribute (CRITICAL)'
        } else if (alt.trim() === '') {
          status = 'warn'
          issue = 'Empty ALT tag (Use only for decorative images)'
        } else if (alt.length > 125) {
          status = 'warn'
          issue = 'Alt text too long (>125 chars)'
        } else if (/^(image|img|picture|photo)/i.test(alt.trim())) {
          status = 'warn'
          issue = 'Redundant words like "image of" detected'
        }

        return { snippetIdx: isBulkMode ? idx + 1 : undefined, src, alt: alt || '[None]', status, issue }
      })
      allResults = [...allResults, ...auditResults]
    })

    setResults(allResults)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Alt Auditor" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Image Alt-Text Auditor</h3>
        </div>

        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder={isBulkMode ? `<img src="1.jpg">\n---\n<img src="2.jpg">` : `<div class="gallery">\n  <img src="banner.jpg" alt="Summer Sale 2025">\n  <img src="icon.png">\n</div>`}
          className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono outline-none"
        />

        <button 
          onClick={auditAltTags}
          className="w-full mt-6 py-4 bg-orange-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" /> Analyze Accessibility
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Detected Images ({results.length})</h4>
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-500">
                <CheckCircle2 className="w-3 h-3" /> {results.filter(r => r.status === 'pass').length} Pass
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-red-500">
                <AlertCircle className="w-3 h-3" /> {results.filter(r => r.status === 'fail').length} Fail
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl overflow-hidden">
            <div className="divide-y divide-gray-50 dark:divide-[#1E2D47]">
              {results.map((res, i) => (
                <div key={i} className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-black/5">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    {res.snippetIdx && <div className="text-[9px] font-black uppercase text-blue-500 mb-1">Snippet #{res.snippetIdx}</div>}
                    <div className="text-[10px] font-mono text-blue-600 truncate">{res.src}</div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">ALT: <span className={res.status === 'fail' ? 'text-red-500 italic' : ''}>{res.alt}</span></div>
                    {res.issue && <div className={`text-[10px] font-black uppercase tracking-widest mt-2 ${res.status === 'fail' ? 'text-red-500' : 'text-yellow-600'}`}>{res.issue}</div>}
                  </div>
                  <div className="shrink-0">
                    {res.status === 'pass' ? (
                      <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[8px] font-black uppercase">Optimized</div>
                    ) : (
                      <div className={`px-3 py-1 ${res.status === 'fail' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-600'} rounded-full text-[8px] font-black uppercase`}>Action Required</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
