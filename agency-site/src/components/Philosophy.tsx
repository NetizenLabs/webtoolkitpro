export default function Philosophy() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
          Zero fluff. <br className="md:hidden" />
          <span className="text-[var(--accent)]">Pure engineering.</span>
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed opacity-70 mb-12 font-medium">
          Most agencies sell you templates. We build bespoke digital infrastructure designed to dominate your market. If your site isn't loading in milliseconds, you're losing money.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm font-bold uppercase tracking-widest opacity-50 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)]"></span>
            Lighthouse 100
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)]"></span>
            Edge Rendered
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)]"></span>
            Type Safe
          </div>
        </div>
      </div>
    </section>
  );
}
