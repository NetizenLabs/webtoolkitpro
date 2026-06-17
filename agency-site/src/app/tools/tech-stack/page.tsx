'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { analyzeTechStack } from '@/actions/tech-stack';

export default function TechStackPage() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'complete' | 'error'>('idle');
  const [results, setResults] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Terminal logs state
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (msg: string, delay: number = 0) => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        setLogs(prev => [...prev, msg]);
        resolve();
      }, delay);
    });
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    let formattedUrl = url;
    if (!url.startsWith('http')) {
      formattedUrl = `https://${url}`;
    }

    setStatus('scanning');
    setErrorMsg('');
    setResults(null);
    setLogs([]);

    // Start terminal animation sequence
    await addLog(`[SYSTEM] Initializing reconnaissance on target: ${formattedUrl}`, 100);
    await addLog(`[NETWORK] Establishing secure connection...`, 400);
    await addLog(`[NETWORK] Bypassing Web Application Firewalls...`, 500);

    // Call actual server action
    const res = await analyzeTechStack(formattedUrl);

    if (res.success && res.data) {
      await addLog(`[HTTP] Headers intercepted (${res.data.headers} keys detected)`, 600);
      await addLog(`[PARSER] Downloading HTML payload...`, 400);
      await addLog(`[PARSER] Extracting DOM signatures...`, 700);
      await addLog(`[ANALYSIS] Cross-referencing signatures with known framework heuristics...`, 800);
      await addLog(`[SYSTEM] Reconnaissance complete. Decoding results...`, 500);
      
      setResults(res.data);
      setStatus('complete');
    } else {
      await addLog(`[ERROR] Connection failed: ${res.error}`, 400);
      setErrorMsg(res.error || 'Failed to analyze URL');
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center">
      <div className="max-w-4xl w-full px-6">
        
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 mb-8 transition-opacity">
          ← Back to Tools
        </Link>

        <div className="mb-12 hero-enter">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 text-[10px] font-mono text-[var(--accent)] mb-4 bg-[var(--accent)]/5 uppercase tracking-widest">
            Classified Diagnostics
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Tech Stack Analyzer</h1>
          <p className="text-lg opacity-70 leading-relaxed">
            Instantly detect frontend frameworks, CDN layers, and utility libraries used by any web application via DOM and header signature analysis.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="flex gap-4 mb-8 hero-enter delay-50">
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Target URL (e.g., stripe.com)"
            className="flex-1 bg-[var(--foreground)]/5 border border-[var(--foreground)]/20 rounded-xl px-6 py-4 outline-none focus:border-[var(--accent)] transition-colors text-lg font-mono"
            disabled={status === 'scanning'}
            required
          />
          <button 
            type="submit"
            disabled={status === 'scanning'}
            className="bg-[var(--foreground)] text-[var(--background)] font-bold px-8 py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:hover:scale-100 uppercase tracking-wider text-sm"
          >
            {status === 'scanning' ? 'Scanning...' : 'Execute'}
          </button>
        </form>

        {/* Terminal Area */}
        {(status === 'scanning' || status === 'error' || status === 'complete') && (
          <div className="w-full rounded-2xl bg-[#050505] border border-white/10 overflow-hidden mb-12 hero-enter">
            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              <span className="ml-4 text-xs font-mono opacity-50">root@netizen-labs:~</span>
            </div>
            {/* Terminal Body */}
            <div 
              ref={terminalRef}
              className="p-6 h-64 overflow-y-auto font-mono text-sm leading-relaxed"
            >
              {logs.map((log, i) => (
                <div key={i} className={`${log.includes('[ERROR]') ? 'text-red-400' : log.includes('[SYSTEM]') ? 'text-[var(--accent)]' : 'text-green-400'} mb-1`}>
                  {log}
                </div>
              ))}
              {status === 'scanning' && (
                <div className="animate-pulse text-green-400">_</div>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {status === 'complete' && results && (
          <div className="space-y-6 hero-enter">
            <h3 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              Detected Architecture
            </h3>
            
            {results.stack.length === 0 ? (
              <div className="p-8 text-center opacity-70 border border-[var(--foreground)]/10 rounded-2xl">
                No major frameworks or recognizable signatures detected. This could be a static HTML site or heavily obfuscated.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.stack.map((tech: any, i: number) => (
                  <div key={i} className="p-6 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 group hover:border-[var(--accent)]/50 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
                    </div>
                    
                    <div className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">{tech.category}</div>
                    <div className="text-2xl font-bold mb-4">{tech.name}</div>
                    
                    <div className="flex items-center gap-2 text-xs font-mono opacity-60">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                      Detected via: {tech.hint}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
