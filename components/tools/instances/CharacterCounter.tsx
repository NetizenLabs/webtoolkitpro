'use client'

import React, { useState } from 'react'
import { Hash, Info } from 'lucide-react'

export default function CharacterCounter() {
  const [text, setText] = useState('')

  const total = text.length
  const noSpaces = text.replace(/\s/g, '').length

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Hash className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Character Counter</h3>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text to count characters..."
          className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm leading-relaxed outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm text-center">
          <div className="text-5xl font-black text-blue-600 dark:text-[#00D4B4] mb-2">{total}</div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Characters</p>
        </div>
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm text-center">
          <div className="text-5xl font-black text-gray-900 dark:text-white mb-2">{noSpaces}</div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Without Spaces</p>
        </div>
      </div>
    </div>
  )
}
