'use client'

import React, { useState } from 'react'
import { Smile, Search, Copy, Check, RotateCcw } from 'lucide-react'

const EMOJIS = [
  { char: '😀', name: 'grin' }, { char: '😂', name: 'joy' }, { char: '🥰', name: 'heart_eyes' },
  { char: '😎', name: 'cool' }, { char: '🤔', name: 'thinking' }, { char: '🚀', name: 'rocket' },
  { char: '🔥', name: 'fire' }, { char: '✨', name: 'sparkles' }, { char: '💻', name: 'laptop' },
  { char: '⚡', name: 'zap' }, { char: '✅', name: 'check' }, { char: '❌', name: 'cross' },
  { char: '🎉', name: 'party' }, { char: '❤️', name: 'heart' }, { char: '⭐', name: 'star' },
  { char: '💡', name: 'bulb' }, { char: '🔒', name: 'lock' }, { char: '🛡️', name: 'shield' },
  { char: '📱', name: 'mobile' }, { char: '🌐', name: 'globe' }, { char: '🎨', name: 'palette' },
  { char: '🛠️', name: 'tools' }, { char: '📦', name: 'package' }, { char: '📊', name: 'chart' },
  { char: '👍', name: 'thumbsup' }, { char: '🙌', name: 'hands' }, { char: '💪', name: 'flex' },
  { char: '📍', name: 'pin' }, { char: '📅', name: 'calendar' }, { char: '🔍', name: 'search' },
]

export default function EmojiPicker() {
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = EMOJIS.filter(e => e.name.includes(search.toLowerCase()))

  const copyEmoji = (char: string) => {
    navigator.clipboard.writeText(char)
    setCopied(char)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Emoji Explorer</h3>
          </div>
          
          <div className="relative w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search emojis..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {filtered.map((e, i) => (
            <button
              key={i}
              onClick={() => copyEmoji(e.char)}
              className="aspect-square bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all group relative"
            >
              {e.char}
              {copied === e.char && (
                <div className="absolute inset-0 bg-blue-600/90 rounded-2xl flex items-center justify-center animate-in fade-in zoom-in duration-200">
                  <Check className="w-6 h-6 text-white" />
                </div>
              )}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap uppercase tracking-widest font-black">
                {e.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-center gap-4 text-center justify-center">
        <p className="text-[10px] text-gray-500 dark:text-[#8A9BBE] font-black uppercase tracking-widest">
          Click any emoji to copy to clipboard
        </p>
      </div>
    </div>
  )
}
