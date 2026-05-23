"use client";

import React, { useEffect } from 'react';
import { Star } from 'lucide-react';
import { usePersonalization } from '@/hooks/usePersonalization';

interface Props {
  slug: string;
  name: string;
}

export default function ToolPersonalizationClient({ slug, name }: Props) {
  const { favorites, toggleFavorite, addRecent, isLoaded } = usePersonalization();

  // Track as recently used on mount
  useEffect(() => {
    addRecent(slug);
  }, [slug, addRecent]);

  if (!isLoaded) return <div className="w-8 h-8" />; // placeholder

  const isFav = favorites.includes(slug);

  return (
    <button
      onClick={() => toggleFavorite(slug)}
      title={isFav ? `Remove ${name} from Favorites` : `Add ${name} to Favorites`}
      className={`p-2 rounded-lg border transition-all ${
        isFav 
          ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700/50 text-yellow-600 dark:text-yellow-500' 
          : 'bg-white dark:bg-[#0D1526] border-gray-200 dark:border-[#1E2D47] text-gray-400 dark:text-[#5B719E] hover:border-yellow-300 hover:text-yellow-500'
      }`}
    >
      <Star className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
    </button>
  );
}
