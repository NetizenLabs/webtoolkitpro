'use client'
import React, { useState } from 'react'
import { Type, Copy, Check } from 'lucide-react'

export default function CaseConverter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  const convert = (fn: (s: string) => string) => setText(fn(text))
  const handleCopy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const toTitleCase = (s: string) => s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase())
  const toSentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
  const toAlternating = (s: string) => s.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('')
  const toSlug = (s: string) => s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')

  const buttons = [
    { label: 'UPPERCASE', fn: (s: string) => s.toUpperCase() },
    { label: 'lowercase', fn: (s: string) => s.toLowerCase() },
    { label: 'Title Case', fn: toTitleCase },
    { label: 'Sentence case', fn: toSentenceCase },
    { label: 'aLtErNaTiNg', fn: toAlternating },
    { label: 'slug-case', fn: toSlug },
  ]

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl"><Type className="w-8 h-8 text-white" /></div>
          <div><h1 className="text-3xl font-bold text-gray-900">Case Converter</h1><p className="text-gray-500">Convert text between different letter cases instantly</p></div>
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste your text here..." className="w-full h-56 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none resize-none mb-6" />
        <div className="flex flex-wrap gap-3 mb-6">
          {buttons.map(b => (
            <button key={b.label} onClick={() => convert(b.fn)} className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all">{b.label}</button>
          ))}
          <button onClick={handleCopy} className="px-5 py-2.5 bg-cyan-600 text-white rounded-xl font-semibold text-sm hover:bg-cyan-700 transition-all flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className="h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space</div>
      </div>
    </div>
  )
}
