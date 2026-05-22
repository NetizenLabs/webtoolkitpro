'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { encodingForModel } from 'js-tiktoken';
import { Cpu, ArrowRight, Copy, Check, Scissors } from 'lucide-react';
import PrivacyBanner from '../PrivacyBanner';

export default function RagOptimizer() {
  const [input, setInput] = useState('<!-- Example RAG context -->\n<div>\n  <p>This is a document retrieved from the vector database.</p>\n  \n  <p>It contains unnecessary whitespace,    newlines,\nand HTML tags that waste LLM context window tokens.</p>\n</div>');
  const [output, setOutput] = useState('');
  
  const [removeWhitespace, setRemoveWhitespace] = useState(true);
  const [removeNewlines, setRemoveNewlines] = useState(true);
  const [stripHtml, setStripHtml] = useState(true);
  const [stripMarkdown, setStripMarkdown] = useState(false);
  
  const [inputTokens, setInputTokens] = useState(0);
  const [outputTokens, setOutputTokens] = useState(0);
  const [copied, setCopied] = useState(false);

  // Hardcode API cost per 1M input tokens for standard model (e.g., GPT-4o = $5.00)
  const costPerMillion = 5.00; 

  const handleOptimize = () => {
    let processed = input;

    if (stripHtml) {
      processed = processed.replace(/<[^>]*>?/gm, '');
    }
    
    if (stripMarkdown) {
      // Basic markdown stripping (bold, italic, links, headers)
      processed = processed
        .replace(/(\*\*|__)(.*?)\1/g, '$2')
        .replace(/(\*|_)(.*?)\1/g, '$2')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/#{1,6}\s/g, '');
    }

    if (removeNewlines) {
      processed = processed.replace(/\n+/g, ' ');
    }

    if (removeWhitespace) {
      processed = processed.replace(/\s{2,}/g, ' ');
    }

    setOutput(processed.trim());
  };

  useEffect(() => {
    try {
      const enc = encodingForModel('gpt-4o');
      setInputTokens(enc.encode(input).length);
      setOutputTokens(enc.encode(output).length);
    } catch (e) {
      setInputTokens(0);
      setOutputTokens(0);
    }
  }, [input, output]);

  const tokensSaved = Math.max(0, inputTokens - outputTokens);
  const percentSaved = inputTokens > 0 ? ((tokensSaved / inputTokens) * 100).toFixed(1) : '0.0';
  const costSaved = ((tokensSaved / 1000000) * costPerMillion).toFixed(5);

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <PrivacyBanner />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-50 border rounded-xl flex flex-col items-center justify-center">
          <p className="text-xs font-medium text-gray-500 mb-1">Original Tokens</p>
          <p className="text-2xl font-bold text-gray-800">{inputTokens.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-gray-50 border rounded-xl flex flex-col items-center justify-center">
          <p className="text-xs font-medium text-gray-500 mb-1">Optimized Tokens</p>
          <p className="text-2xl font-bold text-blue-600">{outputTokens.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex flex-col items-center justify-center col-span-1 md:col-span-2">
          <p className="text-sm font-bold text-green-700 mb-1">Tokens Saved: {tokensSaved.toLocaleString()} ({percentSaved}%)</p>
          <p className="text-xs font-medium text-green-600">Cost Savings (GPT-4o): ${costSaved}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 p-4 bg-white border rounded-xl shadow-sm">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <input type="checkbox" checked={stripHtml} onChange={(e) => setStripHtml(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500" />
          Strip HTML Tags
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <input type="checkbox" checked={stripMarkdown} onChange={(e) => setStripMarkdown(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500" />
          Strip Markdown
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <input type="checkbox" checked={removeNewlines} onChange={(e) => setRemoveNewlines(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500" />
          Remove Line Breaks
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <input type="checkbox" checked={removeWhitespace} onChange={(e) => setRemoveWhitespace(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500" />
          Collapse Whitespace
        </label>
        
        <button
          onClick={handleOptimize}
          className="ml-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2 text-sm"
        >
          <Scissors className="w-4 h-4" /> Minify Context
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
        {/* Input */}
        <div className="flex flex-col space-y-2 h-full">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Raw RAG Context (Input)
          </label>
          <div className="flex-1 border rounded-xl overflow-hidden">
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
        
        {/* Output */}
        <div className="flex flex-col space-y-2 h-full">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              Optimized Context (Output)
            </label>
            <button
              onClick={copyToClipboard}
              disabled={!output}
              className="px-3 py-1 bg-white text-gray-700 border text-xs font-semibold rounded-md hover:bg-gray-50 transition flex items-center gap-1 disabled:opacity-50"
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="flex-1 border rounded-xl overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="markdown"
              theme="vs-dark"
              value={output}
              options={{ minimap: { enabled: false }, wordWrap: 'on', readOnly: true }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
