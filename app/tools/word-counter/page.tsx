'use client'
import React, { useState, useEffect } from 'react'
import { Hash, Copy, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function WordCounter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
  }
  const handleCopy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Word Counter" slug="word-counter" />
      <ToolSchema 
        name="Real-time Word & Character Counter" 
        description="Count words, characters, sentences, and paragraphs in real-time. Estimate reading and speaking time for your content."
        slug="word-counter"
        steps={[
          "Paste your text or start typing in the editor.",
          "Watch the statistics update instantly at the top.",
          "Check the reading time estimate for your content.",
          "Use the metrics to optimize your content for social media or SEO."
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl shadow-lg shadow-teal-500/20">
            <Hash className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Word Counter</h1>
            <p className="text-gray-500 dark:text-slate-400">Count words, characters, sentences, and estimate reading time</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Object.entries(stats).map(([key, val]) => (
            <div key={key} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-4 text-center shadow-sm">
              <div className="text-2xl font-black text-gray-900 dark:text-white">{val}</div>
              <div className="text-[10px] text-gray-400 dark:text-slate-500 uppercase font-bold tracking-widest mt-1">{key.replace(/([A-Z])/g, ' $1')}</div>
            </div>
          ))}
        </div>
        
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Start typing or paste your text here..." 
          className="w-full h-80 p-8 font-sans text-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none dark:text-white transition-all" 
        />
        <AdSlot className="mt-12" />

        <ToolInfo 
          title="Word & Character Counter"
          description="The WebToolkit Pro Word Counter is a professional writing utility designed for content creators, students, and SEO professionals. It provides real-time analysis of your text, helping you stay within character limits for social media, metadata, or academic assignments."
          howItWorks="Our tool uses advanced string processing to identify word boundaries, sentence endings, and paragraph breaks. It calculates metrics such as character count (with and without spaces), word density, and estimates reading time based on an average speed of 200 words per minute."
          features={[
            "Real-time word and character counting",
            "Sentence and paragraph detection",
            "Reading time estimation (200 WPM benchmark)",
            "Character count excluding whitespace",
            "Mobile-responsive text analysis interface",
            "100% Client-side: Your content stays private"
          ]}
          faqs={[
            {
              q: "What is the standard character limit for Twitter?",
              a: "As of 2026, the standard limit for X (formerly Twitter) is 280 characters for standard users."
            },
            {
              q: "How many words is a 5-minute read?",
              a: "At a standard reading speed of 200 words per minute, a 5-minute read is approximately 1,000 words."
            },
            {
              q: "Why exclude spaces from character count?",
              a: "Many academic and professional assignments specify limits 'excluding spaces' to focus purely on the volume of actual content rather than formatting."
            },
            {
              q: "Is this tool safe for confidential writing?",
              a: "Yes. WebToolkit Pro processes all text locally in your browser. Your text is never uploaded to our servers, ensuring your drafts and sensitive notes remain private."
            }
          ]}
        />
      </div>
    </div>
  )
}
