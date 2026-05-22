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
  'html-to-markdown': {
    seo: {
      title: 'HTML to Markdown Converter — Free & Fast Online Tool',
      description: 'Convert raw HTML code into clean Markdown instantly. A highly secure, regex-based client-side converter perfect for bloggers and developers migrating content.',
      keywords: ['html to markdown', 'convert html to md', 'html to md converter', 'markdown generator', 'convert html code'],
      tldr: 'Transform complex HTML tags into clean, highly readable Markdown syntax instantly.',
      entity_definition: 'The HTML to Markdown Converter is a specialized text processing utility that reverses HTML markup into the standardized Markdown syntax popularized by platforms like GitHub, Reddit, and Discord. It parses structural HTML tags (like `<h1>`, `<strong>`, or `<ul>`) and converts them into their lightweight Markdown equivalents (e.g., `#`, `**`, or `-`). This is highly valuable when migrating content from legacy WYSIWYG editors (like WordPress) into modern static site generators (like Hugo or Next.js) that natively utilize `.md` files.'
    },
    faqs: [
      {
        question: 'Will this converter remove inline CSS?',
        answer: 'Yes. Markdown is strictly a structural language; it does not support styling. When converting HTML to Markdown, all `class`, `style`, and `id` attributes attached to your HTML tags are deliberately stripped away to ensure clean output.'
      },
      {
        question: 'Does it support complex HTML tables?',
        answer: 'Basic structural tables are often difficult to accurately convert to Markdown due to Markdown\'s rigid table spacing rules. This converter focuses on primary typographic elements (headings, bold, lists, links, quotes).'
      },
      {
        question: 'Is the conversion done securely?',
        answer: 'Absolutely. The conversion logic relies on a client-side regex engine that runs entirely within your browser. The HTML code you paste is never transmitted to our servers.'
      }
    ]
  },
  'markdown-to-html': {
    seo: {
      title: 'Markdown to HTML Converter — Fast Markdown Parser',
      description: 'Convert Markdown text to valid HTML instantly. A secure client-side Markdown parser for web developers, copywriters, and content creators.',
      keywords: ['markdown to html', 'md to html converter', 'convert md to html', 'markdown parser online', 'markdown renderer'],
      tldr: 'Parse lightweight Markdown text and render it into fully valid HTML structural code.',
      entity_definition: 'The Markdown to HTML Converter is a text parsing utility that translates lightweight Markdown syntax into raw HyperText Markup Language (HTML). Markdown was explicitly designed to be easy for humans to write, utilizing symbols like `#` for headings and `**` for bold text. However, web browsers only understand HTML. This tool bridges that gap by executing a regex parsing engine that captures Markdown symbols and wraps the content in the corresponding HTML DOM nodes (like `<h1>` or `<strong>`), preparing it for web deployment.'
    },
    faqs: [
      {
        question: 'Does this converter output a full HTML page?',
        answer: 'No. The converter outputs "HTML fragments," meaning it only translates the specific text nodes you provide. It does not wrap the output in `<html>`, `<head>`, or `<body>` tags, assuming you will inject the code directly into an existing layout.'
      },
      {
        question: 'Can I see a live preview of the HTML?',
        answer: 'Yes! The tool features a real-time rendering engine. As you type your Markdown on the left, you can instantly see both the raw HTML output and the visually rendered content simultaneously.'
      },
      {
        question: 'Does it support GitHub Flavored Markdown (GFM)?',
        answer: 'This utility supports the core standard Markdown syntax (headings, bold, italics, quotes, lists, links, inline code). Complex GFM features like task lists or advanced nested tables may require manual HTML tweaking.'
      }
    ]
  },
  'csv-to-json': {
    seo: {
      title: 'CSV to JSON Converter — Parse Excel Data to JSON',
      description: 'Convert CSV spreadsheet data into structured JSON format instantly. An essential tool for migrating database exports into REST APIs or NoSQL formats.',
      keywords: ['csv to json', 'convert csv to json online', 'excel to json', 'csv parser', 'json array generator'],
      tldr: 'Easily translate rigid spreadsheet data (CSV) into flexible JavaScript Object Notation (JSON).',
      entity_definition: 'The CSV to JSON Converter is a data transformation utility bridging the gap between flat-file data storage and modern web applications. Comma-Separated Values (CSV) is the universal export format for spreadsheets (Excel) and relational databases (SQL). However, modern web APIs and NoSQL databases (like MongoDB) require hierarchical JSON arrays. This tool parses the top row of a CSV as the object "keys" and iteratively maps all subsequent rows into a structured JSON array of objects.'
    },
    faqs: [
      {
        question: 'How does it handle headers?',
        answer: 'The converter strictly expects the very first row of your CSV data to contain column headers. It will use these exact header strings as the keys for every resulting JSON object in the array.'
      },
      {
        question: 'Does this handle quotes inside the CSV data?',
        answer: 'Yes. The parser uses logic to identify and strip the surrounding quotes that Excel often applies to CSV fields containing commas, ensuring your JSON data doesn\'t contain accidental escape characters.'
      },
      {
        question: 'Is my data secure?',
        answer: '100% secure. Financial or user data exported as CSV can be highly sensitive. Our converter executes entirely via local browser JavaScript; your spreadsheet data never leaves your computer.'
      }
    ]
  },
  'json-to-csv': {
    seo: {
      title: 'JSON to CSV Converter — Export JSON APIs to Excel',
      description: 'Convert JSON arrays into clean CSV spreadsheets instantly. Automatically flatten nested JSON objects to make API data compatible with Excel and SQL databases.',
      keywords: ['json to csv', 'convert json to excel', 'json to spreadsheet', 'flatten json online', 'json parser'],
      tldr: 'Flatten nested JSON data into a clean, comma-separated spreadsheet format.',
      entity_definition: 'The JSON to CSV Converter is a data normalization utility. While developers prefer JSON for its ability to nest complex data (like an `address` object inside a `user` object), business analysts and legacy systems require flat tabular formats like CSV for Excel or SQL imports. This tool utilizes a recursive flattening algorithm that traverses nested JSON structures, converting deep paths into singular column headers (e.g., `address.city`), and outputs a perfectly aligned Comma-Separated string.'
    },
    faqs: [
      {
        question: 'What happens to nested objects?',
        answer: 'Nested objects are recursively flattened using "dot notation." For example, if a user object has a nested `address: { city: "NYC" }`, the resulting CSV will feature a column header named `address.city`.'
      },
      {
        question: 'What happens to nested arrays?',
        answer: 'Because CSVs are strictly two-dimensional, nested arrays (like a list of `roles`) are collapsed into a single string separated by semicolons (e.g., "Admin; Editor") so they fit inside a single spreadsheet cell.'
      },
      {
        question: 'Does it require a JSON array?',
        answer: 'Yes and no. The ideal input is an array of objects `[{}, {}]`. However, if you input a single JSON object `{}`, the tool will intelligently wrap it into an array to produce a single-row CSV.'
      }
    ]
  },
  'text-to-binary': {
    seo: {
      title: 'Text to Binary Converter — ASCII to 8-bit Binary',
      description: 'Convert text characters into raw 8-bit binary code instantly. A free educational tool to understand computer machine code and ASCII character encoding.',
      keywords: ['text to binary', 'convert text to binary', 'ascii to binary', 'binary code generator', 'binary translator'],
      tldr: 'Translate standard text characters into machine-readable 1s and 0s.',
      entity_definition: 'The Text to Binary Converter is a character encoding utility that translates human-readable ASCII/UTF text into base-2 binary strings. At a hardware level, computers only process binary data (electrical signals representing 1 or 0). This tool isolates every individual character in an input string, determines its numerical decimal value in the ASCII table, and converts that integer into an 8-bit (1 byte) binary sequence, outputting a precise representation of how data is stored in machine memory.'
    },
    faqs: [
      {
        question: 'What is 8-bit binary?',
        answer: 'An "bit" is a single 1 or 0. An 8-bit sequence (called a byte) provides exactly 256 possible combinations (2^8). In standard computing, it takes exactly one byte of memory to store one character, which is why the tool pads the binary output to 8 digits per letter.'
      },
      {
        question: 'Can I decode the binary back to text?',
        answer: 'Yes! Because this tool uses standard ASCII character encoding, any standard Binary to Text decoder can read the generated 8-bit blocks and translate them flawlessly back into your original message.'
      },
      {
        question: 'Why are there spaces between the numbers?',
        answer: 'We inject a space between every 8-bit sequence solely for human readability. Without spaces, a simple sentence would become a massive, unreadable wall of thousands of 1s and 0s.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 13');
