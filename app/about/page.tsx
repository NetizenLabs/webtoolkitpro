import React from 'react'
import Link from 'next/link'
import { Users, Zap, Shield, Heart, Code2, Globe2, Coffee, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'About Us - WebToolkit Pro',
  description: 'Learn about WebToolkit Pro, the free online developer tools platform built for web professionals. Discover our mission, privacy values, and the team behind the tools.',
  alternates: {
    canonical: 'https://wtkpro.site/about/',
  },
}

export default function AboutPage() {
  return (
    <div className="dynamic-padding max-w-4xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-16 pt-12">
        <span className="inline-block px-4 py-1.5 bg-[#00D4B4]/10 text-[#00D4B4] text-[10px] font-bold font-mono uppercase tracking-[0.2em] rounded-full mb-4 border border-[#00D4B4]/20">
          Our Story
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tighter">
          Engineering the Future of <span className="text-[#00D4B4]">Developer Utility</span>
        </h1>
        <p className="text-lg text-[#8A9BBE] leading-relaxed max-w-3xl mx-auto">
          WebToolkit Pro is a professional suite of high-performance utilities designed for modern web developers. Based in the United States, we focus on providing secure, efficient, and privacy-first tools for the global developer community.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-[#0D1526] p-10 rounded-[12px] border border-[#1E2D47] mb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#00D4B4]/5 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
          <Sparkles className="text-[#00D4B4] w-6 h-6" /> Our Mission
        </h2>
        <div className="space-y-6 text-[#8A9BBE] leading-relaxed text-lg relative z-10">
          <p>
            WebToolkit Pro was born out of a simple frustration: the internet is full of online tools, but most are cluttered with intrusive ads, require mandatory registration, or process your sensitive data on remote servers.
          </p>
          <p>
            We set out to build a platform that is <strong className="text-white">clean, fast, and 100% private</strong>. By leveraging modern browser technologies, we ensure that your data stays exactly where it belongs: on your device.
          </p>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {[
          { 
            icon: Zap, 
            title: 'Zero Latency', 
            desc: 'Every tool is optimized for speed. No server round-trips mean instant results even on slow connections.' 
          },
          { 
            icon: Shield, 
            title: 'Privacy First', 
            desc: 'We never see your data. Our tools use client-side JavaScript to process everything locally in your browser.' 
          },
          { 
            icon: Globe2, 
            title: 'Global Scale', 
            desc: 'Designed to be lightweight and accessible from anywhere in the world, on any device.' 
          },
          { 
            icon: Code2, 
            title: 'Built for Pros', 
            desc: 'No fluff. Just the essential tools you need for modern web development, API testing, and design.' 
          },
        ].map((item) => (
          <div key={item.title} className="group bg-[#0D1526] rounded-[12px] border border-[#1E2D47] p-8 hover:border-[#00D4B4]/30 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00D4B4] to-[#0094FF] rounded-[10px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/10">
              <item.icon className="w-6 h-6 text-[#0B1120]" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00D4B4] transition-colors">{item.title}</h3>
            <p className="text-sm text-[#8A9BBE] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Why Free Section */}
      <div className="bg-[#0D1526] rounded-[12px] border border-[#1E2D47] p-10 mb-20 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Coffee className="text-[#00D4B4] w-6 h-6" /> Why is it Free?
          </h2>
          <div className="space-y-4 text-[#8A9BBE] leading-relaxed">
            <p>
              We believe that basic developer utilities should be free and accessible to everyone. We support the ongoing development and hosting of WebToolkit Pro through non-intrusive advertisements. 
            </p>
            <p>
              This allows us to keep the lights on without ever charging you a subscription fee or selling your data to third parties.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D4B4]/5 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3" />
      </div>

      {/* CTA */}
      <div className="text-center py-20 border-t border-[#1E2D47]">
        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Ready to optimize your workflow?</h2>
        <Link href="/tools/" className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] px-10 py-4 rounded-[12px] font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all">
          Explore Directory <Zap className="w-4 h-4 fill-current" />
        </Link>
      </div>
    </div>
  )
}

