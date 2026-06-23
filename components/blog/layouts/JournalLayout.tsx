import React from 'react'
import { Terminal, Clock, Code, Mail, ChevronRight, CheckCircle2 } from 'lucide-react'
import Link from '@/components/ui/NativeLink';
import RelatedToolsInline from '@/components/blog/RelatedToolsInline'
import BlogToolCTA from '@/components/blog/BlogToolCTA'
import AdSlot from '@/components/ads/AdSlot'
import { BlogPost } from '@/lib/blog'

interface JournalLayoutProps {
  post: BlogPost
  allPosts: BlogPost[]
  relatedPosts: BlogPost[]
  relatedTools: any[]
  toolCTA: any
  formattedDate: string
  formattedLastUpdated: string
  categoryColors: { [k: string]: string }
}

export default function JournalLayout({
  post,
  allPosts,
  relatedPosts,
  relatedTools,
  toolCTA,
  formattedDate,
  formattedLastUpdated,
  categoryColors
}: JournalLayoutProps) {
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" precedence="default" />
      <article className="min-h-screen bg-[#050B14] text-[#E2E8F0]">
        
        {/* Terminal Header */}
        <header className="border-b border-[#1E2D47] bg-[#0A1120] pt-24 pb-16 px-6 lg:px-12 relative overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E2D47_1px,transparent_1px),linear-gradient(to_bottom,#1E2D47_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <Terminal className="w-5 h-5 text-[#00D4B4]" />
              <span className="text-[11px] font-mono font-bold text-[#00D4B4] uppercase tracking-widest bg-[#00D4B4]/10 px-3 py-1 rounded border border-[#00D4B4]/20">
                SYSTEM LOG // {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight font-mono">
              <span className="text-muted-foreground mr-4 select-none">&gt;</span>
              {post.title}
            </h1>

            <p className="text-xl md:text-2xl text-[#8A9BBE] leading-relaxed max-w-3xl mb-10 font-medium">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono font-bold uppercase tracking-widest text-[#4A6080]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00D4B4]" /> {post.readTime}
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-[#1E2D47]" />
              <div>EXEC: {formattedDate}</div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-[#1E2D47]" />
              <div>AUTHOR: {post.author}</div>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
          
          {/* Executive TLDR */}
          {post.tldr && (
            <div className="mb-16 border-l-4 border-[#00D4B4] bg-[#00D4B4]/5 p-8 rounded-r-xl">
              <div className="text-[10px] font-mono font-bold text-[#00D4B4] uppercase tracking-widest mb-4 flex items-center gap-2">
                <Code className="w-4 h-4" /> ABSTRACT_SUMMARY
              </div>
              <p className="text-xl text-white font-medium leading-relaxed italic">
                &quot;{post.tldr}&quot;
              </p>
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose prose-lg prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-white prose-headings:font-mono prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:pt-8 prose-h2:border-t prose-h2:border-[#1E2D47] prose-h2:flex prose-h2:items-center prose-h2:gap-3
              prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-[#00D4B4]
              prose-p:text-[#8A9BBE] prose-p:leading-[1.8] prose-p:mb-8
              prose-a:text-[#00D4B4] prose-a:font-bold prose-a:underline prose-a:decoration-[#00D4B4]/30 hover:prose-a:decoration-[#00D4B4]
              prose-strong:text-white prose-strong:font-bold
              prose-code:bg-[#0A1120] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-[#0094FF] prose-code:border prose-code:border-[#1E2D47] prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0A1120] prose-pre:text-[#E2E8F0] prose-pre:rounded-xl prose-pre:border prose-pre:border-[#1E2D47] prose-pre:p-6 prose-pre:shadow-2xl
              prose-ul:text-[#8A9BBE] prose-ol:text-[#8A9BBE]
              prose-li:mb-3 prose-li:marker:text-[#00D4B4]
              prose-blockquote:border-l-[#0094FF] prose-blockquote:bg-[#0094FF]/5 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-white
              prose-img:rounded-xl prose-img:border prose-img:border-[#1E2D47] prose-img:shadow-2xl"
            dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
          />

          {/* Expert Technical Directives */}
          {post.expertTips && post.expertTips.length > 0 && (
            <div className="mt-20 border border-[#1E2D47] bg-[#0A1120] rounded-xl overflow-hidden">
              <div className="bg-[#1E2D47]/30 px-6 py-4 border-b border-[#1E2D47] flex items-center gap-3">
                <Terminal className="w-5 h-5 text-[#0094FF]" />
                <h3 className="text-sm font-mono font-bold text-white tracking-widest uppercase">Implementation Directives</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {post.expertTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-[#00D4B4] shrink-0 mt-0.5" />
                      <span className="text-[#8A9BBE] leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ── PRIMARY TOOL CTA (blog → tool conversion) ── */}
          <div className="mt-20">
            <BlogToolCTA cta={toolCTA} />
          </div>

          <RelatedToolsInline tools={relatedTools} />

          {/* Footer Author Terminal */}
          <div className="mt-24 pt-12 border-t border-[#1E2D47]">
            <div className="flex flex-wrap gap-3 mb-12">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0A1120] text-[#00D4B4] px-3 py-1.5 rounded border border-[#1E2D47]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="bg-[#0A1120] border border-[#1E2D47] p-8 rounded-xl font-mono">
              <div className="text-[10px] text-[#4A6080] uppercase tracking-widest mb-6">SysAdmin Identity Verified</div>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded bg-[#1E2D47] flex items-center justify-center text-white text-xl font-bold shrink-0">
                  {post.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{post.author}</h3>
                  <p className="text-sm text-[#8A9BBE] leading-relaxed max-w-lg mb-4">
                    Specialist in distributed systems architecture, V8 performance benchmarking, and cryptographic implementations.
                  </p>
                  <a href="mailto:contact@wtkpro.site" className="text-xs text-[#00D4B4] hover:underline flex items-center gap-2">
                    <Mail className="w-4 h-4" /> PING AUTHOR
                  </a>
                </div>
              </div>
            </div>
          </div>

          <AdSlot minHeight="250px" className="mt-16" />
        </div>
      </article>
    </>
  )
}
