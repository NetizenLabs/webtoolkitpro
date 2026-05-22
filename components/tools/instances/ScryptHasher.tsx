'use client'

import React, { useState } from 'react'
import { Shield, Database, Hash, Copy, Check, Loader2 } from 'lucide-react'
import { scrypt } from 'hash-wasm'

export default function ScryptHasher() {
  const [input, setInput] = useState('')
  const [n, setN] = useState(16384)
  const [r, setR] = useState(8)
  const [p, setP] = useState(1)
  const [hash, setHash] = useState('')
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateHash = async () => {
    if (!input) return
    setIsGenerating(true)
    try {
      const salt = new Uint8Array(16)
      window.crypto.getRandomValues(salt)
      
      const result = await scrypt({
        password: input,
        salt,
        costFactor: n,
        blockSize: r,
        parallelism: p,
        hashLength: 32,
        outputType: 'hex' as const
      })

      setHash(result)
    } catch (err) {
      console.error(err)
      alert("Failed to compute Scrypt hash.")
    }
    setIsGenerating(false)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-[#00D4B4]">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Scrypt KDF Simulator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Input Data</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter string to process..."
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
              />
            </div>
            <div className="p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10">
              <p className="text-[10px] text-orange-600 font-bold leading-relaxed italic">
                Scrypt is designed to be memory-hard, making it highly resistant to hardware accelerated attacks like FPGAs and ASICs.
              </p>
            </div>
          </div>

          <div className="space-y-4 p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-[#1E2D47]">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Database className="w-3 h-3" /> Cost Parameters
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 block">N (Cost)</label>
                <input type="number" value={n} onChange={(e) => setN(parseInt(e.target.value))} className="w-full p-2 bg-white dark:bg-[#0B1120] rounded-lg text-xs font-bold outline-none border border-black/5" />
              </div>
              <div>
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 block">r (Block)</label>
                <input type="number" value={r} onChange={(e) => setR(parseInt(e.target.value))} className="w-full p-2 bg-white dark:bg-[#0B1120] rounded-lg text-xs font-bold outline-none border border-black/5" />
              </div>
              <div>
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 block">p (Parallel)</label>
                <input type="number" value={p} onChange={(e) => setP(parseInt(e.target.value))} className="w-full p-2 bg-white dark:bg-[#0B1120] rounded-lg text-xs font-bold outline-none border border-black/5" />
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={generateHash}
          disabled={!input || isGenerating}
          className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Hash className="w-4 h-4" />}
          {isGenerating ? 'Computing...' : 'Compute Scrypt Output'}
        </button>
      </div>

      {hash && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Derived Key Format</h3>
            <button onClick={() => { navigator.clipboard.writeText(hash); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] text-[10px] font-mono text-orange-600 break-all leading-loose">
            {hash}
          </div>
        </div>
      )}
    </div>
  )
}
