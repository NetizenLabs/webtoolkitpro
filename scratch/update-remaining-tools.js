const fs = require('fs');
const yaml = require('js-yaml');

const updates = [
  {
    slug: 'compliance-audit-logger',
    how_it_works: "This utility leverages the browser's local File API and memory buffering to construct immutable audit logs. It securely ingests JSON or CSV event arrays, automatically applying cryptographic timestamping and SHA-256 hashing to each row to ensure data integrity. The compiled ledger is then formatted according to strict SOC2 and HIPAA logging standards and exported directly back to your local filesystem.",
    deep_dive_guide: "Engineering compliance is a critical requirement for enterprise software, where tracking 'who did what, and when' is mandatory. Constructing audit trails client-side prevents sensitive internal operations from being leaked to third-party logging APIs. By formatting and validating event ledgers offline, you guarantee that PII (Personally Identifiable Information) and PHI (Protected Health Information) remain strictly within your local environment while still producing auditor-ready documentation.",
    visible_faqs: [
      { question: "Does this logger meet strict SOC2 compliance standards?", answer: "Yes, the generated output enforces immutable timestamps, user attribution fields, and cryptographic row-hashing, which are the fundamental structural requirements for SOC2 and ISO 27001 audit trails." },
      { question: "Are my internal compliance records transmitted to any analytics services?", answer: "No. The WebToolkit Pro architecture runs completely offline within your browser tab. Your data is processed entirely in local memory, guaranteeing absolute privacy for sensitive compliance records." }
    ]
  },
  {
    slug: 'git-helper',
    how_it_works: "This interactive interface maps complex Git operations to plain-text intent. It parses your desired action—such as resetting a branch, squashing commits, or rewriting history—and dynamically compiles the exact sequence of Git shell commands required. The system accounts for edge cases, appending necessary flags (like `--force-with-lease`) and outputting a copy-ready terminal snippet.",
    deep_dive_guide: "Version control mistakes can severely impact engineering velocity, especially when rewriting shared repository history. While basic commands like `git push` are simple, resolving detached HEAD states, executing interactive rebases (`git rebase -i`), or purging sensitive files from history using `git filter-repo` require precise syntax. This helper prevents catastrophic data loss by generating safe, validated command chains that protect branch integrity.",
    visible_faqs: [
      { question: "Is it safe to use `--force` when pushing a squashed commit to a remote branch?", answer: "It is highly recommended to use `--force-with-lease` instead of standard `--force`. This specialized flag ensures you do not accidentally overwrite commits pushed by your teammates while you were resolving your local rebase." },
      { question: "Can this tool help me recover a deleted branch?", answer: "Yes. The helper provides the exact `git reflog` commands necessary to locate your lost commit hash, followed by the specific `git checkout -b` sequence required to completely restore the deleted branch." }
    ]
  },
  {
    slug: 'xml-formatter',
    how_it_works: "The XML Formatter utilizes a native DOMParser API available in modern web browsers to safely tokenize unformatted XML or SVG strings. It systematically traverses the node tree, calculating hierarchical depth, and injects precise indentation (spaces or tabs) before re-serializing the nodes. It also auto-closes dangling tags and escapes invalid ampersands without executing inline scripts.",
    deep_dive_guide: "Extensible Markup Language (XML) remains the backbone of enterprise data exchange, SOAP APIs, and configuration files. However, machine-generated XML is typically delivered as a single, dense block of text to save bandwidth, making it completely unreadable for human engineers. By running a local XML formatter, developers can rapidly debug nested SOAP envelopes or complex SVG paths locally without risking the exposure of proprietary data payloads to online server-based formatters.",
    visible_faqs: [
      { question: "Will the formatter fix syntax errors in corrupted XML payloads?", answer: "The parser attempts to auto-correct minor structural issues like unclosed trailing tags or missing quotes. However, heavily corrupted XML trees will fail the DOMParser validation, and the tool will highlight the exact line and column where the parsing failure occurred." },
      { question: "Can I use this to beautify complex SVG vector images?", answer: "Absolutely. SVG is fundamentally an XML-based markup language. Dropping minified SVG code into this utility will neatly format the `<path>`, `<rect>`, and `<circle>` elements for easy manual editing." }
    ]
  },
  {
    slug: 'subnet-calculator',
    how_it_works: "This calculator performs bitwise operations directly within JavaScript to resolve IPv4 subnets. When provided with an IP address and a CIDR suffix (e.g., /24), it calculates the 32-bit binary representation of the network mask. It then applies logical AND/OR operations to determine the exact Network ID, Broadcast Address, total usable host range, and wildcard mask in milliseconds.",
    deep_dive_guide: "Network architecture requires absolute precision when partitioning IP spaces to prevent route overlapping and broadcast storms. Using bitwise IP calculation allows network engineers to accurately slice a massive Class A network down into strict, micro-segmented VPCs (Virtual Private Clouds) for AWS or Azure deployments. Correctly calculating the usable host range prevents the fatal error of assigning restricted network or broadcast IPs to physical servers.",
    visible_faqs: [
      { question: "What is the difference between total IP addresses and usable host addresses?", answer: "Every subnet reserves exactly two addresses: the very first address (Network ID) used for routing, and the very last address (Broadcast) used to send messages to all nodes. Therefore, a /24 network has 256 total IPs, but only 254 usable hosts." },
      { question: "Does this utility support IPv6 CIDR calculations?", answer: "Currently, this specific tool is hyper-optimized for IPv4 bitwise mathematics and legacy Class A/B/C routing. A dedicated, 128-bit IPv6 hexadecimal subnetting tool is required for modern IPv6 addressing." }
    ]
  },
  {
    slug: 'html-to-markdown',
    how_it_works: "This conversion utility leverages a recursive node-walking algorithm to translate complex HTML DOM trees into clean Markdown syntax. It strips out inline CSS styles, normalizes heading tags (H1-H6) into hash prefixes, converts `<ul>`/`<ol>` lists into dashed arrays, and replaces anchor tags `<a>` with standard `[text](url)` bracket formatting, entirely within the client runtime.",
    deep_dive_guide: "Markdown has become the universal standard for technical documentation, GitHub Readmes, and static site generators (like Next.js and Hugo). However, migrating legacy documentation or scraping web content usually leaves developers dealing with bloated, unreadable HTML. A robust HTML-to-Markdown converter allows engineers to instantly sanitize rich text, stripping away heavy HTML markup while preserving the core semantic structure necessary for documentation platforms.",
    visible_faqs: [
      { question: "How does the converter handle complex HTML tables?", answer: "The parser attempts to map `<table>`, `<tr>`, and `<td>` tags into standard GitHub-Flavored Markdown (GFM) pipe-delimited tables. Highly complex tables with merged cells (`colspan` or `rowspan`) may gracefully degrade to standard HTML blocks, as Markdown does not natively support merged cells." },
      { question: "Are my `<iframe>` embeds or JavaScript snippets preserved?", answer: "For security and formatting purity, inline JavaScript `<script>` tags are aggressively purged. `<iframe>` embeds (like YouTube videos) are generally kept as raw HTML blocks since standard Markdown does not have an equivalent syntax for video embedding." }
    ]
  },
  {
    slug: 'code-diff',
    how_it_works: "The Visual Diff Checker implements the Myers diff algorithm directly in the browser's JavaScript engine. It breaks down the 'Original' and 'Modified' text blocks into character-level or line-level arrays. By calculating the Shortest Edit Script (SES), it maps exact insertions, deletions, and unchanged segments, rendering them in a side-by-side or unified GitHub-style color-coded interface.",
    deep_dive_guide: "Reviewing code changes manually is highly error-prone and inefficient. The Myers diff algorithm—the same mathematical foundation used natively by Git—allows developers to spot microscopic changes in vast configuration files, such as a single misplaced comma in a 5,000-line JSON payload. By providing a client-side visual representation of diffs, engineers can securely compare proprietary API keys, secrets, or unreleased source code without pushing them to external version control systems.",
    visible_faqs: [
      { question: "Is my proprietary source code sent to a server to compute the diff?", answer: "No. The entire Myers diff algorithm runs locally via Web Workers inside your browser. No strings, configuration files, or proprietary logic are ever transmitted across the network." },
      { question: "Can I switch between side-by-side and inline unified views?", answer: "Yes, the interface supports both viewing modes. Side-by-side is generally preferred for desktop displays to compare massive files, while the unified view mimics standard terminal Git diffs and is highly optimized for mobile screens." }
    ]
  },
  {
    slug: 'html-entities',
    how_it_works: "This utility utilizes the browser's native DOM interface (`document.createElement`) to safely parse and decode complex HTML entities. For encoding, it maps vulnerable structural characters (like `<`, `>`, `&`, `\"`, and `'`) into their corresponding safe HTML entities (e.g., `&lt;`). This process ensures that executable script tags are transformed into harmless printable characters.",
    deep_dive_guide: "Cross-Site Scripting (XSS) remains one of the most critical security vulnerabilities in modern web applications. If an application reflects un-encoded user input directly into the HTML DOM, attackers can inject malicious JavaScript. Strict HTML entity encoding sanitizes these inputs by neutralizing execution contexts. This tool allows security engineers and developers to instantly verify how their application's WAF (Web Application Firewall) or sanitization logic should encode dangerous payloads.",
    visible_faqs: [
      { question: "Does encoding protect against all forms of Cross-Site Scripting (XSS)?", answer: "HTML Entity encoding protects against standard reflected and stored XSS when data is inserted directly into HTML body contexts. However, if data is inserted into JavaScript variables, CSS styles, or URL attributes, you must use specialized encoding (like URL Encoding or JS Escaping) to guarantee safety." },
      { question: "What is the difference between named entities and numeric entities?", answer: "Named entities use readable text (like `&copy;` for the copyright symbol), while numeric entities use the exact Unicode decimal or hex value (like `&#169;`). Modern browsers seamlessly parse both formats perfectly." }
    ]
  },
  {
    slug: 'storage-auditor',
    how_it_works: "The auditor executes a sandbox script to iterate through the `window.localStorage` and `window.sessionStorage` APIs. It tallies the total byte size of all stored key-value pairs, parses any stringified JSON objects into an interactive tree, and identifies bloated storage keys. It then calculates the remaining storage quota available within the browser's 5MB origin limit.",
    deep_dive_guide: "Modern Single Page Applications (SPAs) heavily abuse LocalStorage to cache API responses, JWT tokens, and user preferences. Because LocalStorage is strictly synchronous, reading or writing massive string payloads blocks the main JavaScript thread, directly destroying Interaction to Next Paint (INP) scores. A dedicated storage auditor allows frontend engineers to identify and purge zombie data, optimize caching layers, and migrate heavy binary data to the asynchronous IndexedDB API.",
    visible_faqs: [
      { question: "Why is LocalStorage considered bad for application performance?", answer: "LocalStorage operates synchronously on the main thread. If you attempt to stringify and save a massive 2MB JSON object, the entire browser tab will visually freeze until the disk-write completes, leading to horrible user experiences." },
      { question: "Is it safe to store authentication tokens (JWT) in LocalStorage?", answer: "It is highly discouraged. LocalStorage is fully accessible via JavaScript, making your tokens vulnerable to Cross-Site Scripting (XSS) attacks. For maximum security, JWTs should be stored in HTTP-Only, secure cookies." }
    ]
  },
  {
    slug: 'ascii-art',
    how_it_works: "This generator utilizes a classic FIGlet port running completely within the client browser. It takes your standard string input and iterates through a massive embedded font dictionary (mapping standard characters to pre-defined multi-line ASCII arrays). The engine dynamically adjusts character kerning and spacing to render the complex typographical banner into a `<pre>` formatted block.",
    deep_dive_guide: "ASCII art banners are a staple of professional software engineering, universally utilized inside CLI tools, server Message of the Day (MOTD) files, and complex API console outputs to establish brand identity. By embedding customized ASCII logos into application launch sequences, DevOps engineers and open-source maintainers provide clear, highly-visible visual markers that confirm successful software initialization inside dense, unformatted terminal logs.",
    visible_faqs: [
      { question: "Why does the ASCII text look distorted when I copy it into my code editor?", answer: "ASCII art relies entirely on monospaced (fixed-width) fonts. If your text editor or terminal is configured to use a proportional font (like Arial or Times New Roman), the character spacing will collapse. Ensure your editor uses fonts like Fira Code or Consolas." },
      { question: "Can I use these ASCII banners in commercial software projects?", answer: "Yes! The standard FIGlet fonts utilized by this generator are released under open-source licenses, allowing you to freely embed the generated banners into your commercial scripts, CLI applications, or server outputs." }
    ]
  },
  {
    slug: 'html-table-to-json',
    how_it_works: "This extractor parses raw HTML table structures using the browser's native DOM interface. It locates the `<th>` headers to establish JSON object keys, then iterates through every `<tr>` and `<td>` element. It cleanly extracts the inner text, strips out heavy CSS styling and inline tags, and packages the entire dataset into a neatly formatted, minified or beautifully indented JSON array.",
    deep_dive_guide: "Data scraping and migration often forces engineers to extract critical datasets trapped within legacy HTML tables on ancient web portals. Manually converting thousands of HTML rows into an API-ready data format is impossible. This utility acts as a local data-mining engine, allowing engineers to instantly rip data from raw HTML code blocks and transform it into an array of strictly typed JSON objects ready for database insertion or REST API payload delivery.",
    visible_faqs: [
      { question: "Will the tool automatically convert numeric strings into actual JSON numbers?", answer: "By default, HTML extraction treats all `<td>` contents as strings to prevent precision loss. However, you can configure the extractor's parsing engine to automatically detect and typecast valid numeric strings into integers or floats within the output JSON." },
      { question: "How does it handle nested tables or complex `rowspan` merges?", answer: "Nested tables are stripped to their core text to avoid breaking the JSON schema. Tables utilizing complex `rowspan` or `colspan` architectures may require manual data-cleaning post-extraction, as standard JSON arrays strictly require uniform 1:1 key-value mapping per row." }
    ]
  }
];

try {
  const filePath = 'config/tools.yaml';
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(fileContents);
  
  if (data && data.tools) {
    let updatedCount = 0;
    updates.forEach(update => {
      const tool = data.tools.find(t => t.slug === update.slug);
      if (tool) {
        if (!tool.content) tool.content = {};
        
        tool.content.how_it_works = update.how_it_works;
        tool.content.description = update.deep_dive_guide;
        tool.content.faq = update.visible_faqs;
        
        updatedCount++;
        console.log(`Updated: ${update.slug}`);
      } else {
        console.log(`Warning: Tool not found for slug ${update.slug}`);
      }
    });
    
    const newYaml = yaml.dump(data, {
      lineWidth: -1, 
      noRefs: true,
      quotingType: '"'
    });
    
    fs.writeFileSync(filePath, newYaml, 'utf8');
    console.log(`Successfully updated ${updatedCount} tools in tools.yaml`);
  }
} catch (e) {
  console.error(e);
}
