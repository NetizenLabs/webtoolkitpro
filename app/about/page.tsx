import React from 'react'
import Link from 'next/link'
import { Users, Zap, Shield, Heart } from 'lucide-react'

export const metadata = {
  title: 'About Us - WebToolkit Pro',
  description: 'Learn about WebToolkit Pro, the free online developer tools platform built for web professionals.',
}

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center">About WebToolkit Pro</h1>
        <p className="text-xl text-gray-500 text-center mb-16 max-w-2xl mx-auto">
          We build free, fast, and privacy-focused tools that help developers and designers work smarter.
        </p>

        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-gray-600 leading-relaxed">
            WebToolkit Pro was created by developers, for developers. We noticed that most online tool websites are either bloated with ads, slow, or require unnecessary sign-ups. So we built something better.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Every tool on our platform runs entirely in your browser — no data is ever sent to any server. Your privacy is not just a feature, it&apos;s a fundamental principle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            { icon: Zap, title: 'Lightning Fast', desc: 'All tools run client-side with zero latency.' },
            { icon: Shield, title: 'Privacy First', desc: 'Your data never leaves your browser.' },
            { icon: Users, title: 'Community Driven', desc: 'Open source and built with feedback from developers.' },
            { icon: Heart, title: '100% Free', desc: 'No paywalls, no premium tiers, no limits.' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-8">
              <item.icon className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/tools" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all">
            Explore Our Tools →
          </Link>
        </div>

        <div className="mt-12 h-[250px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space</div>
      </div>
    </div>
  )
}
