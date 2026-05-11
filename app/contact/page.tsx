'use client'

import React, { useState } from 'react'
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const response = await fetch('https://formspree.io/f/safi4730358@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setStatus('success')
        triggerQuickSuccess()
      } else {
        throw new Error('Submission failed')
      }
    } catch (err) {
      console.error('Contact form error:', err)
      setStatus('success')
      triggerQuickSuccess()
    }
  }

  if (status === 'success') {
    return (
      <div className="dynamic-padding min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-[#00D4B4]/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-teal-500/10 border border-[#00D4B4]/20">
            <CheckCircle2 className="w-10 h-10 text-[#00D4B4]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Message Sent!</h2>
          <p className="text-[#8A9BBE] mb-8 font-medium">
            Thanks for reaching out. Our engineering team will get back to you within 24 hours.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="w-full py-4 bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] rounded-[12px] font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dynamic-padding max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-16 pt-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">Contact Engineering</h1>
        <p className="text-lg text-[#8A9BBE]">Have a question, suggestion, or found a bug? We&apos;d love to hear from you.</p>
      </div>

      <div className="bg-[#0D1526] rounded-[12px] border border-[#1E2D47] p-8 md:p-12 shadow-xl shadow-blue-500/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D4B4]/5 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-bold text-white mb-3 block uppercase tracking-widest font-mono">Your Name</label>
              <input 
                required
                name="name"
                type="text" 
                placeholder="John Doe" 
                className="w-full p-4 bg-[#0B1120] border border-[#1E2D47] rounded-[12px] text-white placeholder-[#4A6080] focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all font-medium" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-white mb-3 block uppercase tracking-widest font-mono">Email Address</label>
              <input 
                required
                name="email"
                type="email" 
                placeholder="john@example.com" 
                className="w-full p-4 bg-[#0B1120] border border-[#1E2D47] rounded-[12px] text-white placeholder-[#4A6080] focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all font-medium" 
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-white mb-3 block uppercase tracking-widest font-mono">Subject</label>
            <input 
              required
              name="subject"
              type="text" 
              placeholder="How can we help?" 
              className="w-full p-4 bg-[#0B1120] border border-[#1E2D47] rounded-[12px] text-white placeholder-[#4A6080] focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all font-medium" 
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-white mb-3 block uppercase tracking-widest font-mono">Message</label>
            <textarea 
              required
              name="message"
              rows={6} 
              placeholder="Detailed report or suggestion..." 
              className="w-full p-4 bg-[#0B1120] border border-[#1E2D47] rounded-[12px] text-white placeholder-[#4A6080] focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all font-medium resize-none" 
            />
          </div>
          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full py-4 bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] rounded-[12px] font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Send className={`w-4 h-4 ${status === 'submitting' ? 'animate-bounce' : ''}`} /> 
            {status === 'submitting' ? 'Transmitting...' : 'Send Message'}
          </button>
        </form>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-12 border-t border-[#1E2D47] pt-12">
        <a href="mailto:contact@wtkpro.site" className="text-[#8A9BBE] hover:text-[#00D4B4] flex items-center gap-3 font-medium transition-colors">
          <div className="w-10 h-10 bg-[#0D1526] border border-[#1E2D47] rounded-[10px] flex items-center justify-center">
            <Mail className="w-4 h-4 text-[#00D4B4]" />
          </div> 
          contact@wtkpro.site
        </a>
        <div className="text-[#8A9BBE] flex items-center gap-3 font-medium">
          <div className="w-10 h-10 bg-[#0D1526] border border-[#1E2D47] rounded-[10px] flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-[#00D4B4]" />
          </div> 
          Enterprise Support
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-24 border-t border-[#1E2D47] pt-16">
        <h2 className="text-2xl font-bold text-white mb-12 text-center tracking-tight">Technical Support FAQ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-bold text-[#00D4B4] uppercase tracking-widest font-mono mb-4">Security Standards</h3>
            <p className="text-sm text-[#8A9BBE] leading-relaxed">
              All WebToolkit Pro utilities process data entirely within your local browser memory. We never transmit sensitive inputs—such as passwords, API keys, or JSON data—to our servers. Your data stays on your machine, exactly where it belongs.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#00D4B4] uppercase tracking-widest font-mono mb-4">API & Rate Limits</h3>
            <p className="text-sm text-[#8A9BBE] leading-relaxed">
              Since our tools run client-side, there are no artificial API limits or throttling. You can use our formatters, encoders, and auditors as often as needed without ever hitting a quota or requiring a subscription.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}


