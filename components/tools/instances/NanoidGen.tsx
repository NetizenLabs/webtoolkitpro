'use client'

import React, { useState } from 'react'
import { Zap, RefreshCcw, Copy, Check } from 'lucide-react'

export default function NanoidGen() {
  const [ids, setIds] = useState<string[]>([])
  const [size, setSize] = useState(21)
  const [count, setCount] = useState(5)
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const alphabet = 'usealphabet-2164830957qwertzuiopasdfghjklyxcvbnmWERTZUIOPASDFGHJKLYXCVBNM'
    const newIds = Array.from({ length: count }).map(() => {
      let id = ''
      for (let i = 0; i < size; i++) {
        id += alphabet[Math.floor(Math.random() * alphabet.length)]
      }
      return id
    })
    setIds(newIds)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-600">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">NanoID Generator</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Length</span>
              <input
                type="number"
                min={1}
                max={64}
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-12 p-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-[#1E2D47] rounded-lg text-[10px] font-bold text-center outline-none"
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
          {ids.map((id, i) => (
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
          ))}
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
