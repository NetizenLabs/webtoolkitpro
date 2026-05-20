'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Zap, Shield, Clock, Code, BookOpen, Activity } from 'lucide-react'

interface StatItem {
  label: string
  value: string
  numericTarget?: number
  suffix?: string
  icon: React.ElementType
  color: string
  live?: boolean
}

const statItems: StatItem[] = [
  { label: 'Tools Live', value: '150+', numericTarget: 150, suffix: '+', icon: Zap, color: 'text-[#00D4B4]', live: true },
  { label: 'Data Privacy', value: '100%', numericTarget: 100, suffix: '%', icon: Shield, color: 'text-blue-500' },
  { label: 'Avg Latency', value: '<1ms', icon: Clock, color: 'text-emerald-500', live: true },
  { label: 'Open Source', value: 'Verified', icon: Code, color: 'text-purple-500' },
  { label: 'Blog Posts', value: '30+', numericTarget: 30, suffix: '+', icon: BookOpen, color: 'text-amber-500' },
  { label: 'Uptime', value: '99.99%', numericTarget: 99, suffix: '.99%', icon: Activity, color: 'text-rose-500', live: true },
]

function useCountUp(target: number, duration = 1400, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])

  return count
}

function StatCard({ stat, active }: { stat: StatItem; active: boolean }) {
  const count = useCountUp(stat.numericTarget ?? 0, 1400, active && !!stat.numericTarget)

  const displayValue =
    stat.numericTarget !== undefined
      ? `${count}${stat.suffix ?? ''}`
      : stat.value

  return (
    <div className="flex flex-col items-center group relative">
      {/* Live pulse */}
      {stat.live && (
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4B4] opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00D4B4]" />
        </span>
      )}

      <stat.icon className={`w-6 h-6 ${stat.color} mb-2 transition-transform group-hover:scale-110`} />
      <div className="text-2xl md:text-3xl font-black text-foreground leading-none mb-1 tabular-nums">
        {displayValue}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</div>
    </div>
  )
}

export default function StatsDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-[var(--space-md)] bg-background border-b border-border relative overflow-hidden">
      {/* Subtle animated glow strip */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-16 bg-gradient-to-r from-[#00D4B4]/5 via-blue-500/5 to-[#0094FF]/5 blur-3xl rounded-full" />
      </div>
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 text-center">
          {statItems.map((stat) => (
            <StatCard key={stat.label} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
