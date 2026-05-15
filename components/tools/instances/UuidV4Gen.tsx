'use client'

import React, { useState } from 'react'
import { Fingerprint, RefreshCcw, Copy, Check } from 'lucide-react'

export default function UuidV4Gen() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(5)
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const newUuids = Array.from({ length: count }).map(() => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    })
    setUuids(newUuids)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
              <Fingerprint className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">UUID v4 Generator</h3>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-16 p-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-[#1E2D47] rounded-lg text-xs font-bold text-center outline-none"
            />
            <button 
              onClick={generate}
              className="p-3 bg-blue-600 text-white rounded-xl hover:scale-105 transition-all shadow-lg shadow-blue-500/20"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {uuids.map((id, i) => (
            <div key={i} className="group relative">
              <div className="p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-xl text-xs font-mono text-blue-600 dark:text-[#00D4B4] break-all">
                {id}
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(id)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 bg-white dark:bg-[#0D1526] shadow-md rounded-lg transition-all"
              >
                <Copy className="w-3 h-3 text-gray-400" />
              </button>
            </div>
          ))}
          {uuids.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-xs font-black uppercase tracking-widest border-2 border-dashed border-gray-100 dark:border-[#1E2D47] rounded-3xl">
              Click generate to create unique IDs
            </div>
          )}
        </div>
      </div>

      {uuids.length > 0 && (
        <button 
          onClick={() => { navigator.clipboard.writeText(uuids.join('\n')); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
          className="w-full py-4 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copy All UUIDs
        </button>
      )}
    </div>
  )
}
