'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { encodingForModel, TiktokenModel } from 'js-tiktoken';
import Editor from '@monaco-editor/react';
import { Brain, DollarSign, Calculator, Info } from 'lucide-react';
import PrivacyBanner from '../PrivacyBanner';

export default function TokenCalculator() {
  const [input, setInput] = useState('// Enter a massive enterprise prompt or codebase to calculate tokens...\n\nfunction example() {\n  console.log("Strictly client-side token calculation.");\n}');
  
  // Custom pricing model state since TiktokenModel limits string values
  const [model, setModel] = useState<string>('gpt-4o');
  const [tokenCount, setTokenCount] = useState(0);

  // Approximate pricing per 1M input tokens
  const pricing = useMemo(() => {
    switch(model) {
      case 'gpt-4': return 30.00;
      case 'gpt-4o': return 5.00;
      case 'gpt-3.5-turbo': return 0.50;
      case 'claude-3.5-sonnet': return 3.00;
      case 'gemini-1.5-pro': return 3.50;
      default: return 5.00;
    }
  }, [model]);

  // Which tokenizer to use based on the model
  const tiktokenModelMap: Record<string, TiktokenModel> = {
    'gpt-4': 'gpt-4',
    'gpt-4o': 'gpt-4o',
    'gpt-3.5-turbo': 'gpt-3.5-turbo',
    'claude-3.5-sonnet': 'gpt-4o', // approximate using cl100k_base
    'gemini-1.5-pro': 'gpt-4o'     // approximate using cl100k_base
  };

  useEffect(() => {
    try {
      const enc = encodingForModel(tiktokenModelMap[model] || 'gpt-4o');
      const tokens = enc.encode(input);
      setTokenCount(tokens.length);
    } catch (e) {
      setTokenCount(0);
    }
  }, [input, model]);

  const cost = ((tokenCount / 1000000) * pricing).toFixed(4);

  return (
    <div className="space-y-6">
      <PrivacyBanner />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-blue-600 mb-1">Total Tokens</p>
          <p className="text-4xl font-black text-blue-900">{tokenCount.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-green-50 border border-green-100 rounded-2xl flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-green-600 mb-1">Estimated API Cost</p>
          <p className="text-4xl font-black text-green-900">${cost}</p>
        </div>
        <div className="p-6 bg-purple-50 border border-purple-100 rounded-2xl flex flex-col justify-center">
          <label className="text-sm font-medium text-purple-600 mb-2">Target Model Pricing</label>
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-3 rounded-xl border-purple-200 bg-white text-purple-900 font-semibold focus:ring-2 focus:ring-purple-500"
          >
            <option value="gpt-4o">OpenAI GPT-4o ($5.00/1M)</option>
            <option value="gpt-4">OpenAI GPT-4 ($30.00/1M)</option>
            <option value="gpt-3.5-turbo">OpenAI GPT-3.5 Turbo ($0.50/1M)</option>
            <option value="claude-3.5-sonnet">Anthropic Claude 3.5 Sonnet ($3.00/1M)</option>
            <option value="gemini-1.5-pro">Google Gemini 1.5 Pro ($3.50/1M)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col space-y-2 h-[600px]">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-500" />
          Prompt Text (Zero-Trust Environment)
        </label>
        <div className="flex-1 border rounded-xl overflow-hidden shadow-inner">
          <Editor
            height="100%"
            defaultLanguage="markdown"
            theme="vs-dark"
            value={input}
            onChange={(value) => setInput(value || '')}
            options={{ minimap: { enabled: false }, wordWrap: 'on' }}
          />
        </div>
      </div>
    </div>
  );
}
