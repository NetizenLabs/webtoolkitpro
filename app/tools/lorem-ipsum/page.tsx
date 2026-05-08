'use client'

import React, { useState, useEffect } from 'react'
import { AlignLeft, Copy, RefreshCw, Check, Trash2, ArrowRight, Type } from 'lucide-react'
import Link from 'next/link'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

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

  const clearAll = () => {
    setText('')
    setParagraphs(1)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Lorem Ipsum Generator" slug="tools/lorem-ipsum" />
      <ToolSchema 
        name="Lorem Ipsum Placeholder Generator" 
        description="Generate high-quality Latin placeholder text for your website mockups, UI/UX designs, and typesetting layouts."
        slug="lorem-ipsum"
        steps={[
          "Select the number of paragraphs you need (up to 20).",
          "Click the refresh icon to generate new random text.",
          "Review the generated text in the serif-styled editor.",
          "Copy the text to your clipboard for use in your design tools."
        ]}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4 text-left">
            <div className="p-4 bg-orange-600 rounded-2xl shadow-lg shadow-orange-600/20">
              <AlignLeft className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Lorem Ipsum Generator</h1>
              <p className="text-gray-500 dark:text-slate-400">Generate premium placeholder text for UI/UX and design mockups</p>
            </div>
          </div>
          
          <button 
            onClick={clearAll}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-all border border-red-100 dark:border-red-900/30"
          >
            <Trash2 className="w-4 h-4" /> Clear
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-orange-900/5 border border-gray-100 dark:border-slate-800 overflow-hidden mb-12 transition-all">
          <div className="p-8 border-b border-gray-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-6 bg-gray-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Paragraphs</label>
                <input 
                  type="number" 
                  min="1" 
                  max="20" 
                  value={paragraphs}
                  onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
                  className="w-20 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none dark:text-white font-bold"
                />
              </div>
              <button 
                onClick={generateText}
                className="p-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20"
                title="Regenerate"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={handleCopy}
              className="px-8 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all flex items-center gap-2 uppercase tracking-widest text-xs shadow-xl shadow-orange-500/20"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
          </div>

          <div className="p-10">
            <textarea
              readOnly
              value={text}
              placeholder="Your generated placeholder text will appear here..."
              className="w-full h-96 p-0 font-serif text-xl leading-relaxed text-gray-700 dark:text-slate-300 bg-transparent border-none outline-none resize-none focus:ring-0 placeholder:text-gray-300 dark:placeholder:text-slate-700"
            />
          </div>
        </div>

        {/* Design Context Footer */}
        <div className="bg-orange-600 rounded-[3rem] p-10 text-white relative overflow-hidden group mb-16 shadow-xl shadow-orange-500/20">
          <Type className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Design Authority Tips</h3>
              <p className="text-orange-100 text-sm leading-relaxed">
                Lorem Ipsum helps designers focus on visual hierarchy without being distracted by content. For technical mockups, use our JSON Formatter to generate structured placeholder data.
              </p>
            </div>
            <Link 
              href="/tools/json-formatter/"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              Try JSON Formatter <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <AdSlot />

        <ToolInfo 
          title="Lorem Ipsum Generator"
          description="The WebToolkit Pro Lorem Ipsum Generator is a specialized utility for designers and developers who need high-quality dummy text for their layouts. Lorem ipsum is a pseudo-Latin text used in the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          howItWorks="Our generator uses a randomized selection of classic Latin words to construct grammatically balanced sentences and paragraphs. This ensures that the resulting text has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English for mockup purposes."
          features={[
            "Customizable paragraph count (1 to 20)",
            "Randomized sentence and word distribution",
            "High-contrast serif typography for better visualization",
            "One-click regeneration for fresh content",
            "Mobile-responsive design mockup view",
            "100% Client-side: No data transmission required"
          ]}
          faqs={[
            {
              q: "What is the origin of Lorem Ipsum?",
              a: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
            },
            {
              q: "Why use Lorem Ipsum instead of English text?",
              a: "Using dummy text allows clients and designers to focus on the visual elements of a layout (typography, white space, and grid) without being distracted by the literal meaning of the words."
            },
            {
              q: "Is there a standard Lorem Ipsum passage?",
              a: "The standard chunk of Lorem Ipsum used since the 1500s starts with 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'"
            },
            {
              q: "Does this generator support other languages?",
              a: "Our current version focuses on the classic Latin-based Lorem Ipsum, which is the most widely recognized placeholder format in global design."
            }
          ]}
        />
      </div>
    </div>
  )
}
