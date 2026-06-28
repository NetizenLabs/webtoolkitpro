'use client'
import React, { useState, useEffect } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'

const ResultCard = ({ title, passed, sub }: { title: string, passed: boolean, sub: string }) => (
  <div className={`p-5 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 hover:scale-[1.02] ${passed ? 'border-green-400 bg-green-500/10 text-green-700 dark:text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.2)]' : 'border-red-400 bg-red-500/10 text-red-700 dark:text-red-400 shadow-[0_0_15px_rgba(248,113,113,0.2)]'}`}>
    <div>
      <div className="font-black text-sm uppercase tracking-wide">{title}</div>
      <div className="text-xs font-semibold opacity-80 mt-1">{sub}</div>
    </div>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${passed ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-red-500 text-white shadow-lg shadow-red-500/30'}`}>
      {passed ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
    </div>
  </div>
)

export default function ColorContrast() {
  const [foreground, setForeground] = useState('#2563EB')
  const [background, setBackground] = useState('#FFFFFF')
  const [ratio, setRatio] = useState(0)
  const [results, setResults] = useState({ aaNormal: false, aaLarge: false, aaaNormal: false, aaaLarge: false })

  const getLuminance = (hex: string) => {
    const rgb = hex.replace(/^#/, '').match(/.{2}/g)?.map(x => {
      let v = parseInt(x, 16) / 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    }) || [0, 0, 0]
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
  }

  useEffect(() => {
    const l1 = getLuminance(foreground), l2 = getLuminance(background)
    const currentRatio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
    setRatio(Number(currentRatio.toFixed(2)))
    setResults({ aaNormal: currentRatio >= 4.5, aaLarge: currentRatio >= 3, aaaNormal: currentRatio >= 7, aaaLarge: currentRatio >= 4.5 })
  }, [foreground, background])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm backdrop-blur-xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 group-focus-within:text-indigo-500 transition-colors">Foreground Color</label>
              <div className="flex gap-4">
                <div className="relative shrink-0">
                  <input type="color" value={foreground} onChange={(e) => setForeground(e.target.value.toUpperCase())} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="w-14 h-14 rounded-2xl border-4 border-white dark:border-slate-800 shadow-[0_0_15px_rgba(0,0,0,0.1)] flex items-center justify-center transition-transform group-hover:scale-105" style={{ backgroundColor: foreground }}></div>
                </div>
                <input type="text" value={foreground} onChange={(e) => setForeground(e.target.value.toUpperCase())} className="flex-grow px-5 py-3 rounded-2xl bg-gray-50 dark:bg-[#0B1120] border-2 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 outline-none font-mono text-xl font-bold dark:text-white transition-all duration-300 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] uppercase" />
              </div>
            </div>
            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 group-focus-within:text-indigo-500 transition-colors">Background Color</label>
              <div className="flex gap-4">
                <div className="relative shrink-0">
                  <input type="color" value={background} onChange={(e) => setBackground(e.target.value.toUpperCase())} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="w-14 h-14 rounded-2xl border-4 border-white dark:border-slate-800 shadow-[0_0_15px_rgba(0,0,0,0.1)] flex items-center justify-center transition-transform group-hover:scale-105" style={{ backgroundColor: background }}></div>
                </div>
                <input type="text" value={background} onChange={(e) => setBackground(e.target.value.toUpperCase())} className="flex-grow px-5 py-3 rounded-2xl bg-gray-50 dark:bg-[#0B1120] border-2 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 outline-none font-mono text-xl font-bold dark:text-white transition-all duration-300 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] uppercase" />
              </div>
            </div>
            <div className="mt-8 p-12 rounded-3xl border border-black/5 shadow-2xl flex flex-col items-center justify-center text-center transition-colors duration-500" style={{ backgroundColor: background, color: foreground }}>
              <div className="text-4xl font-black mb-3 tracking-tight">Contrast UI Preview</div>
              <div className="text-base font-medium opacity-90 max-w-sm">Ensure your text is readable by anyone, anywhere. WCAG compliance made easy.</div>
              <button className="mt-6 px-8 py-3 rounded-full font-bold transition-transform hover:scale-105" style={{ backgroundColor: foreground, color: background }}>Sample Button</button>
            </div>
          </div>
        </div>
        <div className="bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm backdrop-blur-xl">
          <div className="text-center mb-10 pb-8 border-b border-gray-100 dark:border-slate-800/50 relative">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Contrast Ratio</div>
            <div className={`text-7xl font-black drop-shadow-md tracking-tighter ${ratio >= 4.5 ? 'text-green-500' : ratio >= 3 ? 'text-amber-500' : 'text-red-500'}`}>{ratio}:1</div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <ResultCard title="AA Normal" passed={results.aaNormal} sub="Required 4.5:1" />
            <ResultCard title="AA Large" passed={results.aaLarge} sub="Required 3:1" />
            <ResultCard title="AAA Normal" passed={results.aaaNormal} sub="Required 7:1" />
            <ResultCard title="AAA Large" passed={results.aaaLarge} sub="Required 4.5:1" />
          </div>
        </div>
      </div>
    </div>
  )
}
