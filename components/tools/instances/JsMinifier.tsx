'use client'
import React, { useState } from 'react'
import { Code2, Copy, Trash2, Check, Zap } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function JsMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const minifyJs = () => {
    if (!input.trim()) return
    
    if (isBulkMode) {
      const blocks = input.split('\n\n')
      const results = blocks.map(block => {
        if (!block.trim()) return ''
        return block
          .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1')
          .replace(/\s+/g, ' ')
          .replace(/\s*([{};,])\s*/g, '$1')
          .trim()
      })
      setOutput(results.join('\n\n'))
    } else {
      let minified = input
        .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{};,])\s*/g, '$1')
        .trim()
      setOutput(minified)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk JS Minifier" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              Source Code (JS) {isBulkMode && <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-[9px] px-1.5 py-0.5 rounded-full">BULK</span>}
            </label>
            <button onClick={clearAll} className="text-xs font-bold text-red-500 flex items-center gap-1.5"><Trash2 className="w-4 h-4" /> Clear</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isBulkMode ? "function a() { ... }\n\nfunction b() { ... }\n(Separate snippets with double newlines)" : "function dev() { console.log('hello'); }"}
            className="w-full h-96 p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] focus:ring-2 focus:ring-yellow-500 outline-none resize-none dark:text-white"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Minified Output</label>
            {output && (
              <button onClick={handleCopy} className="text-xs font-bold text-yellow-600 flex items-center gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Minified code..."
            className="w-full h-96 p-6 font-mono text-sm bg-gray-900 dark:bg-slate-950 text-yellow-400 border border-gray-800 dark:border-slate-800 rounded-[2.5rem] outline-none resize-none"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={minifyJs}
          disabled={!input.trim()}
          className="px-12 py-5 bg-yellow-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-3 uppercase tracking-widest text-xs"
        >
          Compress Script <Zap className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  )
}
