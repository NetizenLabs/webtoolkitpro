import React from 'react'

interface SectionHeadingProps {
  number: string
  title: string
  className?: string
}

export default function SectionHeading({ number, title, className = '' }: SectionHeadingProps) {
  return (
    <div className={`flex items-center gap-4 mb-12 ${className}`}>
      <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-bold text-[#00D4B4] font-mono tracking-widest">
        {number}
      </span>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="flex-grow h-px bg-[#1E2D47]"></div>
    </div>
  )
}
