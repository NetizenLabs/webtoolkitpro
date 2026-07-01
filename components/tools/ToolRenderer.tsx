import React from 'react';
import TOOL_FILES from '../../lib/tool-registry.json';
import { Loader2 } from 'lucide-react';

interface ToolRendererProps {
  slug: string;
}

export default async function ToolRenderer({ slug }: ToolRendererProps) {
  const filename = (TOOL_FILES as Record<string, string>)[slug];
  
  if (!filename) {
    return (
      <div className="p-12 text-left bg-red-50 dark:bg-red-950/20 rounded-[12px] border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 overflow-auto">
        <h3 className="font-bold mb-2">Failed to Load Component</h3>
        <pre className="text-xs">Tool not found: {slug}</pre>
        <p className="text-sm mt-4">Please try refreshing the page or checking your network connection.</p>
      </div>
    );
  }

  try {
    const mod = await import(`../tools/instances/${filename}`);
    const ToolComponent = mod.default;
    return <ToolComponent slug={slug} />;
  } catch (error: any) {
    console.error("Failed to load tool chunk:", error);
    return (
      <div className="p-12 text-left bg-red-50 dark:bg-red-950/20 rounded-[12px] border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 overflow-auto">
        <h3 className="font-bold mb-2">Failed to Load Component</h3>
        <pre className="text-xs">{error.message}</pre>
        <p className="text-sm mt-4">Please try refreshing the page or checking your network connection.</p>
      </div>
    );
  }
}
