'use client'

import React, { useState } from 'react'
import { Info, Search, Zap, Code, HelpCircle, Check, Copy } from 'lucide-react'

export default function RegexExplainer() {
  const [regex, setRegex] = useState('^([a-zA-Z0-9._%-]+)@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,6})$')
  const [explanation, setExplanation] = useState<string[]>([])

  const explainRegex = () => {
    const parts: string[] = []
    
    if (regex.startsWith('^')) parts.push('**^**: Matches the beginning of the string.')
    if (regex.endsWith('$')) parts.push('**$**: Matches the end of the string.')
    
    if (regex.includes('[a-zA-Z0-9._%-]')) parts.push('**[a-zA-Z0-9._%-]**: Matches any letter (a-z, A-Z), digit (0-9), dot, underscore, percent, or hyphen.')
    if (regex.includes('+')) parts.push('**+**: Quantifier — Matches between one and unlimited times.')
    if (regex.includes('@')) parts.push('**@**: Matches the "@" character literally.')
    if (regex.includes('\\.')) parts.push('**\\.**: Matches the "." character literally (escaped).')
    if (regex.includes('{2,6}')) parts.push('**{2,6}**: Quantifier — Matches between 2 and 6 times.')
    
    if (parts.length === 0) {
      parts.push('No common patterns detected. This is a custom literal or complex expression.')
    }
    
    setExplanation(parts)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm">
        <div className="space-y-6">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Regex Pattern</label>
            <HelpCircle className="w-4 h-4 text-gray-300" />
          </div>
          <div className="relative">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-lg">/</div>
            <input 
              type="text"
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              className="w-full pl-10 pr-10 py-5 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl text-sm font-mono dark:text-blue-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-lg">/g</div>
          </div>
          
          <button 
            onClick={explainRegex}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black hover:scale-[1.02] transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest text-xs flex items-center justify-center gap-3"
          >
            <Search className="w-4 h-4" /> Explain Pattern
          </button>
        </div>
      </div>

      {explanation.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-[#0B1120] border border-[#1E2D47] rounded-[2.5rem] p-10">
            <h4 className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Code className="w-4 h-4" /> Semantic Breakdown
            </h4>
            <div className="space-y-4">
              {explanation.map((line, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-1.5 h-1.5 bg-[#00D4B4] rounded-full mt-1.5 shrink-0 group-hover:scale-150 transition-all" />
                  <p className="text-sm text-slate-300 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-black">$1</span>') }} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-blue-50 dark:bg-blue-900/5 border border-blue-100 dark:border-blue-900/20 rounded-3xl">
              <div className="flex items-center gap-4 mb-4">
                <Zap className="w-6 h-6 text-blue-500" />
                <h5 className="text-sm font-bold text-blue-900 dark:text-blue-400 tracking-tight uppercase">Quick Reference</h5>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-widest">
                <div className="p-3 bg-white/50 dark:bg-white/5 rounded-xl border border-blue-100 dark:border-blue-900/10 text-blue-600">. Any Char</div>
                <div className="p-3 bg-white/50 dark:bg-white/5 rounded-xl border border-blue-100 dark:border-blue-900/10 text-blue-600">\d Digit</div>
                <div className="p-3 bg-white/50 dark:bg-white/5 rounded-xl border border-blue-100 dark:border-blue-900/10 text-blue-600">\w Word</div>
                <div className="p-3 bg-white/50 dark:bg-white/5 rounded-xl border border-blue-100 dark:border-blue-900/10 text-blue-600">\s Space</div>
              </div>
            </div>

            <div className="p-8 bg-amber-50 dark:bg-amber-900/5 border border-amber-100 dark:border-amber-900/20 rounded-3xl">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-amber-500 shrink-0" />
                <p className="text-xs text-amber-800/70 dark:text-amber-500/70 leading-relaxed font-medium">
                  Regular expressions are powerful but can be cryptic. This tool helps demystify the pattern logic so you can debug and optimize your matches more effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
