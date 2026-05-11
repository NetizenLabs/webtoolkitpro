import React from 'react'

interface LogoProps {
  className?: string
  iconOnly?: boolean
  light?: boolean
}

export default function Logo({ className = '', iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-[12px] ${className}`}>
      <div 
        className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center shrink-0"
        style={{ background: 'linear-gradient(135deg, #00D4B4 0%, #0094FF 100%)' }}
      >
        <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 8 L8 22 L12 13 L16 22 L20 8" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="22" y1="11" x2="27" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85"/>
          <line x1="22.5" y1="16" x2="27" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
          <line x1="23" y1="21" x2="27" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.35"/>
        </svg>
      </div>
      {!iconOnly && (
        <div className="flex flex-col leading-[1]">
          <span className="text-[22px] font-bold tracking-[-0.025em] text-gray-900 dark:text-white">
            WebToolkit
          </span>
          <span className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-blue-600 dark:text-[#00D4B4] mt-[3px]">
            PRO
          </span>
        </div>
      )}
    </div>
  )
}
