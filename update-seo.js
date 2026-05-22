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
  'json-formatter': {
    seo: {
      title: 'Free Online JSON Formatter & Validator — Secure JSON Beautifier',
      description: 'Instantly format, beautify, and validate massive JSON datasets locally in your browser. Our ultra-fast JSON formatter uses Web Workers to process huge payloads securely.',
      keywords: ['json formatter', 'json beautifier', 'json validator online', 'format json locally', 'fix json errors', 'json syntax checker'],
      tldr: 'Instantly beautify or minify JSON with real-time AST validation—no data ever leaves your browser.',
      entity_definition: 'The WebToolkit Pro JSON Formatter and Validator is a professional-grade parsing utility designed for software engineers dealing with large, complex JSON payloads. Unlike legacy formatters that crash the browser UI when handling megabytes of text, our tool utilizes a dedicated Web Worker Pipeline to offload the Abstract Syntax Tree (AST) parsing. This ensures your browser remains perfectly fluid. Furthermore, the entire engine operates entirely on the client-side within an isolated sandbox. Your sensitive data is never transmitted across a network, guaranteeing 100% data privacy and compliance with strict enterprise data-handling policies.'
    },
    faqs: [
      {
        question: 'Why is my JSON failing validation?',
        answer: 'Common JSON syntax errors include missing quotation marks around keys, trailing commas after the last element in an array or object, and unescaped special characters. Our validator highlights the exact location of the parsing failure so you can fix it immediately.'
      },
      {
        question: 'Can this tool format large JSON files?',
        answer: 'Yes. Our formatter leverages a background Web Worker thread, allowing it to process massive JSON files (up to several megabytes) without freezing or lagging your main browser window.'
      },
      {
        question: 'Is my sensitive JSON data sent to a server?',
        answer: 'Absolutely not. This tool is built with a Privacy-First architecture. The parsing and formatting logic executes entirely within your browser\'s local JavaScript engine. We do not store, log, or transmit your data.'
      }
    ]
  },
  'password-generator': {
    seo: {
      title: 'Secure Password Generator — High Entropy Crypto Random Passwords',
      description: 'Generate highly secure, cryptographically random passwords instantly. Features Web Crypto API integration for enterprise-grade entropy and offline privacy.',
      keywords: ['secure password generator', 'random password creator', 'cryptographically secure passwords', 'high entropy password generator', 'offline password generator'],
      tldr: 'Generate uncrackable, cryptographically secure passwords instantly using hardware-backed browser APIs.',
      entity_definition: 'The WebToolkit Pro Secure Password Generator is an enterprise-grade credential creation utility. While many online password generators rely on the mathematically predictable Math.random() function, our tool natively hooks into the Web Crypto API (window.crypto.getRandomValues). This taps directly into your device\'s hardware-backed entropy source to produce truly unpredictable cryptographic strings. Because the generation occurs strictly within your browser\'s volatile memory, there is zero risk of your newly minted credentials being intercepted over a network.'
    },
    faqs: [
      {
        question: 'What makes a password cryptographically secure?',
        answer: 'A password is cryptographically secure when it is generated using a high-entropy random number generator (like the Web Crypto API) rather than a pseudo-random number generator. This ensures the output sequence is mathematically unpredictable and resilient against algorithmic guessing.'
      },
      {
        question: 'Should I include special characters in my password?',
        answer: 'Yes. Including a mix of uppercase letters, lowercase letters, numbers, and special symbols dramatically increases the entropy (complexity) of your password, exponentially increasing the time it would take a brute-force attack to crack it.'
      },
      {
        question: 'Does this tool save the passwords I generate?',
        answer: 'No. The generation happens entirely client-side, offline in your browser. Once you close the tab, the password is gone from memory forever.'
      }
    ]
  },
  'what-is-my-ip': {
    seo: {
      title: 'What is My IP Address? — Free Public IPv4 & IPv6 Lookup',
      description: 'Instantly check your public IP address, ISP, and geographic location. Analyze your network headers and verify if you are browsing via IPv4 or IPv6.',
      keywords: ['what is my ip address', 'check public ip', 'find my ip address location', 'ipv4 ipv6 lookup', 'detect vpn ip'],
      tldr: 'Instantly detect your public IP, geographic location, and network protocol (IPv4/IPv6).',
      entity_definition: 'The WebToolkit Pro IP Lookup utility connects directly to our serverless edge network to instantly reflect your true public IP address. Every device connected to the internet is assigned a unique IP address by its Internet Service Provider (ISP). By bouncing a request off our secure edge nodes, we can identify exactly how your traffic is routed—revealing your IPv4/IPv6 address, estimated geographic location, and the specific connection protocols (like HTTP/3) your browser is leveraging. This is an essential diagnostic tool for verifying VPN leaks or auditing network configurations.'
    },
    faqs: [
      {
        question: 'What is the difference between IPv4 and IPv6?',
        answer: 'IPv4 uses a 32-bit address format (e.g., 192.168.1.1), which limits the total number of unique addresses. IPv6 was introduced to solve this exhaustion by using a 128-bit format, allowing for a virtually infinite number of unique internet addresses.'
      },
      {
        question: 'Can someone find my exact home address from my IP?',
        answer: 'No. Public IP addresses typically only resolve to a general geographic area, such as your city or the location of your ISP\'s regional data center. They do not reveal your street address.'
      },
      {
        question: 'Why does my IP address keep changing?',
        answer: 'Most residential Internet Service Providers (ISPs) assign Dynamic IP addresses, which periodically cycle and change to conserve their pool of available addresses. If you need a permanent IP, you must request a Static IP from your ISP.'
      }
    ]
  },
  'js-minifier': {
    seo: {
      title: 'JavaScript Minifier — Free JS Code Compressor for Fast SEO',
      description: 'Compress and minify your JavaScript code online for free. Remove whitespace, comments, and optimize your scripts for faster page loads and better Core Web Vitals.',
      keywords: ['javascript minifier', 'compress js online', 'js optimizer', 'minify javascript code', 'reduce js file size'],
      tldr: 'Instantly compress your JavaScript files to accelerate page load speeds and optimize Core Web Vitals.',
      entity_definition: 'The WebToolkit Pro JavaScript Minifier is a frontend optimization utility that strips unnecessary characters from your source code without altering its functionality. By utilizing advanced Regular Expressions, the tool rapidly removes all whitespace, line breaks, and developer comments. Minification is a critical step in modern web development; it significantly reduces the payload size of your assets, leading to faster download times, quicker script execution, and vastly improved Core Web Vitals (specifically Largest Contentful Paint and Interaction to Next Paint).'
    },
    faqs: [
      {
        question: 'Why is minifying JavaScript important?',
        answer: 'Minification removes comments, whitespace, and line breaks from your code. This shrinks the file size, allowing browsers to download, parse, and execute your scripts much faster, which directly improves SEO and user experience.'
      },
      {
        question: 'Is minification the same as obfuscation?',
        answer: 'No. Minification purely optimizes file size for performance while retaining exact variable names and structure. Obfuscation deliberately scrambles variable names and logic to make the code difficult for humans to read and reverse-engineer.'
      },
      {
        question: 'Does this minifier break my code?',
        answer: 'Our minifier uses safe, standard Regex compression techniques. However, if your original JavaScript relies on implicit semicolons (Automatic Semicolon Insertion) rather than explicit ones, minification can occasionally cause syntax errors. Always test your compressed code.'
      }
    ]
  },
  'meta-tag-generator': {
    seo: {
      title: 'SEO Meta Tag Generator — Create Open Graph & Twitter Tags',
      description: 'Generate perfectly formatted HTML meta tags, Open Graph (OG) properties, and Twitter Cards to maximize your website\'s SEO and social media visibility.',
      keywords: ['seo meta tag generator', 'open graph generator', 'twitter card generator', 'html meta tags creator', 'social media tag optimizer'],
      tldr: 'Easily generate and preview HTML meta tags, Open Graph, and Twitter Cards for ultimate search engine visibility.',
      entity_definition: 'The WebToolkit Pro Meta Tag Generator is a comprehensive technical SEO utility designed to construct standard HTML headers that control how search engines and social networks index and display your website. By inputting your page\'s metadata, the tool instantly engineers valid <meta> blocks including primary SEO titles, descriptions, Facebook Open Graph (og:type) properties, and Twitter Card declarations. Utilizing accurate, well-formed meta tags is foundational for driving high Click-Through Rates (CTR) in the SERPs and ensuring beautiful, rich-link previews when your URL is shared on social media platforms.'
    },
    faqs: [
      {
        question: 'What are Open Graph (OG) tags?',
        answer: 'Open Graph tags are specialized metadata snippets originally created by Facebook. They dictate exactly what title, description, and image should be displayed when a user shares your webpage link on social media platforms like Facebook, LinkedIn, and Discord.'
      },
      {
        question: 'Does Google still use the keywords meta tag?',
        answer: 'No. Google officially deprecated the use of the <meta name="keywords"> tag for ranking purposes over a decade ago. However, some smaller, niche search engines and internal site search tools may still reference it.'
      },
      {
        question: 'How long should my meta description be?',
        answer: 'For optimal SEO, your meta description should be between 150 to 160 characters. Anything longer runs the risk of being truncated (cut off with ellipses) in Google\'s Search Engine Results Pages (SERPs).'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml');
