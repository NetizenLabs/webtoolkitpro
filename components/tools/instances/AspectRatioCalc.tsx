'use client'

import React, { useState } from 'react'
import { Monitor, ArrowRight, Info } from 'lucide-react'

export default function AspectRatioCalc() {
  const [width, setWidth] = useState('1920')
  const [height, setHeight] = useState('1080')
  const [ratio, setRatio] = useState('16:9')

  const calc = () => {
    const w = parseInt(width)
    const h = parseInt(height)
    if (!w || !h) return
    
    const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a
    const common = gcd(w, h)
    setRatio(`${w / common}:${h / common}`)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Monitor className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Aspect Ratio Calculator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
              />
            </div>
            <button 
              onClick={calc}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all"
            >
              Calculate Ratio
            </button>
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B1120] rounded-3xl p-8 border border-gray-100 dark:border-[#1E2D47]">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Simplified Ratio</span>
            <div className="text-5xl font-black text-blue-600 dark:text-[#00D4B4]">{ratio}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
