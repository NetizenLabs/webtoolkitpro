'use client'

import React from 'react'
import Link from '@/components/ui/NativeLink';
import { BookOpen, ArrowRight, Zap } from 'lucide-react'
import { BlogPost } from '@/lib/blog'

interface FurtherReadingProps {
  posts: BlogPost[]
}

export default function FurtherReading({ posts }: FurtherReadingProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Further Reading</h2>
          <p className="text-sm text-muted-foreground">Expert guides and technical research related to this tool.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <article className="bg-background dark:bg-elevated border border-border p-6 rounded-[20px] hover:border-[#00D4B4]/30 transition-all h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#00D4B4]/10 text-[#00D4B4] rounded-full border border-[#00D4B4]/20 uppercase tracking-widest font-mono">
                  {post.category}
                </span>
                <span className="text-[10px] font-mono font-bold text-muted-foreground/50 uppercase tracking-widest">
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-[#00D4B4] transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6 line-clamp-2 flex-grow">
                {post.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <span className="text-[10px] font-bold text-[#00D4B4] flex items-center gap-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  Read Full Post <ArrowRight className="w-3 h-3" />
                </span>
                <Zap className="w-3 h-3 text-border group-hover:text-[#00D4B4] transition-colors" fill="currentColor" />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
