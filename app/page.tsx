import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web Toolkit Pro - 150+ Free Premium Online Developer Tools',
  description: 'Access Web Toolkit Pro: 150+ secure, free client-side developer tools. Fast online utilities for JSON formatting, XML beautification, and technical SEO.',
  keywords: ['wtkpro', 'WebToolkit', 'WebToolkit Pro', 'web toolkit', 'google web toolkit', 'gwt web toolkit', 'web toolkits', 'what is google web toolkit'],
  alternates: {
    canonical: 'https://wtkpro.site/',
  },
}
import { 
  FileJson, Key, FileText, Palette, Hash, Type, Clock, Binary, Shield, Code, 
  Ruler, Shuffle, FileCode, Globe, ArrowRight, Sparkles, Zap, Users, Star, Share2,
  CheckCircle, Server, RefreshCw, Terminal, BookOpen, ExternalLink, MessageSquare
} from 'lucide-react'
import Newsletter from '@/components/sections/Newsletter'
import StatsDashboard from '@/components/sections/StatsDashboard'
import SocialProof from '@/components/sections/SocialProof'
import JsonMiniDemo from '@/components/sections/JsonMiniDemo'
import { getAllPosts } from '@/lib/blog'

const featuredTools = [
  { name: 'JSON Formatter', icon: FileJson, href: '/tools/json-formatter/', color: 'from-blue-500 to-blue-600' },
  { name: 'Password Generator', icon: Key, href: '/tools/password-generator/', color: 'from-indigo-500 to-indigo-600' },
  { name: 'Base64 Encoder', icon: FileText, href: '/tools/base64-encoder/', color: 'from-purple-500 to-purple-600' },
  { name: 'Color Picker', icon: Palette, href: '/tools/color-picker/', color: 'from-pink-500 to-pink-600' },
  { name: 'Hash Generator', icon: Shield, href: '/tools/hash-generator/', color: 'from-slate-500 to-slate-600' },
  { name: 'UUID Generator', icon: Shuffle, href: '/tools/uuid-generator/', color: 'from-lime-600 to-lime-700' },
  { name: 'Word Counter', icon: Hash, href: '/tools/word-counter/', color: 'from-teal-500 to-teal-600' },
  { name: 'Social Preview Tester', icon: Share2, href: '/tools/social-preview-tester/', color: 'from-blue-600 to-blue-800' },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-[var(--space-lg)] lg:py-[var(--space-xl)] transition-colors duration-300">
        {/* Animated background blobs - Refined for brand precision */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-teal-500/10 to-blue-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-elevated border border-border rounded-full px-5 py-2 mb-8 text-xs font-mono text-[#00D4B4] uppercase tracking-widest">
            <Sparkles className="w-4 h-4 shrink-0" />
            Brand Guidelines v1.1 • 150+ Free Developer Tools
          </div>

          <h1 className="text-[var(--font-size-4xl)] font-bold text-foreground mb-6 leading-[1.1] tracking-tighter">
            Build Faster with the Ultimate<br />
            <span className="bg-gradient-to-r from-[#00D4B4] to-[#0094FF] bg-clip-text text-transparent">
              Web Toolkit
            </span>
          </h1>

          <div className="flex items-center justify-center gap-6 mb-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00D4B4]" />
              100% Client-Side
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              Open Source v2.1
            </div>
          </div>

          <p className="text-[var(--font-size-lg)] text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Format JSON. Generate passwords. Encode data. All in your browser.<br />
            Free, private tools for your daily coding tasks. No login required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/tools/"
              className="bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0D1117] font-bold px-10 py-5 rounded-2xl flex items-center justify-center hover:scale-[1.02] transition-all shadow-xl shadow-blue-500/10"
            >
              Explore All Tools <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              href="/blog/"
              className="bg-elevated text-foreground border border-border font-bold px-10 py-5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              Read Our Blog
            </Link>
          </div>

          {/* Product Hunt Badge */}
          <div className="mt-10 flex justify-center">
            <a 
              href="https://www.producthunt.com/products/webtoolkit-pro?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-webtoolkit-pro" 
              target="_blank" 
              rel="noopener noreferrer nofollow"
              className="hover:scale-105 transition-transform duration-300"
            >
              <Image 
                src="/product-hunt-badge.svg" 
                alt="Web Toolkit Pro - 150+ premium developer tools with a perfect 100 speed score | Product Hunt" 
                width={250} 
                height={54} 
                className="dark:brightness-90 dark:contrast-125"
                priority
              />
            </a>
          </div>

          {/* Trust / As Seen On Strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-[#4A6080] font-mono">As seen on</span>
            <a href="https://www.producthunt.com/products/webtoolkit-pro" target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-xl text-[11px] font-bold text-gray-600 dark:text-[#8A9BBE] hover:text-[#DA552F] hover:border-[#DA552F]/30 transition-all shadow-sm">
              <span className="text-[#DA552F]">🚀</span> Product Hunt
            </a>
            <a href="https://huntscreens.com/en/products/webtoolkitpro" target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-xl text-[11px] font-bold text-gray-600 dark:text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/30 transition-all shadow-sm">
              <span>📸</span> HuntScreens
            </a>
            <a href="https://dev.to/abusufyan909" target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-xl text-[11px] font-bold text-gray-600 dark:text-[#8A9BBE] hover:text-[#0094FF] hover:border-[#0094FF]/30 transition-all shadow-sm">
              <Terminal className="w-3.5 h-3.5 text-[#0094FF]" /> DEV Community
            </a>
            <a href="https://coderlegion.com/user/abusuyfan" target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-xl text-[11px] font-bold text-gray-600 dark:text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/30 transition-all shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-[#00D4B4]" /> CoderLegion
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsDashboard />

      {/* Featured Tools */}
      <section className="py-[var(--space-lg)] bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[var(--font-size-3xl)] font-black text-gray-900 dark:text-white mb-4">Popular Tools</h2>
            <p className="text-[var(--font-size-lg)] text-gray-500 dark:text-slate-400 max-w-xl mx-auto">Hand-picked developer essentials used by thousands</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="card-premium p-8 group flex flex-col items-start h-full"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#00D4B4] to-[#0094FF] rounded-[10px] flex items-center justify-center mb-6 shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform duration-300">
                  <tool.icon className="w-7 h-7 text-[#0B1120]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{tool.name}</h3>
                <span className="text-xs font-mono text-[#00D4B4] uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                  Try it free <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/tools/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-lg hover:gap-3 transition-all uppercase tracking-widest text-xs">
              View All 150+ Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* JSON Mini Demo */}
      <JsonMiniDemo />

      {/* Why Choose Us */}
      <section className="py-[var(--space-lg)] bg-gray-50 dark:bg-[#0B1120] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[var(--font-size-3xl)] font-bold text-gray-900 dark:text-white mb-16 tracking-tight">Designed for Professionals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Lightning Fast', desc: 'Tools run in your browser. No server delays. Get instant results.', icon: Zap },
              { title: '100% Private', desc: 'Your data never leaves your device. We process everything locally.', icon: Shield },
              { title: 'Built for Pros', desc: 'Reliable, high-quality tools designed for your daily dev work.', icon: Star },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center group p-8 rounded-[12px] bg-[#0D1526] border border-[#1E2D47] hover:border-[#00D4B4]/30 transition-all">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-[#00D4B4]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                <p className="text-sm text-[#8A9BBE] leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Ecosystem */}
      <section className="py-[var(--space-lg)] bg-gray-50/50 dark:bg-slate-950/50 border-y border-gray-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-[var(--font-size-2xl)] font-black text-gray-900 dark:text-white mb-10 tracking-tight uppercase">Professional Ecosystem</h3>
              <div className="space-y-10">
                {[
                  { title: 'Formatters', desc: 'Beautify JSON and JS with AST-aware precision.' },
                  { title: 'Technical SEO', desc: 'Master sitemaps, robots, and JSON-LD schema.' },
                  { title: 'Cryptography', desc: 'Generate secure hashes and high-entropy passwords.' },
                  { 
                    title: 'Trade & Construction Tools', 
                    desc: 'Accurately estimate board feet, circuit breakers, and contractor units at TradeConvert.pro.',
                    href: 'https://tradeconvert.pro' 
                  }
                ].map((cat) => (
                  <div key={cat.title} className="flex gap-6">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                    <div>
                      {cat.href ? (
                        <a href={cat.href} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 dark:text-blue-400 hover:underline mb-1 text-[var(--font-size-lg)] tracking-tight flex items-center gap-1.5">
                          {cat.title} <Zap className="w-4 h-4 text-[#00D4B4]" />
                        </a>
                      ) : (
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-[var(--font-size-lg)] tracking-tight">{cat.title}</h3>
                      )}
                      <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">{cat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-gray-100 dark:border-slate-800 shadow-2xl">
              <h3 className="text-[var(--font-size-xl)] font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Security & Privacy FAQ</h3>
              <div className="space-y-8 text-left">
                <div>
                  <div className="text-[var(--font-size-base)] font-bold text-blue-600 dark:text-blue-400 mb-2">Are my data inputs safe?</div>
                  <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed font-medium">Yes. All processing happens locally in your browser. We never transmit your strings, passwords, or code snippets to any server.</p>
                </div>
                <div>
                  <div className="text-[var(--font-size-base)] font-bold text-blue-600 dark:text-blue-400 mb-2">Do I need an account?</div>
                  <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed font-medium">Never. WebToolkit Pro is built for speed and anonymity. Use any tool instantly without the friction of a sign-up process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[var(--space-xl)] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-[var(--font-size-3xl)] font-black mb-8 tracking-tight">Ready to Boost Your Workflow?</h2>
          <p className="text-[var(--font-size-lg)] text-blue-50 dark:text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Join thousands of developers who use WebToolkit Pro every day to build better, faster, and more securely.
          </p>
          <Link href="/tools/" className="inline-flex items-center gap-3 bg-white text-blue-700 px-12 py-5 rounded-[2rem] font-black text-xl hover:shadow-2xl hover:shadow-blue-900/40 hover:-translate-y-1 transition-all">
            Get Started Free <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Technical Authority & Deep-Dive Sections */}
      <section className="py-[var(--space-xl)] bg-gray-50/30 dark:bg-slate-900/30 border-t border-gray-100 dark:border-slate-800 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-[var(--font-size-3xl)] font-black text-gray-900 dark:text-white mb-6 tracking-tight uppercase">
              The Global Standard for <span className="text-blue-600 dark:text-blue-400">Web Utilities</span>
            </h2>
            <p className="text-[var(--font-size-base)] text-gray-500 dark:text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
              Our web toolkit isn&apos;t just a collection of tools; it&apos;s an engineering ecosystem designed to handle demanding technical workflows with <span className="text-gray-900 dark:text-white font-bold">high-performance processing</span>. Compared to other web toolkits, it stands out for its privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* JSON Formatter Deep-Dive */}
            <div className="group p-10 bg-white dark:bg-slate-900/50 rounded-[3rem] border border-gray-100 dark:border-slate-800/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-600/20 group-hover:scale-110 transition-transform">
                <FileJson className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Precision JSON <br/>Formatting</h3>
              <div className="space-y-4 text-sm text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                <p>
                  Utilizing high-performance parsing to beautify multi-megabyte payloads without losing structural integrity. 
                </p>
                <div className="h-px bg-gray-100 dark:bg-slate-800 w-12" />
                <p>
                  Compliant with <span className="text-gray-900 dark:text-white">RFC 8259</span> standards with line-by-line syntax highlighting for instant debugging.
                </p>
                <p className="pt-4 text-xs italic opacity-70">
                  Secure, local-only processing ensures API keys and credentials never leave your browser.
                </p>
              </div>
            </div>

            {/* Cryptography Deep-Dive */}
            <div className="group p-10 bg-white dark:bg-slate-900/50 rounded-[3rem] border border-gray-100 dark:border-slate-800/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-14 h-14 bg-emerald-600/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-600/20 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Enterprise-Grade <br/>Security</h3>
              <div className="space-y-4 text-sm text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                <p>
                  Secure generation via the browser&apos;s native <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-widest">Web Crypto API</span> for brute-force resistance.
                </p>
                <div className="h-px bg-gray-100 dark:bg-slate-800 w-12" />
                <p>
                  Instant <span className="text-gray-900 dark:text-white">SHA-256 & MD5</span> hashing offloaded to Client-Side Web Workers to maintain UI responsiveness.
                </p>
                <p className="pt-4 text-xs italic opacity-70">
                  Randomness required for professional server authentication and credential management.
                </p>
              </div>
            </div>

            {/* SEO Deep-Dive */}
            <div className="group p-10 bg-white dark:bg-slate-900/50 rounded-[3rem] border border-gray-100 dark:border-slate-800/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-14 h-14 bg-purple-600/10 rounded-2xl flex items-center justify-center mb-8 border border-purple-600/20 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Technical SEO <br/>Optimization</h3>
              <div className="space-y-4 text-sm text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                <p>
                  Master modern indexing with <span className="text-purple-600 font-bold uppercase text-[10px] tracking-widest">JSON-LD Schema</span> generators built for AI search visibility.
                </p>
                <div className="h-px bg-gray-100 dark:bg-slate-800 w-12" />
                <p>
                  Advanced <span className="text-gray-900 dark:text-white">Robots.txt & Sitemap</span> validation to communicate effectively with the next generation of search bots.
                </p>
                <p className="pt-4 text-xs italic opacity-70">
                  Stay at the forefront of AI-optimized search trends and modern indexing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Excellence Section */}
      <section className="py-[var(--space-xl)] bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                Engineering Excellence
              </div>
              <h3 className="text-[var(--font-size-3xl)] font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                Engineered for the <br/>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Modern Web Ecosystem</span>
              </h3>
              
              <div className="space-y-6 text-[var(--font-size-base)] text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                <p>
                  At WebToolkit Pro, we believe that a professional web toolkit should be <span className="text-gray-900 dark:text-white font-bold">fast, private, and accessible</span>. Our platform is built for maximum security and local-first processing.
                </p>
                <p>
                  From advanced SEO utilities to our secure UUID generators, every tool is optimized for performance, delivering instant execution.
                </p>
                <p>
                  Beyond utilities, we serve as a technical research hub, publishing deep-dive studies into web performance and modern search standards to help you master the future of the web.
                </p>
              </div>

              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-gray-100 dark:border-slate-900">
                <div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">150+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Premium Utilities</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">Instant</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Execution</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Client-Side Only', desc: 'JS Workers processing', icon: Zap, color: 'text-blue-600' },
                { label: 'RFC Compliant', desc: 'Industry standards', icon: CheckCircle, color: 'text-emerald-600' },
                { label: 'No Tracking', desc: 'Zero data retention', icon: Shield, color: 'text-purple-600' },
                { label: 'Cloud Native', desc: 'Edge delivery network', icon: Server, color: 'text-amber-600' },
              ].map((feature) => (
                <div key={feature.label} className="p-8 bg-gray-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all group">
                  <feature.icon className={`w-10 h-10 ${feature.color} mb-6 group-hover:scale-110 transition-transform`} />
                  <div className="font-bold text-gray-900 dark:text-white text-lg mb-2 tracking-tight">{feature.label}</div>
                  <div className="text-[10px] text-gray-400 dark:text-slate-500 font-black uppercase tracking-widest">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Technical Index - Boosting Content-Code Ratio */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-8 tracking-tight uppercase">Master Your Technical Workflow</h3>
              <div className="space-y-6 text-lg text-gray-500 dark:text-slate-400 leading-relaxed">
                <p>
                  A versatile web toolkit is more than just a collection of utilities; it is a comprehensive ecosystem designed to bridge the gap between complex engineering requirements and user-friendly interfaces. Our tools are categorized into specialized hubs to help you find exactly what you need for your daily development tasks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                  <div className="p-6 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-widest text-xs">Data & Formatting</h3>
                    <p className="text-sm">High-performance JSON formatters, SQL beautifiers, and Base64 encoders for clean data handling.</p>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-widest text-xs">SEO & Visibility</h3>
                    <p className="text-sm">Generate metadata, validate sitemaps, and optimize for AI search engines like Perplexity and SGE.</p>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-widest text-xs">Security & Cryptography</h3>
                    <p className="text-sm">Generate secure passwords, RFC-compliant UUIDs, and SHA-256 hashes with zero data retention.</p>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-widest text-xs">Media & Content</h3>
                    <p className="text-sm">Technical utilities for word density counting and real-time social preview testing.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-3xl absolute inset-0 -z-10" />
              <div className="p-12 bg-white dark:bg-slate-900 rounded-[3rem] border border-gray-100 dark:border-slate-800 shadow-2xl">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase">Why Content-Code Ratio Matters?</h3>
                <p className="text-gray-500 dark:text-slate-400 leading-relaxed mb-6">
                  In 2026, search engine algorithms prioritize &quot;Information Gain.&quot; Sites with a healthy balance of technical utility and descriptive content rank higher because they provide both the tool and the context needed to use it effectively.
                </p>
                <ul className="space-y-4">
                  {[
                    'Improved semantic indexing for technical terms',
                    'Higher engagement and lower bounce rates',
                    'Better ranking for long-tail developer queries',
                    'Enhanced authority in the AI search ecosystem'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-blue-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO FAQs */}
      <section className="py-[var(--space-xl)] bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-10 text-center uppercase">Web Toolkit & Development FAQs</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">What is Google Web Toolkit (GWT)?</h3>
              <p className="text-gray-600 dark:text-slate-400">Google Web Toolkit is an open-source development suite that allows engineers to write front-end applications in Java and compile them into optimized JavaScript. WTK Pro is a different modern browser-native platform requiring no compilation.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">How Google Web Toolkit works compared to modern browser utilities?</h3>
              <p className="text-gray-600 dark:text-slate-400">GWT compiles Java source files into highly optimized JavaScript for client-side execution. In contrast, modern suites like WTK Pro run directly in the browser utilizing native browser APIs, offering instant processing with zero compile latency.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">How to add Google Web Toolkit in Eclipse and install the development plugin?</h3>
              <p className="text-gray-600 dark:text-slate-400">To configure Eclipse for GWT, install the plugin via the Eclipse Marketplace, download the GWT SDK, add it to your project build path, and enable compilation. For developers wanting fast tools without IDE configurations, our online suite runs instantly with no setup.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">How to install Google Web Toolkit developer plugin for Chrome?</h3>
              <p className="text-gray-600 dark:text-slate-400">The legacy GWT developer plugin for Chrome is deprecated due to modern browser security standards. Debugging is now handled using standard Chrome DevTools and browser-native developer extensions.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">How to give attribution for Google Web Toolkit?</h3>
              <p className="text-gray-600 dark:text-slate-400">GWT is licensed under the Apache License 2.0. To give proper attribution, include a copy of the Apache 2.0 License in your distribution, keep all copyright and patent notices intact, and provide a clear notice file acknowledging the original GWT codebase.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Can I add react-dom into WT Web Toolkit?</h3>
              <p className="text-gray-600 dark:text-slate-400">No. React-DOM is a rendering library for React components, while WTK Pro is a compiled set of standalone browser utilities. You can use our client-side tools to format or validate outputs and copy them directly into your React applications.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">How to use AJAX toolkit in ASP.NET web application and add reference in web.config?</h3>
              <p className="text-gray-600 dark:text-slate-400">To integrate AjaxControlToolkit, install the package via NuGet and declare the controls in your web.config file inside the system.web section. For rapid client-side debugging, WTK Pro can help format or inspect JSON and Base64 structures exchanged in your AJAX calls.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">How to install Web Experience Toolkit?</h3>
              <p className="text-gray-600 dark:text-slate-400">To deploy Web Experience Toolkit (WET), download the official release assets, extract the pre-built CSS/JS templates, and host them on your web server. Alternatively, WTK Pro provides instant developer utilities directly in your browser with zero installation needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof — Testimonials */}
      <SocialProof />

      {/* Global Authority Network */}
      <section className="py-[var(--space-lg)] bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[var(--font-size-2xl)] font-black text-gray-900 dark:text-white mb-4 tracking-tight uppercase">Global Authority Network</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">Connecting premium engineering with global financial and legal analytics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link 
              href="https://www.severancecalculator.xyz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all group"
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Severance Pay Lab</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 leading-relaxed">Official global calculator for end-of-service and redundancy benefits across 8+ countries.</p>
              <div className="text-amber-500 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                Visit Partner <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link 
              href="https://tradeconvert.pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all group"
            >
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <RefreshCw className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">TradeConvert Pro</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 leading-relaxed">Professional unit conversion tools and technical reference tables for the building trades.</p>
              <div className="text-emerald-500 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                Launch Tool <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link href="/blog/" className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Research Archive</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 leading-relaxed">Deep-dive technical studies on web performance, technical SEO, and AI-driven search trends.</p>
              <div className="text-purple-500 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                Read Studies <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Avatar & identity */}
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-[24px] overflow-hidden border-4 border-white dark:border-[#1E2D47] shadow-2xl shadow-blue-500/10">
                  <Image
                    src="/author-placeholder.png"
                    alt="Abu Sufyan — Lead Architect, WebToolkit Pro"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#00D4B4] to-[#0094FF] rounded-full flex items-center justify-center shadow-lg" title="Verified Builder">
                  <CheckCircle className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <div className="text-xl font-black text-gray-900 dark:text-white">Abu Sufyan</div>
                <div className="text-xs text-[#00D4B4] font-mono font-bold uppercase tracking-widest">Lead Architect · WebToolkit Pro</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'TypeScript', 'Edge Computing', 'Technical SEO', 'Privacy-First'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-[#1E2D47] text-gray-700 dark:text-[#8A9BBE] text-[10px] font-bold font-mono rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/author/" className="inline-flex items-center gap-2 text-[10px] font-bold text-[#00D4B4] uppercase tracking-widest hover:gap-3 transition-all">
                Full Profile <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Story */}
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 bg-teal-50 dark:bg-[#00D4B4]/10 text-teal-700 dark:text-[#00D4B4] text-[10px] font-bold font-mono uppercase tracking-[0.2em] rounded-full border border-teal-200 dark:border-[#00D4B4]/20">
                Why We Built This
              </span>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.15]">
                Tired of Pasting Secrets<br />into Random Cloud Tools?
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-[#8A9BBE] text-base leading-relaxed font-medium">
                <p>
                  Every day, developers paste JWT tokens, API keys, passwords, and sensitive JSON payloads into online tools — tools that run on servers they don&apos;t control.
                </p>
                <p>
                  I built WebToolkit Pro after dealing with this exact problem on enterprise projects. The solution was simple: move all processing into the browser. No server ever sees your data.
                </p>
                <p>
                  150+ tools later — it&apos;s used by developers from startups to enterprises who care about speed, privacy, and doing things right.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/tools/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] font-bold px-6 py-3 rounded-[12px] text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-blue-500/10">
                  Try the Tools <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/about/" className="inline-flex items-center gap-2 bg-white dark:bg-[#0D1526] border border-gray-200 dark:border-[#1E2D47] text-gray-900 dark:text-white font-bold px-6 py-3 rounded-[12px] text-xs uppercase tracking-widest hover:border-[#00D4B4]/50 transition-all">
                  Our Mission
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-24 bg-gray-50/30 dark:bg-slate-900/30 border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Latest Insights</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Technical guides and engineering research papers.</p>
            </div>
            <Link href="/blog/" className="hidden sm:flex items-center gap-2 text-[#00D4B4] font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getAllPosts().slice(0, 3).map((post) => {
              // Dynamically determine related tool
              const getRelatedTool = () => {
                const text = (post.title + ' ' + post.tags.join(' ')).toLowerCase();
                if (text.includes('json')) return { name: 'JSON Formatter', href: '/tools/json-formatter/' };
                if (text.includes('jwt')) return { name: 'JWT Decoder', href: '/tools/jwt-decoder/' };
                if (text.includes('regex')) return { name: 'RegEx Tester', href: '/tools/regex-tester/' };
                if (text.includes('password') || text.includes('security')) return { name: 'Password Generator', href: '/tools/password-generator/' };
                if (text.includes('seo') || text.includes('meta')) return { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/' };
                if (text.includes('xml')) return { name: 'XML Formatter', href: '/tools/xml-formatter/' };
                if (text.includes('base64')) return { name: 'Base64 Encoder', href: '/tools/base64-encoder/' };
                return { name: 'Developer Suite', href: '/tools/' };
              };
              const relatedTool = getRelatedTool();

              return (
                <article key={post.slug} className="bg-white dark:bg-[#0D1526] p-8 rounded-[32px] border border-gray-100 dark:border-[#1E2D47] hover:border-[#00D4B4]/30 transition-all h-full flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D4B4]/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <span className="text-[10px] font-bold px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 rounded-full uppercase tracking-widest">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-[#4A6080] uppercase tracking-widest">
                      {post.readTime}
                    </span>
                  </div>
                  
                  <Link href={`/blog/${post.slug}/`} className="block relative z-10 flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#00D4B4] transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-[#8A9BBE] leading-relaxed mb-8 line-clamp-3">
                      {post.description}
                    </p>
                  </Link>

                  {/* Blog-to-Tool Cross Link */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-100 dark:border-[#1E2D47]/30 relative z-10">
                    <Link href={`/blog/${post.slug}/`} className="text-[10px] font-bold text-gray-900 dark:text-white flex items-center gap-2 uppercase tracking-widest hover:text-[#00D4B4] transition-colors">
                      Read Entry <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link href={relatedTool.href} className="text-[10px] font-bold text-blue-600 dark:text-[#00D4B4] flex items-center gap-2 uppercase tracking-widest hover:underline">
                      <Zap className="w-3 h-3" /> Try {relatedTool.name}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          
          <div className="mt-12 text-center sm:hidden">
            <Link href="/blog/" className="inline-flex items-center gap-2 text-[#00D4B4] font-bold text-xs uppercase tracking-widest">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />

      {/* Topic Hubs */}
      <section className="py-20 bg-gray-50 dark:bg-[#0B1120] border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight uppercase mb-3">
              Explore by Topic
            </h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 font-medium max-w-xl mx-auto">
              Every hub is a curated collection of tools + guides built around a specific developer workflow.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Developer Suite', href: '/tools/hub/developer-tools/', emoji: '⚡', desc: 'Core utilities' },
              { label: 'SEO Performance', href: '/tools/hub/seo-tools/', emoji: '📈', desc: 'Rank higher' },
              { label: 'Edge & Network', href: '/tools/hub/network-performance/', emoji: '🌐', desc: 'Speed tools' },
              { label: 'Security Generators', href: '/tools/hub/generators/', emoji: '🔐', desc: 'Crypto utilities' },
              { label: 'Ad Revenue Calc', href: '/tools/hub/revenue-analytics/', emoji: '💰', desc: 'Monetize smarter' },
              { label: 'Content Optimization', href: '/tools/hub/content-utilities/', emoji: '✍️', desc: 'Write better' },
            ].map((hub) => (
              <a
                key={hub.href}
                href={hub.href}
                className="group flex flex-col items-center text-center p-5 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[18px] hover:border-[#00D4B4]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-2xl mb-3">{hub.emoji}</span>
                <span className="font-bold text-gray-900 dark:text-white text-xs leading-snug group-hover:text-[#00D4B4] transition-colors">{hub.label}</span>
                <span className="text-[10px] text-gray-400 dark:text-[#4A6080] font-mono mt-1">{hub.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}