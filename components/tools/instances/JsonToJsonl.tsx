'use client';

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { FileJson, FileText, ArrowRight, Download, Copy, AlertCircle, CheckCircle } from 'lucide-react';
import PrivacyBanner from '../PrivacyBanner';

export default function JsonToJsonl() {
  const [input, setInput] = useState('[\n  {\n    "messages": [\n      {"role": "system", "content": "You are a helpful assistant."},\n      {"role": "user", "content": "Hello!"}\n    ]\n  }\n]');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isValidSchema, setIsValidSchema] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      setError('');
      setIsValidSchema(false);
      
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) {
        throw new Error('Input must be a JSON array of objects.');
      }
      
      let schemaPassed = true;

      const jsonl = parsed.map(obj => {
        if (typeof obj !== 'object' || obj === null) {
          throw new Error('All array items must be valid JSON objects.');
        }

        // Strict validation for OpenAI fine-tuning conversational format
        if (!obj.messages || !Array.isArray(obj.messages)) {
          schemaPassed = false;
        } else {
          obj.messages.forEach((msg: any) => {
            if (!msg.role || !msg.content) {
              schemaPassed = false;
            }
          });
        }

        return JSON.stringify(obj);
      }).join('\n');
      
      setOutput(jsonl);
      setIsValidSchema(schemaPassed);
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
    a.download = 'fine-tuning-dataset.jsonl';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <PrivacyBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
        {/* Input */}
        <div className="flex flex-col space-y-2 h-full">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileJson className="w-4 h-4 text-blue-500" />
            Input JSON Array
          </label>
          <div className="flex-1 border rounded-xl overflow-hidden shadow-inner">
            <Editor
              height="100%"
              defaultLanguage="json"
              theme="vs-dark"
              value={input}
              onChange={(value) => setInput(value || '')}
              options={{ minimap: { enabled: false }, formatOnPaste: true }}
            />
          </div>
        </div>
        
        {/* Output */}
        <div className="flex flex-col space-y-2 h-full">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-500" />
            Output JSONL
          </label>
          <div className={`flex-1 border rounded-xl overflow-hidden shadow-inner ${error ? 'border-red-500' : ''}`}>
            <Editor
              height="100%"
              defaultLanguage="json"
              theme="vs-dark"
              value={error ? `Error: ${error}` : output}
              options={{ minimap: { enabled: false }, readOnly: true, wordWrap: 'on' }}
            />
          </div>
          
          {output && !error && (
            <div className={`p-3 rounded-lg flex items-center gap-2 text-sm font-medium ${isValidSchema ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
              {isValidSchema ? (
                <><CheckCircle className="w-5 h-5 text-green-600" /> OpenAI Fine-Tuning Schema Detected (Valid)</>
              ) : (
                <><AlertCircle className="w-5 h-5 text-yellow-600" /> Warning: Standard JSONL generated, but it does not match OpenAI's {"{messages: [{role, content}]}"} conversational format.</>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t pt-6 mt-6">
        <button
          onClick={handleConvert}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          Convert & Validate Schema <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="px-6 py-3 bg-white text-gray-700 border font-semibold rounded-xl hover:bg-gray-50 transition flex items-center gap-2 disabled:opacity-50"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy JSONL'}
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
