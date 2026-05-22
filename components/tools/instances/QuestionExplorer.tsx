'use client'
import React, { useState } from 'react'
import { Search, Zap, HelpCircle, ArrowRight, Copy, Check, Hash, Sparkles, Filter, Shield } from 'lucide-react'

interface Question {
  text: string
  intent: string
  relevance: number
}

const INTENT_COLORS: Record<string, string> = {
  'Budget': 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
  'Trust': 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
  'Technical': 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
  'Validation': 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
  'Comparison': 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800'
}

export default function QuestionExplorer() {
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const findQuestions = async () => {
    if (!keyword) return
    setLoading(true)
    
    try {
      const res = await fetch(`/api/question-explorer?keyword=${encodeURIComponent(keyword)}`)
      const data = await res.json()
      if (data.questions) {
        setQuestions(data.questions)
      } else {
        setQuestions([])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-12">
      {/* Search Header */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-2 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl">
          <div className="relative flex-grow">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input 
              type="text" 
              placeholder="Enter your niche (e.g., 'roof repair' or 'SaaS marketing')..."
              className="w-full h-16 pl-16 pr-6 bg-transparent outline-none dark:text-white text-lg font-medium"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && findQuestions()}
            />
          </div>
          <button 
            onClick={findQuestions}
            disabled={loading || !keyword}
            className="h-16 px-10 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[2rem] transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 group"
          >
            {loading ? (
              <Sparkles className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Analyze Reddit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
           <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> No Login Required</span>
           <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Instant Analysis</span>
           <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Privacy First</span>
        </div>
      </div>

      {/* Results Area */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
              <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold dark:text-white mb-2">Scanning Reddit Discussions...</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">Mapping user intent and common pain points for &quot;{keyword}&quot;</p>
            </div>
          </div>
        ) : questions.length > 0 ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between px-4">
               <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                 <Filter className="w-4 h-4" /> Top Insights Found
               </h2>
               <div className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                 Showing {questions.length} Questions
               </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {questions.map((q, i) => (
                <div key={i} className="group bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 shrink-0 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-lg font-black text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <div className="space-y-2">
                      <div className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${INTENT_COLORS[q.intent]}`}>
                        {q.intent} Intent
                      </div>
                      <p className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                        {q.text}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCopy(q.text, i)}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold rounded-xl transition-all active:scale-95 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50"
                  >
                    {copiedIndex === i ? (
                      <><Check className="w-4 h-4" /> Copied</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy Question</>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-[3rem]">
            <div className="w-20 h-20 bg-gray-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6">
              <HelpCircle className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Discover What Users Want</h3>
            <p className="text-gray-500 dark:text-slate-400 max-w-sm text-center">
              Enter a niche above to see the top questions being discussed in communities like Reddit.
            </p>
          </div>
        )}
      </div>

      {/* Pro Tip */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-10 rounded-[3rem] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
           <div className="w-20 h-20 shrink-0 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-blue-400" />
           </div>
           <div className="space-y-4">
              <h4 className="text-2xl font-black uppercase tracking-tight">How to use these insights?</h4>
              <p className="text-slate-300 leading-relaxed max-w-2xl">
                Real questions found on social platforms are the &quot;Holy Grail&quot; of SEO. Use these as <strong>H2 or H3 headers</strong> in your blog posts, or create dedicated FAQ sections to win the Google &quot;People Also Ask&quot; snippet.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
