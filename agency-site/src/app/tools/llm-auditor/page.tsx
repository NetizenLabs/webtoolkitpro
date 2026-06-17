'use client';

import { useState } from 'react';
import Link from 'next/link';
import { auditLLMReadiness } from '@/actions/llm-auditor';

type CheckResult = {
  id: string;
  name: string;
  passed: boolean;
  successMsg: string;
  failMsg: string;
};

type AuditResult = {
  url: string;
  score: number;
  checks: CheckResult[];
};

export default function LLMAuditorPage() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'complete' | 'error'>('idle');
  const [results, setResults] = useState<AuditResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setStatus('analyzing');
    setErrorMsg('');
    setResults(null);

    let formattedUrl = url;
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const res = await auditLLMReadiness(formattedUrl);

    if (res.success && res.data) {
      setResults(res.data);
      setStatus('complete');
    } else {
      setErrorMsg(res.error || 'Failed to analyze URL');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6 md:p-12 font-mono">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between border-b border-[var(--foreground)]/10 pb-6">
          <div className="flex items-center gap-4">
            <Link href="/tools" className="opacity-50 hover:opacity-100 hover:text-[var(--accent)] transition-colors">
              ← Back
            </Link>
            <h1 className="text-xl font-bold tracking-tight">LLM Search Readiness Auditor</h1>
          </div>
          <div className="text-xs opacity-50 uppercase tracking-widest">
            Module 04 // AI Optimization
          </div>
        </div>

        {/* Input Form */}
        <div className="p-1 rounded-2xl bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/5 to-transparent">
          <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row gap-2 bg-[var(--background)] p-2 rounded-xl">
            <input 
              type="text" 
              placeholder="Enter URL to audit (e.g. netizenlabs.online)"
              className="flex-1 bg-transparent border-none outline-none px-4 py-3 font-mono text-sm placeholder:opacity-30"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={status === 'analyzing'}
              required
            />
            <button 
              type="submit"
              disabled={status === 'analyzing'}
              className="bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-[var(--accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'analyzing' ? 'Auditing...' : 'Run Audit'}
            </button>
          </form>
        </div>

        {/* Error State */}
        {status === 'error' && (
          <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-500 text-sm rounded-xl">
            [SYS_ERR]: {errorMsg}
          </div>
        )}

        {/* Loading State */}
        {status === 'analyzing' && (
          <div className="p-12 border border-[var(--foreground)]/10 rounded-2xl flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-4 border-[var(--foreground)]/20 border-t-[var(--accent)] rounded-full animate-spin"></div>
            <div className="text-sm opacity-70 animate-pulse">Running heuristic checks against LLM crawler guidelines...</div>
          </div>
        )}

        {/* Results */}
        {status === 'complete' && results && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Audit Complete</h2>
                <p className="text-sm opacity-50 mt-1">Target: {results.url}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-extrabold text-[var(--accent)]">{results.score}/100</div>
                <div className="text-xs uppercase tracking-widest opacity-50">Readiness Score</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {results.checks.map((check, i) => (
                <div key={check.id} className="p-5 rounded-xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 flex gap-4 items-start hover:border-[var(--foreground)]/20 transition-colors">
                  <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${check.passed ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {check.passed ? '✔' : '✖'}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{check.name}</h3>
                    <p className={`text-sm ${check.passed ? 'opacity-70' : 'text-red-400/80'}`}>
                      {check.passed ? check.successMsg : check.failMsg}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
