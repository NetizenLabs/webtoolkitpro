'use client'

import React, { useState, useEffect } from 'react'
import { Ruler, ArrowRightLeft } from 'lucide-react'

export default function PxRemConverter() {
  const [baseSize, setBaseSize] = useState(16)
  const [pxValue, setPxValue] = useState<string>('16')
  const [remValue, setRemValue] = useState<string>('1')

  const handlePxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setPxValue(val)
    const parsed = parseFloat(val)
    if (!isNaN(parsed) && baseSize > 0) {
      setRemValue((parsed / baseSize).toString())
    } else {
      setRemValue('')
    }
  }

  const handleRemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setRemValue(val)
    const parsed = parseFloat(val)
    if (!isNaN(parsed) && baseSize > 0) {
      setPxValue((parsed * baseSize).toString())
    } else {
      setPxValue('')
    }
  }

  useEffect(() => {
    // Recalculate when base size changes
    const parsedPx = parseFloat(pxValue)
    if (!isNaN(parsedPx) && baseSize > 0) {
      setRemValue((parsedPx / baseSize).toString())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseSize])

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Ruler className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">CSS Unit Converter (PX ↔ REM)</h3>
        </div>

        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-transparent focus-within:border-blue-500/30 transition-colors">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-2">Base Font Size (Root 1rem)</label>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              value={baseSize}
              onChange={(e) => setBaseSize(Number(e.target.value) || 16)}
              className="w-24 p-2 bg-transparent text-xl font-bold outline-none dark:text-white"
            />
            <span className="text-gray-500 font-bold">px</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-2 px-2">Pixels (PX)</label>
            <div className="relative group">
              <input 
                type="number" 
                value={pxValue}
                onChange={handlePxChange}
                className="w-full p-6 bg-white dark:bg-[#0D1526] border-2 border-gray-100 dark:border-[#1E2D47] rounded-2xl text-3xl font-black outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 text-center dark:text-white"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold group-focus-within:text-blue-500 transition-colors">px</span>
            </div>
          </div>

          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full flex items-center justify-center text-blue-500 shrink-0 shadow-inner border border-blue-500/20 mt-6 md:mt-0 transition-transform duration-300 hover:rotate-180">
            <ArrowRightLeft className="w-5 h-5" />
          </div>

          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-2 px-2">Root EM (REM)</label>
            <div className="relative group">
              <input 
                type="number" 
                value={remValue}
                onChange={handleRemChange}
                className="w-full p-6 bg-white dark:bg-[#0D1526] border-2 border-gray-100 dark:border-[#1E2D47] rounded-2xl text-3xl font-black outline-none focus:border-emerald-500 dark:focus:border-emerald-500 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 text-center dark:text-white"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold group-focus-within:text-emerald-500 transition-colors">rem</span>
            </div>
          </div>
        </div>

        {/* Visual Preview */}
        <div className="mt-12 p-8 bg-gray-50/50 dark:bg-slate-800/30 rounded-3xl border border-gray-100 dark:border-slate-800 flex flex-col items-center justify-center overflow-hidden min-h-[200px] relative">
          <div className="absolute top-4 left-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visual Scale Preview</div>
          <div 
            className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-300 flex items-center justify-center text-white font-bold"
            style={{ 
              width: `${Math.min(Math.max(Number(pxValue) || 0, 16), 300)}px`, 
              height: `${Math.min(Math.max(Number(pxValue) || 0, 16), 300)}px`,
              opacity: (Number(pxValue) > 0) ? 1 : 0
            }}
          >
            {Number(pxValue) > 40 && `${pxValue}px`}
          </div>
        </div>
      </div>
      
      <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-6">
        <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 mb-2">Why use REM over PX?</h4>
        <p className="text-sm text-emerald-700 dark:text-emerald-400/80 leading-relaxed">
          Using REM units for typography and spacing ensures your layout scales perfectly when users adjust their browser&apos;s default font size. This is a critical requirement for WCAG accessibility compliance.
        </p>
      </div>
    </div>
  )
}
