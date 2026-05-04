import React from 'react'
import Link from 'next/link'
import { Box, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Box className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                WebToolkit<span className="text-blue-500">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium online tools for web developers and designers. 
              Always free, always professional.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Popular Tools</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/tools/json-formatter" className="hover:text-blue-400 transition-colors">JSON Formatter</Link></li>
              <li><Link href="/tools/password-generator" className="hover:text-blue-400 transition-colors">Password Generator</Link></li>
              <li><Link href="/tools/base64-encoder" className="hover:text-blue-400 transition-colors">Base64 Encoder</Link></li>
              <li><Link href="/tools/url-encoder" className="hover:text-blue-400 transition-colors">URL Encoder</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-blue-400 transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} WebToolkit Pro. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}