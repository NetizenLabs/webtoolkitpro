import React from 'react'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import CookieConsent from '@/components/ui/CookieConsent'
import { DM_Sans, Space_Mono } from 'next/font/google'
import Script from 'next/script'
import { Metadata } from 'next'
// @ts-ignore
import { Analytics } from '@vercel/analytics/react'
// @ts-ignore
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getLatestTool } from '@/lib/tools'
import NewContentNotification from '@/components/ui/NewContentNotification'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
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
  title: 'WebToolkit Pro | Premium Web Toolkit Online for Developers',
  description: 'Access 40+ free premium developer tools in our secure web toolkit. Utilities for JSON formatting, SEO auditing, and enterprise engineering.',
  keywords: 'WebToolkit Pro, developer platform, engineering utilities, secure web tools, technical documentation, developer ecosystem',
  authors: [{ name: 'WebToolkit Pro' }],
  creator: 'WebToolkit Pro',
  publisher: 'WebToolkit Pro',
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
    title: 'WebToolkit Pro | Premium Web Toolkit Online for Developers',
    description: 'Access 40+ free premium developer tools in our secure web toolkit. Utilities for JSON formatting, SEO auditing, and enterprise engineering.',
    url: 'https://wtkpro.site',
    siteName: 'WebToolkit Pro',
    images: [
      {
        url: 'https://wtkpro.site/og-image.png?v=2',
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
    title: 'WebToolkit Pro | 40+ Premium Developer Tools & Expert Guides',
    description: 'WebToolkit Pro offers 40+ free premium developer tools and expert guides. Secure, fast, and optimized for enterprise engineering.',
    images: ['https://wtkpro.site/og-image.png?v=2'],
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
    'theme-color': '#0B1120',
    'color-scheme': 'light dark',
    'preconnect': 'https://wtkpro.site/api',
    'dns-prefetch': [
      'https://wtkpro.site/api',
      'https://pagead2.googlesyndication.com'
    ],
    'x-dns-prefetch-control': 'on',
  },
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1120' },
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
    <html lang="en" className={`${dmSans.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-white dark:bg-[#0B1120] text-gray-900 dark:text-[#F0F6FF] antialiased transition-colors duration-300">
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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow animate-in fade-in duration-700">{children}</main>
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
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://wtkpro.site' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': 'https://wtkpro.site/tools' }
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
            'logo': 'https://wtkpro.site/logo-optimized.webp',
            'sameAs': [
              'https://github.com/WebToolkit-Pro',
              'https://twitter.com/WebToolKitPro'
            ],
            'description': 'Premium developer tools and technical guides for enterprise web development.'
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
            'name': 'WebToolkit Pro',
            'operatingSystem': 'Any',
            'applicationCategory': 'DeveloperApplication',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            },
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '4.9',
              'ratingCount': '1240'
            },
            'description': 'A collection of 40+ free, secure, and ultra-fast web development utilities including JSON formatters, SEO auditing tools, and security generators.'
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
              'target': 'https://wtkpro.site/tools/?q={search_term_string}',
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