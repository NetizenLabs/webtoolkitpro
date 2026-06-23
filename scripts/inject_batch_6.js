const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'file-checksum': {
    practical_application: "File checksums (SHA-256, MD5) are mathematically unique fingerprints used to verify that a file has not been corrupted or tampered with during transit. Security engineers use checksums to validate downloaded Linux ISOs, Docker images, and application binaries against a known trusted hash before deployment to production environments.",
    code_blueprints: [
      {
        language: "bash",
        title: "Linux CLI Checksum Verification",
        code: "# Generate SHA-256 hash of a file\nsha256sum downloaded_file.tar.gz\n\n# Verify a file against a known hash\necho \"known_hash  downloaded_file.tar.gz\" | sha256sum -c -"
      }
    ]
  },
  'data-masking': {
    practical_application: "Data masking is a critical compliance mechanism for GDPR, HIPAA, and CCPA. When dumping production databases for use in staging or development environments, masking obfuscates Personally Identifiable Information (PII) like credit card numbers and Social Security Numbers while preserving the structural validity of the data for QA testing.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Regex-Based PII Masking",
        code: "function maskCreditCard(cardNumber) {\n  // Masks all but the last 4 digits\n  const cleanNumber = cardNumber.replace(/\\D/g, '');\n  if (cleanNumber.length < 4) return cardNumber;\n  return cleanNumber.slice(0, -4).replace(/./g, '*') + cleanNumber.slice(-4);\n}"
      }
    ]
  },
  'cron-descriptor': {
    practical_application: "Cron expressions are notoriously cryptic strings (`0 0 * * *`) that define scheduled tasks in Linux environments, CI/CD pipelines, and cloud schedulers like AWS EventBridge. Misconfiguring a cron job can lead to accidental DDoSing of internal services or missed daily backups. Translating them to plain English prevents catastrophic infrastructure errors.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Cron Validation Node Script",
        code: "const parser = require('cron-parser');\n\ntry {\n  const interval = parser.parseExpression('*/5 * * * *');\n  console.log('Next execution:', interval.next().toString());\n} catch (err) {\n  console.error('Invalid Cron Expression:', err.message);\n}"
      }
    ]
  },
  'regex-explainer': {
    practical_application: "Regular Expressions (Regex) are powerful text parsing tools used for form validation, data extraction, and server log analysis. However, a poorly written regex can cause Catastrophic Backtracking, completely locking up a Node.js server's event loop (Regex Denial of Service - ReDoS). Breaking down the regex into a visual tree is essential for code review.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Safe Regex Execution with Timeout",
        code: "const vm = require('vm');\n\nfunction runRegexSafely(regexStr, inputStr) {\n  // Prevent ReDoS by running in an isolated context with a strict timeout\n  const sandbox = { result: null, regex: new RegExp(regexStr), input: inputStr };\n  try {\n    vm.runInNewContext('result = regex.test(input)', sandbox, { timeout: 1000 });\n    return sandbox.result;\n  } catch (err) {\n    return 'Regex execution timed out (Potential ReDoS)';\n  }\n}"
      }
    ]
  },
  'html-table-to-json': {
    practical_application: "Legacy web applications and government databases often expose valuable public data strictly via HTML tables without providing a modern JSON API. Data engineers rely on automated HTML parsing to extract these `<tr>` and `<td>` elements into structured JSON objects to build ETL pipelines and data visualization dashboards.",
    code_blueprints: [
      {
        language: "python",
        title: "Python Pandas HTML Scraping",
        code: "import pandas as pd\n\n# Automatically finds all <table> elements and parses them to DataFrames\ntables = pd.read_html('https://example.com/data')\ndf = tables[0]\n\n# Convert to a structured JSON list of dictionaries\njson_output = df.to_json(orient='records')\nprint(json_output)"
      }
    ]
  },
  'xml-to-yaml': {
    practical_application: "Enterprise SOAP APIs and legacy Java architectures generate immense XML payloads that are highly verbose and difficult for DevOps engineers to read. Converting XML configuration files into clean, comment-supported YAML structures allows infrastructure teams to migrate legacy setups into modern Kubernetes or Ansible deployments.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js XML2JS Parser",
        code: "const xml2js = require('xml2js');\nconst yaml = require('js-yaml');\n\nasync function convertXmlToYaml(xmlString) {\n  const parser = new xml2js.Parser({ explicitArray: false });\n  const jsonObj = await parser.parseStringPromise(xmlString);\n  return yaml.dump(jsonObj);\n}"
      }
    ]
  },
  'html-to-markdown': {
    practical_application: "Migrating content from legacy CMS platforms (like WordPress) to modern static site generators (like Next.js, Astro, or Hugo) requires converting rich HTML into lightweight Markdown. This transformation preserves headings, lists, and links while stripping away bloated inline CSS and `<script>` tags that impact page load performance.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Turndown Migration Script",
        code: "const TurndownService = require('turndown');\nconst turndownService = new TurndownService({ headingStyle: 'atx' });\n\nconst rawHtml = '<h1>Welcome</h1><p>Migrating to <strong>Markdown</strong>.</p>';\nconst markdown = turndownService.turndown(rawHtml);\n\nconsole.log(markdown);\n// Output: \n// # Welcome\n// Migrating to **Markdown**."
      }
    ]
  },
  'url-parser': {
    practical_application: "A robust URL parser is critical for frontend routing, API endpoint validation, and cybersecurity analysis. Threat actors frequently obscure malicious domains using deeply nested subdomains and complex query parameters. Deconstructing a URL into its protocol, hostname, search queries, and hashes allows systems to block malicious payloads.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Native Node.js URL API",
        code: "const targetUrl = new URL('https://api.wtkpro.site:443/v1/users?role=admin#section1');\n\nconsole.log('Hostname:', targetUrl.hostname); // api.wtkpro.site\nconsole.log('Protocol:', targetUrl.protocol); // https:\nconsole.log('Search Param:', targetUrl.searchParams.get('role')); // admin"
      }
    ]
  },
  'json-schema-gen': {
    practical_application: "JSON Schema provides a strict contract for data structures between microservices. Instead of relying on implicit trust, generating and validating against a JSON Schema guarantees that a frontend client sends exactly the properties a backend API expects. This prevents NoSQL injection attacks and runtime crashes caused by malformed payloads.",
    code_blueprints: [
      {
        language: "javascript",
        title: "AJV JSON Schema Validation",
        code: "const Ajv = require('ajv');\nconst ajv = new Ajv();\n\nconst schema = {\n  type: 'object',\n  properties: { username: { type: 'string' }, age: { type: 'integer' } },\n  required: ['username']\n};\n\nconst validate = ajv.compile(schema);\nconst isValid = validate({ username: 'Abu' });\nconsole.log(isValid ? 'Payload Safe' : validate.errors);"
      }
    ]
  },
  'data-anonymizer': {
    practical_application: "Unlike data masking (which preserves formats), anonymization permanently destroys the link between a dataset and the individual it represents. In machine learning and data science, high-quality anonymization is required before training models on healthcare or financial data to guarantee compliance with privacy laws like HIPAA.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Cryptographic Anonymization",
        code: "const crypto = require('crypto');\n\nfunction anonymizeUserId(realId) {\n  // Create a fast, one-way hash replacing the real ID\n  return crypto.createHash('sha256').update(realId.toString()).digest('hex');\n}\n\nconst dbRecord = { id: anonymizeUserId(1048), diagnosis: 'Healthy' };"
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
  console.log('Successfully injected Batch 6 semantic depth.');
} else {
  console.log('No tools were modified.');
}
