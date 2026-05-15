'use client'

import React, { useState } from 'react'
import { Eraser, Zap, Copy, Check } from 'lucide-react'

export default function WhitespaceRemover() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const clean = () => {
    const res = text.replace(/\s+/g, ' ').trim()
    setResult(res)
  }

  const stripAll = () => {
    setResult(text.replace(/\s/g, ''))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Eraser className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Whitespace Cleaner</h3>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text with excessive spaces or tabs..."
          className="w-full h-32 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm outline-none"
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button onClick={clean} className="py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all">
            Normalize Spaces
          </button>
          <button onClick={stripAll} className="py-4 border border-blue-500 text-blue-600 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-all">
            Strip All Spaces
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Cleaned Text</h3>
            <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2 text-gray-400">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] text-sm leading-relaxed text-gray-600 dark:text-[#8A9BBE]">
            {result}
          </div>
        </div>
      )}
    </div>
  )
}
