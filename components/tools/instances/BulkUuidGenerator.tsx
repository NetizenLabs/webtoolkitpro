'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Hash, Check, RefreshCw, Settings2 } from 'lucide-react';

function generateUuidV7(): string {
  // UUID v7 generation based on current draft standard
  const timestamp = Date.now();
  const timestampHex = timestamp.toString(16).padStart(12, '0');
  
  const randomBytes = new Uint8Array(10);
  crypto.getRandomValues(randomBytes);
  
  // Set version to 7 and variant to 10xx
  randomBytes[0] = (randomBytes[0] & 0x0f) | 0x70;
  randomBytes[2] = (randomBytes[2] & 0x3f) | 0x80;
  
  const hex = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${timestampHex.slice(0,8)}-${timestampHex.slice(8,12)}-${hex.slice(0,4)}-${hex.slice(4,8)}-${hex.slice(8)}`;
}

export default function BulkUuidGenerator() {
  const [mode, setMode] = useState<'v4' | 'v7'>('v4');
  const [quantity, setQuantity] = useState<number>(5);
  const [output, setOutput] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let result = [];
    const count = Math.min(Math.max(1, quantity), 1000); // cap between 1 and 1000
    
    for (let i = 0; i < count; i++) {
      if (mode === 'v4') {
        result.push(crypto.randomUUID());
      } else {
        result.push(generateUuidV7());
      }
    }
    setOutput(result.join('\n'));
  }, [mode, quantity]);

  useEffect(() => {
    generate();
  }, [generate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto bg-background">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl border border-border bg-card shadow-sm">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Settings2 className="w-5 h-5" />
            <h3 className="font-semibold text-sm text-foreground">Generator Settings</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Version</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode('v4')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'v4' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                >
                  UUID v4 (Random)
                </button>
                <button
                  onClick={() => setMode('v7')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'v7' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                >
                  UUID v7 (Time-based)
                </button>
              </div>
            </div>
            
            <div className="w-full sm:w-32 space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Quantity</label>
              <input
                type="number"
                min="1"
                max="1000"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-lg bg-secondary text-secondary-foreground border-none text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="flex flex-col rounded-xl overflow-hidden border border-border bg-card shadow-sm h-[500px]">
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-sm">Generated UUIDs</h3>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={generate}
              className="text-xs font-medium px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Regenerate
            </button>
            <button 
              onClick={handleCopy}
              className="text-xs font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy All'}
            </button>
          </div>
        </div>
        <div className="flex-1 p-4 bg-muted/10">
          <textarea
            readOnly
            value={output}
            className="w-full h-full bg-transparent border-none resize-none outline-none font-mono text-sm text-foreground/80 leading-relaxed custom-scrollbar"
            style={{ WebkitFontSmoothing: 'antialiased' }}
          />
        </div>
      </div>
    </div>
  );
}
