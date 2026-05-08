'use client'

import React, { useState, useEffect } from 'react'
import { Clock, RefreshCw, ArrowRightLeft, ArrowRight, Calendar, Trash2 } from 'lucide-react'
import Link from 'next/link'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('')
  const [dateStr, setDateStr] = useState('')
  const [now, setNow] = useState(Math.floor(Date.now() / 1000))

  useEffect(() => {
    setTimestamp(Math.floor(Date.now() / 1000).toString())
    const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000)
    return () => clearInterval(interval)
  }, [])

  const tsToDate = () => {
    try {
      const ts = parseInt(timestamp)
      if (isNaN(ts)) throw new Error('Invalid')
      const d = new Date(ts * (timestamp.length > 10 ? 1 : 1000)) // Auto-detect ms vs s
      setDateStr(`Local: ${d.toLocaleString()}\nUTC: ${d.toUTCString()}\nISO: ${d.toISOString()}`)
    } catch { 
      setDateStr('Invalid Unix Timestamp. Please enter a valid number (seconds or milliseconds).') 
    }
  }

  const resetToNow = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString())
    setDateStr('')
  }

  const clearAll = () => {
    setTimestamp('')
    setDateStr('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Unix Timestamp Converter" slug="tools/timestamp-converter" />
      <ToolSchema 
        name="Unix Timestamp & Epoch Converter" 
        description="Convert between Unix timestamps (seconds or milliseconds) and human-readable dates in Local, UTC, and ISO formats."
        slug="timestamp-converter"
        steps={[
          "Enter your Unix timestamp in the input field.",
          "Observe the live system epoch time at the top for reference.",
          "Click 'Convert to Date' to generate human-readable strings.",
          "Review the Local, UTC, and ISO formatted results."
        ]}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-amber-600 rounded-2xl shadow-lg shadow-amber-600/20">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Unix Timestamp Converter</h1>
              <p className="text-gray-500 dark:text-slate-400">Professional conversion between epoch time and human dates</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={resetToNow}
              className="flex items-center gap-2 px-6 py-3 bg-amber-50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400 rounded-xl font-bold text-sm hover:bg-amber-100 transition-all border border-amber-100 dark:border-amber-900/30"
            >
              <RefreshCw className="w-4 h-4" /> Reset to Now
            </button>
            <button 
              onClick={clearAll}
              className="p-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30 hover:bg-red-100 transition-all"
              title="Clear All"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm text-center">
              <span className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Current System Epoch</span>
              <div className="text-4xl font-black font-mono text-amber-600 dark:text-amber-500 tracking-tighter mb-8">
                {now}
              </div>
              
              <div className="space-y-6 text-left">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3 px-1">Unix Timestamp</label>
                  <input 
                    type="text" 
                    value={timestamp} 
                    onChange={(e) => setTimestamp(e.target.value)} 
                    placeholder="Enter epoch seconds..."
                    className="w-full p-5 font-black font-mono text-xl bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all dark:text-white" 
                  />
                </div>
                
                <button 
                  onClick={tsToDate} 
                  className="w-full py-4 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-500/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  Convert to Date <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Result Area */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-amber-900/5 p-8 h-full">
              <h2 className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6 px-2">Computed DateTime Strings</h2>
              <textarea 
                readOnly 
                value={dateStr} 
                placeholder="Converted date strings will appear here in ISO, UTC, and Local formats..."
                className="w-full h-80 p-6 font-mono text-sm bg-gray-900 dark:bg-slate-950 text-gray-100 dark:text-amber-400 border border-gray-800 dark:border-slate-800 rounded-[2.5rem] outline-none resize-none shadow-inner transition-all" 
              />
            </div>
          </div>
        </div>

        {/* Technical Insight Footer */}
        <div className="bg-amber-600 rounded-[3rem] p-10 text-white relative overflow-hidden group mb-16 shadow-xl shadow-amber-500/20">
          <Calendar className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Master Enterprise Scheduling</h3>
              <p className="text-amber-100 text-sm leading-relaxed">
                Unix timestamps are the backbone of distributed systems and cloud scheduling. Understanding epoch time is critical for managing database logs, API rate limiting, and global deployments.
              </p>
            </div>
            <Link 
              href="/tools/api-latency-calculator/"
              className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              Analyze API Performance <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <AdSlot />

        <ToolInfo 
          title="Unix Timestamp & Epoch Converter"
          description="The WebToolkit Pro Unix Timestamp Converter is a high-precision utility designed for backend developers, data engineers, and DevOps professionals. Unix time (also known as Epoch time) is a system for describing a point in time as the number of seconds that have elapsed since the Unix Epoch (January 1st, 1970 at 00:00:00 UTC)."
          howItWorks="Our tool uses the standard JavaScript `Date` object to parse and format timestamps. It features an intelligent auto-detection algorithm that determines if your input is in seconds (10 digits) or milliseconds (13 digits), ensuring accurate conversion regardless of the source platform (e.g., PHP/Python vs. JavaScript/Java)."
          features={[
            "Real-time Unix Epoch clock display",
            "Auto-detection of seconds vs. milliseconds",
            "Simultaneous Local, UTC, and ISO-8601 formatting",
            "One-click 'Reset to Now' functionality",
            "Hardware-accurate system time synchronization",
            "100% Client-side: Your timestamps stay private"
          ]}
          faqs={[
            {
              q: "What is the Unix Epoch?",
              a: "The Unix Epoch is January 1, 1970, at 00:00:00 UTC. Unix timestamps count the number of seconds passed since this exact moment."
            },
            {
              q: "What happens in the Year 2038 problem?",
              a: "On January 19, 2038, 32-bit Unix timestamps will overflow. Modern systems use 64-bit integers to represent time, effectively solving this problem for billions of years."
            },
            {
              q: "Why are my timestamps different by 1000x?",
              a: "Some programming languages (like PHP and Python) use seconds by default, while others (like JavaScript and Java) use milliseconds. Our tool detects both formats automatically."
            },
            {
              q: "Does this tool handle leap seconds?",
              a: "Unix time ignores leap seconds, providing a linear representation of time that is easier for computers to compute but slightly out of sync with rotation-based solar time."
            }
          ]}
        />
      </div>
    </div>
  )
}
