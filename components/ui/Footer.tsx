'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Github, Twitter, Mail } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'
import Logo from './Logo'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
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
      console.error('Footer subscribe error:', err)
      setStatus('success') // UX fallback
      triggerQuickSuccess()
      setEmail('')
    }
  }

  return (
    <footer className="bg-[#0B1120] text-[#8A9BBE] pt-20 pb-8 border-t border-[#1E2D47]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-8 outline-none focus-visible:ring-2 focus-visible:ring-[#00D4B4] rounded-lg">
              <Logo />
            </Link>
            <p className="text-sm leading-relaxed font-medium mb-6">
              Premium online tools for web developers and designers. 
              Secure, fast, and professional-grade engineering utilities.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-[10px] font-mono">Popular Tools</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/tools/pinterest-downloader/" className="hover:text-[#00D4B4] transition-colors text-xs">Pinterest Downloader</Link></li>
              <li><Link href="/tools/json-formatter/" className="hover:text-[#00D4B4] transition-colors text-xs">JSON Formatter</Link></li>
              <li><Link href="/tools/password-generator/" className="hover:text-[#00D4B4] transition-colors text-xs">Secure Password Gen</Link></li>
              <li><Link href="/tools/what-is-my-ip/" className="hover:text-[#00D4B4] transition-colors text-xs">What is my IP?</Link></li>
              <li><Link href="/tools/redirect-checker/" className="hover:text-[#00D4B4] transition-colors text-xs">Redirect Checker</Link></li>
              <li><Link href="/tools/category/revenue-analytics/" className="hover:text-[#00D4B4] transition-colors text-xs">Revenue Analytics</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-[10px] font-mono">Technical Resources</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/blog/seo-meta-tags-complete-guide/" className="hover:text-[#00D4B4] transition-colors text-xs">SEO Meta Tags Guide</Link></li>
              <li><Link href="/blog/geo-optimization-guide/" className="hover:text-[#00D4B4] transition-colors text-xs">GEO Optimization</Link></li>
              <li><Link href="/blog/llm-latency-ux-impact/" className="hover:text-[#00D4B4] transition-colors text-xs">LLM Latency Study</Link></li>
              <li><Link href="/blog/modern-css-architecture/" className="hover:text-[#00D4B4] transition-colors text-xs">Modern CSS Guide</Link></li>
              <li><Link href="/about/" className="hover:text-[#00D4B4] transition-colors text-xs">About WTK Pro</Link></li>
            </ul>
          </div>

          <div className="bg-[#0D1526] p-8 rounded-[12px] border border-[#1E2D47]">
            <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-[10px] font-mono">Developer Newsletter</h3>
            <p className="text-xs text-[#8A9BBE] mb-6 leading-relaxed font-medium">
              Get the latest tools and technical SEO updates in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="engineering@company.com" 
                required
                className="w-full bg-[#0B1120] border border-[#1E2D47] rounded-[12px] px-4 py-3 text-xs text-white placeholder-[#4A6080] focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all font-medium"
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] font-bold py-3 rounded-[12px] text-xs uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-blue-500/10 active:scale-95 disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : status === 'success' ? 'Welcome Aboard!' : 'Subscribe Now'}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#1E2D47]/50 gap-6">
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] font-mono">
            <Link href="/privacy-policy/" className="hover:text-[#00D4B4] transition-colors">Privacy</Link>
            <Link href="/terms-of-service/" className="hover:text-[#00D4B4] transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-[#00D4B4] transition-colors">Sitemap</Link>
            <span className="text-[#4A6080]">v1.0.4</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/WebToolkit-Pro" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#0D1526] border border-[#1E2D47] rounded-[10px] text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all">
              <Github className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a href="https://twitter.com/wtkpro" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#0D1526] border border-[#1E2D47] rounded-[10px] text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all">
              <Twitter className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a href="mailto:contact@wtkpro.site" className="p-2.5 bg-[#0D1526] border border-[#1E2D47] rounded-[10px] text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all">
              <Mail className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>

          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4A6080]">
            © {new Date().getFullYear()} WebToolkit Pro • Built for Engineers
          </p>
        </div>
      </div>
    </footer>
  )
}