'use client'

import React, { useState } from 'react'
import { FileJson, Copy, Trash2, Check } from 'lucide-react'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatJson = () => {
    try {
      if (!input.trim()) return
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (err: any) {
      setError(err.message)
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      if (!input.trim()) return
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (err: any) {
      setError(err.message)
      setOutput('')
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
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="JSON Formatter" slug="json-formatter" />
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20">
            <FileJson className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">JSON Formatter & Validator</h1>
            <p className="text-gray-500 dark:text-slate-400">Clean, format, and validate your JSON data instantly</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Input Raw JSON</label>
              <button 
                onClick={clearAll}
                className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/10 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your messy JSON here..."
              className="w-full h-[500px] p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none dark:text-white transition-all"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Formatted Output</label>
              {output && (
                <button 
                  onClick={handleCopy}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/10 rounded-lg transition-all"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy JSON'}
                </button>
              )}
            </div>
            <div className="relative">
              <textarea
                readOnly
                value={output || error}
                placeholder="Formatted output will appear here..."
                className={`w-full h-[500px] p-6 font-mono text-sm border rounded-3xl shadow-2xl outline-none resize-none transition-all ${
                  error ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400' : 'bg-gray-900 dark:bg-slate-900 text-gray-100 dark:text-emerald-400 border-gray-800 dark:border-slate-800'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={formatJson}
            className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest text-sm"
          >
            Format Pretty
          </button>
          <button
            onClick={minifyJson}
            className="px-10 py-4 bg-gray-800 dark:bg-slate-800 text-white rounded-2xl font-bold hover:bg-gray-900 dark:hover:bg-slate-700 transition-all shadow-lg uppercase tracking-widest text-sm"
          >
            Minify JSON
          </button>
        </div>
        
        <div className="mt-16 h-[90px] bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ad Placement</span>
        </div>
      </div>
    </div>
  )
}
