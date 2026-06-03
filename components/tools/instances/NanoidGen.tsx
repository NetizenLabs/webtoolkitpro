'use client'

import React, { useState } from 'react'
import { Zap, RefreshCcw, Copy, Check } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function NanoidGen() {
  const [ids, setIds] = useState<string[]>([])
  const [size, setSize] = useState(21)
  const [count, setCount] = useState(5)
  const [copied, setCopied] = useState(false)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const generate = () => {
    const alphabet = 'usealphabet-2164830957qwertzuiopasdfghjklyxcvbnmWERTZUIOPASDFGHJKLYXCVBNM'
    const actualCount = Math.min(Math.max(1, count), isBulkMode ? 100000 : 1000)
    const newIds = Array.from({ length: actualCount }).map(() => {
      let id = ''
      const randomValues = new Uint8Array(size)
      window.crypto.getRandomValues(randomValues)
      for (let i = 0; i < size; i++) {
        id += alphabet[randomValues[i] % alphabet.length]
      }
      return id
    })
    setIds(newIds)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk NanoID Generator" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-600">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">NanoID Generator</h3>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Length</span>
              <input
                type="number"
                min={1}
                max={64}
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value) || 21)}
                className="w-16 p-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-[#1E2D47] rounded-lg text-[10px] font-bold text-center outline-none"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Quantity {isBulkMode && '(Max 100k)'}</span>
              <input
                type="number"
                min={1}
                max={isBulkMode ? 100000 : 1000}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 5)}
                className="w-20 p-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-[#1E2D47] rounded-lg text-[10px] font-bold text-center outline-none"
              />
            </div>
            <button 
              onClick={generate}
              className="p-3 bg-yellow-500 text-white rounded-xl hover:scale-105 transition-all shadow-lg shadow-yellow-500/20"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {ids.length > 0 && isBulkMode ? (
            <div className="relative group">
              <textarea
                readOnly
                value={ids.join('\n')}
                className="w-full h-96 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-xl text-xs font-mono text-yellow-600 outline-none resize-none"
              />
              <button 
                onClick={() => { navigator.clipboard.writeText(ids.join('\n')); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-[#0D1526] shadow-md rounded-lg hover:text-yellow-500 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          ) : (
            ids.map((id, i) => (
              <div key={i} className="group relative">
                <div className="p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-xl text-xs font-mono text-yellow-600 break-all">
                  {id}
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(id)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 bg-white dark:bg-[#0D1526] shadow-md rounded-lg transition-all"
                >
                  <Copy className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            ))
          )}
          {ids.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-xs font-black uppercase tracking-widest border-2 border-dashed border-gray-100 dark:border-[#1E2D47] rounded-3xl">
              Create secure, URL-friendly IDs
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
