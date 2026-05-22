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
  'markdown-converter': {
    seo: {
      title: 'Markdown to HTML Converter — Render Markdown Code Online',
      description: 'Convert Markdown syntax to clean, valid HTML instantly. Supports headings, bold text, lists, and inline code formatting for developers and writers.',
      keywords: ['markdown to html', 'markdown converter online', 'md to html generator', 'render markdown code', 'markdown formatter'],
      tldr: 'Instantly compile and render raw Markdown syntax into valid, production-ready HTML.',
      entity_definition: 'Markdown is a lightweight markup language created by John Gruber that allows writers to format text using plain-text syntax (like asterisks for bolding). The WebToolkit Pro Markdown to HTML Converter operates as a real-time parsing engine. It utilizes advanced Regular Expressions (Regex) to scan the raw Markdown input, identify formatting tokens (e.g., # for H1, ** for strong tags), and programmatically translate them into structurally valid, semantically correct HTML5 markup. This is an essential utility for technical writers migrating documentation into CMS platforms that require strict HTML.'
    },
    faqs: [
      {
        question: 'Why use Markdown instead of HTML?',
        answer: 'Markdown is vastly superior for human readability and writing speed. Writing <strong>Bold Text</strong> in HTML requires opening and closing tags, whereas Markdown simply requires **Bold Text**. It allows authors to focus on content flow rather than structural code.'
      },
      {
        question: 'Is Markdown universally standard?',
        answer: 'While the original Markdown spec is standard, several "flavors" exist (like GitHub Flavored Markdown) which introduce extended features such as tables, task lists, and fenced code blocks. This tool supports core Markdown formatting syntax.'
      },
      {
        question: 'Can I inject JavaScript into the Markdown?',
        answer: 'For security reasons, this client-side converter aggressively sanitizes the output by isolating structural tags (like H1 and lists). It will not execute `<script>` tags, making it safe for generating content for web publishing.'
      }
    ]
  },
  'markdown-previewer': {
    seo: {
      title: 'Live Markdown Previewer — Real-Time Visual Editor',
      description: 'Write Markdown code and view the fully formatted visual output in real-time. The best offline Markdown editor and live preview tool for developers.',
      keywords: ['live markdown previewer', 'markdown editor online', 'real time markdown reader', 'markdown visualizer', 'test markdown code'],
      tldr: 'Write Markdown in an isolated editor and visualize the formatted output in real-time.',
      entity_definition: 'The Live Markdown Previewer is a dual-pane text editor designed for Developer Experience (DX). While Markdown is readable in plain text, complex documents containing blockquotes, nested lists, and inline code can become difficult to visualize. This tool binds a real-time parsing algorithm to the keystroke event of the input textarea. As you type, the engine instantly compiles the Markdown tokens and renders them into the DOM as styled HTML elements in the adjacent visual pane. Because processing happens entirely client-side, it operates with zero network latency.'
    },
    faqs: [
      {
        question: 'Do I need to install anything to use this previewer?',
        answer: 'No. The WebToolkit Pro Markdown Previewer runs entirely within your browser\'s local JavaScript engine. No server requests are made during typing, ensuring total privacy and instantaneous rendering speeds.'
      },
      {
        question: 'How do I create a blockquote in Markdown?',
        answer: 'To create a blockquote, simply start the line with a greater-than sign (>) followed by a space. The previewer will instantly render this as an indented, stylized quote block.'
      },
      {
        question: 'Can I copy the HTML output?',
        answer: 'Yes! The tool includes a dedicated "Copy HTML" function that captures the underlying DOM structure of your formatted preview, allowing you to easily paste it into email clients or Content Management Systems.'
      }
    ]
  },
  'word-counter': {
    seo: {
      title: 'Professional Word & Character Counter — SEO Text Analyzer',
      description: 'Count words, characters, and lines instantly. Analyze your text length for Twitter limits, SEO meta descriptions, and academic essays.',
      keywords: ['word counter online', 'character count tool', 'count words in text', 'seo character limit checker', 'paragraph counter'],
      tldr: 'Instantly calculate word volume, character density, and line counts for any text block.',
      entity_definition: 'The Professional Word Counter is a lexical analysis tool that programmatically calculates the volumetric metrics of a text string. Utilizing client-side JavaScript, the tool processes the text input matrix in real-time, stripping excessive whitespace and executing regex boundaries (\\s+) to accurately determine the exact number of words, individual characters (including spaces), and carriage return line breaks. This data is critical for SEO professionals optimizing Title Tags (60 character limit) and marketers adhering to strict platform constraints (like Twitter\'s 280 character limit).'
    },
    faqs: [
      {
        question: 'Are spaces included in the character count?',
        answer: 'Yes, standard character counts include spaces, as they consume data bytes and physical pixel space on a screen. This is standard practice across SEO platforms and social media limits.'
      },
      {
        question: 'Why is word count important for SEO?',
        answer: 'While Google does not explicitly penalize short content, comprehensive, long-form content (typically 1,000+ words) statistically ranks higher because it tends to cover a topic with greater depth and semantic richness.'
      },
      {
        question: 'How does the tool define a "word"?',
        answer: 'The algorithm defines a word as any sequence of characters separated by standard whitespace (spaces, tabs, or line breaks). Punctuation attached to a word does not separate it into multiple words.'
      }
    ]
  },
  'text-cleaner': {
    seo: {
      title: 'Text Cleaner & Formatter — Remove Empty Lines & Spaces',
      description: 'Clean messy text formats instantly. Remove double spaces, strip empty line breaks, and fix capitalization errors with our free online text formatter.',
      keywords: ['text cleaner online', 'remove double spaces', 'delete empty lines', 'format messy text', 'text sanitizer tool'],
      tldr: 'Sanitize messy text by stripping errant line breaks, double spaces, and invalid formatting.',
      entity_definition: 'The Text Cleaner is a data sanitization utility engineered to normalize malformed strings. When text is copied from PDFs, Microsoft Word, or legacy web pages, it often carries hidden formatting artifacts—such as non-breaking spaces (\\xa0), consecutive line feeds (\\n\\n), and irregular tab spacing. This tool executes a cascading series of regular expressions to programmatically strip redundant whitespace, collapse multiple line breaks into single carriage returns, and apply universal casing functions, outputting a perfectly clean, machine-readable text block.'
    },
    faqs: [
      {
        question: 'Why does text get messy when copied from PDFs?',
        answer: 'PDFs prioritize visual layout over structural data. When you copy text from a PDF, the clipboard often captures hidden layout breaks and hard returns at the end of every visual line, resulting in fragmented text blocks when pasted.'
      },
      {
        question: 'What does "Remove Line Breaks" do?',
        answer: 'This function aggressively targets all carriage returns (\\r) and newlines (\\n) in the document and replaces them with a single space. This is incredibly useful for converting fragmented, multi-line paragraphs back into a single, cohesive string of text.'
      },
      {
        question: 'Is my text sent to a server for cleaning?',
        answer: 'No. The Text Cleaner operates entirely in your browser using local JavaScript memory. Your text data never leaves your device, guaranteeing 100% data privacy for sensitive corporate documents.'
      }
    ]
  },
  'question-explorer': {
    seo: {
      title: 'Question Explorer — Discover "People Also Ask" Intents',
      description: 'Uncover the exact questions users are asking about your niche on platforms like Reddit and Google. Optimize your SEO content for "People Also Ask" snippets.',
      keywords: ['question explorer tool', 'find people also ask questions', 'reddit question finder', 'seo intent analyzer', 'content idea generator'],
      tldr: 'Discover the exact questions your audience is asking to dominate PAA search snippets.',
      entity_definition: 'The Question Explorer is a semantic SEO research tool designed to map user intent across a specific topical niche. Instead of traditional keyword volume, this tool focuses on "Long-Tail Interrogatives" (Who, What, Where, When, Why, How). By dynamically generating queries and interfacing with public autocomplete endpoints (like DuckDuckGo\'s suggestion API), it aggregates the exact questions real users are typing into search engines. Content marketers utilize these insights to structure their H2 and H3 headers, directly targeting Google\'s highly lucrative "People Also Ask" (PAA) rich snippets.'
    },
    faqs: [
      {
        question: 'What is a "People Also Ask" (PAA) snippet?',
        answer: 'The PAA snippet is a dynamic, interactive box displayed in Google Search results that features questions algorithmically related to the user\'s query. Winning a spot in this box can exponentially increase a website\'s organic click-through rate.'
      },
      {
        question: 'How do I optimize my content for questions?',
        answer: 'To rank for a question, include the exact question as an H2 or H3 subheader in your article, and immediately follow it with a clear, concise answer (ideally under 50 words) in standard paragraph (<p>) or list format.'
      },
      {
        question: 'Why does the tool classify intent (e.g., Budget, Trust)?',
        answer: 'User intent reveals where the searcher is in the buying journey. "Budget" questions indicate a readiness to purchase, whereas "Technical" questions suggest the user already owns the product and requires support. Tailoring content to intent increases conversion rates.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 5');
