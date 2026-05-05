import React from 'react'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import CookieConsent from '@/components/ui/CookieConsent'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WebToolkit Pro - Free Online Developer Tools',
  description: 'Free, premium online developer tools and utilities. JSON formatter, password generator, Base64 encoder, color picker, and 10+ more tools for web professionals.',
  keywords: 'developer tools, JSON formatter, password generator, base64 encoder, online tools, web development, free tools',
  verification: {
    google: 'WoptvfLSD7zyx_FHo65sWstAvRV_FBFiGW6BxmQkXu0',
  },
  openGraph: {
    title: 'WebToolkit Pro - Free Online Developer Tools',
    description: 'Free, premium online developer tools and utilities for web professionals.',
    url: 'https://abusufyan-netizen.github.io',
    siteName: 'WebToolkit Pro',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
  other: {
    'google-adsense-account': 'ca-pub-4234692080899883',
    'geo.region': 'US',
    'geo.placename': 'United States',
    'content-language': 'en-US',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Global SEO & Trust Signals */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              'name': 'WebToolkit Pro',
              'url': 'https://abusufyan-netizen.github.io',
              'logo': 'https://abusufyan-netizen.github.io/favicon.svg',
              'sameAs': [
                'https://github.com/abusufyan-netizen/webtoolkit_pro'
              ],
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': '1600 Amphitheatre Parkway',
                'addressLocality': 'Mountain View',
                'addressRegion': 'CA',
                'postalCode': '94043',
                'addressCountry': 'US'
              },
              'description': 'Professional developer tools and technical guides for enterprise web development.'
            }),
          }}
        />
        {/* AdSense Script using Next.js Script component for better error handling and performance */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4234692080899883"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CookieConsent />
        </div>
      </body>
    </html>
  )
}