'use client'

import React, { useState } from 'react'
import { FileText, Type, Hash, Info } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function WordCounter() {
  const [text, setText] = useState('')
  const [isBulkMode, setIsBulkMode] = useState(false)

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const characters = text.length
  const lines = text.split('\n').filter(l => l.trim()).length

  const bulkResults = isBulkMode ? text.split('\n').map(line => {
    if (!line.trim()) return null
    return {
      text: line,
      words: line.trim().split(/\s+/).length,
      characters: line.length
    }
  }).filter(Boolean) as {text: string; words: number; characters: number}[] : []

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Word Counter" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Professional Word Counter</h3>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your content here..."
          className="w-full h-64 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm leading-relaxed outline-none"
        />
      </div>

      {!isBulkMode ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Words', value: words, icon: Type, color: 'text-blue-500' },
            { label: 'Characters', value: characters, icon: Hash, color: 'text-green-500' },
            { label: 'Total Lines', value: lines, icon: FileText, color: 'text-purple-500' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm flex flex-col items-center text-center">
              <item.icon className={`w-8 h-8 mb-4 ${item.color}`} strokeWidth={1.5} />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</span>
              <span className="text-4xl font-black text-gray-900 dark:text-white">{item.value}</span>
            </div>
          ))}
        </div>
      ) : (
        bulkResults.length > 0 && (
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Bulk Results</h3>
            <div className="space-y-2 max-h-[300px] overflow-auto">
              {bulkResults.map((res, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47]">
                  <span className="text-xs font-mono truncate max-w-[50%]">{res.text}</span>
                  <div className="flex gap-4">
                    <span className="text-xs font-bold text-blue-600">Words: {res.words}</span>
                    <span className="text-xs font-bold text-gray-600">Chars: {res.characters}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  )
}
