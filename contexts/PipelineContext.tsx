"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type PipelineData = {
  payload: string;
  sourceType: string;
} | null;

interface PipelineContextType {
  pipedData: PipelineData;
  setPipedData: (data: PipelineData) => void;
  consumePipedData: () => string | null;
}

const PipelineContext = createContext<PipelineContextType | undefined>(undefined);

export function PipelineProvider({ children }: { children: ReactNode }) {
  const [pipedData, setPipedData] = useState<PipelineData>(null);

  // When a tool consumes the data, we wipe it so it doesn't get consumed again on re-renders
  const consumePipedData = () => {
    if (!pipedData) return null;
    const payload = pipedData.payload;
    setPipedData(null);
    return payload;
  };

  return (
    <PipelineContext.Provider value={{ pipedData, setPipedData, consumePipedData }}>
      {children}
    </PipelineContext.Provider>
  );
}

export function usePipeline() {
  const context = useContext(PipelineContext);
  if (context === undefined) {
    throw new Error('usePipeline must be used within a PipelineProvider');
  }
  return context;
}
