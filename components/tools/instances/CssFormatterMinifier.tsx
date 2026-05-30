'use client'

import React, { useState } from 'react'
import { FileCode, Play, Copy, RefreshCw, AlertCircle } from 'lucide-react'

export default function CssFormatterMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({ original: 0, new: 0, saved: 0 })

  const formatCSS = () => {
    try {
      setError(null)
      if (!input.trim()) return
      
      // Basic CSS formatting logic
      let formatted = input
        .replace(/\s+/g, ' ')
        .replace(/{\s*/g, ' {\n  ')
        .replace(/;\s*/g, ';\n  ')
        .replace(/, /g, ',\n  ')
        .replace(/}\s*/g, '}\n\n')
        .replace(/\n  }/g, '\n}')
        .trim()
      
      setOutput(formatted)
      updateStats(input, formatted)
    } catch (e: any) {
      setError('Error formatting CSS')
    }
  }

  const minifyCSS = () => {
    try {
      setError(null)
      if (!input.trim()) return
      
      // Basic CSS minification logic
      let minified = input
        .replace(/\/\*.*?\*\//g, '') // remove comments
        .replace(/\s+/g, ' ')           // collapse whitespace
        .replace(/\s*\{\s*/g, '{')      // remove whitespace around {
        .replace(/\s*\}\s*/g, '}')      // remove whitespace around }
        .replace(/\s*;\s*/g, ';')      // remove whitespace around ;
        .replace(/\s*:\s*/g, ':')      // remove whitespace around :
        .replace(/;}/g, '}')             // remove trailing semicolon
        .trim()
        
      setOutput(minified)
      updateStats(input, minified)
    } catch (e: any) {
      setError('Error minifying CSS')
    }
  }

  const updateStats = (orig: string, result: string) => {
    const oLen = new Blob([orig]).size
    const nLen = new Blob([result]).size
    setStats({
      original: oLen,
      new: nLen,
      saved: oLen > 0 ? ((oLen - nLen) / oLen) * 100 : 0
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <button onClick={formatCSS} className="flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
          <FileCode className="w-4 h-4" /> Format (Prettify)
        </button>
        <button onClick={minifyCSS} className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors">
          <Play className="w-4 h-4" /> Minify (Compress)
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-500/10 p-4 rounded-xl">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Input CSS</span>
            <span className="text-xs text-gray-500 font-mono">{stats.original} bytes</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="/* Paste your CSS here */"
            className="flex-grow w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-mono outline-none dark:text-gray-300 resize-none"
          />
        </div>

        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Output CSS</span>
            <div className="flex items-center gap-4">
              {stats.saved !== 0 && (
                <span className={`text-xs font-bold ${stats.saved > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stats.saved > 0 ? '-' : '+'}{Math.abs(stats.saved).toFixed(1)}% ({stats.new} bytes)
                </span>
              )}
              <button onClick={() => navigator.clipboard.writeText(output)} className="text-gray-400 hover:text-blue-500">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            className="flex-grow w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-transparent rounded-2xl text-sm font-mono outline-none dark:text-gray-300 resize-none"
          />
        </div>
      </div>
    </div>
  )
}
