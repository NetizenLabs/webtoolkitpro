'use client'

import React, { useState, useMemo } from 'react'
import { Copy, Check, GitCompare, Trash2 } from 'lucide-react'

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged'
  text: string
  lineNumLeft?: number
  lineNumRight?: number
}

function computeDiff(original: string, modified: string): DiffLine[] {
  const linesA = original.split('\n')
  const linesB = modified.split('\n')

  // Simple LCS-based diff
  const m = linesA.length
  const n = linesB.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (linesA[i - 1] === linesB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  const result: DiffLine[] = []
  let i = m, j = n
  let leftLine = m, rightLine = n

  const trace: DiffLine[] = []
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      trace.push({ type: 'unchanged', text: linesA[i - 1], lineNumLeft: i, lineNumRight: j })
      i--; j--
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      trace.push({ type: 'added', text: linesB[j - 1], lineNumRight: j })
      j--
    } else {
      trace.push({ type: 'removed', text: linesA[i - 1], lineNumLeft: i })
      i--
    }
  }

  return trace.reverse()
}

export default function DiffChecker() {
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [copied, setCopied] = useState(false)

  const diff = useMemo(() => {
    if (!original && !modified) return []
    return computeDiff(original, modified)
  }, [original, modified])

  const stats = useMemo(() => {
    const added = diff.filter(d => d.type === 'added').length
    const removed = diff.filter(d => d.type === 'removed').length
    const unchanged = diff.filter(d => d.type === 'unchanged').length
    return { added, removed, unchanged }
  }, [diff])

  const copyDiff = () => {
    const text = diff.map(d => {
      const prefix = d.type === 'added' ? '+ ' : d.type === 'removed' ? '- ' : '  '
      return prefix + d.text
    }).join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lineStyle: Record<string, string> = {
    added: 'bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-300',
    removed: 'bg-red-500/10 border-l-2 border-red-500 text-red-300',
    unchanged: 'text-[#8A9BBE]',
  }

  const prefixStyle: Record<string, string> = {
    added: 'text-emerald-500 font-bold select-none w-4 shrink-0',
    removed: 'text-red-500 font-bold select-none w-4 shrink-0',
    unchanged: 'text-gray-600 select-none w-4 shrink-0',
  }

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Original Text</label>
            <button onClick={() => setOriginal('')} className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 px-2 py-1 bg-red-900/10 rounded-lg transition-all">
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>
          <textarea
            value={original}
            onChange={e => setOriginal(e.target.value)}
            placeholder="Paste your original text here..."
            className="w-full h-56 p-5 font-mono text-sm bg-[#0D1526] border border-[#1E2D47] rounded-2xl text-white focus:ring-2 focus:ring-[#00D4B4] outline-none resize-none transition-all placeholder:text-gray-600"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Modified Text</label>
            <button onClick={() => setModified('')} className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 px-2 py-1 bg-red-900/10 rounded-lg transition-all">
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>
          <textarea
            value={modified}
            onChange={e => setModified(e.target.value)}
            placeholder="Paste your modified text here..."
            className="w-full h-56 p-5 font-mono text-sm bg-[#0D1526] border border-[#1E2D47] rounded-2xl text-white focus:ring-2 focus:ring-[#00D4B4] outline-none resize-none transition-all placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* Stats Bar */}
      {diff.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#0D1526] border border-[#1E2D47] rounded-2xl">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-emerald-400">+{stats.added} added</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-xs font-bold text-red-400">-{stats.removed} removed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-500" />
              <span className="text-xs font-bold text-gray-400">{stats.unchanged} unchanged</span>
            </div>
          </div>
          <button
            onClick={copyDiff}
            className="flex items-center gap-2 px-4 py-2 bg-[#00D4B4]/10 border border-[#00D4B4]/30 text-[#00D4B4] rounded-xl text-xs font-bold hover:bg-[#00D4B4]/20 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Diff'}
          </button>
        </div>
      )}

      {/* Diff Output */}
      {diff.length > 0 ? (
        <div className="bg-[#0B1120] border border-[#1E2D47] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-[#1E2D47]">
            <GitCompare className="w-4 h-4 text-[#00D4B4]" />
            <span className="text-xs font-bold text-[#00D4B4] uppercase tracking-widest">Diff Output</span>
          </div>
          <div className="overflow-auto max-h-[500px] p-4 font-mono text-sm">
            {diff.map((line, idx) => (
              <div key={idx} className={`flex items-start gap-3 px-3 py-0.5 rounded ${lineStyle[line.type]}`}>
                <span className={prefixStyle[line.type]}>
                  {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                </span>
                <span className="text-xs leading-relaxed whitespace-pre-wrap break-all">{line.text || ' '}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-[#0D1526] border border-[#1E2D47] rounded-2xl">
          <GitCompare className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-medium">Paste text in both boxes to see the diff</p>
        </div>
      )}
    </div>
  )
}
