'use client'

import React, { useState } from 'react'
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      triggerQuickSuccess()
    }, 1000)
  }

  if (status === 'success') {
    return (
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/10">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Message Sent!</h2>
          <p className="text-gray-500 dark:text-slate-400 mb-8 font-medium">
            Thanks for reaching out. Our engineering team will get back to you within 24 hours.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Contact Us</h1>
          <p className="text-xl text-gray-500 dark:text-slate-400">Have a question, suggestion, or found a bug? We&apos;d love to hear from you.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 md:p-12 shadow-sm dark:shadow-blue-900/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 block">Your Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all" 
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 block">Email Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all" 
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 block">Subject</label>
              <input 
                required
                type="text" 
                placeholder="How can we help?" 
                className="w-full p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all" 
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 block">Message</label>
              <textarea 
                required
                rows={6} 
                placeholder="Your message..." 
                className="w-full p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all resize-none" 
              />
            </div>
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className={`w-5 h-5 ${status === 'submitting' ? 'animate-bounce' : ''}`} /> 
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-slate-400 flex items-center justify-center gap-2 font-medium">
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" /> hello@wtkpro.site
          </p>
        </div>
      </div>
    </div>
  )
}


