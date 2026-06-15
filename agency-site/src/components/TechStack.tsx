export default function TechStack() {
  const tech = [
    "Next.js",
    "React",
    "Tailwind CSS",
    "TypeScript",
    "Vercel",
    "Edge Runtime",
  ];

  return (
    <section className="py-12 border-y border-[var(--foreground)]/5 bg-[var(--foreground)]/5 backdrop-blur-sm overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs font-mono font-bold uppercase tracking-[0.2em] opacity-40 mb-8">
          Powered by industry-leading infrastructure
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {tech.map((item) => (
            <div 
              key={item} 
              className="text-lg md:text-xl font-bold tracking-tight opacity-40 hover:opacity-100 hover:text-[var(--accent)] transition-all duration-300 select-none grayscale hover:grayscale-0"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
