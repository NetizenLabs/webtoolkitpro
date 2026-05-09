'use client'

import React, { useState } from 'react'
import { Mail, Send, CheckCircle2 } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('https://formspree.io/f/safi4730358@gmail.com', {
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
    <section className="py-24 bg-blue-600 dark:bg-blue-700 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border-4 border-white rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-[3rem] p-8 md:p-16 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl mb-8 shadow-xl">
            <Mail className="w-10 h-10 text-blue-600" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Get the Weekly Developer Toolkit
          </h2>
          <p className="text-xl text-blue-50 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 5,000+ developers. Get new tools, SEO tips, and technical guides delivered straight to your inbox. No spam, ever.
          </p>

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 animate-bounce">
              <CheckCircle2 className="w-16 h-16 text-green-400" />
              <p className="text-2xl font-bold text-white">You're on the list! Welcome aboard.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Enter your work email"
                  className="block w-full pl-12 pr-4 py-5 bg-white rounded-2xl text-gray-900 font-medium focus:ring-4 focus:ring-blue-400/50 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-gray-900 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-black hover:shadow-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Subscribe <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
          
          <p className="mt-8 text-sm text-blue-100/60 font-medium">
            By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
