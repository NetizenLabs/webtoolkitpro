import React from 'react'
import Link from 'next/link'
import { Box, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-400 pt-[var(--space-lg)] pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <span className="text-2xl font-black text-white tracking-tighter">
                WebToolkit<span className="text-blue-500">Pro</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed font-medium">
              Premium online tools for web developers and designers. 
              Secure, fast, and professional-grade engineering utilities.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Popular Tools</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/tools/pinterest-downloader/" className="hover:text-blue-400 transition-colors">Pinterest Downloader</Link></li>
              <li><Link href="/tools/json-formatter/" className="hover:text-blue-400 transition-colors">JSON Formatter</Link></li>
              <li><Link href="/tools/what-is-my-ip/" className="hover:text-blue-400 transition-colors">What is my IP?</Link></li>
              <li><Link href="/tools/redirect-checker/" className="hover:text-blue-400 transition-colors">Redirect Checker</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Navigation</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/tools/" className="hover:text-blue-400 transition-colors">All Tools</Link></li>
              <li><Link href="/blog/" className="hover:text-blue-400 transition-colors">Technical Blog</Link></li>
              <li><Link href="/about/" className="hover:text-blue-400 transition-colors">Our Mission</Link></li>
              <li><Link href="/contact/" className="hover:text-blue-400 transition-colors">Get in Touch</Link></li>
            </ul>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Developer Newsletter</h4>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed font-medium">
              Get the latest tools and technical SEO updates in your inbox.
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="email@example.com"
                aria-label="Email Address for Newsletter"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-950/50">
                Join Now
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-600">
            <span>&copy; {new Date().getFullYear()} WebToolkit Pro.</span>
            <Link href="/privacy/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/disclaimer/" className="hover:text-white transition-colors">Legal Disclaimer</Link>
          </div>
          <div className="flex gap-8">
            <Link 
              href="https://github.com/webtoolkit-pro" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="GitHub Organization"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link 
              href="https://x.com/WebToolkitPro" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link 
              href="mailto:contact@wtkpro.site" 
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="Email Contact Support"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Global Legal Disclaimer */}
        <div className="mt-8 pt-8 border-t border-slate-900/50">
          <p className="text-[9px] text-gray-700 leading-relaxed text-center font-medium max-w-4xl mx-auto uppercase tracking-[0.05em]">
            Disclaimer: WebToolkit Pro is an independent resource for developers. All tools provided on this site are for informational and research purposes only. 
            We are not affiliated with any third-party services mentioned (including Pinterest, Google, or others). 
            All data processing occurs locally in your browser to ensure 100% privacy; we do not store your technical inputs. 
            By using this site, you agree that WebToolkit Pro is not liable for any technical issues, data loss, or search engine ranking changes 
            resulting from the use of our research or utilities.
          </p>
        </div>
      </div>
    </footer>
  )
}