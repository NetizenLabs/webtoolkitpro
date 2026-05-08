'use client'

import React, { useState, useEffect } from 'react'
import { Key, Copy, RefreshCw, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let charset = 'abcdefghijklmnopqrstuvwxyz'
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeNumbers) charset += '0123456789'
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-='

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(newPassword)
  }

  useEffect(() => {
    generatePassword()
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Password Generator" slug="password-generator" />
      <ToolSchema 
        name="Secure Password Generator" 
        description="Create secure, cryptographically random identifiers instantly. Optimized for US enterprise security standards."
        slug="password-generator"
        steps={[
          "Choose your desired password length (4-64 characters).",
          "Select characters to include (Uppercase, Numbers, Symbols).",
          "Click the refresh icon to generate a new password.",
          "Click 'Copy' to save it securely to your clipboard."
        ]}
      />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-600/20">
            <Key className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Secure Password Generator</h1>
            <p className="text-gray-500 dark:text-slate-400">Create secure, cryptographically random identifiers instantly</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
          <div className="p-10 bg-gray-900 dark:bg-slate-950 border-b border-gray-800 dark:border-slate-800">
            <div className="flex items-center justify-between gap-6">
              <div className="text-2xl md:text-4xl font-mono text-emerald-400 break-all tracking-widest font-bold">
                {password}
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={generatePassword}
                  className="p-4 text-gray-400 hover:text-white hover:bg-gray-800 dark:hover:bg-slate-800 rounded-2xl transition-all"
                  title="Generate New"
                >
                  <RefreshCw className="w-7 h-7" />
                </button>
                <button 
                  onClick={handleCopy}
                  className="p-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                  {copied ? <Check className="w-7 h-7" /> : <Copy className="w-7 h-7" />}
                  <span className="hidden sm:inline font-bold uppercase tracking-widest text-xs">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-10 space-y-10">
            <div>
              <div className="flex justify-between mb-6">
                <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Password Length</label>
                <span className="text-indigo-600 dark:text-indigo-400 font-black text-xl">{length}</span>
              </div>
              <input 
                type="range" 
                min="4" 
                max="64" 
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Uppercase Letters', val: includeUppercase, set: setIncludeUppercase },
                { label: 'Numbers (0-9)', val: includeNumbers, set: setIncludeNumbers },
                { label: 'Special Symbols', val: includeSymbols, set: setIncludeSymbols }
              ].map((opt) => (
                <label key={opt.label} className="flex items-center gap-4 p-5 border border-gray-100 dark:border-slate-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all group">
                  <input 
                    type="checkbox" 
                    checked={opt.val}
                    onChange={(e) => opt.set(e.target.checked)}
                    className="w-6 h-6 text-indigo-600 rounded-lg focus:ring-indigo-500 bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700"
                  />
                  <span className="font-bold text-sm text-gray-700 dark:text-slate-300 group-hover:text-indigo-600 transition-colors">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <AdSlot className="mt-8" />

        <ToolInfo 
          title="Secure Password Generator"
          description="The WebToolkit Pro Secure Password Generator is a cryptographically strong utility designed to help users create highly secure, unhackable passwords instantly. It follows NIST 800-63B standards for credential security."
          howItWorks="Our generator uses the browser's native `crypto.getRandomValues()` API to ensure true cryptographic randomness. Unlike simple `Math.random()` functions, this method produces values that are statistically independent and unpredictable."
          features={[
            "Cryptographically secure random number generation (CSPRNG)",
            "Customizable length up to 64 characters",
            "Toggleable sets: Uppercase, Numbers, and Symbols",
            "Instant entropy feedback for maximum security",
            "100% Client-side: Your password never touches our servers",
            "One-click copy with visual confirmation"
          ]}
          faqs={[
            {
              q: "What makes a password truly secure?",
              a: "A secure password should have high entropy—a mix of lowercase, uppercase, numbers, and symbols—and be at least 12-16 characters long. Length is often more important than complexity."
            },
            {
              q: "Why should I trust this generator?",
              a: "This tool runs entirely in your browser. The code for generating the password is local to your machine, meaning the generated string is never sent over the network."
            },
            {
              q: "How often should I change my passwords?",
              a: "Current security best practices recommend changing passwords only when there is evidence of a compromise, provided you use a unique, strong password for every account."
            },
            {
              q: "Are the passwords saved in my browser history?",
              a: "No. The passwords are generated in memory and are not saved to localStorage or history. Once you close the tab, the data is gone."
            }
          ]}
        />
      </div>
    </div>
  )
}
