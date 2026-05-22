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
  'html-minifier': {
    seo: {
      title: 'HTML Minifier — Compress HTML Code for Faster Page Loads',
      description: 'Minify and compress your HTML code instantly. Remove comments, whitespace, and unnecessary formatting to improve your website\'s Core Web Vitals and SEO performance.',
      keywords: ['html minifier', 'compress html online', 'minify html code', 'html optimizer', 'reduce html file size'],
      tldr: 'Strip redundant whitespace and comments from HTML documents to radically improve page load speeds.',
      entity_definition: 'The HTML Minifier is a frontend optimization utility designed to reduce the payload size of web documents. While developers write HTML using semantic indentation, line breaks, and comments for readability, web browsers ignore this whitespace when constructing the Document Object Model (DOM). This tool employs an advanced Regular Expression parsing engine to aggressively strip out all non-functional characters, converting massive multi-line documents into a single dense string. This directly reduces the Time to First Byte (TTFB) and accelerates the critical rendering path.'
    },
    faqs: [
      {
        question: 'Will minifying HTML change how my website looks?',
        answer: 'No. The minifier only removes characters that the browser\'s rendering engine natively ignores (like HTML comments `<!-- -->` and multi-space indentation). The visual output on the screen remains 100% identical.'
      },
      {
        question: 'Why is HTML minification important for SEO?',
        answer: 'Search engines like Google heavily factor page speed into their ranking algorithms (Core Web Vitals). Minifying HTML reduces the file size transferred over the network, allowing Googlebot to crawl your site faster and users to see content sooner.'
      },
      {
        question: 'Does this tool minify inline CSS and JavaScript?',
        answer: 'This specific utility focuses purely on the DOM structure. To safely minify complex `<style>` or `<script>` blocks, you should run those specific code blocks through our dedicated CSS and JS minifiers.'
      }
    ]
  },
  'css-minifier': {
    seo: {
      title: 'CSS Minifier — Compress & Optimize Stylesheets',
      description: 'Compress CSS code instantly. Strip whitespace, comments, and trailing semicolons to optimize stylesheet delivery and eliminate render-blocking resources.',
      keywords: ['css minifier', 'compress css online', 'minify stylesheet', 'css optimizer', 'reduce css file size'],
      tldr: 'Aggressively compress Cascading Style Sheets to eliminate render-blocking delays on your website.',
      entity_definition: 'The CSS Minifier is a performance-tuning utility that optimizes Cascading Style Sheets (CSS). CSS files are famously known as "render-blocking resources"—meaning a browser will halt the painting of a webpage until the entire CSS file is downloaded and parsed. This tool mitigates this bottleneck by executing a regex pipeline that strips out block comments (`/* */`), collapses redundant spaces around colons and brackets, and removes trailing semicolons. This process routinely reduces stylesheet file sizes by 20% to 30%.'
    },
    faqs: [
      {
        question: 'What is a render-blocking resource?',
        answer: 'When a browser encounters a `<link rel="stylesheet">` tag, it pauses building the visual page until it downloads and processes that file. Minifying CSS shrinks the file size, shortening this pause and fixing the "eliminate render-blocking resources" warning in Google PageSpeed Insights.'
      },
      {
        question: 'Does removing trailing semicolons break CSS?',
        answer: 'No. In CSS syntax, the semicolon acts as a separator between multiple rules. The very last rule inside a bracket block (e.g., `color: red}`) does not mathematically require a semicolon. Removing them safely saves bytes across thousands of classes.'
      },
      {
        question: 'Should I minify CSS during development or production?',
        answer: 'You should strictly keep your CSS unminified (formatted) during development so it remains readable for humans. You should only run your CSS through a minifier as the final step before deploying to a production server.'
      }
    ]
  },
  'js-minifier': {
    seo: {
      title: 'JavaScript Minifier — High-Performance JS Compression',
      description: 'Minify JavaScript code instantly to improve website performance. Remove comments and whitespace to compress your JS payloads for faster browser execution.',
      keywords: ['javascript minifier', 'js minifier', 'compress javascript online', 'minify js code', 'javascript optimizer'],
      tldr: 'Compress JavaScript payloads to accelerate browser execution and reduce network transfer time.',
      entity_definition: 'The JavaScript Minifier is a critical frontend optimization utility that shrinks the size of JS source code. Because JavaScript must be downloaded, parsed, compiled, and executed by the browser\'s V8 engine before a page becomes interactive, bloated JS files severely hurt the Interaction to Next Paint (INP) metric. This tool safely strips out single-line (`//`) and multi-line (`/* */`) comments, eliminates line breaks, and collapses spaces around operators, ensuring maximum execution speed without altering the underlying logic.'
    },
    faqs: [
      {
        question: 'Will minifying JavaScript break my code?',
        answer: 'Generally, no. However, if your original code relies heavily on Automatic Semicolon Insertion (ASI) instead of explicitly writing semicolons at the end of statements, collapsing line breaks can occasionally cause syntax errors. It is highly recommended to use explicit semicolons.'
      },
      {
        question: 'Is minification the same as obfuscation?',
        answer: 'No. Minification merely removes whitespace and comments to save space. Obfuscation intentionally scrambles variable and function names (e.g., changing `calculateTax()` to `a()`) to make the code impossible for humans to reverse-engineer.'
      },
      {
        question: 'How much faster will my website load?',
        answer: 'Depending on how heavily commented your source code is, minification typically reduces JS file sizes by 30% to 50%. This can shave hundreds of milliseconds off your initial page load over 3G/4G mobile networks.'
      }
    ]
  },
  'xml-minifier': {
    seo: {
      title: 'XML Minifier — Compress XML Data Files Instantly',
      description: 'Compress large XML files, SOAP payloads, and RSS feeds instantly. Reduce XML file sizes by stripping unnecessary indentation and block comments.',
      keywords: ['xml minifier', 'compress xml online', 'xml optimizer', 'minify xml payload', 'reduce xml size'],
      tldr: 'Optimize verbose XML architectures into compact, transmission-ready data strings.',
      entity_definition: 'The XML Minifier is a data optimization utility designed to shrink Extensible Markup Language documents. Because XML relies heavily on verbose open and close tags, documents naturally become massive and bandwidth-heavy. This tool processes the raw string to strip out block comments, remove all line breaks, and aggressively collapse whitespace between tags (`> <` becomes `><`), transforming highly readable, nested XML trees into a single, dense line optimized for rapid network transmission or database storage.'
    },
    faqs: [
      {
        question: 'Does this minifier validate my XML syntax first?',
        answer: 'Yes. Before attempting to minify the code, the tool securely processes the input through a client-side DOMParser. If you have unclosed tags or syntax errors, the tool will alert you and prevent the minification of corrupted data.'
      },
      {
        question: 'Will this affect XML attributes?',
        answer: 'No. The minifier only targets the empty space between tags and block comments. Spaces inside a tag (e.g., separating an attribute like `<item id="1">`) are mathematically preserved.'
      },
      {
        question: 'Why minify XML instead of just using JSON?',
        answer: 'While JSON is inherently lighter, many enterprise systems, SOAP APIs, RSS feeds, and legacy financial software strictly require XML inputs. Minifying ensures you meet those strict protocol requirements while still optimizing bandwidth.'
      }
    ]
  },
  'sql-minifier': {
    seo: {
      title: 'SQL Minifier — Optimize Database Queries Online',
      description: 'Minify SQL database queries instantly. Strip comments, line breaks, and unnecessary spaces to prepare clean SQL statements for application code injection.',
      keywords: ['sql minifier', 'compress sql query', 'sql optimizer online', 'minify sql code', 'format sql to one line'],
      tldr: 'Compress complex, multi-line SQL queries into a clean, single-line executable string.',
      entity_definition: 'The SQL Minifier is a database utility designed to prepare readable SQL queries for application integration. When Database Administrators construct complex JOIN operations or nested subqueries, they rely on heavy indentation and inline comments (`--` or `/* */`). However, when these queries are hardcoded into Python, Node.js, or PHP applications, multi-line strings can cause syntax issues and bloated string payloads. This tool safely strips out all comments and collapses the query into a single, continuous line without breaking operator logic.'
    },
    faqs: [
      {
        question: 'Does minifying SQL make the database execute it faster?',
        answer: 'No. The actual execution speed of the query on the database engine (like PostgreSQL or MySQL) is determined by its query planner and indexes. Minification only reduces the byte size of the string sent over the network to the database server.'
      },
      {
        question: 'Are single-line comments safely removed?',
        answer: 'Yes. Single-line comments (starting with `--`) are notoriously dangerous when converting SQL to a single line, as they will accidentally comment out the rest of the query. Our tool safely identifies and deletes them before collapsing the lines.'
      },
      {
        question: 'Does this tool work for NoSQL databases?',
        answer: 'No, this minifier is strictly calibrated for standard relational SQL syntax (MySQL, PostgreSQL, SQL Server). NoSQL databases typically use JSON or BSON formats, which should be compressed using our JSON Minifier instead.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 10');
