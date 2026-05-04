import React from 'react'
import Link from 'next/link'
import { 
  FileJson, Key, FileText, Palette, Hash, Type, Clock, Binary, Shield, Code, 
  Ruler, Shuffle, FileCode, Globe, ArrowRight, Sparkles, Zap, Users, Star
} from 'lucide-react'

const featuredTools = [
  { name: 'JSON Formatter', icon: FileJson, href: '/tools/json-formatter', color: 'from-blue-500 to-blue-600' },
  { name: 'Password Generator', icon: Key, href: '/tools/password-generator', color: 'from-indigo-500 to-indigo-600' },
  { name: 'Base64 Encoder', icon: FileText, href: '/tools/base64-encoder', color: 'from-purple-500 to-purple-600' },
  { name: 'Color Picker', icon: Palette, href: '/tools/color-picker', color: 'from-pink-500 to-pink-600' },
  { name: 'Hash Generator', icon: Shield, href: '/tools/hash-generator', color: 'from-slate-500 to-slate-600' },
  { name: 'UUID Generator', icon: Shuffle, href: '/tools/uuid-generator', color: 'from-lime-600 to-lime-700' },
  { name: 'Word Counter', icon: Hash, href: '/tools/word-counter', color: 'from-teal-500 to-teal-600' },
  { name: 'Meta Tag Generator', icon: Globe, href: '/tools/meta-tag-generator', color: 'from-rose-500 to-rose-600' },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 lg:py-32">
        {/* Animated background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply opacity-30" style={{animation: 'float 8s ease-in-out infinite'}} />
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-30" style={{animation: 'float 10s ease-in-out infinite reverse'}} />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply opacity-30" style={{animation: 'float 12s ease-in-out infinite'}} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full px-5 py-2 mb-8 text-sm font-medium text-blue-700 shadow-sm" style={{animation: 'fadeInDown 0.6s ease-out'}}>
            <Sparkles className="w-4 h-4" />
            16+ Free Developer Tools — No Login Required
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight" style={{animation: 'fadeInUp 0.8s ease-out'}}>
            Build Faster with<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              WebToolkit Pro
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-3xl mx-auto leading-relaxed" style={{animation: 'fadeInUp 1s ease-out'}}>
            Premium online tools for web developers and designers. 
            Format JSON, generate passwords, encode data, pick colors — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{animation: 'fadeInUp 1.2s ease-out'}}>
            <Link 
              href="/tools"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore All Tools <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-bold text-lg border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Free Tools', value: '16+', icon: Zap },
            { label: 'Monthly Users', value: '5K+', icon: Users },
            { label: 'Star Rating', value: '4.9', icon: Star },
            { label: 'Lines of Code', value: '10K+', icon: Code },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <stat.icon className="w-6 h-6 text-blue-600 mb-2" />
              <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Space */}
      <div className="py-6 bg-gray-50">
        <div className="max-w-3xl mx-auto h-[90px] bg-white border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
          Ad Space — Leaderboard 728×90
        </div>
      </div>

      {/* Featured Tools */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Popular Tools</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">Hand-picked developer essentials used by thousands</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool, i) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
                style={{animation: `fadeInUp ${0.3 + i * 0.1}s ease-out`}}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{tool.name}</h3>
                <span className="text-sm text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Try it free →
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:gap-3 transition-all">
              View All 16+ Tools <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <div className="py-6 bg-gray-50">
        <div className="max-w-3xl mx-auto h-[250px] bg-white border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
          Ad Space — Large Rectangle 336×280
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Why Developers Love Us</h2>
          <p className="text-lg text-gray-500 mb-16 max-w-xl mx-auto">Designed for speed, built for professionals</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Lightning Fast', desc: 'All tools run client-side. Zero server delays. Instant results.', emoji: '⚡' },
              { title: '100% Free', desc: 'No hidden paywalls, no sign-ups, no usage limits. Ever.', emoji: '🎁' },
              { title: 'Privacy First', desc: 'Your data never leaves your browser. Nothing is stored or sent.', emoji: '🔒' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <div className="text-5xl mb-6">{item.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-4">Ready to Boost Your Workflow?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of developers who use WebToolkit Pro every day.
          </p>
          <Link href="/tools" className="inline-flex items-center gap-2 bg-white text-blue-700 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            Get Started — It&apos;s Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}