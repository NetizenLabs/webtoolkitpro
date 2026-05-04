'use client'
import React, { useState } from 'react'
import { Clock, ArrowRightLeft } from 'lucide-react'

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString())
  const [dateStr, setDateStr] = useState('')
  const now = Math.floor(Date.now() / 1000)

  const tsToDate = () => {
    try {
      const ts = parseInt(timestamp)
      const d = new Date(ts * 1000)
      setDateStr(d.toLocaleString() + '\n\nUTC: ' + d.toUTCString() + '\nISO: ' + d.toISOString())
    } catch { setDateStr('Invalid timestamp') }
  }

  const dateToTs = () => {
    try {
      const d = new Date(dateStr)
      setTimestamp(Math.floor(d.getTime() / 1000).toString())
    } catch { setTimestamp('Invalid date') }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl"><Clock className="w-8 h-8 text-white" /></div>
          <div><h1 className="text-3xl font-bold text-gray-900">Timestamp Converter</h1><p className="text-gray-500">Convert Unix timestamps to human-readable dates and vice versa</p></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm mb-6">
          <div className="text-center mb-8">
            <div className="text-sm text-gray-500 mb-1">Current Unix Timestamp</div>
            <div className="text-4xl font-mono font-bold text-amber-600">{now}</div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Unix Timestamp</label>
              <input type="text" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="w-full p-4 font-mono bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
              <button onClick={tsToDate} className="mt-3 px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-all">Convert to Date →</button>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Result</label>
              <textarea readOnly value={dateStr} placeholder="Converted date will appear here..." className="w-full h-32 p-4 font-mono bg-gray-900 text-gray-100 rounded-xl outline-none resize-none" />
            </div>
          </div>
        </div>
        <div className="h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space</div>
      </div>
    </div>
  )
}
