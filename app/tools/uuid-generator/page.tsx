'use client'
import React, { useState } from 'react'
import { Shuffle, Copy, Check, RefreshCw } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)
  const [copied, setCopied] = useState<number|null>(null)

  const gen = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    // Fallback for non-secure contexts or older environments
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  React.useEffect(() => {
    setUuids([gen()])
  }, [])

  const generate = () => {
    const arr = []
    for (let i = 0; i < count; i++) arr.push(gen())
    setUuids(arr)
  }
  const copyOne = (i: number) => { navigator.clipboard.writeText(uuids[i]); setCopied(i); setTimeout(()=>setCopied(null),2000) }
  const copyAll = () => { navigator.clipboard.writeText(uuids.join('\n')); setCopied(-1); setTimeout(()=>setCopied(null),2000) }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="UUID Generator (v4)" slug="uuid-generator" />
      <ToolSchema 
        name="UUID v4 Generator" 
        description="Generate cryptographically secure, unique version 4 UUIDs (Universally Unique Identifiers) instantly for your applications and databases."
        slug="uuid-generator"
        steps={[
          "Choose the number of UUIDs you want to generate (up to 100).",
          "Click the refresh icon to generate new identifiers.",
          "Copy individual UUIDs or all generated IDs at once.",
          "Use the UUIDs in your source code, database entries, or API testing."
        ]}
      />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-lime-600 to-lime-800 rounded-2xl shadow-lg shadow-lime-500/20">
            <Shuffle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">UUID Generator (v4)</h1>
            <p className="text-gray-500 dark:text-slate-400">Generate unique, cryptographically random identifiers instantly</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2 block">Quantity</label>
              <input 
                type="number" 
                min="1" 
                max="100" 
                value={count} 
                onChange={(e)=>setCount(parseInt(e.target.value)||1)} 
                className="w-full p-4 font-mono bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-lime-500 outline-none dark:text-white" 
              />
            </div>
            <div className="flex items-end gap-3">
              <button onClick={generate} className="p-4 bg-lime-600 text-white rounded-2xl hover:bg-lime-700 transition-all shadow-lg shadow-lime-500/20">
                <RefreshCw className="w-6 h-6" />
              </button>
              <button onClick={copyAll} className="p-4 bg-gray-800 dark:bg-slate-700 text-white rounded-2xl hover:bg-gray-900 transition-all shadow-md">
                {copied===-1?<Check className="w-6 h-6"/>:<Copy className="w-6 h-6"/>}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {uuids.map((u,i)=>(
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 font-mono text-sm md:text-base group">
                <span className="break-all text-gray-600 dark:text-slate-300">{u}</span>
                <button onClick={()=>copyOne(i)} className="ml-4 text-gray-300 dark:text-slate-600 hover:text-lime-500 shrink-0 transition-colors">
                  {copied===i?<Check className="w-5 h-5"/>:<Copy className="w-5 h-5"/>}
                </button>
              </div>
            ))}
          </div>
        </div>
        <AdSlot />

        <ToolInfo 
          title="UUID v4 Generator"
          description="The WebToolkit Pro UUID v4 Generator is a specialized utility for creating Universally Unique Identifiers (UUIDs) based on the RFC 4122 version 4 specification. A UUID is a 128-bit value used for unique identification in software development, making them ideal for database primary keys, session IDs, and unique file names."
          howItWorks="Our tool uses the cryptographically strong `crypto.randomUUID()` method available in modern browsers. This ensures that the generated UUIDs are statistically unique and predictable. For environments where the secure crypto API is unavailable, we provide a robust fallback that maintains high entropy using pseudo-random number generation."
          features={[
            "RFC 4122 compliant version 4 UUID generation",
            "Batch generation of up to 100 UUIDs per click",
            "Hardware-backed randomness via Web Crypto API",
            "One-click copy for single or bulk identifiers",
            "Clean, hexadecimal formatting with hyphens",
            "100% Client-side: Identifiers are generated locally"
          ]}
          faqs={[
            {
              q: "What is a UUID?",
              a: "UUID stands for Universally Unique Identifier. It's a standard for creating IDs that are highly likely to be unique across all systems and time."
            },
            {
              q: "How many combinations are there in a UUID v4?",
              a: "A UUID v4 has 122 bits of randomness, leading to approximately 5.3 x 10^36 possible unique combinations."
            },
            {
              q: "Can two UUIDs be the same?",
              a: "While mathematically possible, the probability of a collision (two identical UUIDs) is so astronomically low that they are considered unique for all practical purposes."
            },
            {
              q: "What is the difference between UUID and GUID?",
              a: "GUID (Globally Unique Identifier) is Microsoft's implementation of the UUID standard. For most modern use cases, they are interchangeable."
            }
          ]}
        />
      </div>
    </div>
  )
}
