'use client'

import React, { useState } from 'react'
import { Lock, Unlock, Key, Copy, Check, Shield, AlertCircle } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function AesEncryption() {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const processAes = async () => {
    setError(null)
    try {
      if (!text || !password) return

      const enc = new TextEncoder()
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        enc.encode(password.padEnd(32, '0').slice(0, 32)),
        'AES-GCM',
        false,
        ['encrypt', 'decrypt']
      )

      const lines = isBulkMode ? text.split('\n') : [text]
      const results: string[] = []

      for (const line of lines) {
        if (!line.trim()) {
           results.push('')
           continue
        }

        if (mode === 'encrypt') {
          const iv = window.crypto.getRandomValues(new Uint8Array(12))
          const encrypted = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            keyMaterial,
            enc.encode(line)
          )
          
          const combined = new Uint8Array(iv.length + encrypted.byteLength)
          combined.set(iv)
          combined.set(new Uint8Array(encrypted), iv.length)
          
          results.push(btoa(String.fromCharCode(...combined)))
        } else {
          try {
            const combined = new Uint8Array(atob(line.trim()).split('').map(c => c.charCodeAt(0)))
            const iv = combined.slice(0, 12)
            const data = combined.slice(12)
            
            const decrypted = await window.crypto.subtle.decrypt(
              { name: 'AES-GCM', iv },
              keyMaterial,
              data
            )
            results.push(new TextDecoder().decode(decrypted))
          } catch(e) {
            results.push('Error: Decryption failed for this line')
          }
        }
      }
      
      setResult(results.join(isBulkMode ? '\n' : ''))
    } catch (err: any) {
      setError(mode === 'encrypt' ? 'Encryption failed' : 'Decryption failed. Check your password or input.')
      setResult('')
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-2 px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk AES Encryption" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
              {mode === 'encrypt' ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">AES-GCM 256</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Privacy-First Browser Encryption</p>
            </div>
          </div>
          
          <div className="flex bg-gray-50 dark:bg-[#0B1120] p-1 rounded-xl border border-gray-100 dark:border-[#1E2D47]">
            <button
              onClick={() => { setMode('encrypt'); setResult(''); setError(null) }}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${mode === 'encrypt' ? 'bg-white dark:bg-[#1E2D47] text-blue-600 dark:text-[#00D4B4] shadow-sm' : 'text-gray-400'}`}
            >
              Encrypt
            </button>
            <button
              onClick={() => { setMode('decrypt'); setResult(''); setError(null) }}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${mode === 'decrypt' ? 'bg-white dark:bg-[#1E2D47] text-blue-600 dark:text-[#00D4B4] shadow-sm' : 'text-gray-400'}`}
            >
              Decrypt
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 flex items-center gap-2 ml-1">
              Input Text {isBulkMode && <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-[9px] px-1.5 py-0.5 rounded-full">BULK</span>}
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={isBulkMode ? (mode === 'encrypt' ? 'Enter multiple lines of sensitive data...' : 'Enter multiple lines of base64 ciphertext...') : (mode === 'encrypt' ? 'Enter sensitive data...' : 'Enter base64 ciphertext...')}
              className="w-full h-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono text-gray-800 dark:text-[#F0F6FF] outline-none focus:ring-2 focus:ring-blue-500/20 whitespace-pre"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-1">Secret Key (Password)</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters recommended"
                className="w-full p-4 pl-12 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono text-gray-800 dark:text-[#F0F6FF] outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <button
            onClick={processAes}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.01] active:scale-95 transition-all"
          >
            {mode === 'encrypt' ? 'Securely Encrypt' : 'Authorize & Decrypt'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Result</h3>
            <button onClick={copyResult} className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <div className={`p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] break-all ${isBulkMode ? 'whitespace-pre overflow-x-auto' : ''}`}>
            <code className="text-xs font-mono text-blue-600 dark:text-[#00D4B4]">{result}</code>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-wider">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}
    </div>
  )
}
