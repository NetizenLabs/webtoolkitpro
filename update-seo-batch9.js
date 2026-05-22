const fs = require('fs');
const yaml = require('js-yaml');

const path = 'config/tools.yaml';
let doc;
try {
  doc = yaml.load(fs.readFileSync(path, 'utf8'));
} catch (e) {
  console.error('Error loading YAML:', e);
  process.exit(1);
}

const updates = {
  'meta-tag-generator': {
    seo: {
      title: 'Meta Tag Generator — HTML, Open Graph & Twitter Cards',
      description: 'Generate comprehensive HTML meta tags, Facebook Open Graph (OG) tags, and Twitter Cards to instantly optimize your website\'s social media sharing and SEO visibility.',
      keywords: ['meta tag generator', 'open graph generator', 'twitter card generator', 'html seo tags', 'create meta tags online'],
      tldr: 'Generate optimized HTML meta tags to improve your website\'s search engine ranking and social sharing previews.',
      entity_definition: 'The Meta Tag Generator is a technical SEO utility that authors standardized HTML `<meta>` elements. These elements reside within the `<head>` of an HTML document and provide structured metadata to web crawlers (like Googlebot) and social media scrapers (like Facebook and Twitter). By generating standard Meta Descriptions alongside specialized Open Graph (`og:`) and Twitter Card (`twitter:`) properties, developers can control exactly how their web pages appear in search engine result pages (SERPs) and social media link previews.'
    },
    faqs: [
      {
        question: 'What is an Open Graph (OG) tag?',
        answer: 'Open Graph is a metadata protocol originally created by Facebook. It allows web developers to dictate exactly what title, description, and image should be displayed when a user shares their URL on social platforms like Facebook, LinkedIn, and Discord.'
      },
      {
        question: 'Do meta keywords still matter for SEO?',
        answer: 'No. Major search engines like Google explicitly deprecated the `<meta name="keywords">` tag over a decade ago due to keyword stuffing abuse. However, some internal enterprise search engines and niche directories still utilize them.'
      },
      {
        question: 'Can this tool fetch existing tags from a live URL?',
        answer: 'Yes! The generator includes a proxy fetcher that can scrape a live URL, extract its current metadata, and populate the input fields so you can audit and modify your existing tags before deploying.'
      }
    ]
  },
  'keyword-density': {
    seo: {
      title: 'Keyword Density Checker — SEO Content Analysis',
      description: 'Analyze your content\'s keyword frequency and density. Avoid algorithmic penalties for keyword stuffing and optimize your writing for natural search engine ranking.',
      keywords: ['keyword density checker', 'keyword frequency counter', 'seo density analysis', 'check keyword stuffing', 'content optimization tool'],
      tldr: 'Calculate the exact percentage frequency of keywords within your text to optimize for search engines.',
      entity_definition: 'The Keyword Density Checker is a Natural Language Processing (NLP) utility used in Search Engine Optimization. It algorithmically scans a block of text, strips out punctuation, filters out meaningless "stop words" (like "the", "and", "a"), and calculates the exact mathematical frequency of the remaining prominent nouns and verbs. The resulting "density" is expressed as a percentage of the total word count, helping content writers ensure they are targeting specific search queries without triggering spam filters.'
    },
    faqs: [
      {
        question: 'What is the ideal keyword density for SEO?',
        answer: 'Modern SEO best practices suggest a primary keyword density between 1% and 2%. Anything significantly higher runs a high risk of being flagged by Google\'s algorithms as "keyword stuffing," which can severely penalize your page ranking.'
      },
      {
        question: 'How does the analyzer handle stop words?',
        answer: 'To provide accurate insights, the analyzer automatically filters out extremely short words (typically 3 letters or fewer) that provide no semantic value to search engines, ensuring your analysis focuses purely on topical keywords.'
      },
      {
        question: 'Why is analyzing keyword frequency important?',
        answer: 'Search engines use Term Frequency-Inverse Document Frequency (TF-IDF) algorithms to determine what a page is actually about. Analyzing your text ensures your core topic is statistically prominent without looking unnatural.'
      }
    ]
  },
  'robots-generator': {
    seo: {
      title: 'Robots.txt Generator — Control Search Engine Crawlers',
      description: 'Generate a mathematically valid robots.txt file to instruct Googlebot and Bingbot on which pages they are allowed to crawl and index on your web server.',
      keywords: ['robots txt generator', 'create robots txt', 'googlebot disallow', 'robots txt builder', 'seo crawler rules'],
      tldr: 'Create a standard robots.txt file to dictate search engine crawling rules for your website.',
      entity_definition: 'The Robots.txt Generator is a server configuration utility that authors instructions according to the Robots Exclusion Protocol (REP). A `robots.txt` file must be placed in the absolute root directory of a web server. It communicates directly with automated web crawlers (User-Agents) such as Googlebot, instructing them on which directories or files they are explicitly forbidden to access (Disallow) or permitted to access (Allow), while also broadcasting the location of the site\'s XML Sitemap.'
    },
    faqs: [
      {
        question: 'What happens if I don\'t have a robots.txt file?',
        answer: 'If a search engine crawler requests your root `/robots.txt` and receives a 404 Not Found error, it will assume there are zero restrictions and will attempt to crawl and index every publicly accessible file on your server.'
      },
      {
        question: 'What does "User-agent: *" mean?',
        answer: 'The asterisk (*) is a wildcard character. Declaring `User-agent: *` means the subsequent Allow/Disallow rules apply universally to all web crawlers, whether it is Google, Bing, Yahoo, or an AI scraper.'
      },
      {
        question: 'Why should I add my Sitemap URL?',
        answer: 'Appending `Sitemap: https://yourdomain.com/sitemap.xml` to the bottom of your robots.txt file is the fastest way to alert search engines to your canonical link structure without manually submitting the sitemap via Google Search Console.'
      }
    ]
  },
  'sitemap-generator': {
    seo: {
      title: 'XML Sitemap Generator — Build Google-Compliant Sitemaps',
      description: 'Build valid XML sitemaps instantly. Generate Google-compliant sitemap.xml files with standard loc, lastmod, and priority tags to accelerate search engine indexing.',
      keywords: ['xml sitemap generator', 'create sitemap xml', 'google sitemap builder', 'sitemap generator online', 'generate xml sitemap'],
      tldr: 'Construct a compliant XML sitemap to ensure search engines discover all your web pages.',
      entity_definition: 'The XML Sitemap Generator is an SEO architectural tool that constructs a structured list of a website\'s URLs in Extensible Markup Language (XML) format. Following the strict sitemaps.org protocol, the generated document provides web crawlers with a roadmap of the site\'s architecture. It wraps each user-provided URL in a `<loc>` node, and automatically appends metadata such as the `<lastmod>` (Last Modified Date) and `<priority>` tags, ensuring that search engines index the site comprehensively and efficiently.'
    },
    faqs: [
      {
        question: 'Why is an XML Sitemap necessary for SEO?',
        answer: 'While search engines can discover pages by following internal links, an XML Sitemap guarantees that crawlers find every page on your site—especially deep, isolated pages that lack internal linking or newly published content.'
      },
      {
        question: 'Where should I upload the generated sitemap?',
        answer: 'You should upload the generated `sitemap.xml` file to the root directory of your website (e.g., `https://yourdomain.com/sitemap.xml`). Afterward, submit this exact URL to Google Search Console and Bing Webmaster Tools.'
      },
      {
        question: 'What does the <lastmod> tag do?',
        answer: 'The `<lastmod>` tag tells the search engine crawler the exact date the page was last updated. If the date hasn\'t changed since the crawler\'s last visit, it can skip re-crawling the page, saving valuable crawl budget.'
      }
    ]
  },
  'schema-generator': {
    seo: {
      title: 'Schema Markup Generator — JSON-LD Structured Data',
      description: 'Generate valid JSON-LD Schema markup for Organizations, Local Businesses, and Websites. Enhance your Google search results with rich snippets.',
      keywords: ['schema markup generator', 'json-ld generator', 'organization schema', 'rich snippets generator', 'schema org builder'],
      tldr: 'Generate structured JSON-LD schema markup to unlock Google Rich Snippets in search results.',
      entity_definition: 'The Schema Markup Generator is an advanced SEO tool that produces JSON-Linked Data (JSON-LD) scripts based on the standardized vocabulary defined by Schema.org. Traditional HTML tells a browser how to display information, but Schema markup tells a search engine exactly what that information means (e.g., distinguishing a string as a "Company Name" versus an "Author"). Injecting this structured data into the `<head>` of a webpage is the primary mechanism for unlocking enhanced Google Search Features, known as Rich Snippets.'
    },
    faqs: [
      {
        question: 'What is JSON-LD and why is it preferred?',
        answer: 'JSON-LD (JavaScript Object Notation for Linked Data) is a method of encoding Linked Data using JSON. Google explicitly recommends JSON-LD over older methods (like Microdata) because it is a single block of script that doesn\'t interfere with your visible HTML layout.'
      },
      {
        question: 'Will Schema markup guarantee a Rich Snippet?',
        answer: 'No. While providing perfectly valid Schema markup makes your site eligible for Rich Snippets (like star ratings, organization logos, or event dates), Google\'s algorithm makes the final decision on whether to display them based on site authority.'
      },
      {
        question: 'How do I test my generated Schema?',
        answer: 'Once you copy the JSON-LD script from this tool and place it in your HTML, you should validate it using Google\'s official "Rich Results Test" tool to ensure there are no syntax errors or missing required properties.'
      }
    ]
  }
};

let updatedCount = 0;
doc.tools.forEach(tool => {
  if (updates[tool.slug]) {
    const data = updates[tool.slug];
    tool.seo = tool.seo || {};
    tool.seo.title = data.seo.title;
    tool.seo.description = data.seo.description;
    tool.seo.keywords = data.seo.keywords;
    tool.seo.tldr = data.seo.tldr;
    tool.seo.entity_definition = data.seo.entity_definition;
    
    // Add FAQs
    tool.faqs = data.faqs;
    updatedCount++;
  }
});

fs.writeFileSync(path, yaml.dump(doc, { lineWidth: -1 }), 'utf8');
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 9');
