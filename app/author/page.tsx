import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Mail, ExternalLink, Zap, Shield, Globe, Code2 } from 'lucide-react'

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
          <a href="https://github.com/abusufyan-netizen" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] text-gray-500 dark:text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all shadow-sm">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://twitter.com/wtkpro" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] text-gray-500 dark:text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all shadow-sm">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="mailto:contact@wtkpro.site" className="p-3 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] text-gray-500 dark:text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all shadow-sm">
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
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Zero-Trust Tools</h3>
                <p className="text-xs text-gray-500 dark:text-[#8A9BBE] mt-1">Lead on client-side security standards.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="bg-gray-50 dark:bg-[#0D1526] p-8 rounded-[12px] border border-gray-100 dark:border-[#1E2D47] shadow-sm">
            <h3 className="text-[10px] font-bold text-gray-400 dark:text-[#8A9BBE] uppercase tracking-widest font-mono mb-6">Network Contributions</h3>
            <div className="space-y-6">
              <a href="https://www.severancecalculator.xyz/" target="_blank" rel="noopener noreferrer" className="group block">
                <div className="flex items-center justify-between text-gray-900 dark:text-white group-hover:text-[#00D4B4] transition-colors mb-1 font-bold">
                  Severance Calc <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <p className="text-xs text-gray-500 dark:text-[#8A9BBE] font-medium">Global Labor Law Engine</p>
              </a>
              <a href="https://wtkpro.xyz/" target="_blank" rel="noopener noreferrer" className="group block">
                <div className="flex items-center justify-between text-gray-900 dark:text-white group-hover:text-[#00D4B4] transition-colors mb-1 font-bold">
                  Satellite Hub <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <p className="text-xs text-gray-500 dark:text-[#8A9BBE] font-medium">Authority Link Resource</p>
              </a>
              <a href="https://github.com/abusufyan-netizen" target="_blank" rel="noopener noreferrer" className="group block">
                <div className="flex items-center justify-between text-gray-900 dark:text-white group-hover:text-[#00D4B4] transition-colors mb-1 font-bold">
                  Open Source <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <p className="text-xs text-gray-500 dark:text-[#8A9BBE] font-medium">Public Engineering Portfolio</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats / Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {[
          { label: 'Core Tools', val: '65+', icon: Code2 },
          { label: 'Uptime', val: '99.99%', icon: Globe },
          { label: 'Privacy', val: '100%', icon: Shield },
          { label: 'Response', val: '3ms', icon: Zap },
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
        </div>
      </div>
    </div>
  )
}
