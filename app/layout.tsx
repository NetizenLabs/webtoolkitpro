import React from 'react'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import CookieConsent from '@/components/ui/CookieConsent'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://wtkpro.site'),
  title: 'WebToolkit Pro | 26+ Premium Developer Tools & Guides',
  description: 'Premium collection of 26+ free developer tools and technical guides. Secure, fast, and optimized for enterprise development.',
  keywords: 'developer tools, json formatter, password generator, webtoolkit pro, seo tools, technical guides, base64 encoder',
  authors: [{ name: 'WebToolkit Pro' }],
  creator: 'WebToolkit Pro',
  publisher: 'WebToolkit Pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'mDdN3EPYoUOznSZf30r9MWseEpejEY2n2l18mhlQX1k',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'WebToolkit Pro | 26+ Premium Developer Tools & Guides',
    description: 'Premium collection of 26+ free developer tools and technical guides. Secure, fast, and optimized for enterprise development.',
    url: 'https://wtkpro.site',
    siteName: 'WebToolkit Pro',
    images: [
      {
        url: 'https://wtkpro.site/og-image.png?v=1',
        width: 1200,
        height: 630,
        alt: 'WebToolkit Pro - Professional Developer Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebToolkit Pro | 26+ Premium Developer Tools & Guides',
    description: 'Premium collection of 26+ free developer tools and technical guides.',
    images: ['https://wtkpro.site/og-image.png?v=1'],
    creator: '@WebToolkitPro',
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        {/* CDN & Edge Performance Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* Resource Hints for High Authority Assets */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Global SEO & Trust Signals */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  'position': 1,
                  'name': 'Home',
                  'item': 'https://wtkpro.site'
                },
                {
                  '@type': 'ListItem',
                  'position': 2,
                  'name': 'Tools',
                  'item': 'https://wtkpro.site/tools'
                }
              ]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              'name': 'WebToolkit Pro',
              'url': 'https://wtkpro.site',
              'logo': 'https://wtkpro.site/logo-full.png',
              'sameAs': [
                'https://github.com/abusufyan-netizen/webtoolkitpro'
              ],
              'address': {
                '@type': 'PostalAddress',
                'addressLocality': 'New York',
                'addressRegion': 'NY',
                'addressCountry': 'US'
              },
              'description': 'Premium developer tools and technical guides for enterprise web development.'
            }),
          }}
        />
        {/* AdSense Script using Next.js Script component for better error handling and performance */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4234692080899883"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied'
            });
          `}
        </Script>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1QB54ZRCS5"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1QB54ZRCS5');
          `}
        </Script>
      </head>
      <body className="bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 antialiased transition-colors duration-300">
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