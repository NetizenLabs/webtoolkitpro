'use client'

import React, { useState } from 'react'
import { Type, ArrowUpDown, AlignLeft, Scissors, Copy, Trash2, ArrowRightLeft } from 'lucide-react'

export default function TextCaseFormatter() {
  const [text, setText] = useState('')

  const handleAction = (action: string) => {
    let result = text
    switch (action) {
      case 'uppercase':
        result = text.toUpperCase()
        break
      case 'lowercase':
        result = text.toLowerCase()
        break
      case 'titlecase':
        result = text.replace(
          /\\w\\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
        )
        break
      case 'inversecase':
        result = Array.from(text).map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('')
        break
      case 'reverse':
        result = Array.from(text).reverse().join('')
        break
      case 'remove-whitespace':
        result = text.replace(/\\s+/g, '')
        break
      case 'remove-duplicates':
        const lines = text.split('\\n')
        result = Array.from(new Set(lines)).join('\\n')
        break
    }
    setText(result)
  }

  const actions = [
    { id: 'uppercase', label: 'UPPERCASE', icon: Type },
    { id: 'lowercase', label: 'lowercase', icon: Type },
    { id: 'titlecase', label: 'Title Case', icon: Type },
    { id: 'inversecase', label: 'iNVERSE cASE', icon: ArrowUpDown },
    { id: 'reverse', label: 'Reverse Text', icon: ArrowRightLeft },
    { id: 'remove-whitespace', label: 'Remove Spaces', icon: Scissors },
    { id: 'remove-duplicates', label: 'Remove Duplicate Lines', icon: AlignLeft },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              onClick={() => handleAction(action.id)}
              className="flex items-center gap-2 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] px-4 py-2.5 rounded-xl hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-500 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
            >
              <Icon className="w-4 h-4 opacity-70" /> {action.label}
            </button>
          )
        })}
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm flex flex-col h-[500px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
            <span>{text.length} characters</span>
            <span>{text.split(/\\s+/).filter(w => w.length > 0).length} words</span>
            <span>{text.split('\\n').length} lines</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setText('')} className="text-gray-400 hover:text-red-500 transition-colors p-2" title="Clear">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={() => navigator.clipboard.writeText(text)} className="text-gray-400 hover:text-blue-500 transition-colors p-2" title="Copy">
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="flex-grow w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-transparent focus:border-blue-500/30 rounded-2xl text-sm outline-none dark:text-gray-300 resize-none font-mono"
        />
      </div>
    </div>
  )
}
