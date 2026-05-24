import React, { Suspense } from 'react'
import Link from '@/components/ui/NativeLink';
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import { getTools } from '@/lib/tools'
import ToolSearch from '@/components/tools/ToolSearch'
import PersonalizationDashboard from '@/components/tools/PersonalizationDashboard'
import { CATEGORY_MAP, CATEGORY_PILLARS } from '@/lib/categories'

export const metadata: Metadata = {
  title: '150+ Free Privacy-First Developer Tools | WebToolkit Pro',
  description: 'Access Web Toolkit Pro: 150+ secure, free client-side developer tools. Fast online utilities for JSON formatting, XML beautification, and technical SEO.',
  keywords: ['wtkpro', 'WebToolkit', 'WebToolkit Pro', 'web toolkit', 'web toolkits', 'developer tools', 'json formatter', 'client-side tools'],
  alternates: {
    canonical: 'https://wtkpro.site/',
  },
  other: {
    'article:published_time': '2025-01-01T00:00:00Z',
    'article:modified_time': new Date().toISOString(),
    'article:author': 'Abu Sufyan',
    'author': 'Abu Sufyan',
  }
}



import { 
  FileJson, Key, FileText, Palette, Hash, Type, Clock, Binary, Shield, Code, 
  Ruler, Shuffle, FileCode, Globe, ArrowRight, Sparkles, Zap, Users, Star, Share2,
  CheckCircle, Server, RefreshCw, Terminal, BookOpen, ExternalLink, MessageSquare, LayoutGrid
} from 'lucide-react'
import { getAllPosts } from '@/lib/blog'

const Newsletter = dynamic(() => import('@/components/sections/Newsletter'), { ssr: false })
const StatsDashboard = dynamic(() => import('@/components/sections/StatsDashboard'), { ssr: false })
const SocialProof = dynamic(() => import('@/components/sections/SocialProof'), { ssr: false })

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
  const tools = getTools()
  const searchTools = tools.map(t => ({
    name: t.name,
    slug: t.slug,
    category: t.category,
    icon: t.icon,
    description: t.content?.description
  }))

  const getIconForCategory = (slug: string) => {
    const map: Record<string, any> = {
      'developer-tools': Terminal,
      'seo-tools': Globe,
      'design-tools': Palette,
      'generators': Key,
      'network-performance': Zap,
      'content-utilities': FileText,
      'revenue-analytics': Star
    }
    return map[slug] || LayoutGrid
  }

  return (
    <>
      {/* Directory Hero */}
      <section className="relative bg-transparent py-16 lg:py-24 transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] max-w-full h-[400px] bg-gradient-to-b from-teal-500/10 to-blue-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-elevated border border-border rounded-full px-5 py-2 mb-8 text-sm font-mono text-[#00D4B4] uppercase tracking-widest">
            <Shield className="w-4 h-4 shrink-0" />
            Zero-Server Security Model
          </div>

          <h1 className="text-[var(--font-size-4xl)] font-bold text-foreground mb-6 leading-[1.1] tracking-tighter">
            100% Private, Client-Side<br />
            <span className="bg-gradient-to-r from-[#00D4B4] to-[#0094FF] bg-clip-text text-transparent">
              Developer Tools.
            </span>
          </h1>

          <p className="text-[var(--font-size-lg)] text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Secure, instant-execution utilities that never send your data to a server. No tracking, no sign-ups, just pure performance.
          </p>

          <div className="mb-12">
            <ToolSearch tools={searchTools} />
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00D4B4]" />
              100% Private
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              Client-Side
            </div>
          </div>
        </div>
      </section>

      <PersonalizationDashboard allTools={searchTools} />

      {/* Responsive Category Grid */}
      <section className="py-12 bg-transparent border-y border-gray-100/50 dark:border-slate-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.keys(CATEGORY_MAP).map((slug) => {
              const Icon = getIconForCategory(slug)
              const data = CATEGORY_PILLARS[slug]
              const title = CATEGORY_MAP[slug]
              
              return (
                <Link
                  key={slug}
                  href={`/tools/hub/${slug}/`}
                  className="bg-white/70 dark:bg-[#0D1526]/70 backdrop-blur-xl border border-white/40 dark:border-[#1E2D47]/50 hover:border-[#00D4B4]/50 rounded-[16px] p-6 group transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="w-12 h-12 bg-blue-50 dark:bg-[#1E2D47] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#00D4B4]/10 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-[#8A9BBE] group-hover:text-[#00D4B4] transition-colors" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
                  <p className="text-sm text-gray-500 dark:text-[#5B719E] line-clamp-2 flex-grow">
                    {data?.description || `Explore our collection of ${title.toLowerCase()}.`}
                  </p>
                  <div className="mt-4 text-[#00D4B4] font-bold text-sm uppercase tracking-widest flex items-center gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-[var(--space-lg)] bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[var(--font-size-3xl)] font-black text-gray-900 dark:text-white mb-4">Popular Utilities</h2>
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
                <span className="text-sm font-mono text-[#00D4B4] uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                  Try it free <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/tools/" prefetch={false} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-lg hover:gap-3 transition-all uppercase tracking-widest text-sm">
              View All 150+ Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <StatsDashboard />
      <SocialProof />

      {/* Semantic SEO Text moved to bottom */}
      <section className="py-[var(--space-xl)] bg-transparent border-t border-gray-100/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-black uppercase tracking-[0.2em] rounded-full">
                Engineering Excellence
              </div>
              <h2 className="text-[var(--font-size-3xl)] font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                Engineered for the <br/>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Modern Web Ecosystem</span>
              </h2>
              
              <div className="space-y-6 text-[var(--font-size-base)] text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                <p>
                  At WebToolkit Pro, we believe that a professional web toolkit should be <span className="text-gray-900 dark:text-white font-bold">fast, private, and accessible</span>. Our platform is built specifically for modern software engineers who demand maximum security and local-first processing. 
                </p>
                <p>
                  Unlike legacy toolkits that send your sensitive data to remote servers for processing, WebToolkit Pro leverages WebAssembly, Web Workers, and modern browser APIs to execute everything directly on your local machine. This guarantees zero latency and ensures that your API keys, JSON payloads, and source code are never compromised.
                </p>
                <p>
                  From advanced technical SEO utilities that help you dominate search rankings, to secure UUID generators and cryptographic hashing tools, every single utility in our directory is optimized for high-performance and strict RFC compliance. We have engineered these tools to handle massive payloads—whether you are formatting a 50MB JSON file or transcoding thousands of Base64 images.
                </p>
                <p>
                  Beyond utilities, we serve as a dedicated technical research hub. We regularly publish deep-dive case studies into enterprise web performance, Core Web Vitals optimization, and modern generative search standards. Our mission is to provide you with both the tools to build the future of the web, and the knowledge required to master it.
                </p>
              </div>

              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-gray-100 dark:border-slate-900">
                <div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">150+</div>
                  <div className="text-sm uppercase tracking-widest text-gray-400 font-bold">Premium Utilities</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">Instant</div>
                  <div className="text-sm uppercase tracking-widest text-gray-400 font-bold">Execution</div>
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
                <div key={feature.label} className="p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[2.5rem] border border-white/40 dark:border-slate-800/50 hover:shadow-2xl transition-all group">
                  <feature.icon className={`w-10 h-10 ${feature.color} mb-6 group-hover:scale-110 transition-transform`} />
                  <div className="font-bold text-gray-900 dark:text-white text-lg mb-2 tracking-tight">{feature.label}</div>
                  <div className="text-sm text-gray-400 dark:text-slate-500 font-black uppercase tracking-widest">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}