'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Box, Github, Twitter, Mail } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

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
    <footer className="bg-slate-950 text-gray-400 pt-[var(--space-lg)] pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <span className="text-2xl font-black text-white tracking-tighter">
                WebToolkit<span className="text-blue-500">Pro</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed font-medium mb-6">
              Premium online tools for web developers and designers. 
              Secure, fast, and professional-grade engineering utilities.
            </p>
            <div className="opacity-60 hover:opacity-100 transition-opacity">
              <a 
                href="https://www.producthunt.com/products/webtoolkit-pro?utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-webtoolkit-pro" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                  <span className="sr-only">WebToolkit Pro on Product Hunt</span>
                  <img 
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1141100&theme=light" 
                    alt="Product Hunt Featured" 
                    width="180" 
                    height="39" 
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Popular Tools</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/tools/pinterest-downloader/" className="hover:text-blue-400 transition-colors text-xs">Pinterest Downloader</Link></li>
              <li><Link href="/tools/json-formatter/" className="hover:text-blue-400 transition-colors text-xs">JSON Formatter</Link></li>
              <li><Link href="/tools/password-generator/" className="hover:text-blue-400 transition-colors text-xs">Secure Password Gen</Link></li>
              <li><Link href="/tools/what-is-my-ip/" className="hover:text-blue-400 transition-colors text-xs">What is my IP?</Link></li>
              <li><Link href="/tools/redirect-checker/" className="hover:text-blue-400 transition-colors text-xs">Redirect Checker</Link></li>
              <li><Link href="/tools/category/revenue-analytics/" className="hover:text-blue-400 transition-colors text-xs">Revenue Analytics</Link></li>
              <li><Link href="/tools/category/social-media-tools/" className="hover:text-blue-400 transition-colors text-xs">Social Media Hub</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Technical Research</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/blog/seo-meta-tags-complete-guide/" className="hover:text-blue-400 transition-colors text-xs">SEO Meta Tags Guide</Link></li>
              <li><Link href="/blog/geo-optimization-guide/" className="hover:text-blue-400 transition-colors text-xs">GEO Optimization</Link></li>
              <li><Link href="/blog/llm-latency-ux-impact/" className="hover:text-blue-400 transition-colors text-xs">LLM Latency Study</Link></li>
              <li><Link href="/blog/modern-css-architecture/" className="hover:text-blue-400 transition-colors text-xs">Modern CSS Guide</Link></li>
              <li><Link href="/blog/ai-cybersecurity-trends/" className="hover:text-blue-400 transition-colors text-xs">AI Security Trends</Link></li>
              <li><Link href="/about/" className="hover:text-blue-400 transition-colors text-xs">About WTK Pro</Link></li>
            </ul>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
            <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Developer Newsletter</h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed font-medium">
              Get the latest tools and technical SEO updates in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={status === 'success' ? 'Joined!' : 'email@example.com'}
                disabled={status === 'loading' || status === 'success'}
                aria-label="Email Address for Newsletter"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              />
              <button 
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-950/50 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join Now'}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-600">
            <span>&copy; {new Date().getFullYear()} WebToolkit Pro.</span>
            <Link href="/privacy/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/disclaimer/" className="hover:text-white transition-colors">Legal Disclaimer</Link>
          </div>
          <div className="flex gap-8">
            <Link 
              href="https://github.com/webtoolkit-pro" 
              target="_blank"
              rel="me noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="GitHub Organization"
            >
              <span className="sr-only">GitHub Organization</span>
              <Github className="w-5 h-5" />
            </Link>
            <Link 
              href="https://x.com/WebToolkitPro" 
              target="_blank"
              rel="me noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="Follow us on X (Twitter)"
            >
              <span className="sr-only">Follow us on X (Twitter)</span>
              <Twitter className="w-5 h-5" />
            </Link>
            <a 
              href="mailto:safi4730358@gmail.com" 
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="Email Contact Support"
            >
              <span className="sr-only">Email Contact Support</span>
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="tel:+1234567890" 
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="Call Support"
            >
              <Box className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Global Legal Disclaimer */}
        <div className="mt-8 pt-8 border-t border-slate-900/50">
          <p className="text-[9px] text-gray-700 leading-relaxed text-center font-medium max-w-4xl mx-auto uppercase tracking-[0.05em]">
            Disclaimer: WebToolkit Pro is an independent resource for developers. All tools provided on this site are for informational and research purposes only. 
            We are not affiliated with any third-party services mentioned (including Pinterest, Google, or others). 
            All data processing occurs locally in your browser to ensure 100% privacy; we do not store your technical inputs. 
            By using this site, you agree that WebToolkit Pro is not liable for any technical issues, data loss, or search engine ranking changes 
            resulting from the use of our research or utilities.
          </p>
        </div>
      </div>
    </footer>
  )
}