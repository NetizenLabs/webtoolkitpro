'use client'

import React, { useState } from 'react'
import { FileCode, Copy, Trash2, Check, ArrowRightLeft } from 'lucide-react'

export default function XmlToYaml() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convertXmlToYaml = () => {
    try {
      if (!input.trim()) return
      
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(input, 'text/xml')
      
      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Invalid XML format')
      }

      const convertNode = (node: Node, indent: number = 0): string => {
        let yaml = ''
        const spaces = '  '.repeat(indent)

        if (node.nodeType === 1) { // element
          yaml += `${spaces}${node.nodeName}:\n`
          
          // Attributes
          if (node.attributes && node.attributes.length > 0) {
            for (let j = 0; j < node.attributes.length; j++) {
              const attr = node.attributes.item(j)
              if (attr) yaml += `${spaces}  _${attr.nodeName}: ${attr.nodeValue}\n`
            }
          }

          // Children
          if (node.hasChildNodes()) {
            for (let i = 0; i < node.childNodes.length; i++) {
              const item = node.childNodes.item(i)
              if (item.nodeType === 3) { // text
                const val = item.nodeValue?.trim()
                if (val) {
                  // If it's just text, replace the last newline and colon
                  yaml = yaml.slice(0, -1) + ` ${val}\n`
                }
              } else {
                yaml += convertNode(item, indent + 1)
              }
            }
          }
        }
        return yaml
      }

      const result = convertNode(xmlDoc.documentElement)
      setOutput(result || '# No data extracted')
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

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">XML Source</label>
            <button 
              onClick={() => setInput('')}
              className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/10 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<root><item id='1'>Hello</item></root>"
            className="w-full h-[500px] p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none dark:text-white transition-all"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">YAML Output</label>
            {output && (
              <button 
                onClick={handleCopy}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/10 rounded-lg transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy YAML'}
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={output || error}
              placeholder="YAML output will appear here..."
              className={`w-full h-[500px] p-6 font-mono text-sm border rounded-3xl shadow-2xl outline-none resize-none transition-all ${
                error ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400' : 'bg-[#1E1E1E] text-amber-300 border-gray-800 dark:border-slate-800'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={convertXmlToYaml}
          className="px-10 py-4 bg-[#00D4B4] text-[#0B1120] rounded-2xl font-black hover:scale-105 transition-all shadow-lg shadow-[#00D4B4]/20 uppercase tracking-widest text-sm flex items-center gap-3"
        >
          Convert to YAML <ArrowRightLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
