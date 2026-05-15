import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { ToolConfig } from '@/types/tool'

const CONFIG_PATH = path.join(process.cwd(), 'config', 'tools.yaml')

let cachedTools: ToolConfig[] | null = null

export function getTools(): ToolConfig[] {
  if (cachedTools) return cachedTools

  try {
    const fileContents = fs.readFileSync(CONFIG_PATH, 'utf8')
    const data = yaml.load(fileContents) as { tools: ToolConfig[] }
    cachedTools = data.tools || []
    return cachedTools
  } catch (e) {
    console.error('Error loading tools.yaml:', e)
    return []
  }
}


export function getToolBySlug(slug: string): ToolConfig | undefined {
  const tools = getTools()
  return tools.find(t => t.slug === slug)
}

export function getToolsByCategory(category: string): ToolConfig[] {
  const tools = getTools()
  return tools.filter(t => t.category.toLowerCase() === category.toLowerCase())
}

export function getCategories(): string[] {
  const tools = getTools()
  return Array.from(new Set(tools.map(t => t.category)))
}

export function getRelatedTools(currentTool: ToolConfig, limit: number = 4): ToolConfig[] {
  const allTools = getTools()
  
  return allTools
    .filter(t => t.slug !== currentTool.slug)
    .map(t => {
      // Calculate overlap score
      const overlap = t.tags.filter(tag => currentTool.tags.includes(tag)).length
      
      // HUGE bonus if same subcategory (Topical Cluster)
      const subcategoryBonus = (t.subcategory && t.subcategory === currentTool.subcategory) ? 10 : 0
      
      // Bonus if same category
      const categoryBonus = t.category === currentTool.category ? 2 : 0
      
      return { tool: t, score: overlap + categoryBonus + subcategoryBonus }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.tool)
}

export function generateSoftwareSchema(tool: ToolConfig) {
  const url = `https://wtkpro.site/tools/${tool.slug}`
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': tool.content?.title || tool.name,
    'description': tool.content?.description || `Free online ${tool.name} utility.`,
    'applicationCategory': tool.category,
    'operatingSystem': 'Web Browser',
    'url': url,
    'image': 'https://wtkpro.site/og-image.png', // Fallback to brand image
    'featureList': tool.content?.features?.join(', ') || 'Secure, fast, private',
    'isAccessibleForFree': true,
    'version': tool.releaseDate || '2026.01.01',
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
      'reviewCount': '150',
      'bestRating': '5',
      'worstRating': '1'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'WebToolkit Pro',
      'url': 'https://wtkpro.site',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://wtkpro.site/logo.png'
      }
    }
  }
}

export function generateFAQSchema(tool: ToolConfig) {
  const faqs = tool.content?.faq && tool.content.faq.length > 0 
    ? tool.content.faq 
    : [
        {
          question: `Is the ${tool.name} free to use?`,
          answer: `Yes, the ${tool.name} is 100% free to use. Like all tools on WebToolkit Pro, there are no subscriptions or hidden fees.`
        },
        {
          question: `Is my data secure with the ${tool.name}?`,
          answer: `Absolutely. All processing for the ${tool.name} happens entirely within your web browser. We never transmit your data to our servers, ensuring total privacy.`
        },
        {
          question: `Do I need to install any software to use this ${tool.category}?`,
          answer: `No installation is required. This ${tool.category} utility is a web-based tool that works instantly in any modern browser on desktop or mobile.`
        }
      ]

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  }
}

export function getLatestTool(): ToolConfig | undefined {
  const tools = getTools()
  return [...tools].sort((a, b) => {
    const dateA = new Date(a.releaseDate || '2000-01-01').getTime()
    const dateB = new Date(b.releaseDate || '2000-01-01').getTime()
    return dateB - dateA
  })[0]
}

export function getRelatedToolsForWidget(currentTool: ToolConfig) {
  const allTools = getTools()
  const related = getRelatedTools(currentTool, 10)
  if (related.length === 0) return null

  // Helper to resolve icon from tool slug if possible
  const getIconForSlug = (slug: string, fallback: string) => {
    const t = allTools.find(tool => tool.slug === slug)
    return t?.icon || fallback
  }

  // Emoji to Lucide mapping for static entries
  const emojiMap: Record<string, string> = {
    '📊': 'BarChart3', '🔗': 'Link', '🔐': 'Lock', '🧩': 'Puzzle',
    '🔑': 'Key', '📄': 'FileText', '⏱️': 'Clock', '🎲': 'Dices',
    '🆔': 'Fingerprint', '📱': 'Smartphone', '🤖': 'Bot', '🗺️': 'Map',
    '✅': 'CheckCircle', '📝': 'FileEdit', '🔤': 'Type', '📋': 'Clipboard',
    '👁️': 'Eye', '🎨': 'Palette', '📏': 'Ruler', '⚡': 'Zap',
    '🌐': 'Globe', '🏷️': 'Tag'
  }

  const resolveIcon = (icon: string, href: string) => {
    if (emojiMap[icon]) return emojiMap[icon]
    
    // Try to extract slug from href: /tools/slug/
    const match = href.match(/\/tools\/([^\/]+)\//)
    if (match) return getIconForSlug(match[1], icon)
    
    return icon
  }

  return {
    featured: {
      name: related[0].name,
      href: `/tools/${related[0].slug}`,
      desc: related[0].function.primary,
      icon: related[0].icon || 'Zap',
      badge: 'Recommended'
    },
    cards: related.slice(1, 4).map(t => ({
      name: t.name,
      href: `/tools/${t.slug}`,
      desc: t.function.primary,
      icon: t.icon || 'Zap'
    })),
    pills: related.slice(4).map(t => ({
      name: t.name,
      href: `/tools/${t.slug}`
    })),
    resolveIcon // Export helper for use in page
  }
}
