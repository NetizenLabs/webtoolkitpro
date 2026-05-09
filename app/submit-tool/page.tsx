'use client'

import React, { useState } from 'react'
import { Send, Sparkles, MessageSquare, Code2, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

export default function SubmitToolPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      triggerQuickSuccess()
    }, 1200)
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300">
        <div className="max-w-md w-full text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/10">
            <CheckCircle2 className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter uppercase">Idea Received!</h2>
          <p className="text-gray-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">
            Your concept has been submitted to our research lab. We'll review the technical feasibility and reach out if it's a match!
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-blue-500/20"
          >
            Submit Another Concept
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl mb-6 shadow-lg shadow-blue-500/10">
            <Send className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            Build the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Developer Toolkit</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Have a technical challenge that needs a dedicated tool? Suggest your idea to our engineering team and get featured on WebToolkit Pro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { title: 'Community Driven', desc: 'We prioritize tools based on your feedback and real-world needs.', icon: MessageSquare, color: 'text-blue-600' },
            { title: 'Open Spec', desc: 'Every tool we build follows strict RFC and NIST security standards.', icon: Code2, color: 'text-indigo-600' },
            { title: 'Security First', desc: 'We only build zero-knowledge, 100% client-side utilities.', icon: ShieldCheck, color: 'text-emerald-600' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5">
              <item.icon className={`w-8 h-8 ${item.color} mb-6`} />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-gray-100 dark:border-slate-800 shadow-2xl shadow-blue-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full" />
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 dark:text-slate-300 ml-2 uppercase tracking-widest">Your Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 dark:text-slate-300 ml-2 uppercase tracking-widest">Email Address</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 dark:text-slate-300 ml-2 uppercase tracking-widest">Tool Concept / Idea</label>
              <textarea 
                required
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-[2rem] px-6 py-6 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium min-h-[150px]"
                placeholder="Tell us about the tool... (e.g., 'A CSS-in-JS performance profiler' or 'A JWT debugger')"
              />
            </div>

            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl text-lg shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Sparkles className={`w-5 h-5 ${status === 'submitting' ? 'animate-spin' : ''}`} />
              {status === 'submitting' ? 'Submitting Concept...' : 'Submit Suggestion'}
            </button>
          </form>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm italic">
            *Submitted ideas are reviewed by our engineering team. If we choose to build your tool, we'll reach out to offer you early access and a permanent contributor credit on the page.
          </p>
        </div>
      </div>
    </div>
  )
}


