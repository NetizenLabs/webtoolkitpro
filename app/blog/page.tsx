import React from 'react'
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Blog - WebToolkit Pro',
  description: 'Tips, tutorials, and guides for web developers. Learn about web development tools, best practices, and productivity hacks.',
}

const posts = [
  {
    slug: 'top-10-free-developer-tools-2026',
    title: 'Top 10 Free Developer Tools You Need in 2026',
    excerpt: 'Discover the most essential free online tools every web developer should bookmark this year.',
    date: 'May 4, 2026',
    category: 'Tools',
    readTime: '5 min read',
  },
  {
    slug: 'json-formatting-best-practices',
    title: 'JSON Formatting Best Practices for Clean APIs',
    excerpt: 'Learn how to structure, validate, and format JSON data for professional API development.',
    date: 'May 3, 2026',
    category: 'Tutorials',
    readTime: '7 min read',
  },
  {
    slug: 'password-security-guide',
    title: 'The Ultimate Guide to Password Security in 2026',
    excerpt: 'Everything you need to know about creating and managing strong passwords for maximum security.',
    date: 'May 2, 2026',
    category: 'Security',
    readTime: '8 min read',
  },
  {
    slug: 'seo-meta-tags-complete-guide',
    title: 'SEO Meta Tags: A Complete Guide for Developers',
    excerpt: 'Master the art of meta tags to boost your website ranking and drive organic traffic.',
    date: 'May 1, 2026',
    category: 'SEO',
    readTime: '10 min read',
  },
  {
    slug: 'css-units-explained',
    title: 'CSS Units Explained: px, rem, em, vh, vw — When to Use Each',
    excerpt: 'A deep dive into CSS units and when to use each one for responsive, accessible designs.',
    date: 'April 30, 2026',
    category: 'CSS',
    readTime: '6 min read',
  },
  {
    slug: 'base64-encoding-use-cases',
    title: 'Base64 Encoding: What It Is and When to Use It',
    excerpt: 'Understand Base64 encoding, its real-world use cases, and common pitfalls to avoid.',
    date: 'April 28, 2026',
    category: 'Tutorials',
    readTime: '5 min read',
  },
]

const categoryColors: { [k: string]: string } = {
  'Tools': 'bg-blue-100 text-blue-700',
  'Tutorials': 'bg-purple-100 text-purple-700',
  'Security': 'bg-red-100 text-red-700',
  'SEO': 'bg-green-100 text-green-700',
  'CSS': 'bg-orange-100 text-orange-700',
}

export default function BlogPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Developer Blog</h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">Tips, tutorials, and guides to level up your web development workflow</p>
        </div>

        {/* Ad */}
        <div className="max-w-3xl mx-auto mb-12 h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space — Leaderboard 728×90</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-500 mb-4 leading-relaxed">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{post.date}</span>
                <span className="text-sm font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Ad */}
        <div className="max-w-3xl mx-auto mt-16 h-[250px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space — Large Rectangle</div>
      </div>
    </div>
  )
}
