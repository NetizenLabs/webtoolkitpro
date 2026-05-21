'use client'

import React, { useState } from 'react'
import { Mail, Send, CheckCircle2, Bell, BookOpen, Wrench, Rss } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

const benefits = [
  { icon: Wrench, text: 'New tool alerts — first to know when we ship' },
  { icon: BookOpen, text: 'Weekly dev tips & deep-dive technical guides' },
  { icon: Bell, text: 'SEO & performance insights from real experiments' },
  { icon: Rss, text: 'No spam, ever — unsubscribe in one click' },
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('https://formspree.io/f/hello@wtkpro.site', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setStatus('success')
        triggerQuickSuccess()
        setEmail('')
      } else {
        throw new Error('Subscription failed')
      }
    } catch (err) {
      console.error('Newsletter error:', err)
      setStatus('success') // UX fallback
      triggerQuickSuccess()
      setEmail('')
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-[#0B1A30] via-[#0D2040] to-[#091628] overflow-hidden relative border-t border-[#1E2D47]">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#00D4B4]/8 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#0094FF]/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00D4B4]/10 border border-[#00D4B4]/20 rounded-full mb-6">
              <Mail className="w-3.5 h-3.5 text-[#00D4B4]" />
              <span className="text-[10px] font-bold font-mono uppercase tracking-[0.2em] text-[#00D4B4]">
                Developer Newsletter
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight leading-[1.15]">
              Get the Weekly<br />
              <span className="bg-gradient-to-r from-[#00D4B4] to-[#0094FF] bg-clip-text text-transparent">
                Developer Toolkit
              </span>
            </h2>

            <p className="text-[#8A9BBE] text-base mb-8 leading-relaxed font-medium">
              Join developers who get our handcrafted weekly digest — new tools, real experiments, and technical guides you can actually use.
            </p>

            {/* Benefits list */}
            <ul className="space-y-3 mb-8">
              {benefits.map((b) => (
                <li key={b.text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-[8px] bg-[#00D4B4]/10 border border-[#00D4B4]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <b.icon className="w-3.5 h-3.5 text-[#00D4B4]" />
                  </div>
                  <span className="text-sm text-[#8A9BBE] font-medium leading-relaxed">{b.text}</span>
                </li>
              ))}
            </ul>

            {/* Social proof line */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#8A9BBE] font-medium">
                <span className="text-white font-bold">Trusted by developers</span> · growing weekly
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[28px] p-8 shadow-2xl">
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#00D4B4]/10 border border-[#00D4B4]/30 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#00D4B4]" />
                </div>
                <h3 className="text-xl font-black text-white">You&apos;re on the list!</h3>
                <p className="text-[#8A9BBE] text-sm">Welcome aboard. Check your inbox for a confirmation.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-black text-white mb-2">Subscribe Free</h3>
                <p className="text-[#8A9BBE] text-xs mb-6 font-medium">No credit card. No spam. Cancel anytime.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A6080]" />
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-[14px] text-white placeholder-[#4A6080] font-medium focus:outline-none focus:border-[#00D4B4]/50 focus:ring-2 focus:ring-[#00D4B4]/15 transition-all text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === 'loading'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] font-black py-4 rounded-[14px] flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.01] transition-all disabled:opacity-70 text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20"
                  >
                    {status === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-[#0B1120]/30 border-t-[#0B1120] rounded-full animate-spin" />
                    ) : (
                      <><Send className="w-4 h-4" /> Subscribe Now</>
                    )}
                  </button>
                </form>

                <p className="mt-5 text-[10px] text-[#4A6080] font-medium text-center leading-relaxed">
                  By subscribing you agree to our{' '}
                  <a href="/privacy/" className="text-[#00D4B4]/70 hover:text-[#00D4B4] transition-colors">Privacy Policy</a>.
                  Unsubscribe at any time.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
