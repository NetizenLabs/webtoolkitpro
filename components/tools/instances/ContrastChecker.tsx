'use client'

import React, { useState, useEffect } from 'react'
import { Eye, Info, Check, X } from 'lucide-react'

export default function ContrastChecker() {
  const [bg, setBg] = useState('#FFFFFF')
  const [fg, setFg] = useState('#00D4B4')
  const [ratio, setRatio] = useState(1)

  const getLuminance = (hex: string) => {
    const rgb = hex.replace(/^#/, '').match(/.{2}/g)?.map(x => {
      let v = parseInt(x, 16) / 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    }) || [0, 0, 0]
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
  }

  useEffect(() => {
    const l1 = getLuminance(bg)
    const l2 = getLuminance(fg)
    const res = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
    setRatio(res)
  }, [bg, fg])

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">WCAG Contrast Checker</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Background Color</label>
              <div className="flex gap-4">
                <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-12 h-12 rounded-xl border-none cursor-pointer" />
                <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="flex-1 p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-[#1E2D47] rounded-xl text-sm font-mono font-bold outline-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Foreground Color</label>
              <div className="flex gap-4">
                <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-12 h-12 rounded-xl border-none cursor-pointer" />
                <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="flex-1 p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-[#1E2D47] rounded-xl text-sm font-mono font-bold outline-none" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-3xl p-8 border-4 transition-colors" style={{ backgroundColor: bg, color: fg, borderColor: ratio >= 4.5 ? '#10b98120' : '#ef444420' }}>
            <span className="text-4xl font-black mb-2">{ratio.toFixed(2)}:1</span>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Contrast Ratio</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'AA Large', threshold: 3, desc: '3.0:1 required' },
          { label: 'AA Normal', threshold: 4.5, desc: '4.5:1 required' },
          { label: 'AAA Normal', threshold: 7, desc: '7.0:1 required' },
        ].map((test, i) => (
          <div key={i} className={`p-6 rounded-2xl border flex items-center justify-between ${ratio >= test.threshold ? 'bg-green-500/5 border-green-500/10 text-green-600' : 'bg-red-500/5 border-red-500/10 text-red-600'}`}>
            <div className="space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-widest">{test.label}</h4>
              <p className="text-[9px] opacity-60 font-bold">{test.desc}</p>
            </div>
            {ratio >= test.threshold ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </div>
        ))}
      </div>
    </div>
  )
}
