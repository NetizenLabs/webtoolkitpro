'use client'

import React, { useState } from 'react'
import { Type, ArrowRight, Copy, Check } from 'lucide-react'

export default function BinaryToText() {
  const [binary, setBinary] = useState('')
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    try {
      const res = binary.split(/\s+/).map(bin => {
        return String.fromCharCode(parseInt(bin, 2))
      }).join('')
      setText(res)
    } catch (e) {
      setText('Invalid binary data')
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Type className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Binary to Text</h3>
        </div>

        <textarea
          value={binary}
          onChange={(e) => setBinary(e.target.value.replace(/[^01\s]/g, ''))}
          placeholder="01001000 01100101 01101100 01101100 01101111"
          className="w-full h-32 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono text-blue-600 outline-none"
        />

        <button 
          onClick={convert}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all"
        >
          Decode Binary
        </button>
      </div>

      {text && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Decoded Text</h3>
            <button 
              onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-sm font-medium text-gray-800 dark:text-[#F0F6FF] leading-relaxed whitespace-pre-wrap">{text}</p>
        </div>
      )}
    </div>
  )
}
