'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Search, Info, Copy, Check, Trash2, AlertCircle } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function RegexTester() {
  const [regex, setRegex] = useState('')
  const [flags, setFlags] = useState('g')
  const [testText, setTestText] = useState('')
  const [matches, setMatches] = useState<any[]>([])
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const supportedFlags = [
    { id: 'g', label: 'global', desc: 'Find all matches' },
    { id: 'i', label: 'ignore case', desc: 'Case-insensitive matching' },
    { id: 'm', label: 'multiline', desc: '^ and $ match start/end of lines' },
    { id: 's', label: 'dotall', desc: '. matches newline' },
    { id: 'u', label: 'unicode', desc: 'Full unicode support' },
  ]

  const toggleFlag = (flag: string) => {
    setFlags(prev => prev.includes(flag) ? prev.replace(flag, '') : prev + flag)
  }

  const performMatch = React.useCallback(() => {
    if (!regex) {
      setMatches([])
      setError('')
      return
    }

    try {
      const re = new RegExp(regex, flags)
      const foundMatches = []
      let match
      
      // Reset lastIndex for global regex
      if (flags.includes('g')) {
        while ((match = re.exec(testText)) !== null) {
          foundMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          })
          if (match[0].length === 0) re.lastIndex++ // Avoid infinite loop
        }
      } else {
        match = re.exec(testText)
        if (match) {
          foundMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          })
        }
      }
      
      setMatches(foundMatches)
      setError('')
    } catch (err: any) {
      setError(err.message)
      setMatches([])
    }
  }, [regex, flags, testText])

  useEffect(() => {
    performMatch()
  }, [performMatch])

  const highlightedText = useMemo(() => {
    if (!testText) return 'Your matches will appear here...'
    
    if (isBulkMode) {
      if (!regex) return 'Enter a regex to filter matching lines...'
      const lines = testText.split('\n')
      let re: RegExp
      try { re = new RegExp(regex, flags) } catch { return 'Invalid Regex' }
      const matchedLines = lines.filter(line => {
        // Remove global flag for test to prevent stateful regex bugs
        const reCopy = new RegExp(regex, flags.replace('g', ''))
        return reCopy.test(line)
      })
      if (matchedLines.length === 0) return 'No lines matched.'
      return `[Filtered ${matchedLines.length} matched lines]\n\n` + matchedLines.join('\n')
    }

    if (matches.length === 0) return testText

    // Simple highlighting for demonstration
    // Note: In a production app, we would use a more sophisticated overlapping match highlighter
    let result = []
    let lastIndex = 0
    
    matches.forEach((match, idx) => {
      // Add text before match
      result.push(testText.substring(lastIndex, match.index))
      // Add highlighted match
      result.push(
        <span key={idx} className="bg-[#00D4B4]/20 text-[#00D4B4] border-b border-[#00D4B4] font-bold">
          {match.text}
        </span>
      )
      lastIndex = match.index + match.text.length
    })
    
    result.push(testText.substring(lastIndex))
    return result
  }, [testText, matches, isBulkMode, regex, flags])

  return (
    <div className="space-y-6">
      <div className="flex justify-end px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Line Filter" />
      </div>
      <div className="bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 md:p-10 shadow-xl shadow-gray-200/40 dark:shadow-none group focus-within:border-blue-500/50 focus-within:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-grow w-full">
            <label className="text-[10px] font-black text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-3 block drop-shadow-sm group-focus-within:text-blue-500 transition-colors">Regular Expression</label>
            <div className="relative group/input">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-lg group-focus-within/input:text-blue-500 transition-colors duration-300">/</span>
              <input
                value={regex}
                onChange={(e) => setRegex(e.target.value)}
                placeholder="([a-z0-9._%+-]+)@([a-z0-9.-]+\.[a-z]{2,})"
                className="w-full bg-gray-50/50 dark:bg-[#0D1526] border-2 border-transparent rounded-2xl py-6 pl-12 pr-16 font-mono text-lg dark:text-white focus:border-blue-500/30 focus:bg-white dark:focus:bg-[#0B1120] outline-none transition-all duration-300 focus:shadow-inner"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-lg group-focus-within/input:text-blue-500 transition-colors duration-300">/{flags}</span>
            </div>
            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-500 text-xs font-bold bg-red-50 dark:bg-red-500/10 p-3 rounded-xl border border-red-100 dark:border-red-500/20">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
          
          <div className="shrink-0 w-full md:w-auto">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-3 block">Flags</label>
            <div className="flex flex-wrap gap-2">
              {supportedFlags.map(flag => (
                <button
                  key={flag.id}
                  onClick={() => toggleFlag(flag.id)}
                  title={flag.desc}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                    flags.includes(flag.id)
                      ? 'bg-[#00D4B4]/10 border-[#00D4B4] text-[#00D4B4]'
                      : 'bg-[#0B1120] border-[#1E2D47] text-gray-500 hover:border-gray-600'
                  }`}
                >
                  {flag.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Test String */}
        <div className="space-y-4 group">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black text-gray-500 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 drop-shadow-sm group-focus-within:text-blue-500 transition-colors">
              Test String {isBulkMode && <span className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-[9px] px-2 py-0.5 rounded-md shadow-sm">BULK</span>}
            </label>
            <button 
              onClick={() => setTestText('')}
              className="text-xs font-bold text-red-500 hover:text-white flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/10 hover:bg-red-500 dark:hover:bg-red-500 rounded-lg transition-all duration-300 shadow-sm active:scale-95 border border-transparent hover:border-red-600"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Insert text to test your regex..."
            className="w-full h-[350px] p-6 font-mono text-sm bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border border-gray-100 dark:border-[#1E2D47] rounded-3xl shadow-xl shadow-gray-200/40 dark:shadow-none focus:border-blue-500/50 focus:shadow-[0_0_30px_rgba(59,130,246,0.15)] focus:bg-white dark:focus:bg-[#0D1526] outline-none resize-none dark:text-white transition-all duration-500 custom-scrollbar"
          />
        </div>

        {/* Highlighted Results */}
        <div className="space-y-4 group">
          <label className="text-[10px] font-black text-gray-500 dark:text-slate-500 uppercase tracking-widest drop-shadow-sm">
            {isBulkMode ? 'Filtered Lines' : 'Match Result'}
          </label>
          <div className={`w-full h-[350px] p-6 font-mono text-sm bg-[#0B1120]/90 backdrop-blur-xl border border-[#1E2D47] rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-auto dark:text-[#8A9BBE] custom-scrollbar transition-all duration-500 group-hover:border-[#00D4B4]/30 group-hover:shadow-[0_0_40px_rgba(0,212,180,0.1)] ${isBulkMode ? 'whitespace-pre overflow-x-auto' : 'whitespace-pre-wrap'}`}>
            {highlightedText}
          </div>
        </div>
      </div>

      {/* Stats and Explainer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0D1526] border border-[#1E2D47] p-6 rounded-2xl">
          <h4 className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-[0.2em] mb-4">Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 font-medium">Matches Found:</span>
              <span className="text-lg font-bold text-white">{matches.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 font-medium">Text Length:</span>
              <span className="text-xs font-bold text-white">{testText.length} chars</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-[#0D1526] border border-[#1E2D47] p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Info className="w-12 h-12 text-[#00D4B4]" />
          </div>
          <h4 className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-[0.2em] mb-4">Quick Explainer (AIO Enabled)</h4>
          <p className="text-xs text-[#8A9BBE] leading-relaxed font-medium">
            {regex 
              ? `Your regex is looking for matches starting at the first ${regex.includes('^') ? 'start of line' : 'available character'} and will capture groups defined by parentheses. Use the flags above to modify behavioral constraints.`
              : 'Enter a regular expression above to see a detailed structural explanation. All processing is 100% client-side for maximum security.'}
          </p>
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#00D4B4]" /> V8 Engine
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> RFC Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
