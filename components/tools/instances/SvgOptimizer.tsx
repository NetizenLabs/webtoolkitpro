'use client'

import React, { useState } from 'react'
import { FileCode, Zap, Copy, Check } from 'lucide-react'

export default function SvgOptimizer() {
  const [svg, setSvg] = useState('')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const optimize = () => {
    const res = svg
      .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/>\s+</g, '><') // Strip space between tags
      .replace(/\s*([={}])\s*/g, '$1') // Strip space around attrs
      .replace(/px/g, '') // Strip px units
      .trim()
    setResult(res)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <FileCode className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">SVG Optimizer</h3>
        </div>

        <textarea
          value={svg}
          onChange={(e) => setSvg(e.target.value)}
          placeholder="<svg ...>...</svg>"
          className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono outline-none"
        />

        <button 
          onClick={optimize}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Optimize SVG
        </button>
      </div>

      {result && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Optimized XML</h3>
            <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2 text-gray-400">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] text-[10px] font-mono text-blue-600 break-all overflow-auto max-h-64">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
          <div className="mt-4 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
            Reduced size by {Math.round((1 - result.length / svg.length) * 100)}%
          </div>
        </div>
      )}
    </div>
  )
}
