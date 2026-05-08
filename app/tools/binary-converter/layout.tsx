import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Binary to Text & Decimal Converter | WebToolkit Pro',
  description: 'Convert between Binary, Decimal, Hexadecimal, and Plain Text. Essential utility for low-level programming and data analysis.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/binary-converter/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/binary-converter/',
      'x-default': 'https://wtkpro.site/tools/binary-converter/',
    },
  },
}

export default function BinaryConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
