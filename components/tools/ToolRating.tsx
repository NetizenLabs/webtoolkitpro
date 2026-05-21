'use client'

import React, { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

interface ToolRatingProps {
  toolName: string
  slug: string
}

export default function ToolRating({ toolName, slug }: ToolRatingProps) {
  const [hasVoted, setHasVoted] = useState(false)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const voted = localStorage.getItem(`wtkpro_rating_${slug}`)
      if (voted) setHasVoted(true)
    }
  }, [slug])

  const handleVote = (rating: number) => {
    if (hasVoted) return
    setHasVoted(true)
    localStorage.setItem(`wtkpro_rating_${slug}`, rating.toString())
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4 text-sm" aria-label={`Rating for ${toolName}`}>
      <div className="flex items-center gap-1" onMouseLeave={() => setHoveredStar(null)}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = hoveredStar !== null ? star <= hoveredStar : (hasVoted ? star <= 5 : false);

          return (
            <button
              key={star}
              onClick={() => handleVote(star)}
              onMouseEnter={() => setHoveredStar(star)}
              disabled={hasVoted}
              className={`transition-all ${hasVoted ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
              aria-label={`Rate ${star} stars`}
            >
              <Star 
                className={`w-5 h-5 ${
                  isFilled ? 'fill-amber-400 text-amber-400' : 
                  'fill-transparent text-gray-300 dark:text-gray-600'
                }`} 
              />
            </button>
          )
        })}
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-900 dark:text-white">{hasVoted ? '5.0' : '0.0'}</span>
        <span className="text-gray-500 dark:text-[#8A9BBE]">
          ({hasVoted ? '1' : '0'} Reviews)
        </span>
        {hasVoted && (
          <span className="text-green-600 dark:text-green-400 text-xs font-medium ml-2 transition-opacity duration-300">
            Thanks for rating!
          </span>
        )}
      </div>
    </div>
  )
}
