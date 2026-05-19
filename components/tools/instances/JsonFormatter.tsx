'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  FileJson, 
  Copy, 
  Trash2, 
  Check, 
  Upload, 
  Download, 
  Cpu, 
  File, 
  Zap, 
  Clock, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)
  const [isProcessing, setIsProcessing] = useState(false)
  const [perfTime, setPerfTime] = useState<number | null>(null)
  
  // File details
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState<number | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Clear all states
  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
    setPerfTime(null)
    setFileName('')
    setFileSize(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Format JSON using an off-thread inline Web Worker for premium performance on large files
  const executeFormat = (type: 'pretty' | 'minify') => {
    if (!input.trim()) return
    setIsProcessing(true)
    setError('')
    
    const startTime = performance.now()
    const spacing = type === 'pretty' ? indentSize : 0

    // Dynamic Inline Web Worker code
    const workerBlobCode = `
      self.onmessage = function(e) {
        const { jsonString, spacing } = e.data;
        try {
          const parsed = JSON.parse(jsonString);
          const formatted = JSON.stringify(parsed, null, spacing || undefined);
          self.postMessage({ success: true, result: formatted });
        } catch (err) {
          self.postMessage({ success: false, error: err.message });
        }
      }
    `
    
    try {
      const blob = new Blob([workerBlobCode], { type: 'application/javascript' })
      const workerUrl = URL.createObjectURL(blob)
      const worker = new Worker(workerUrl)

      worker.postMessage({ jsonString: input, spacing })

      worker.onmessage = (e) => {
        const { success, result, error } = e.data
        const endTime = performance.now()
        
        if (success) {
          setOutput(result)
          setPerfTime(Math.round(endTime - startTime))
          triggerQuickSuccess()
        } else {
          setError(error || 'Syntax Error: Invalid JSON structure.')
          setOutput('')
        }
        
        setIsProcessing(false)
        worker.terminate()
        URL.revokeObjectURL(workerUrl)
      }

      worker.onerror = (err) => {
        setError('Worker execution error. Main thread fallback active.')
        // Fallback to main thread
        try {
          const parsed = JSON.parse(input)
          setOutput(JSON.stringify(parsed, null, spacing || undefined))
          setPerfTime(Math.round(performance.now() - startTime))
          triggerQuickSuccess()
        } catch (fallbackErr: any) {
          setError(fallbackErr.message)
        }
        setIsProcessing(false)
        worker.terminate()
        URL.revokeObjectURL(workerUrl)
      }

    } catch (e: any) {
      // Direct main thread fallback if worker blob creation is disabled by security policies
      try {
        const parsed = JSON.parse(input)
        setOutput(JSON.stringify(parsed, null, spacing || undefined))
        setPerfTime(Math.round(performance.now() - startTime))
        triggerQuickSuccess()
      } catch (fallbackErr: any) {
        setError(fallbackErr.message)
      }
      setIsProcessing(false)
    }
  }

  // Handle Drag and Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processJsonFile(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processJsonFile(file)
    }
  }

  const processJsonFile = (file: File) => {
    setFileName(file.name)
    setFileSize(file.size)
    setIsProcessing(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setInput(content)
      setIsProcessing(false)
      triggerQuickSuccess()
    }
    reader.onerror = () => {
      setError('Failed to read files. Please ensure valid file permissions.')
      setIsProcessing(false)
    }
    reader.readAsText(file)
  }

  // Copy to clipboard
  const handleCopy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    triggerQuickSuccess()
  }

  // Download converted file
  const handleDownload = () => {
    if (!output) return
    const element = document.createElement('a')
    const fileBlob = new Blob([output], { type: 'application/json;charset=utf-8' })
    element.href = URL.createObjectURL(fileBlob)
    element.download = fileName ? `formatted-${fileName}` : 'formatted.json'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Dynamic Header & Security Indicators */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-2xl">
            <FileJson className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-left">
            <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">JSON Formatter & Validator</h2>
            <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">Optimized for Large Files</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Performance Stats badge */}
          {perfTime !== null && (
            <div className="flex items-center gap-1.5 px-4 py-2 bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/20 rounded-xl text-xs font-bold text-blue-700 dark:text-blue-400">
              <Clock className="w-4 h-4" />
              <span>Parsed in {perfTime}ms</span>
            </div>
          )}

          <div className="flex items-center gap-2.5 px-4.5 py-2.5 bg-emerald-50 dark:bg-emerald-950/15 border border-emerald-100 dark:border-emerald-900/20 rounded-xl">
            <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 tracking-wide">
              100% Secure Local Sandbox
            </span>
          </div>
        </div>
      </div>

      {/* Main Formatter workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input area */}
        <div className="space-y-4 flex flex-col">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Input Raw JSON</label>
              {fileSize !== null && (
                <span className="text-[10px] bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full font-bold">
                  {(fileSize / 1024).toFixed(1)} KB File Loaded
                </span>
              )}
            </div>
            
            <button 
              onClick={clearAll}
              className="text-xs font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-all"
            >
              <Trash2 className="w-4 h-4" /> Clear All
            </button>
          </div>

          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative flex-grow flex flex-col"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your raw JSON text here or drag & drop a .json file directly..."
              className="w-full h-80 lg:h-96 p-6 font-mono text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl outline-none resize-none dark:text-white focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            />
            
            {fileName && (
              <div className="absolute bottom-4 left-4 right-4 bg-blue-50/95 dark:bg-slate-950/95 border border-blue-100 dark:border-slate-800/80 px-4 py-3 rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-3">
                  <File className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div className="text-left">
                    <span className="text-xs font-bold text-gray-900 dark:text-slate-200 block truncate max-w-[200px]">{fileName}</span>
                    <span className="text-[10px] text-gray-400 dark:text-slate-500">{fileSize ? `${(fileSize / 1024).toFixed(1)} KB` : ''}</span>
                  </div>
                </div>
                <button onClick={clearAll} className="p-1 hover:text-red-500 text-gray-400 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Loader Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-4 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 hover:bg-blue-50/50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Upload className="w-4 h-4 text-blue-500" />
              <span>Load .json File</span>
            </button>
            <input 
              type="file" 
              accept=".json"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
            />
          </div>
        </div>

        {/* Output area */}
        <div className="space-y-4 flex flex-col">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Formatted Output</label>
            {output && (
              <div className="flex gap-3">
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 rounded-xl font-bold text-xs hover:underline"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 rounded-xl font-bold text-xs hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            )}
          </div>
          <div className="relative flex-grow flex flex-col">
            <textarea
              readOnly
              value={output || error}
              placeholder={
                isProcessing 
                  ? 'Processing formatting asynchronously off-thread...' 
                  : error 
                    ? `JSON Parsing Error:\n${error}` 
                    : 'Your beautified or minified JSON will automatically render here...'
              }
              className={`w-full h-80 lg:h-96 p-6 font-mono text-xs border rounded-3xl outline-none resize-none shadow-inner transition-all ${
                error 
                  ? 'bg-red-50/50 dark:bg-red-950/10 border-red-200 dark:border-red-900/30 text-red-500' 
                  : 'bg-gray-50 dark:bg-slate-950 border-gray-100 dark:border-slate-800 text-gray-800 dark:text-slate-200'
              }`}
            />

            {/* Micro-loader */}
            {isProcessing && (
              <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Parsing Large Payload...</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Spacing and Operations Controls */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Spacing size selector */}
          <div className="flex items-center gap-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block">Indent Configuration</label>
              <select 
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="block w-36 p-3 bg-gray-50 dark:bg-slate-850 border-none rounded-xl text-sm font-bold outline-none dark:text-white"
              >
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces</option>
                <option value={8}>8 Spaces</option>
              </select>
            </div>

            {/* Performance Mode Info */}
            <div className="space-y-1 text-left hidden sm:block">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-500" /> Web Worker Pipeline
              </span>
              <p className="text-[10px] text-gray-400">Offloads parsing execution to keep interface fluid.</p>
            </div>
          </div>

          {/* Formatter Buttons */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => executeFormat('minify')}
              disabled={isProcessing || !input.trim()}
              className="flex-grow md:flex-grow-0 px-8 py-4 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 disabled:opacity-40 rounded-2xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
            >
              Minify Only
            </button>
            <button 
              onClick={() => executeFormat('pretty')}
              disabled={isProcessing || !input.trim()}
              className="flex-grow md:flex-grow-0 px-12 py-4 bg-blue-600 text-white disabled:opacity-40 rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 animate-pulse" /> Beautify JSON
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}
