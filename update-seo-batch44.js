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
  'k8s-yaml-validator': {
    seo: {
      title: 'Kubernetes YAML Validator — K8s Syntax Checker',
      description: 'Validate your Kubernetes YAML configuration files instantly. Detect syntax errors, missing kind declarations, and schema mismatches before deploying to your cluster.',
      keywords: ['kubernetes yaml validator', 'k8s syntax checker', 'validate kubernetes manifest', 'test k8s deployment yaml', 'kubernetes schema validator'],
      tldr: 'Validate your Kubernetes YAML manifests for syntax errors and schema compliance before deployment.',
      entity_definition: 'The Kubernetes YAML Validator is a DevOps infrastructure utility. Kubernetes (K8s) relies on massive, declarative YAML files (manifests) to orchestrate container deployments, services, and ingresses. A single indentation error or missing `apiVersion` can crash a production cluster deployment. This tool parses the raw YAML syntax and explicitly validates the data structure against the official Kubernetes OpenAPI schema, identifying precise line-number errors for missing required properties, invalid datatypes, and structural anomalies.'
    },
    faqs: [
      {
        question: 'What is a Kubernetes Manifest?',
        answer: 'A manifest is a YAML or JSON file that explicitly describes the desired state of your application (e.g., "I want 3 replicas of my Node.js container running"). Kubernetes reads this file and automatically provisions the infrastructure to match it.'
      },
      {
        question: 'Why did my YAML fail validation?',
        answer: 'YAML is notoriously strict about whitespace. If you use a Tab instead of Spaces, or if your nested `spec` array is indented one space too far to the left, the parser will instantly throw a syntax error.'
      },
      {
        question: 'Does this check if my cluster can run it?',
        answer: 'No. This tool performs "static analysis." It mathematically proves the file is syntactically and structurally correct according to the Kubernetes schema. It cannot verify if your specific cluster has enough CPU or memory to actually deploy it.'
      }
    ]
  },
  'aws-iam-generator': {
    seo: {
      title: 'AWS IAM Policy Generator — Secure JSON Policies',
      description: 'Generate secure AWS IAM JSON policies visually. Configure precise permissions, actions, and resources for S3, EC2, and Lambda following the Principle of Least Privilege.',
      keywords: ['aws iam generator', 'create iam policy json', 'aws security policy maker', 's3 bucket policy generator', 'least privilege aws tool'],
      tldr: 'Visually construct highly secure, least-privilege AWS IAM JSON policies.',
      entity_definition: 'The AWS IAM Policy Generator is a cloud security utility. Amazon Web Services Identity and Access Management (IAM) requires complex JSON documents to explicitly allow or deny users access to specific cloud resources. Hand-writing these JSON policies often leads to developers using dangerous wildcards (e.g., `s3:*`) out of frustration. This tool provides a visual UI to select exact AWS Services (like EC2 or DynamoDB), define granular Actions, and specify exact Resource ARNs, outputting a syntactically perfect, highly secure JSON policy document.'
    },
    faqs: [
      {
        question: 'What is the Principle of Least Privilege?',
        answer: 'It is a core cybersecurity concept stating that a user or application should only be granted the absolute minimum permissions necessary to perform its job. For example, if an app only needs to read photos from an S3 bucket, it should never be given permission to delete them.'
      },
      {
        question: 'What does a wildcard (*) do in IAM?',
        answer: 'A wildcard grants access to EVERYTHING. If your policy says `Action: "*"` and `Resource: "*"`, you have essentially granted the user God-mode "AdministratorAccess" to do whatever they want in your entire AWS account. This is incredibly dangerous.'
      },
      {
        question: 'What is an ARN?',
        answer: 'An ARN (Amazon Resource Name) is a unique string that explicitly identifies a specific AWS resource. For example, `arn:aws:s3:::my-company-bucket` specifically targets one single S3 bucket, rather than all buckets.'
      }
    ]
  },
  'cron-to-k8s': {
    seo: {
      title: 'Cron to Kubernetes CronJob — Convert Schedules',
      description: 'Convert standard Linux Cron expressions into Kubernetes CronJob YAML manifests instantly. Scaffold batch jobs, backups, and scheduled tasks for your K8s cluster.',
      keywords: ['cron to kubernetes', 'k8s cronjob generator', 'generate kubernetes cron yaml', 'convert crontab to k8s', 'kubernetes scheduled job maker'],
      tldr: 'Instantly convert a standard Linux Cron schedule into a fully configured Kubernetes CronJob YAML manifest.',
      entity_definition: 'The Cron to Kubernetes CronJob utility is a DevOps cloud migration tool. While traditional Linux servers use the `crontab` file to schedule background tasks, distributed cloud environments like Kubernetes use complex `CronJob` API objects written in YAML. This tool accepts a standard 5-part cron expression (e.g., `0 2 * * *`), pairs it with user-defined Docker container configurations, and scaffolds the nested `batch/v1` YAML manifest required to execute scheduled jobs concurrently across a K8s cluster.'
    },
    faqs: [
      {
        question: 'What is a Kubernetes CronJob?',
        answer: 'It is a native Kubernetes object that runs a specific Docker container on a repeating schedule. It is identical in concept to a Linux cron job, but instead of running a script on one server, it spins up a temporary container in your cluster, runs the task, and then destroys the container.'
      },
      {
        question: 'What is the Concurrency Policy?',
        answer: 'In Kubernetes, if a CronJob takes too long to run, the next scheduled instance might start before the first one finishes. The Concurrency Policy dictates whether K8s should "Allow" both to run simultaneously, "Forbid" the new one, or "Replace" the old one.'
      },
      {
        question: 'Does Kubernetes support seconds in Cron?',
        answer: 'No. The official Kubernetes `CronJob` resource strictly adheres to the standard 5-field cron format (Minute, Hour, Day, Month, Day of Week). The minimum execution frequency is exactly 1 minute.'
      }
    ]
  },
  'authority-simulator': {
    seo: {
      title: 'Domain Authority Simulator — Forecast SEO Metrics',
      description: 'Simulate changes to your Moz Domain Authority (DA). Forecast how acquiring high-quality backlinks will mathematically increase your overall SEO website authority.',
      keywords: ['domain authority simulator', 'calculate moz da', 'forecast domain rating', 'backlink authority calculator', 'seo authority predictor'],
      tldr: 'Simulate the mathematical impact of acquiring new backlinks on your Domain Authority score.',
      entity_definition: 'The Domain Authority Simulator is a predictive SEO analytics utility. Metrics like Moz\'s Domain Authority (DA) or Ahrefs\' Domain Rating (DR) calculate a website\'s overall ranking strength on a logarithmic scale from 1 to 100. Because the scale is logarithmic, growing from DA 20 to 30 is significantly easier than growing from DA 70 to 80. This tool allows SEO professionals to input their current authority score and simulate the algorithmic impact of acquiring hypothetical inbound links from various authority tiers.'
    },
    faqs: [
      {
        question: 'Does Google use Domain Authority?',
        answer: 'No. Domain Authority is a proprietary metric invented by third-party software companies (like Moz). Google relies on their own internal algorithms (like PageRank). However, DA remains the most accurate industry proxy for estimating a site\'s ranking power.'
      },
      {
        question: 'What is a logarithmic scale?',
        answer: 'A logarithmic scale means the difficulty increases exponentially. To increase your DA from 10 to 20, you might only need 5 good backlinks. To increase from 80 to 90, you might need 5,000 extremely high-quality backlinks.'
      },
      {
        question: 'Do nofollow links increase authority?',
        answer: 'Traditionally, no. A `rel="nofollow"` attribute explicitly tells search engines not to pass authority (link juice) to the target URL. However, a natural backlink profile should still contain a healthy mix of both follow and nofollow links.'
      }
    ]
  },
  'browser-compat-checker': {
    seo: {
      title: 'Browser Compatibility Checker Pro — Can I Use APIs?',
      description: 'Check global browser support for HTML5, CSS3, and JavaScript APIs. Ensure your code is compatible with legacy browsers and mobile devices.',
      keywords: ['browser compatibility checker pro', 'can i use css', 'test html5 support', 'javascript api compatibility', 'global browser support tool'],
      tldr: 'Instantly verify cross-browser support for specific HTML5, CSS3, and JavaScript web APIs.',
      entity_definition: 'The Browser Compatibility Checker Pro is an advanced frontend development utility. The web ecosystem consists of numerous rendering engines (Blink, WebKit, Gecko) executing code on fragmented operating systems. When implementing cutting-edge features like CSS Grid or the Web Bluetooth API, developers must verify if their user base can actually render it. This tool queries global support databases to output the exact browser versions (Chrome, Safari, Firefox, Edge) that natively support the feature, highlighting where polyfills are necessary.'
    },
    faqs: [
      {
        question: 'What happens if a browser doesn\'t support a CSS feature?',
        answer: 'Unlike JavaScript (which will throw a fatal error and crash your script), CSS is highly forgiving. If a browser doesn\'t recognize a CSS property like `gap`, it simply ignores that specific line of code and renders the rest of the page.'
      },
      {
        question: 'Why do I need to check mobile browsers separately?',
        answer: 'Mobile browsers (like iOS Safari or Chrome for Android) often have distinct rendering limits compared to their desktop counterparts to conserve battery life and RAM. A feature supported on Desktop Safari might be entirely missing on iOS Safari.'
      },
      {
        question: 'What is a fallback?',
        answer: 'A fallback is writing legacy code right before modern code. For example, writing `background: red;` immediately followed by `background: linear-gradient(...)`. Old browsers read the first line and ignore the second. Modern browsers read the first, and then overwrite it with the second.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 44');
