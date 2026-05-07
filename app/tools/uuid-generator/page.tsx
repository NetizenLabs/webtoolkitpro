'use client'
import React, { useState } from 'react'
import { Shuffle, Copy, Check, RefreshCw } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export default function UuidGenerator() {
  const gen = () => crypto.randomUUID()
  const [uuids, setUuids] = useState<string[]>([gen()])
  const [count, setCount] = useState(1)
  const [copied, setCopied] = useState<number|null>(null)

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
        <div className="h-[90px]">{/* AdSense slot */}</div>
      </div>
    </div>
  )
}
