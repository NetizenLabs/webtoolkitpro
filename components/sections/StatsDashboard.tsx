import React from 'react'
import { Zap, Users, Star, Code } from 'lucide-react'
import { getGlobalStats } from '@/lib/stats'

export default async function StatsDashboard() {
  const stats = await getGlobalStats()

  const statItems = [
    { label: 'Tools Available', value: '40+', icon: Zap },
    { label: 'Early Adopters', value: 'Verified', icon: Users },
    { label: 'Tools Run', value: '250+', icon: Star },
    { label: 'Client-Side', value: '100%', icon: Code },
  ]

  return (
    <section className="py-[var(--space-md)] bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {statItems.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center group">
            <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2 transition-transform group-hover:scale-110" />
            <div className="text-[var(--font-size-2xl)] font-black text-gray-900 dark:text-white leading-none mb-1 min-h-[1em] flex items-center justify-center">
              {stat.value}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-slate-500 font-bold">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
