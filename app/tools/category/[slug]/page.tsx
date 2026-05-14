import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getToolsByCategory } from '@/lib/tools'
import { CATEGORY_PILLARS, CATEGORY_MAP } from '@/lib/categories'
import ToolsClient from '../../ToolsClient'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pillar = CATEGORY_PILLARS[params.slug]
  if (!pillar) return {}

  return {
    title: pillar.title,
    description: pillar.description,
    keywords: pillar.keywords,
    alternates: {
      canonical: `https://wtkpro.site/tools/category/${params.slug}`,
    }
  }
}

export default function CategoryPillarPage({ params }: Props) {
  const categoryName = CATEGORY_MAP[params.slug]
  if (!categoryName) notFound()

  const tools = getToolsByCategory(categoryName)

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pt-12">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1E2D47] dark:text-white mb-6 tracking-tighter">
          {categoryName}
        </h1>
        <p className="text-lg text-gray-600 dark:text-[#8A9BBE] max-w-3xl leading-relaxed">
          {CATEGORY_PILLARS[params.slug].description}
        </p>
      </div>

      <ToolsClient 
        initialTools={tools} 
        isSubPage={true} 
        title={`${categoryName} Suite`} 
      />
    </main>
  )
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({
    slug: slug,
  }))
}
