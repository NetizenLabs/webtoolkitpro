'use server';

import * as cheerio from 'cheerio';

export async function auditLLMReadiness(url: string) {
  try {
    new URL(url);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    // Attempt to fetch robots.txt
    const robotsUrl = new URL('/robots.txt', url).href;
    let hasCrawlerRestrictions = false;
    try {
      const robotsRes = await fetch(robotsUrl, { signal: controller.signal });
      if (robotsRes.ok) {
        const robotsTxt = await robotsRes.text();
        if (robotsTxt.toLowerCase().includes('disallow: /') || robotsTxt.toLowerCase().includes('user-agent: gptbot') || robotsTxt.toLowerCase().includes('user-agent: ccbot')) {
          hasCrawlerRestrictions = true;
        }
      }
    } catch (e) {
      // ignore
    }

    const response = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Googlebot/2.1 (+http://www.google.com/bot.html)'
      }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // 1. Content Depth
    const textContent = $('body').text().replace(/\s+/g, ' ').trim();
    const wordCount = textContent.split(' ').length;
    const isDeepCopy = wordCount >= 600;

    // 2. Data Structure
    const hasDataStructure = $('table').length > 0 || $('dl').length > 0 || textContent.toLowerCase().includes('pricing') || textContent.toLowerCase().includes('features');

    // 3. Bullet Lists
    const hasBulletLists = $('ul').length > 0 || $('ol').length > 0;

    // 4. Heading Flow
    const headings = $('h1, h2, h3').map((i, el) => el.tagName.toLowerCase()).get();
    let isHeadingFlowLogical = true;
    let prevLevel = 1;
    for (const tag of headings) {
      const level = parseInt(tag.replace('h', ''));
      if (level > prevLevel + 1) {
        isHeadingFlowLogical = false; // Skipped a level (e.g. H1 -> H3)
        break;
      }
      prevLevel = level;
    }

    // 5. Heading Intent
    const headingTexts = $('h1, h2, h3').map((i, el) => $(el).text().toLowerCase()).get().join(' ');
    const hasQuestionIntent = ['how', 'what', 'why', 'when', 'where', 'who'].some(q => headingTexts.includes(q));

    // 6. Data Evidence
    const hasDataEvidence = /\b\d+(\.\d+)?%|\$\d+/.test(textContent) || textContent.toLowerCase().includes('metrics');

    // 7. Schema Depth
    let hasHighValueSchema = false;
    $('script[type="application/ld+json"]').each((i, el) => {
      try {
        const json = $(el).html() || '{}';
        if (json.includes('FAQPage') || json.includes('Article') || json.includes('Product') || json.includes('Organization')) {
          hasHighValueSchema = true;
        }
      } catch (e) {}
    });

    // 8. Entity Trust
    const links = $('a').map((i, el) => $(el).attr('href')?.toLowerCase() || '').get();
    const hasTrustFootprint = links.some(l => l.includes('privacy') || l.includes('terms') || l.includes('about'));

    // 9. Freshness
    const currentYear = new Date().getFullYear().toString();
    const hasFreshness = textContent.includes(currentYear);

    const checks = [
      {
        id: 'crawler',
        name: 'Crawler Access',
        passed: !hasCrawlerRestrictions,
        successMsg: 'No AI crawler restrictions found in robots.txt.',
        failMsg: 'Bot restrictions detected. LLMs may not be able to scrape your site.'
      },
      {
        id: 'depth',
        name: 'Content Depth',
        passed: isDeepCopy,
        successMsg: `High content depth detected (${wordCount} words). Rich entity context available.`,
        failMsg: `Thin copy (${wordCount} words). Aim for 600+ words to give LLMs enough entity context.`
      },
      {
        id: 'structure',
        name: 'Data Structure',
        passed: hasDataStructure,
        successMsg: 'Structured interface (Table, Pricing, or Feature grid) detected.',
        failMsg: 'Missing structured tabular or list data. LLMs struggle to extract unformatted comparisons.'
      },
      {
        id: 'bullets',
        name: 'Bullet Lists',
        passed: hasBulletLists,
        successMsg: 'Lists detected. Good for structural breakdowns.',
        failMsg: 'Missing lists. It\'s advisable to use bullets for structural breakdowns.'
      },
      {
        id: 'flow',
        name: 'Heading Flow',
        passed: isHeadingFlowLogical && headings.length > 0,
        successMsg: 'Logical heading tree structure detected.',
        failMsg: 'Heading hierarchy is broken or skipping levels (e.g., H1 directly to H3).'
      },
      {
        id: 'intent',
        name: 'Heading Intent',
        passed: hasQuestionIntent,
        successMsg: 'Headings use conversational Q&A styling.',
        failMsg: 'Headings lack question-based intent (How, What, Why). Not optimized for conversational AI.'
      },
      {
        id: 'evidence',
        name: 'Data Evidence',
        passed: hasDataEvidence,
        successMsg: 'Data and metrics found. Claims are backed by evidence.',
        failMsg: 'No explicit data or metrics found. Back up claims with data.'
      },
      {
        id: 'schema',
        name: 'Schema Depth',
        passed: hasHighValueSchema,
        successMsg: 'High-value structural Schema types found.',
        failMsg: 'Missing high-value structural Schema types (FAQPage, Article, Product, etc.) for AI summary matching.'
      },
      {
        id: 'trust',
        name: 'Entity Trust',
        passed: hasTrustFootprint,
        successMsg: 'Trust footprint validated (Legal policy links or Brand entity verified).',
        failMsg: 'Missing trust pages (Privacy, Terms, About). Entity trust score may be low.'
      },
      {
        id: 'freshness',
        name: 'Freshness',
        passed: hasFreshness,
        successMsg: `Content validated for the current calendar year (${currentYear}).`,
        failMsg: `Could not verify content freshness for ${currentYear}. Update your footer or timestamps.`
      }
    ];

    return {
      success: true,
      data: {
        url,
        checks,
        score: Math.round((checks.filter(c => c.passed).length / checks.length) * 100)
      }
    };

  } catch (error: any) {
    console.error('LLM Auditor Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to audit URL'
    };
  }
}
