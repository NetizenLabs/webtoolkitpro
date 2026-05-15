'use client'

import React, { useState } from 'react'
import { RotateCw, Copy, Check } from 'lucide-react'

export default function TextReverser() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const reverse = () => {
    setResult(text.split('').reverse().join(''))
  }

  const reverseWords = () => {
    setResult(text.split(/\s+/).reverse().join(' '))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <RotateCw className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Text Reverser</h3>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to flip..."
          className="w-full h-32 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm outline-none"
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button onClick={reverse} className="py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all">
            Reverse Characters
          </button>
          <button onClick={reverseWords} className="py-4 border border-blue-500 text-blue-600 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-all">
            Reverse Words
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Result</h3>
            <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2 text-gray-400">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-sm font-medium text-gray-800 dark:text-[#F0F6FF] leading-relaxed">{result}</p>
        </div>
      )}
    </div>
  )
}
