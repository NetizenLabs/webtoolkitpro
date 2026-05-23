"use client";

import React from 'react';
import Link from 'next/link';
import { Star, Clock } from 'lucide-react';
import { usePersonalization } from '@/hooks/usePersonalization';
import DynamicIcon from '@/components/ui/DynamicIcon';

interface DashboardProps {
  allTools: {
    name: string;
    slug: string;
    icon?: string;
  }[];
}

export default function PersonalizationDashboard({ allTools }: DashboardProps) {
  const { favorites, recents, isLoaded } = usePersonalization();

  if (!isLoaded || (favorites.length === 0 && recents.length === 0)) return null;

  // Map slugs to full tool objects
  const favTools = favorites.map(slug => allTools.find(t => t.slug === slug)).filter(Boolean);
  const recentTools = recents.map(slug => allTools.find(t => t.slug === slug)).filter(Boolean);

  return (
    <section className="py-8 bg-white dark:bg-[#0D1526] border-y border-gray-100 dark:border-[#1E2D47]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {favTools.length > 0 && (
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Favorites
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {favTools.map((t: any) => (
                  <Link key={`fav-${t.slug}`} href={`/tools/${t.slug}/`} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#1E2D47] rounded-xl hover:bg-[#00D4B4]/10 transition-colors group">
                    <DynamicIcon name={t.icon || 'Zap'} className="w-4 h-4 text-gray-500 dark:text-[#8A9BBE] group-hover:text-[#00D4B4]" />
                    <span className="text-sm font-medium text-gray-700 dark:text-[#F0F6FF] group-hover:text-[#00D4B4] truncate">{t.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {recentTools.length > 0 && (
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" /> Recently Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {recentTools.map((t: any) => (
                  <Link key={`rec-${t.slug}`} href={`/tools/${t.slug}/`} className="px-4 py-2 bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-[#2A3F63] rounded-full text-xs font-medium text-gray-600 dark:text-[#8A9BBE] hover:border-[#00D4B4] hover:text-[#00D4B4] transition-colors flex items-center gap-2">
                    <DynamicIcon name={t.icon || 'Zap'} className="w-3 h-3" />
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
