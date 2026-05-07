'use client'

import React, { useState, useEffect } from 'react'
import { Key, Copy, RefreshCw, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

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
        
        <div className="mt-12 h-[90px] bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ad Placement</span>
        </div>
      </div>
    </div>
  )
}
