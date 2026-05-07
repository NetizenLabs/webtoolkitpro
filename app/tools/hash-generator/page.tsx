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
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <BreadcrumbSchema name="Hash Generator" slug="hash-generator" />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-slate-500 to-slate-700 rounded-xl"><Shield className="w-8 h-8 text-white" /></div>
          <div><h1 className="text-3xl font-bold text-gray-900">Hash Generator</h1><p className="text-gray-500">Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes from any text</p></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm mb-6">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to hash..." className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 outline-none resize-none mb-4" />
          <button onClick={generate} className="w-full py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-900 transition-all mb-8">Generate Hashes</button>
          {Object.keys(hashes).length > 0 && (
            <div className="space-y-4">
              {Object.entries(hashes).map(([algo, hash]) => (
                <div key={algo} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-700">{algo}</span>
                    <button onClick={() => handleCopy(algo)} className="text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1">
                      {copied===algo ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied===algo?'Copied':'Copy'}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-gray-600 break-all">{hash}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="h-[90px]">{/* AdSense slot */}</div>
      </div>
    </div>
  )
}
