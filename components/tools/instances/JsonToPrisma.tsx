'use client';

import React, { useState } from 'react';
import { Database, FileCode, ArrowRight, Copy, Check } from 'lucide-react';

export default function JsonToPrisma() {
  const [input, setInput] = useState('{\n  "id": 1,\n  "name": "Jane Doe",\n  "email": "jane@example.com",\n  "isActive": true,\n  "role": "ADMIN",\n  "metadata": {\n    "lastLogin": "2026-05-22T00:00:00.000Z"\n  }\n}');
  const [output, setOutput] = useState('');
  const [modelName, setModelName] = useState('User');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const getPrismaType = (key: string, value: any): string => {
    if (value === null) return 'String?';
    if (typeof value === 'boolean') return 'Boolean';
    if (typeof value === 'number') {
      return Number.isInteger(value) ? 'Int' : 'Float';
    }
    if (typeof value === 'string') {
      if (key.toLowerCase().includes('date') || key.toLowerCase().includes('time') || !isNaN(Date.parse(value))) {
        return 'DateTime';
      }
      return 'String';
    }
    if (Array.isArray(value)) {
      if (value.length > 0) {
        return `${getPrismaType(key, value[0])}[]`;
      }
      return 'Json[]';
    }
    if (typeof value === 'object') {
      return 'Json';
    }
    return 'String';
  };

  const handleConvert = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      if (typeof parsed !== 'object' || Array.isArray(parsed) || parsed === null) {
        throw new Error('Input must be a single JSON object (not an array).');
      }

      let prismaSchema = `model ${modelName} {\n`;
      let idFound = false;

      for (const [key, value] of Object.entries(parsed)) {
        let prismaType = getPrismaType(key, value);
        let attributes = '';

        if (key.toLowerCase() === 'id') {
          idFound = true;
          attributes = typeof value === 'number' ? ' @id @default(autoincrement())' : ' @id @default(uuid())';
        } else if (key.toLowerCase().includes('email')) {
          attributes = ' @unique';
        } else if (key.toLowerCase().includes('createdat')) {
          attributes = ' @default(now())';
        } else if (key.toLowerCase().includes('updatedat')) {
          attributes = ' @updatedAt';
        }

        prismaSchema += `  ${key.padEnd(15)} ${prismaType.padEnd(10)}${attributes}\n`;
      }

      if (!idFound) {
        prismaSchema += `  id              String     @id @default(uuid())\n`;
      }

      prismaSchema += `}\n`;
      setOutput(prismaSchema);
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
        <label className="text-sm font-semibold text-gray-700">Model Name:</label>
        <input 
          type="text" 
          value={modelName}
          onChange={(e) => setModelName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          placeholder="User"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-blue-500" />
            Input JSON Payload
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-96 p-4 font-mono text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
            placeholder="Paste your JSON payload here..."
            spellCheck="false"
          />
        </div>
        
        {/* Output */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Database className="w-4 h-4 text-green-500" />
            Generated Prisma Schema
          </label>
          <textarea
            value={output}
            readOnly
            className={`w-full h-96 p-4 font-mono text-sm border rounded-xl bg-gray-900 text-green-400 resize-none ${error ? 'border-red-500 text-red-500' : ''}`}
            placeholder="Prisma model will appear here..."
            spellCheck="false"
          />
          {error && <div className="text-xs text-red-600 font-medium">{error}</div>}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t pt-6 mt-6">
        <button
          onClick={handleConvert}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          Generate Prisma Schema <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="px-6 py-3 bg-white text-gray-700 border font-semibold rounded-xl hover:bg-gray-50 transition flex items-center gap-2 disabled:opacity-50"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Schema'}
        </button>
      </div>
    </div>
  );
}
