import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--foreground)]/5 bg-[var(--background)]/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="font-extrabold text-xl tracking-tight flex items-center gap-2 group transition-opacity hover:opacity-80">
          <div className="w-6 h-6 rounded-md bg-[var(--foreground)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[var(--background)]"></div>
          </div>
          Netizen Labs
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-80">
          <Link href="/#services" className="transition-colors hover:text-[var(--accent)] active:scale-95">Services</Link>
          <Link href="/tools" className="transition-colors hover:text-[var(--accent)] active:scale-95">Tools</Link>
          <Link href="/blog" className="transition-colors hover:text-[var(--accent)] active:scale-95">Blog</Link>
        </nav>

        {/* Action */}
        <Link 
          href="/contact" 
          className="text-sm font-bold px-4 py-2 rounded-full bg-[var(--foreground)] text-[var(--background)] transition-all duration-[160ms] ease-out-custom hover:scale-[1.02] active:scale-[0.97] select-none"
        >
          Book Audit
        </Link>
      </div>
    </header>
  );
}
