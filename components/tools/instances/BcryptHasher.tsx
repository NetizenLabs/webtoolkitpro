'use client'

import React, { useState } from 'react'
import { Shield, Lock, Hash, Copy, Check, RefreshCcw, Loader2 } from 'lucide-react'
import bcrypt from 'bcryptjs'

export default function BcryptHasher() {
  const [password, setPassword] = useState('')
  const [rounds, setRounds] = useState(10)
  const [hash, setHash] = useState('')
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateHash = () => {
    if (!password) return
    setIsGenerating(true)
    setTimeout(() => {
      try {
        const salt = bcrypt.genSaltSync(rounds)
        const resultingHash = bcrypt.hashSync(password, salt)
        setHash(resultingHash)
      } catch (err) {
        console.error(err)
      }
      setIsGenerating(false)
    }, 100) // Small timeout to allow UI to show loader
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Bcrypt Hasher & Simulator</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Password / Input String</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter text to hash..."
              className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Cost Factor (Rounds: 2^{rounds})</label>
            <input
              type="range"
              min="4"
              max="15"
              value={rounds}
              onChange={(e) => setRounds(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between mt-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest">
              <span>Fast (4)</span>
              <span>Default (10)</span>
              <span>Secure (15)</span>
            </div>
          </div>

          <button 
            onClick={generateHash}
            disabled={!password || isGenerating}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Hash className="w-4 h-4" />} 
            {isGenerating ? 'Hashing...' : 'Generate Bcrypt Hash'}
          </button>
        </div>
      </div>

      {hash && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Resulting Hash</h3>
            <button onClick={() => { navigator.clipboard.writeText(hash); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2 text-gray-400 hover:text-blue-500">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] text-xs font-mono text-blue-600 break-all leading-loose">
            {hash}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 text-center">
              <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">ID</div>
              <div className="text-[10px] font-bold text-blue-600">$2b$</div>
            </div>
            <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 text-center">
              <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Cost</div>
              <div className="text-[10px] font-bold text-blue-600">{rounds}</div>
            </div>
            <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 text-center">
              <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Version</div>
              <div className="text-[10px] font-bold text-blue-600">Standard</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
