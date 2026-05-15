'use client'

import React, { useState } from 'react'
import { BookOpen, Search, Copy, Check, Info, BarChart } from 'lucide-react'

export default function ReadabilityChecker() {
  const [text, setText] = useState('')
  const [stats, setStats] = useState<{
    score: number;
    grade: string;
    words: number;
    sentences: number;
    syllables: number;
  } | null>(null)

  const analyzeReadability = () => {
    if (!text.trim()) return

    const words = text.trim().split(/\s+/).length
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1
    const syllables = countSyllables(text)

    // Flesch Reading Ease Formula
    const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
    
    let grade = 'College'
    if (score > 90) grade = '5th Grade'
    else if (score > 80) grade = '6th Grade'
    else if (score > 70) grade = '7th Grade'
    else if (score > 60) grade = '8th-9th Grade'
    else if (score > 50) grade = '10th-12th Grade'
    else if (score > 30) grade = 'College'
    else grade = 'Professional'

    setStats({
      score: Math.round(score),
      grade,
      words,
      sentences,
      syllables
    })
  }

  const countSyllables = (str: string) => {
    str = str.toLowerCase()
    if (str.length <= 3) return 1
    str = str.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    str = str.replace(/^y/, '')
    const match = str.match(/[aeiouy]{1,2}/g)
    return match ? match.length : 1
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Readability Auditor</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Flesch Reading Ease Score</p>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your content here to analyze its reading difficulty..."
          className="w-full h-64 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm leading-relaxed text-gray-800 dark:text-[#F0F6FF] outline-none"
        />

        <button
          onClick={analyzeReadability}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.01] transition-all"
        >
          Calculate Readability
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
            <div className={`text-5xl font-black mb-2 ${stats.score > 60 ? 'text-green-500' : 'text-amber-500'}`}>
              {stats.score}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Reading Ease Score</div>
            <div className="mt-4 px-4 py-1.5 bg-blue-500/10 text-blue-600 rounded-full text-[11px] font-black uppercase tracking-widest">
              {stats.grade} Level
            </div>
          </div>

          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Text Metrics</h4>
            <div className="space-y-4">
              {[
                { label: 'Total Words', value: stats.words },
                { label: 'Sentences', value: stats.sentences },
                { label: 'Estimated Syllables', value: stats.syllables },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 dark:text-[#8A9BBE]">{m.label}</span>
                  <span className="text-xs font-black font-mono text-gray-900 dark:text-white">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
