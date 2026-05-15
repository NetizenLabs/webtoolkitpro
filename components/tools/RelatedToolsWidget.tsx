'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ToolCard {
  href: string
  name: string
  desc: string
  icon: string
  badge?: string
}

interface RelatedToolsWidgetProps {
  featured: ToolCard
  cards: ToolCard[]
  pills: { name: string; href: string }[]
}

export default function RelatedToolsWidget({ featured, cards, pills }: RelatedToolsWidgetProps) {
  return (
    <section className="wt-related" aria-label="Related tools">
      <div className="wt-related__header">
        <span className="wt-related__title">You might also need</span>
        <Link className="wt-related__all" href="/tools/">
          View all tools <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="wt-related__grid">
        {/* Featured Card */}
        <Link className="wt-related__card wt-related__card--featured" href={featured.href}>
          <div className="wt-related__icon">{featured.icon}</div>
          <div>
            <div className="wt-related__name">{featured.name}</div>
            <div className="wt-related__desc">{featured.desc}</div>
          </div>
          {featured.badge && <span className="wt-related__badge">{featured.badge}</span>}
        </Link>

        {/* Other Cards */}
        {cards.map((card, idx) => (
          <Link key={idx} className="wt-related__card" href={card.href}>
            <div className="wt-related__icon">{card.icon}</div>
            <div>
              <div className="wt-related__name">{card.name}</div>
              <div className="wt-related__desc">{card.desc}</div>
            </div>
            {card.badge && <span className="wt-related__badge">{card.badge}</span>}
          </Link>
        ))}
      </div>

      <div className="wt-related__divider"></div>

      <div className="wt-related__also-label">More tools in this category</div>
      <div className="wt-related__pills">
        {pills.map((pill, idx) => (
          <Link key={idx} className="wt-related__pill" href={pill.href}>
            {pill.name}
          </Link>
        ))}
      </div>

      <style jsx>{`
        .wt-related { margin: 3rem 0 2rem; }
        .wt-related__header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 1rem; }
        .wt-related__title { font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: .07em; }
        .wt-related__all { font-size: 12px; color: #9ca3af; text-decoration: none; display: flex; align-items: center; gap: 4px; transition: color .15s; }
        .wt-related__all:hover { color: #374151; }
        .wt-related__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
        .wt-related__card { display: flex; flex-direction: column; gap: 8px; padding: 14px 16px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; text-decoration: none; color: inherit; transition: border-color .15s, box-shadow .15s; position: relative; }
        .wt-related__card:hover { border-color: #d1d5db; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
        .wt-related__card--featured { border-color: #3b82f6; border-width: 1.5px; }
        .wt-related__icon { width: 34px; height: 34px; border-radius: 8px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; font-size: 18px; }
        .wt-related__card--featured .wt-related__icon { background: #eff6ff; }
        .wt-related__name { font-size: 13px; font-weight: 600; color: #111827; line-height: 1.35; }
        .wt-related__desc { font-size: 12px; color: #9ca3af; line-height: 1.5; }
        .wt-related__badge { display: inline-flex; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 6px; background: #eff6ff; color: #2563eb; align-self: flex-start; }
        .wt-related__divider { height: 1px; background: #f3f4f6; margin: 1.75rem 0 1.25rem; }
        .wt-related__also-label { font-size: 13px; font-weight: 600; color: #6b7280; margin-bottom: .65rem; }
        .wt-related__pills { display: flex; flex-wrap: wrap; gap: 6px; }
        .wt-related__pill { font-size: 12px; padding: 4px 12px; border: 1px solid #e5e7eb; border-radius: 999px; color: #6b7280; text-decoration: none; background: #fff; transition: all .15s; }
        .wt-related__pill:hover { border-color: #d1d5db; color: #111827; background: #f9fafb; }

        /* Dark mode */
        :global(.dark) .wt-related__card { background: #1f2937; border-color: #374151; }
        :global(.dark) .wt-related__card:hover { border-color: #4b5563; }
        :global(.dark) .wt-related__card--featured { border-color: #3b82f6; }
        :global(.dark) .wt-related__icon { background: #374151; }
        :global(.dark) .wt-related__card--featured .wt-related__icon { background: #1e3a5f; }
        :global(.dark) .wt-related__name { color: #f9fafb; }
        :global(.dark) .wt-related__desc { color: #6b7280; }
        :global(.dark) .wt-related__badge { background: #1e3a5f; color: #60a5fa; }
        :global(.dark) .wt-related__divider { background: #374151; }
        :global(.dark) .wt-related__pill { background: #1f2937; border-color: #374151; color: #9ca3af; }
        :global(.dark) .wt-related__pill:hover { border-color: #4b5563; color: #f9fafb; background: #374151; }
        :global(.dark) .wt-related__all { color: #6b7280; }
        :global(.dark) .wt-related__all:hover { color: #d1d5db; }
      `}</style>
    </section>
  )
}
