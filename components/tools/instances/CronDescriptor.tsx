'use client'

import React, { useState } from 'react'
import { Clock, Info, Check, AlertCircle } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function CronDescriptor() {
  const [cron, setCron] = useState('* * * * *')
  const [desc, setDesc] = useState('Every minute')
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [bulkResults, setBulkResults] = useState<{cron: string; desc: string}[]>([])

  const describeCron = (exp: string) => {
    const parts = exp.trim().split(/\s+/)
    if (parts.length !== 5) return 'Invalid cron expression (must have 5 parts)'

    const [min, hour, day, month, dow] = parts
    
    let time = ''
    if (min === '*' && hour === '*') time = 'Every minute'
    else if (min !== '*' && hour === '*') time = `At minute ${min} of every hour`
    else if (min === '*' && hour !== '*') time = `Every minute of hour ${hour}`
    else time = `At ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`

    let date = ''
    if (day === '*' && month === '*' && dow === '*') date = 'every day'
    else if (dow !== '*') date = `on day-of-week ${dow}`
    else date = `on day ${day} of month ${month}`

    return `${time}, ${date}.`
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Cron Descriptor" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Cron Descriptor</h3>
        </div>

        <div className="flex gap-4">
          {isBulkMode ? (
            <textarea
              value={cron}
              onChange={(e) => {
                const val = e.target.value
                setCron(val)
                const lines = val.split('\n')
                const results = lines.map(line => {
                  if (!line.trim()) return null
                  return { cron: line.trim(), desc: describeCron(line) }
                }).filter(Boolean) as {cron: string; desc: string}[]
                setBulkResults(results)
              }}
              placeholder="0 12 * * * (one per line)"
              className="flex-1 h-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono font-bold text-blue-600 dark:text-[#00D4B4] outline-none resize-none"
            />
          ) : (
            <input
              type="text"
              value={cron}
              onChange={(e) => {
                setCron(e.target.value)
                setDesc(describeCron(e.target.value))
              }}
              placeholder="0 12 * * *"
              className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono font-bold text-blue-600 dark:text-[#00D4B4] outline-none"
            />
          )}
        </div>
      </div>

      {!isBulkMode && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Human Readable Schedule</div>
          <div className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
            &quot;{desc}&quot;
          </div>
        </div>
      )}

      {isBulkMode && bulkResults.length > 0 && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Bulk Analysis</h3>
          <div className="space-y-2 max-h-[300px] overflow-auto">
            {bulkResults.map((res, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47]">
                <span className="text-xs font-mono font-bold tracking-wider text-blue-600">{res.cron}</span>
                <span className="text-xs text-gray-600 dark:text-[#8A9BBE] text-right ml-4">&quot;{res.desc}&quot;</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-start gap-4">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Cron Syntax Guide</h4>
          <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed">
            Format: [Minute] [Hour] [Day] [Month] [Day of Week]. <br/>
            Example: <code className="text-blue-500">0 0 * * *</code> runs daily at midnight.
          </p>
        </div>
      </div>
    </div>
  )
}
