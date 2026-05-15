'use client'

import React, { useState } from 'react'
import { Terminal, Copy, Check, Trash2, GitBranch, GitCommit, GitMerge, Zap } from 'lucide-react'

export default function GitHelper() {
  const [copied, setCopied] = useState<string | null>(null)

  const commands = [
    { label: 'Undo Last Commit (Keep Changes)', cmd: 'git reset --soft HEAD~1' },
    { label: 'Discard All Local Changes', cmd: 'git reset --hard HEAD' },
    { label: 'Rename Current Branch', cmd: 'git branch -m <new-name>' },
    { label: 'Delete Local Branch', cmd: 'git branch -d <branch-name>' },
    { label: 'Force Push (Careful!)', cmd: 'git push origin <branch> --force' },
    { label: 'Clean Untracked Files', cmd: 'git clean -fd' }
  ]

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd)
    setCopied(cmd)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {commands.map((c, i) => (
          <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl hover:border-blue-500/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{c.label}</span>
              <button 
                onClick={() => handleCopy(c.cmd)}
                className="p-2 bg-gray-50 dark:bg-slate-950 text-gray-400 hover:text-blue-500 rounded-xl transition-all"
              >
                {copied === c.cmd ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <code className="text-xs font-mono text-blue-600 dark:text-blue-400 break-all bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg block">
              {c.cmd}
            </code>
          </div>
        ))}
      </div>

      <div className="p-8 bg-purple-50 dark:bg-purple-900/5 border border-purple-100 dark:border-purple-900/20 rounded-3xl flex items-start gap-6">
        <Zap className="w-8 h-8 text-purple-500 shrink-0" />
        <div>
          <h5 className="text-lg font-bold text-purple-900 dark:text-purple-400 mb-2 tracking-tight">Quick Command Reference</h5>
          <p className="text-sm text-purple-800/70 dark:text-purple-500/70 leading-relaxed font-medium">
            Common Git commands that are hard to remember but essential for daily workflow. Save time and avoid searching documentation for these high-frequency operations.
          </p>
        </div>
      </div>
    </div>
  )
}
