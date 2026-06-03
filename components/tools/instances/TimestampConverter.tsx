'use client'
import React, { useState, useEffect } from 'react'
import { Clock, RefreshCw, ArrowRightLeft, Trash2 } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('')
  const [dateStr, setDateStr] = useState('')
  const [now, setNow] = useState(0)
  const [isBulkMode, setIsBulkMode] = useState(false)

  useEffect(() => {
    setNow(Math.floor(Date.now() / 1000))
    setTimestamp(Math.floor(Date.now() / 1000).toString())
    const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000)
    return () => clearInterval(interval)
  }, [])

  const tsToDate = () => {
    if (isBulkMode) {
      const lines = timestamp.split('\n');
      const results = lines.map(line => {
        if (!line.trim()) return '';
        try {
           const ts = parseInt(line.trim())
           if (isNaN(ts)) throw new Error()
           const d = new Date(ts * (line.trim().length > 10 ? 1 : 1000))
           return `${ts} -> ${d.toISOString()}`
        } catch {
           return `${line} -> Invalid`
        }
      });
      setDateStr(results.join('\n'));
    } else {
      try {
        const ts = parseInt(timestamp)
        if (isNaN(ts)) throw new Error()
        const d = new Date(ts * (timestamp.length > 10 ? 1 : 1000))
        setDateStr(`Local: ${d.toLocaleString()}\nUTC: ${d.toUTCString()}\nISO: ${d.toISOString()}`)
      } catch { setDateStr('Invalid Unix Timestamp.') }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2 mb-4">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Epoch Converter" />
      </div>
      <div className="flex justify-between items-center mb-12">
        <div className="text-left">
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Epoch</span>
          <div className="text-3xl font-black font-mono text-amber-600 dark:text-amber-500">{now}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setTimestamp(Math.floor(Date.now() / 1000).toString()); setDateStr('') }} className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/10 text-amber-600 rounded-xl font-bold text-xs"><RefreshCw className="w-4 h-4" /> Now</button>
          <button onClick={() => { setTimestamp(''); setDateStr('') }} className="p-2 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-xl"><Trash2 className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
            <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3">Unix Timestamp</label>
            {isBulkMode ? (
              <textarea value={timestamp} onChange={(e) => setTimestamp(e.target.value)} placeholder="Epoch timestamps (one per line)..." className="w-full h-48 p-5 font-black font-mono text-sm bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl outline-none dark:text-white mb-6 resize-none" />
            ) : (
              <input type="text" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} placeholder="Epoch..." className="w-full p-5 font-black font-mono text-xl bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl outline-none dark:text-white mb-6" />
            )}
            <button onClick={tsToDate} className="w-full py-4 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all shadow-lg uppercase tracking-widest text-xs flex items-center justify-center gap-2">Convert <ArrowRightLeft className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl p-8 h-full">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Computed Strings</h2>
            <textarea readOnly value={dateStr} placeholder="Results..." className="w-full h-80 p-6 font-mono text-sm bg-gray-900 dark:bg-slate-950 text-gray-100 dark:text-amber-400 border border-gray-800 rounded-[2.5rem] outline-none resize-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
