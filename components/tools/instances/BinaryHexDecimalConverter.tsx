'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRightLeft, Copy, CheckCircle2, Binary, Hash, FileText, Calculator as NumberIcon } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function BinaryHexDecimalConverter() {
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [inputs, setInputs] = useState({
    text: '',
    binary: '',
    hex: '',
    decimal: ''
  })
  
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const detectAndConvert = (value: string, source: 'text' | 'binary' | 'hex' | 'decimal') => {
    let newInputs = { text: '', binary: '', hex: '', decimal: '' }
    if (!value.trim() && value === '') {
      setInputs(newInputs)
      return
    }

    try {
      const lines = isBulkMode ? value.split('\n') : [value]
      const outText: string[] = []
      const outBin: string[] = []
      const outHex: string[] = []
      const outDec: string[] = []

      for (const line of lines) {
        if (!line.trim() && isBulkMode) {
           outText.push('')
           outBin.push('')
           outHex.push('')
           outDec.push('')
           continue
        }

        if (source === 'text') {
          outText.push(line)
          outBin.push(Array.from(line).map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' '))
          outHex.push(Array.from(line).map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join(' '))
          outDec.push(Array.from(line).map(char => char.charCodeAt(0).toString(10)).join(' '))
        } else if (source === 'binary') {
          const binClean = line.replace(/[^01]/g, '')
          const chunks = binClean.match(/.{1,8}/g) || []
          outBin.push(chunks.join(' '))
          outText.push(chunks.map(bin => String.fromCharCode(parseInt(bin, 2))).join(''))
          outHex.push(chunks.map(bin => parseInt(bin, 2).toString(16).padStart(2, '0')).join(' '))
          outDec.push(chunks.map(bin => parseInt(bin, 2).toString(10)).join(' '))
        } else if (source === 'hex') {
          const hexClean = line.replace(/[^0-9a-fA-F]/g, '')
          const chunks = hexClean.match(/.{1,2}/g) || []
          outHex.push(chunks.join(' '))
          outText.push(chunks.map(hex => String.fromCharCode(parseInt(hex, 16))).join(''))
          outBin.push(chunks.map(hex => parseInt(hex, 16).toString(2).padStart(8, '0')).join(' '))
          outDec.push(chunks.map(hex => parseInt(hex, 16).toString(10)).join(' '))
        } else if (source === 'decimal') {
          const decClean = line.split(/\s+/).filter(d => d.match(/^[0-9]+$/))
          outDec.push(decClean.join(' '))
          outText.push(decClean.map(dec => String.fromCharCode(parseInt(dec, 10))).join(''))
          outBin.push(decClean.map(dec => parseInt(dec, 10).toString(2).padStart(8, '0')).join(' '))
          outHex.push(decClean.map(dec => parseInt(dec, 10).toString(16).padStart(2, '0')).join(' '))
        }
      }

      setInputs({
        text: outText.join(isBulkMode ? '\n' : ''),
        binary: outBin.join(isBulkMode ? '\n' : ''),
        hex: outHex.join(isBulkMode ? '\n' : ''),
        decimal: outDec.join(isBulkMode ? '\n' : '')
      })
    } catch (e) {
      // In case of parsing errors, just update the source field
      setInputs({ ...inputs, [source]: value })
    }
  }

  // Handle generic paste to auto-detect
  const handleAutoDetectPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedData = e.clipboardData.getData('text')
    // Simple heuristic for binary vs hex vs text
    if (/^[01\s]+$/.test(pastedData)) {
      detectAndConvert(pastedData, 'binary')
    } else if (/^[0-9a-fA-F\s]+$/.test(pastedData)) {
      detectAndConvert(pastedData, 'hex')
    } else {
      detectAndConvert(pastedData, 'text')
    }
  }

  const renderField = (title: string, icon: any, field: keyof typeof inputs, placeholder: string) => {
    const Icon = icon
    return (
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">
            <Icon className="w-4 h-4 text-blue-500" /> {title}
          </div>
          <button onClick={() => handleCopy(inputs[field], field)} className="text-gray-400 hover:text-blue-500 transition-colors">
            {copiedField === field ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <textarea
          value={inputs[field]}
          onChange={(e) => detectAndConvert(e.target.value, field)}
          onPaste={field === 'text' && !inputs.text ? handleAutoDetectPaste : undefined}
          placeholder={isBulkMode ? `${placeholder}\n(Bulk mode: one entry per line)` : placeholder}
          className={`flex-grow w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-transparent focus:border-blue-500/30 rounded-2xl text-xs font-mono outline-none dark:text-gray-300 resize-none transition-all ${isBulkMode ? 'whitespace-pre overflow-x-auto' : ''}`}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-2 px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Base Converter" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
        {renderField('Plain Text', FileText, 'text', 'Paste text here to auto-detect, or type normally...')}
        {renderField('Binary', Binary, 'binary', '01001000 01100101...')}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
        {renderField('Hexadecimal', Hash, 'hex', '48 65 6c 6c 6f...')}
        {renderField('Decimal', NumberIcon, 'decimal', '72 101 108 108 111...')}
      </div>
    </div>
  )
}
