import React from 'react'

export const metadata = { 
  title: 'Privacy Policy - WebToolkit Pro', 
  description: 'WebToolkit Pro privacy policy. Learn how we handle your data, our use of cookies, and our commitment to GDPR and CCPA compliance.' 
}

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: May 4, 2026</p>
        
        <div className="prose prose-gray max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              At WebToolkit Pro, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you visit our website. By using our site, you agree to the practices described here.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>Local Processing:</strong> All tools provided on WebToolkit Pro (such as JSON Formatter, Password Generator, etc.) run entirely in your web browser. We do not transmit, store, or see any of the data you input into these tools.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Log Files:</strong> Like most websites, we collect anonymous information such as IP addresses, browser type, internet service provider (ISP), date/time stamps, and referring pages. This data is used solely for analyzing trends and administering the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">3. Cookies and Web Beacons</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies to store information about visitors' preferences and to record user-specific information on which pages the user accesses or visits.
            </p>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mt-4">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Google DoubleClick DART Cookie</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                Google, as a third-party vendor, uses cookies to serve ads on WebToolkit Pro. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at the following URL – <a href="https://www.google.com/privacy_ads.html" className="underline">https://www.google.com/privacy_ads.html</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">4. Advertising Partners</h2>
            <p className="text-gray-600 leading-relaxed">
              Some of our advertising partners may use cookies and web beacons on our site. Our primary advertising partner is <strong>Google AdSense</strong>.
            </p>
            <p className="text-gray-600 leading-relaxed">
              These third-party ad servers or ad networks use technology in their respective advertisements and links that appear on WebToolkit Pro and which are sent directly to your browser. They automatically receive your IP address when this occurs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">5. GDPR and CCPA Compliance</h2>
            <p className="text-gray-600 leading-relaxed">
              We respect your rights under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Right to be informed:</strong> You have the right to know how your data is used.</li>
              <li><strong>Right of access:</strong> You can request a copy of the data we hold (which is minimal/anonymous).</li>
              <li><strong>Right to erasure:</strong> You can request that we delete your data.</li>
              <li><strong>Right to opt-out:</strong> You can decline cookies through our consent banner or browser settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">6. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions or concerns regarding this privacy policy, please contact us at <strong>contact@webtoolkitpro.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
