'use client'
import React, { useState } from 'react'
import { Shield, Copy, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<{[k:string]:string}>({})
  const [copied, setCopied] = useState<string|null>(null)

  const generate = async () => {
    if (!input) return
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const results: {[k:string]:string} = {}
    for (const algo of ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']) {
      const buf = await crypto.subtle.digest(algo, data)
      results[algo] = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
    }
    setHashes(results)
  }

  const handleCopy = (key: string) => { navigator.clipboard.writeText(hashes[key]); setCopied(key); setTimeout(() => setCopied(null), 2000) }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Hash Generator" slug="hash-generator" />
      <ToolSchema 
        name="Secure Hashing Utility (SHA-256, SHA-512)" 
        description="Generate secure cryptographic hashes using SHA-1, SHA-256, SHA-384, and SHA-512 algorithms instantly."
        slug="hash-generator"
        steps={[
          "Enter your text or data into the input field.",
          "Click 'Generate Secure Hashes' to calculate the values.",
          "Compare the different algorithm outputs (SHA-256 is recommended for security).",
          "Copy the generated hash for checksum or verification purposes."
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-slate-500 to-slate-700 rounded-2xl shadow-lg shadow-slate-500/20">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Hash Generator</h1>
            <p className="text-gray-500 dark:text-slate-400">Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes from any text</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm mb-6">
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Enter text to hash..." 
            className="w-full h-32 p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-slate-500 outline-none resize-none mb-4 dark:text-white" 
          />
          <button onClick={generate} className="w-full py-4 bg-slate-800 dark:bg-slate-700 text-white rounded-2xl font-bold hover:bg-slate-900 dark:hover:bg-slate-600 transition-all shadow-lg mb-8">Generate Secure Hashes</button>
          
          {Object.keys(hashes).length > 0 && (
            <div className="space-y-4">
              {Object.entries(hashes).map(([algo, hash]) => (
                <div key={algo} className="p-5 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 transition-all group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{algo} Algorithm</span>
                    <button onClick={() => handleCopy(algo)} className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white flex items-center gap-1.5 font-bold transition-colors">
                      {copied===algo ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} 
                      <span>{copied===algo ? 'Copied' : 'Copy Hash'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-sm text-gray-600 dark:text-slate-300 break-all bg-white dark:bg-slate-900 p-3 rounded-xl border border-gray-100 dark:border-slate-800">{hash}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <AdSlot className="mt-8" />

        <ToolInfo 
          title="Hash Generator"
          description="The WebToolkit Pro Hash Generator is a security-focused utility that allows you to calculate cryptographic checksums for any text or data. Hashing is a one-way mathematical function that turns an input into a fixed-size string of characters, which is typically a hexadecimal number."
          howItWorks="Our tool utilizes the browser's native Web Crypto API (`crypto.subtle.digest`) to perform high-speed, secure hashing. Because it runs locally in your browser, your sensitive data is never transmitted over the network, ensuring maximum privacy for password hashing or data integrity checks."
          features={[
            "Support for SHA-1, SHA-256, SHA-384, and SHA-512",
            "Hardware-accelerated hashing via Web Crypto API",
            "Real-time hexadecimal output generation",
            "Deterministic results (same input always yields same hash)",
            "100% Client-side: Your data remains private",
            "Optimized for large text blocks and API payloads"
          ]}
          faqs={[
            {
              q: "What is a cryptographic hash?",
              a: "A hash is a 'digital fingerprint' of data. It's used to verify data integrity, ensuring that a file or message hasn't been altered."
            },
            {
              q: "Which algorithm should I use?",
              a: "For most modern security needs, SHA-256 is the standard. SHA-512 is even more secure but produces a longer string. SHA-1 is considered legacy and should be used only for compatibility."
            },
            {
              q: "Can a hash be reversed?",
              a: "No. Cryptographic hashes are designed to be one-way functions. You cannot derive the original text from the hash value."
            },
            {
              q: "What is a hash collision?",
              a: "A collision occurs when two different inputs produce the same hash output. Modern algorithms like SHA-256 are designed to make collisions statistically impossible."
            }
          ]}
        />
      </div>
    </div>
  )
}
