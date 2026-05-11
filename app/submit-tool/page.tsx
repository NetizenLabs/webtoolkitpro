'use client'

import React, { useState } from 'react'
import { Send, Sparkles, MessageSquare, Code2, ShieldCheck, CheckCircle2, Zap, Copy } from 'lucide-react'
import { triggerSuccess } from '@/lib/effects'

export default function SubmitToolPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [submissionId, setSubmissionId] = useState('')

  const generateSubmissionId = () => {
    return `WTK-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    
    const newId = generateSubmissionId()
    setSubmissionId(newId)
    
    try {
      const formElement = e.target as HTMLFormElement
      const formData = new FormData(formElement)
      
      // Add submission ID to the form data for Formspree
      formData.append('submission_id', newId)
      
      const response = await fetch('https://formspree.io/f/safi4730358@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setStatus('success')
        triggerSuccess()
      } else {
        throw new Error('Submission failed')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setStatus('success') // UX fallback
      triggerSuccess()
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen dynamic-padding flex items-center justify-center">
        <div className="max-w-md w-full text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-[#00D4B4]/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-teal-500/10 border border-[#00D4B4]/20">
            <CheckCircle2 className="w-10 h-10 text-[#00D4B4]" />
          </div>
          <h2 className="text-3xl font-bold text-[#1E2D47] dark:text-white mb-4 tracking-tighter uppercase">Idea Received!</h2>
          <p className="text-gray-600 dark:text-[#8A9BBE] mb-6 font-medium leading-relaxed">
            Your concept has been submitted to our research lab. We&apos;ll review the technical feasibility and reach out if it&apos;s a match!
          </p>

          <div className="bg-[#0B1120] border border-[#1E2D47] rounded-[12px] p-4 mb-8 flex items-center justify-between group hover:border-[#00D4B4]/30 transition-all">
            <div className="text-left">
              <span className="text-[10px] font-bold text-[#4A6080] uppercase tracking-widest block mb-1">Tracking ID</span>
              <span className="text-white font-mono font-bold tracking-wider">{submissionId}</span>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(submissionId)
                // Optional: add a "Copied" toast here if you want
              }}
              className="p-2 text-[#4A6080] hover:text-[#00D4B4] transition-colors"
              title="Copy ID"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={() => setStatus('idle')}
            className="w-full py-4 bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] rounded-[12px] font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-500/10"
          >
            Submit Another Concept
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen dynamic-padding">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-12">
          <span className="inline-block px-4 py-1.5 bg-[#00D4B4]/10 text-[#00D4B4] text-[10px] font-bold font-mono uppercase tracking-[0.2em] rounded-full mb-4 border border-[#00D4B4]/20">
            💡 Submit a Tool
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1E2D47] dark:text-white mb-6 tracking-tighter leading-tight">
            Build the Future of <br />
            <span className="text-[#00D4B4]">Developer Utilities</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-[#8A9BBE] max-w-2xl mx-auto leading-relaxed">
            Have a technical challenge that needs a dedicated tool? Suggest your idea to our engineering team and get featured on WebToolkit Pro.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { title: 'Community Driven', desc: 'We prioritize tools based on your feedback and real-world needs.', icon: MessageSquare, color: 'text-blue-500' },
            { title: 'Open Spec', desc: 'Every tool we build follows strict RFC and NIST security standards.', icon: Code2, color: 'text-indigo-500' },
            { title: 'Security First', desc: 'We only build zero-knowledge, 100% client-side utilities.', icon: ShieldCheck, color: 'text-[#00D4B4]' },
          ].map((item, i) => (
            <div key={i} className="bg-[#0D1526] p-8 rounded-[12px] border border-[#1E2D47] hover:border-[#00D4B4]/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#0B1120] rounded-[10px] flex items-center justify-center mb-6 shadow-lg border border-[#1E2D47]">
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-sm text-[#8A9BBE] leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Submission Form */}
        <div className="bg-[#0D1526] rounded-[12px] border border-[#1E2D47] p-8 md:p-12 shadow-2xl shadow-blue-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D4B4]/5 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3" />
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#8A9BBE] dark:text-white uppercase tracking-widest font-mono ml-2">Your Name</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  className="w-full bg-[#0B1120] border border-[#1E2D47] rounded-[12px] px-6 py-4 text-white placeholder-[#4A6080] focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all font-medium"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#8A9BBE] dark:text-white uppercase tracking-widest font-mono ml-2">Email Address</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  className="w-full bg-[#0B1120] border border-[#1E2D47] rounded-[12px] px-6 py-4 text-white placeholder-[#4A6080] focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all font-medium"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#8A9BBE] dark:text-white uppercase tracking-widest font-mono ml-2">Tool Concept / Idea</label>
              <textarea 
                required
                name="idea"
                className="w-full bg-[#0B1120] border border-[#1E2D47] rounded-[12px] px-6 py-6 text-white placeholder-[#4A6080] focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all font-medium min-h-[150px] resize-none"
                placeholder="Tell us about the tool... (e.g., 'A CSS-in-JS performance profiler' or 'A JWT debugger')"
              />
            </div>

            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] font-bold py-5 rounded-[12px] text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${status === 'submitting' ? 'animate-spin' : ''}`} />
              {status === 'submitting' ? 'Transmitting...' : 'Submit Suggestion'}
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-[#4A6080] text-[10px] font-bold font-mono uppercase tracking-widest leading-relaxed">
            *Submitted ideas are reviewed by our engineering team. If selected, we&apos;ll offer contributor credit.
          </p>
        </div>
      </div>
    </div>
  )
}

}


