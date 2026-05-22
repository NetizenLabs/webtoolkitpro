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
  'url-parser': {
    seo: {
      title: 'URL Parser — Break Down Web Addresses',
      description: 'Instantly parse and break down URLs into their component parts (Protocol, Hostname, Path, Queries, Hashes) for debugging routing and analytics parameters.',
      keywords: ['url parser', 'break down url', 'parse url string', 'url inspector', 'extract url queries'],
      tldr: 'Deconstruct any web address into its underlying protocol, domain, and query components.',
      entity_definition: 'The URL Parser is a web routing utility. A Uniform Resource Locator (URL) is a structured string that dictates how a browser communicates with a server. This tool utilizes the browser\'s native `URL()` constructor to break apart complex links into their distinct structural components: the Protocol (http/https), Hostname (domain), Pathname (route), Search Params (query variables), and Hash (anchor links).'
    },
    faqs: [
      {
        question: 'What are Search Params?',
        answer: 'Search Params (or Query Strings) are the key-value pairs following the `?` in a URL (e.g., `?utm_source=google`). They are used to pass data to the server or analytics platforms without altering the page route.'
      },
      {
        question: 'Why is the Port usually 80 or 443?',
        answer: 'Port 80 is the default communication port for unencrypted HTTP traffic, while 443 is the default for encrypted HTTPS traffic. Browsers hide these by default.'
      },
      {
        question: 'Are Hashes sent to the server?',
        answer: 'No. The Hash fragment (the part after the `#`) is processed entirely by the client\'s browser. It is typically used for scrolling to an anchor on the page or routing in Single Page Applications.'
      }
    ]
  },
  'ua-parser': {
    seo: {
      title: 'User-Agent Parser — Detect Browser and OS Info',
      description: 'Analyze your browser\'s User-Agent string to detect the underlying Operating System, Browser Version, and Device Type instantly. Great for debugging web compatibility.',
      keywords: ['user agent parser', 'what is my user agent', 'detect browser string', 'parse ua string', 'device detector'],
      tldr: 'Instantly inspect your browser\'s User-Agent string to detect your OS and device type.',
      entity_definition: 'The User-Agent (UA) Parser is an HTTP header analysis utility. When your browser requests a web page, it sends a `User-Agent` string—a technical fingerprint identifying the software and hardware. This tool executes a heuristic analysis against `navigator.userAgent`, scanning for known identifier patterns (like "Chrome", "Windows", or "iPhone") to accurately deduce your Operating System, Browser engine, and Device category (Desktop vs Mobile).'
    },
    faqs: [
      {
        question: 'Why do User-Agent strings look so confusing?',
        answer: 'Due to decades of browser wars, browsers began "spoofing" each other\'s UA strings to bypass website compatibility blocks. This is why almost all modern browsers still falsely claim to be "Mozilla/5.0".'
      },
      {
        question: 'Can my User-Agent be faked?',
        answer: 'Yes. Developers frequently change their UA string using browser DevTools to simulate how a website looks on a mobile device.'
      },
      {
        question: 'Is User-Agent parsing reliable?',
        answer: 'For basic analytics, yes. However, modern browsers are pushing towards "User-Agent Client Hints" as a more structured and privacy-friendly alternative to raw UA strings.'
      }
    ]
  },
  'json-schema-gen': {
    seo: {
      title: 'JSON Schema Generator — Create Schema from JSON',
      description: 'Automatically generate Draft-07 JSON Schemas from JSON objects. Validate your API payloads and enforce strict data structures instantly.',
      keywords: ['json schema generator', 'generate json schema', 'json to schema draft 07', 'api schema builder', 'json validation schema'],
      tldr: 'Automatically infer and generate a strict Draft-07 JSON Schema from a sample JSON object.',
      entity_definition: 'The JSON Schema Generator is an API validation utility. JSON Schema is a vocabulary that allows you to annotate and validate JSON documents (defined by the draft-07 spec). This tool parses a raw JSON payload, analyzes the primitive type of every property (`string`, `number`, `array`, `object`), and automatically generates the corresponding schema definition. This schema can then be used in backend servers (like Node.js or Python) to strictly validate incoming API requests.'
    },
    faqs: [
      {
        question: 'What is Draft-07?',
        answer: 'Draft-07 is the most widely adopted version of the JSON Schema specification. It provides a standard set of rules and keywords for defining what a valid JSON object should look like.'
      },
      {
        question: 'Can JSON Schemas validate array lengths?',
        answer: 'Yes. While this tool generates the base types, you can manually add constraints like `minItems` or `maxItems` to the generated schema to enforce array sizes.'
      },
      {
        question: 'Why use a schema instead of manual validation?',
        answer: 'Manual `if/else` validation statements clutter backend code and are prone to errors. JSON Schema allows you to define validation rules declaratively in a single file.'
      }
    ]
  },
  'regex-explainer': {
    seo: {
      title: 'Regular Expression Explainer — Visualize Regex',
      description: 'Break down complex Regular Expressions (Regex) into plain English. A visual tool to decode anchors, character classes, and quantifiers for debugging.',
      keywords: ['regex explainer', 'visualize regex', 'regex breakdown', 'explain regular expression', 'regex decoder online'],
      tldr: 'Demystify complex Regular Expressions with a plain-English, semantic breakdown.',
      entity_definition: 'The Regular Expression Explainer is an educational debugging utility. Regex is an incredibly dense, non-obvious syntax used to match string patterns. This tool parses a given regex string and isolates its semantic tokens. It identifies boundary anchors (`^`, `$`), character classes (`[...]`), and quantifiers (`+`, `{x,y}`), translating their mathematical logic into human-readable descriptions, allowing developers to debug faulty pattern matches rapidly.'
    },
    faqs: [
      {
        question: 'What are Regex Anchors?',
        answer: 'Anchors do not match characters; they match positions. For example, `^` asserts the start of a string, and `$` asserts the end, ensuring the pattern matches the entire string rather than a substring.'
      },
      {
        question: 'What does a Plus (+) symbol do?',
        answer: 'The `+` is a quantifier that tells the regex engine to match the preceding character (or group) "one or more times".'
      },
      {
        question: 'Why is Regex so difficult to read?',
        answer: 'Because nearly every symbol has a dual meaning. For instance, a dot (`.`) matches any character, but if it is escaped (`\\.`), it literally matches a period.'
      }
    ]
  },
  'cron-descriptor': {
    seo: {
      title: 'Cron Expression Descriptor — Translate Cron to English',
      description: 'Translate cryptic Cron expressions into human-readable English schedules. Ensure your server automation and backup scripts run exactly when intended.',
      keywords: ['cron expression descriptor', 'translate cron to english', 'cron to text', 'cron schedule explainer', 'cron job decoder'],
      tldr: 'Decode cryptic server Cron expressions into clear, human-readable English schedules.',
      entity_definition: 'The Cron Expression Descriptor is an infrastructure scheduling utility. In Unix-like operating systems, the `cron` daemon executes background tasks based on a 5-part time string (Minute, Hour, Day, Month, Day-of-Week). This tool splits the expression, analyzes wildcard (`*`) rules, and computationally translates the logic into plain English (e.g., "At minute 0 of every hour"), preventing catastrophic automation failures.'
    },
    faqs: [
      {
        question: 'What does an asterisk (*) mean in Cron?',
        answer: 'The asterisk acts as a wildcard, meaning "every". For example, an asterisk in the "Hour" column means the task will execute every single hour.'
      },
      {
        question: 'What order are the time fields in?',
        answer: 'The standard 5-part cron syntax reads from left to right: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6, where 0 is Sunday).'
      },
      {
        question: 'Can cron run tasks every second?',
        answer: 'No. The smallest unit of time supported by standard Unix cron is one minute.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 23');
