import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WebToolkit Pro - Premium Developer Tools for Modern Engineering',
  description: 'Access 65+ secure, client-side developer tools. From JSON formatting to SEO optimization, WebToolkit Pro provides high-performance utilities for enterprise workflows.',
  alternates: {
    canonical: 'https://wtkpro.site/',
  },
}
import { 
  FileJson, Key, FileText, Palette, Hash, Type, Clock, Binary, Shield, Code, 
  Ruler, Shuffle, FileCode, Globe, ArrowRight, Sparkles, Zap, Users, Star, Share2,
  CheckCircle, Server
} from 'lucide-react'
import Newsletter from '@/components/sections/Newsletter'
import StatsDashboard from '@/components/sections/StatsDashboard'

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
      <section className="relative overflow-hidden bg-white dark:bg-[#0B1120] py-[var(--space-lg)] lg:py-[var(--space-xl)] transition-colors duration-300">
        {/* Animated background blobs - Refined for brand precision */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-teal-500/10 to-blue-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0D1526] border border-[#1E2D47] rounded-full px-5 py-2 mb-8 text-xs font-mono text-[#00D4B4] uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-4 h-4 shrink-0" />
            Brand Guidelines v1.0 • 65+ Free Developer Tools
          </div>

          <h1 className="text-[var(--font-size-4xl)] font-bold text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700">
            Build Faster with<br />
            <span className="bg-gradient-to-r from-[#00D4B4] to-[#0094FF] bg-clip-text text-transparent">
              WebToolkit Pro
            </span>
          </h1>

          <p className="text-[var(--font-size-lg)] text-gray-600 dark:text-[#8A9BBE] mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Format JSON. Generate passwords. Encode data. All client-side.<br />
            Premium utilities for modern engineering workflows. No login required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link 
              href="/tools/"
              className="bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] font-bold px-10 py-5 rounded-2xl flex items-center justify-center hover:scale-[1.02] transition-all shadow-xl shadow-blue-500/10"
            >
              Explore All Tools <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              href="/blog/"
              className="bg-[#0D1526] text-white border border-[#1E2D47] font-bold px-10 py-5 rounded-2xl hover:bg-[#152035] transition-all"
            >
              Read Our Blog
            </Link>
          </div>

          {/* Product Hunt Badge */}
          <div className="mt-12 flex justify-center animate-in fade-in zoom-in duration-1000 delay-500">
            <a 
              href="https://www.producthunt.com/products/webtoolkit-pro?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-webtoolkit-pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform duration-300"
            >
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1141100&theme=light&t=1778387824061" 
                alt="WebToolkit Pro - 20+ premium developer tools with a perfect 100 speed score | Product Hunt" 
                width="250" 
                height="54" 
                className="dark:brightness-90 dark:contrast-125"
              />
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
                <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                <span className="text-xs font-mono text-[#00D4B4] uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                  Try it free <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/tools/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-lg hover:gap-3 transition-all uppercase tracking-widest text-xs">
              View All 33+ Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-[var(--space-lg)] bg-gray-50 dark:bg-[#0B1120] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[var(--font-size-3xl)] font-bold text-gray-900 dark:text-white mb-16 tracking-tight">Designed for Professionals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Lightning Fast', desc: 'All tools run client-side. Zero server delays. Instant results.', icon: Zap },
              { title: 'Privacy First', desc: 'Your data never leaves your browser. 100% secure processing.', icon: Shield },
              { title: 'Enterprise Quality', desc: 'Expert-grade utilities for professional engineering workflows.', icon: Star },
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
              <h2 className="text-[var(--font-size-2xl)] font-black text-gray-900 dark:text-white mb-10 tracking-tight uppercase">Professional Ecosystem</h2>
              <div className="space-y-10">
                {[
                  { title: 'Formatters', desc: 'Beautify JSON and JS with AST-aware precision.' },
                  { title: 'Technical SEO', desc: 'Master sitemaps, robots, and JSON-LD schema.' },
                  { title: 'Cryptography', desc: 'Generate secure hashes and high-entropy passwords.' }
                ].map((cat) => (
                  <div key={cat.title} className="flex gap-6">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-[var(--font-size-lg)] tracking-tight">{cat.title}</h3>
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
                  <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed font-medium">Yes. All processing happens locally in your browser. We never transmit your sensitive strings, passwords, or code snippets to any server.</p>
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
              WebToolkit Pro isn't just a collection of tools; it's an engineering ecosystem designed to handle the most demanding technical workflows with a <span className="text-gray-900 dark:text-white font-bold">sub-3ms execution standard</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* JSON Formatter Deep-Dive */}
            <div className="group p-10 bg-white dark:bg-slate-900/50 rounded-[3rem] border border-gray-100 dark:border-slate-800/50 backdrop-blur-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-600/20 group-hover:scale-110 transition-transform">
                <FileJson className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Precision JSON <br/>Formatting</h3>
              <div className="space-y-4 text-sm text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                <p>
                  Utilizing a custom-built <span className="text-blue-600 font-bold uppercase text-[10px] tracking-widest">AST Parser</span> to beautify multi-megabyte payloads without losing structural integrity. 
                </p>
                <div className="h-px bg-gray-100 dark:bg-slate-800 w-12" />
                <p>
                  Compliant with <span className="text-gray-900 dark:text-white">RFC 8259</span> standards with line-by-line syntax highlighting for instant debugging.
                </p>
                <p className="pt-4 text-xs italic opacity-70">
                  "Zero-Trust" local memory processing ensuring API keys and credentials never touch our servers.
                </p>
              </div>
            </div>

            {/* Cryptography Deep-Dive */}
            <div className="group p-10 bg-white dark:bg-slate-900/50 rounded-[3rem] border border-gray-100 dark:border-slate-800/50 backdrop-blur-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-14 h-14 bg-emerald-600/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-600/20 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Enterprise-Grade <br/>Security</h3>
              <div className="space-y-4 text-sm text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                <p>
                  High-entropy generation via the browser's native <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-widest">Web Crypto API</span> for brute-force resistance.
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
            <div className="group p-10 bg-white dark:bg-slate-900/50 rounded-[3rem] border border-gray-100 dark:border-slate-800/50 backdrop-blur-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-14 h-14 bg-purple-600/10 rounded-2xl flex items-center justify-center mb-8 border border-purple-600/20 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Technical SEO <br/>Optimization</h3>
              <div className="space-y-4 text-sm text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                <p>
                  Master modern indexing with <span className="text-purple-600 font-bold uppercase text-[10px] tracking-widest">JSON-LD Schema</span> generators built for SGE and LLM discovery.
                </p>
                <div className="h-px bg-gray-100 dark:bg-slate-800 w-12" />
                <p>
                  Advanced <span className="text-gray-900 dark:text-white">Robots.txt & Sitemap</span> validation to communicate effectively with the next generation of search bots.
                </p>
                <p className="pt-4 text-xs italic opacity-70">
                  Stay at the forefront of the "Agentic Web" and AI-driven search trends.
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
              <h2 className="text-[var(--font-size-3xl)] font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                Engineered for the <br/>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Modern Web Ecosystem</span>
              </h2>
              
              <div className="space-y-6 text-[var(--font-size-base)] text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                <p>
                  At WebToolkit Pro, we believe that professional developer tools should be <span className="text-gray-900 dark:text-white font-bold">fast, private, and accessible</span>. Our platform is built on a "Zero-Knowledge" architecture, ensuring 100% compliance with GDPR, HIPAA, and SOC2.
                </p>
                <p>
                  From the advanced Pinterest Board Downloader to our cryptographically secure UUID generators, every tool is optimized for the <span className="text-blue-600 dark:text-blue-400 underline decoration-2 underline-offset-4">V8 engine</span>, delivering sub-1ms execution times without any layout shifts.
                </p>
                <p>
                  Beyond utilities, we serve as a technical research hub, publishing deep-dive studies into the <span className="text-gray-900 dark:text-white font-bold">"Agentic Web"</span> and 3ms TTFB standards to help you master the future of search.
                </p>
              </div>

              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-gray-100 dark:border-slate-900">
                <div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">65+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Premium Utilities</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">1ms</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Execution Speed</div>
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
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8 tracking-tight uppercase">Master Your Technical Workflow</h2>
              <div className="space-y-6 text-lg text-gray-500 dark:text-slate-400 leading-relaxed">
                <p>
                  WebToolkit Pro is more than just a collection of utilities; it is a comprehensive ecosystem designed to bridge the gap between complex engineering requirements and user-friendly interfaces. Our tools are categorized into specialized hubs to help you find exactly what you need for your daily development tasks.
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
                    <p className="text-sm">Download Pinterest boards, count word density, and test social previews in real-time.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-3xl absolute inset-0 -z-10" />
              <div className="p-12 bg-white dark:bg-slate-900 rounded-[3rem] border border-gray-100 dark:border-slate-800 shadow-2xl">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase">Why Content-Code Ratio Matters?</h3>
                <p className="text-gray-500 dark:text-slate-400 leading-relaxed mb-6">
                  In 2026, search engine algorithms prioritize "Information Gain." Sites with a healthy balance of technical utility and descriptive content rank higher because they provide both the tool and the context needed to use it effectively.
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

      {/* Global Authority Network */}
      <section className="py-[var(--space-lg)] bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[var(--font-size-2xl)] font-black text-gray-900 dark:text-white mb-4 tracking-tight uppercase">Global Authority Network</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">Connecting premium engineering with global financial and legal analytics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="https://www.severancecalculator.xyz/" target="_blank" className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Severance Pay Lab</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 leading-relaxed">Official global calculator for end-of-service and redundancy benefits across 40+ countries.</p>
              <div className="text-amber-500 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                Visit Partner <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link href="https://wtkpro-hub.vercel.app/" target="_blank" className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Satellite Hub Index</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 leading-relaxed">High-performance technical index bridging the gap between raw code and engineering excellence.</p>
              <div className="text-blue-500 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                Launch Hub <ArrowRight className="w-4 h-4" />
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

      <Newsletter />
    </>
  )
}