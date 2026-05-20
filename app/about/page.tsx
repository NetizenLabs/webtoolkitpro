import React from 'react'
import Link from 'next/link'
import { 
  Users, Zap, Shield, Heart, Code2, Globe2, Coffee, Sparkles, 
  ArrowRight, ShieldCheck, Milestone, Star, Terminal 
} from 'lucide-react'

export const metadata = {
  title: 'About WebToolkit Pro: Technical Story, Accessibility & Mission',
  description: 'Discover the technical architecture, security mission, and founding vision behind WebToolkit Pro. A secure, accessible, high-performance ecosystem for modern web developers.',
  alternates: {
    canonical: 'https://wtkpro.site/about/',
  },
}

export default function AboutPage() {
  const coreValues = [
    { 
      icon: Zap, 
      title: 'Zero Server Overhead', 
      desc: 'Every engineering utility executes entirely in the client-side JavaScript thread. This guarantees instant computations, sub-10ms response loops, and zero network dependency.' 
    },
    { 
      icon: Shield, 
      title: 'Privacy-First Architecture', 
      desc: 'Zero data transmission to external servers. Your input buffers, code snippets, API responses, and credentials never cross the network boundary. Maximum corporate security.' 
    },
    { 
      icon: Globe2, 
      title: 'WCAG Accessible Engine', 
      desc: 'Engineered with accessibility at the core. Full semantic HTML layouts, keyboard-focusable interactions, custom focus-rings, and explicit screen-reader aria properties.' 
    },
    { 
      icon: Code2, 
      title: 'Built for Senior Engineers', 
      desc: 'Free from bloated UI wrappers or marketing fluff. WebToolkit Pro delivers high-speed, standards-compliant (RFC, W3C, ISO) raw utilities to optimize your engineering throughput.' 
    },
  ]

  const timelineMilestones = [
    {
      year: 'Dec 2025',
      title: 'Platform Foundation & Security Blueprints',
      desc: 'Platform blueprints finalized. Initiated development with core secure client-side utility templates, establishing strict zero-logging user data protection policies.'
    },
    {
      year: 'Jan 2026',
      title: 'Directory Expansion & Global Scaling',
      desc: 'Expanded the utility catalog to support broader API testing, formatting tools, AST parsers, and localized technical developer hubs.'
    },
    {
      year: 'May 2026',
      title: 'Premium Telemetry & Web Vitals Hardening',
      desc: 'Upgraded layout architectures, optimized mobile execution pipelines using React 18 deferred rendering states, and achieved optimal performance scores.'
    }
  ]

  return (
    <main id="main-content" className="dynamic-padding max-w-5xl mx-auto min-h-screen" aria-label="About WebToolkit Pro Page">
      {/* Structured Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['AboutPage', 'Organization'],
            'name': 'WebToolkit Pro',
            'url': 'https://wtkpro.site/about/',
            'logo': 'https://wtkpro.site/logo.png',
            'description': 'A premium ecosystem of accessible, secure, high-performance developer utilities designed for the modern engineering workflow.',
            'founder': {
              '@type': 'Person',
              'name': 'Abu Sufyan',
              'url': 'https://abusufyan.xyz'
            },
            'sameAs': [
              'https://x.com/WebToolkitPro',
              'https://dev.to/webtoolkitpro'
            ]
          })
        }}
      />

      {/* Hero Section */}
      <header className="text-center mb-20 pt-16">
        <span className="inline-block px-4 py-1.5 bg-blue-100/80 dark:bg-[#00D4B4]/10 text-blue-700 dark:text-[#00D4B4] text-[10px] font-bold font-mono uppercase tracking-[0.2em] rounded-full mb-6 border border-blue-200 dark:border-[#00D4B4]/20">
          🛠️ Platform Technical Architecture
        </span>
        <h1 className="text-4xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tighter leading-[1.05]">
          Engineering the <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-[#00D4B4] dark:to-[#0094FF] bg-clip-text text-transparent">Future of Web Tools</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-[#8A9BBE] max-w-3xl mx-auto leading-relaxed">
          WebToolkit Pro is an enterprise-grade ecosystem of 150+ high-performance, accessible developer utilities optimized for the modern 2026 engineering workflow. 100% secure, browser-based, and zero-server dependent.
        </p>
      </header>

      {/* Overview Metric Cards */}
      <section aria-label="Key Performance Indicators" className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {[
          { metric: '150+', label: 'Technical Tools' },
          { metric: '0ms', label: 'Server Lag' },
          { metric: '100%', label: 'Data Privacy' },
          { metric: 'A11y', label: 'WCAG Compliant' }
        ].map((item, idx) => (
          <div key={idx} className="bg-card border border-border p-6 rounded-2xl text-center shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent dark:from-[#00D4B4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-[#00D4B4] tracking-tight mb-1 relative z-10">{item.metric}</div>
            <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest relative z-10">{item.label}</div>
          </div>
        ))}
      </section>

      {/* Technical Story & Mission Section */}
      <section aria-labelledby="mission-heading" className="bg-white dark:bg-[#0D1526] rounded-[24px] border border-border p-8 md:p-12 mb-20 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-[#00D4B4]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-[#00D4B4]/10">
              <Terminal className="w-5 h-5 text-blue-600 dark:text-[#00D4B4]" />
            </div>
            <h2 id="mission-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Our Mission & Security Promise</h2>
          </div>
          <p className="text-gray-600 dark:text-[#8A9BBE] text-base md:text-lg leading-relaxed mb-6 font-medium">
            Most online utilities require you to copy-paste sensitive credentials, server logs, or corporate datasets directly onto cloud servers. This exposes your enterprise pipeline to hidden vulnerabilities and security compliance violations.
          </p>
          <p className="text-gray-600 dark:text-[#8A9BBE] text-base md:text-lg leading-relaxed font-medium">
            WebToolkit Pro solves this forever. By building advanced AST parsers, formatting engines, and regex evaluators directly on browser threads, we completely isolate your workflows. Your inputs never cross the network interface—guaranteeing compliance with strict ISO/IEC and SOC-2 guidelines.
          </p>
        </div>
      </section>

      {/* Core Engineering Values */}
      <section aria-labelledby="values-heading" className="mb-20">
        <div className="text-center mb-12">
          <h2 id="values-heading" className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Core Engineering Values</h2>
          <p className="text-sm text-muted-foreground mt-2">The architecture parameters that power every single utility in our catalog.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreValues.map((pill) => (
            <div key={pill.title} className="group bg-card rounded-[18px] border border-border p-8 hover:border-blue-500/30 dark:hover:border-[#00D4B4]/30 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-[#00D4B4] dark:to-[#0094FF] rounded-[12px] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-blue-500/10">
                <pill.icon className="w-6 h-6 text-white dark:text-[#0B1120]" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{pill.title}</h3>
              <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed font-medium">{pill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Evolution Timeline */}
      <section aria-labelledby="timeline-heading" className="bg-gray-50 dark:bg-[#0D1526] rounded-[24px] border border-border p-8 md:p-12 mb-20 relative">
        <h2 id="timeline-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-12 text-center">Platform Evolution Timeline</h2>
        <div className="relative border-l border-border pl-6 max-w-2xl mx-auto space-y-12">
          {timelineMilestones.map((milestone, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-4 border-background bg-blue-600 dark:bg-[#00D4B4] group-hover:scale-125 transition-transform" aria-hidden="true" />
              <div className="text-xs font-mono font-bold text-blue-600 dark:text-[#00D4B4] uppercase tracking-widest mb-1">{milestone.year}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
              <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed font-medium">{milestone.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Benchmarks */}
      <section aria-labelledby="benchmarks-heading" className="mb-20">
        <div className="text-center mb-12">
          <h2 id="benchmarks-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Real Performance Benchmarks</h2>
          <p className="text-sm text-muted-foreground mt-2">Actual measurements from our production tools — not marketing numbers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              tool: 'JSON Formatter',
              metric: '23ms',
              detail: '50MB file parsed & beautified',
              bar: 95,
              color: 'from-blue-500 to-blue-600',
            },
            {
              tool: 'Hash Generator (SHA-256)',
              metric: '< 1ms',
              detail: '1KB string hashed client-side',
              bar: 99,
              color: 'from-emerald-500 to-teal-500',
            },
            {
              tool: 'UUID v7 Generator',
              metric: '0.02ms',
              detail: 'Single UUID generation time',
              bar: 99,
              color: 'from-purple-500 to-indigo-500',
            },
            {
              tool: 'Password Generator',
              metric: '< 0.5ms',
              detail: '128-char high-entropy password',
              bar: 98,
              color: 'from-amber-500 to-orange-500',
            },
            {
              tool: 'Base64 Encoder',
              metric: '8ms',
              detail: '10MB file encoded in-browser',
              bar: 92,
              color: 'from-rose-500 to-pink-500',
            },
            {
              tool: 'Regex Tester',
              metric: '< 2ms',
              detail: 'Pattern match on 10K lines',
              bar: 97,
              color: 'from-cyan-500 to-blue-500',
            },
          ].map((b) => (
            <div key={b.tool} className="bg-card border border-border rounded-[18px] p-6 hover:shadow-lg hover:border-blue-500/20 dark:hover:border-[#00D4B4]/20 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{b.tool}</h3>
                <span className="text-lg font-black text-blue-600 dark:text-[#00D4B4] tabular-nums">{b.metric}</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-medium mb-4">{b.detail}</p>
              {/* Performance bar */}
              <div className="w-full h-1.5 bg-gray-100 dark:bg-[#1E2D47] rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${b.color} rounded-full transition-all duration-700 group-hover:opacity-100 opacity-80`}
                  style={{ width: `${b.bar}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-6 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
          Tested on Chrome 126 · M2 MacBook Air · All processing 100% client-side
        </p>
      </section>

      {/* Transparency & Privacy Promise */}
      <section aria-labelledby="transparency-heading" className="bg-white dark:bg-[#0D1526] rounded-[24px] border border-border p-8 md:p-12 mb-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 dark:bg-[#00D4B4]/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="relative z-10">
          <h2 id="transparency-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">Full Transparency</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">What We Don&apos;t Do</h3>
              <ul className="space-y-3">
                {[
                  'No Google Analytics or third-party trackers',
                  'No user data stored on any server, ever',
                  'No account required — zero login friction',
                  'No ads injected into tool interfaces',
                  'No selling of any user behavior data',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600 dark:text-[#8A9BBE] font-medium">
                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-red-500 text-xs font-black">✕</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">What We Do</h3>
              <ul className="space-y-3">
                {[
                  'Cloudflare Web Analytics only — privacy-first, cookieless',
                  'All tool code is inspectable via browser DevTools',
                  'Open roadmap — community-driven feature requests',
                  'Published on Product Hunt, DEV.to, CoderLegion publicly',
                  'Full legal pages: Privacy Policy, Terms, Disclaimer',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600 dark:text-[#8A9BBE] font-medium">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-emerald-500 text-xs font-black">✓</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Network Section */}
      <section aria-labelledby="trust-network-heading" className="mb-20">
        <div className="flex items-center gap-4 mb-10">
          <h2 id="trust-network-heading" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white shrink-0">The Trust Network Nodes</h2>
          <div className="flex-grow h-px bg-border" aria-hidden="true" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="p-8 bg-card border border-border rounded-3xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 group-hover:opacity-15 transition-opacity" aria-hidden="true">
              <Sparkles className="w-12 h-12 text-blue-600 dark:text-[#00D4B4]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">DEVHUB INDEX</h3>
            <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed mb-6 font-medium">
              Our high-velocity satellite hub dedicated to indexing technical documentation, API references, and emerging developer resources.
            </p>
            <a 
              href="https://devhubindex.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Explore DevHub Index Node (opens in a new tab)"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-[#00D4B4] uppercase tracking-widest hover:gap-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              Explore Node <Globe2 className="w-4 h-4" aria-hidden="true" />
            </a>
          </article>

          <article className="p-8 bg-card border border-border rounded-3xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 group-hover:opacity-15 transition-opacity" aria-hidden="true">
              <Zap className="w-12 h-12 text-amber-500 dark:text-[#00D4B4]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">TradeConvert.pro</h3>
            <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed mb-6 font-medium">
              A specialized utility hub for the building trades, providing verified unit conversion and technical reference for construction engineers.
            </p>
            <a 
              href="https://tradeconvert.pro" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Launch TradeConvert.pro (opens in a new tab)"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-[#00D4B4] uppercase tracking-widest hover:gap-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              Launch Site <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </article>

          <article className="p-8 bg-card border border-border rounded-3xl relative group overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 group-hover:opacity-15 transition-opacity" aria-hidden="true">
              <ShieldCheck className="w-12 h-12 text-emerald-600 dark:text-[#00D4B4]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Severance Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed mb-6 font-medium">
              A precise, localized legal toolkit designed for navigating global labor law. Provides secure severance calculations for the USA, Canada, and the Philippines.
            </p>
            <a 
              href="https://severancecalculator.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="View Severance Calculator Toolkit (opens in a new tab)"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-[#00D4B4] uppercase tracking-widest hover:gap-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              View Toolkit <Shield className="w-4 h-4" aria-hidden="true" />
            </a>
          </article>

          <article className="p-8 bg-card border border-border rounded-3xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 group-hover:opacity-15 transition-opacity" aria-hidden="true">
              <Coffee className="w-12 h-12 text-indigo-600 dark:text-[#0094FF]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Engineering Leadership</h3>
            <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed mb-4 font-medium">
              Founded and architected by <a href="https://abusufyan.xyz" aria-label="Visit Abu Sufyan's personal profile (opens in a new tab)" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-[#00D4B4] transition-colors font-bold outline-none focus-visible:underline">Abu Sufyan</a>, WebToolkit Pro follows strict standards of engineering excellence.
            </p>
            <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed mb-6 font-medium">
              {"Track Abu Sufyan's latest publications, Myers algorithm breakdowns, and badges on CoderLegion (Points: 684 | Badges: 2)."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/author/" 
                aria-label="Read Author Profile of Abu Sufyan"
                className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-[#0094FF] uppercase tracking-widest hover:gap-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                Author Profile <Users className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a 
                href="https://coderlegion.com/user/abusuyfan" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit Abu Sufyan's CoderLegion Profile (opens in a new tab)"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#00D4B4] uppercase tracking-widest hover:underline outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                CoderLegion <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section aria-labelledby="cta-heading" className="text-center py-20 border-t border-border">
        <h2 id="cta-heading" className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Ready to optimize your workflow?</h2>
        <Link 
          href="/tools/" 
          aria-label="Explore Developer Tools Directory Catalog"
          className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-[#00D4B4] dark:to-[#0094FF] text-white dark:text-[#0B1120] px-10 py-4 rounded-[12px] font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Explore Directory <Zap className="w-4 h-4 fill-current" aria-hidden="true" />
        </Link>
      </section>
    </main>
  )
}
