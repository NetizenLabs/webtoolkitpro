import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WebToolkit Pro | 65+ Premium Developer Tools & Expert Guides',
  description: 'WebToolkit Pro offers 65+ free premium developer tools and expert guides. Secure, fast, and optimized for enterprise engineering. Format JSON, generate passwords, and master SEO.',
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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 py-[var(--space-lg)] lg:py-[var(--space-xl)]">
        {/* Animated background blobs - Hidden on mobile for performance */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none hidden sm:block">
          <div className="hero-blob absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-overlay opacity-20 dark:opacity-10 animate-[float_8s_ease-in-out_infinite]" />
          <div className="hero-blob absolute top-40 right-10 w-64 h-64 md:w-96 md:h-96 bg-purple-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-overlay opacity-20 dark:opacity-10 animate-[float_10s_ease-in-out_infinite_reverse]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-blue-100 dark:border-slate-800 rounded-full px-5 py-2 mb-8 text-[var(--font-size-base)] font-medium text-blue-700 dark:text-blue-400 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-4 h-4 shrink-0" />
            33+ Free Developer Tools — No Login Required
          </div>

          <h1 className="text-[var(--font-size-4xl)] font-black text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            Build Faster with<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              WebToolkit Pro
            </span>
          </h1>

          <p className="text-[var(--font-size-lg)] text-gray-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Premium online tools for web professionals. 
            Format JSON, generate passwords, encode data, and master SEO — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link 
              href="/tools/"
              className="btn-primary px-10 py-5 text-lg"
            >
              Explore All Tools <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
            <Link 
              href="/blog/"
              className="btn px-10 py-5 text-lg bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-800 hover:shadow-lg transition-all"
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
                className="card-premium p-8 group flex flex-col items-start"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">{tool.name}</h3>
                <span className="text-sm text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                  Try it free <ArrowRight className="w-4 h-4" />
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
      <section className="py-[var(--space-lg)] bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[var(--font-size-3xl)] font-black text-gray-900 dark:text-white mb-16">Designed for Professionals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Lightning Fast', desc: 'All tools run client-side. Zero server delays. Instant results.', emoji: '⚡' },
              { title: 'Privacy First', desc: 'Your data never leaves your browser. 100% secure processing.', emoji: '🔒' },
              { title: 'Enterprise Quality', desc: 'Expert-grade utilities for professional engineering workflows.', emoji: '💎' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center group p-8 rounded-[2rem] hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{item.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
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

      {/* Global Resource Hub - Massive Content Boost for SEO */}
      <section className="py-[var(--space-lg)] bg-gray-50/30 dark:bg-slate-900/30 border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[var(--font-size-2xl)] font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">The Global Standard for Web Utilities</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
              WebToolkit Pro isn't just a collection of tools; it's an engineering ecosystem designed to handle the most demanding technical workflows. Every utility on our platform undergoes rigorous performance testing to ensure it meets the sub-3ms execution standard expected by modern software engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm font-medium text-gray-500 dark:text-slate-400 leading-relaxed">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Precision JSON Formatting & Validation</h3>
              <p className="mb-4">
                Our JSON Formatter uses a custom-built AST (Abstract Syntax Tree) parser to ensure that even the most complex, multi-megabyte payloads are beautified without losing structural integrity. We support various indentation styles and provide real-time validation against RFC 8259 standards. For developers working with large datasets, our validator highlights syntax errors with line-by-line precision, saving hours of manual debugging.
              </p>
              <p>
                Unlike other online formatters, WebToolkit Pro processes all JSON data entirely within your browser's local memory. This means your sensitive API keys, database credentials, and proprietary configurations never touch our servers, providing a "Zero-Trust" environment that is compliant with enterprise security audits.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Cryptographically Secure Password Generation</h3>
              <p className="mb-4">
                Security is at the heart of everything we build. Our Password Generator utilizes the browser's native Crypto API to produce high-entropy strings that are resistant to brute-force attacks. Whether you need a simple 12-character alphanumeric password or a complex 64-character hex key for server authentication, our generator provides the randomness required for professional-grade security.
              </p>
              <p>
                We also offer advanced hashing utilities, including MD5, SHA-1, and SHA-256, allowing you to verify file integrity and generate checksums instantly. By offloading these computations to client-side Web Workers, we ensure that your browser remains responsive even when processing large binary blobs or performing iterative hashing.
              </p>
            </div>
            <div className="md:col-span-2 mt-8 text-center border-t border-gray-100 dark:border-slate-800 pt-12">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Technical SEO & Content Optimization</h3>
              <p className="max-w-3xl mx-auto">
                In the era of AI-driven search engines, technical SEO has become more complex than ever. WebToolkit Pro provides the utilities necessary to master modern indexing requirements. Our Sitemap Validator and Robots.txt Generator help you communicate effectively with Googlebot and Bingbot, while our JSON-LD Schema generators ensure your content is structured for rich results and LLM discovery. We stay at the forefront of the "Agentic Web," providing the tools you need to optimize for the future of search.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Excellence - SEO Content Boost */}
      <section className="py-[var(--space-lg)] bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-[var(--font-size-2xl)] font-black text-gray-900 dark:text-white mb-8 tracking-tight uppercase">
                Engineered for the Modern Web
              </h2>
              <div className="prose dark:prose-invert max-w-none text-gray-500 dark:text-slate-400 space-y-6 text-sm font-medium leading-relaxed">
                <p>
                  At WebToolkit Pro, we believe that professional developer tools should be fast, private, and accessible. Our platform is built on a "Zero-Knowledge" architecture, meaning every byte of data you process—whether it's a sensitive JSON payload, a high-entropy password, or a complex CSS configuration—is handled entirely within your browser's memory. No data is ever transmitted to a server, ensuring 100% privacy and compliance with global security standards like GDPR, HIPAA, and SOC2.
                </p>
                <p>
                  Our suite of 65+ premium utilities is designed to bridge the gap between simple browser extensions and complex enterprise software. From the advanced Pinterest Board Downloader to our cryptographically secure UUID generators, every tool is optimized for the V8 engine, delivering sub-1ms execution times. We prioritize Core Web Vitals (LCP, CLS, and INP) to ensure that your workflow remains uninterrupted by slow load times or layout shifts.
                </p>
                <p>
                  Beyond simple utilities, WebToolkit Pro serves as a comprehensive technical research hub. Our engineering team regularly publishes deep-dive studies into the "Agentic Web," 3ms TTFB standards, and the evolution of JSON-LD schema for AI-driven search engines like SGE and Perplexity. We don't just provide the tools; we provide the knowledge necessary to master the modern web ecosystem and build resilient, high-performance applications.
                </p>
                <p>
                  Our commitment to engineering excellence extends to our infrastructure. By utilizing an edge-first delivery strategy, we ensure that WebToolkit Pro is accessible from anywhere in the world with minimal latency. We utilize modern browser APIs like Web Workers and SharedArrayBuffer to offload heavy computations, keeping the UI responsive even during complex data transformations. This professional-grade approach makes us the preferred choice for senior engineers and security researchers.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              {[
                { label: 'Client-Side Only', desc: 'JS Workers processing', icon: Zap },
                { label: 'RFC Compliant', desc: 'Industry standards', icon: CheckCircle },
                { label: 'No Tracking', desc: 'Zero data retention', icon: Shield },
                { label: 'Cloud Native', desc: 'Edge delivery network', icon: Server },
              ].map((feature) => (
                <div key={feature.label} className="p-6 bg-gray-50 dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all group">
                  <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-gray-900 dark:text-white text-sm mb-1">{feature.label}</div>
                  <div className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-widest">{feature.desc}</div>
                </div>
              ))}
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