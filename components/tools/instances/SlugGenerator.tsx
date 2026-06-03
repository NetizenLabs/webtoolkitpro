'use client'

import React, { useState, useCallback } from 'react'
import { Copy, Check, Trash2 } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

const STOP_WORDS = new Set(['a','an','the','and','or','but','in','on','at','to','for','of','with','by','from','is','was','are','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','it','its','this','that','these','those','not','no','so','if','as','up','out','about'])

function toSlug(text: string, options: { separator: string; maxLength: number; removeStopWords: boolean; lowercase: boolean }): string {
  let result = text

  if (options.lowercase) result = result.toLowerCase()

  // Normalize unicode
  result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Remove stop words if enabled
  if (options.removeStopWords) {
    result = result
      .split(/\s+/)
      .filter(w => !STOP_WORDS.has(w.toLowerCase()))
      .join(' ')
  }

  // Replace non-alphanumeric with separator
  result = result
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, options.separator)
    .replace(new RegExp(`${options.separator}+`, 'g'), options.separator)
    .replace(new RegExp(`^${options.separator}|${options.separator}$`, 'g'), '')

  // Max length
  if (options.maxLength && result.length > options.maxLength) {
    result = result.substring(0, options.maxLength)
    const lastSep = result.lastIndexOf(options.separator)
    if (lastSep > 0) result = result.substring(0, lastSep)
  }

  return result
}

const EXAMPLES = [
  'How to Build a REST API in 2026',
  'The Ultimate Guide to CSS Grid Layouts',
  '10 Best Free Developer Tools (Tested & Reviewed)',
  "What Is Machine Learning? A Beginner's Guide",
]

export default function SlugGenerator() {
  const [input, setInput] = useState('')
  const [separator, setSeparator] = useState('-')
  const [maxLength, setMaxLength] = useState(80)
  const [removeStopWords, setRemoveStopWords] = useState(false)
  const [lowercase, setLowercase] = useState(true)
  const [copied, setCopied] = useState(false)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const lines = isBulkMode ? input.split('\n') : [input]
  const slugs = lines.map(line => {
    if (!line.trim()) return ''
    return toSlug(line, { separator, maxLength, removeStopWords, lowercase })
  })
  const slug = slugs.join(isBulkMode ? '\n' : '')

  const copy = () => {
    if (!slug) return
    navigator.clipboard.writeText(slug)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Slug Generator" />
      </div>
      {/* Input */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          Title or Text {isBulkMode && <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-[9px] px-1.5 py-0.5 rounded-full">BULK</span>}
        </label>
        <div className="relative">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={isBulkMode ? "Enter multiple titles, one per line..." : "How to Build a REST API in 2026..."}
            rows={4}
            className="w-full px-5 py-4 bg-[#0D1526] border border-[#1E2D47] rounded-2xl text-white text-sm focus:ring-2 focus:ring-[#00D4B4] outline-none resize-none transition-all placeholder:text-gray-600"
          />
          {input && (
            <button onClick={() => setInput('')} className="absolute top-3 right-3 text-gray-600 hover:text-red-400 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Examples */}
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex, i) => (
            <button key={i} onClick={() => setInput(ex)} className="text-[10px] font-semibold text-gray-500 hover:text-[#00D4B4] px-2.5 py-1 bg-[#0D1526] border border-[#1E2D47] rounded-lg transition-all hover:border-[#00D4B4]/40">
              {ex.length > 30 ? ex.substring(0, 30) + '…' : ex}
            </button>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#0D1526] border border-[#1E2D47] rounded-2xl">
        {/* Separator */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Separator</label>
          <div className="flex gap-2">
            {['-', '_'].map(sep => (
              <button
                key={sep}
                onClick={() => setSeparator(sep)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold font-mono border transition-all ${
                  separator === sep
                    ? 'bg-[#00D4B4]/10 border-[#00D4B4] text-[#00D4B4]'
                    : 'bg-[#0B1120] border-[#1E2D47] text-gray-400'
                }`}
              >
                {sep === '-' ? 'Hyphen (-)' : 'Underscore (_)'}
              </button>
            ))}
          </div>
        </div>

        {/* Max Length */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Max Length</label>
            <span className="text-[10px] font-bold text-[#00D4B4]">{maxLength}</span>
          </div>
          <input type="range" min={20} max={200} value={maxLength} onChange={e => setMaxLength(Number(e.target.value))} className="w-full accent-[#00D4B4]" />
        </div>

        {/* Lowercase */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lowercase</label>
          <button onClick={() => setLowercase(!lowercase)} className={`w-full py-2 rounded-lg text-xs font-bold border transition-all ${lowercase ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-[#0B1120] border-[#1E2D47] text-gray-400'}`}>
            {lowercase ? '✓ Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Stop Words */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stop Words</label>
          <button onClick={() => setRemoveStopWords(!removeStopWords)} className={`w-full py-2 rounded-lg text-xs font-bold border transition-all ${removeStopWords ? 'bg-[#00D4B4]/10 border-[#00D4B4]/30 text-[#00D4B4]' : 'bg-[#0B1120] border-[#1E2D47] text-gray-400'}`}>
            {removeStopWords ? '✓ Remove' : 'Keep All'}
          </button>
        </div>
      </div>

      {/* Output */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Generated Slug</label>
          <span className={`text-[10px] font-bold ${slug.length > maxLength * 0.9 ? 'text-yellow-400' : 'text-gray-600'}`}>{slug.length} chars</span>
        </div>
        <div className="relative flex items-center bg-[#0B1120] border border-[#1E2D47] rounded-2xl overflow-hidden group">
          {!isBulkMode && <span className="px-4 py-4 text-gray-600 font-mono text-sm shrink-0">/</span>}
          <div className={`flex-grow py-4 px-4 font-mono text-sm ${slug ? 'text-[#00D4B4]' : 'text-gray-600'} ${isBulkMode ? 'whitespace-pre overflow-x-auto max-h-64' : ''}`}>
            {slug || 'your-slug-will-appear-here'}
          </div>
          <button onClick={copy} className="shrink-0 flex items-center gap-2 px-5 py-4 bg-[#00D4B4]/10 border-l border-[#1E2D47] text-[#00D4B4] text-xs font-bold hover:bg-[#00D4B4]/20 transition-all">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* SEO Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'SEO Recommendation', value: 'Keep slugs under 75 characters for optimal search visibility.', ok: slug.length > 0 && slug.length <= 75 },
          { label: 'Hyphens vs Underscores', value: 'Google treats hyphens as word separators. Always use hyphens for URL slugs.', ok: separator === '-' },
          { label: 'Keyword First', value: 'Put your primary keyword near the start of the slug for best results.', ok: slug.length > 0 },
        ].map((tip, i) => (
          <div key={i} className="p-4 bg-[#0D1526] border border-[#1E2D47] rounded-xl">
            <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${tip.ok ? 'text-emerald-400' : 'text-gray-500'}`}>{tip.label}</div>
            <p className="text-xs text-gray-400 leading-relaxed">{tip.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
