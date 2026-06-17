export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Netizen Labs',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 bg-[var(--background)] min-h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Terms of Service</h1>
      <div className="prose prose-invert opacity-80 leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using Netizen Labs services and tools, you accept and agree to be bound by the terms and provision of this agreement.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Service Usage</h2>
        <p>Our tools are provided "as is" without warranties of any kind. You agree not to misuse our services or use them for any malicious purposes.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Intellectual Property</h2>
        <p>The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary rights.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. We will always post the most current version on our site.</p>
      </div>
    </div>
  );
}
