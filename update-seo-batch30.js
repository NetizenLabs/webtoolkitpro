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
  'nginx-generator': {
    seo: {
      title: 'Nginx Configuration Generator — Server Block Maker',
      description: 'Generate secure, high-performance Nginx configuration files instantly. Easily configure server blocks, SSL/TLS, reverse proxies, and Gzip compression.',
      keywords: ['nginx configuration generator', 'nginx server block maker', 'generate nginx conf', 'nginx reverse proxy config', 'nginx ssl setup'],
      tldr: 'Generate optimized and secure Nginx server block configurations instantly.',
      entity_definition: 'The Nginx Configuration Generator is a DevOps infrastructure utility. Nginx is a high-performance web server and reverse proxy, but its `.conf` syntax can be notoriously unforgiving. This tool provides a visual interface to define server blocks (virtual hosts), configure SSL/TLS certificates (Let\'s Encrypt), set up reverse proxies for Node.js or Python apps, and enforce modern security headers, outputting production-ready Nginx directives.'
    },
    faqs: [
      {
        question: 'What is an Nginx Server Block?',
        answer: 'A Server Block (often called a Virtual Host in Apache) is a configuration directive that tells Nginx how to route traffic for a specific domain name (e.g., example.com) to a specific directory on your server.'
      },
      {
        question: 'How do I enable HTTPS?',
        answer: 'You must specify the path to your SSL certificate and private key (usually provided by Let\'s Encrypt) within the server block, and configure Nginx to listen on port 443.'
      },
      {
        question: 'What is a Reverse Proxy?',
        answer: 'A reverse proxy accepts incoming web traffic (on port 80/443) and forwards it to a backend application running on a different port (like a Node.js app on port 3000), protecting the backend from direct exposure.'
      }
    ]
  },
  'htaccess-generator': {
    seo: {
      title: 'Apache .htaccess Generator — URL Rewrite Rules',
      description: 'Generate Apache .htaccess files for URL rewriting, 301 redirects, and password protection. Secure your directories and force HTTPS effortlessly.',
      keywords: ['htaccess generator', 'apache htaccess maker', 'generate 301 redirects htaccess', 'force https htaccess', 'htaccess rewrite rules'],
      tldr: 'Generate complex Apache `.htaccess` directives for URL routing and folder security.',
      entity_definition: 'The Apache .htaccess Generator is a web server configuration utility. The `.htaccess` file is a powerful, directory-level configuration file used by Apache web servers to alter settings without requiring root server access. This tool visually constructs the complex RegEx-based `mod_rewrite` rules needed to enforce 301 redirects, force HTTPS connections, strip "www" from domains, and password-protect sensitive directories (using `htpasswd`).'
    },
    faqs: [
      {
        question: 'What does mod_rewrite do?',
        answer: '`mod_rewrite` is an Apache module that uses regular expressions to rewrite requested URLs on the fly. It is commonly used to create clean, SEO-friendly URLs (e.g., rewriting `/about.php` to `/about`).'
      },
      {
        question: 'How do I force HTTPS?',
        answer: 'You must add a `RewriteRule` that checks if the incoming connection is on port 80 (HTTP) and issues a 301 Permanent Redirect to the equivalent `https://` URL.'
      },
      {
        question: 'Does Nginx use .htaccess?',
        answer: 'No. `.htaccess` is exclusive to the Apache web server (and Litespeed). Nginx intentionally does not support directory-level configuration files for performance reasons.'
      }
    ]
  },
  'subnet-calculator': {
    seo: {
      title: 'IPv4 Subnet Calculator — CIDR Network Blocks',
      description: 'Calculate IPv4 subnets, CIDR blocks, network masks, and broadcast addresses instantly. Essential for network engineers configuring VPCs and routing tables.',
      keywords: ['ipv4 subnet calculator', 'cidr calculator', 'calculate network mask', 'ip range calculator', 'vpc subnet planner'],
      tldr: 'Calculate IPv4 network ranges, broadcast addresses, and subnet masks using CIDR notation.',
      entity_definition: 'The IPv4 Subnet Calculator is a network engineering utility. Internet Protocol (IP) addresses are divided into smaller, manageable "subnets" using Classless Inter-Domain Routing (CIDR) notation (e.g., `/24`). This tool takes an IP address and a CIDR prefix, mathematically calculating the corresponding Subnet Mask, Network Address, Broadcast Address, and the total number of usable host IPs available within that specific network block.'
    },
    faqs: [
      {
        question: 'What does /24 mean?',
        answer: 'The `/24` is CIDR notation indicating that the first 24 bits of the IP address are locked as the "network" identifier, leaving the remaining 8 bits (out of 32) available for individual devices (up to 254 usable IPs).'
      },
      {
        question: 'What is a Broadcast Address?',
        answer: 'It is the very last IP address in a subnet range. It is reserved for sending a single packet of data to every single device on that specific network simultaneously.'
      },
      {
        question: 'Why are the first and last IPs unusable?',
        answer: 'In any subnet, the very first IP is strictly reserved to identify the network itself (Network Address), and the last IP is reserved for the Broadcast Address, meaning they cannot be assigned to individual computers or servers.'
      }
    ]
  },
  'cron-generator': {
    seo: {
      title: 'Cron Job Generator — Create Crontab Schedules',
      description: 'Generate complex Cron schedules using a visual UI. Create precise 5-part crontab expressions for Linux server automation, backups, and scheduled tasks.',
      keywords: ['cron job generator', 'crontab generator', 'create cron expression', 'linux cron scheduler', 'visual cron builder'],
      tldr: 'Visually construct exact 5-part Cron expressions for Linux server automation.',
      entity_definition: 'The Cron Job Generator is a Linux automation utility. The `cron` daemon executes background scripts on Unix-like servers based on a cryptic 5-part syntax (Minute, Hour, Day, Month, Day-of-Week). This tool provides an intuitive visual interface—allowing users to select specific days, intervals, or hours—and compiles those selections into a mathematically perfect `* * * * *` string, eliminating the risk of catastrophic scheduling errors in production environments.'
    },
    faqs: [
      {
        question: 'What do the 5 asterisks mean?',
        answer: 'They represent (from left to right): Minute (0-59), Hour (0-23), Day of the Month (1-31), Month (1-12), and Day of the Week (0-6, where 0 is Sunday). An asterisk means "every".'
      },
      {
        question: 'How do I run a job every 5 minutes?',
        answer: 'You use the step operator (a forward slash). Setting the minute field to `*/5` tells the cron daemon to execute the task every time the minute is divisible by 5.'
      },
      {
        question: 'What is a Crontab?',
        answer: 'A Crontab (Cron Table) is the configuration file where Linux stores your individual cron expressions and the corresponding terminal commands you want them to execute.'
      }
    ]
  },
  'regex-tester': {
    seo: {
      title: 'Regex Tester & Matcher — Test Regular Expressions',
      description: 'Test, debug, and execute Regular Expressions (Regex) against your own text in real-time. Identify capture groups, matches, and flags instantly.',
      keywords: ['regex tester', 'test regular expression', 'regex matcher online', 'debug regex groups', 'javascript regex tester'],
      tldr: 'Test and debug your Regular Expressions against custom text in real-time.',
      entity_definition: 'The Regex Tester is a software development and debugging utility. Regular Expressions (Regex) are notoriously difficult to write without trial and error. This tool provides an interactive environment where developers can input a RegEx pattern (including flags like `g` for global or `i` for case-insensitive) and paste a block of test text. The engine executes the pattern in real-time, visually highlighting matches and extracting specific capture groups for immediate validation.'
    },
    faqs: [
      {
        question: 'What does the "g" flag do?',
        answer: 'The `g` (global) flag tells the regex engine to find ALL matches in the text. Without it, the engine stops searching as soon as it finds the very first match.'
      },
      {
        question: 'What is a Capture Group?',
        answer: 'A capture group (created by wrapping a pattern in parentheses `()`) isolates a specific part of the match. For example, matching an email but exclusively "capturing" the domain name for later use in your code.'
      },
      {
        question: 'Is Regex the same in all languages?',
        answer: 'Mostly, but not exactly. There are different "flavors" of Regex (like PCRE for PHP, or the V8 engine for JavaScript). While the basics are universal, advanced features like "lookbehinds" may differ.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 30');
