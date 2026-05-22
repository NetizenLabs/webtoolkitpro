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
  'html-beautifier': {
    seo: {
      title: 'HTML Beautifier — Format & Indent HTML Code',
      description: 'Format, indent, and beautify messy HTML code instantly. Our free online HTML formatter transforms minified HTML into readable, properly structured code.',
      keywords: ['html beautifier', 'html formatter', 'format html online', 'indent html code', 'unminify html'],
      tldr: 'Instantly format and indent messy or minified HTML code for readability.',
      entity_definition: 'The HTML Beautifier is a developer utility that reverses the effects of minification or poor coding practices. By analyzing the Document Object Model (DOM) structure of a raw HTML string, the tool automatically injects line breaks, spaces, and standardized indentation (typically 2 or 4 spaces per tag hierarchy). This transforms dense, unreadable strings into a structured visual hierarchy, making it vastly easier for developers to debug layout issues, read content, and identify missing closing tags.'
    },
    faqs: [
      {
        question: 'Does beautifying HTML change how the page looks?',
        answer: 'No. Adding whitespace and line breaks between HTML tags does not affect how the browser renders the visual elements on the page, as browsers natively ignore this whitespace.'
      },
      {
        question: 'Can this tool fix broken HTML?',
        answer: 'While it attempts to format the code based on the tags it finds, a beautifier is not a validator. If you have a missing closing tag (like a `<div>` without a `</div>`), the indentation will eventually skew, which actually helps you visually locate the error.'
      },
      {
        question: 'What is the standard indentation size?',
        answer: 'The industry standard for HTML is 2 spaces per indentation level. This keeps the code readable while preventing deep HTML trees from scrolling too far horizontally off the screen.'
      }
    ]
  },
  'css-formatter': {
    seo: {
      title: 'CSS Formatter — Beautify & Indent Stylesheets',
      description: 'Format and beautify CSS code instantly. Unminify stylesheets, fix indentation, and organize CSS rules for better readability and easier debugging.',
      keywords: ['css formatter', 'css beautifier', 'format css online', 'unminify css', 'indent stylesheet'],
      tldr: 'Organize and indent messy CSS code into a clean, readable stylesheet.',
      entity_definition: 'The CSS Formatter is a specialized code styling utility designed to organize Cascading Style Sheets. Developers often encounter minified CSS files (where all rules are crushed onto a single line) or legacy codebases with inconsistent formatting. This tool parses the CSS syntax tree and enforces strict structural rules: placing each selector on a new line, indenting properties inside curly brackets `{ }`, and adding a single space after colons. This standardization is critical for team collaboration and code reviews.'
    },
    faqs: [
      {
        question: 'Why should I format my CSS?',
        answer: 'Formatted CSS is significantly easier for humans to read, maintain, and debug. When a single element has 15 different styling rules, stacking them vertically allows a developer to instantly scan and modify the exact property they need.'
      },
      {
        question: 'Will formatting increase my CSS file size?',
        answer: 'Yes. Because formatting injects thousands of space characters and line breaks, the total file size will increase. Therefore, you should always format code during development, but run it through a CSS Minifier before deploying to production.'
      },
      {
        question: 'Does this sort my CSS properties alphabetically?',
        answer: 'This specific tool focuses purely on indentation and line breaks (beautification). It preserves the original vertical order of your properties, as changing the order of CSS rules can sometimes unintentionally alter the cascade (specificity).'
      }
    ]
  },
  'xml-formatter': {
    seo: {
      title: 'XML Formatter — Indent & Beautify XML Data',
      description: 'Format, indent, and beautify XML strings instantly. Easily read complex XML payloads, SOAP requests, and RSS feeds with proper syntax highlighting.',
      keywords: ['xml formatter', 'xml beautifier', 'format xml online', 'indent xml string', 'pretty print xml'],
      tldr: 'Pretty-print messy XML data into a structured, readable tree hierarchy.',
      entity_definition: 'The XML Formatter is a data visualization utility that applies "pretty-printing" to Extensible Markup Language documents. XML is heavily utilized in enterprise data transfers (SOAP APIs, financial feeds) and often transmits as a single, massive string without line breaks. By parsing the XML nodes and injecting hierarchical indentation, this tool allows engineers to easily visualize the parent-child relationships of the data, inspect attributes, and debug complex API responses.'
    },
    faqs: [
      {
        question: 'What does "pretty-printing" mean?',
        answer: 'Pretty-printing is the process of taking a block of code or data and formatting it with standardized line breaks and indentations to make it visually pleasing and easy for humans to read.'
      },
      {
        question: 'Will this tool validate my XML?',
        answer: 'Formatting inherently requires parsing. If your XML has severe syntax errors (like mismatched opening and closing tags), the formatter may fail or output improperly, alerting you to the structural issue.'
      },
      {
        question: 'Can I format SVG files with this?',
        answer: 'Yes! Scalable Vector Graphics (SVG) are entirely built on XML architecture. If you have a minified SVG file that you need to manually edit, pasting it into the XML Formatter will structure it perfectly.'
      }
    ]
  },
  'json-formatter': {
    seo: {
      title: 'JSON Formatter — Beautify & Validate JSON Online',
      description: 'Format, indent, and validate JSON data instantly. A secure, client-side JSON formatter that handles massive files using Web Worker technology.',
      keywords: ['json formatter', 'json beautifier', 'format json online', 'pretty print json', 'json validator'],
      tldr: 'Securely format, indent, and validate JSON strings directly in your browser.',
      entity_definition: 'The JSON Formatter is an essential developer utility that parses, validates, and "pretty-prints" JavaScript Object Notation (JSON). Because JSON is the universal standard for REST API responses and NoSQL databases, developers constantly interact with massive, unformatted JSON payloads. This tool securely parses the string natively in the browser, alerting the user to any syntax errors (like missing commas or trailing quotes), and outputs a cleanly indented, colorful data structure.'
    },
    faqs: [
      {
        question: 'Is my JSON data sent to a server?',
        answer: 'No. Our JSON Formatter operates entirely client-side within your browser using secure Web Worker technology. Your sensitive API payloads, tokens, and data never leave your local machine.'
      },
      {
        question: 'Why is my JSON failing to format?',
        answer: 'JSON requires extremely strict syntax. The most common errors that prevent formatting include trailing commas at the end of an array or object, using single quotes (\') instead of double quotes ("), and unquoted keys.'
      },
      {
        question: 'What is the Web Worker pipeline?',
        answer: 'Formatting very large JSON files (e.g., 50MB+) can freeze a web browser. We utilize a background Web Worker to process the heavy parsing off the main UI thread, ensuring the website remains completely fluid and responsive during processing.'
      }
    ]
  },
  'json-formatter-pro': {
    seo: {
      title: 'JSON Formatter Pro — Interactive JSON Tree Viewer',
      description: 'An advanced, interactive JSON formatting tool. Collapse nodes, search for specific keys, and navigate massive JSON payloads with an interactive tree viewer.',
      keywords: ['json tree viewer', 'interactive json formatter', 'advanced json beautifier', 'json object explorer', 'search json keys'],
      tldr: 'Explore complex JSON data using a highly interactive, collapsible, and searchable tree view.',
      entity_definition: 'JSON Formatter Pro is an advanced data exploration utility designed for navigating deeply nested, complex JSON payloads. While a standard formatter outputs a static text block, the Pro version parses the JSON into an interactive Document Object Model (DOM) tree. Developers can collapse and expand specific arrays or objects, visually isolate data branches, and utilize a real-time regex search engine to instantly highlight specific keys or values buried deep within thousands of lines of data.'
    },
    faqs: [
      {
        question: 'When should I use the Pro version over the standard formatter?',
        answer: 'You should use the standard JSON Formatter if you just need to quickly copy-paste formatted text into your IDE. You should use the Pro version when you need to actively explore, search, and understand a massive API response you\'ve never seen before.'
      },
      {
        question: 'Can I search for specific data in the tree?',
        answer: 'Yes. The Pro viewer includes a live search input. Typing a key name (e.g., "user_id") will instantly highlight all matching nodes across the entire JSON structure, making debugging significantly faster.'
      },
      {
        question: 'Does the Pro version also validate the JSON?',
        answer: 'Yes. Before the interactive tree can be generated, the input must pass strict `JSON.parse()` validation. If there is a syntax error, the tool will instantly output the exact error message and halt rendering.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 12');
