'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Check, Repeat, FileJson, FileText, Code } from 'lucide-react';

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

export default function DataConverter() {
  const [input, setInput] = useState<string>('[\n  {\n    "id": "1",\n    "name": "WebToolkit"\n  },\n  {\n    "id": "2",\n    "name": "Pro"\n  }\n]');
  const [output, setOutput] = useState<string>('');
  
  const [inputFormat, setInputFormat] = useState<'json' | 'csv' | 'xml'>('json');
  const [outputFormat, setOutputFormat] = useState<'json' | 'csv' | 'xml'>('csv');
  
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
        parsedData = JSON.parse(input);
      } else if (inputFormat === 'csv') {
        parsedData = csvToJson(input);
      } else if (inputFormat === 'xml') {
        // Basic parser just to ensure it doesn't crash. 
        // Real XML to JSON requires complex DOM traversal.
        parsedData = { error: "Client-side XML parsing requires DOM elements." };
      }

      // 2. Format Output
      if (outputFormat === 'json') {
        setOutput(JSON.stringify(parsedData, null, 2));
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
  }, [input, inputFormat, outputFormat]);

  useEffect(() => {
    processData();
  }, [processData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full h-[800px] bg-background">
      {/* Left Pane - Input */}
      <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-border bg-card shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 gap-3 border-b border-border bg-muted/30">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold uppercase text-muted-foreground mr-2">Input:</span>
            {(['json', 'csv', 'xml'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setInputFormat(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${inputFormat === m ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
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
      <div className="hidden lg:flex items-center justify-center -mx-4 z-10">
        <div className="bg-primary p-3 rounded-full text-primary-foreground shadow-lg border-4 border-background">
          <Repeat className="w-5 h-5" />
        </div>
      </div>

      {/* Right Pane - Output */}
      <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-border bg-card shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 gap-3 border-b border-border bg-muted/30">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold uppercase text-muted-foreground mr-2">Output:</span>
            {(['json', 'csv', 'xml'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setOutputFormat(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${outputFormat === m ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>
          <button 
            onClick={handleCopy}
            className="text-xs font-medium px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
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
  );
}
