import React, { useState } from 'react'
import { Copy, Download, Trash2, Check, Code2, Type, FileCode, Zap, FileJson } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'
import beautify from 'js-beautify'
import { format as formatSql } from 'sql-formatter'

interface CodeFormatterProps {
  language: 'html' | 'css' | 'sql'
  title: string
  placeholder: string
}

export default function CodeFormatter({ language, title, placeholder }: CodeFormatterProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)

  const handleFormat = () => {
    if (!input.trim()) return

    try {
      let formatted = ''
      if (language === 'html') {
        formatted = beautify.html(input, { indent_size: indentSize, wrap_line_length: 80 })
      } else if (language === 'css') {
        formatted = beautify.css(input, { indent_size: indentSize })
      } else if (language === 'sql') {
        formatted = formatSql(input, { indentStyle: 'tabularUppercase' })
      }
      setOutput(formatted)
      triggerQuickSuccess()
    } catch (err) {
      console.error('Formatting failed:', err)
      alert('Failed to format code. Please check your syntax.')
    }
  }

  const handleMinify = () => {
    if (!input.trim()) return
    // Simple minification
    const minified = input
      .replace(/\s+/g, ' ')
      .replace(/\s*([\{\}\:\;\,\(\)])\s*/g, '$1')
      .trim()
    setOutput(minified)
    triggerQuickSuccess()
  }

  const handleCopy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  const handleDownload = () => {
    if (!output) return
    const element = document.createElement('a')
    const file = new Blob([output], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `formatted-${language}.${language === 'sql' ? 'sql' : language}`
    document.body.appendChild(element)
    element.click()
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-600" /> Input {language.toUpperCase()}
            </h3>
            <button 
              onClick={handleClear}
              className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full h-[400px] p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-slate-200 font-mono text-sm resize-none transition-all"
          />
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" /> Formatted Result
            </h3>
            {output && (
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleCopy}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button 
                  onClick={handleDownload}
                  className="text-xs font-bold text-gray-500 dark:text-slate-400 hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            )}
          </div>
          <div className="relative group">
            <textarea
              readOnly
              value={output}
              placeholder="Your formatted code will appear here..."
              className="w-full h-[400px] p-6 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl dark:text-blue-400 font-mono text-sm resize-none outline-none shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Indent Size</label>
              <select 
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="block w-24 p-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold outline-none dark:text-white"
              >
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces</option>
                <option value={8}>8 Spaces</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={handleMinify}
              className="flex-grow md:flex-grow-0 px-8 py-4 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-2xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
            >
              Minify Only
            </button>
            <button 
              onClick={handleFormat}
              className="flex-grow md:flex-grow-0 px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <FileCode className="w-4 h-4" /> Beautify {language.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
