import React from 'react'

interface SectionHeadingProps {
  number: string
  title: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function SectionHeading({ number, title, className = '', as: Tag = 'h2' }: SectionHeadingProps) {
  return (
    <div className={`flex items-center gap-4 mb-12 ${className}`}>
      <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-bold text-[#00D4B4] font-mono tracking-widest">
        {number}
      </span>
      <Tag className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </Tag>
      <div className="flex-grow h-px bg-border"></div>
    </div>
  )
}
