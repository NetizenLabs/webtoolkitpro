'use client'

import React, { useState, useEffect } from 'react'
import { FileCode, Settings, Copy, Check, Plus, Trash2, Info } from 'lucide-react'

export default function DotenvGenerator() {
  const [vars, setVars] = useState<{ key: string; value: string; comment: string }[]>([
    { key: 'PORT', value: '3000', comment: 'Server listening port' },
    { key: 'DATABASE_URL', value: 'postgresql://user:pass@localhost:5432/db', comment: 'Prisma/DB connection string' },
    { key: 'JWT_SECRET', value: 'your-secure-secret', comment: 'Authentication secret' },
  ])
  const [config, setConfig] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let conf = ``
    vars.forEach(v => {
      if (v.comment) conf += `# ${v.comment}\n`
      conf += `${v.key}=${v.value}\n\n`
    })
    setConfig(conf.trim())
  }, [vars])

  const addVar = () => {
    setVars([...vars, { key: 'NEW_KEY', value: '', comment: '' }])
  }

  const removeVar = (index: number) => {
    setVars(vars.filter((_, i) => i !== index))
  }

  const updateVar = (index: number, field: string, val: string) => {
    const next = [...vars]
    ;(next[index] as any)[field] = val
    setVars(next)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">.env Generator</h3>
          </div>
          <button 
            onClick={addVar}
            className="px-4 py-2 bg-blue-500/10 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-3 h-3" /> Add Variable
          </button>
        </div>

        <div className="space-y-4">
          {vars.map((v, i) => (
            <div key={i} className="p-4 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={v.key}
                  onChange={(e) => updateVar(i, 'key', e.target.value)}
                  className="p-3 bg-white dark:bg-[#1E2D47] border border-gray-100 dark:border-white/5 rounded-xl text-xs font-mono outline-none uppercase"
                  placeholder="KEY"
                />
                <input
                  type="text"
                  value={v.value}
                  onChange={(e) => updateVar(i, 'value', e.target.value)}
                  className="p-3 bg-white dark:bg-[#1E2D47] border border-gray-100 dark:border-white/5 rounded-xl text-xs font-mono outline-none"
                  placeholder="VALUE"
                />
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={v.comment}
                  onChange={(e) => updateVar(i, 'comment', e.target.value)}
                  className="flex-1 p-2 bg-transparent text-[10px] font-medium text-gray-400 outline-none italic"
                  placeholder="Add a comment for this variable..."
                />
                <button onClick={() => removeVar(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">.env</h3>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(config)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] overflow-x-auto">
          <pre className="text-xs font-mono text-blue-600 dark:text-[#00D4B4] whitespace-pre-wrap">{config}</pre>
        </div>
      </div>
    </div>
  )
}
