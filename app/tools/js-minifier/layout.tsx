import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JS Code Minifier | High-Performance Compression | WebToolkit Pro',
  description: 'Compress and optimize your JavaScript code for production. Reduce file size and improve page load speeds with enterprise-grade minification.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/js-minifier/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/js-minifier/',
      'x-default': 'https://wtkpro.site/tools/js-minifier/',
    },
  },
}

export default function JsMinifierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
