'use client';

import { useState } from 'react';
import Link from 'next/link';
import { scrapeSEO } from '@/actions/seo-scraper';

export default function SEOScraperPage() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'scraping' | 'complete' | 'error'>('idle');
  const [results, setResults] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    let formattedUrl = url;
    if (!url.startsWith('http')) {
      formattedUrl = `https://${url}`;
    }

    setStatus('scraping');
    setErrorMsg('');
    setResults(null);

    const res = await scrapeSEO(formattedUrl);

    if (res.success && res.data) {
      setResults(res.data);
      setStatus('complete');
    } else {
      setErrorMsg(res.error || 'Failed to scrape URL');
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center">
      <div className="max-w-6xl w-full px-6">
        
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 mb-8 transition-opacity">
          ← Back to Tools
        </Link>

        <div className="mb-12 hero-enter">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 text-[10px] font-mono text-blue-500 mb-4 bg-blue-500/5 uppercase tracking-widest">
            Crawler Engaged
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">SEO Architecture Scraper</h1>
          <p className="text-lg opacity-70 leading-relaxed">
            Extract meta tags, heading hierarchies, and JSON-LD Schema to audit the semantic structure of any webpage.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="flex gap-4 mb-12 hero-enter delay-50">
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Target URL (e.g., example.com/blog)"
            className="flex-1 bg-[var(--foreground)]/5 border border-[var(--foreground)]/20 rounded-xl px-6 py-4 outline-none focus:border-blue-500 transition-colors text-lg"
            disabled={status === 'scraping'}
            required
          />
          <button 
            type="submit"
            disabled={status === 'scraping'}
            className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:shadow-none"
          >
            {status === 'scraping' ? 'Extracting...' : 'Initialize Crawler'}
          </button>
        </form>

        {status === 'scraping' && (
          <div className="w-full py-20 flex flex-col items-center justify-center border border-[var(--foreground)]/10 rounded-2xl bg-[var(--foreground)]/5 hero-enter">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="font-mono text-sm opacity-60 animate-pulse">EXTRACTING DOM STRUCTURE...</div>
          </div>
        )}

        {status === 'error' && (
          <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500">
            <strong>Crawler Error:</strong> {errorMsg}
          </div>
        )}

        {status === 'complete' && results && (
          <div className="space-y-8 hero-enter">
            {/* Meta Data Card */}
            <div className="p-8 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 overflow-hidden">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Meta Signatures
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-4">
                  <div className="text-xs font-bold uppercase opacity-50 mb-1">Title Tag</div>
                  <div className="font-mono text-sm bg-black/20 dark:bg-white/5 p-3 rounded-lg border border-black/10 dark:border-white/10 break-all">
                    {results.meta.title || <span className="opacity-50 italic">Missing</span>}
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="text-xs font-bold uppercase opacity-50 mb-1">Meta Description</div>
                  <div className="font-mono text-sm bg-black/20 dark:bg-white/5 p-3 rounded-lg border border-black/10 dark:border-white/10 break-all">
                    {results.meta.description || <span className="opacity-50 italic">Missing</span>}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs font-bold uppercase opacity-50 mb-1">Robots Directive</div>
                  <div className="font-mono text-sm bg-black/20 dark:bg-white/5 p-3 rounded-lg border border-black/10 dark:border-white/10 break-all">
                    {results.meta.robots}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs font-bold uppercase opacity-50 mb-1">Canonical URL</div>
                  <div className="font-mono text-sm bg-black/20 dark:bg-white/5 p-3 rounded-lg border border-black/10 dark:border-white/10 break-all">
                    {results.meta.canonical || <span className="opacity-50 italic">Missing</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout for Headings and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Headings */}
              <div className="lg:col-span-2 p-8 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 max-h-[500px] overflow-y-auto">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M4 12h16"></path><path d="M4 18h16"></path><path d="M4 6h16"></path></svg>
                  Heading Hierarchy ({results.headings.length})
                </h2>
                {results.headings.length === 0 ? (
                  <p className="opacity-50">No headings found.</p>
                ) : (
                  <div className="space-y-3">
                    {results.headings.map((h: any, i: number) => {
                      const ml = h.level === 'H1' ? 'ml-0' : h.level === 'H2' ? 'ml-4' : h.level === 'H3' ? 'ml-8' : 'ml-12';
                      const color = h.level === 'H1' ? 'text-blue-500' : 'text-[var(--foreground)] opacity-70';
                      return (
                        <div key={i} className={`flex items-start gap-3 ${ml} p-2 rounded-md hover:bg-[var(--foreground)]/5`}>
                          <span className={`text-xs font-bold w-6 pt-1 ${color}`}>{h.level}</span>
                          <span className="text-sm font-medium">{h.text}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Stats Block */}
              <div className="p-8 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  Document Stats
                </h2>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-extrabold">{results.stats.wordCount}</div>
                    <div className="text-sm font-bold uppercase tracking-widest opacity-50">Words on Page</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold">{results.stats.totalLinks}</div>
                    <div className="text-sm font-bold uppercase tracking-widest opacity-50">Total Links</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold">{results.stats.totalImages}</div>
                    <div className="text-sm font-bold uppercase tracking-widest opacity-50">Images</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-extrabold ${results.stats.imagesWithoutAlt > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {results.stats.imagesWithoutAlt}
                    </div>
                    <div className="text-sm font-bold uppercase tracking-widest opacity-50">Images Missing Alt</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Schema */}
            {results.schemas.length > 0 && (
              <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-[var(--foreground)]/20 text-white">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  Schema.org JSON-LD ({results.schemas.length})
                </h2>
                <div className="space-y-4">
                  {results.schemas.map((schema: any, i: number) => (
                    <pre key={i} className="p-4 rounded-lg bg-black/50 border border-white/10 font-mono text-xs text-green-400 overflow-x-auto">
                      {JSON.stringify(schema, null, 2)}
                    </pre>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
