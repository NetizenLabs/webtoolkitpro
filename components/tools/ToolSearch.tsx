"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from '@/components/ui/NativeLink';
import { Search } from "lucide-react";
import DynamicIcon from "@/components/ui/DynamicIcon";

interface ToolSearchProps {
  tools: {
    name: string;
    slug: string;
    category: string;
    icon?: string;
    description?: string;
  }[];
}

export default function ToolSearch({ tools }: ToolSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd (Mac) or Ctrl (Windows/Linux) + the 'k' key
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); // Crucial: stops the browser's default behavior
        searchRef.current?.focus(); // Instantly focuses your input field
      }
      
      // Bonus: Clear the search and remove focus when the user presses 'Escape'
      if (e.key === 'Escape') {
        setQuery("");
        setIsOpen(false);
        searchRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTools = tools.filter((tool) => {
    if (!query) return false;
    const lowerQuery = query.toLowerCase();
    return (
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.category.toLowerCase().includes(lowerQuery) ||
      (tool.description && tool.description.toLowerCase().includes(lowerQuery))
    );
  }).slice(0, 8); // Limit to top 8 results

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-50">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search for formatting, converting, or encoding tools..."
          className="w-full p-4 pl-12 pr-20 text-lg bg-white dark:bg-[#0D1526] border border-gray-200 dark:border-[#1E2D47] rounded-xl focus:ring-2 focus:ring-[#00D4B4] focus:border-transparent outline-none text-gray-900 dark:text-white transition-all shadow-sm"
        />
        
        {/* Visual cue for users that the shortcut exists */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 pointer-events-none">
          <kbd className="px-2 py-1 text-[10px] font-mono font-bold text-gray-500 dark:text-[#8A9BBE] bg-gray-100 dark:bg-[#1E2D47] border border-gray-200 dark:border-[#2A3F63] rounded-md">⌘</kbd>
          <kbd className="px-2 py-1 text-[10px] font-mono font-bold text-gray-500 dark:text-[#8A9BBE] bg-gray-100 dark:bg-[#1E2D47] border border-gray-200 dark:border-[#2A3F63] rounded-md">K</kbd>
        </div>
      </div>

      {isOpen && query && (
        <div 
          ref={dropdownRef}
          className="absolute top-full mt-2 w-full bg-white/95 dark:bg-[#0D1526]/95 backdrop-blur-xl border border-gray-100 dark:border-[#1E2D47]/50 rounded-xl shadow-2xl overflow-hidden"
        >
          {filteredTools.length > 0 ? (
            <ul className="max-h-96 overflow-y-auto py-2">
              {filteredTools.map((tool) => (
                <li key={tool.slug}>
                  <Link 
                    href={`/tools/${tool.slug}/`}
                    onClick={() => {
                      setQuery("");
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#1E2D47]/50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gray-100 dark:bg-[#1E2D47] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#00D4B4]/10 transition-colors">
                      <DynamicIcon name={tool.icon || 'Zap'} className="w-5 h-5 text-gray-600 dark:text-[#8A9BBE] group-hover:text-[#00D4B4] transition-colors" />
                    </div>
                    <div className="flex-grow text-left">
                      <div className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#00D4B4] transition-colors">
                        {tool.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-[#5B719E] line-clamp-1">
                        {tool.description || tool.category}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-[#8A9BBE]">
              No tools found for &quot;{query}&quot;. Try a different keyword.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
