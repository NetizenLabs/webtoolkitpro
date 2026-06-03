'use client'
import React, { useState } from 'react'
import { Copy, ArrowRightLeft, Check, Trash2 } from 'lucide-react'

import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function UrlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const encode = () => {
    if (isBulkMode) {
      setOutput(input.split('\n').map(line => line.trim() ? encodeURIComponent(line) : '').join('\n'))
    } else {
      setOutput(encodeURIComponent(input))
    }
  }

  const decode = () => {
    if (isBulkMode) {
      setOutput(input.split('\n').map(line => {
        if (!line.trim()) return ''
        try { return decodeURIComponent(line) } catch { return 'Error: Invalid encoding' }
      }).join('\n'))
    } else {
      try { setOutput(decodeURIComponent(input)) } catch { setOutput('Error: Invalid encoding') }
    }
  }

  const handleCopy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const swap = () => { setInput(output); setOutput('') }
  const clearAll = () => { setInput(''); setOutput('') }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-4">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk URL Operations" />
        <button onClick={clearAll} className="flex items-center gap-2 px-4 py-2 text-red-500 font-bold text-xs hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /> Clear</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 flex items-center gap-2">
            Source URI {isBulkMode && <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-[9px] px-1.5 py-0.5 rounded-full">BULK</span>}
          </label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={isBulkMode ? "Paste multiple URLs (one per line)..." : "Paste URL..."} className="w-full h-80 p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] outline-none resize-none dark:text-white shadow-sm whitespace-pre" />
          <div className="grid grid-cols-2 gap-4">
            <button onClick={encode} className="py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg uppercase tracking-widest text-xs">Encode</button>
            <button onClick={decode} className="py-4 bg-gray-800 dark:bg-slate-800 text-white rounded-2xl font-bold hover:bg-gray-900 transition-all shadow-lg uppercase tracking-widest text-xs">Decode</button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Output</label>
            <div className="flex gap-2">
              <button onClick={swap} className="p-2.5 text-gray-400 hover:text-emerald-600 rounded-xl" title="Swap"><ArrowRightLeft className="w-5 h-5" /></button>
              {output && <button onClick={handleCopy} className="p-2.5 text-gray-400 hover:text-emerald-600 rounded-xl">{copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}</button>}
            </div>
          </div>
          <textarea readOnly value={output} placeholder="Result..." className="w-full h-[26rem] p-6 font-mono text-sm bg-gray-900 dark:bg-slate-950 text-gray-100 dark:text-emerald-400 border border-gray-800 rounded-[2.5rem] outline-none resize-none shadow-2xl" />
        </div>
      </div>
    </div>
  )
}
