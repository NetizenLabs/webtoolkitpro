
import React from 'react'
import Link from '@/components/ui/NativeLink';
import Image from 'next/image'
import { Github, Twitter, Mail, Linkedin, ExternalLink, Zap, Shield, Globe, Code2, ArrowRight, Award, Flame, UserCheck, BookOpen, ChevronRight, CheckCircle, FileText, Terminal } from 'lucide-react'
import LinkedInBadge from '@/components/ui/LinkedInBadge'
import { generatePersonSchema } from '@/lib/seo/schema'

export const metadata = {
  title: 'Abu Sufyan - Lead Engineer & Author | WebToolkit Pro',
  description: 'Meet Abu Sufyan, the lead architect behind WebToolkit Pro. Discover his research on Edge performance, technical SEO, and modern web infrastructure.',
  alternates: {
    canonical: 'https://wtkpro.site/author/',
  },
}

export default function AuthorPage() {
  return (
    <div className="dynamic-padding max-w-4xl mx-auto min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePersonSchema()) }}
      />
      {/* Header Section */}
      <div className="text-center mb-16 pt-12">
        {/* Placeholder Photo */}
        <div className="relative inline-block mb-8">
          <div className="w-28 h-28 rounded-[20px] overflow-hidden border-4 border-white dark:border-[#0B1120] shadow-2xl shadow-blue-500/20">
            <Image
              src="/author-placeholder.png"
              alt="Abu Sufyan — Lead Architect, WebToolkit Pro"
              width={112}
              height={112}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          {/* Verified badge */}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#00D4B4] to-[#0094FF] rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-[#0B1120]" title="Verified Builder">
            <CheckCircle className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tighter">
          Abu <span className="text-[#00D4B4]">Sufyan</span>
        </h1>
        <p className="text-sm font-mono font-bold text-[#00D4B4] uppercase tracking-[0.3em] mb-6">
          Lead Systems Architect
        </p>

        {/* Skills / Expertise Tag Cloud */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-2xl mx-auto">
          {[
            'Next.js 14', 'TypeScript', 'Edge Computing', 'Technical SEO',
            'Vercel ISR', 'Privacy-First Design', 'Web Crypto API',
            'Performance Optimization', 'JSON / REST', 'Client-Side Security'
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-100 dark:bg-[#1E2D47] text-gray-700 dark:text-[#8A9BBE] text-[10px] font-bold font-mono rounded-full border border-gray-200 dark:border-[#2A3D5A] hover:border-[#00D4B4]/50 hover:text-[#00D4B4] transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-12">
          <a href="https://abusufyan.xyz" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] text-gray-500 dark:text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all shadow-sm">
            <ExternalLink className="w-5 h-5" />
          </a>
          <a href="https://github.com/abusufyan-netizen" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] text-gray-500 dark:text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all shadow-sm">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://pk.linkedin.com/in/abu-sufyan-b34571410" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] text-gray-500 dark:text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all shadow-sm" aria-label="LinkedIn Personal Profile">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/abusufyan-wtkpro/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] text-gray-500 dark:text-[#8A9BBE] hover:text-[#0094FF] hover:border-[#0094FF]/50 transition-all shadow-sm" aria-label="LinkedIn WebToolkit Pro Profile">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://twitter.com/WebToolKitPro" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] text-gray-500 dark:text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all shadow-sm">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="mailto:hello@wtkpro.site" className="p-3 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] text-gray-500 dark:text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all shadow-sm">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Bio Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Engineering Philosophy</h2>
          <p className="text-lg text-gray-600 dark:text-[#8A9BBE] leading-relaxed font-medium">
            Abu Sufyan is a technical architect specializing in high-performance web infrastructure and privacy-centric application design. He is the primary author and engineer behind the WebToolkit Pro ecosystem.
          </p>
          <p className="text-gray-600 dark:text-[#8A9BBE] leading-relaxed font-medium">
            His work focuses on eliminating network latency through Edge Computing and ensuring that modern developer tools remain 100% private through client-side-only execution.
          </p>
          <div className="pt-8 grid grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Edge Optimization</h3>
                <p className="text-xs text-gray-500 dark:text-[#8A9BBE] mt-1">Specialist in Vercel Edge & ISR architectures.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Privacy-First Tools</h3>
                <p className="text-xs text-gray-500 dark:text-[#8A9BBE] mt-1">Lead on client-side security standards.</p>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <div className="bg-gray-50 dark:bg-[#0D1526] p-8 rounded-[12px] border border-gray-100 dark:border-[#1E2D47] shadow-sm">
              <h3 className="text-[10px] font-bold text-gray-400 dark:text-[#8A9BBE] uppercase tracking-widest font-mono mb-6">Network Contributions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: 'TradeConvert', desc: 'Trade Engineering Unit Lab', href: 'https://tradeconvert.pro' },
                  { name: 'Severance Calc', desc: 'Global Labor Law Engine', href: 'https://www.severancecalculator.xyz/' },

                  { name: 'Personal Portfolio', desc: 'Engineering Showcase', href: 'https://abusufyan.xyz' },
                ].map((site) => (
                  <a key={site.href} href={site.href} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="flex items-center justify-between text-gray-900 dark:text-white group-hover:text-[#00D4B4] transition-colors mb-1 font-bold">
                      {site.name} <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-[#8A9BBE] font-medium">{site.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">

          {/* LinkedIn Profiles Section */}
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 dark:text-[#8A9BBE] uppercase tracking-widest font-mono mb-4">LinkedIn Profiles</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-[9px] font-bold text-gray-400 dark:text-[#8A9BBE]/60 uppercase tracking-widest font-mono mb-2">Personal</p>
                <LinkedInBadge
                  vanity="abu-sufyan-b34571410"
                  profileUrl="https://pk.linkedin.com/in/abu-sufyan-b34571410"
                  displayName="Abu Sufyan"
                />
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-400 dark:text-[#8A9BBE]/60 uppercase tracking-widest font-mono mb-2">WebToolkit Pro</p>
                <LinkedInBadge
                  vanity="abusufyan-wtkpro"
                  profileUrl="https://www.linkedin.com/in/abusufyan-wtkpro/"
                  displayName="Abu Sufyan · WTK Pro"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DEV.to Articles */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <Terminal className="w-5 h-5 text-[#0094FF]" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Published on DEV Community</h2>
          <div className="flex-grow h-px bg-gray-100 dark:bg-[#1E2D47]" />
          <a href="https://dev.to/abusufyan909" target="_blank" rel="noopener noreferrer"
            className="text-[10px] font-bold text-[#0094FF] uppercase tracking-widest hover:underline font-mono flex items-center gap-1">
            All Articles <ChevronRight className="w-3 h-3" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'UUID v4 vs v7 — Why Every Developer Should Switch in 2026',
              href: 'https://dev.to/abusufyan909/uuid-v4-vs-v7-why-every-developer-should-switch-in-2026-496i',
              tag: 'UUID / Security',
              color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800',
            },
            {
              title: 'How I Built & Deployed WebToolkit Pro — 40 Free Developer Tools, All Client-Side',
              href: 'https://dev.to/abusufyan909/how-i-built-and-deployed-webtoolkit-pro-40-free-developer-tools-all-client-side-56ph',
              tag: 'Build Story',
              color: 'text-teal-600 dark:text-[#00D4B4] bg-teal-50 dark:bg-[#00D4B4]/10 border-teal-100 dark:border-[#00D4B4]/20',
            },
            {
              title: 'Stop Settling for Slow Web Tools',
              href: 'https://dev.to/abusufyan909/stop-settling-for-slow-web-tools-3jkf',
              tag: 'Performance',
              color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800',
            },
          ].map((article) => (
            <a
              key={article.href}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-6 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[18px] hover:border-[#00D4B4]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="w-9 h-9 rounded-[10px] bg-gray-100 dark:bg-[#1E2D47] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileText className="w-4 h-4 text-gray-500 dark:text-[#8A9BBE]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-2">
                  <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded border ${article.color} font-mono`}>
                    {article.tag}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug group-hover:text-[#00D4B4] transition-colors">
                  {article.title}
                </h3>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 dark:text-[#4A6080] shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>

      {/* Verified Identity Panel */}
      <div className="mb-20 p-8 bg-gradient-to-br from-gray-50 to-white dark:from-[#0D1526] dark:to-[#0B1120] rounded-[24px] border border-gray-100 dark:border-[#1E2D47] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-5 h-5 text-[#00D4B4]" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Verified Identity &amp; Presence</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'DEV Community', sub: '3 Articles', href: 'https://dev.to/abusufyan909', icon: Terminal, color: 'text-[#0094FF]' },
            { label: 'GitHub', sub: 'abusufyan-netizen', href: 'https://github.com/abusufyan-netizen', icon: Code2, color: 'text-gray-700 dark:text-white' },
            { label: 'Product Hunt', sub: 'WTKPro Listed', href: 'https://www.producthunt.com/products/webtoolkit-pro', icon: Zap, color: 'text-[#DA552F]' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 p-5 bg-white dark:bg-[#0A1120] border border-gray-100 dark:border-[#1E2D47] rounded-[16px] hover:border-[#00D4B4]/40 hover:shadow-md transition-all text-center"
            >
              <item.icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform`} />
              <div className="font-bold text-gray-900 dark:text-white text-sm">{item.label}</div>
              <div className="text-[10px] text-gray-400 dark:text-[#4A6080] font-mono">{item.sub}</div>
            </a>
          ))}
        </div>
      </div>



      {/* Technical Research Section */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-8">Technical Research</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'The WebToolkit Pro Trust Network',
              desc: 'Architectural overview of the decentralized authority hub and its impact on technical E-E-A-T.',
              href: '/blog/webtoolkit-pro-trust-network/'
            },
            {
              title: 'LLM Latency & UX Impact',
              desc: 'A deep-dive into the performance standards required for the next generation of AI-driven web apps.',
              href: '/blog/llm-latency-ux-impact/'
            }
          ].map((post) => (
            <Link key={post.href} href={post.href} className="group p-8 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl hover:border-[#00D4B4]/30 transition-all shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#00D4B4] transition-colors">{post.title}</h3>
              <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed font-medium mb-4">{post.desc}</p>
              <span className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Publication <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
      {/* Stats / Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {[
          { label: 'Core Tools', val: '190+', icon: Code2 },
          { label: 'Uptime', val: '99.99%', icon: Globe },
          { label: 'Privacy', val: '100%', icon: Shield },
          { label: 'Response', val: 'Instant', icon: Zap },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-[#0D1526] p-6 rounded-[12px] border border-gray-100 dark:border-[#1E2D47] text-center shadow-sm">
            <stat.icon className="w-5 h-5 text-[#00D4B4] mx-auto mb-3" strokeWidth={1.5} />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.val}</div>
            <div className="text-[10px] font-bold text-gray-400 dark:text-[#8A9BBE] uppercase tracking-widest font-mono">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center py-20 border-t border-gray-100 dark:border-[#1E2D47]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight uppercase">Collab with Abu Sufyan</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact/" className="bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] px-8 py-4 rounded-[12px] font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all">
            Direct Inquiry
          </Link>
          <a href="https://github.com/abusufyan-netizen" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] text-gray-900 dark:text-white px-8 py-4 rounded-[12px] font-bold text-xs uppercase tracking-widest hover:border-[#00D4B4]/50 transition-all">
            View Source Code
          </a>
          <a href="https://pk.linkedin.com/in/abu-sufyan-b34571410" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] text-gray-900 dark:text-white px-8 py-4 rounded-[12px] font-bold text-xs uppercase tracking-widest hover:border-[#0077B5]/50 hover:text-[#0077B5] dark:hover:text-[#0094FF] transition-all">
            <Linkedin className="w-4 h-4" /> Connect (Personal)
          </a>
          <a href="https://www.linkedin.com/in/abusufyan-wtkpro/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] text-gray-900 dark:text-white px-8 py-4 rounded-[12px] font-bold text-xs uppercase tracking-widest hover:border-[#0094FF]/50 hover:text-[#0094FF] transition-all">
            <Linkedin className="w-4 h-4" /> Connect (WTK Pro)
          </a>
        </div>
      </div>
    </div>
  )
}
