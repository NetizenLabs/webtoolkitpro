'use client'

import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, FileJson, Check, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import yaml from 'js-yaml';

export default function JsonYamlJsonlConverter() {
  const [input, setInput] = useState<string>('[\n  {\n    "id": 1,\n    "name": "WebToolkit"\n  },\n  {\n    "id": 2,\n    "name": "Pro"\n  }\n]');
  const [output, setOutput] = useState<string>('');
  const [mode, setMode] = useState<'yaml' | 'jsonl'>('yaml');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const processJson = useCallback((raw: string, currentMode: string) => {
    try {
      setError(null);
      if (!raw.trim()) {
        setOutput('');
        return;
      }
      
      const parsed = JSON.parse(raw);
      
      switch (currentMode) {
        case 'yaml':
          setOutput(yaml.dump(parsed));
          break;
        case 'jsonl':
          if (Array.isArray(parsed)) {
            setOutput(parsed.map(item => JSON.stringify(item)).join('\n'));
          } else {
            setOutput(JSON.stringify(parsed));
          }
          break;
        default:
          setOutput(yaml.dump(parsed));
      }
    } catch (e: any) {
      setError(e.message);
      setOutput('# Invalid JSON: ' + e.message);
    }
  }, []);

  const handleModeChange = (newMode: 'yaml' | 'jsonl') => {
    setMode(newMode);
    processJson(input, newMode);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Process initial state on mount
  React.useEffect(() => {
    processJson(input, mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full h-[800px] bg-background">
      {/* Left Pane - Input */}
      <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <FileJson className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-sm">Input JSON</h3>
          </div>
        </div>
        <div className="flex-1 relative">
          <Editor
            height="100%"
            defaultLanguage="json"
            theme="vs-dark"
            value={input}
            onChange={(val) => {
              const newVal = val || '';
              setInput(newVal);
              processJson(newVal, mode);
            }}
            options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: 'on' }}
          />
        </div>
        {error && (
          <div className="p-3 bg-destructive/10 border-t border-destructive/20 text-destructive text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p className="font-mono text-xs break-all">{error}</p>
          </div>
        )}
      </div>

      {/* Right Pane - Output */}
      <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-border bg-card shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 gap-3 border-b border-border bg-muted/30">
          <div className="flex flex-wrap items-center gap-1.5">
            {(['yaml', 'jsonl'] as const).map((m) => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === m ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
              >
                {m === 'yaml' ? 'YAML' : 'JSON Lines (JSONL)'}
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
            language={mode === 'yaml' ? 'yaml' : 'json'}
            theme="vs-dark"
            value={output}
            options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14, wordWrap: 'on' }}
          />
        </div>
      </div>
    </div>
  );
}
