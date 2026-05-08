import React from 'react'
import Link from 'next/link'
import { Users, Zap, Shield, Heart, Code2, Globe2, Coffee, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'About Us - WebToolkit Pro',
  description: 'Learn about WebToolkit Pro, the free online developer tools platform built for web professionals. Discover our mission, privacy values, and the team behind the tools.',
  alternates: {
    canonical: 'https://wtkpro.site/about/',
    languages: {
      'en-US': 'https://wtkpro.site/about/',
      'x-default': 'https://wtkpro.site/about/',
    },
  },
}

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold rounded-full mb-4 border border-blue-100 dark:border-slate-800">
            Our Story
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            Empowering US Developers with <span className="text-blue-600 dark:text-blue-400">Enterprise-Grade</span> Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-400 leading-relaxed">
            WebToolkit Pro (wtkpro.site) is a professional suite of high-performance utilities designed for modern web developers. Based in the United States, we focus on providing secure, efficient, and privacy-first tools for the global developer community.
          </p>
        </div>

        {/* Mission Section */}
        <div className="prose prose-lg max-w-none mb-20 bg-blue-50/50 dark:bg-slate-900/50 p-10 rounded-3xl border border-blue-100 dark:border-slate-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Sparkles className="text-blue-600 dark:text-blue-400 w-8 h-8" /> Our Mission
          </h2>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-lg mb-6">
            WebToolkit Pro was born out of a simple frustration: the internet is full of online tools, but most are cluttered with intrusive ads, require mandatory registration, or process your sensitive data on remote servers.
          </p>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-lg">
            We set out to build a platform that is <strong>clean, fast, and 100% private</strong>. By leveraging modern browser technologies, we ensure that your data stays exactly where it belongs: on your device.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
            { 
              icon: Zap, 
              title: 'Performance Optimized', 
              desc: 'Every tool is optimized for speed. No server round-trips mean instant results even on slow connections.' 
            },
            { 
              icon: Shield, 
              title: 'Privacy by Design', 
              desc: 'We never see your data. Our tools use client-side JavaScript to process everything locally in your browser.' 
            },
            { 
              icon: Globe2, 
              title: 'Global Accessibility', 
              desc: 'Designed to be lightweight and accessible from anywhere in the world, on any device.' 
            },
            { 
              icon: Code2, 
              title: 'Built for Pros', 
              desc: 'No fluff. Just the essential tools you need for modern web development, API testing, and design.' 
            },
          ].map((item) => (
            <div key={item.title} className="group bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-8 hover:shadow-xl dark:hover:shadow-blue-900/10 hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
              <p className="text-gray-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Why Free Section */}
        <div className="bg-gray-900 rounded-3xl p-10 text-white mb-20 relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Coffee className="text-blue-400 w-8 h-8" /> Why is it Free?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              We believe that basic developer utilities should be free and accessible to everyone. We support the ongoing development and hosting of WebToolkit Pro through non-intrusive advertisements. 
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              This allows us to keep the lights on without ever charging you a subscription fee or selling your data to third parties.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>

        {/* CTA */}
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Want to see our tools in action?</h2>
          <Link href="/tools/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            Get Started for Free →
          </Link>
        </div>
      </div>
    </div>
  )
}
