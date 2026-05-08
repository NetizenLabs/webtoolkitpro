'use client'

import React, { useState } from 'react'
import { FileText, Copy, ArrowRightLeft, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

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
      <ToolSchema 
        name="Base64 Encoder & Decoder" 
        description="Quickly encode text to Base64 or decode Base64 strings back to plain text. Ideal for binary data transmission and API debugging."
        slug="base64-encoder"
        steps={[
          "Enter the text you want to encode or the Base64 string you want to decode.",
          "Click the appropriate button (Encode or Decode).",
          "Review the result in the output panel.",
          "Use the 'Swap' button to move the result back to the input for further processing."
        ]}
      />
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
        
        <AdSlot className="mt-8" />

        <ToolInfo 
          title="Base64 Encoder/Decoder"
          description="The WebToolkit Pro Base64 Encoder/Decoder is a developer-centric utility for handling binary-to-text encoding. Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation. This is commonly used when there is a need to encode binary data that needs to be stored and transferred over media that are designed to deal with textual data."
          howItWorks="Our tool uses the standard JavaScript `btoa()` (binary to ASCII) and `atob()` (ASCII to binary) functions. These functions handle the conversion of 8-bit bytes into a 6-bit representation, ensuring that the data can be transmitted safely through systems that might otherwise interpret binary data as control characters."
          features={[
            "Fast encoding from UTF-8 text to Base64",
            "Accurate decoding from Base64 to original text",
            "Real-time validation of Base64 string integrity",
            "One-click 'Swap' functionality for iterative processing",
            "Clean, distraction-free IDE-style interface",
            "100% Client-side: Data never leaves your browser"
          ]}
          faqs={[
            {
              q: "Why use Base64 encoding?",
              a: "Base64 is used to ensure data remains intact without modification during transport through text-based protocols like HTTP, SMTP (email), or when embedding images in HTML/CSS."
            },
            {
              q: "Is Base64 a form of encryption?",
              a: "No. Base64 is an encoding format, not encryption. It is easily reversible and provides zero security; its purpose is data compatibility, not secrecy."
            },
            {
              q: "Can Base64 handle non-Latin characters?",
              a: "Standard `btoa()` handles Latin-1 characters. For full UTF-8 support (including emojis or non-English text), we recommend first encoding the string to a URI component or using a TextEncoder."
            },
            {
              q: "Does Base64 increase file size?",
              a: "Yes. Base64 encoding typically increases the data size by approximately 33% compared to the original binary data."
            }
          ]}
        />
      </div>
    </div>
  )
}
