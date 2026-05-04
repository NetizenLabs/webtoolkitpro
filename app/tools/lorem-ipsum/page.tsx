'use client'

import React, { useState, useEffect } from 'react'
import { AlignLeft, Copy, RefreshCw, Check } from 'lucide-react'

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
]

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3)
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const generateText = () => {
    let result = []
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

  useEffect(() => {
    generateText()
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-orange-600 rounded-xl">
            <AlignLeft className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lorem Ipsum Generator</h1>
            <p className="text-gray-600">Generate placeholder text for your designs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold text-gray-700">Paragraphs</label>
              <input 
                type="number" 
                min="1" 
                max="20" 
                value={paragraphs}
                onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
              <button 
                onClick={generateText}
                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={handleCopy}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-all flex items-center gap-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
          </div>

          <div className="p-8">
            <textarea
              readOnly
              value={text}
              className="w-full h-96 p-0 font-serif text-lg leading-relaxed text-gray-700 border-none outline-none resize-none focus:ring-0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
