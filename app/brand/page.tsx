import React from 'react'
import { Metadata } from 'next'
import Logo from '@/components/ui/Logo'
import { Shield, Zap, Star, Code2, Info, CheckCircle2, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Brand Guidelines - WebToolkit Pro',
  description: 'Official visual identity and brand system for WebToolkit Pro.',
  alternates: {
    canonical: 'https://wtkpro.site/brand/',
  },
  robots: 'noindex, nofollow' // Internal document
}

export default function BrandGuidelines() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F0F6FF] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Cover */}
        <div className="text-center mb-24 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-8">
            Brand Guidelines v1.0
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            WebToolkit <span className="bg-gradient-to-r from-[#00D4B4] to-[#0094FF] bg-clip-text text-transparent">Pro</span>
            <br />Brand System
          </h1>
          <p className="text-lg text-[#8A9BBE] max-w-lg mx-auto leading-relaxed">
            The definitive reference for logo usage, colors, typography, and voice for the WebToolkit Pro ecosystem.
          </p>
        </div>

        {/* 01 Logo System */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400">01</span>
            <h2 className="text-2xl font-bold tracking-tight">Logo System</h2>
            <div className="flex-grow h-px bg-[#1E2D47]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#0D1526] border border-[#1E2D47] rounded-3xl p-10 flex flex-col items-center justify-center gap-6">
              <span className="text-[10px] text-[#4A6080] uppercase tracking-widest">Icon Mark</span>
              <div className="w-20 h-20 bg-gradient-to-br from-[#00D4B4] to-[#0094FF] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20">
                <Logo iconOnly className="scale-150" />
              </div>
            </div>
            <div className="bg-[#0D1526] border border-[#1E2D47] rounded-3xl p-10 flex flex-col items-center justify-center gap-6">
              <span className="text-[10px] text-[#4A6080] uppercase tracking-widest">Full Wordmark</span>
              <Logo className="scale-125" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-6 bg-[#0D1526] border-l-4 border-emerald-500 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm text-[#8A9BBE]"><strong className="text-white">Use the icon mark</strong> when space is limited (favicons, app icons, social avatars).</p>
            </div>
            <div className="flex items-start gap-4 p-6 bg-[#0D1526] border-l-4 border-red-500 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-[#8A9BBE]"><strong className="text-white">Don&apos;t stretch or recolor</strong> the logo. Only use approved color variants.</p>
            </div>
          </div>
        </section>

        {/* 02 Color Palette */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400">02</span>
            <h2 className="text-2xl font-bold tracking-tight">Color Palette</h2>
            <div className="flex-grow h-px bg-[#1E2D47]"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Canvas', hex: '#0B1120', role: 'Background' },
              { name: 'Surface', hex: '#0D1526', role: 'Cards/Nav' },
              { name: 'Teal', hex: '#00D4B4', role: 'Accents' },
              { name: 'Blue', hex: '#0094FF', role: 'Links/UI' },
            ].map(color => (
              <div key={color.hex} className="bg-[#0D1526] border border-[#1E2D47] rounded-2xl overflow-hidden">
                <div className="h-20" style={{ backgroundColor: color.hex }}></div>
                <div className="p-4">
                  <div className="text-xs font-bold mb-1">{color.name}</div>
                  <div className="text-[10px] text-[#4A6080] font-mono uppercase">{color.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 03 Typography */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400">03</span>
            <h2 className="text-2xl font-bold tracking-tight">Typography</h2>
            <div className="flex-grow h-px bg-[#1E2D47]"></div>
          </div>

          <div className="bg-[#0D1526] border border-[#1E2D47] rounded-3xl p-12">
            <div className="text-6xl font-bold tracking-tighter mb-8 bg-gradient-to-r from-[#00D4B4] to-[#0094FF] bg-clip-text text-transparent">
              Build Faster.
            </div>
            <div className="font-mono text-emerald-400 mb-6">DM SANS — PRIMARY UI FONT</div>
            <p className="text-[#8A9BBE] leading-relaxed max-w-xl mb-12">
              WebToolkit Pro offers 190+ free premium developer tools. Format JSON, generate passwords, encode data, and master SEO — all in one place.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-[#1E2D47]">
              <div>
                <div className="text-4xl font-bold mb-2">H1</div>
                <div className="text-[10px] text-[#4A6080] font-mono">40px / 700</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">H2</div>
                <div className="text-[10px] text-[#4A6080] font-mono">30px / 700</div>
              </div>
              <div>
                <div className="text-xl font-semibold mb-2">Body</div>
                <div className="text-[10px] text-[#4A6080] font-mono">16px / 400</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-12 border-t border-[#1E2D47] text-[#4A6080] font-mono text-xs">
          <p>WebToolkit Pro Brand Guidelines — wtkpro.site — 2026</p>
        </footer>
      </div>
    </div>
  )
}
