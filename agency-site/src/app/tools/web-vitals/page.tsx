'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { analyzeWebVitals } from '@/actions/web-vitals';

export default function WebVitalsPage() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'complete' | 'error'>('idle');
  const [results, setResults] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [scanLogs, setScanLogs] = useState<string[]>([]);

  // Simulate scanning logs for visual effect
  useEffect(() => {
    if (status !== 'scanning') return;

    const logs = [
      'Initializing edge node in us-east-1...',
      'Bypassing CDN cache...',
      'Fetching initial HTML document...',
      'Parsing DOM tree...',
      'Executing JavaScript bundles...',
      'Analyzing paint metrics...',
      'Measuring layout shifts...',
      'Compiling Lighthouse report...'
    ];

    let currentLogIndex = 0;
    setScanLogs([]);

    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setScanLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      }
    }, 800);

    return () => clearInterval(interval);
  }, [status]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    // Auto format URL if missing protocol
    let formattedUrl = url;
    if (!url.startsWith('http')) {
      formattedUrl = `https://${url}`;
    }

    setStatus('scanning');
    setErrorMsg('');
    setResults(null);

    const res = await analyzeWebVitals(formattedUrl);

    if (res.success && res.data) {
      setResults(res.data);
      setStatus('complete');
    } else {
      setErrorMsg(res.error || 'Failed to analyze URL');
      setStatus('error');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center">
      <div className="max-w-5xl w-full px-6">
        
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 mb-8 transition-opacity">
          ← Back to Tools
        </Link>

        <div className="mb-12 hero-enter">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Core Web Vitals Auditor</h1>
          <p className="text-lg opacity-70 leading-relaxed max-w-2xl">
            Run a deep-dive Lighthouse audit from our edge nodes. We analyze paint times, layout shifts, and total blocking time to give you a true performance picture.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="flex gap-4 mb-16 hero-enter delay-50">
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL (e.g., example.com)"
            className="flex-1 bg-[var(--foreground)]/5 border border-[var(--foreground)]/20 rounded-xl px-6 py-4 outline-none focus:border-[var(--accent)] transition-colors text-lg"
            disabled={status === 'scanning'}
            required
          />
          <button 
            type="submit"
            disabled={status === 'scanning'}
            className="bg-[var(--foreground)] text-[var(--background)] font-bold px-8 py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {status === 'scanning' ? 'Analyzing...' : 'Audit URL'}
          </button>
        </form>

        {/* Scanning State */}
        {status === 'scanning' && (
          <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 font-mono text-sm text-green-400 min-h-[300px] flex flex-col">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="ml-2 text-white/50">edge-terminal_</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              {scanLogs.map((log, i) => (
                <div key={i} className="animate-pulse">&gt; {log}</div>
              ))}
              <div className="animate-bounce mt-4">_</div>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500">
            <strong>Error:</strong> {errorMsg}
          </div>
        )}

        {/* Results State */}
        {status === 'complete' && results && (
          <div className="space-y-8 hero-enter">
            {/* Top Score Card */}
            <div className="p-10 rounded-3xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">Performance Score</h2>
                <p className="opacity-70">Simulated on Mobile Network (Moto G4)</p>
              </div>
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" className="opacity-10" />
                  <circle 
                    cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" 
                    strokeDasharray={`${results.score * 2.827} 282.7`}
                    className={`transition-all duration-1000 ease-out ${getScoreColor(results.score)}`}
                  />
                </svg>
                <span className={`absolute text-5xl font-extrabold ${getScoreColor(results.score)}`}>
                  {results.score}
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Largest Contentful Paint', data: results.metrics.lcp },
                { label: 'First Contentful Paint', data: results.metrics.fcp },
                { label: 'Cumulative Layout Shift', data: results.metrics.cls },
                { label: 'Total Blocking Time', data: results.metrics.tbt },
                { label: 'Speed Index', data: results.metrics.speedIndex },
              ].map((metric, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10">
                  <h3 className="text-sm font-bold opacity-70 uppercase tracking-wider mb-4">{metric.label}</h3>
                  <div className={`text-3xl font-extrabold ${getScoreColor(metric.data.score * 100)}`}>
                    {metric.data.displayValue}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Diagnostics (if any) */}
            {results.diagnostics && results.diagnostics.length > 0 && (
              <div className="mt-12 p-8 rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5">
                 <h3 className="text-xl font-bold mb-6">Technical Diagnostics</h3>
                 <ul className="space-y-4">
                    {results.diagnostics.slice(0, 5).map((diag: any, i: number) => (
                      <li key={i} className="flex items-start gap-3 border-b border-[var(--foreground)]/10 pb-4 last:border-0 last:pb-0">
                         <span className="mt-1 text-[var(--accent)]">•</span>
                         <span className="opacity-80 text-sm leading-relaxed whitespace-pre-wrap">
                           {/* Replace markdown links with bold text for simplicity */}
                           {diag.description?.replace(/\[(.*?)\]\(.*?\)/g, '$1')}
                         </span>
                      </li>
                    ))}
                 </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
