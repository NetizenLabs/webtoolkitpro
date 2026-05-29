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
import dynamic from 'next/dynamic'
import { cache } from 'react'
import { PipelineProvider } from '@/contexts/PipelineContext'
import CommandBar from '@/components/ui/CommandBar'
import { getTools } from '@/lib/tools'
import WebMCPProvider from '@/components/tools/WebMCPProvider'

// Lazy-load non-critical UI so it doesn't block the initial render / LCP
const NewContentNotification = dynamic(
  () => import('@/components/ui/NewContentNotification'),
  { ssr: false }
)

// cache() memoizes getLatestTool per request so calling it in layout
// doesn't re-parse the tools catalog multiple times per render tree
const getLatestToolCached = cache(getLatestTool)

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
  title: '150+ Free Privacy-First Developer Tools | WebToolkit Pro',
  description: 'Access Web Toolkit Pro: 150+ secure, free client-side developer tools. Fast online utilities for JSON formatting, XML beautification, and technical SEO.',
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
    title: '150+ Free Privacy-First Developer Tools | WebToolkit Pro',
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
    title: '150+ Free Privacy-First Developer Tools | WebToolkit Pro',
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
    'ahrefs-site-verification': '4a8aee7293cd1e309320e8b15dcc3bcfb7dbedbfa614e03f0bdece030b77b102',
    'content-language': 'en-US',
    'HandheldFriendly': 'True',
    'MobileOptimized': '320',
    'mobile-web-app-capable': 'yes',
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
  const latestTool = getLatestToolCached()
  const latestItem = latestTool ? {
    name: latestTool.name,
    slug: latestTool.slug,
    type: 'tool' as const,
    date: latestTool.releaseDate || ''
  } : null

  // Map minimal tools for the client-side CommandBar to prevent huge hydration payload
  const allTools = getTools().map(t => ({
    slug: t.slug,
    name: t.name,
    category: t.category,
    icon: t.icon || 'Zap',
    description: t.content?.description || t.function?.primary || '',
    tags: t.tags
  }))

  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to critical origins before any render */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        {/* KaTeX Stylesheet for math rendering */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
        {/* DNS prefetch for non-critical third parties (not font origins — preconnect covers those) */}
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister().then(function(boolean) {
                      console.log('Successfully unregistered corrupted Service Worker!');
                    });
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body className="font-sans bg-background text-foreground antialiased transition-colors duration-300">
      <div className="min-h-screen flex flex-col">
        <PipelineProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CommandBar tools={allTools} />
          <CookieConsent />
          <NewContentNotification latestItem={latestItem} />
          <WebMCPProvider />
        </PipelineProvider>
      </div>
      
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