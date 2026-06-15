import Link from 'next/link';

export default function ToolsPage() {
  const upcomingTools = [
    {
      title: "Core Web Vitals Auditor",
      description: "Analyze any URL for Lighthouse performance metrics natively at the edge.",
      status: "In Development",
    },
    {
      title: "Tech Stack Analyzer",
      description: "Instantly detect the exact frontend frameworks, CDNs, and libraries used by competitors.",
      status: "In Development",
    },
    {
      title: "SEO Architecture Scraper",
      description: "Extract heading structures, schema markup, and meta tag integrity for high-intent SEO.",
      status: "Planning",
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center">
      <div className="max-w-4xl w-full px-6">
        
        <div className="mb-16 text-center hero-enter">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 text-sm font-mono text-[var(--accent)] mb-6 bg-[var(--accent)]/5">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></span>
            Agency Infrastructure
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Netizen Labs Tools</h1>
          <p className="text-xl opacity-70 leading-relaxed max-w-2xl mx-auto">
            A bespoke collection of edge-deployed engineering tools designed specifically for technical SEO and web performance auditing. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 hero-enter delay-100">
          {upcomingTools.map((tool, i) => (
            <div key={i} className="p-8 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 flex flex-col justify-between group hover:border-[var(--accent)]/50 transition-colors">
              <div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">{tool.title}</h3>
                <p className="opacity-70 leading-relaxed mb-6">{tool.description}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--foreground)]/10">
                <span className="text-xs font-bold uppercase tracking-widest opacity-50">{tool.status}</span>
                <span className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
              </div>
            </div>
          ))}
          
          <div className="p-8 rounded-2xl bg-[var(--background)] border border-dashed border-[var(--foreground)]/20 flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
            <h3 className="text-xl font-bold mb-2">Request a Custom Tool</h3>
            <p className="text-sm">Need a bespoke internal utility?</p>
            <Link href="/contact" className="mt-4 text-[var(--accent)] font-bold text-sm hover:underline">Let's build it →</Link>
          </div>
        </div>

      </div>
    </main>
  );
}
