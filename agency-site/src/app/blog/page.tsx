import Link from 'next/link';

export default function BlogPage() {
  const articles = [
    {
      title: "Why Edge-Rendering is the Future of High-Intent SEO",
      excerpt: "Analyzing the performance benefits of Vercel's Edge Network compared to traditional Node.js serverless functions for programmatic SEO.",
      date: "Oct 24, 2024",
      readTime: "5 min read",
      category: "Architecture"
    },
    {
      title: "Zero-Server Web Apps: A Practical Guide",
      excerpt: "How we eliminate database latency and server costs by building 100% client-side, instant-execution developer utilities.",
      date: "Oct 12, 2024",
      readTime: "8 min read",
      category: "Engineering"
    },
    {
      title: "Lighthouse 100/100: The Invisible Details",
      excerpt: "Breaking down the exact CSS and JavaScript optimization techniques required to hit perfect performance scores on mobile.",
      date: "Sep 28, 2024",
      readTime: "6 min read",
      category: "Performance"
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center">
      <div className="max-w-4xl w-full px-6">
        
        <div className="mb-16 hero-enter">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Engineering Journal</h1>
          <p className="text-xl opacity-70 leading-relaxed max-w-2xl">
            Deep-dives into modern web architecture, performance optimization, and building systems that dominate search.
          </p>
        </div>

        <div className="flex flex-col gap-8 hero-enter delay-100">
          {articles.map((article, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="py-8 border-b border-[var(--foreground)]/10 transition-colors group-hover:border-[var(--accent)]/50">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-50 mb-4 font-mono">
                  <span className="text-[var(--accent)]">{article.category}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:text-[var(--accent)] transition-colors">
                  {article.title}
                </h2>
                <p className="text-lg opacity-70 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                  Read Article <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}
