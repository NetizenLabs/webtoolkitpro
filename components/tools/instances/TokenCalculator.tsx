'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { encodingForModel, TiktokenModel } from 'js-tiktoken';
import { Brain, DollarSign, Calculator, Info } from 'lucide-react';

export default function TokenCalculator() {
  const [input, setInput] = useState('Enter a large prompt to calculate tokens...');
  const [model, setModel] = useState<TiktokenModel>('gpt-4');
  const [tokenCount, setTokenCount] = useState(0);

  // Approximate pricing per 1M tokens (in dollars) as of mid-2024
  const pricing = useMemo(() => {
    switch(model) {
      case 'gpt-4': return 30.00; // input pricing
      case 'gpt-4o': return 5.00;
      case 'gpt-3.5-turbo': return 0.50;
      default: return 5.00;
    }
  }, [model]);

  useEffect(() => {
    try {
      const enc = encodingForModel(model);
      const tokens = enc.encode(input);
      setTokenCount(tokens.length);
    } catch (e) {
      setTokenCount(0);
    }
  }, [input, model]);

  const cost = ((tokenCount / 1000000) * pricing).toFixed(4);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-blue-600 mb-1">Total Tokens</p>
          <p className="text-4xl font-black text-blue-900">{tokenCount.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-green-50 border border-green-100 rounded-2xl flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-green-600 mb-1">Estimated Cost</p>
          <p className="text-4xl font-black text-green-900">${cost}</p>
        </div>
        <div className="p-6 bg-purple-50 border border-purple-100 rounded-2xl flex flex-col justify-center">
          <label className="text-sm font-medium text-purple-600 mb-2">Target Model</label>
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value as TiktokenModel)}
            className="w-full p-3 rounded-xl border-purple-200 bg-white text-purple-900 font-semibold focus:ring-2 focus:ring-purple-500"
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-4o">GPT-4o</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-500" />
          Prompt Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-96 p-4 font-mono text-sm border rounded-xl focus:ring-2 focus:ring-purple-500 bg-white resize-none shadow-inner"
          placeholder="Paste your prompt text here..."
        />
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
          <Info className="w-3 h-3" />
          Token counts are calculated entirely in your browser using the official cl100k_base byte pair encoding. Your prompt is never sent to a server.
        </p>
      </div>
    </div>
  );
}
