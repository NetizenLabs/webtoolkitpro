import React from 'react'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import CookieConsent from '@/components/ui/CookieConsent'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Metadata } from 'next'
// @ts-ignore
import { Analytics } from '@vercel/analytics/react'
// @ts-ignore
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://wtkpro.site'),
  alternates: {
  },
  title: 'WebToolkit Pro | 65+ Premium Developer Tools & Expert Guides',
  description: 'WebToolkit Pro offers 65+ free premium developer tools and expert guides. Secure, fast, and optimized for enterprise engineering. Format JSON and master SEO.',
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
    title: 'WebToolkit Pro | 65+ Premium Developer Tools & Expert Guides',
    description: 'WebToolkit Pro offers 65+ free premium developer tools and expert guides. Secure, fast, and optimized for enterprise engineering. Format JSON, generate passwords, and master SEO.',
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
    title: 'WebToolkit Pro | 65+ Premium Developer Tools & Expert Guides',
    description: 'WebToolkit Pro offers 65+ free premium developer tools and expert guides. Secure, fast, and optimized for enterprise engineering.',
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
    'HandheldFriendly': 'True',
    'MobileOptimized': '320',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'WebToolkit Pro',
    'theme-color': '#2563eb',
  },
  manifest: '/manifest.json',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        {/* Performance & Resource Hints */}
        <link rel="preconnect" href="https://wtkpro.site/api" />
        <link rel="dns-prefetch" href="https://wtkpro.site/api" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
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
              'sameAs': ['https://github.com/abusufyan-netizen/webtoolkitpro'],
              'description': 'Premium developer tools and technical guides for enterprise web development.'
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
        
        {/* Google Analytics 4 - Standard high-performance loading */}
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
          <main className="flex-grow animate-in fade-in duration-700">{children}</main>
          <Footer />
          <CookieConsent />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}