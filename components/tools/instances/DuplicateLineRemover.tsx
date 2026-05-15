'use client'

import React, { useState } from 'react'
import { Filter, Trash2, Copy, Check } from 'lucide-react'

export default function DuplicateLineRemover() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [stats, setStats] = useState<{ original: number; unique: number } | null>(null)
  const [copied, setCopied] = useState(false)

  const process = () => {
    const lines = text.split('\n')
    const unique = [...new Set(lines)]
    setResult(unique.join('\n'))
    setStats({ original: lines.length, unique: unique.length })
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Filter className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Duplicate Line Remover</h3>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste list here (one item per line)..."
          className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono outline-none"
        />

        <button 
          onClick={process}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" /> Remove Duplicates
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm text-center">
            <div className="text-4xl font-black text-gray-900 dark:text-white mb-1">{stats.original - stats.unique}</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-red-500">Duplicates Purged</p>
          </div>
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm text-center">
            <div className="text-4xl font-black text-blue-600 dark:text-[#00D4B4] mb-1">{stats.unique}</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Unique Lines Remaining</p>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Cleaned List</h3>
            <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2 text-gray-400">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] text-xs font-mono text-gray-600 dark:text-[#8A9BBE] overflow-auto max-h-64">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
