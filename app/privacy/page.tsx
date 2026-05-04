import React from 'react'

export const metadata = { title: 'Privacy Policy - WebToolkit Pro', description: 'WebToolkit Pro privacy policy. Learn how we handle your data.' }

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: May 2026</p>
        <div className="prose prose-gray max-w-none space-y-8">
          <section><h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2><p className="text-gray-600 leading-relaxed">WebToolkit Pro is designed with privacy as a core principle. All our tools run entirely in your browser. We do not collect, store, or transmit any data you input into our tools. We may collect anonymous analytics data (page views, country of origin) to improve the service.</p></section>
          <section><h2 className="text-2xl font-bold text-gray-900">2. Cookies</h2><p className="text-gray-600 leading-relaxed">We use essential cookies for site functionality. Third-party advertising partners (such as Google AdSense) may use cookies to serve personalized ads based on your browsing history. You can opt out of personalized ads at any time.</p></section>
          <section><h2 className="text-2xl font-bold text-gray-900">3. Third-Party Services</h2><p className="text-gray-600 leading-relaxed">We use Google Analytics for anonymous usage statistics and Google AdSense for advertising. These services may collect data as described in their respective privacy policies.</p></section>
          <section><h2 className="text-2xl font-bold text-gray-900">4. Data Security</h2><p className="text-gray-600 leading-relaxed">Since all tools process data locally in your browser, your data never leaves your device. We implement HTTPS across our entire platform for secure connections.</p></section>
          <section><h2 className="text-2xl font-bold text-gray-900">5. Contact</h2><p className="text-gray-600 leading-relaxed">If you have questions about this Privacy Policy, please contact us at contact@webtoolkitpro.com.</p></section>
        </div>
        <div className="mt-12 h-[250px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space</div>
      </div>
    </div>
  )
}
