import React from 'react'

export const metadata = { title: 'Terms of Service - WebToolkit Pro', description: 'WebToolkit Pro terms of service and usage agreement.' }

export default function TermsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: May 2026</p>
        <div className="prose prose-gray max-w-none space-y-8">
          <section><h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2><p className="text-gray-600 leading-relaxed">By accessing and using WebToolkit Pro, you accept and agree to be bound by these Terms of Service. If you do not agree with any part, you may not access the service.</p></section>
          <section><h2 className="text-2xl font-bold text-gray-900">2. Use of Service</h2><p className="text-gray-600 leading-relaxed">WebToolkit Pro provides free online developer tools. You may use these tools for personal or commercial purposes. You agree not to misuse the service or attempt to disrupt its operation.</p></section>
          <section><h2 className="text-2xl font-bold text-gray-900">3. Intellectual Property</h2><p className="text-gray-600 leading-relaxed">The content, design, and code of WebToolkit Pro are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without permission.</p></section>
          <section><h2 className="text-2xl font-bold text-gray-900">4. Disclaimer</h2><p className="text-gray-600 leading-relaxed">WebToolkit Pro is provided &quot;as is&quot; without warranties. We are not responsible for any damages arising from the use of our tools. Results should be verified for critical applications.</p></section>
          <section><h2 className="text-2xl font-bold text-gray-900">5. Advertising</h2><p className="text-gray-600 leading-relaxed">We display advertisements to support the free service. These ads may be provided by third-party services including Google AdSense.</p></section>
          <section><h2 className="text-2xl font-bold text-gray-900">6. Changes</h2><p className="text-gray-600 leading-relaxed">We reserve the right to update these terms at any time. Continued use of the service constitutes acceptance of modified terms.</p></section>
        </div>
        <div className="mt-12 h-[250px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space</div>
      </div>
    </div>
  )
}
