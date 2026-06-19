'use client';

import React, { useState, useEffect } from 'react';
import TOOL_FILES from '../../lib/tool-registry.json';
import { Loader2 } from 'lucide-react';

interface ToolRendererProps {
  slug: string;
}

export default function ToolRenderer({ slug }: ToolRendererProps) {
  const [ToolComponent, setToolComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const filename = (TOOL_FILES as Record<string, string>)[slug];
    
    if (!filename) {
      if (isMounted) setError(new Error(`Tool not found: ${slug}`));
      return;
    }

    // Reset component when slug changes
    setToolComponent(null);
    setError(null);

    import(`../tools/instances/${filename}`)
      .then((mod) => {
        if (isMounted) {
          setToolComponent(() => mod.default);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to load tool chunk:", err);
          setError(err);
        }
      });

    return () => { isMounted = false; };
  }, [slug]);

  if (error) {
    return (
      <div className="p-12 text-left bg-red-50 dark:bg-red-950/20 rounded-[12px] border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 overflow-auto">
        <h3 className="font-bold mb-2">Failed to Load Component</h3>
        <pre className="text-xs">{error.message}</pre>
        <p className="text-sm mt-4">Please try refreshing the page or checking your network connection.</p>
      </div>
    );
  }

  if (!ToolComponent) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-[#0B1120] rounded-[12px] border border-gray-100 dark:border-[#1E2D47] text-gray-400 dark:text-[#8A9BBE]">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return <ToolComponent />;
}
