'use client'

import React, { useState } from 'react'
import { AlignLeft, Info } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function LineCounter() {
  const [text, setText] = useState('')
  const [isBulkMode, setIsBulkMode] = useState(false)

  const total = text ? text.split('\n').length : 0
  const nonEmpty = text.split('\n').filter(l => l.trim()).length

  const blocks = isBulkMode ? text.split('---').map(b => b.trim()).filter(Boolean) : []
  const bulkResults = blocks.map((b, i) => ({
    id: i + 1,
    total: b ? b.split('\n').length : 0,
    nonEmpty: b.split('\n').filter(l => l.trim()).length,
    preview: b.split('\n')[0]
  }))

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Line Counter" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <AlignLeft className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Line Counter</h3>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isBulkMode ? "Paste blocks of text separated by '---' to count lines per block..." : "Paste code or list to count lines..."}
          className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono leading-relaxed outline-none"
        />
      </div>

      {!isBulkMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm text-center">
            <div className="text-5xl font-black text-blue-600 dark:text-[#00D4B4] mb-2">{total}</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Lines</p>
          </div>
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm text-center">
            <div className="text-5xl font-black text-gray-900 dark:text-white mb-2">{nonEmpty}</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Non-Empty Lines</p>
          </div>
        </div>
      ) : (
        bulkResults.length > 0 && (
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Bulk Results</h3>
            <div className="space-y-2 max-h-[300px] overflow-auto">
              {bulkResults.map((res) => (
                <div key={res.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47]">
                  <span className="text-xs font-mono truncate max-w-[50%]">Block #{res.id}: {res.preview}</span>
                  <div className="flex gap-4">
                    <span className="text-xs font-bold text-blue-600">Total: {res.total}</span>
                    <span className="text-xs font-bold text-gray-600">Non-Empty: {res.nonEmpty}</span>
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
