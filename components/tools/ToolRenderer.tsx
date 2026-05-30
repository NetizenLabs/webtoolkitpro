'use client';

import React from 'react';
import { TOOL_COMPONENTS } from '@/lib/tool-registry';

interface ToolRendererProps {
  slug: string;
}

export default function ToolRenderer({ slug }: ToolRendererProps) {
  const ToolComponent = TOOL_COMPONENTS[slug];

  if (!ToolComponent) {
    return (
      <div className="p-12 text-center bg-gray-50 dark:bg-[#0B1120] rounded-[12px] border border-gray-100 dark:border-[#1E2D47] text-gray-400 dark:text-[#8A9BBE]">
        Tool interface coming soon...
      </div>
    );
  }

  return <ToolComponent />;
}
