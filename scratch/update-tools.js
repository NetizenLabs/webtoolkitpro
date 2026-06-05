const fs = require('fs');
const yaml = require('js-yaml');

const updates = [
  {
    slug: 'js-minifier',
    how_it_works: "This utility uses an optimized browser-side tokenizer loop to parse incoming JavaScript source text. It strips single-line (`//`) and multi-line (`/* */`) comments, eliminates redundant carriage returns, line feeds, and structural whitespaces, and normalizes block spacings. The execution occurs strictly within local browser memory, outputting a single, continuous stream of execution-ready production code without any external API dependencies.",
    deep_dive_guide: "Minification is a fundamental step in modern frontend performance engineering, directly impacting your site's Core Web Vitals—specifically Time to Interactive (TTI) and Interaction to Next Paint (INP). By dropping unneeded characters, you decrease script payload weight, resulting in faster network transmission times and accelerated browser parsing speeds. Unlike obfuscation, this process keeps variable and function names intact unless advanced mangling options are toggled, ensuring functional stability while trimming every byte possible.",
    visible_faqs: [
      { question: "Will this minification process alter the runtime logic of my scripts?", answer: "No. The parsing engine is built to respect syntactical boundaries, string literals, and template strings. It safely removes cosmetic layout formatting without refactoring code structures, rewriting function scopes, or breaking variable references." },
      { question: "Is it safe to paste confidential or proprietary corporate scripts here?", answer: "Completely. Because WebToolkit Pro is a zero-knowledge, client-side ecosystem, your inputs are processed in-memory via local JavaScript. No data packets are transmitted to a backend web server or database, keeping your proprietary IP entirely private." }
    ]
  },
  {
    slug: 'regex-tester',
    how_it_works: "This utility compiles standard JavaScript regular expressions in real-time via the local browser runtime environment. It evaluates your user-supplied input text against your custom pattern modifiers (`g`, `i`, `m`, `s`, `u`, `y`) to locate matches instantly. Simultaneously, the engine tokenizes the structure of your expression, breaking down escape sequences, capture groups, lookarounds, and quantifiers into an explicit, sequential layout.",
    deep_dive_guide: "Regular expressions are powerful but notorious for introducing invisible runtime traps like catastrophic backtracking, which occurs when nested quantifiers cause an exponential evaluation path that freezes browser tabs. Using a visual, responsive tester allows you to safely construct complex regex constraints, evaluate boundary matches, and inspect capture group indexing side-by-side before committing patterns to production codebases.",
    visible_faqs: [
      { question: "What do the global (g) and multiline (m) flags change during validation testing?", answer: "The global flag (`g`) ensures the regex engine finds all matching occurrences across the string rather than stopping at the first instance. The multiline flag (`m`) alters line anchors (`^`) and (`$`) to match the beginning and end of individual lines within a text block, instead of treating the entire string as a single line." },
      { question: "Does this tester support regex syntaxes from alternative languages like PCRE (PHP) or Python?", answer: "This tool executes natively using the browser's JavaScript engine (ECMAScript RegExp rules). While the vast majority of core behaviors (literal characters, classes, and groups) align closely with PCRE and Python, minor language-specific anomalies—like specific lookbehind supports—may vary slightly." }
    ]
  },
  {
    slug: 'bulk-uuid-v4-v7-generator',
    how_it_works: "This tool leverages the browser's native cryptographically secure random number generator interface (`crypto.getRandomValues`). For standard UUID v4 strings, it constructs an array of 128 pseudo-random bits while strictly setting the mandatory 4-bit variant and version markers. For modern UUID v7 requests, the engine captures a precise Unix timestamp in milliseconds to seed the initial 48 bits, sequentially packing the remaining bits with cryptographically safe random values.",
    deep_dive_guide: "Choosing the correct unique identifier layout is vital for database scalability. Traditional UUID v4 identifiers are completely random, which destroys indexing efficiency inside relational databases like PostgreSQL or MySQL because random strings fracture B-Tree indexing nodes. UUID v7 solves this architecture bottleneck by introducing a time-ordered prefix. This ensures sequential sorting upon generation, drastically accelerating database inserts while preventing cluster fragmentation.",
    visible_faqs: [
      { question: "What is the practical collision risk when batch-generating UUID v4 strings?", answer: "The probability of a collision is mathematically infinitesimal. With a space of 122 random bits, you would need to generate billions of UUIDs every single second for hundreds of years to reach a fractional 1% probability of a duplication event." },
      { question: "Why is UUID v7 heavily preferred over v4 for primary keys in database tables?", answer: "Because UUID v7 is naturally time-ordered and sequential, new database records are always inserted at the logical end of the index tree. This prevents random write fragmentation across disk storage blocks, directly preserving query performance as table row counts scale." }
    ]
  },
  {
    slug: 'jwt-decoder-generator',
    how_it_works: "This decoder accepts structured JSON Web Tokens and splits them cleanly by their standard period delimiters into three distinct strings: the Header, the Payload, and the Signature. It then pipes these tokens into a browser-native Base64URL decoding loop, transforming the binary string back into readable JSON syntax blocks with automatic code formatting and token highlighting.",
    deep_dive_guide: "JSON Web Tokens are widely utilized for stateless session authentication across microservice meshes. However, developers frequently treat them as encrypted objects when they are merely encoded string payloads. Anyone who intercepts a JWT can read your claims array. This utility allows you to instantly inspect claims (like expiration dates (`exp`), issuers (`iss`), and subject attributes (`sub`)) locally without exposing internal authorization keys to the open internet.",
    visible_faqs: [
      { question: "Does decoding my JSON Web Token using this web utility validate its cryptographic signature?", answer: "No. This tool operates strictly as a local visual decoder to unpack header configurations and payload variables. Cryptographic signature validation requires processing the token strings against your private secret key or public RSA keys via your backend auth framework." },
      { question: "Is my authentication session payload exposed to any tracking scripts during the decoding process?", answer: "Never. The utility runs completely sandboxed within your browser window. No token contents are posted back to analytics servers, ensuring security metrics remain completely compliant with zero data storage traces." }
    ]
  },
  {
    slug: 'browser-compat-checker',
    how_it_works: "This tool checks properties and keywords against a localized array of data structures tracking global browser platform capabilities. When you search for a script method (e.g., `Object.fromEntries`) or a style property (e.g., `display: grid`), the engine parses the string and pulls up the exact minimum version support matrices across Chromium, WebKit, and Gecko engines.",
    deep_dive_guide: "Failing to verify API version baselines can lead to critical UI crashes or broken interactions on older mobile devices or long-term support browsers. Integrating a quick compatibility audit allows you to identify exactly where JavaScript polyfills are required, or when to implement safe fallback layouts in your style sheets using native `@supports` feature queries.",
    visible_faqs: [
      { question: "What should I do if a styling feature is marked as incompatible with legacy browser bases?", answer: "You should implement clean structural fallbacks using CSS feature queries (`@supports`). This allows you to apply modern styles to compatible environments while serving simpler, functional rules to older layouts without breaking page usability." },
      { question: "How often are the database support tables updated for new engine version rollouts?", answer: "The platform baseline maps to active monthly specifications. This ensures recent production releases across stable desktop and mobile browser branches are correctly tracked for deployment planning." }
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
        
        // Map the user's new schema structure exactly into our existing fields
        tool.content.how_it_works = update.how_it_works;
        tool.content.description = update.deep_dive_guide;
        tool.content.faq = update.visible_faqs;
        
        updatedCount++;
        console.log(`Updated: ${update.slug}`);
      } else {
        console.log(`Warning: Tool not found for slug ${update.slug}`);
      }
    });
    
    // Dump back to yaml
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
