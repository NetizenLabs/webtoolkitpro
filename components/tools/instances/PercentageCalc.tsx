'use client'

import React, { useState } from 'react'
import { Percent, ArrowRight, Info } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function PercentageCalc() {
  const [num1, setNum1] = useState('10')
  const [num2, setNum2] = useState('100')
  const [result, setResult] = useState<string | null>('10')
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [bulkInput, setBulkInput] = useState('')
  const [bulkResults, setBulkResults] = useState<{line: string; n1: string; n2: string; res: string}[]>([])

  const calc = () => {
    if (isBulkMode) {
      if (!bulkInput.trim()) return
      const lines = bulkInput.split('\n')
      const results = lines.map(line => {
        if (!line.trim()) return null
        const nums = line.match(/-?\d+(\.\d+)?/g)
        if (nums && nums.length >= 2) {
          const val = (parseFloat(nums[0]) / 100) * parseFloat(nums[1])
          return { line, n1: nums[0], n2: nums[1], res: val.toFixed(2) }
        }
        return null
      }).filter(Boolean) as any
      setBulkResults(results)
    } else {
      const val = (parseFloat(num1) / 100) * parseFloat(num2)
      setResult(val.toFixed(2))
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Percentage Calc" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Percent className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Percentage Calculator</h3>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          {isBulkMode ? (
            <textarea
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder="10 100 (which means 10% of 100)\n50 200 (which means 50% of 200)..."
              className="flex-1 w-full h-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono outline-none whitespace-pre"
            />
          ) : (
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
          )}
          <button 
            onClick={calc}
            className="w-full md:w-auto px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all"
          >
            Calculate
          </button>
        </div>
      </div>

      {!isBulkMode && result && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-12 shadow-sm text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">The Result is</div>
          <div className="text-6xl font-black text-blue-600 dark:text-[#00D4B4]">{result}</div>
        </div>
      )}

      {isBulkMode && bulkResults.length > 0 && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Bulk Percentage Calculations</h3>
          <div className="space-y-4 max-h-[400px] overflow-auto">
            {bulkResults.map((res, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500 dark:text-[#8A9BBE]">{res.n1}% of {res.n2} =</span>
                <span className="text-xl font-black text-blue-600">{res.res}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
