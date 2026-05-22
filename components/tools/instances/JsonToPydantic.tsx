'use client';

import React, { useState } from 'react';
import { FileCode, ArrowRight, Copy, Check, Hash } from 'lucide-react';

export default function JsonToPydantic() {
  const [input, setInput] = useState('{\n  "user_id": 12345,\n  "username": "ai_developer",\n  "is_active": true,\n  "score": 98.5,\n  "tags": ["python", "machine_learning"],\n  "metadata": {\n    "created_at": "2026-05-22T00:00:00Z"\n  }\n}');
  const [output, setOutput] = useState('');
  const [className, setClassName] = useState('UserModel');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const getPythonType = (value: any): string => {
    if (value === null) return 'Optional[Any] = None';
    if (typeof value === 'boolean') return 'bool';
    if (typeof value === 'number') {
      return Number.isInteger(value) ? 'int' : 'float';
    }
    if (typeof value === 'string') {
      if (!isNaN(Date.parse(value)) && value.length > 10) {
        return 'datetime';
      }
      return 'str';
    }
    if (Array.isArray(value)) {
      if (value.length > 0) {
        // extract base type of array
        const baseType = getPythonType(value[0]);
        // strip out default assignments for list typing
        const cleanType = baseType.split('=')[0].trim();
        return `List[${cleanType}]`;
      }
      return 'List[Any]';
    }
    if (typeof value === 'object') {
      return 'Dict[str, Any]';
    }
    return 'Any';
  };

  const handleConvert = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      if (typeof parsed !== 'object' || Array.isArray(parsed) || parsed === null) {
        throw new Error('Input must be a single JSON object.');
      }

      let imports = `from typing import List, Optional, Dict, Any\nfrom datetime import datetime\nfrom pydantic import BaseModel, Field\n\n`;
      let pydanticClass = `class ${className}(BaseModel):\n`;
      
      let hasProperties = false;

      for (const [key, value] of Object.entries(parsed)) {
        hasProperties = true;
        let pythonType = getPythonType(value);
        let fieldMeta = '';
        
        // Pydantic V2 style handling for snake_case aliases if needed, but for simplicity we assume direct mapping
        if (pythonType.includes('=')) {
          // handles Optional[Any] = None
          pydanticClass += `    ${key}: ${pythonType}\n`;
        } else {
          pydanticClass += `    ${key}: ${pythonType}\n`;
        }
      }

      if (!hasProperties) {
        pydanticClass += `    pass\n`;
      }

      setOutput(imports + pydanticClass);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm font-semibold text-gray-700">Class Name:</label>
        <input 
          type="text" 
          value={className}
          onChange={(e) => setClassName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 font-mono text-sm"
          placeholder="MyModel"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-purple-500" />
            Input JSON Payload
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-96 p-4 font-mono text-sm border rounded-xl focus:ring-2 focus:ring-purple-500 bg-gray-50 resize-none"
            placeholder="Paste your JSON payload here..."
            spellCheck="false"
          />
        </div>
        
        {/* Output */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Hash className="w-4 h-4 text-yellow-500" />
            Generated Pydantic V2 Model
          </label>
          <textarea
            value={output}
            readOnly
            className={`w-full h-96 p-4 font-mono text-sm border rounded-xl bg-gray-900 text-yellow-400 resize-none ${error ? 'border-red-500 text-red-500' : ''}`}
            placeholder="Python class will appear here..."
            spellCheck="false"
          />
          {error && <div className="text-xs text-red-600 font-medium">{error}</div>}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t pt-6 mt-6">
        <button
          onClick={handleConvert}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 transition flex items-center gap-2"
        >
          Generate Python Model <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="px-6 py-3 bg-white text-gray-700 border font-semibold rounded-xl hover:bg-gray-50 transition flex items-center gap-2 disabled:opacity-50"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
    </div>
  );
}
