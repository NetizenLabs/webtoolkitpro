'use client'

import React, { useState } from 'react'
import { Hash, ArrowRight, Info } from 'lucide-react'

export default function DecimalToBinary() {
  const [decimal, setDecimal] = useState('42')
  const [binary, setBinary] = useState('101010')

  const convert = () => {
    try {
      const res = (parseInt(decimal)).toString(2)
      setBinary(res === 'NaN' ? 'Error' : res)
    } catch (e) {
      setBinary('Error')
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Hash className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Decimal to Binary</h3>
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold text-gray-800 dark:text-[#F0F6FF] outline-none"
            placeholder="42"
          />
          <button 
            onClick={convert}
            className="px-8 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all"
          >
            Convert
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-12 shadow-sm text-center">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Binary Result</div>
        <div className="text-4xl font-black text-blue-600 dark:text-[#00D4B4] break-all leading-tight font-mono">{binary}</div>
      </div>
    </div>
  )
}
