export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Netizen Labs',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 bg-[var(--background)] min-h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>
      <div className="prose prose-invert opacity-80 leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
        <p>At Netizen Labs, we prioritize your privacy. We collect minimal information necessary to provide our services. We do not sell or share your data with third parties.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Zero-Server Philosophy</h2>
        <p>Many of our tools, such as those featured on WebToolkit Pro, execute entirely within your browser. This means your sensitive data never leaves your device and is never transmitted to our servers.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Analytics and Tracking</h2>
        <p>We use privacy-respecting analytics to understand traffic patterns and improve performance. We do not track individual users across the web.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at support@netizenlabs.online.</p>
      </div>
    </div>
  );
}
