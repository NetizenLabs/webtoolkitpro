'use client'

import React, { useState, useEffect } from 'react'
import { Zap, Copy, Check, RefreshCw, Info } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function UuidV7Generator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(5)
  const [copied, setCopied] = useState<number | null>(null)

  const generateV7 = () => {
    const newUuids = []
    for (let i = 0; i < count; i++) {
      const now = Date.now()
      const random = crypto.getRandomValues(new Uint8Array(10))
      
      const uuid = new Uint8Array(16)
      
      // Timestamp (48 bits)
      uuid[0] = (now / 0x10000000000) & 0xff
      uuid[1] = (now / 0x100000000) & 0xff
      uuid[2] = (now / 0x1000000) & 0xff
      uuid[3] = (now / 0x10000) & 0xff
      uuid[4] = (now / 0x100) & 0xff
      uuid[5] = now & 0xff
      
      // Version 7
      uuid[6] = 0x70 | (random[0] & 0x0f)
      uuid[7] = random[1]
      
      // Variant 2 (10xx)
      uuid[8] = 0x80 | (random[2] & 0x3f)
      uuid[9] = random[3]
      uuid[10] = random[4]
      uuid[11] = random[5]
      uuid[12] = random[6]
      uuid[13] = random[7]
      uuid[14] = random[8]
      uuid[15] = random[9]

      const hex = Array.from(uuid).map(b => b.toString(16).padStart(2, '0')).join('')
      const formatted = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
      newUuids.push(formatted)
    }
    setUuids(newUuids)
  }

  useEffect(() => {
    generateV7()
  }, [])

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'))
    setCopied(-1)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="UUID v7 Generator" slug="uuid-v7-generator" />
      <ToolSchema 
        name="UUID v7 Generator (RFC 9562)" 
        description="Generate time-ordered, database-friendly UUID v7 identifiers. Ideal for primary keys and distributed systems where sortability is key."
        slug="uuid-v7-generator"
        steps={[
          "Specify the number of UUID v7 identifiers you need.",
          "Generate the time-ordered IDs using the refresh button.",
          "Copy individual IDs or the entire batch for your application.",
          "Use these IDs in databases for improved B-Tree indexing performance."
        ]}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-lime-500 rounded-2xl shadow-lg shadow-lime-500/20">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">UUID v7 Generator</h1>
              <p className="text-gray-500 dark:text-slate-400">Generate time-ordered, database-friendly unique identifiers (RFC 9562)</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 uppercase tracking-wider">
              New Standard
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-50 dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Quantity</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="50" 
                    value={count}
                    onChange={(e) => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                    className="w-20 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-center font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500 outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={generateV7}
                    className="p-3 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:text-lime-500 border border-gray-200 dark:border-slate-700 rounded-xl transition-all hover:shadow-md"
                    title="Refresh"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleCopyAll}
                    className="flex items-center gap-2 px-6 py-3 bg-lime-500 text-white font-bold rounded-xl hover:bg-lime-600 transition-all shadow-lg shadow-lime-500/20"
                  >
                    {copied === -1 ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    <span>{copied === -1 ? 'All Copied' : 'Copy All'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {uuids.map((uuid, index) => (
                  <div 
                    key={index}
                    className="group flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl hover:border-lime-500 dark:hover:border-lime-500/50 transition-all"
                  >
                    <code className="text-sm md:text-base font-mono text-gray-600 dark:text-slate-300 break-all">
                      {uuid}
                    </code>
                    <button 
                      onClick={() => handleCopy(uuid, index)}
                      className={`ml-4 p-2 rounded-lg transition-all ${copied === index ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'text-gray-300 dark:text-slate-600 group-hover:text-lime-500'}`}
                    >
                      {copied === index ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Information Section for Linkability */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-3xl p-8 border border-blue-100 dark:border-blue-900/30">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-blue-600 dark:text-blue-400">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Why use UUID v7?</h2>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
                    Unlike UUID v4 which is completely random, UUID v7 is **time-ordered**. This makes it much more efficient for database indexing (B-Trees), improving insert performance while remaining globally unique. It is the new recommended standard for modern distributed systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Sidebar Ad slot */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8">
              <h3 className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6">Technical Specs</h3>
              <ul className="space-y-4">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">Version</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">v7 (Unix Epoch)</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">Timestamp</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">48-bit ms</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">Entropy</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">74-bit random</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">Format</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">RFC 9562</span>
                </li>
              </ul>
            </div>
            
        <AdSlot className="min-h-[250px]" />

        <ToolInfo 
          title="UUID v7 Generator"
          description="The WebToolkit Pro UUID v7 Generator is an advanced utility for creating time-ordered, lexicographically sortable Universally Unique Identifiers. Unlike version 4 UUIDs, which are entirely random, version 7 UUIDs (defined in RFC 9562) incorporate a 48-bit Unix timestamp. This makes them significantly more efficient for database indexing and distributed systems."
          howItWorks="Our tool generates UUID v7 by combining a millisecond-precision Unix Epoch timestamp with 74 bits of cryptographically secure randomness. The resulting identifier is sortable by creation time, which reduces database fragmentation and improves write performance in systems like PostgreSQL, MySQL, and MongoDB."
          features={[
            "RFC 9562 compliant version 7 generation",
            "Time-ordered (lexicographically sortable) IDs",
            "Batch generation of up to 50 UUIDs",
            "48-bit Unix Epoch timestamp integration",
            "Hardware-backed entropy via Web Crypto API",
            "100% Client-side generation for data privacy"
          ]}
          faqs={[
            {
              q: "What is UUID v7?",
              a: "UUID v7 is a new version of UUID that is time-ordered, meaning IDs generated later will always be 'greater' than IDs generated earlier. This is crucial for database performance."
            },
            {
              q: "Why is v7 better than v4 for databases?",
              a: "Random UUID v4s cause 'index fragmentation' because they are inserted into random locations in a B-Tree. UUID v7s are inserted at the end of the index, leading to faster writes and smaller index sizes."
            },
            {
              q: "Is UUID v7 backward compatible?",
              a: "Yes. UUID v7 follows the same 128-bit structure as previous versions, so it can be stored in any field that supports UUIDs."
            },
            {
              q: "Can I extract the time from a UUID v7?",
              a: "Yes. Since the first 48 bits represent the Unix timestamp, you can theoretically determine the creation time of a UUID v7 identifier."
            }
          ]}
        />
      </div>
    </div>
  )
}
