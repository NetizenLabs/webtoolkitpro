const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'cron-generator': {
    practical_application: "Cron generators prevent human error in scheduling syntax. A misconfigured cron expression (like '* * * * *' instead of '0 0 * * *') could trigger a database backup script every minute instead of once a day, resulting in severe I/O bottlenecking and potential production server crashes.",
    code_blueprints: [
      {
        language: "yaml",
        title: "GitHub Actions Cron Trigger",
        code: "on:\n  schedule:\n    # Runs at 02:00 UTC every day\n    - cron: '0 2 * * *'\njobs:\n  daily-backup:\n    runs-on: ubuntu-latest\n    steps:\n      - run: ./run-backup.sh"
      }
    ]
  },
  'regex-tester': {
    practical_application: "Testing Regular Expressions with real-world edge cases ensures correct validation constraints. For example, validating an email address purely with regex is notoriously difficult; testing against RFC-5322 compliance prevents user registration failures while stopping basic SQL injection attempts disguised as input strings.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Robust Email Validation",
        code: "function isValidEmail(email) {\n  // Standard HTML5 validation regex\n  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/;\n  return regex.test(email);\n}"
      }
    ]
  },
  'curl-converter': {
    practical_application: "Browser DevTools allow engineers to export any failing network request 'as cURL'. Converting that raw cURL command into native language wrappers (like Python Requests or Node Fetch) is the fastest way to reproduce API bugs, scrape authenticated endpoints, or write end-to-end integration tests.",
    code_blueprints: [
      {
        language: "python",
        title: "Generated Python Requests",
        code: "import requests\n\nheaders = {\n    'Authorization': 'Bearer YOUR_TOKEN',\n    'Content-Type': 'application/json',\n}\ndata = '{\"status\": \"active\"}'\n\nresponse = requests.post('https://api.wtkpro.site/update', headers=headers, data=data)\nprint(response.json())"
      }
    ]
  },
  'code-diff': {
    practical_application: "Visual code diffing is fundamental to version control operations. Before committing code to a production branch, engineers must analyze the diff to ensure no hardcoded API keys, debug statements, or unintended architectural regressions are introduced during a complex merge resolution.",
    code_blueprints: [
      {
        language: "bash",
        title: "Git CLI Diff Verification",
        code: "# View staged changes before committing\ngit diff --staged\n\n# Compare specific file against previous commit\ngit diff HEAD~1 page.tsx"
      }
    ]
  },
  'html-entities': {
    practical_application: "Encoding HTML entities is a strict requirement for rendering code snippets or displaying special characters (like © or ™) in web pages. It ensures the browser renders the mathematical symbol instead of attempting to parse it as an HTML DOM node, completely neutralizing Cross-Site Scripting (XSS) threats.",
    code_blueprints: [
      {
        language: "html",
        title: "Safe Entity Rendering",
        code: "<p>\n  To write a paragraph, use the &lt;p&gt; tag.\n</p>\n<footer>\n  &copy; 2026 WebToolkit Pro. All rights reserved.\n</footer>"
      }
    ]
  },
  'dotenv-generator': {
    practical_application: "The `.env` file isolates sensitive configuration (Database URIs, Stripe API Keys) from the core codebase. This adheres to the 12-Factor App methodology. A secure generator creates cryptographically random secrets for session tokens and ensures the `.env` format is compatible with Docker and Node.js loaders.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js Dotenv Loading",
        code: "require('dotenv').config();\n\n// Fails safely if the environment variable is missing\nconst dbUri = process.env.DATABASE_URL;\nif (!dbUri) {\n  throw new Error('FATAL: DATABASE_URL is not defined in .env');\n}"
      }
    ]
  },
  'git-helper': {
    practical_application: "Git operations can be highly destructive. Forgetting the exact syntax for a hard reset or an interactive rebase can result in lost commits or a broken main branch. A cheat-sheet generator provides safe, standardized commands for complex branching strategies, squashing commits, and resolving merge conflicts.",
    code_blueprints: [
      {
        language: "bash",
        title: "Safe Rebase Workflow",
        code: "# Interactive rebase of the last 3 commits to squash them\ngit rebase -i HEAD~3\n\n# Force push safely (prevents overwriting remote changes)\ngit push origin feature-branch --force-with-lease"
      }
    ]
  },
  'docker-compose-gen': {
    practical_application: "Microservice architectures require multiple containers (e.g., Node.js App + PostgreSQL + Redis) to run simultaneously. `docker-compose.yml` orchestrates these environments, linking them on a shared virtual network. Generating a pristine compose file ensures correct port bindings, volume mounts, and environment variable injections.",
    code_blueprints: [
      {
        language: "yaml",
        title: "Docker Compose Network Blueprint",
        code: "version: '3.8'\nservices:\n  redis:\n    image: redis:alpine\n    ports:\n      - \"6379:6379\"\n  api:\n    build: .\n    depends_on:\n      - redis\n    environment:\n      - REDIS_HOST=redis"
      }
    ]
  },
  'yaml-to-json': {
    practical_application: "YAML is human-readable, making it the standard for Kubernetes manifests and CI/CD pipelines. However, most programming languages (JavaScript, Python) and REST APIs natively parse JSON. Converting YAML to JSON ensures that CI/CD configurations can be programmatically validated, tested, and injected into deployment scripts.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js JS-YAML Conversion",
        code: "const yaml = require('js-yaml');\nconst fs = require('fs');\n\ntry {\n  const doc = yaml.load(fs.readFileSync('/config.yml', 'utf8'));\n  console.log(JSON.stringify(doc, null, 2));\n} catch (e) {\n  console.log('YAML Parsing Error:', e);\n}"
      }
    ]
  },
  'html-minifier': {
    practical_application: "HTML Minification removes all unnecessary whitespace, comments, and empty attributes from the DOM before it is served to the client. This reduces the initial payload weight, directly accelerating the Time to First Byte (TTFB) and ensuring fast rendering on high-latency 3G mobile networks.",
    code_blueprints: [
      {
        language: "javascript",
        title: "HTML-Minifier Integration",
        code: "const minify = require('html-minifier').minify;\n\nconst rawHtml = '<div class=\"container\">  <p>Hello World</p> </div><!-- comment -->';\nconst minified = minify(rawHtml, {\n  removeAttributeQuotes: true,\n  collapseWhitespace: true,\n  removeComments: true\n});\nconsole.log(minified); // <div class=container><p>Hello World</p></div>"
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
  console.log('Successfully injected Batch 11 semantic depth.');
} else {
  console.log('No tools were modified.');
}
