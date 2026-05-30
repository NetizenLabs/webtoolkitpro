'use client'

import React, { useState } from 'react'
import { Type, Image as ImageIcon, Copy, ArrowRightLeft, Upload } from 'lucide-react'

export default function Base64EncoderDecoder() {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text')
  
  // Text State
  const [textInput, setTextInput] = useState('')
  const [textOutput, setTextOutput] = useState('')
  const [isEncoding, setIsEncoding] = useState(true)

  // Image State
  const [base64Image, setBase64Image] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleTextProcess = (input: string, encode: boolean) => {
    setTextInput(input)
    try {
      if (encode) {
        setTextOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setTextOutput(decodeURIComponent(escape(atob(input))))
      }
    } catch (e) {
      setTextOutput('Invalid Base64 string')
    }
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
      <div className="flex border-b border-gray-100 dark:border-[#1E2D47]">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Input</span>
              <button onClick={() => { setIsEncoding(!isEncoding); handleTextProcess(textOutput, !isEncoding) }} className="flex items-center gap-2 text-xs font-semibold text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
                <ArrowRightLeft className="w-3 h-3" /> {isEncoding ? 'Switch to Decode' : 'Switch to Encode'}
              </button>
            </div>
            <textarea
              value={textInput}
              onChange={(e) => handleTextProcess(e.target.value, isEncoding)}
              placeholder={isEncoding ? 'Enter text to encode...' : 'Enter base64 to decode...'}
              className="flex-grow w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-transparent focus:border-blue-500/30 rounded-2xl text-sm outline-none dark:text-gray-300 resize-none font-mono"
            />
          </div>
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Output ({isEncoding ? 'Base64' : 'Text'})</span>
              <button onClick={() => navigator.clipboard.writeText(textOutput)} className="text-gray-400 hover:text-blue-500">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <textarea
              readOnly
              value={textOutput}
              className="flex-grow w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-transparent rounded-2xl text-sm outline-none dark:text-gray-300 resize-none font-mono"
            />
          </div>
        </div>
      )}

      {activeTab === 'image' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Image Preview</span>
              <label className="flex items-center gap-2 text-xs font-semibold text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors cursor-pointer">
                <Upload className="w-3 h-3" /> Upload Image
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="flex-grow bg-gray-50 dark:bg-[#0B1120] rounded-2xl flex items-center justify-center overflow-hidden border border-dashed border-gray-200 dark:border-[#1E2D47]">
              {imagePreview ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain p-4" />
              ) : (
                <div className="text-gray-400 text-sm flex flex-col items-center">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span>Upload an image or paste Data URI</span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Base64 Data URI</span>
              <button onClick={() => navigator.clipboard.writeText(base64Image)} className="text-gray-400 hover:text-blue-500">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={base64Image}
              onChange={(e) => handleBase64ImageInput(e.target.value)}
              placeholder="data:image/png;base64,iVBORw0KGgoAAAAN..."
              className="flex-grow w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-transparent focus:border-blue-500/30 rounded-2xl text-xs outline-none dark:text-gray-300 resize-none font-mono break-all"
            />
          </div>
        </div>
      )}
    </div>
  )
}
