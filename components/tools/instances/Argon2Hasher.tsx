'use client'

import React, { useState } from 'react'
import { Shield, Settings, Hash, Copy, Check, Loader2 } from 'lucide-react'
import { argon2id, argon2i, argon2d } from 'hash-wasm'

export default function Argon2Hasher() {
  const [input, setInput] = useState('')
  const [type, setType] = useState('argon2id')
  const [memory, setMemory] = useState(65536)
  const [iterations, setIterations] = useState(3)
  const [parallelism, setParallelism] = useState(4)
  const [hash, setHash] = useState('')
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateHash = async () => {
    if (!input) return
    setIsGenerating(true)
    try {
      const salt = new Uint8Array(16)
      window.crypto.getRandomValues(salt)
      
      const config = {
        password: input,
        salt,
        parallelism,
        iterations,
        memorySize: memory,
        hashLength: 32,
        outputType: 'encoded' as const
      }

      let result = ''
      if (type === 'argon2id') result = await argon2id(config)
      else if (type === 'argon2i') result = await argon2i(config)
      else if (type === 'argon2d') result = await argon2d(config)

      setHash(result)
    } catch (err) {
      console.error(err)
      alert("Failed to compute Argon2 hash.")
    }
    setIsGenerating(false)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-[#00D4B4]">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Argon2 Hasher (PHC Format)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Input Text</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter string to hash..."
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Algorithm Variant</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-bold outline-none appearance-none"
              >
                <option value="argon2id">Argon2id (Hybrid - Recommended)</option>
                <option value="argon2i">Argon2i (Side-channel resistant)</option>
                <option value="argon2d">Argon2d (Data-dependent)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-[#1E2D47]">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Settings className="w-3 h-3" /> Tuning Parameters
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Memory (KB)</label>
                <input type="number" value={memory} onChange={(e) => setMemory(parseInt(e.target.value))} className="w-full p-2 bg-white dark:bg-[#0B1120] rounded-lg text-xs font-bold outline-none border border-black/5" />
              </div>
              <div>
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Iterations</label>
                <input type="number" value={iterations} onChange={(e) => setIterations(parseInt(e.target.value))} className="w-full p-2 bg-white dark:bg-[#0B1120] rounded-lg text-xs font-bold outline-none border border-black/5" />
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={generateHash}
          disabled={!input || isGenerating}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Hash className="w-4 h-4" />}
          {isGenerating ? 'Computing...' : 'Generate PHC String'}
        </button>
      </div>

      {hash && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Argon2 Hash</h3>
            <button onClick={() => { navigator.clipboard.writeText(hash); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] text-[10px] font-mono text-indigo-600 break-all leading-loose">
            {hash}
          </div>
        </div>
      )}
    </div>
  )
}
