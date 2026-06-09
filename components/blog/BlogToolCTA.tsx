import React from 'react'
import Link from '@/components/ui/NativeLink'
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react'
import type { ToolCTA } from '@/lib/blog-tool-cta-map'

interface BlogToolCTAProps {
  cta: ToolCTA
}

/**
 * BlogToolCTA — the primary conversion bridge between a blog article and its
 * most relevant WTKPro tool. Placed right after the article body, before tags.
 *
 * Design rationale (Emil Kowalski principles):
 * - Single focused action — no choice paralysis
 * - Gradient border draws the eye without being garish
 * - "Free, private, instant" signals remove every objection
 * - Arrow animates on hover (translate + opacity) for affordance
 */
export default function BlogToolCTA({ cta }: BlogToolCTAProps) {
  const href = cta.slug ? `/tools/${cta.slug}/` : '/tools/'

  return (
    <div className="my-20 p-[1.5px] rounded-[20px] bg-gradient-to-r from-[#00D4B4]/60 via-[#0094FF]/40 to-indigo-500/30">
      <div className="bg-background rounded-[18.5px] p-8 md:p-10 relative overflow-hidden">

        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#00D4B4]/6 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#0094FF]/5 blur-3xl"
        />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">

          {/* Left: icon + text */}
          <div className="flex items-start gap-5 flex-grow min-w-0">
            {/* Emoji badge */}
            <div className="shrink-0 w-14 h-14 rounded-[14px] bg-gradient-to-br from-[#00D4B4]/15 to-[#0094FF]/15 border border-[#00D4B4]/20 flex items-center justify-center text-2xl select-none">
              {cta.emoji}
            </div>

            <div className="min-w-0">
              {/* "Try the tool" label */}
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1.5 text-[10px] font-bold font-mono uppercase tracking-[0.18em] text-[#00D4B4]">
                  <Zap className="w-3 h-3" />
                  Try the tool
                </span>
                {cta.badge && (
                  <span className="text-[9px] font-bold font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#00D4B4]/10 text-[#00D4B4] border border-[#00D4B4]/20">
                    {cta.badge}
                  </span>
                )}
              </div>

              {/* Tool name */}
              <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight mb-2 leading-snug">
                {cta.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                {cta.description}
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground/50">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-[#00D4B4]/60" />
                  100% client-side
                </span>
                <span>·</span>
                <span>No sign-up</span>
                <span>·</span>
                <span>No data sent</span>
              </div>
            </div>
          </div>

          {/* Right: CTA button */}
          <div className="shrink-0 w-full md:w-auto">
            <Link
              href={href}
              className="group flex items-center justify-center gap-3 w-full md:w-auto px-7 py-4 rounded-[12px] bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] font-extrabold text-sm uppercase tracking-widest transition-all duration-200 hover:opacity-90 active:scale-[0.97] shadow-lg shadow-[#00D4B4]/20 hover:shadow-[#00D4B4]/30"
            >
              Open Tool Free
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <p className="text-center text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground/40 mt-3 md:text-right">
              wtkpro.site
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
