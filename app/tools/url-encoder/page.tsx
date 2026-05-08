'use client'

import React, { useState } from 'react'
import { Link as LinkIcon, Copy, ArrowRightLeft, Check, Trash2, ArrowRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function UrlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const encode = () => setOutput(encodeURIComponent(input))

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input))
    } catch (err) {
      setOutput('Error: Invalid URL encoding sequence detected.')
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

  const clearAll = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="URL Encoder/Decoder" slug="tools/url-encoder" />
      <ToolSchema 
        name="Universal URL Encoder & Decoder" 
        description="Encode or decode strings for URI compatibility. Ensure your query parameters and URLs are safe for all web browsers and servers."
        slug="url-encoder"
        steps={[
          "Enter your raw URL or string in the input panel.",
          "Click 'Encode URL' to convert special characters to percent-encoding.",
          "Click 'Decode URL' to convert an encoded string back to plain text.",
          "Use the 'Swap' feature to iteratively process complex nested URLs."
        ]}
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-600/20">
              <LinkIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">URL Encoder/Decoder</h1>
              <p className="text-gray-500 dark:text-slate-400">Safely encode and decode strings for URI compatibility and security</p>
            </div>
          </div>
          
          <button 
            onClick={clearAll}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-all border border-red-100 dark:border-red-900/30"
          >
            <Trash2 className="w-4 h-4" /> Clear Editor
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest px-2">Source URI Content</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste URL or raw string here..."
              className="w-full h-80 p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] focus:ring-2 focus:ring-emerald-500 outline-none resize-none dark:text-white shadow-sm transition-all"
            />
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={encode}
                className="py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-xs"
              >
                Encode URL
              </button>
              <button
                onClick={decode}
                className="py-4 bg-gray-800 dark:bg-slate-800 text-white rounded-2xl font-bold hover:bg-gray-900 dark:hover:bg-slate-700 transition-all shadow-lg uppercase tracking-widest text-xs"
              >
                Decode URL
              </button>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Processed Output</label>
              <div className="flex gap-2">
                <button 
                  onClick={swap}
                  className="p-2.5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 rounded-xl transition-all border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/30"
                  title="Move to input"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
                {output && (
                  <button 
                    onClick={handleCopy}
                    className="p-2.5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 rounded-xl transition-all border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/30"
                  >
                    {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                )}
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              placeholder="Encoded/Decoded result will appear here..."
              className="w-full h-[26rem] p-6 font-mono text-sm bg-gray-900 dark:bg-slate-950 text-gray-100 dark:text-emerald-400 border border-gray-800 dark:border-slate-800 rounded-[2.5rem] outline-none resize-none shadow-2xl shadow-emerald-900/5 transition-all"
            />
          </div>
        </div>

        {/* Security Insight Footer */}
        <div className="bg-emerald-600 rounded-[3rem] p-10 text-white relative overflow-hidden group mb-16 shadow-xl shadow-emerald-500/20">
          <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Web Standard URI Safety</h3>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Properly encoding query parameters is essential for SEO and API stability. Ensure all special characters are converted to their percent-encoded equivalents to prevent data loss in transit.
              </p>
            </div>
            <Link 
              href="/tools/html-encoder/"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              Try HTML Encoder <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <AdSlot />

        <ToolInfo 
          title="URL Encoder/Decoder"
          description="The WebToolkit Pro URL Encoder/Decoder is a critical utility for ensuring data integrity during web transmission. URL encoding, also known as 'percent-encoding', is a mechanism for encoding information in a Uniform Resource Identifier (URI) by replacing 'unsafe' characters with a '%' followed by their two-digit hexadecimal equivalent."
          howItWorks="Our tool uses the standard JavaScript `encodeURIComponent()` and `decodeURIComponent()` methods. These functions are designed to handle all non-standard characters, including spaces, emojis, and special symbols (like &, ?, and =), ensuring that your query strings are correctly interpreted by web servers and APIs without being truncated or corrupted."
          features={[
            "RFC 3986 compliant percent-encoding",
            "Safe-mode decoding with error handling",
            "Real-time transformation of URI components",
            "One-click 'Swap' for multi-stage decoding",
            "Clean, hexadecimal formatting for encoded outputs",
            "100% Client-side: Your URLs are never tracked"
          ]}
          faqs={[
            {
              q: "Why do I need to encode URLs?",
              a: "URLs can only contain certain characters from the US-ASCII character set. Characters outside this set (like spaces or non-English letters) must be encoded to work in a browser."
            },
            {
              q: "What characters are usually encoded?",
              a: "Reserved characters like '?', '&', '=', and '#' are often encoded when they appear in a query parameter value to prevent them from being interpreted as URL delimiters."
            },
            {
              q: "Is there a difference between encodeURI and encodeURIComponent?",
              a: "Yes. `encodeURI` is meant for a full URL (it doesn't encode /, ?, or &), while `encodeURIComponent` is meant for parameter values and encodes almost everything."
            },
            {
              q: "What is a percent-encoded space?",
              a: "A space character is typically encoded as '%20' in a URL, although in query parameters, it is sometimes represented as a '+' sign."
            }
          ]}
        />
      </div>
    </div>
  )
}
