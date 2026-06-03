'use client'

import React, { useState } from 'react'
import { Shield, Key, Hash, Copy, Check, Zap } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function HmacGenerator() {
  const [message, setMessage] = useState('')
  const [key, setKey] = useState('')
  const [algorithm, setAlgorithm] = useState('SHA-256')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const generateHMAC = async () => {
    if (!message || !key) return

    const encoder = new TextEncoder()
    const keyData = encoder.encode(key)

    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: algorithm },
      false,
      ['sign']
    )

    if (isBulkMode) {
      const lines = message.split('\n')
      const results = await Promise.all(lines.map(async (line) => {
        if (!line) return ''
        const messageData = encoder.encode(line)
        const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, messageData)
        const hashArray = Array.from(new Uint8Array(signature))
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      }))
      setResult(results.join('\n'))
    } else {
      const messageData = encoder.encode(message)
      const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, messageData)
      const hashArray = Array.from(new Uint8Array(signature))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      setResult(hashHex)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk HMAC Generator" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">HMAC Generator (Web Crypto API)</h3>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Message / Data</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter the message to sign..."
                className="w-full h-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm outline-none font-mono"
              />
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Secret Key</label>
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter your secret key..."
                  className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Hash Algorithm</label>
                <select 
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-bold outline-none appearance-none"
                >
                  <option value="SHA-256">SHA-256 (Secure)</option>
                  <option value="SHA-384">SHA-384</option>
                  <option value="SHA-512">SHA-512 (Strongest)</option>
                  <option value="SHA-1">SHA-1 (Legacy)</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            onClick={generateHMAC}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" /> Compute HMAC Signature
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">HMAC Hash Result</h3>
            <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2 text-gray-400 hover:text-blue-500">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <textarea 
            readOnly
            className="w-full h-32 p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] text-xs font-mono text-blue-600 outline-none resize-none"
            value={result}
          />
        </div>
      )}
    </div>
  )
}
