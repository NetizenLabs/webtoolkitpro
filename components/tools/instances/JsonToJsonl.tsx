'use client';

import React, { useState } from 'react';
import { FileJson, FileText, ArrowRight, Download, Copy, AlertCircle } from 'lucide-react';

export default function JsonToJsonl() {
  const [input, setInput] = useState('[\n  {"prompt": "Hello", "completion": "World"},\n  {"prompt": "AI", "completion": "Models"}\n]');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) {
        throw new Error('Input must be a JSON array of objects.');
      }
      
      const jsonl = parsed.map(obj => {
        if (typeof obj !== 'object' || obj === null) {
          throw new Error('All array items must be valid JSON objects.');
        }
        return JSON.stringify(obj);
      }).join('\n');
      
      setOutput(jsonl);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON format.');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadFile = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/jsonl' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dataset.jsonl';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileJson className="w-4 h-4 text-blue-500" />
            Input JSON Array
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 p-4 font-mono text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
            placeholder="Paste your JSON array here..."
            spellCheck="false"
          />
        </div>
        
        {/* Output */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-500" />
            Output JSONL
          </label>
          <textarea
            value={output}
            readOnly
            className={`w-full h-80 p-4 font-mono text-sm border rounded-xl bg-gray-50 resize-none ${error ? 'border-red-400 text-red-600' : 'text-gray-800'}`}
            placeholder="JSONL output will appear here..."
          />
          {error && (
            <div className="text-xs text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t pt-6 mt-6">
        <button
          onClick={handleConvert}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          Convert Format <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="px-6 py-3 bg-white text-gray-700 border font-semibold rounded-xl hover:bg-gray-50 transition flex items-center gap-2 disabled:opacity-50"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        <button
          onClick={downloadFile}
          disabled={!output}
          className="px-6 py-3 bg-white text-gray-700 border font-semibold rounded-xl hover:bg-gray-50 transition flex items-center gap-2 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Download .jsonl
        </button>
      </div>
    </div>
  );
}
