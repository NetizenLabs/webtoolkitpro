'use client'

import React, { useState, useEffect } from 'react'
import { Palette, Copy, Check, RotateCcw } from 'lucide-react'
import { useEnterSubmit } from '@/hooks/useEnterSubmit'

export default function RgbaToHex() {
  const [r, setR] = useState(0)
  const [g, setG] = useState(212)
  const [b, setB] = useState(180)
  const [a, setA] = useState(1)
  const [hex, setHex] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const toHex = (n: number) => n.toString(16).padStart(2, '0')
    const alpha = Math.round(a * 255).toString(16).padStart(2, '0')
    setHex(`#${toHex(r)}${toHex(g)}${toHex(b)}${a < 1 ? alpha : ''}`.toUpperCase())
  }, [r, g, b, a])

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Palette className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">RGBA to Hex Converter</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Red', val: r, set: setR, max: 255 },
            { label: 'Green', val: g, set: setG, max: 255 },
            { label: 'Blue', val: b, set: setB, max: 255 },
            { label: 'Alpha', val: a, set: setA, max: 1, step: 0.01 },
          ].map((c, i) => (
            <div key={i}>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">{c.label}</label>
              <input
                type="number"
                min={0}
                max={c.max}
                step={c.step || 1}
                value={c.val}
                onChange={(e) => c.set(parseFloat(e.target.value))}
                onKeyDown={useEnterSubmit(() => {})}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold text-center outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-12 shadow-sm text-center flex flex-col items-center">
        <div 
          className="w-20 h-20 rounded-2xl mb-6 shadow-2xl transition-all duration-500"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
        />
        <div className="flex items-center gap-4">
          <span className="text-4xl font-black text-gray-900 dark:text-white font-mono">{hex}</span>
          <button 
            onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
            className="p-3 bg-blue-500/10 text-blue-600 rounded-xl hover:bg-blue-500/20 transition-all"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  )
}
