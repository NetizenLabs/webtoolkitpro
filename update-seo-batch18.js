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
  'html-encoder': {
    seo: {
      title: 'HTML Entity Encoder & Decoder — Sanitize HTML Tags',
      description: 'Safely encode HTML tags into HTML entities (e.g. &lt;, &gt;) to prevent XSS attacks and display raw code on your website. Decode entities back to HTML instantly.',
      keywords: ['html encoder', 'html decoder', 'html entity encoder', 'sanitize html', 'escape html tags', 'xss prevention'],
      tldr: 'Instantly escape or unescape HTML reserved characters to prevent rendering or XSS attacks.',
      entity_definition: 'The HTML Entity Encoder/Decoder is a string sanitation utility. In HTML, certain characters (like `<` and `>`) are reserved for defining markup tags. To display these characters as visible text without the browser interpreting them as code, they must be converted into their corresponding HTML entities (e.g., `&lt;` and `&gt;`). This tool performs that encoding and decoding client-side, making it essential for developers writing code tutorials or sanitizing user input against Cross-Site Scripting (XSS) attacks.'
    },
    faqs: [
      {
        question: 'Why do I need to encode HTML?',
        answer: 'If you want to display raw HTML code on a web page (like a code snippet tutorial), you must encode the tags. Otherwise, the web browser will try to execute the code rather than displaying the text.'
      },
      {
        question: 'What is Cross-Site Scripting (XSS)?',
        answer: 'XSS is a security vulnerability where attackers inject malicious JavaScript into web forms. Encoding HTML entities neutralizes these attacks by forcing the browser to render the payload as harmless text.'
      },
      {
        question: 'Is the decoding safe?',
        answer: 'Yes. Our tool uses the browser\'s native DOMParser to safely extract text content without executing any embedded JavaScript, ensuring your browser remains secure.'
      }
    ]
  },
  'timestamp-converter': {
    seo: {
      title: 'Unix Timestamp Converter — Epoch to Human Date',
      description: 'Convert Unix epoch timestamps to human-readable dates (Local, UTC, ISO 8601) instantly. Get the current epoch time down to the second in real-time.',
      keywords: ['unix timestamp converter', 'epoch converter', 'timestamp to date', 'epoch to human time', 'unix time now'],
      tldr: 'Instantly convert Unix epoch numbers into readable UTC, ISO, and Local timezones.',
      entity_definition: 'The Unix Timestamp Converter is a chronological developer utility. Unix time (or Epoch time) is a system for describing a point in time, defined as the number of seconds that have elapsed since the Unix epoch (January 1, 1970, at 00:00:00 UTC). Because computers handle raw integers much faster than formatted strings, databases and APIs heavily rely on Unix timestamps. This tool translates those raw integers back into human-readable ISO 8601 strings and local timezones directly in your browser.'
    },
    faqs: [
      {
        question: 'What is the Unix Epoch?',
        answer: 'The Unix Epoch is January 1st, 1970 at 00:00:00 UTC. Unix time simply counts the number of seconds that have passed since that exact moment.'
      },
      {
        question: 'Why does my timestamp result in the year 1970?',
        answer: 'You likely have a timestamp in seconds, but your programming language expects milliseconds (or vice versa). Our tool automatically detects if your timestamp is in milliseconds based on digit length and adjusts the calculation accordingly.'
      },
      {
        question: 'What is ISO 8601?',
        answer: 'ISO 8601 is the international standard for formatting dates (e.g., `YYYY-MM-DDTHH:mm:ss.sssZ`). It is universally recognized by all programming languages.'
      }
    ]
  },
  'diff-checker': {
    seo: {
      title: 'Code Diff Checker — Compare Text & Code Instantly',
      description: 'Compare two text files or code snippets to find differences instantly. Our Longest Common Subsequence (LCS) algorithm highlights added, removed, and unchanged lines natively in your browser.',
      keywords: ['diff checker', 'compare text online', 'code difference', 'text comparator', 'find differences in text'],
      tldr: 'Compare two blocks of code or text to instantly highlight what was added or removed.',
      entity_definition: 'The Code Diff Checker is a text comparison utility used to analyze source code or document revisions. It implements the Longest Common Subsequence (LCS) algorithm entirely client-side using TypeScript. By dynamically computing a dynamic programming matrix, it tracks the exact sequence of additions and deletions required to transform the original text into the modified text, presenting the results in a standard developer Git-style red/green visual output.'
    },
    faqs: [
      {
        question: 'Is my proprietary code sent to your servers?',
        answer: 'Absolutely not. This Diff Checker was engineered to run 100% locally in your browser. The comparison algorithm executes using your device\'s CPU, meaning your confidential code never leaves your computer.'
      },
      {
        question: 'How does it calculate the differences?',
        answer: 'It uses a classic computer science algorithm called the Longest Common Subsequence (LCS). This calculates the most efficient path of additions and deletions to convert Text A into Text B.'
      },
      {
        question: 'Can I copy the diff results?',
        answer: 'Yes! You can click "Copy Diff" to copy a standard patch-style output (lines prefixed with `+` and `-`), which is perfect for pasting into Pull Requests or issue trackers.'
      }
    ]
  },
  'llms-txt-generator': {
    seo: {
      title: 'llms.txt Generator — AI Website Indexing Config',
      description: 'Create an optimized llms.txt file to instruct AI models and LLMs on how to read and summarize your website. Generate standard AI documentation instantly.',
      keywords: ['llms.txt generator', 'ai indexing file', 'llms txt file', 'website ai configuration', 'ai documentation generator'],
      tldr: 'Generate the new standard llms.txt file to instruct AI models on how to read your site.',
      entity_definition: 'The llms.txt Generator is an AI-compliance and documentation utility. Similar to how `robots.txt` instructs traditional search engine crawlers, the emerging `llms.txt` standard provides structured Markdown instructions to Large Language Models (LLMs) and AI agents (like ChatGPT or Claude). It tells the models what the website is about, where to find API documentation, and establishes clear usage and citation policies.'
    },
    faqs: [
      {
        question: 'What is an llms.txt file?',
        answer: 'It is a new standard designed for the AI era. It is a simple Markdown file placed at the root of your domain (e.g., `yoursite.com/llms.txt`) that gives AI models a clean, concise summary of your website\'s purpose and architecture.'
      },
      {
        question: 'Why use Markdown instead of JSON?',
        answer: 'LLMs are heavily trained on Markdown. Parsing a clean Markdown document is incredibly efficient for AI models, allowing them to summarize and understand your site with higher accuracy than parsing raw HTML.'
      },
      {
        question: 'Can I stop AI from indexing my site?',
        answer: 'While `llms.txt` can declare an AI usage policy, strict blocking should be enforced via `robots.txt` by disallowing known AI user agents (like GPTBot or Anthropic-ai).'
      }
    ]
  },
  'slug-generator': {
    seo: {
      title: 'URL Slug Generator — SEO-Friendly Links',
      description: 'Convert blog titles and text into clean, SEO-friendly URL slugs. Automatically remove stop words, normalize characters, and enforce max-length limits.',
      keywords: ['slug generator', 'url slug creator', 'title to slug', 'seo friendly url', 'convert string to slug'],
      tldr: 'Convert any title into a clean, SEO-optimized URL string instantly.',
      entity_definition: 'The URL Slug Generator is a technical SEO utility. A "slug" is the human-readable portion of a URL that identifies a specific page (e.g., the `url-slug-generator` in `example.com/tools/url-slug-generator`). This tool programmatically strips special characters, normalizes Unicode, replaces spaces with hyphens, and optionally removes non-essential "stop words" (like "and", "the", "or") to generate clean, highly-optimized URLs that search engines and users love.'
    },
    faqs: [
      {
        question: 'Why should I remove stop words?',
        answer: 'Stop words (like "a", "an", "the") add length to your URL without adding any SEO value. Removing them keeps your URL short, concise, and heavily focused on your primary keywords.'
      },
      {
        question: 'Should I use hyphens or underscores?',
        answer: 'Always use hyphens! Google\'s official webmaster guidelines state that their crawlers treat hyphens as word separators, but treat words connected by underscores as a single continuous word.'
      },
      {
        question: 'What is a good slug length?',
        answer: 'Aim for 50-75 characters. URLs that are too long get truncated in search engine results and are harder for users to share.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 18');
