
import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Mail, ExternalLink, Zap, Shield, Globe, Code2, ArrowRight, Award, Flame, UserCheck, BookOpen, ChevronRight } from 'lucide-react'

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
      {/* Header Section */}
      <div className="text-center mb-16 pt-12">
        <div className="w-24 h-24 bg-gradient-to-br from-[#00D4B4] to-[#0094FF] rounded-full mx-auto mb-8 flex items-center justify-center shadow-xl shadow-blue-500/20 border-4 border-white dark:border-[#0B1120]">
          <span className="text-3xl font-bold text-[#0B1120]">AS</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tighter">
          Abu <span className="text-[#00D4B4]">Sufyan</span>
        </h1>
        <p className="text-sm font-mono font-bold text-[#00D4B4] uppercase tracking-[0.3em] mb-8">
          Lead Architect & System Designer
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <a href="https://abusufyan.xyz" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] text-gray-500 dark:text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all shadow-sm">
            <ExternalLink className="w-5 h-5" />
          </a>
          <a href="https://github.com/abusufyan-netizen" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] text-gray-500 dark:text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all shadow-sm">
            <Github className="w-5 h-5" />
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
        </div>

        <div className="space-y-8">
          <div className="bg-gray-50 dark:bg-[#0D1526] p-8 rounded-[12px] border border-gray-100 dark:border-[#1E2D47] shadow-sm">
            <h3 className="text-[10px] font-bold text-gray-400 dark:text-[#8A9BBE] uppercase tracking-widest font-mono mb-6">Network Contributions</h3>
            <div className="space-y-6">
              {[
                { name: 'TradeConvert', desc: 'Trade Engineering Unit Lab', href: 'https://tradeconvert.pro' },
                { name: 'Severance Calc', desc: 'Global Labor Law Engine', href: 'https://www.severancecalculator.xyz/' },
                { name: 'DEVHUB INDEX', desc: 'Enterprise Authority Hub', href: 'https://devhubindex.vercel.app/' },
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

      {/* CoderLegion Integration Section */}
      <div className="p-8 bg-gray-50 dark:bg-[#0D1526] rounded-[24px] border border-gray-100 dark:border-[#1E2D47] relative overflow-hidden group shadow-lg mb-20">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 dark:bg-[#00D4B4]/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block px-2.5 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[8px] font-bold font-mono uppercase tracking-widest rounded border border-indigo-100 dark:border-indigo-500/20">
                  Featured Node
                </span>
                <span className="text-[8px] text-gray-400 dark:text-[#8A9BBE]/60 font-mono font-bold uppercase tracking-widest">
                  CoderLegion Developer Profile
                </span>
              </div>
              
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600 dark:text-[#00D4B4]" /> CoderLegion Spotlight
              </h3>
              <p className="text-xs text-gray-600 dark:text-[#8A9BBE] leading-relaxed mb-6 font-medium">
                Follow my continuous learning updates, algorithmic solutions, and technical deep-dives on CoderLegion.
              </p>

              <div className="flex flex-wrap gap-2.5 mb-6">
                <div className="bg-white dark:bg-[#0A1120] border border-gray-100 dark:border-[#1E2D47] px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-sm hover:border-[#00D4B4]/30 transition-colors">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <div className="text-[10px] font-mono">
                    <span className="text-gray-400 dark:text-[#8A9BBE] font-bold">Points:</span> <strong className="text-gray-900 dark:text-white">684</strong>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#0A1120] border border-gray-100 dark:border-[#1E2D47] px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-sm hover:border-[#00D4B4]/30 transition-colors">
                  <Award className="w-4 h-4 text-[#00D4B4]" />
                  <div className="text-[10px] font-mono">
                    <span className="text-gray-400 dark:text-[#8A9BBE] font-bold">Badges:</span> <strong className="text-gray-900 dark:text-white">2</strong>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#0A1120] border border-gray-100 dark:border-[#1E2D47] px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-sm hover:border-[#00D4B4]/30 transition-colors">
                  <UserCheck className="w-4 h-4 text-blue-500" />
                  <div className="text-[10px] font-mono">
                    <span className="text-gray-400 dark:text-[#8A9BBE] font-bold">Followers:</span> <strong className="text-gray-900 dark:text-white">1</strong>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#0A1120] border border-gray-100 dark:border-[#1E2D47] px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-sm hover:border-[#00D4B4]/30 transition-colors">
                  <BookOpen className="w-4 h-4 text-purple-500" />
                  <div className="text-[10px] font-mono">
                    <span className="text-gray-400 dark:text-[#8A9BBE] font-bold">Posts:</span> <strong className="text-gray-900 dark:text-white">4</strong>
                  </div>
                </div>
              </div>

              <a 
                href="https://coderlegion.com/user/abusuyfan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-bold text-indigo-600 dark:text-[#00D4B4] hover:text-indigo-700 dark:hover:text-[#0094FF] uppercase tracking-widest font-mono transition-colors group/link"
              >
                View My Full Profile <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between p-5 bg-white dark:bg-[#0A1120] border border-gray-100 dark:border-[#1E2D47] rounded-[16px] shadow-sm hover:border-[#00D4B4]/30 transition-all">
              <div>
                <div className="text-[8px] font-bold text-gray-400 dark:text-[#8A9BBE]/60 uppercase tracking-widest mb-2 font-mono flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-[#0094FF]" /> Latest Publication
                </div>
                <h4 className="text-sm font-extrabold text-gray-900 dark:text-white leading-snug mb-3">
                  How Diff Algorithms Work: Myers Algorithm Explained Simply
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-[#8A9BBE] leading-relaxed mb-4 font-medium">
                  An intuitive, visual explanation of Myers greedy diff algorithm, showing how modern source control computes edits in O(ND) time.
                </p>
              </div>

              <a 
                href="https://coderlegion.com/18153/how-diff-algorithms-work-myers-algorithm-explained-simply" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white dark:bg-white dark:text-[#0B1120] rounded-[10px] font-extrabold text-[9px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-md"
              >
                Read Article <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>
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
          { label: 'Core Tools', val: '150+', icon: Code2 },
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
          <Link href="/contact" className="bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] px-8 py-4 rounded-[12px] font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all">
            Direct Inquiry
          </Link>
          <a href="https://github.com/abusufyan-netizen" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] text-gray-900 dark:text-white px-8 py-4 rounded-[12px] font-bold text-xs uppercase tracking-widest hover:border-[#00D4B4]/50 transition-all">
            View Source Code
          </a>
        </div>
      </div>
    </div>
  )
}
