'use client'

import React from 'react'
import Link from '@/components/ui/NativeLink';
import { Github, Twitter, Mail, Terminal, Rocket } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-white/20 dark:bg-[#0D1117]/20 backdrop-blur-2xl text-muted-foreground pt-20 pb-8 border-t border-white/20 dark:border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="WebToolkit Pro Home" className="flex items-center gap-2 mb-6 outline-none focus-visible:ring-2 focus-visible:ring-[#00D4B4] rounded-lg">
              <Logo light />
            </Link>
            <p className="text-[11px] leading-relaxed font-medium mb-6 text-muted-foreground/80">
              The global standard for secure, client-side developer utilities.
              Built for high-speed performance and privacy-first design.
              WebToolkit Pro empowers engineers with enterprise-grade tools
              that never transmit sensitive data.
            </p>
            <div className="mb-6">
              <a href="https://huntscreens.com/en/products/webtoolkitpro" target="_blank" rel="noopener noreferrer" title="Featured on HuntScreens" aria-label="Featured on HuntScreens" className="inline-block hover:scale-[1.02] active:scale-98 transition-all">
                <svg width="240" height="60" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-[0_4px_12px_rgba(0,212,180,0.08)]">
                  <rect width="238" height="58" x="1" y="1" rx="10" fill="#0F172A" stroke="url(#badge-border-gradient)" strokeWidth="1.5"/>
                  <rect width="236" height="56" x="2" y="2" rx="9" fill="url(#badge-bg-gradient)"/>
                  
                  {/* Glowing dynamic background node */}
                  <circle cx="36" cy="30" r="16" fill="#00D4B4" fillOpacity="0.06" filter="blur(4px)"/>
                  
                  {/* Custom HuntScreens Isometric Icon */}
                  <g transform="translate(24, 18)">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#00D4B4" fillOpacity="0.8"/>
                    <path d="M2 17L12 22L22 17" stroke="#0094FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="#00D4B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  
                  {/* Badge Typography */}
                  <text x="64" y="25" fill="#8A9BBE" fontFamily="monospace" fontSize="9" fontWeight="bold" letterSpacing="0.15em">FEATURED ON</text>
                  <text x="64" y="42" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.02em">HuntScreens</text>
                  
                  {/* Right chevron indicator */}
                  <path d="M214 26L218 30L214 34" stroke="#00D4B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="badge-bg-gradient" x1="0" y1="0" x2="240" y2="60" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0B0F19"/>
                      <stop offset="0.5" stopColor="#111827"/>
                      <stop offset="1" stopColor="#0F172A"/>
                    </linearGradient>
                    <linearGradient id="badge-border-gradient" x1="0" y1="0" x2="240" y2="60" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00D4B4" stopOpacity="0.4"/>
                      <stop offset="0.5" stopColor="#0094FF" stopOpacity="0.1"/>
                      <stop offset="1" stopColor="#312E81" stopOpacity="0.4"/>
                    </linearGradient>
                  </defs>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-bold mb-6 uppercase tracking-widest text-[9px] font-mono border-b border-border pb-2">Core Utilities</h3>
            <ul className="space-y-2 text-[11px] font-medium">
              <li><Link href="/tools/json-formatter/" className="hover:text-[#00D4B4] transition-colors">JSON Formatter & Validator</Link></li>
              <li><Link href="/tools/js-minifier/" className="hover:text-[#00D4B4] transition-colors">JS Code Minifier</Link></li>
              <li><Link href="/tools/regex-tester/" className="hover:text-[#00D4B4] transition-colors">RegEx Tester & AI Explainer</Link></li>
              <li><Link href="/tools/password-generator/" className="hover:text-[#00D4B4] transition-colors">Secure Password Generator</Link></li>
              <li><Link href="/tools/jwt-decoder/" className="hover:text-[#00D4B4] transition-colors">Offline JWT Decoder</Link></li>
              <li><Link href="/tools/hash-generator/" className="hover:text-[#00D4B4] transition-colors">Secure Hash Generator</Link></li>
              <li><Link href="/tools/base64-encoder/" className="hover:text-[#00D4B4] transition-colors">Base64 Encoder/Decoder</Link></li>
              <li><Link href="/tools/bulk-uuid-v4-v7-generator/" className="hover:text-[#00D4B4] transition-colors">Bulk UUID Generator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-bold mb-6 uppercase tracking-widest text-[9px] font-mono border-b border-border pb-2">SEO & Technical</h3>
            <ul className="space-y-2 text-[11px] font-medium">
              <li><Link href="/tools/meta-tag-generator/" className="hover:text-[#00D4B4] transition-colors">Meta Tag Generator</Link></li>
              <li><Link href="/tools/schema-generator/" className="hover:text-[#00D4B4] transition-colors">JSON-LD Schema Tool</Link></li>
              <li><Link href="/tools/robots-generator/" className="hover:text-[#00D4B4] transition-colors">Robots.txt Generator</Link></li>
              <li><Link href="/tools/sitemap-validator/" className="hover:text-[#00D4B4] transition-colors">XML Sitemap Validator</Link></li>
              <li><Link href="/tools/redirect-checker/" className="hover:text-[#00D4B4] transition-colors">HTTP Redirect Checker</Link></li>
              <li><Link href="/tools/what-is-my-ip/" className="hover:text-[#00D4B4] transition-colors">IP Address & Geo Lookup</Link></li>
              <li><Link href="/ai-visibility/" className="hover:text-[#00D4B4] transition-colors font-bold text-[#00D4B4]">AI Visibility Report</Link></li>
              <li><Link href="/blog/seo-meta-tags-complete-guide/" className="hover:text-[#00D4B4] transition-colors">Meta Tags Masterclass</Link></li>
              <li><Link href="/blog/ai-seo-optimization-2026/" className="hover:text-[#00D4B4] transition-colors">AI Optimization (AIO)</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-bold mb-6 uppercase tracking-widest text-[9px] font-mono border-b border-border pb-2">Ecosystem</h3>
            <ul className="space-y-2 text-[11px] font-medium">
              <li><a href="https://tradeconvert.pro" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D4B4] transition-colors">TradeConvert</a></li>
              <li><a href="https://devhubindex.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D4B4] transition-colors">DEVHUB INDEX</a></li>
              <li><a href="https://www.severancecalculator.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D4B4] transition-colors">Severance Calculator</a></li>
              <li><a href="https://abusufyan.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D4B4] transition-colors">Abu Sufyan Portfolio</a></li>
              <li><a href="/author/" className="hover:text-[#00D4B4] transition-colors">Engineering Leadership</a></li>
              <li><a href="/about/" className="hover:text-[#00D4B4] transition-colors">Our Philosophy</a></li>
              <li><a href="/submit-tool/" className="hover:text-[#00D4B4] transition-colors">Partner Program</a></li>
              <li><a href="/contact/" className="hover:text-[#00D4B4] transition-colors">Direct Support</a></li>
              <li><a href="/brand/" className="hover:text-[#00D4B4] transition-colors">Brand Assets</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-bold mb-6 uppercase tracking-widest text-[9px] font-mono border-b border-border pb-2">Topical Hubs</h3>
            <ul className="space-y-2 text-[11px] font-medium">
              <li><a href="/tools/hub/developer-tools/" className="hover:text-[#00D4B4] transition-colors">Developer Suite</a></li>
              <li><a href="/tools/hub/seo-tools/" className="hover:text-[#00D4B4] transition-colors">SEO Performance</a></li>
              <li><a href="/tools/hub/network-performance/" className="hover:text-[#00D4B4] transition-colors">Edge & Network</a></li>
              <li><a href="/tools/hub/generators/" className="hover:text-[#00D4B4] transition-colors">Security Generators</a></li>
              <li><a href="/tools/hub/revenue-analytics/" className="hover:text-[#00D4B4] transition-colors">Ad Revenue Calc</a></li>
              <li><a href="/tools/hub/content-utilities/" className="hover:text-[#00D4B4] transition-colors">Content Optimization</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border gap-6">
          <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-[0.2em] font-mono">
            <a href="/privacy/" className="hover:text-[#00D4B4] transition-colors">Privacy</a>
            <a href="/terms/" className="hover:text-[#00D4B4] transition-colors">Terms</a>
            <a href="/disclaimer/" className="hover:text-[#00D4B4] transition-colors">Disclaimer</a>
            <a href="/sitemap.xml" className="hover:text-[#00D4B4] transition-colors">XML Sitemap</a>
            <a href="/feed.xml" className="hover:text-[#00D4B4] transition-colors">RSS Feed</a>
            <span className="text-muted-foreground/50">v1.0.8</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/WebToolkit-Pro" target="_blank" rel="noopener noreferrer nofollow" aria-label="GitHub Repository" className="p-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-[10px] text-muted-foreground hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all">
              <Github className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a href="https://twitter.com/WebToolKitPro" target="_blank" rel="noopener noreferrer nofollow" aria-label="Twitter Profile" className="p-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-[10px] text-muted-foreground hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all">
              <Twitter className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a href="https://dev.to/webtoolkitpro" target="_blank" rel="noopener noreferrer nofollow" className="p-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-[10px] text-muted-foreground hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all" title="Follow on Dev.to" aria-label="Dev.to Blog">
              <Terminal className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a href="https://www.producthunt.com/posts/webtoolkit-pro" target="_blank" rel="noopener noreferrer nofollow" className="p-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-[10px] text-muted-foreground hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all" title="Find us on Product Hunt" aria-label="Product Hunt Page">
              <Rocket className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a href="mailto:hello@wtkpro.site" aria-label="Email Support" className="p-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-[10px] text-muted-foreground hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all">
              <Mail className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>

          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} WebToolkit Pro • Premium <a href="/" className="text-foreground hover:text-[#00D4B4] transition-colors">Web Toolkit Online</a> • Built by <a href="/author/" className="text-foreground hover:text-[#00D4B4] transition-colors">Abu Sufyan</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
