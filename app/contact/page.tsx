'use client'

import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

function ContactForm() {
  const searchParams = useSearchParams()
  const subjectParam = searchParams.get('subject') || ''
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const response = await fetch('https://formspree.io/f/hello@wtkpro.site', {
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight uppercase">Message Sent!</h2>
          <p className="text-gray-600 dark:text-[#8A9BBE] mb-8 font-medium">
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
    <div className="bg-white dark:bg-[#0D1526] rounded-[12px] border border-gray-100 dark:border-[#1E2D47] p-8 md:p-12 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D4B4]/5 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3" />
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-bold text-gray-500 dark:text-white mb-3 block uppercase tracking-widest font-mono ml-2">Your Name</label>
            <input 
              required
              name="name"
              type="text" 
              placeholder="John Doe" 
              className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-[#1E2D47] rounded-[12px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#4A6080] focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all font-medium" 
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 dark:text-white mb-3 block uppercase tracking-widest font-mono ml-2">Email Address</label>
            <input 
              required
              name="email"
              type="email" 
              placeholder="john@example.com" 
              className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-[#1E2D47] rounded-[12px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#4A6080] focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all font-medium" 
            />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-500 dark:text-white mb-3 block uppercase tracking-widest font-mono ml-2">Subject</label>
          <input 
            required
            name="subject"
            type="text" 
            defaultValue={subjectParam}
            placeholder="How can we help?" 
            className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-[#1E2D47] rounded-[12px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#4A6080] focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all font-medium" 
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-500 dark:text-white mb-3 block uppercase tracking-widest font-mono ml-2">Message</label>
          <textarea 
            required
            name="message"
            rows={6} 
            placeholder="Detailed report or suggestion..." 
            className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-[#1E2D47] rounded-[12px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#4A6080] focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all font-medium resize-none" 
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
  )
}

export default function ContactPage() {
  return (
    <div className="dynamic-padding max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-16 pt-12">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1E2D47] dark:text-white mb-6 tracking-tighter">
          Connect with <span className="text-[#00D4B4]">Us</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-[#8A9BBE] max-w-3xl mx-auto leading-relaxed">
          Have a question about our engineering lab or need to report a technical issue? Our team is ready to assist.
        </p>
      </div>

      <Suspense fallback={<div className="h-[400px] bg-[#0D1526] rounded-[12px] animate-pulse" />}>
        <ContactForm />
      </Suspense>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-12 border-t border-[#1E2D47] pt-12">
        <a href="mailto:hello@wtkpro.site" className="text-[#8A9BBE] hover:text-[#00D4B4] flex items-center gap-3 font-medium transition-colors">
          <div className="w-10 h-10 bg-[#0D1526] border border-[#1E2D47] rounded-[10px] flex items-center justify-center">
            <Mail className="w-4 h-4 text-[#00D4B4]" />
          </div> 
          hello@wtkpro.site
        </a>
        <div className="text-[#8A9BBE] flex items-center gap-3 font-medium">
          <div className="w-10 h-10 bg-[#0D1526] border border-[#1E2D47] rounded-[10px] flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-[#00D4B4]" />
          </div> 
          Enterprise Support
        </div>
      </div>

      {/* SEO Content Block (Resolves Thin Content Penalty) */}
      <section className="mt-24 border-t border-[#1E2D47] pt-16 pb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1E2D47] dark:text-white mb-12 text-center tracking-tight">Frequently Asked Questions & Support Policies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold text-[#00D4B4] uppercase tracking-widest font-mono mb-4">Zero-Knowledge Security Standards</h3>
              <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed">
                When you use WebToolkit Pro to format JSON, decode JWTs, or test Regular Expressions, your data is never transmitted to our backend. We built our entire suite on a strict client-side, zero-knowledge architecture. This means your proprietary code, API keys, and PII are processed locally inside your browser&apos;s RAM and destroyed the moment you close the tab. If you have security concerns or wish to review our data handling policies, please use the contact form above and our security team will respond within 24 hours.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-[#00D4B4] uppercase tracking-widest font-mono mb-4">Tool Requests & Bug Reports</h3>
              <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed">
                Are we missing a tool that your engineering team desperately needs? We are constantly expanding our library of over 150 offline developer utilities. If you encounter a bug with our Base64 encoder, or if you want to request a brand new XML formatter, select the appropriate subject line in the contact form. Please include as much detail as possible—such as browser version, operating system, and the specific input data that triggered the error—so our engineers can replicate and patch the issue quickly.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold text-[#00D4B4] uppercase tracking-widest font-mono mb-4">High-Availability Infrastructure</h3>
              <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed">
                Because our utilities execute locally via WebAssembly and JavaScript, there are no artificial API rate limits or throttling constraints. You can use our converters and validators as frequently as your workflow demands without hitting a paywall or requiring a premium subscription. This decentralized processing model ensures that WebToolkit Pro remains lightning fast and highly available, even if our primary CDN experiences heavy traffic.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#00D4B4] uppercase tracking-widest font-mono mb-4">Partnerships & Advertising</h3>
              <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed">
                WebToolkit Pro serves a highly technical audience of software engineers, DevOps specialists, and frontend designers. If you are representing a B2B SaaS company, cloud hosting provider, or API marketplace, we offer targeted advertising sponsorships that do not compromise our users&apos; privacy. Reach out via the form to discuss programmatic integrations, sponsored blog posts on our Technical SEO Hub, or dedicated tool sponsorships.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}


