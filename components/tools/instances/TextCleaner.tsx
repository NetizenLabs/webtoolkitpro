'use client'
import React, { useState } from 'react'
import { Copy, Trash2, Check, Type, Eraser, AlignLeft, RefreshCw } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

export default function TextCleaner() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleClean = () => {
    if (!input) return
    
    let cleaned = input
      .replace(/[ \t]+/g, ' ') // Remove multiple spaces/tabs
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .replace(/^\s+|\s+$/gm, '') // Trim each line
      .trim()
      
    setOutput(cleaned)
    triggerQuickSuccess()
  }

  const handleRemoveLineBreaks = () => {
    if (!input) return
    const cleaned = input.replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ').trim()
    setOutput(cleaned)
    triggerQuickSuccess()
  }

  const handleUpperCase = () => setOutput(input.toUpperCase())
  const handleLowerCase = () => setOutput(input.toLowerCase())

  const handleCopy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <Type className="w-4 h-4 text-emerald-500" /> Raw Text
            </h3>
            <button onClick={handleClear} className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1">
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your messy text here..."
            className="w-full h-[300px] p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none dark:text-slate-200 font-mono text-sm resize-none transition-all"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <Eraser className="w-4 h-4 text-emerald-500" /> Cleaned Text
            </h3>
            {output && (
              <button onClick={handleCopy} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Cleaned text will appear here..."
            className="w-full h-[300px] p-6 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl dark:text-emerald-400 font-mono text-sm resize-none outline-none shadow-inner"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-emerald-900/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button onClick={handleClean} className="p-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
            <AlignLeft className="w-4 h-4" /> Basic Clean
          </button>
          <button onClick={handleRemoveLineBreaks} className="p-4 bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all">
            Remove Line Breaks
          </button>
          <button onClick={handleUpperCase} className="p-4 bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all">
            UPPERCASE
          </button>
          <button onClick={handleLowerCase} className="p-4 bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all">
            lowercase
          </button>
        </div>
      </div>
    </div>
  )
}
