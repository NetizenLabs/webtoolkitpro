'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { TOOL_COMPONENTS } from '@/lib/tool-registry';

interface ToolRendererProps {
  slug: string;
}

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-12 text-left bg-red-50 dark:bg-red-950/20 rounded-[12px] border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 overflow-auto">
          <h3 className="font-bold mb-2">Component Error</h3>
          <pre className="text-xs">{this.state.error?.message}</pre>
          <pre className="text-xs mt-2">{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ToolRenderer({ slug }: ToolRendererProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-12 text-center bg-gray-50 dark:bg-[#0B1120] rounded-[12px] border border-gray-100 dark:border-[#1E2D47] text-gray-400 dark:text-[#8A9BBE]">
        Initializing component...
      </div>
    );
  }

  const ToolComponent = TOOL_COMPONENTS[slug];

  if (!ToolComponent) {
    return (
      <div className="p-12 text-center bg-gray-50 dark:bg-[#0B1120] rounded-[12px] border border-gray-100 dark:border-[#1E2D47] text-gray-400 dark:text-[#8A9BBE]">
        Tool interface coming soon...
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="p-12 text-center bg-gray-50 dark:bg-[#0B1120] rounded-[12px] border border-gray-100 dark:border-[#1E2D47] text-gray-400 dark:text-[#8A9BBE]">
          Fetching component...
        </div>
      }>
        <ToolComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
