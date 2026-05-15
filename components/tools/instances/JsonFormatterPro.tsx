'use client'

import React, { useState, useEffect } from 'react'
import { FileJson, Search, Copy, Check, Trash2, ArrowDownWideEqual, ChevronRight, ChevronDown, ListTree, Code } from 'lucide-react'

export default function JsonFormatterPro() {
  const [json, setJson] = useState('{\n  "id": "user_01H2",\n  "name": "Alex Rivera",\n  "active": true,\n  "roles": ["Admin", "Developer"],\n  "metadata": {\n    "last_login": "2026-05-15T14:30:00Z",\n    "ip_source": "192.168.1.45"\n  },\n  "stats": {\n    "logins": 124,\n    "errors": 0\n  }\n}')
  const [parsed, setParsed] = useState<any>(null)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      if (json.trim()) {
        const data = JSON.parse(json)
        setParsed(data)
        setError('')
      } else {
        setParsed(null)
      }
    } catch (e: any) {
      setError(e.message)
      setParsed(null)
    }
  }, [json])

  const formatJson = (type: 'compact' | 'pretty') => {
    if (!parsed) return
    setJson(JSON.stringify(parsed, null, type === 'pretty' ? 2 : 0))
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Pane */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Code className="w-4 h-4" /> Source JSON
            </label>
            <div className="flex gap-4">
              <button onClick={() => formatJson('pretty')} className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Beautify</button>
              <button onClick={() => formatJson('compact')} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:underline">Minify</button>
            </div>
          </div>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            className="w-full h-[600px] p-6 font-mono text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] outline-none resize-none dark:text-white focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            placeholder="Paste your JSON here..."
          />
        </div>

        {/* Pro Viewer Pane */}
        <div className="space-y-4 h-full flex flex-col">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <ListTree className="w-4 h-4" /> Pro Tree View
            </label>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search keys..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 transition-all w-32 focus:w-48"
                />
              </div>
              <button 
                onClick={handleCopy}
                className="p-1.5 bg-blue-50 dark:bg-blue-900/10 text-blue-600 rounded-lg"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="relative flex-grow bg-[#0F172A] border border-slate-800 rounded-[2.5rem] p-8 overflow-auto custom-scrollbar shadow-2xl">
            {error ? (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 font-mono text-xs">
                <Trash2 className="w-4 h-4" /> {error}
              </div>
            ) : parsed ? (
              <JsonTree data={parsed} search={searchTerm} />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 font-mono text-xs">Waiting for input...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function JsonTree({ data, search }: { data: any; search: string }) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const renderValue = (val: any, path: string = 'root') => {
    const isSearchMatch = search && path.toLowerCase().includes(search.toLowerCase())
    
    if (val === null) return <span className="text-gray-500">null</span>
    if (typeof val === 'boolean') return <span className="text-amber-400 font-bold">{val.toString()}</span>
    if (typeof val === 'number') return <span className="text-purple-400 font-bold">{val}</span>
    if (typeof val === 'string') return <span className="text-emerald-400">"{val}"</span>
    
    const isArray = Array.isArray(val)
    const isExpanded = !collapsed[path]

    return (
      <div className="pl-4">
        <button 
          onClick={() => toggle(path)}
          className="flex items-center gap-1 -ml-6 text-slate-500 hover:text-white transition-all py-0.5"
        >
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          <span className="text-[10px] font-bold opacity-50">{isArray ? `Array[${val.length}]` : 'Object'}</span>
        </button>
        
        {isExpanded && (
          <div className="border-l border-slate-800 ml-[-7px] pl-4 space-y-1.5 my-1">
            {Object.entries(val).map(([k, v]) => (
              <div key={k} className="font-mono text-xs flex flex-col sm:flex-row sm:items-start gap-1">
                <span className={`font-bold ${isSearchMatch ? 'text-yellow-400' : 'text-blue-400'}`}>{k}:</span>
                {renderValue(v, `${path}.${k}`)}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="font-mono text-xs text-slate-300">
      {renderValue(data)}
    </div>
  )
}
