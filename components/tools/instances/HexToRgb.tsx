'use client'

import React, { useState, useEffect } from 'react'
import { Palette, Copy, Check, RotateCcw } from 'lucide-react'

export default function HexToRgb() {
  const [hex, setHex] = useState('#00D4B4')
  const [rgb, setRgb] = useState('rgb(0, 212, 180)')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (res) {
      const r = parseInt(res[1], 16)
      const g = parseInt(res[2], 16)
      const b = parseInt(res[3], 16)
      setRgb(`rgb(${r}, ${g}, ${b})`)
    }
  }, [hex])

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Palette className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Hex to RGB Converter</h3>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-full p-4 pl-12 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono font-bold outline-none"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: hex }} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-12 shadow-sm text-center flex flex-col items-center">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">RGB Value</div>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">{rgb}</span>
          <button 
            onClick={() => { navigator.clipboard.writeText(rgb); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
            className="p-3 bg-blue-500/10 text-blue-600 rounded-xl hover:bg-blue-500/20 transition-all"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  )
}
