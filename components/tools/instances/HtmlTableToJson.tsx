'use client'

import React, { useState } from 'react'
import { FileCode, Copy, Trash2, Check, ArrowRightLeft, Table } from 'lucide-react'

export default function HtmlTableToJson() {
  const [html, setHtml] = useState('<table>\n  <thead>\n    <tr>\n      <th>ID</th>\n      <th>Name</th>\n      <th>Status</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>1</td>\n      <td>Project Alpha</td>\n      <td>Active</td>\n    </tr>\n    <tr>\n      <td>2</td>\n      <td>Project Beta</td>\n      <td>Pending</td>\n    </tr>\n  </tbody>\n</table>')
  const [json, setJson] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convertTable = () => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const table = doc.querySelector('table')
      
      if (!table) throw new Error('No <table> element found in input.')

      const headers: string[] = []
      const rows = Array.from(table.querySelectorAll('tr'))
      
      // Find headers
      const firstRow = rows[0]
      const headerCells = firstRow.querySelectorAll('th, td')
      headerCells.forEach(cell => headers.push(cell.textContent?.trim() || ''))

      const result = rows.slice(1).map(row => {
        const cells = row.querySelectorAll('td')
        const obj: any = {}
        cells.forEach((cell, i) => {
          const key = headers[i] || `column_${i}`
          obj[key] = cell.textContent?.trim() || ''
        })
        return obj
      })

      setJson(JSON.stringify(result, null, 2))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setJson('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Table className="w-4 h-4" /> HTML Table Source
            </label>
            <button onClick={() => setHtml('')} className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Clear</button>
          </div>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="w-full h-[500px] p-6 font-mono text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl outline-none resize-none dark:text-white focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            placeholder="Paste your <table>...</table> here..."
          />
        </div>

        {/* JSON Output */}
        <div className="space-y-4 h-full flex flex-col">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <FileCode className="w-4 h-4" /> JSON Array Output
            </label>
            {json && (
              <button 
                onClick={handleCopy}
                className="text-xs font-bold text-[#00D4B4] flex items-center gap-1.5 px-3 py-1.5 bg-[#00D4B4]/5 rounded-lg transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy JSON'}
              </button>
            )}
          </div>
          <div className="relative flex-grow">
            <textarea
              readOnly
              value={json || error}
              placeholder="JSON will appear here..."
              className={`w-full h-full p-8 font-mono text-sm border rounded-[2.5rem] shadow-2xl outline-none resize-none transition-all ${
                error ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400' : 'bg-gray-900 dark:bg-slate-950 text-white border-gray-800'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={convertTable}
          className="px-12 py-5 bg-[#00D4B4] text-[#0B1120] rounded-[2rem] font-black hover:scale-105 transition-all shadow-xl shadow-[#00D4B4]/20 uppercase tracking-widest text-xs flex items-center gap-3"
        >
          <ArrowRightLeft className="w-4 h-4" /> Convert to JSON
        </button>
      </div>
    </div>
  )
}
