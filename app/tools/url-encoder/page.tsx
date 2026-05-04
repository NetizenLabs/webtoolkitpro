'use client'

import React, { useState } from 'react'
import { Link, Copy, ArrowRightLeft, Check } from 'lucide-react'

export default function UrlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const encode = () => {
    setOutput(encodeURIComponent(input))
  }

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input))
    } catch (err) {
      setOutput('Error: Invalid URL encoding')
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-600 rounded-xl">
            <Link className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">URL Encoder/Decoder</h1>
            <p className="text-gray-600">Encode and decode URLs to make them web-safe</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">URL / String Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste URL or string here..."
              className="w-full h-64 p-4 font-mono text-sm bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
            />
            <div className="flex gap-4">
              <button
                onClick={encode}
                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all"
              >
                Encode URL
              </button>
              <button
                onClick={decode}
                className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-all"
              >
                Decode URL
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">Result</label>
              <div className="flex gap-2">
                <button 
                  onClick={swap}
                  className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                  title="Move result to input"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleCopy}
                  className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              placeholder="Result will appear here..."
              className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-gray-100 border border-gray-800 rounded-2xl shadow-sm outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
