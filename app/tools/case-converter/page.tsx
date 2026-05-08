'use client'
import React, { useState } from 'react'
import { Type, Copy, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function CaseConverter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  const convert = (fn: (s: string) => string) => setText(fn(text))
  const handleCopy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const toTitleCase = (s: string) => s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase())
  const toSentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
  const toAlternating = (s: string) => s.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('')
  const toSlug = (s: string) => s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')

  const buttons = [
    { label: 'UPPERCASE', fn: (s: string) => s.toUpperCase() },
    { label: 'lowercase', fn: (s: string) => s.toLowerCase() },
    { label: 'Title Case', fn: toTitleCase },
    { label: 'Sentence case', fn: toSentenceCase },
    { label: 'aLtErNaTiNg', fn: toAlternating },
    { label: 'slug-case', fn: toSlug },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Case Converter" slug="case-converter" />
      <ToolSchema 
        name="Universal Case Converter" 
        description="Transform text between UPPERCASE, lowercase, Title Case, Sentence case, and slug-case formats instantly."
        slug="case-converter"
        steps={[
          "Paste or type your text into the main editor.",
          "Choose your desired case format from the available buttons.",
          "Check the transformed text in the editor window.",
          "Copy the converted text to your clipboard for use elsewhere."
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-2xl shadow-lg shadow-cyan-500/20">
            <Type className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Case Converter</h1>
            <p className="text-gray-500 dark:text-slate-400">Convert text between different letter cases instantly</p>
          </div>
        </div>

        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Type or paste your text here..." 
          className="w-full h-64 p-8 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none resize-none mb-8 dark:text-white text-lg transition-all" 
        />

        <div className="flex flex-wrap gap-3 mb-8">
          {buttons.map(b => (
            <button 
              key={b.label} 
              onClick={() => convert(b.fn)} 
              className="px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl font-bold text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:shadow-md transition-all"
            >
              {b.label}
            </button>
          ))}
          <button 
            onClick={handleCopy} 
            className="px-6 py-3 bg-cyan-600 text-white rounded-2xl font-bold text-sm hover:bg-cyan-700 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} 
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>
        </div>

        <AdSlot className="mt-8" />

        <ToolInfo 
          title="Text Case Converter"
          description="The WebToolkit Pro Case Converter is a streamlined utility for transforming the capitalization and formatting of your text. Whether you need to fix accidentally typed 'ALL CAPS', prepare SEO-friendly slugs, or format titles for publication, our tool handles all common text transformations with a single click."
          howItWorks="Our tool applies specialized JavaScript string manipulation algorithms to your input. For example, 'Title Case' identifies word boundaries and capitalizes the first letter of each word, while 'Slug Case' removes special characters and replaces spaces with hyphens, making it ideal for creating clean website URLs."
          features={[
            "Instant UPPERCASE and lowercase conversion",
            "Smart Title Case and Sentence case formatting",
            "SEO-friendly slug-case generator",
            "Alternating case (aLtErNaTiNg) for creative styling",
            "Real-time text preview and editing",
            "100% Client-side: Your text is never stored"
          ]}
          faqs={[
            {
              q: "What is Slug Case used for?",
              a: "Slug case is primarily used in web development for creating SEO-friendly URLs. It replaces spaces with hyphens and removes special characters (e.g., 'Hello World' becomes 'hello-world')."
            },
            {
              q: "How does Title Case work?",
              a: "Our Title Case function capitalizes the first letter of every word in the string, making it perfect for blog post titles and headers."
            },
            {
              q: "Can I undo a conversion?",
              a: "While there isn't a direct undo button, you can simply paste your original text back into the editor if you change your mind."
            },
            {
              q: "Is there a limit to how much text I can convert?",
              a: "Our tool can handle large blocks of text efficiently, although very large files (several megabytes) may slow down the browser's response time."
            }
          ]}
        />
      </div>
    </div>
  )
}
