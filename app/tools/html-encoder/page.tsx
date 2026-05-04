'use client'
import React, { useState } from 'react'
import { Code, Copy, Check } from 'lucide-react'

export default function HtmlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const encode = () => setOutput(input.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'))
  const decode = () => { const d=document.createElement('div'); d.innerHTML=input; setOutput(d.textContent||'') }
  const handleCopy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl"><Code className="w-8 h-8 text-white" /></div>
          <div><h1 className="text-3xl font-bold text-gray-900">HTML Encoder/Decoder</h1><p className="text-gray-500">Safely encode and decode HTML entities</p></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div><label className="block text-sm font-semibold text-gray-700 mb-2">Input</label>
            <textarea value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Enter HTML or text..." className="w-full h-64 p-4 font-mono text-sm bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none resize-none" />
            <div className="flex gap-3 mt-4">
              <button onClick={encode} className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-all">Encode HTML</button>
              <button onClick={decode} className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-all">Decode HTML</button>
            </div>
          </div>
          <div><div className="flex justify-between mb-2"><label className="text-sm font-semibold text-gray-700">Output</label>
            {output && <button onClick={handleCopy} className="text-sm text-violet-600 flex items-center gap-1">{copied?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4"/>}{copied?'Copied':'Copy'}</button>}</div>
            <textarea readOnly value={output} placeholder="Result here..." className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-2xl outline-none resize-none" />
          </div>
        </div>
        <div className="mt-8 h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space</div>
      </div>
    </div>
  )
}
