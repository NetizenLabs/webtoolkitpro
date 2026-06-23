const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'faq-schema': {
    practical_application: "Injecting FAQPage JSON-LD directly into your `<head>` guarantees eligibility for Google's coveted rich snippets (the 'People Also Ask' boxes). Securing this 'Position Zero' real estate drastically increases your organic CTR (Click-Through Rate) by dominating the visible viewport before the user even scrolls.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Next.js JSON-LD Injection",
        code: "export function FAQSchema({ questions }) {\n  const schema = {\n    \"@context\": \"https://schema.org\",\n    \"@type\": \"FAQPage\",\n    \"mainEntity\": questions.map(q => ({\n      \"@type\": \"Question\",\n      \"name\": q.question,\n      \"acceptedAnswer\": { \"@type\": \"Answer\", \"text\": q.answer }\n    }))\n  };\n  return <script type=\"application/ld+json\" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;\n}"
      }
    ]
  },
  'review-schema': {
    practical_application: "Review Schema directly influences conversion rates. By injecting AggregateRating JSON-LD, Google displays gold star ratings directly on the search engine results page (SERP). E-commerce data proves that search listings with star ratings experience a 35% higher Click-Through Rate than generic blue links.",
    code_blueprints: [
      {
        language: "json",
        title: "Valid AggregateRating Data",
        code: "{\n  \"@context\": \"https://schema.org/\",\n  \"@type\": \"SoftwareApplication\",\n  \"name\": \"WebToolkit Pro\",\n  \"aggregateRating\": {\n    \"@type\": \"AggregateRating\",\n    \"ratingValue\": \"4.9\",\n    \"ratingCount\": \"1024\"\n  }\n}"
      }
    ]
  },
  'local-business-schema': {
    practical_application: "LocalBusiness schema is the foundational pillar of Local SEO. It dictates exactly how your business appears in the Google Local Pack and Google Maps. Explicitly defining your longitude, latitude, and opening hours via JSON-LD prevents Google from guessing and displaying incorrect data to local customers.",
    code_blueprints: [
      {
        language: "json",
        title: "Strict Local SEO Schema",
        code: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"LocalBusiness\",\n  \"name\": \"WTK SEO Agency\",\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"streetAddress\": \"123 Tech Lane\",\n    \"addressLocality\": \"San Francisco\"\n  },\n  \"telephone\": \"+14155551234\"\n}"
      }
    ]
  },
  'redirect-chain-finder': {
    practical_application: "Search engine crawlers strictly limit the number of redirects they will follow (crawl budget). A chain of 4 or more redirects (A -> B -> C -> D) will likely cause Googlebot to drop the link entirely. Finding and squashing redirect chains directly to the final 301 target recovers lost PageRank.",
    code_blueprints: [
      {
        language: "bash",
        title: "cURL Redirect Trace",
        code: "# Trace all redirects until the final destination\ncurl -Ls -o /dev/null -w %{url_effective} https://old-domain.com"
      }
    ]
  },
  'sitemap-generator': {
    practical_application: "Large Next.js or React SPA architectures lack traditional folder structures for crawlers to navigate. Generating a dynamic XML Sitemap ensures that deep-nested programmatic pages (like `/tools/category/[slug]`) are discovered instantly by Bing and Google Webmaster Tools upon deployment.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Next.js Dynamic Sitemap (sitemap.ts)",
        code: "import { MetadataRoute } from 'next'\n \nexport default function sitemap(): MetadataRoute.Sitemap {\n  return [\n    {\n      url: 'https://wtkpro.site',\n      lastModified: new Date(),\n      changeFrequency: 'daily',\n      priority: 1,\n    },\n  ]\n}"
      }
    ]
  },
  'canonical-checker': {
    practical_application: "Duplicate content penalties occur when the same page is accessible via multiple URLs (e.g., with and without `www`, or with UTM tracking tags). The `rel=\"canonical\"` tag mathematically tells the search engine which URL is the true 'master' copy, consolidating all ranking signals into a single page.",
    code_blueprints: [
      {
        language: "html",
        title: "Canonical Head Tag",
        code: "<!-- Consolidates link equity, ignoring query parameters like ?utm_source=twitter -->\n<link rel=\"canonical\" href=\"https://wtkpro.site/tools/canonical-checker\" />"
      }
    ]
  },
  'hreflang-generator': {
    practical_application: "International SEO (i18n) requires explicit language targeting. If you serve English to the UK and the US, Google might flag them as duplicate content. Hreflang tags solve this by explicitly mapping URLs to specific ISO language and region codes (`en-US` vs `en-GB`), ensuring users see the correct currency and localized spelling.",
    code_blueprints: [
      {
        language: "html",
        title: "Global i18n Routing Tags",
        code: "<link rel=\"alternate\" hreflang=\"en-us\" href=\"https://wtkpro.site/us/\" />\n<link rel=\"alternate\" hreflang=\"en-gb\" href=\"https://wtkpro.site/uk/\" />\n<!-- Fallback for unsupported regions -->\n<link rel=\"alternate\" hreflang=\"x-default\" href=\"https://wtkpro.site/\" />"
      }
    ]
  },
  'snippet-preview': {
    practical_application: "Search Engine Results Page (SERP) real estate is limited. A Snippet Preview guarantees your Title Tag and Meta Description fit within Google's 600-pixel width limit. Truncated descriptions (`...`) kill organic CTR, making precise character tuning a mandatory step before publishing content.",
    code_blueprints: [
      {
        language: "css",
        title: "CSS Fallback Truncation",
        code: ".seo-description {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}"
      }
    ]
  },
  'heading-visualizer': {
    practical_application: "Semantic HTML hierarchy is a direct ranking factor for Google's algorithms. Skipping heading levels (e.g., jumping from `H1` to `H3`) breaks the structural outline, harming both SEO and screen reader accessibility. Visualizing the heading tree guarantees a logical parent-child relationship.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Extract DOM Outline",
        code: "const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))\n  .map(h => ({\n    tag: h.tagName,\n    text: h.innerText\n  }));\nconsole.table(headings);"
      }
    ]
  },
  'og-debugger': {
    practical_application: "Social media sharing heavily dictates modern traffic flow. The OpenGraph protocol controls the title, description, and preview image rendered on Twitter, iMessage, and LinkedIn. Debugging missing `og:image` tags ensures your links render as massive, clickable cards rather than tiny text hyperlinks.",
    code_blueprints: [
      {
        language: "html",
        title: "Next.js Dynamic OpenGraph",
        code: "export const metadata = {\n  openGraph: {\n    title: 'WTK Pro Tools',\n    images: [{\n      url: 'https://wtkpro.site/og.png',\n      width: 1200,\n      height: 630,\n    }],\n  }\n}"
      }
    ]
  }
};

let modified = false;

parsed.tools.forEach(tool => {
  if (enhancements[tool.slug]) {
    tool.content.practical_application = enhancements[tool.slug].practical_application;
    tool.content.code_blueprints = enhancements[tool.slug].code_blueprints;
    modified = true;
    console.log(`Updated ${tool.slug}`);
  }
});

if (modified) {
  fs.writeFileSync(yamlFile, yaml.dump(parsed));
  console.log('Successfully injected Batch 9 semantic depth.');
} else {
  console.log('No tools were modified.');
}
