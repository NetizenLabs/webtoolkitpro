'use client'
import React, { useState } from 'react'
import { Shuffle, Copy, Check, RefreshCw } from 'lucide-react'

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
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-lime-600 to-lime-800 rounded-xl"><Shuffle className="w-8 h-8 text-white" /></div>
          <div><h1 className="text-3xl font-bold text-gray-900">UUID Generator</h1><p className="text-gray-500">Generate unique UUIDs (v4) instantly</p></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm mb-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1"><label className="text-sm font-semibold text-gray-700 mb-2 block">How many?</label>
              <input type="number" min="1" max="100" value={count} onChange={(e)=>setCount(parseInt(e.target.value)||1)} className="w-full p-4 font-mono bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none" /></div>
            <div className="flex items-end gap-2">
              <button onClick={generate} className="p-4 bg-lime-600 text-white rounded-xl hover:bg-lime-700 transition-all"><RefreshCw className="w-6 h-6" /></button>
              <button onClick={copyAll} className="p-4 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all">{copied===-1?<Check className="w-6 h-6"/>:<Copy className="w-6 h-6"/>}</button>
            </div>
          </div>
          <div className="space-y-2">
            {uuids.map((u,i)=>(
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 font-mono text-sm">
                <span className="break-all">{u}</span>
                <button onClick={()=>copyOne(i)} className="ml-2 text-gray-400 hover:text-lime-600 shrink-0">{copied===i?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4"/>}</button>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space</div>
      </div>
    </div>
  )
}
