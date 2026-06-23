const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'cron-to-k8s': {
    practical_application: "Translating Linux crontabs directly into Kubernetes `CronJob` manifests is essential for migrating legacy monolithic architectures into containerized microservices. A Kubernetes CronJob requires strict definitions for `concurrencyPolicy` (e.g., Forbid) and `successfulJobsHistoryLimit` to prevent Docker container bloat and cluster node exhaustion.",
    code_blueprints: [
      {
        language: "yaml",
        title: "K8s CronJob Manifest",
        code: "apiVersion: batch/v1\nkind: CronJob\nmetadata:\n  name: daily-cleanup\nspec:\n  schedule: \"0 2 * * *\"\n  concurrencyPolicy: Forbid\n  jobTemplate:\n    spec:\n      template:\n        spec:\n          containers:\n          - name: cleanup\n            image: alpine/curl\n            args: [\"-X\", \"POST\", \"http://api/cleanup\"]\n          restartPolicy: OnFailure"
      }
    ]
  },
  'schema-markup-generator': {
    practical_application: "Search engines are transitioning from lexical keyword matching to semantic entity understanding (The Knowledge Graph). Generating nested JSON-LD schema (e.g., linking a `WebPage` entity to an `Organization` and an `Author`) provides Google with explicit, machine-readable relationship data, severely reducing indexing ambiguity.",
    code_blueprints: [
      {
        language: "json",
        title: "Nested Entity JSON-LD",
        code: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Article\",\n  \"headline\": \"Advanced Schema Design\",\n  \"author\": {\n    \"@type\": \"Person\",\n    \"name\": \"Abu Sufyan\"\n  },\n  \"publisher\": {\n    \"@type\": \"Organization\",\n    \"name\": \"WebToolkit Pro\",\n    \"logo\": { \"@type\": \"ImageObject\", \"url\": \"https://wtkpro.site/logo.png\" }\n  }\n}"
      }
    ]
  },
  'qr-code-generator': {
    practical_application: "QR Codes bridge physical marketing with digital routing. Dynamically generating SVG QR Codes via Canvas allows platforms to generate tracking-parameterized URLs (UTMs) on the fly for concert tickets, restaurant menus, and Wi-Fi login portals without incurring third-party API rate limits.",
    code_blueprints: [
      {
        language: "javascript",
        title: "React QRCode SVG",
        code: "import QRCode from 'react-qr-code';\n\nfunction WiFIQR({ ssid, password }) {\n  // Standard format for connecting to Wi-Fi networks\n  const wifiString = `WIFI:T:WPA;S:${ssid};P:${password};;`;\n  return <QRCode value={wifiString} size={256} level=\"H\" />;\n}"
      }
    ]
  },
  'sql-toolkit': {
    practical_application: "Executing raw SQL against a production database is risky. An offline SQL toolkit allows Data Analysts to test complex `JOIN` logic, `COALESCE` handling, and CTE (Common Table Expression) formatting before deploying the queries to massive data warehouses like Snowflake or Amazon Redshift.",
    code_blueprints: [
      {
        language: "sql",
        title: "Complex Analytical CTE",
        code: "WITH MonthlyRevenue AS (\n    SELECT \n        DATE_TRUNC('month', created_at) AS month,\n        SUM(amount) AS total_sales\n    FROM transactions\n    WHERE status = 'SUCCESS'\n    GROUP BY 1\n)\nSELECT \n    month, total_sales, \n    LAG(total_sales) OVER (ORDER BY month) AS prev_month_sales\nFROM MonthlyRevenue;"
      }
    ]
  },
  'markdown-html-converter': {
    practical_application: "Markdown is the standard for technical documentation (GitHub Readmes, Obsidian notes) because it removes UI friction. However, web browsers strictly render HTML. Converting Markdown to semantic HTML on the server (using libraries like `remark`) ensures rich text is parsed securely while remaining compatible with headless CMS workflows.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Remark Markdown Parser",
        code: "import { remark } from 'remark';\nimport html from 'remark-html';\n\nasync function renderMarkdown(markdownString) {\n  const processed = await remark()\n    .use(html, { sanitize: true }) // Prevent XSS\n    .process(markdownString);\n  return processed.toString();\n}"
      }
    ]
  },
  'compliance-audit-logger': {
    practical_application: "Enterprise compliance (SOC2, HIPAA) strictly requires comprehensive audit logs for all data mutations. An audit logger structures events explicitly (Who, What, When, Where) into JSON Lines (JSONL), making it easy to stream into SIEM (Security Information and Event Management) platforms like Splunk or Datadog.",
    code_blueprints: [
      {
        language: "json",
        title: "SOC2 Audit Log Format",
        code: "{\n  \"timestamp\": \"2026-06-23T12:00:00Z\",\n  \"actor_id\": \"usr_8923a\",\n  \"action\": \"USER_DELETED\",\n  \"resource_id\": \"usr_4011b\",\n  \"ip_address\": \"192.168.1.1\",\n  \"status\": \"SUCCESS\"\n}"
      }
    ]
  },
  'exif-metadata-viewer': {
    practical_application: "Modern smartphone cameras embed Exif metadata (GPS coordinates, iPhone model, capture time) into every photo. In journalism and cybersecurity, viewing this metadata allows investigators to verify the authenticity of a leaked image. In web development, stripping this data is legally required for user privacy compliance.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Exif-JS Client Parser",
        code: "import EXIF from 'exif-js';\n\nfunction getGpsCoordinates(imageElement) {\n  EXIF.getData(imageElement, function() {\n    const lat = EXIF.getTag(this, 'GPSLatitude');\n    const lon = EXIF.getTag(this, 'GPSLongitude');\n    if(lat && lon) console.log(`Location: ${lat}, ${lon}`);\n  });\n}"
      }
    ]
  },
  'api-endpoint-verifier': {
    practical_application: "API endpoints fail for hundreds of reasons (Expired SSL, CORS policy blocking, Rate Limiting HTTP 429). An automated endpoint verifier rigorously tests the `OPTIONS` preflight request and validates strict HTTP status codes, alerting DevOps engineers the millisecond an external dependency goes offline.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Strict Fetch Verification",
        code: "async function verifyEndpoint(url) {\n  const start = performance.now();\n  const res = await fetch(url, { method: 'HEAD' });\n  const latency = performance.now() - start;\n  \n  if (!res.ok) throw new Error(`API Down: ${res.status}`);\n  console.log(`API Healthy. Latency: ${latency.toFixed(0)}ms`);\n}"
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
  console.log('Successfully injected final batch of semantic depth.');
} else {
  console.log('No tools were modified.');
}
