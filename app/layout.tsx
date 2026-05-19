import React from 'react'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import CookieConsent from '@/components/ui/CookieConsent'
import { Inter, Space_Mono } from 'next/font/google'
import Script from 'next/script'
import { Metadata } from 'next'
// @ts-ignore
import { Analytics } from '@vercel/analytics/react'
// @ts-ignore
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getLatestTool } from '@/lib/tools'
import NewContentNotification from '@/components/ui/NewContentNotification'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap'
})
const spaceMono = Space_Mono({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-space-mono' 
})

export const metadata: Metadata = {
  metadataBase: new URL('https://wtkpro.site'),
  alternates: {
    canonical: 'https://wtkpro.site/',
  },
  title: 'Web Toolkit Pro - 150+ Free Premium Online Developer Tools',
  description: 'Access Web Toolkit Pro: 150+ secure, free client-side developer tools. Fast online utilities for JSON formatting, XML beautification, and technical SEO.',
  keywords: ['wtk', 'wtkpro', 'Web Toolkit', 'Web Toolkit Online', 'WebToolkit Pro', 'developer platform', 'engineering utilities', 'secure web tools'],
  authors: [{ name: 'WebToolkit Pro' }],
  creator: 'WebToolkit Pro',
  publisher: 'WebToolkit Pro',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'WebToolkit Pro',
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
  openGraph: {
    title: 'Web Toolkit Pro - 150+ Free Premium Online Developer Tools',
    description: 'Access Web Toolkit Pro: 150+ secure, free client-side developer tools. Fast online utilities for JSON formatting, XML beautification, and technical SEO.',
    url: 'https://wtkpro.site/',
    siteName: 'WebToolkit Pro',
    images: [
      {
        url: 'https://wtkpro.site/og-image.png?v=4',
        width: 1200,
        height: 630,
        alt: 'WebToolkit Pro - 150+ Professional Developer Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Toolkit Pro - 150+ Free Premium Online Developer Tools',
    description: 'Access Web Toolkit Pro: 150+ secure, free client-side developer tools. Fast online utilities for JSON formatting, XML beautification, and technical SEO.',
    images: ['https://wtkpro.site/og-image.png?v=4'],
    creator: '@WebToolKitPro',
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
    'HandheldFriendly': 'True',
    'MobileOptimized': '320',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'WebToolkit Pro',
    'theme-color': '#0D1117',
    'color-scheme': 'light dark',
  },
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F8FA' },
    { media: '(prefers-color-scheme: dark)', color: '#0D1117' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const latestTool = getLatestTool()
  const latestItem = latestTool ? {
    name: latestTool.name,
    slug: latestTool.slug,
    type: 'tool' as const,
    date: latestTool.releaseDate || ''
  } : null

  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className="font-sans bg-background text-foreground antialiased transition-colors duration-300">
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) theme = 'dark';
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                  else document.documentElement.classList.remove('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieConsent />
        <NewContentNotification latestItem={latestItem} />
      </div>
      
      {/* Global SEO & Trust Signals */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'WebToolkit Pro',
            'url': 'https://wtkpro.site',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://wtkpro.site/logo-optimized.webp',
              'width': '512',
              'height': '512'
            },
            'sameAs': [
              'https://github.com/WebToolkit-Pro',
              'https://twitter.com/WebToolKitPro',
              'https://producthunt.com/products/webtoolkit-pro',
              'https://severancecalculator.xyz',
              'https://tradeconvert.pro',
              'https://abusufyan.xyz'
            ],
            'description': 'The global standard for secure, client-side developer utilities and technical engineering journals.',
            'contactPoint': {
              '@type': 'ContactPoint',
              'email': 'hello@wtkpro.site',
              'contactType': 'customer support'
            }
          }),
        }}
      />
      
      {/* AIO: SoftwareApplication Schema for AI Tools */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            'name': 'WebToolkit Pro Suite',
            'operatingSystem': 'Any modern web browser',
            'applicationCategory': 'DeveloperApplication',
            'url': 'https://wtkpro.site',
            'author': {
              '@type': 'Organization',
              'name': 'WebToolkit Pro'
            },
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD',
              'availability': 'https://schema.org/InStock'
            },
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '4.9',
              'reviewCount': '2500',
              'bestRating': '5',
              'worstRating': '1'
            },
            'description': 'A collection of 50+ free, secure, and ultra-fast web development utilities including JSON formatters, SEO auditing tools, and security generators. Built for privacy and performance.'
          }),
        }}
      />

      {/* AIO: WebSite SearchAction for AI Discovery */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'url': 'https://wtkpro.site',
            'potentialAction': {
              '@type': 'SearchAction',
              'target': 'https://wtkpro.site/tools?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          }),
        }}
      />
      
      <Script id="google-consent-default" strategy="afterInteractive">
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
      
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4234692080899883"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      
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

      <Analytics />
      <SpeedInsights />
    </body>
  </html>
  )
}