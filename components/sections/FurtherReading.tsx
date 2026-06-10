'use client'

import React from 'react'
import Link from '@/components/ui/NativeLink';
import { BookOpen, ArrowRight, Zap, Wrench } from 'lucide-react'
import { BlogPost } from '@/lib/blog'
import { ToolConfig } from '@/types/tool'
import DynamicIcon from '@/components/ui/DynamicIcon'

interface FurtherReadingProps {
  posts: BlogPost[]
  tools?: ToolConfig[]
}

export default function FurtherReading({ posts, tools }: FurtherReadingProps) {
  if (posts.length === 0 && (!tools || tools.length === 0)) return null

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

      {tools && tools.length > 0 && (
        <div className="mt-12 pt-12 border-t border-border/30">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-[#00D4B4]/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-[#00D4B4]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground tracking-tight">Related Developer Tools</h3>
              <p className="text-sm text-muted-foreground">Free, client-side utilities related to this topic.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link 
                key={tool.slug} 
                href={`/tools/${tool.slug}/`}
                className="group flex flex-col p-6 bg-background dark:bg-elevated border border-border rounded-[20px] hover:border-[#00D4B4]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <DynamicIcon name={tool.icon || 'Zap'} className="w-4 h-4 text-foreground group-hover:text-[#00D4B4]" />
                  </div>
                  <h4 className="font-bold text-foreground text-sm group-hover:text-[#00D4B4] transition-colors">{tool.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed flex-grow line-clamp-2 mb-4 font-medium">
                  {tool.content?.description || tool.function?.primary}
                </p>
                <div className="flex items-center justify-between text-[10px] font-bold mt-auto">
                  <span className="text-muted-foreground/60 uppercase tracking-widest">{tool.category}</span>
                  <span className="text-[#00D4B4] uppercase tracking-widest flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    Try the tool <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
