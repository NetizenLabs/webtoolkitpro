'use client'

import React, { useState } from 'react'
import { Code, ArrowRight, Info } from 'lucide-react'

export default function BinaryToHex() {
  const [binary, setBinary] = useState('101010')
  const [hex, setHex] = useState('2A')

  const convert = () => {
    try {
      const res = parseInt(binary, 2).toString(16).toUpperCase()
      setHex(res === 'NaN' ? 'Error' : res)
    } catch (e) {
      setHex('Error')
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Code className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Binary to Hexadecimal</h3>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            value={binary}
            onChange={(e) => setBinary(e.target.value.replace(/[^01]/g, ''))}
            className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono font-bold text-blue-600 outline-none"
            placeholder="101010"
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
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Hex Result</div>
        <div className="text-6xl font-black text-gray-900 dark:text-white leading-tight font-mono">{hex}</div>
      </div>
    </div>
  )
}
