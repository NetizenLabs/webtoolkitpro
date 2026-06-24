import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from '@/components/ui/NativeLink';
import { getToolBySlug, getTools, getRelatedTools, getRelatedToolsForWidget } from '@/lib/tools'
import { generateSoftwareSchema } from '@/lib/seo/schema'
import { ArrowRight, ShieldCheck, Info } from 'lucide-react'
import ToolRenderer from '@/components/tools/ToolRenderer'
import ToolInfo from '@/components/sections/ToolInfo'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import RelatedToolsSidebar from '@/components/tools/RelatedToolsSidebar'
import RelatedToolsWidget from '@/components/tools/RelatedToolsWidget'
import ProBannerCTA from '@/components/tools/ProBannerCTA'
import { RELATED_TOOLS_MAP } from '@/lib/related-tools-map'
import ToolUsageTracker from '@/components/tools/ToolUsageTracker'
import AdSlot from '@/components/ads/AdSlot'
import AIOContextButton from '@/components/tools/AIOContextButton'
import { CATEGORY_MAP } from '@/lib/categories'
import DynamicIcon from '@/components/ui/DynamicIcon'
import { getRelatedPostsForTool } from '@/lib/blog'
import FurtherReading from '@/components/sections/FurtherReading'
import ToolPersonalizationClient from '@/components/tools/ToolPersonalizationClient'

interface ToolPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const tools = getTools()
  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

// ISR: revalidate tool pages once per day in the background
// Keeps pages fast while allowing content updates without a full redeploy
export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug)
  if (!tool) return {}

  const brandSuffix = ' | WTK Pro'
  let title = tool.meta?.title || `${tool.name} | Professional Online ${tool.category}`
  
  if ((title.length + brandSuffix.length) > 58) {
    const maxLength = 58 - brandSuffix.length - 3
    const truncated = title.slice(0, maxLength)
    // Trim to last full word
    title = truncated.slice(0, truncated.lastIndexOf(' ')).trim() + '...'
  }
  title += brandSuffix

  let description = tool.content?.description || `Free online ${tool.name}. Secure, private, and fast developer utility.`
  
  // Truncate description to 155 chars for safety (SEO pixel limit)
  if (description.length > 155) {
    description = description.substring(0, 152).trim() + '...'
  }
  
  // Use dedicated keywords if available, fallback to tags
  const keywords = tool.content?.keywords 
    ? (Array.isArray(tool.content.keywords) ? tool.content.keywords.join(', ') : tool.content.keywords)
    : tool.tags.join(', ')

  return {
    title,
    description,
    alternates: {
      canonical: `https://wtkpro.site/tools/${tool.slug}/`,
    },
    keywords,
    openGraph: {
      title,
      description,
      url: `https://wtkpro.site/tools/${tool.slug}/`,
      siteName: 'WebToolkit Pro',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://wtkpro.site/og-image.jpg',
          width: 1200,
          height: 630,
          alt: tool.name,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://wtkpro.site/og-image.jpg'],
    },

  }
}

import DeveloperToolLayout from '@/components/tools/layouts/DeveloperToolLayout'
import DefaultToolLayout from '@/components/tools/layouts/DefaultToolLayout'
import DesignToolLayout from '@/components/tools/layouts/DesignToolLayout'
import SEOToolLayout from '@/components/tools/layouts/SEOToolLayout'
import TextToolLayout from '@/components/tools/layouts/TextToolLayout'

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug)
  if (!tool) notFound()

  const relatedTools = getRelatedTools(tool)
  const softwareSchema = generateSoftwareSchema(tool)
  const categorySlug = Object.keys(CATEGORY_MAP).find(key => CATEGORY_MAP[key] === tool.category) || 'developer-tools'

  const layoutProps = {
    tool,
    categorySlug,
    relatedTools,
    softwareSchema
  }

  // Dispatcher Pattern: Break the DOM footprint based on category
  switch (tool.category) {
    case 'Developer Tools':
    case 'Security Tools':
    case 'Network & Performance':
      return <DeveloperToolLayout {...layoutProps} />
    case 'Design Tools':
      return <DesignToolLayout {...layoutProps} />
    case 'SEO Tools':
      return <SEOToolLayout {...layoutProps} />
    case 'Text Tools':
      return <TextToolLayout {...layoutProps} />
    default:
      return <DefaultToolLayout {...layoutProps} />
  }
}
