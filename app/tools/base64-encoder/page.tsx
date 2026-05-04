'use client'

import React, { useState } from 'react'
import { FileText, Copy, ArrowRightLeft, Check } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-purple-600 rounded-xl">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Base64 Encoder/Decoder</h1>
            <p className="text-gray-600">Securely encode and decode data to/from Base64 format</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Text / Base64 Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text or base64 here..."
              className="w-full h-64 p-4 font-mono text-sm bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
            />
            <div className="flex gap-4">
              <button
                onClick={encode}
                className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all"
              >
                Encode to Base64
              </button>
              <button
                onClick={decode}
                className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-all"
              >
                Decode from Base64
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">Result</label>
              <div className="flex gap-2">
                <button 
                  onClick={swap}
                  className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  title="Move result to input"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleCopy}
                  className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
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
