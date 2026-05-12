'use client'

import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Mail } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-[#8A9BBE] pt-20 pb-8 border-t border-[#1E2D47]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 outline-none focus-visible:ring-2 focus-visible:ring-[#00D4B4] rounded-lg">
              <Logo light />
            </Link>
            <p className="text-[11px] leading-relaxed font-medium mb-6 text-[#4A6080]">
              The global standard for secure, client-side developer utilities. 
              Built for sub-3ms performance and zero-knowledge privacy. 
              WebToolkit Pro empowers engineers with enterprise-grade tools 
              that never transmit sensitive data.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-[9px] font-mono border-b border-[#1E2D47] pb-2">Core Utilities</h3>
            <ul className="space-y-2 text-[11px] font-medium">
              <li><Link href="/tools/json-formatter/" className="hover:text-[#00D4B4] transition-colors">JSON Formatter & Validator</Link></li>
              <li><Link href="/tools/js-minifier/" className="hover:text-[#00D4B4] transition-colors">JS Code Minifier</Link></li>
              <li><Link href="/tools/regex-tester/" className="hover:text-[#00D4B4] transition-colors">RegEx Tester & AI Explainer</Link></li>
              <li><Link href="/tools/password-generator/" className="hover:text-[#00D4B4] transition-colors">Secure Password Generator</Link></li>
              <li><Link href="/tools/jwt-decoder/" className="hover:text-[#00D4B4] transition-colors">Offline JWT Decoder</Link></li>
              <li><Link href="/tools/hash-generator/" className="hover:text-[#00D4B4] transition-colors">Secure Hash Generator</Link></li>
              <li><Link href="/tools/base64-encoder/" className="hover:text-[#00D4B4] transition-colors">Base64 Encoder/Decoder</Link></li>
              <li><Link href="/tools/uuid-v7-generator/" className="hover:text-[#00D4B4] transition-colors">UUID v7 Generator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-[9px] font-mono border-b border-[#1E2D47] pb-2">SEO & Technical</h3>
            <ul className="space-y-2 text-[11px] font-medium">
              <li><Link href="/tools/meta-tag-generator/" className="hover:text-[#00D4B4] transition-colors">Meta Tag Generator</Link></li>
              <li><Link href="/tools/schema-generator/" className="hover:text-[#00D4B4] transition-colors">JSON-LD Schema Tool</Link></li>
              <li><Link href="/tools/robots-generator/" className="hover:text-[#00D4B4] transition-colors">Robots.txt Generator</Link></li>
              <li><Link href="/tools/sitemap-validator/" className="hover:text-[#00D4B4] transition-colors">XML Sitemap Validator</Link></li>
              <li><Link href="/tools/redirect-checker/" className="hover:text-[#00D4B4] transition-colors">HTTP Redirect Checker</Link></li>
              <li><Link href="/tools/what-is-my-ip/" className="hover:text-[#00D4B4] transition-colors">IP Address & Geo Lookup</Link></li>
              <li><Link href="/blog/seo-meta-tags-complete-guide/" className="hover:text-[#00D4B4] transition-colors">Meta Tags Masterclass</Link></li>
              <li><Link href="/blog/ai-seo-optimization-2026/" className="hover:text-[#00D4B4] transition-colors">AI Optimization (AIO)</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-[9px] font-mono border-b border-[#1E2D47] pb-2">Ecosystem</h3>
            <ul className="space-y-2 text-[11px] font-medium">
              <li><a href="https://tradeconvert.pro" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D4B4] transition-colors">TradeConvert.pro</a></li>
              <li><a href="https://devhubindex.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D4B4] transition-colors">DEVHUB INDEX</a></li>
              <li><a href="https://www.severancecalculator.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D4B4] transition-colors">Severance Calculator</a></li>
              <li><a href="https://abusufyan.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D4B4] transition-colors">Abu Sufyan Portfolio</a></li>
              <li><Link href="/author/" className="hover:text-[#00D4B4] transition-colors">Engineering Leadership</Link></li>
              <li><Link href="/about/" className="hover:text-[#00D4B4] transition-colors">Our Philosophy</Link></li>
              <li><Link href="/submit-tool/" className="hover:text-[#00D4B4] transition-colors">Partner Program</Link></li>
              <li><Link href="/contact/" className="hover:text-[#00D4B4] transition-colors">Direct Support</Link></li>
              <li><Link href="/brand/" className="hover:text-[#00D4B4] transition-colors">Brand Assets</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#1E2D47]/50 gap-6">
          <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-[0.2em] font-mono">
            <Link href="/privacy/" className="hover:text-[#00D4B4] transition-colors">Privacy</Link>
            <Link href="/terms/" className="hover:text-[#00D4B4] transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-[#00D4B4] transition-colors">XML Sitemap</Link>
            <Link href="/feed.xml" className="hover:text-[#00D4B4] transition-colors">RSS Feed</Link>
            <span className="text-[#4A6080]">v1.0.8</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/WebToolkit-Pro" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#0D1526] border border-[#1E2D47] rounded-[10px] text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all">
              <Github className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a href="https://twitter.com/WebToolKitPro" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#0D1526] border border-[#1E2D47] rounded-[10px] text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all">
              <Twitter className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a href="mailto:safi4730358@gmail.com" className="p-2.5 bg-[#0D1526] border border-[#1E2D47] rounded-[10px] text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all">
              <Mail className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>

          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8A9BBE]">
            © {new Date().getFullYear()} WebToolkit Pro • Premium <Link href="/" className="text-white hover:text-[#00D4B4] transition-colors">Web Toolkit Online</Link> • Built by <Link href="/author/" className="text-white hover:text-[#00D4B4] transition-colors">Abu Sufyan</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}