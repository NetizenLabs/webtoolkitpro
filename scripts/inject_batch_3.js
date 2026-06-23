const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'json-to-code-generator': {
    practical_application: "When consuming external APIs, manually typing out data models (Interfaces, Structs, or POJOs) is error-prone. JSON to Code generation instantly scaffolds strongly-typed models from raw JSON responses, ensuring type safety across the application boundary. This is critical in languages like TypeScript, Go, or Swift to catch data anomalies at compile time rather than runtime.",
    code_blueprints: [
      {
        language: "typescript",
        title: "TypeScript API Fetch with Typed Models",
        code: "import type { UserProfile } from './generated-models';\n\nasync function fetchProfile(id: string): Promise<UserProfile> {\n  const res = await fetch(`https://api.example.com/users/${id}`);\n  const data: UserProfile = await res.json();\n  return data;\n}"
      }
    ]
  },
  'json-yaml-jsonl-converter': {
    practical_application: "YAML is the standard for DevOps configuration (Kubernetes, GitHub Actions, Docker Compose) because it supports comments and is human-readable. However, APIs strictly communicate in JSON. JSONL (JSON Lines) is the standard for streaming large datasets, like feeding logs into Elasticsearch or training LLMs. A robust converter is essential for migrating between infrastructure and application layers.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js Streaming JSONL Parsing",
        code: "const fs = require('fs');\nconst readline = require('readline');\n\nasync function processJsonl(filePath) {\n  const fileStream = fs.createReadStream(filePath);\n  const rl = readline.createInterface({ input: fileStream });\n\n  for await (const line of rl) {\n    const obj = JSON.parse(line);\n    console.log(`Processing ID: ${obj.id}`);\n  }\n}"
      }
    ]
  },
  'csv-json-xml-converter': {
    practical_application: "Legacy enterprise systems (SOAP APIs, banking software) exclusively export XML or CSV files, while modern web frameworks require JSON. Data ETL (Extract, Transform, Load) pipelines rely heavily on these format conversions to ingest legacy data into modern databases like MongoDB or PostgreSQL JSONB columns.",
    code_blueprints: [
      {
        language: "python",
        title: "Python Pandas CSV to JSON",
        code: "import pandas as pd\n\ndef convert_csv_to_json(csv_path, json_path):\n    # Read CSV and dump to JSON array of records\n    df = pd.read_csv(csv_path)\n    df.to_json(json_path, orient='records', indent=4)\n    print(f'Successfully converted {csv_path} to {json_path}')"
      }
    ]
  },
  'what-is-my-ip': {
    practical_application: "IP Address identification is critical for network debugging, configuring firewall whitelists (like AWS Security Groups), and setting up local development tunnels (like Ngrok or Cloudflare Tunnels). Knowing your public IPv4 and IPv6 addresses ensures you can securely restrict access to staging environments.",
    code_blueprints: [
      {
        language: "bash",
        title: "cURL Command for IP Lookup",
        code: "# Fetch your public IP directly from the terminal\ncurl https://api.ipify.org\n\n# Fetch IP with JSON response\ncurl https://api.ipify.org?format=json"
      }
    ]
  },
  'lorem-ipsum': {
    practical_application: "When designing UI/UX wireframes or testing database character encodings, using real content can distract stakeholders from the structural layout. Lorem Ipsum provides a visually balanced distribution of letters, mimicking standard English syntax, making it the industry standard for prototyping layouts in Figma, Tailwind, or React.",
    code_blueprints: [
      {
        language: "javascript",
        title: "React Placeholder Component",
        code: "export function SkeletonText({ lines = 3 }) {\n  return (\n    <div className=\"animate-pulse space-y-2\">\n      {[...Array(lines)].map((_, i) => (\n        <div key={i} className=\"h-4 bg-gray-200 rounded w-full\"></div>\n      ))}\n    </div>\n  );\n}"
      }
    ]
  },
  'sitemap-validator': {
    practical_application: "An invalid `sitemap.xml` will cause Googlebot and Bingbot to reject your URL submissions, severely damaging SEO indexation. Sitemaps must conform to strict XML schemas, contain only canonical URLs, and adhere to a 50,000 URL limit per file. Validation ensures your crawler pipeline remains unblocked.",
    code_blueprints: [
      {
        language: "xml",
        title: "Valid Sitemap Structure",
        code: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <url>\n    <loc>https://wtkpro.site/tools/sitemap-validator</loc>\n    <lastmod>2026-05-12</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>"
      }
    ]
  },
  'redirect-checker': {
    practical_application: "Redirect chains (A -> B -> C) waste crawl budget, dilute link equity (PageRank), and increase Time to First Byte (TTFB). A robust SEO strategy requires verifying that all HTTP 301 and 302 redirects resolve directly to the final canonical destination in a single hop.",
    code_blueprints: [
      {
        language: "bash",
        title: "cURL Redirect Trace",
        code: "# Trace the full HTTP redirect path of a URL\ncurl -s -L -I -o /dev/null -w '%{url_effective}\\n' https://example.com"
      }
    ]
  },
  'api-latency-calculator': {
    practical_application: "API Latency directly impacts user retention and infrastructure costs. Measuring Time to First Byte (TTFB), DNS lookup time, and TCP handshake duration allows backend engineers to identify bottlenecks (e.g., slow database queries vs. geographic distance) and implement appropriate caching strategies via CDNs like Cloudflare.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Performance API Measurement",
        code: "const start = performance.now();\n\nfetch('https://api.wtkpro.site/health')\n  .then(res => res.json())\n  .then(() => {\n    const latency = performance.now() - start;\n    console.log(`API Latency: ${latency.toFixed(2)}ms`);\n  });"
      }
    ]
  },
  'adsense-calculator': {
    practical_application: "Revenue projection for programmatic SEO sites and blogs relies heavily on RPM (Revenue Per Mille) and CTR (Click-Through Rate) metrics. Understanding the baseline traffic required to hit profitability targets allows webmasters to allocate marketing budgets efficiently and forecast server infrastructure costs.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Revenue Formula Implementation",
        code: "function calculateAdRevenue(pageviews, ctrPercentage, cpcAmount) {\n  const clicks = pageviews * (ctrPercentage / 100);\n  const totalRevenue = clicks * cpcAmount;\n  const rpm = (totalRevenue / pageviews) * 1000;\n  \n  return { totalRevenue, rpm };\n}"
      }
    ]
  },
  'css-unit-converter': {
    practical_application: "Modern web design demands responsive typography and layouts. Converting static pixels (px) to relative units (rem, em, vh, vw) ensures that web applications respect user accessibility settings (like default browser font sizes) and scale flawlessly across mobile, tablet, and desktop viewports.",
    code_blueprints: [
      {
        language: "css",
        title: "Modern CSS Root Variables",
        code: ":root {\n  /* Base font size (1rem = 16px) */\n  font-size: 100%; \n}\n\n.container {\n  /* Scales correctly on mobile and desktop */\n  max-width: 75rem;\n  padding: 2rem;\n  margin-inline: auto;\n}"
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
  console.log('Successfully injected Batch 3 semantic depth.');
} else {
  console.log('No tools were modified.');
}
