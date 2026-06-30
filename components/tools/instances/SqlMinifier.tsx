'use client'

import React, { useState, useEffect } from 'react'
import { Terminal, Zap, Copy, Check, FileDown, RotateCcw, AlertTriangle, BarChart3, Database } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

export default function SqlMinifier() {
  const [sql, setSql] = useState('')
  const [minified, setMinified] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ original: 0, minified: 0, percentage: 0 })

  const minifySqlQuery = (inputSql: string) => {
    // Basic comment stripping and whitespace collapsing
    // Remove block comments (/* ... */)
    let processed = inputSql.replace(/\/\*[\s\S]*?\*\//g, ' ')
    // Remove single line comments (-- ...)
    processed = processed.replace(/--.*$/gm, ' ')
    // Collapse all whitespace into single spaces
    processed = processed.replace(/\s+/g, ' ')
    // Collapse spacing around operators, punctuation, brackets for maximum optimization
    processed = processed.replace(/\s*([,()=<>!+*-])\s*/g, '$1')
    return processed.trim()
  }

  const handleMinify = () => {
    if (!sql.trim()) {
      setError('Please enter some SQL queries to minify.')
      return
    }

    try {
      setError('')
      const res = minifySqlQuery(sql)
      setMinified(res)
      triggerQuickSuccess()
    } catch (err) {
      setError('An unexpected error occurred while parsing the SQL query.')
      setMinified('')
    }
  }

  // Calculate real-time compression statistics
  useEffect(() => {
    if (sql && minified) {
      const origSize = new Blob([sql]).size
      const miniSize = new Blob([minified]).size
      const savings = origSize > 0 ? ((origSize - miniSize) / origSize) * 100 : 0
      setStats({
        original: origSize,
        minified: miniSize,
        percentage: Number(savings.toFixed(1))
      })
    }
  }, [sql, minified])

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    return `${(bytes / 1024).toFixed(2)} KB`
  }

  const handleCopy = () => {
    if (!minified) return
    navigator.clipboard.writeText(minified)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!minified) return
    const element = document.createElement('a')
    const file = new Blob([minified], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'minified.sql'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleClear = () => {
    setSql('')
    setMinified('')
    setError('')
    setStats({ original: 0, minified: 0, percentage: 0 })
  }

  const loadExample = () => {
    const example = `SELECT 
  users.id, 
  users.name, 
  orders.total_amount -- Calculate user invoice total
FROM 
  users
INNER JOIN 
  orders ON users.id = orders.user_id
WHERE 
  users.status = 'active' 
  AND orders.created_at >= '2026-01-01' /* Limit query to 2026 data */
ORDER BY 
  orders.total_amount DESC;`
    setSql(example)
    setError('')
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Block */}
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-[#00D4B4]">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">SQL Source Input</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadExample}
                className="text-xs font-bold text-indigo-600 dark:text-[#00D4B4] hover:underline"
              >
                Load Example
              </button>
              <button
                onClick={handleClear}
                className="text-xs font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
          </div>

          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            placeholder="SELECT * FROM users WHERE id = 1; -- Paste SQL here..."
            className="w-full h-[350px] p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono text-gray-800 dark:text-[#F0F6FF] outline-none resize-none focus:border-indigo-500 dark:focus:border-[#00D4B4] transition-all"
          />

          <button
            onClick={handleMinify}
            className="w-full mt-6 py-4 bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/10 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" /> Minify SQL
          </button>
        </div>

        {/* Output Block */}
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Compressed SQL Result</h3>
            {minified && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] text-xs font-bold text-gray-600 dark:text-[#8A9BBE] hover:border-indigo-500 flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] text-xs font-bold text-gray-600 dark:text-[#8A9BBE] hover:border-indigo-500 flex items-center gap-1.5 transition-all"
                >
                  <FileDown className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            )}
          </div>

          <div className="flex-grow flex flex-col justify-center">
            {error ? (
              <div className="p-6 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-600 dark:text-red-400 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-wider">Validation Warning</h4>
                  <p className="text-xs font-medium leading-relaxed font-mono">{error}</p>
                </div>
              </div>
            ) : minified ? (
              <textarea
                readOnly
                value={minified}
                placeholder="Compressed SQL will display here..."
                className="w-full h-[350px] p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono text-green-600 dark:text-[#00D4B4] outline-none resize-none"
              />
            ) : (
              <div className="h-[350px] flex flex-col items-center justify-center text-gray-400 dark:text-[#8A9BBE] border border-dashed border-gray-200 dark:border-[#1E2D47] rounded-2xl">
                <Terminal className="w-12 h-12 stroke-[1] mb-2 opacity-50" />
                <p className="text-xs font-medium">Input your SQL queries on the left and click Minify</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Statistics Panel */}
      {minified && !error && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Compression Statistics</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47]">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Original Size</span>
              <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{formatSize(stats.original)}</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47]">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Minified Size</span>
              <p className="text-xl font-bold text-green-600 dark:text-[#00D4B4] mt-1">{formatSize(stats.minified)}</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl border border-green-500/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Savings</span>
                <p className="text-2xl font-black text-blue-600 dark:text-[#00D4B4] mt-0.5">{stats.percentage}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-600 dark:bg-[#00D4B4] text-white flex items-center justify-center font-black text-xs shadow-lg shadow-blue-500/20">
                -{stats.percentage.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
