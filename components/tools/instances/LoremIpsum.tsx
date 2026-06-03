'use client'
import React, { useState, useEffect } from 'react'
import { AlignLeft, Copy, RefreshCw, Check, Trash2, FileJson } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
]

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3)
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const generateText = React.useCallback(() => {
    let result = []
    
    // In bulk mode, generate an array of JSON objects instead of plain text blocks
    if (isBulkMode) {
      for (let i = 0; i < Math.min(paragraphs, 1000); i++) {
        let sentenceCount = Math.floor(Math.random() * 4) + 4
        let sentences = []
        for (let s = 0; s < sentenceCount; s++) {
          let wordCount = Math.floor(Math.random() * 10) + 8
          let sentence = []
          for (let w = 0; w < wordCount; w++) {
            let word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]
            if (w === 0) word = word.charAt(0).toUpperCase() + word.slice(1)
            sentence.push(word)
          }
          sentences.push(sentence.join(' ') + '.')
        }
        
        // Generate a random title for the object
        let titleWords = []
        for (let w = 0; w < (Math.floor(Math.random() * 4) + 2); w++) {
          let word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]
          if (w === 0) word = word.charAt(0).toUpperCase() + word.slice(1)
          titleWords.push(word)
        }
        
        result.push({
          id: i + 1,
          title: titleWords.join(' '),
          content: sentences.join(' ')
        })
      }
      setText(JSON.stringify(result, null, 2))
    } else {
      for (let p = 0; p < paragraphs; p++) {
        let sentenceCount = Math.floor(Math.random() * 4) + 4
        let sentences = []
        for (let s = 0; s < sentenceCount; s++) {
          let wordCount = Math.floor(Math.random() * 10) + 8
          let sentence = []
          for (let w = 0; w < wordCount; w++) {
            let word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]
            if (w === 0) word = word.charAt(0).toUpperCase() + word.slice(1)
            sentence.push(word)
          }
          sentences.push(sentence.join(' ') + '.')
        }
        result.push(sentences.join(' '))
      }
      setText(result.join('\n\n'))
    }
  }, [paragraphs, isBulkMode])

  useEffect(() => {
    generateText()
  }, [generateText])

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setText('')
    setParagraphs(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Dummy JSON" />
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden">
        <div className="p-8 border-b border-gray-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-6 bg-gray-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                {isBulkMode ? <><FileJson className="w-3 h-3 text-yellow-500" /> JSON Records</> : 'Paragraphs'}
              </label>
              <input 
                type="number" 
                min="1" 
                max={isBulkMode ? 1000 : 20} 
                value={paragraphs}
                onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
                className="w-20 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none dark:text-white font-bold"
              />
            </div>
            <button onClick={generateText} className="p-3 bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/20">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button onClick={clearAll} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={handleCopy}
            className="px-8 py-3 bg-orange-600 text-white rounded-xl font-bold flex items-center gap-2 uppercase tracking-widest text-xs shadow-xl shadow-orange-500/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy Text'}
          </button>
        </div>
        <div className="p-10">
          <textarea
            readOnly
            value={text}
            placeholder="Your generated text..."
            className={`w-full h-96 p-0 leading-relaxed text-gray-700 dark:text-slate-300 bg-transparent border-none outline-none resize-none ${isBulkMode ? 'font-mono text-sm' : 'font-serif text-xl'}`}
          />
        </div>
      </div>
    </div>
  )
}
