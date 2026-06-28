'use client'

import React, { useState, useEffect } from 'react'
import { Type, Image as ImageIcon, Copy, ArrowRightLeft, Upload } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function Base64EncoderDecoder() {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text')
  
  // Text State
  const [textInput, setTextInput] = useState('')
  const [textOutput, setTextOutput] = useState('')
  const [isEncoding, setIsEncoding] = useState(true)
  const [isBulkMode, setIsBulkMode] = useState(false)

  // Image State
  const [base64Image, setBase64Image] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const processText = (input: string, encode: boolean, bulk: boolean) => {
    if (!input.trim()) {
      setTextOutput('')
      return
    }

    try {
      if (bulk) {
        const lines = input.split('\n')
        const processed = lines.map(line => {
          if (!line.trim()) return ''
          try {
            return encode ? btoa(unescape(encodeURIComponent(line))) : decodeURIComponent(escape(atob(line)))
          } catch(e) {
            return 'ERROR'
          }
        })
        setTextOutput(processed.join('\n'))
      } else {
        if (encode) {
          setTextOutput(btoa(unescape(encodeURIComponent(input))))
        } else {
          setTextOutput(decodeURIComponent(escape(atob(input))))
        }
      }
    } catch (e) {
      setTextOutput('Invalid Base64 string')
    }
  }

  // Reprocess when toggles change
  useEffect(() => {
    processText(textInput, isEncoding, isBulkMode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEncoding, isBulkMode])

  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value)
    processText(e.target.value, isEncoding, isBulkMode)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setBase64Image(result)
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBase64ImageInput = (value: string) => {
    setBase64Image(value)
    if (value.startsWith('data:image')) {
      setImagePreview(value)
    } else {
      setImagePreview(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-[#1E2D47] pb-2">
        <div className="flex">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-6 py-4 flex items-center gap-2 text-sm font-semibold transition-colors ${activeTab === 'text' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
          >
            <Type className="w-4 h-4" /> Text Encode/Decode
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`px-6 py-4 flex items-center gap-2 text-sm font-semibold transition-colors ${activeTab === 'image' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
          >
            <ImageIcon className="w-4 h-4" /> Image Data URI
          </button>
        </div>
        
        {activeTab === 'text' && (
          <div className="px-4">
            <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Base64 Operations" />
          </div>
        )}
      </div>

      {activeTab === 'text' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
          <div className="bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 flex flex-col shadow-xl shadow-gray-200/40 dark:shadow-none group focus-within:border-blue-500/50 focus-within:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 drop-shadow-sm">
                Input {isBulkMode && <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-[10px] px-2 py-0.5 rounded-full shadow-sm">BULK</span>}
              </span>
              <button onClick={() => setIsEncoding(!isEncoding)} className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-4 py-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all duration-300 active:scale-95 shadow-sm border border-transparent hover:border-blue-200 dark:hover:border-blue-500/30">
                <ArrowRightLeft className="w-3.5 h-3.5" /> {isEncoding ? 'Switch to Decode' : 'Switch to Encode'}
              </button>
            </div>
            <textarea
              value={textInput}
              onChange={handleTextInput}
              placeholder={isBulkMode 
                ? (isEncoding ? 'Enter multiple strings (one per line) to encode...' : 'Enter multiple Base64 strings (one per line) to decode...')
                : (isEncoding ? 'Enter text to encode...' : 'Enter base64 to decode...')}
              className="flex-grow w-full p-5 bg-gray-50/50 dark:bg-[#0D1526] border-2 border-transparent focus:border-blue-500/30 focus:bg-white dark:focus:bg-[#0B1120] rounded-2xl text-sm outline-none dark:text-gray-300 resize-none font-mono transition-all duration-300 custom-scrollbar"
            />
          </div>
          <div className="bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 flex flex-col shadow-xl shadow-gray-200/40 dark:shadow-none group focus-within:border-emerald-500/50 focus-within:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white drop-shadow-sm">Output ({isEncoding ? 'Base64' : 'Text'})</span>
              <button onClick={() => navigator.clipboard.writeText(textOutput)} className="text-gray-400 hover:text-emerald-500 transition-all duration-300 hover:scale-110 p-2 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl">
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <textarea
              readOnly
              value={textOutput}
              className="flex-grow w-full p-5 bg-gray-50/50 dark:bg-[#0D1526] border-2 border-transparent focus:border-emerald-500/30 focus:bg-white dark:focus:bg-[#0B1120] rounded-2xl text-sm outline-none dark:text-gray-300 resize-none font-mono transition-all duration-300 custom-scrollbar"
            />
          </div>
        </div>
      )}

      {activeTab === 'image' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
          <div className="bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 flex flex-col shadow-xl shadow-gray-200/40 dark:shadow-none group transition-all duration-500 hover:border-blue-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white drop-shadow-sm">Image Preview</span>
              <label className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-4 py-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all duration-300 cursor-pointer active:scale-95 shadow-sm border border-transparent hover:border-blue-200 dark:hover:border-blue-500/30">
                <Upload className="w-3.5 h-3.5" /> Upload Image
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="flex-grow bg-gray-50/50 dark:bg-[#0D1526] rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-200 dark:border-[#1E2D47] group-hover:border-blue-500/50 transition-colors duration-300">
              {imagePreview ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain p-4 drop-shadow-xl" />
              ) : (
                <div className="text-gray-400 text-sm flex flex-col items-center transition-transform duration-300 group-hover:scale-105">
                  <ImageIcon className="w-10 h-10 mb-3 opacity-40 group-hover:text-blue-500 transition-colors duration-300" />
                  <span className="font-semibold">Upload an image or paste Data URI</span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 flex flex-col shadow-xl shadow-gray-200/40 dark:shadow-none group focus-within:border-emerald-500/50 focus-within:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white drop-shadow-sm">Base64 Data URI</span>
              <button onClick={() => navigator.clipboard.writeText(base64Image)} className="text-gray-400 hover:text-emerald-500 transition-all duration-300 hover:scale-110 p-2 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl">
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <textarea
              value={base64Image}
              onChange={(e) => handleBase64ImageInput(e.target.value)}
              placeholder="data:image/png;base64,iVBORw0KGgoAAAAN..."
              className="flex-grow w-full p-5 bg-gray-50/50 dark:bg-[#0D1526] border-2 border-transparent focus:border-emerald-500/30 focus:bg-white dark:focus:bg-[#0B1120] rounded-2xl text-xs outline-none dark:text-gray-300 resize-none font-mono break-all transition-all duration-300 custom-scrollbar"
            />
          </div>
        </div>
      )}
    </div>
  )
}
