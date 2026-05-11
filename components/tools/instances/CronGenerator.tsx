'use client'

import React, { useState, useEffect } from 'react'
import { Clock, Info, Copy, Check, Trash2, Calendar } from 'lucide-react'

export default function CronGenerator() {
  const [cron, setCron] = useState('* * * * *')
  const [copied, setCopied] = useState(false)
  const [explanation, setExplanation] = useState('Runs every minute.')

  // State for individual parts
  const [minutes, setMinutes] = useState('*')
  const [hours, setHours] = useState('*')
  const [days, setDays] = useState('*')
  const [months, setMonths] = useState('*')
  const [weekdays, setWeekdays] = useState('*')

  const updateCron = () => {
    const newCron = `${minutes} ${hours} ${days} ${months} ${weekdays}`
    setCron(newCron)
    generateExplanation(newCron)
  }

  const generateExplanation = (exp: string) => {
    // Simple mock explanation logic for visual demo
    // In a full production app, we would use a more robust cron-parser
    if (exp === '* * * * *') setExplanation('Runs every minute of every day.')
    else if (exp.startsWith('0')) setExplanation('Runs at the top of every hour.')
    else setExplanation(`Custom schedule: ${exp}. This task will trigger based on the defined time markers for system-level automation.`)
  }

  useEffect(() => {
    updateCron()
  }, [minutes, hours, days, months, weekdays])

  const handleCopy = () => {
    navigator.clipboard.writeText(cron)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const presets = [
    { label: 'Every Minute', value: '* * * * *' },
    { label: 'Every Hour', value: '0 * * * *' },
    { label: 'Every Day at 12 AM', value: '0 0 * * *' },
    { label: 'Every Sunday at 12 AM', value: '0 0 * * 0' },
    { label: '1st of Every Month', value: '0 0 1 * *' },
  ]

  const applyPreset = (val: string) => {
    const parts = val.split(' ')
    setMinutes(parts[0])
    setHours(parts[1])
    setDays(parts[2])
    setMonths(parts[3])
    setWeekdays(parts[4])
  }

  return (
    <div className="space-y-8">
      {/* Cron Display */}
      <div className="bg-[#0B1120] border border-[#1E2D47] rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Clock className="w-24 h-24 text-[#00D4B4]" />
        </div>
        <div className="relative z-10">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 block">Generated Expression</label>
          <div className="flex items-center justify-between gap-4">
            <span className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tighter">
              {cron}
            </span>
            <button 
              onClick={handleCopy}
              className={`p-4 rounded-2xl transition-all border ${
                copied 
                  ? 'bg-[#00D4B4]/10 border-[#00D4B4] text-[#00D4B4]' 
                  : 'bg-[#1E2D47] border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
            </button>
          </div>
          <div className="mt-6 flex items-center gap-2 text-[#00D4B4] font-medium text-sm">
            <Info className="w-4 h-4" />
            {explanation}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visual Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2 block">Minutes (0-59)</label>
              <input 
                type="text" value={minutes} onChange={(e) => setMinutes(e.target.value)}
                className="w-full bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-xl px-4 py-3 font-mono text-sm dark:text-white focus:ring-2 focus:ring-[#00D4B4] outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2 block">Hours (0-23)</label>
              <input 
                type="text" value={hours} onChange={(e) => setHours(e.target.value)}
                className="w-full bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-xl px-4 py-3 font-mono text-sm dark:text-white focus:ring-2 focus:ring-[#00D4B4] outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2 block">Day of Month (1-31)</label>
              <input 
                type="text" value={days} onChange={(e) => setDays(e.target.value)}
                className="w-full bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-xl px-4 py-3 font-mono text-sm dark:text-white focus:ring-2 focus:ring-[#00D4B4] outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2 block">Month (1-12)</label>
              <input 
                type="text" value={months} onChange={(e) => setMonths(e.target.value)}
                className="w-full bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-xl px-4 py-3 font-mono text-sm dark:text-white focus:ring-2 focus:ring-[#00D4B4] outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2 block">Day of Week (0-6)</label>
              <input 
                type="text" value={weekdays} onChange={(e) => setWeekdays(e.target.value)}
                className="w-full bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-xl px-4 py-3 font-mono text-sm dark:text-white focus:ring-2 focus:ring-[#00D4B4] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Presets Sidebar */}
        <div className="space-y-6">
          <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Common Presets</label>
          <div className="space-y-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(p.value)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-xl hover:border-[#00D4B4]/50 transition-all group"
              >
                <div className="text-left">
                  <span className="block text-xs font-bold text-gray-900 dark:text-white">{p.label}</span>
                  <code className="text-[10px] text-gray-500 font-mono">{p.value}</code>
                </div>
                <Calendar className="w-4 h-4 text-gray-400 group-hover:text-[#00D4B4] transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guide */}
      <div className="p-6 bg-[#0D1526] border border-[#1E2D47] rounded-2xl">
        <h5 className="text-sm font-bold text-white mb-3">Cron Syntax Quick Guide</h5>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-[#00D4B4]">Minute</span>
            <span className="block text-xs text-gray-500 font-mono">0-59</span>
          </div>
          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-[#00D4B4]">Hour</span>
            <span className="block text-xs text-gray-500 font-mono">0-23</span>
          </div>
          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-[#00D4B4]">Day</span>
            <span className="block text-xs text-gray-500 font-mono">1-31</span>
          </div>
          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-[#00D4B4]">Month</span>
            <span className="block text-xs text-gray-500 font-mono">1-12</span>
          </div>
          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-[#00D4B4]">Weekday</span>
            <span className="block text-xs text-gray-500 font-mono">0-6</span>
          </div>
        </div>
      </div>
    </div>
  )
}
