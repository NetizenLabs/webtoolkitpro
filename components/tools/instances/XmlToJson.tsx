'use client'

import React, { useState } from 'react'
import { FileCode, Copy, Trash2, Check, ArrowRightLeft } from 'lucide-react'
import { useEnterSubmit } from '@/hooks/useEnterSubmit'

export default function XmlToJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convertXmlToJson = () => {
    try {
      if (!input.trim()) return
      
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(input, 'text/xml')
      
      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Invalid XML format')
      }

      const convertNode = (node: Node): any => {
        const obj: any = {}
        
        if (node.nodeType === 1) { // element
          if (node.attributes.length > 0) {
            obj['@attributes'] = {}
            for (let j = 0; j < node.attributes.length; j++) {
              const attribute = node.attributes.item(j)
              if (attribute) obj['@attributes'][attribute.nodeName] = attribute.nodeValue
            }
          }
        } else if (node.nodeType === 3) { // text
          return node.nodeValue?.trim()
        }

        if (node.hasChildNodes()) {
          for (let i = 0; i < node.childNodes.length; i++) {
            const item = node.childNodes.item(i)
            const nodeName = item.nodeName
            
            if (nodeName === '#text') {
              const val = item.nodeValue?.trim()
              if (val) return val
              continue
            }

            if (typeof obj[nodeName] === 'undefined') {
              obj[nodeName] = convertNode(item)
            } else {
              if (typeof obj[nodeName].push === 'undefined') {
                const old = obj[nodeName]
                obj[nodeName] = []
                obj[nodeName].push(old)
              }
              obj[nodeName].push(convertNode(item))
            }
          }
        }
        return obj
      }

      const result = convertNode(xmlDoc.documentElement)
      setOutput(JSON.stringify(result, null, 2))
      setError('')
    } catch (err: any) {
      setError(err.message)
      setOutput('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Raw XML Input</label>
            <button 
              onClick={clearAll}
              className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/10 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<root><item>Hello</item></root>"
            className="w-full h-[500px] p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none dark:text-white transition-all"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">JSON Output</label>
            {output && (
              <button 
                onClick={handleCopy}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/10 rounded-lg transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy JSON'}
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={output || error}
              placeholder="JSON output will appear here..."
              className={`w-full h-[500px] p-6 font-mono text-sm border rounded-3xl shadow-2xl outline-none resize-none transition-all ${
                error ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400' : 'bg-gray-900 dark:bg-slate-900 text-gray-100 dark:text-emerald-400 border-gray-800 dark:border-slate-800'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={convertXmlToJson}
          className="px-10 py-4 bg-[#00D4B4] text-[#0B1120] rounded-2xl font-black hover:scale-105 transition-all shadow-lg shadow-[#00D4B4]/20 uppercase tracking-widest text-sm flex items-center gap-3"
        >
          Convert to JSON <ArrowRightLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
