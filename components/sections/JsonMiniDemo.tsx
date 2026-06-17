'use client'

import React, { useState, useCallback } from 'react'
import Link from '@/components/ui/NativeLink';
import { FileJson, ArrowRight, Clipboard, Check, Sparkles } from 'lucide-react'

const SAMPLE_INPUT = `{"name":"Abu Sufyan","role":"Lead Architect","tools":135,"private":true,"stack":["Next.js","TypeScript","Edge"]}`

function formatJSON(raw: string): { result: string; error: string | null } {
  try {
    const parsed = JSON.parse(raw)
    return { result: JSON.stringify(parsed, null, 2), error: null }
  } catch (e: any) {
    return { result: '', error: e.message }
  }
}

export default function JsonMiniDemo() {
  const [input, setInput] = useState(SAMPLE_INPUT)
  const [copied, setCopied] = useState(false)

  const { result, error } = formatJSON(input)

  const handleCopy = useCallback(() => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [result])

  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[10px] font-bold font-mono uppercase tracking-[0.2em] rounded-full mb-5 border border-blue-200 dark:border-blue-800/50">
            <Sparkles className="w-3 h-3" /> Live Tool Demo
          </span>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
            Try the JSON Formatter — Right Now
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
            Paste any JSON below. 100% client-side — your data never leaves your browser.
          </p>
        </div>

        {/* Demo Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {/* Input */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-[#4A6080] font-mono flex items-center gap-1.5">
                <FileJson className="w-3 h-3" /> Input (Raw JSON)
              </span>
              <button
                onClick={() => setInput(SAMPLE_INPUT)}
                className="text-[10px] font-bold text-[#00D4B4] hover:underline uppercase tracking-wider font-mono"
              >
                Reset Sample
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              className="flex-1 min-h-[240px] w-full bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-[#1E2D47] rounded-[16px] p-5 text-sm font-mono text-gray-700 dark:text-[#8A9BBE] resize-none focus:outline-none focus:border-[#00D4B4]/50 focus:ring-2 focus:ring-[#00D4B4]/20 transition-all placeholder-gray-300 dark:placeholder-[#1E2D47]"
              placeholder="Paste your JSON here..."
              aria-label="JSON input"
            />
          </div>

          {/* Output */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-[#4A6080] font-mono">
                {error ? '⚠ Error' : '✓ Formatted Output'}
              </span>
              <button
                onClick={handleCopy}
                disabled={!!error || !result}
                className="text-[10px] font-bold uppercase tracking-wider font-mono flex items-center gap-1 disabled:opacity-40 text-[#00D4B4] hover:text-[#0094FF] transition-colors"
                aria-label="Copy formatted JSON"
              >
                {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Clipboard className="w-3 h-3" /> Copy</>}
              </button>
            </div>
            <div
              className={`flex-1 min-h-[240px] bg-gray-50 dark:bg-[#0B1120] border rounded-[16px] p-5 overflow-auto text-sm font-mono transition-all ${
                error
                  ? 'border-red-400/50 dark:border-red-500/30 text-red-500 dark:text-red-400'
                  : 'border-gray-200 dark:border-[#1E2D47] text-gray-700 dark:text-[#00D4B4]'
              }`}
              aria-live="polite"
              aria-label="Formatted JSON output"
            >
              {error ? (
                <span className="text-red-500 dark:text-red-400">{error}</span>
              ) : (
                <pre className="whitespace-pre-wrap break-all leading-relaxed">{result}</pre>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/tools/json-formatter/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] font-bold px-8 py-4 rounded-[14px] text-sm uppercase tracking-widest hover:shadow-xl hover:shadow-blue-500/20 hover:scale-[1.02] transition-all"
          >
            Open Full JSON Formatter <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-4 text-[10px] text-gray-400 dark:text-[#4A6080] font-mono uppercase tracking-widest">
            150+ tools available — no login, no tracking, no limits
          </p>
        </div>
      </div>
    </section>
  )
}
