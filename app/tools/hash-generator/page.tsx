'use client'
import React, { useState } from 'react'
import { Shield, Copy, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<{[k:string]:string}>({})
  const [copied, setCopied] = useState<string|null>(null)

  const generate = async () => {
    if (!input) return
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const results: {[k:string]:string} = {}
    for (const algo of ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']) {
      const buf = await crypto.subtle.digest(algo, data)
      results[algo] = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
    }
    setHashes(results)
  }

  const handleCopy = (key: string) => { navigator.clipboard.writeText(hashes[key]); setCopied(key); setTimeout(() => setCopied(null), 2000) }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Hash Generator" slug="hash-generator" />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-slate-500 to-slate-700 rounded-2xl shadow-lg shadow-slate-500/20">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Hash Generator</h1>
            <p className="text-gray-500 dark:text-slate-400">Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes from any text</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm mb-6">
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Enter text to hash..." 
            className="w-full h-32 p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-slate-500 outline-none resize-none mb-4 dark:text-white" 
          />
          <button onClick={generate} className="w-full py-4 bg-slate-800 dark:bg-slate-700 text-white rounded-2xl font-bold hover:bg-slate-900 dark:hover:bg-slate-600 transition-all shadow-lg mb-8">Generate Secure Hashes</button>
          
          {Object.keys(hashes).length > 0 && (
            <div className="space-y-4">
              {Object.entries(hashes).map(([algo, hash]) => (
                <div key={algo} className="p-5 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 transition-all group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{algo} Algorithm</span>
                    <button onClick={() => handleCopy(algo)} className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white flex items-center gap-1.5 font-bold transition-colors">
                      {copied===algo ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} 
                      <span>{copied===algo ? 'Copied' : 'Copy Hash'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-sm text-gray-600 dark:text-slate-300 break-all bg-white dark:bg-slate-900 p-3 rounded-xl border border-gray-100 dark:border-slate-800">{hash}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="h-[90px] bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ad Placement</span>
        </div>
      </div>
    </div>
  )
}
