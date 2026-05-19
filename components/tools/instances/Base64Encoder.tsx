'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  Copy, 
  Check, 
  ArrowRightLeft, 
  Upload, 
  Download, 
  Trash2, 
  ShieldCheck, 
  File, 
  FileCode, 
  Info,
  Link,
  ChevronDown,
  ChevronUp,
  Settings
} from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

export default function Base64Encoder() {
  // Input/Output states
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  
  // Settings states
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [isUrlSafe, setIsUrlSafe] = useState(false)
  const [stripPadding, setStripPadding] = useState(false)
  const [liveMode, setLiveMode] = useState(true)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  
  // File details state
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState<number | null>(null)
  const [fileType, setFileType] = useState('')

  // UI state
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Robust UTF-8 Helper Functions
  const utf8EncodeToBase64 = (str: string, urlSafe: boolean = false, noPadding: boolean = false): string => {
    try {
      const bytes = new TextEncoder().encode(str)
      const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')
      let b64 = btoa(binString)
      
      if (urlSafe) {
        b64 = b64.replace(/\+/g, '-').replace(/\//g, '_')
      }
      if (noPadding) {
        b64 = b64.replace(/=+$/, '')
      }
      return b64
    } catch (e) {
      throw new Error('Encoding failed: String contains characters that cannot be processed.')
    }
  }

  const utf8DecodeFromBase64 = (b64: string): string => {
    try {
      // Normalize URL-Safe characters
      let normalized = b64.replace(/-/g, '+').replace(/_/g, '/')
      
      // Restore padding if missing
      const padLen = (4 - (normalized.length % 4)) % 4
      if (padLen > 0 && padLen < 3) {
        normalized += '='.repeat(padLen)
      }
      
      const binString = atob(normalized)
      const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0))
      return new TextDecoder().decode(bytes)
    } catch (e) {
      throw new Error('Invalid Base64 sequence: Failed to decode input.')
    }
  }

  // Trigger conversion
  const handleConvert = () => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      return
    }

    try {
      setError('')
      if (mode === 'encode') {
        const result = utf8EncodeToBase64(input, isUrlSafe, stripPadding)
        setOutput(result)
      } else {
        const result = utf8DecodeFromBase64(input)
        setOutput(result)
      }
      triggerQuickSuccess()
    } catch (err: any) {
      setError(err.message || 'An error occurred during conversion.')
      setOutput('')
    }
  }

  // Handle live conversion
  useEffect(() => {
    if (liveMode) {
      handleConvert()
    }
  }, [input, mode, isUrlSafe, stripPadding, liveMode, handleConvert])

  // Clear all states
  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
    setFileName('')
    setFileSize(null)
    setFileType('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Copy output to clipboard
  const handleCopy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    triggerQuickSuccess()
  }

  // Swap input and output
  const handleSwap = () => {
    const tempMode = mode === 'encode' ? 'decode' : 'encode'
    const newOutput = input
    const newInput = output
    
    setMode(tempMode)
    setInput(newInput)
    setOutput(newOutput)
    setError('')
  }

  // Handle Drag & Drop / File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    processFile(file)
  }

  const processFile = (file: File) => {
    setFileName(file.name)
    setFileSize(file.size)
    setFileType(file.type)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (mode === 'encode') {
        // For encode, read as DataURL to get base64 representation of file
        const base64Index = result.indexOf(';base64,')
        if (base64Index !== -1) {
          const rawBase64 = result.slice(base64Index + 8)
          setInput(`data:${file.type};base64,${rawBase64}`)
        } else {
          setInput(result)
        }
      } else {
        // For decode, read as text
        setInput(result)
      }
    }

    if (mode === 'encode') {
      reader.readAsDataURL(file)
    } else {
      reader.readAsText(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  // Download converted file
  const handleDownload = () => {
    if (!output) return
    
    const element = document.createElement('a')
    let fileBlob: Blob
    let downloadName = `base64-${mode === 'encode' ? 'encoded' : 'decoded'}.txt`
    
    if (mode === 'decode' && input.startsWith('data:')) {
      // Decode back into binary file if input was a Data URL
      try {
        const matches = input.match(/^data:([^;]+);base64,(.+)$/)
        if (matches && matches.length === 3) {
          const contentType = matches[1]
          const b64Data = matches[2]
          const sliceSize = 512
          const byteCharacters = atob(b64Data)
          const byteArrays = []

          for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize)
            const byteNumbers = new Array(slice.length)
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i)
            }
            const byteArray = new Uint8Array(byteNumbers)
            byteArrays.push(byteArray)
          }
          
          fileBlob = new Blob(byteArrays, { type: contentType })
          downloadName = fileName ? `decoded-${fileName}` : 'decoded-file'
          const extension = contentType.split('/')[1] || ''
          if (extension && !downloadName.includes(`.${extension}`)) {
            downloadName += `.${extension}`
          }
        } else {
          fileBlob = new Blob([output], { type: 'text/plain;charset=utf-8' })
        }
      } catch (err) {
        fileBlob = new Blob([output], { type: 'text/plain;charset=utf-8' })
      }
    } else {
      fileBlob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    }

    element.href = URL.createObjectURL(fileBlob)
    element.download = downloadName
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Get statistics
  const getInputStats = () => {
    const chars = input.length
    const bytes = new TextEncoder().encode(input).length
    return { chars, bytes }
  }

  const getOutputStats = () => {
    const chars = output.length
    const bytes = new TextEncoder().encode(output).length
    return { chars, bytes }
  }

  const inputStats = getInputStats()
  const outputStats = getOutputStats()

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Mode Selector Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm">
        <div className="flex bg-gray-100 dark:bg-slate-950 p-1.5 rounded-2xl w-full sm:w-auto">
          <button
            onClick={() => { setMode('encode'); handleClear(); }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-extrabold text-sm transition-all ${
              mode === 'encode'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                : 'text-gray-500 dark:text-slate-400 hover:text-purple-600'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Encode</span>
          </button>
          <button
            onClick={() => { setMode('decode'); handleClear(); }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-extrabold text-sm transition-all ${
              mode === 'decode'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                : 'text-gray-500 dark:text-slate-400 hover:text-purple-600'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Decode</span>
          </button>
        </div>

        {/* Security Badge & Settings Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
          <div className="flex items-center gap-2.5 px-4.5 py-2.5 bg-emerald-50 dark:bg-emerald-950/15 border border-emerald-100 dark:border-emerald-900/20 rounded-xl">
            <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 tracking-wide">
              100% Client-Side Sandbox Secure
            </span>
          </div>

          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`p-3 bg-gray-50 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-slate-700/60 border border-gray-100 dark:border-slate-700 rounded-xl transition-all flex items-center gap-2 text-gray-500 dark:text-slate-400 ${
              isSettingsOpen ? 'text-purple-600 dark:text-purple-400 bg-purple-50/50' : ''
            }`}
            title="Formatting Settings"
          >
            <Settings className={`w-5 h-5 ${isSettingsOpen ? 'rotate-45' : ''} transition-transform duration-300`} />
            <span className="text-xs font-bold hidden sm:inline">Settings</span>
            {isSettingsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Settings Panel */}
      {isSettingsOpen && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-xl space-y-6 animate-in slide-in-from-top-4 duration-300">
          <h4 className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
            Encoding Parameter Settings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Live Mode Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-950 rounded-2xl border border-gray-100 dark:border-slate-800/80">
              <div>
                <span className="text-sm font-bold text-gray-800 dark:text-slate-200 block">Real-time processing</span>
                <span className="text-[10px] text-gray-400 dark:text-slate-500">Convert instantly as you type</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={liveMode} 
                  onChange={(e) => setLiveMode(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {/* URL Safe Toggle */}
            <div className={`flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-950 rounded-2xl border border-gray-100 dark:border-slate-800/80 transition-opacity ${mode === 'decode' ? 'opacity-40 pointer-events-none' : ''}`}>
              <div>
                <span className="text-sm font-bold text-gray-800 dark:text-slate-200 block">URL-Safe Characters</span>
                <span className="text-[10px] text-gray-400 dark:text-slate-500">Use - and _ instead of + and /</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isUrlSafe} 
                  onChange={(e) => setIsUrlSafe(e.target.checked)}
                  disabled={mode === 'decode'}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {/* Strip Padding Toggle */}
            <div className={`flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-950 rounded-2xl border border-gray-100 dark:border-slate-800/80 transition-opacity ${mode === 'decode' ? 'opacity-40 pointer-events-none' : ''}`}>
              <div>
                <span className="text-sm font-bold text-gray-800 dark:text-slate-200 block">Remove Padding</span>
                <span className="text-[10px] text-gray-400 dark:text-slate-500">{"Strip terminal '=' equals characters"}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={stripPadding} 
                  onChange={(e) => setStripPadding(e.target.checked)}
                  disabled={mode === 'decode'}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>

          </div>
        </div>
      )}

      {/* Main Dual Editor Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Panel */}
        <div className="space-y-4 flex flex-col">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-purple-600" />
                <span>Source Input {mode === 'encode' ? 'Text' : 'Base64 String'}</span>
              </label>
              {inputStats.chars > 0 && (
                <span className="text-[10px] bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 px-2.5 py-0.5 rounded-full font-bold">
                  {inputStats.chars.toLocaleString()} chars / {inputStats.bytes.toLocaleString()} bytes
                </span>
              )}
            </div>
            
            <button
              onClick={handleClear}
              className="text-xs font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>

          {/* Drag & Drop File Container */}
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative flex-grow flex flex-col"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === 'encode'
                  ? 'Type or paste plain text here to encode. You can also drag & drop files here to encode them...'
                  : 'Paste Base64 encoded content here to decode back to readable formats...'
              }
              className="w-full h-80 lg:h-96 p-6 font-mono text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl outline-none resize-none dark:text-white focus:ring-2 focus:ring-purple-500 transition-all shadow-sm"
            />
            
            {/* Visual File Info Indicator */}
            {fileName && (
              <div className="absolute bottom-4 left-4 right-4 bg-purple-50/95 dark:bg-slate-950/95 border border-purple-100 dark:border-slate-800/80 px-4 py-3 rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-3">
                  <File className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div className="text-left">
                    <span className="text-xs font-bold text-gray-900 dark:text-slate-200 block truncate max-w-[200px]">{fileName}</span>
                    <span className="text-[10px] text-gray-400 dark:text-slate-500">{fileSize ? `${(fileSize / 1024).toFixed(1)} KB` : ''} ({fileType})</span>
                  </div>
                </div>
                <button onClick={handleClear} className="p-1 hover:text-red-500 text-gray-400 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* File Upload Zone */}
          <div className="flex gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-4 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 hover:bg-purple-50/50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Upload className="w-4 h-4 text-purple-500" />
              <span>Upload File</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
            />

            {!liveMode && (
              <button
                onClick={handleConvert}
                disabled={!input.trim()}
                className="flex-1 py-4 bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-40 rounded-2xl font-bold text-sm shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all"
              >
                {mode === 'encode' ? 'Encode Data' : 'Decode Data'}
              </button>
            )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-4 flex flex-col">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <ArrowRightLeft className="w-4 h-4 text-purple-600" />
                <span>Converted Output Result</span>
              </label>
              {outputStats.chars > 0 && (
                <span className="text-[10px] bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 px-2.5 py-0.5 rounded-full font-bold">
                  {outputStats.chars.toLocaleString()} chars / {outputStats.bytes.toLocaleString()} bytes
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSwap}
                className="p-1.5 text-gray-400 hover:text-purple-600 rounded-xl transition-all"
                title="Swap Inputs"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
              
              {output && (
                <>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 rounded-xl font-bold text-xs hover:underline"
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
                </>
              )}
            </div>
          </div>

          <div className="flex-grow">
            <textarea
              readOnly
              value={output}
              placeholder={
                error 
                  ? `Error: ${error}` 
                  : mode === 'encode'
                    ? 'Your Base64 formatted string will automatically render here...'
                    : 'Your decoded plain text will automatically render here...'
              }
              className={`w-full h-80 lg:h-96 p-6 font-mono text-xs border rounded-3xl outline-none resize-none shadow-inner transition-all ${
                error
                  ? 'bg-red-50/50 dark:bg-red-950/10 border-red-200 dark:border-red-900/30 text-red-500'
                  : 'bg-gray-50 dark:bg-slate-950 border-gray-100 dark:border-slate-800 text-emerald-600 dark:text-emerald-400'
              }`}
            />
          </div>

          {/* Quick Informational Notice */}
          <div className="bg-gray-50 dark:bg-slate-900/50 p-4 border border-gray-100 dark:border-slate-800/80 rounded-2xl flex items-start gap-3">
            <Info className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
            <p className="text-[10px] leading-normal text-gray-500 dark:text-slate-400 text-left">
              <strong>About Base64:</strong> Base64 maps binary structures to ASCII format for secure transport in text networks. While ideal for URLs and headers, encoding increases byte sizes by roughly <strong>33%</strong>. This utility includes robust multi-byte UTF-8 parsing to support foreign scripts and emojis without string corruption.
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}
