const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'http-headers-inspector': {
    practical_application: "Inspecting HTTP response headers is crucial for debugging caching issues (like stale Cloudflare responses) and verifying security policies. For example, ensuring `X-Frame-Options: DENY` is present protects against Clickjacking attacks, while checking `Strict-Transport-Security` guarantees HSTS enforcement.",
    code_blueprints: [
      {
        language: "bash",
        title: "cURL Header Inspection",
        code: "# Fetch only the HTTP headers without the response body\ncurl -I -L https://wtkpro.site\n\n# Example Output:\n# HTTP/2 200 \n# cache-control: s-maxage=31536000, stale-while-revalidate"
      }
    ]
  },
  'responsive-checker-pro': {
    practical_application: "Relying strictly on Chrome DevTools isn't enough to verify complex CSS grids and flexbox layouts. A dedicated responsive checker allows developers to simulate rendering on explicit dimensions (e.g., an iPhone SE at 375px or a 4K monitor at 3840px) to catch overflowing elements before they trigger Mobile Usability warnings in Google Search Console.",
    code_blueprints: [
      {
        language: "css",
        title: "Modern Container Queries",
        code: "/* Instead of media queries, use container queries for component-level responsiveness */\n.card-container {\n  container-type: inline-size;\n}\n\n@container (min-width: 400px) {\n  .card {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n}"
      }
    ]
  },
  'color-blind-simulator': {
    practical_application: "Approximately 8% of men have some form of color vision deficiency (CVD). Designing UI elements that rely solely on color to convey meaning (like red for errors or green for success) makes the application unusable for them. Simulating Deuteranopia (green-blind) or Protanopia (red-blind) ensures you add secondary visual indicators (like icons or underlines).",
    code_blueprints: [
      {
        language: "css",
        title: "Accessible Form States",
        code: ".input-error {\n  border: 2px solid #ef4444; /* Red border */\n}\n\n/* Add an icon to ensure color is not the only indicator */\n.input-error::after {\n  content: '⚠️';\n  position: absolute;\n  right: 10px;\n}"
      }
    ]
  },
  'alt-text-auditor': {
    practical_application: "Missing or generic `alt` attributes (`alt=\"image\"`) severely harm accessibility for screen readers and eliminate the chance of ranking in Google Image Search. An auditor scans the DOM to identify decorative images that should have `alt=\"\"` and informational images that require descriptive context.",
    code_blueprints: [
      {
        language: "html",
        title: "Proper Alt Text Implementation",
        code: "<!-- Decorative image: Screen readers will ignore this -->\n<img src=\"spacer.png\" alt=\"\" aria-hidden=\"true\">\n\n<!-- Informational image: Descriptive for accessibility and SEO -->\n<img src=\"dashboard-chart.png\" alt=\"Line chart showing Q3 revenue growth of 24%\">"
      }
    ]
  },
  'authority-simulator': {
    practical_application: "Domain Authority (DA) is an aggregated metric predicting how well a website will rank. While Google doesn't use DA directly, calculating your backlink profile (DoFollow vs NoFollow) and referring domains against a competitor helps SEO strategists understand the 'link gap' required to overtake them in the SERPs.",
    code_blueprints: [
      {
        language: "html",
        title: "Rel Attribute Management",
        code: "<!-- Pass PageRank (Link Equity) -->\n<a href=\"https://trusted-partner.com\">Our Partner</a>\n\n<!-- Do not pass PageRank (User Generated Content / Ads) -->\n<a href=\"https://spammy-site.com\" rel=\"nofollow ugc\">User Comment</a>"
      }
    ]
  },
  'browser-compat-checker': {
    practical_application: "Modern web APIs (like WebBluetooth, CSS Subgrid, or native nested CSS) are not universally supported. Deploying them without checking CanIUse matrices or providing polyfills will break the application for users on legacy Safari or older Android WebView devices.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Feature Detection Logic",
        code: "// Never rely on User-Agent sniffing. Use Feature Detection.\nif ('IntersectionObserver' in window) {\n  // Safe to use native lazy loading\n  const observer = new IntersectionObserver(callback);\n} else {\n  // Load polyfill or fallback to immediate loading\n  loadPolyfill();\n}"
      }
    ]
  },
  'rag-optimizer': {
    practical_application: "Retrieval-Augmented Generation (RAG) feeds private data into LLMs. If your vector database chunks are too small, the LLM loses context; if they are too large, you exceed the token context window. Optimizing chunk size and semantic overlap is critical for building AI chatbots that don't hallucinate.",
    code_blueprints: [
      {
        language: "python",
        title: "LangChain Recursive Splitting",
        code: "from langchain.text_splitter import RecursiveCharacterTextSplitter\n\n# Split text intelligently keeping paragraphs together\ntext_splitter = RecursiveCharacterTextSplitter(\n    chunk_size=1000,\n    chunk_overlap=200,\n    length_function=len\n)\ndocs = text_splitter.create_documents([raw_text])"
      }
    ]
  },
  'prompt-token-calculator': {
    practical_application: "OpenAI and Anthropic APIs charge based on token count, not character count. A single token is roughly 4 English characters. Calculating tokens locally using a library like Tiktoken before firing the API request prevents developers from accidentally blowing through their API budget on massive unoptimized prompts.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Tiktoken Cost Estimation",
        code: "import { encode } from 'gpt-tokenizer';\n\nfunction calculateCost(promptText, costPer1kTokens = 0.01) {\n  const tokens = encode(promptText);\n  const estimatedCost = (tokens.length / 1000) * costPer1kTokens;\n  return `Tokens: ${tokens.length} | Cost: $${estimatedCost.toFixed(4)}`;\n}"
      }
    ]
  },
  'k8s-yaml-validator': {
    practical_application: "Kubernetes (K8s) is entirely declarative via YAML manifests. A single indentation error or an outdated API version (`apps/v1beta1` instead of `apps/v1`) will cause the `kubectl apply` command to fail. Validating K8s YAML locally prevents broken deployments from ever reaching the production cluster.",
    code_blueprints: [
      {
        language: "yaml",
        title: "Standard K8s Deployment",
        code: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: wtkpro-api\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: wtkpro\n  template:\n    metadata:\n      labels:\n        app: wtkpro"
      }
    ]
  },
  'aws-iam-generator': {
    practical_application: "AWS Identity and Access Management (IAM) requires strict adherence to the Principle of Least Privilege. Hardcoding broad `s3:*` permissions is a massive security risk. Generating precise JSON policies (e.g., allowing `s3:GetObject` only on a specific bucket ARN) prevents catastrophic data breaches if an EC2 instance is compromised.",
    code_blueprints: [
      {
        language: "json",
        title: "Least-Privilege S3 Policy",
        code: "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Action\": [\"s3:PutObject\"],\n    \"Resource\": \"arn:aws:s3:::wtkpro-uploads-bucket/*\"\n  }]\n}"
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
  console.log('Successfully injected Batch 15 semantic depth.');
} else {
  console.log('No tools were modified.');
}
