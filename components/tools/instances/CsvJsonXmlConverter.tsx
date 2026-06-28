'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Check, Repeat, FileJson, FileText, Code } from 'lucide-react';
import BulkModeToggle from '@/components/ui/BulkModeToggle';

// Basic CSV and XML parsers to avoid adding new npm dependencies just for UI
function csvToJson(csv: string): any[] {
  const lines = csv.trim().split('\\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',');
    let obj: any = {};
    headers.forEach((h, i) => { obj[h] = values[i] ? values[i].trim() : ''; });
    return obj;
  });
}

function jsonToCsv(json: any[]): string {
  if (!json || !json.length) return '';
  const headers = Object.keys(json[0]);
  const rows = json.map(obj => headers.map(h => {
    let val = obj[h];
    if (typeof val === 'string' && val.includes(',')) return `"${val}"`;
    return val;
  }).join(','));
  return [headers.join(','), ...rows].join('\n');
}

function jsonToXml(obj: any, rootName: string = 'root'): string {
  let xml = '';
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((item: any) => { xml += `<${key}>${typeof item === 'object' ? jsonToXml(item) : item}</${key}>\n`; });
    } else if (typeof obj[key] === 'object') {
      xml += `<${key}>\n${jsonToXml(obj[key])}</${key}>\n`;
    } else {
      xml += `<${key}>${obj[key]}</${key}>\n`;
    }
  }
  return xml;
}

export default function CsvJsonXmlConverter() {
  const [input, setInput] = useState<string>('[\n  {\n    "id": "1",\n    "name": "WebToolkit"\n  },\n  {\n    "id": "2",\n    "name": "Pro"\n  }\n]');
  const [output, setOutput] = useState<string>('');
  
  const [inputFormat, setInputFormat] = useState<'json' | 'csv' | 'xml'>('json');
  const [outputFormat, setOutputFormat] = useState<'json' | 'csv' | 'xml'>('csv');
  
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);

  const processData = useCallback(() => {
    try {
      setError(null);
      if (!input.trim()) {
        setOutput('');
        return;
      }
      
      let parsedData: any = null;
      
      // 1. Parse Input
      if (inputFormat === 'json') {
        if (isBulkMode) {
          // Parse JSON Lines
          const lines = input.trim().split('\n').filter(l => l.trim());
          parsedData = lines.map(line => JSON.parse(line));
        } else {
          parsedData = JSON.parse(input);
        }
      } else if (inputFormat === 'csv') {
        parsedData = csvToJson(input);
      } else if (inputFormat === 'xml') {
        parsedData = { error: "Client-side XML parsing requires DOM elements." };
      }

      // 2. Format Output
      if (outputFormat === 'json') {
        if (isBulkMode && Array.isArray(parsedData)) {
          // Output JSON Lines
          setOutput(parsedData.map(d => JSON.stringify(d)).join('\n'));
        } else {
          setOutput(JSON.stringify(parsedData, null, 2));
        }
      } else if (outputFormat === 'csv') {
        if (!Array.isArray(parsedData)) {
          throw new Error('CSV output requires an array of objects.');
        }
        setOutput(jsonToCsv(parsedData));
      } else if (outputFormat === 'xml') {
        setOutput(`<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${jsonToXml(parsedData)}</root>`);
      }
      
    } catch (e: any) {
      setError(e.message);
      setOutput('Error: ' + e.message);
    }
  }, [input, inputFormat, outputFormat, isBulkMode]);

  useEffect(() => {
    processData();
  }, [processData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Data Converter" />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 w-full h-[800px]">
        {/* Left Pane - Input */}
        <div className="flex-1 flex flex-col rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-gray-200/50 dark:shadow-none group focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-3 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-[#0B1120]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest mr-2 flex items-center gap-2">
                Input: {isBulkMode && inputFormat === 'json' && <span className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-[9px] px-2 py-0.5 rounded-md">JSONL</span>}
              </span>
            {(['json', 'csv', 'xml'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setInputFormat(m)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${inputFormat === m ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'}`}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 relative">
          <Editor
            height="100%"
            language={inputFormat}
            theme="vs-dark"
            value={input}
            onChange={(val) => setInput(val || '')}
            options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: 'on' }}
          />
        </div>
        {error && (
          <div className="p-3 bg-destructive/10 border-t border-destructive/20 text-destructive text-sm flex items-start gap-2">
            <span className="font-mono text-xs break-all">{error}</span>
          </div>
        )}
      </div>

      {/* Center - Icon */}
      <div className="hidden lg:flex items-center justify-center -mx-4 z-10 drop-shadow-xl">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] border-4 border-white dark:border-slate-950 transition-transform duration-500 hover:rotate-180 hover:scale-110 cursor-pointer">
          <Repeat className="w-6 h-6" />
        </div>
      </div>

        {/* Right Pane - Output */}
        <div className="flex-1 flex flex-col rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-gray-200/50 dark:shadow-none group focus-within:ring-2 focus-within:ring-purple-500/50 transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-3 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-[#0B1120]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest mr-2 flex items-center gap-2">
                Output: {isBulkMode && outputFormat === 'json' && <span className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-[9px] px-2 py-0.5 rounded-md">JSONL</span>}
              </span>
            {(['json', 'csv', 'xml'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setOutputFormat(m)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${outputFormat === m ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'}`}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>
          <button 
            onClick={handleCopy}
            className="text-xs font-bold px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white transition-all duration-300 flex items-center gap-2 whitespace-nowrap active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Data'}
          </button>
        </div>
          <div className="flex-1">
            <Editor
              height="100%"
              language={outputFormat}
              theme="vs-dark"
              value={output}
              options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14, wordWrap: 'on' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
