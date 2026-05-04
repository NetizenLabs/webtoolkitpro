import React from 'react'
import Link from 'next/link'
import { 
  FileJson, Key, FileText, Link as LinkIcon, AlignLeft, Palette,
  Hash, Type, Clock, Binary, Shield, Code, Ruler, Shuffle, FileCode, Globe
} from 'lucide-react'

const tools = [
  { name: 'JSON Formatter', description: 'Clean, format, and validate JSON data instantly', icon: FileJson, href: '/tools/json-formatter', color: 'from-blue-500 to-blue-700' },
  { name: 'Password Generator', description: 'Create secure, random passwords with custom rules', icon: Key, href: '/tools/password-generator', color: 'from-indigo-500 to-indigo-700' },
  { name: 'Base64 Encoder', description: 'Encode and decode Base64 strings seamlessly', icon: FileText, href: '/tools/base64-encoder', color: 'from-purple-500 to-purple-700' },
  { name: 'URL Encoder', description: 'Safe URL encoding and decoding for web use', icon: LinkIcon, href: '/tools/url-encoder', color: 'from-emerald-500 to-emerald-700' },
  { name: 'Lorem Ipsum', description: 'Generate placeholder text for your designs', icon: AlignLeft, href: '/tools/lorem-ipsum', color: 'from-orange-500 to-orange-700' },
  { name: 'Color Picker', description: 'Pick colors and get HEX, RGB, HSL values', icon: Palette, href: '/tools/color-picker', color: 'from-pink-500 to-pink-700' },
  { name: 'Word Counter', description: 'Count words, characters, sentences, and paragraphs', icon: Hash, href: '/tools/word-counter', color: 'from-teal-500 to-teal-700' },
  { name: 'Case Converter', description: 'Convert text between uppercase, lowercase, title case', icon: Type, href: '/tools/case-converter', color: 'from-cyan-500 to-cyan-700' },
  { name: 'Timestamp Converter', description: 'Convert Unix timestamps to human-readable dates', icon: Clock, href: '/tools/timestamp-converter', color: 'from-amber-500 to-amber-700' },
  { name: 'Binary Converter', description: 'Convert between binary, decimal, hex, and octal', icon: Binary, href: '/tools/binary-converter', color: 'from-red-500 to-red-700' },
  { name: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256 hashes from text', icon: Shield, href: '/tools/hash-generator', color: 'from-slate-500 to-slate-700' },
  { name: 'HTML Encoder', description: 'Encode and decode HTML entities safely', icon: Code, href: '/tools/html-encoder', color: 'from-violet-500 to-violet-700' },
  { name: 'CSS Unit Converter', description: 'Convert between px, rem, em, vh, and vw units', icon: Ruler, href: '/tools/css-unit-converter', color: 'from-fuchsia-500 to-fuchsia-700' },
  { name: 'UUID Generator', description: 'Generate unique UUIDs/GUIDs instantly', icon: Shuffle, href: '/tools/uuid-generator', color: 'from-lime-600 to-lime-800' },
  { name: 'Markdown Previewer', description: 'Write Markdown and see live HTML preview', icon: FileCode, href: '/tools/markdown-previewer', color: 'from-sky-500 to-sky-700' },
  { name: 'Meta Tag Generator', description: 'Generate SEO meta tags for your website', icon: Globe, href: '/tools/meta-tag-generator', color: 'from-rose-500 to-rose-700' },
]

export default function ToolsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Developer Tools
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {tools.length} free, premium tools built for web developers and designers
          </p>
        </div>

        {/* Ad Placeholder */}
        <div className="max-w-3xl mx-auto mb-12 h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
          Ad Space — Leaderboard 728×90
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link 
              key={tool.href}
              href={tool.href}
              className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1.5">{tool.name}</h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{tool.description}</p>
              <span className="text-sm font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                Open Tool →
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom Ad */}
        <div className="max-w-3xl mx-auto mt-16 h-[250px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
          Ad Space — Medium Rectangle 300×250
        </div>
      </div>
    </div>
  )
}