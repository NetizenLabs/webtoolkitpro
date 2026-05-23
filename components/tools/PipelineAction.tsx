"use client";

import React from 'react';
import { Share2 } from 'lucide-react';
import { usePipeline } from '@/contexts/PipelineContext';
import { useRouter } from 'next/navigation';
import { triggerQuickSuccess } from '@/lib/effects';

interface PipelineActionProps {
  data: string;
  sourceName: string;
  targetPath: string;
  targetName: string;
}

export default function PipelineAction({ data, sourceName, targetPath, targetName }: PipelineActionProps) {
  const { setPipedData } = usePipeline();
  const router = useRouter();

  const handlePipe = () => {
    if (!data) return;
    setPipedData({
      payload: data,
      sourceType: sourceName
    });
    triggerQuickSuccess();
    router.push(targetPath);
  };

  if (!data) return null;

  return (
    <button
      onClick={handlePipe}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50 rounded-xl font-bold text-xs hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
      title={`Send data to ${targetName}`}
    >
      <Share2 className="w-3.5 h-3.5" />
      <span>Send to {targetName}</span>
    </button>
  );
}
