'use client'

import React, { useState } from 'react'
import { FileText, Copy, ArrowRightLeft, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export default function Base64Encoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const encode = () => {
    try {
      setOutput(btoa(input))
    } catch (err) {
      setOutput('Error: Invalid input for Base64 encoding')
    }
  }

  const decode = () => {
    try {
      setOutput(atob(input))
    } catch (err) {
      setOutput('Error: Invalid Base64 string')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const swap = () => {
    setInput(output)
    setOutput('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Base64 Encoder/Decoder" slug="base64-encoder" />
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-purple-600 rounded-2xl shadow-lg shadow-purple-600/20">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Base64 Encoder/Decoder</h1>
            <p className="text-gray-500 dark:text-slate-400">Securely encode and decode data to/from Base64 format</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Input Source</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text or base64 here..."
              className="w-full h-72 p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none dark:text-white transition-all"
            />
            <div className="flex gap-4">
              <button
                onClick={encode}
                className="flex-1 py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
              >
                Encode to Base64
              </button>
              <button
                onClick={decode}
                className="flex-1 py-4 bg-gray-800 dark:bg-slate-700 text-white rounded-2xl font-bold hover:bg-gray-900 dark:hover:bg-slate-600 transition-all shadow-md"
              >
                Decode from Base64
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Process Result</label>
              <div className="flex gap-2">
                <button 
                  onClick={swap}
                  className="p-2 text-gray-400 dark:text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/10 rounded-xl transition-all"
                  title="Move result to input"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleCopy}
                  className="p-2 text-gray-400 dark:text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/10 rounded-xl transition-all"
                >
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              placeholder="Result will appear here..."
              className="w-full h-72 p-6 font-mono text-sm bg-gray-900 dark:bg-slate-900 text-gray-100 dark:text-emerald-400 border border-gray-800 dark:border-slate-800 rounded-3xl shadow-2xl outline-none resize-none"
            />
          </div>
        </div>
        
        <div className="mt-12 h-[90px] bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ad Placement</span>
        </div>
      </div>
    </div>
  )
}
