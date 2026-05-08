import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSS Unit Converter Pro | PX to REM, EM, VH, VW | WebToolkit Pro',
  description: 'Instant conversion between CSS units for responsive web design. Calculate pixel to rem, em, and viewport units with precision.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/css-unit-converter/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/css-unit-converter/',
      'x-default': 'https://wtkpro.site/tools/css-unit-converter/',
    },
  },
}

export default function CssUnitConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
