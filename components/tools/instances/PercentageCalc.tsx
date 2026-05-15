'use client'

import React, { useState } from 'react'
import { Percent, ArrowRight, Info } from 'lucide-react'

export default function PercentageCalc() {
  const [num1, setNum1] = useState('10')
  const [num2, setNum2] = useState('100')
  const [result, setResult] = useState<string | null>('10')

  const calc = () => {
    const val = (parseFloat(num1) / parseFloat(num2)) * 100
    setResult(val.toFixed(2))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Percent className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Percentage Calculator</h3>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">What is</span>
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              className="w-24 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold text-center outline-none"
            />
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">% of</span>
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              className="w-24 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold text-center outline-none"
            />
          </div>
          <button 
            onClick={calc}
            className="w-full md:w-auto px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all"
          >
            Calculate
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-12 shadow-sm text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">The Result is</div>
          <div className="text-6xl font-black text-blue-600 dark:text-[#00D4B4]">{result}</div>
        </div>
      )}
    </div>
  )
}
