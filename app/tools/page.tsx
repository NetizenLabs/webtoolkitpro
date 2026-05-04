import React from 'react'
import Link from 'next/link'
import { 
  FileJson, 
  Key, 
  FileText, 
  Link as LinkIcon, 
  AlignLeft, 
  Palette 
} from 'lucide-react'

const tools = [
  {
    name: 'JSON Formatter',
    description: 'Clean, format, and validate JSON data',
    icon: FileJson,
    href: '/tools/json-formatter',
    color: 'bg-blue-600'
  },
  {
    name: 'Password Generator',
    description: 'Create secure, random passwords',
    icon: Key,
    href: '/tools/password-generator',
    color: 'bg-indigo-600'
  },
  {
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings',
    icon: FileText,
    href: '/tools/base64-encoder',
    color: 'bg-purple-600'
  },
  {
    name: 'URL Encoder/Decoder',
    description: 'Safe URL encoding and decoding',
    icon: LinkIcon,
    href: '/tools/url-encoder',
    color: 'bg-emerald-600'
  },
  {
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text',
    icon: AlignLeft,
    href: '/tools/lorem-ipsum',
    color: 'bg-orange-600'
  },
  {
    name: 'Color Picker',
    description: 'Pick colors and get values',
    icon: Palette,
    href: '/tools/color-picker',
    color: 'bg-pink-600'
  }
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
          Developer Tools
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          A comprehensive collection of free online tools and utilities for web developers
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link 
              key={tool.href}
              href={tool.href}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {tool.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {tool.description}
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                Open Tool
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}