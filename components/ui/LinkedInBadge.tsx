'use client'

import React from 'react'
import { Linkedin, ExternalLink } from 'lucide-react'

interface LinkedInBadgeProps {
  vanity: string
  profileUrl: string
  displayName?: string
}

export default function LinkedInBadge({ vanity, profileUrl, displayName = 'Abu Sufyan' }: LinkedInBadgeProps) {
  return (
    <a
      href={`${profileUrl}?trk=wtkpro-author`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full bg-white dark:bg-[#0D1526] rounded-[16px] border border-gray-100 dark:border-[#1E2D47] shadow-sm hover:border-[#0094FF]/40 hover:shadow-md transition-all duration-300 overflow-hidden relative"
    >
      {/* Background Banner */}
      <div className="h-20 w-full bg-gradient-to-r from-[#0077B5] to-[#0094FF] relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
      </div>
      
      {/* Profile Section */}
      <div className="px-6 pb-6 relative">
        {/* Avatar Placeholder / Icon */}
        <div className="w-16 h-16 rounded-full bg-white dark:bg-[#0D1526] p-1.5 absolute -top-8 left-6 border border-gray-100 dark:border-[#1E2D47] shadow-sm">
          <div className="w-full h-full bg-[#0077B5]/10 rounded-full flex items-center justify-center text-[#0077B5]">
            <Linkedin className="w-6 h-6" fill="currentColor" />
          </div>
        </div>
        
        {/* External Link Icon */}
        <div className="absolute top-4 right-4">
          <ExternalLink className="w-4 h-4 text-gray-300 dark:text-[#4A6080] group-hover:text-[#0094FF] transition-colors" />
        </div>

        {/* Text Content */}
        <div className="pt-10">
          <h4 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#0094FF] transition-colors leading-tight">
            {displayName}
          </h4>
          <p className="text-xs text-gray-500 dark:text-[#8A9BBE] mt-1 mb-4 font-medium">
            View full professional profile and connect on LinkedIn.
          </p>
          
          {/* View Profile Button */}
          <div className="w-full py-2.5 bg-[#0077B5]/5 hover:bg-[#0077B5]/10 text-[#0077B5] dark:text-[#0094FF] text-xs font-bold text-center rounded-lg transition-colors border border-[#0077B5]/10">
            View Profile
          </div>
        </div>
      </div>
    </a>
  )
}
