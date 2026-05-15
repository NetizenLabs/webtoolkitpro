'use client'

import React, { useState } from 'react'
import { Split, Copy, Trash2, Check, RefreshCw, ArrowRightLeft, FileCode } from 'lucide-react'

export default function CodeDiff() {
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [diffResult, setDiffResult] = useState<{ type: 'added' | 'removed' | 'unchanged', text: string }[][] | null>(null)

  const computeDiff = () => {
    const originalLines = original.split('\n')
    const modifiedLines = modified.split('\n')
    
    // Simple line-by-line comparison (not LCS, but useful for quick checks)
    const result: { type: 'added' | 'removed' | 'unchanged', text: string }[][] = []
    
    const maxLines = Math.max(originalLines.length, modifiedLines.length)
    
    for (let i = 0; i < maxLines; i++) {
      const orig = originalLines[i]
      const mod = modifiedLines[i]
      
      if (orig === mod) {
        result.push([{ type: 'unchanged', text: orig || ' ' }])
      } else {
        if (orig !== undefined && mod !== undefined) {
          result.push([
            { type: 'removed', text: orig || ' ' },
            { type: 'added', text: mod || ' ' }
          ])
        } else if (orig !== undefined) {
          result.push([{ type: 'removed', text: orig }])
        } else if (mod !== undefined) {
          result.push([{ type: 'added', text: mod }])
        }
      }
    }
    setDiffResult(result)
  }

  const clearAll = () => {
    setOriginal('')
    setModified('')
    setDiffResult(null)
  }

  return (
    <div className="space-y-8">
      {!diffResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest px-2">Original Code</label>
            <textarea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder="Paste original code here..."
              className="w-full h-[500px] p-6 font-mono text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm focus:ring-2 focus:ring-red-500/20 outline-none resize-none dark:text-white transition-all"
            />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest px-2">Modified Code</label>
            <textarea
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              placeholder="Paste modified code here..."
              className="w-full h-[500px] p-6 font-mono text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none dark:text-white transition-all"
            />
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="p-4 bg-gray-800/50 border-b border-gray-700 flex justify-between items-center">
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500/20 rounded-sm border border-red-500/50"></div> <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Removed</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500/20 rounded-sm border border-emerald-500/50"></div> <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Added</span></div>
            </div>
            <button onClick={() => setDiffResult(null)} className="text-xs font-bold text-gray-400 hover:text-white transition-all flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Edit Code
            </button>
          </div>
          <div className="p-8 font-mono text-xs overflow-auto max-h-[600px] custom-scrollbar space-y-0.5">
            {diffResult.map((lineSet, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                {lineSet.map((line, j) => (
                  <div 
                    key={j} 
                    className={`px-4 py-1 flex gap-4 ${
                      line.type === 'removed' ? 'bg-red-500/10 text-red-400 border-l-4 border-red-500' :
                      line.type === 'added' ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500' :
                      'text-gray-500 border-l-4 border-transparent'
                    }`}
                  >
                    <span className="w-8 shrink-0 opacity-30 text-right select-none">{i + 1}</span>
                    <span className="w-4 shrink-0 opacity-50 select-none">{line.type === 'removed' ? '-' : line.type === 'added' ? '+' : ' '}</span>
                    <span className="whitespace-pre">{line.text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4">
        {!diffResult ? (
          <button
            onClick={computeDiff}
            className="px-12 py-5 bg-[#00D4B4] text-[#0B1120] rounded-[2rem] font-black hover:scale-105 transition-all shadow-xl shadow-[#00D4B4]/20 uppercase tracking-widest text-sm flex items-center gap-3"
          >
            <Split className="w-5 h-5" /> Compare Code
          </button>
        ) : null}
        <button
          onClick={clearAll}
          className="px-12 py-5 bg-gray-100 dark:bg-slate-900 text-gray-500 dark:text-slate-400 rounded-[2rem] font-bold hover:bg-gray-200 transition-all uppercase tracking-widest text-sm flex items-center gap-3 border border-gray-200 dark:border-slate-800"
        >
          <Trash2 className="w-5 h-5" /> Clear All
        </button>
      </div>

      <div className="p-8 bg-blue-50 dark:bg-blue-900/5 border border-blue-100 dark:border-blue-900/20 rounded-[2rem] flex items-start gap-6">
        <FileCode className="w-8 h-8 text-blue-500 shrink-0" />
        <div>
          <h5 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-2 tracking-tight uppercase">High-Performance Diff Engine</h5>
          <p className="text-sm text-blue-800/70 dark:text-blue-500/70 leading-relaxed font-medium">
            Our diffing engine performs a line-by-line comparison of your source files. Ideal for tracking configuration changes, code refactors, or identifying subtle bugs between versions. All processing is <span className="font-bold">100% Client-Side</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
