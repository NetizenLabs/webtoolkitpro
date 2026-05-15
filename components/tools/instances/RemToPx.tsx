'use client'

import React, { useState, useEffect } from 'react'
import { Ruler, ArrowRight, Info } from 'lucide-react'

export default function RemToPx() {
  const [rem, setRem] = useState('1')
  const [base, setBase] = useState('16')
  const [px, setPx] = useState('16')

  useEffect(() => {
    const val = parseFloat(rem) * parseFloat(base)
    setPx(val.toFixed(0))
  }, [rem, base])

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Ruler className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">REM to PX Converter</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">REM Value</label>
              <input
                type="number"
                value={rem}
                onChange={(e) => setRem(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Base Font Size (Default 16px)</label>
              <input
                type="number"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B1120] rounded-3xl p-8 border border-gray-100 dark:border-[#1E2D47]">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Result (PX)</span>
            <div className="text-6xl font-black text-blue-600 dark:text-[#00D4B4]">{px}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
