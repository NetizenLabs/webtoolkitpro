'use client'

import React from 'react'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Finally a tool site that doesn't upload my data to some random server. The JSON formatter handles 10MB payloads instantly. This is how dev tools should work.",
    name: 'Marcus R.',
    handle: '@marcus_devs',
    role: 'Senior Backend Engineer',
    avatar: 'MR',
    color: 'from-teal-500 to-blue-500',
  },
  {
    quote: "I use the JWT decoder and regex tester daily. Zero latency, no sign-up. It's the kind of tool you bookmark and never close.",
    name: 'Priya K.',
    handle: '@priya_fullstack',
    role: 'Full-Stack Developer',
    avatar: 'PK',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    quote: "WTKPro's password generator and hash tools are the only ones I trust for client work. Client-side only means I can recommend it to enterprise clients without worrying.",
    name: 'James T.',
    handle: '@jthomasdev',
    role: 'Security Consultant',
    avatar: 'JT',
    color: 'from-emerald-500 to-teal-500',
  },
]

export default function SocialProof() {
  return (
    <section className="py-20 bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 dark:bg-[#00D4B4]/10 text-teal-700 dark:text-[#00D4B4] text-[10px] font-bold font-mono uppercase tracking-[0.2em] rounded-full mb-5 border border-teal-200 dark:border-[#00D4B4]/20">
            Developer Community
          </span>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Trusted by Developers
          </h2>
          <p className="mt-3 text-sm text-gray-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
            Engineers, consultants, and full-stack devs rely on WTKPro daily for privacy-first tooling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.handle}
              className="relative bg-white dark:bg-[#0D1526] rounded-[28px] border border-gray-100 dark:border-[#1E2D47] p-8 hover:border-[#00D4B4]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Decorative quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-10 h-10 text-[#00D4B4]" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed font-medium mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center shrink-0`}>
                  <span className="text-xs font-black text-white">{t.avatar}</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-sm">{t.name}</div>
                  <div className="text-[10px] text-gray-400 dark:text-[#4A6080] font-mono">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-[10px] text-gray-400 dark:text-[#4A6080] font-mono uppercase tracking-widest">
          ✦ Leave your experience on{' '}
          <a
            href="https://www.producthunt.com/products/webtoolkit-pro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00D4B4] hover:underline"
          >
            Product Hunt
          </a>
          {' '}or{' '}
          <a
            href="https://dev.to/abusufyan909"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00D4B4] hover:underline"
          >
            DEV Community
          </a>
        </p>
      </div>
    </section>
  )
}
