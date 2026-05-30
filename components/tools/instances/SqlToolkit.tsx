'use client'

import React, { useState } from 'react'
import { Code, Terminal, ShieldAlert, Check, Copy, Trash2, ShieldCheck, Database, RefreshCw } from 'lucide-react'

// Simple mock formatters for client side
const formatSql = (sql: string) => {
  return sql
    .replace(/\s+/g, ' ')
    .replace(/(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|LEFT JOIN|RIGHT JOIN|INNER JOIN|LIMIT)/gi, '\n$1\n  ')
    .replace(/,\s*/g, ',\n    ')
    .trim()
}

const minifySql = (sql: string) => sql.replace(/\s+/g, ' ').trim()

const SQL_INJECTIONS = [
  "' OR '1'='1",
  "1; DROP TABLE users",
  "' UNION SELECT null, null--",
  "admin' --",
  "1' ORDER BY 1--",
  "1' AND SLEEP(5)--",
  "1' AND (SELECT * FROM (SELECT(SLEEP(5)))a)--"
]

export default function SqlToolkit() {
  const [activeTab, setActiveTab] = useState<'format' | 'minify' | 'sanitize'>('format')
  const [input, setInput] = useState('SELECT id, name, email FROM users WHERE status = 1 AND role = "admin" ORDER BY created_at DESC')
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getOutput = () => {
    if (!input) return ''
    if (activeTab === 'format') return formatSql(input)
    if (activeTab === 'minify') return minifySql(input)
    return ''
  }

  // Sanitizer view state
  const [testInput, setTestInput] = useState('')
  const [sanitizedOutput, setSanitizedOutput] = useState('')
  const [vulnerabilities, setVulnerabilities] = useState<string[]>([])

  const testInjection = () => {
    let vulns = []
    const lower = testInput.toLowerCase()
    if (lower.includes('drop ') || lower.includes('delete ') || lower.includes('truncate ')) vulns.push('Destructive DDL/DML detected (DROP/DELETE)')
    if (lower.includes('union ') || lower.includes('select ')) vulns.push('UNION-based injection risk')
    if (lower.includes('sleep(') || lower.includes('benchmark(')) vulns.push('Time-based blind injection risk')
    if (lower.includes('--') || lower.includes('/*') || lower.includes(';')) vulns.push('Statement terminators or comments found')
    if (lower.includes('1=1') || lower.includes("'1'='1")) vulns.push('Tautology evaluation (1=1)')
    
    setVulnerabilities(vulns)
    
    // Simple basic sanitizer simulation
    let clean = testInput
      .replace(/'/g, "''")
      .replace(/;/g, "")
      .replace(/--/g, "")
    setSanitizedOutput(clean)
  }

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'format', label: 'SQL Formatter', icon: Code },
          { id: 'minify', label: 'SQL Minifier', icon: Terminal },
          { id: 'sanitize', label: 'Injection Tester & Sanitizer', icon: ShieldAlert }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white dark:bg-[#0D1526] text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-[#1E2D47] hover:bg-gray-50 dark:hover:bg-[#1E2D47]'}`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'sanitize' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-6">Input Tester</h3>
              <textarea
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Enter suspicious SQL payload..."
                className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono outline-none dark:text-white"
              />
              <div className="flex gap-4 mt-6 overflow-x-auto pb-4">
                {SQL_INJECTIONS.slice(0, 4).map((inj, i) => (
                  <button key={i} onClick={() => setTestInput(inj)} className="shrink-0 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-xs font-mono rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 whitespace-nowrap text-gray-600 dark:text-gray-300">
                    {inj}
                  </button>
                ))}
              </div>
              <button onClick={testInjection} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mt-4">
                <ShieldCheck className="w-4 h-4" /> Scan & Sanitize
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm h-full">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-6">Analysis Results</h3>
              {vulnerabilities.length > 0 ? (
                <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl mb-6">
                  <h4 className="text-xs font-bold text-red-600 mb-2 flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> High Risk Detected</h4>
                  <ul className="list-disc pl-5 text-xs text-red-500 space-y-1">
                    {vulnerabilities.map((v, i) => <li key={i}>{v}</li>)}
                  </ul>
                </div>
              ) : testInput && sanitizedOutput ? (
                <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl mb-6">
                  <h4 className="text-xs font-bold text-green-600 flex items-center gap-2"><Check className="w-4 h-4" /> Clean Input</h4>
                </div>
              ) : null}
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Escaped Output (For SQL Context)</label>
                <div className="relative">
                  <textarea readOnly value={sanitizedOutput} className="w-full h-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-xl text-xs font-mono outline-none dark:text-gray-300" />
                  {sanitizedOutput && (
                    <button onClick={() => handleCopy(sanitizedOutput)} className="absolute top-4 right-4 p-2 bg-white dark:bg-[#1E2D47] rounded-lg shadow-sm border border-gray-100 dark:border-[#2A3F63] text-gray-500 hover:text-indigo-600 transition-colors">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Database className="w-3 h-3" /> Input SQL</label>
              <button onClick={() => setInput('')} className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/10 rounded-lg transition-all"><Trash2 className="w-4 h-4" /> Clear</button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="SELECT * FROM table..."
              className="flex-grow w-full p-6 font-mono text-sm bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none dark:text-white"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Output</label>
              {input && (
                <button onClick={() => handleCopy(getOutput())} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/10 rounded-lg transition-all">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
            <textarea
              readOnly
              value={getOutput()}
              className="flex-grow w-full p-6 font-mono text-sm bg-gray-50 dark:bg-[#0B1120] text-indigo-600 dark:text-[#00D4B4] border border-gray-100 dark:border-[#1E2D47] rounded-3xl shadow-inner outline-none resize-none"
            />
          </div>
        </div>
      )}
    </div>
  )
}
