'use client'

import React, { useState, useEffect } from 'react'
import { Key, Copy, RefreshCw, Check } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://wtkpro.site'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Tools',
                'item': 'https://wtkpro.site/tools'
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': 'Password Generator',
                'item': 'https://wtkpro.site/tools/password-generator'
              }
            ]
          }),
        }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-600 rounded-xl">
            <Key className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Password Generator</h1>
            <p className="text-gray-600">Create secure, random passwords instantly</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 bg-gray-900">
            <div className="flex items-center justify-between gap-4">
              <div className="text-2xl md:text-3xl font-mono text-white break-all tracking-wider">
                {password}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={generatePassword}
                  className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                  title="Generate New"
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleCopy}
                  className="p-3 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-all flex items-center gap-2"
                >
                  {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                  <span className="hidden sm:inline font-semibold">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <div className="flex justify-between mb-4">
                <label className="font-semibold text-gray-700">Password Length</label>
                <span className="text-indigo-600 font-bold">{length}</span>
              </div>
              <input 
                type="range" 
                min="4" 
                max="50" 
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
                <input 
                  type="checkbox" 
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="font-medium text-gray-700">Uppercase Letters</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
                <input 
                  type="checkbox" 
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="font-medium text-gray-700">Include Numbers</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
                <input 
                  type="checkbox" 
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="font-medium text-gray-700">Include Symbols</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
