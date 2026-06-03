'use client'
import React, { useState } from 'react'
import { Copy, Check, Trash2 } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function HtmlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const handleEncode = () => {
    if (isBulkMode) {
      const lines = input.split('\n');
      const encodedLines = lines.map(line => 
        line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
      );
      setOutput(encodedLines.join('\n'));
    } else {
      setOutput(input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;'))
    }
  }
  
  const handleDecode = () => { 
    if (typeof document !== 'undefined') {
      const d = document.createElement('div')
      if (isBulkMode) {
        const lines = input.split('\n');
        const decodedLines = lines.map(line => {
          d.innerHTML = line;
          return d.textContent || '';
        });
        setOutput(decodedLines.join('\n'));
      } else {
        d.innerHTML = input
        setOutput(d.textContent || '') 
      }
    }
  }

  const handleCopy = () => { 
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) 
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk HTML Encoder" />
        <button onClick={() => { setInput(''); setOutput('') }} className="flex items-center gap-2 px-4 py-2 text-red-500 font-bold text-xs"><Trash2 className="w-4 h-4" /> Clear</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste HTML..." className="w-full h-80 p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] outline-none resize-none dark:text-white shadow-sm" />
          <div className="flex gap-4">
            <button onClick={handleEncode} className="flex-1 py-4 bg-violet-600 text-white rounded-2xl font-bold hover:bg-violet-700 transition-all shadow-lg uppercase tracking-widest text-xs">Encode HTML</button>
            <button onClick={handleDecode} className="flex-1 py-4 bg-gray-800 dark:bg-slate-800 text-white rounded-2xl font-bold hover:bg-gray-900 transition-all shadow-lg uppercase tracking-widest text-xs">Decode HTML</button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Result</label>
            {output && <button onClick={handleCopy} className="text-xs font-bold text-violet-600 flex items-center gap-2 px-4 py-2 bg-violet-50 dark:bg-violet-900/10 rounded-lg">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied' : 'Copy'}</button>}
          </div>
          <textarea readOnly value={output} placeholder="Result..." className="w-full h-[26rem] p-6 font-mono text-sm bg-gray-900 dark:bg-slate-950 text-gray-100 dark:text-violet-400 border border-gray-800 rounded-[2.5rem] outline-none resize-none shadow-2xl" />
        </div>
      </div>
    </div>
  )
}
