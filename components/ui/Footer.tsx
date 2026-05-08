import React from 'react'
import Link from 'next/link'
import { Box, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 pt-16 pb-8 border-t border-slate-900">
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
            <h3 className="text-white font-bold mb-6">Popular Tools</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/tools/json-formatter/" className="hover:text-blue-400 transition-colors">JSON Formatter</Link></li>
              <li><Link href="/tools/password-generator/" className="hover:text-blue-400 transition-colors">Password Generator</Link></li>
              <li><Link href="/tools/base64-encoder/" className="hover:text-blue-400 transition-colors">Base64 Encoder</Link></li>
              <li><Link href="/tools/url-encoder/" className="hover:text-blue-400 transition-colors">URL Encoder</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Company</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about/" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/blog/" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link href="/submit-tool/" className="hover:text-blue-400 transition-colors">Submit a Tool</Link></li>
              <li><Link href="/contact/" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Join the Community</h4>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Get the latest tools and technical SEO updates in your inbox.
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="email@example.com"
                aria-label="Email Address for Newsletter"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-blue-900/20">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500">
            <span>&copy; {new Date().getFullYear()} WebToolkit Pro.</span>
            <Link href="/privacy/" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms/" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/disclaimer/" className="hover:text-white transition-colors">DMCA</Link>
            <Link href="/press-kit.md" className="hover:text-white transition-colors">Press Kit</Link>
          </div>
          <div className="flex gap-6">
            <Link 
              href="https://github.com/abusufyan-netizen/webtoolkitpro" 
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link 
              href="#" 
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="Twitter Profile"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link 
              href="/contact/" 
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="Contact Email"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}