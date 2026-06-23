const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'twitter-card-gen': {
    practical_application: "Twitter (X) Cards generate rich media previews that drastically increase engagement compared to standard text links. By defining 'summary_large_image', you force the platform to render a massive, clickable hero image, turning a simple URL share into a high-converting billboard on the user's timeline.",
    code_blueprints: [
      {
        language: "html",
        title: "Twitter Card Meta Tags",
        code: "<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:site\" content=\"@wtkpro\">\n<meta name=\"twitter:title\" content=\"WebToolkit Pro\">\n<meta name=\"twitter:description\" content=\"Advanced developer utilities.\">\n<meta name=\"twitter:image\" content=\"https://wtkpro.site/twitter-hero.png\">"
      }
    ]
  },
  'slug-optimizer': {
    practical_application: "An optimized URL slug is concise, descriptive, and stripped of 'stop words' (and, the, of). Search engines weigh keywords found in the URL heavily. For example, `/how-to-build-a-fast-website-in-react` is diluted and overly long; `/fast-react-website` is highly optimized for semantic indexing.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Stop Word Removal Script",
        code: "const stopWords = ['a', 'an', 'and', 'the', 'is', 'in', 'it', 'of', 'to'];\nfunction optimizeSlug(title) {\n  return title.toLowerCase()\n    .split(' ')\n    .filter(word => !stopWords.includes(word))\n    .join('-');\n}"
      }
    ]
  },
  'keyword-density': {
    practical_application: "Keyword density analysis prevents 'Keyword Stuffing', an outdated black-hat SEO tactic that triggers severe Google algorithmic penalties (Panda Update). Modern SEO requires maintaining a natural TF-IDF (Term Frequency-Inverse Document Frequency) ratio, ensuring primary keywords sit between 1% and 3% density while utilizing LSI (Latent Semantic Indexing) synonyms.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Density Calculation Logic",
        code: "function calculateDensity(text, keyword) {\n  const words = text.split(/\\s+/);\n  const keywordOccurrences = words.filter(w => w.toLowerCase() === keyword.toLowerCase()).length;\n  const percentage = (keywordOccurrences / words.length) * 100;\n  return `${percentage.toFixed(2)}%`;\n}"
      }
    ]
  },
  'nginx-generator': {
    practical_application: "NGINX is the industry standard high-performance reverse proxy and web server. Manually writing `nginx.conf` files is highly error-prone and can lead to open directories or weak SSL configurations. Generating strict server blocks ensures proper HTTP/2 support, Gzip compression, and secure reverse-proxying to internal Node.js/Python applications.",
    code_blueprints: [
      {
        language: "nginx",
        title: "Node.js Reverse Proxy Config",
        code: "server {\n    listen 80;\n    server_name api.wtkpro.site;\n    \n    location / {\n        proxy_pass http://localhost:3000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }\n}"
      }
    ]
  },
  'htaccess-generator': {
    practical_application: "The `.htaccess` file provides directory-level configuration for Apache web servers. It is essential for enforcing HTTPS redirects, preventing hotlinking of server assets, and setting browser caching headers without needing root access to the main `httpd.conf` server configuration.",
    code_blueprints: [
      {
        language: "apache",
        title: "Force HTTPS Redirect",
        code: "RewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]"
      }
    ]
  },
  'subnet-calculator': {
    practical_application: "Subnetting divides a massive IP network into smaller, secure, and manageable logical networks. Cloud architects rely on CIDR (Classless Inter-Domain Routing) notation when designing AWS VPCs (Virtual Private Clouds) to ensure public-facing subnets are strictly isolated from private database subnets.",
    code_blueprints: [
      {
        language: "yaml",
        title: "AWS VPC Terraform Config",
        code: "resource \"aws_subnet\" \"private_db\" {\n  vpc_id     = aws_vpc.main.id\n  cidr_block = \"10.0.1.0/24\" # 256 IPs\n  tags = { Name = \"Database Subnet\" }\n}"
      }
    ]
  },
  'port-scanner': {
    practical_application: "Port scanning identifies open network doors on a server. System administrators and penetration testers use tools like Nmap to verify that only essential ports (e.g., 443 for HTTPS, 22 for SSH) are exposed to the public internet, ensuring databases (like Redis on 6379) remain tightly locked behind corporate firewalls.",
    code_blueprints: [
      {
        language: "bash",
        title: "Nmap Security Scan",
        code: "# Scan common ports to verify firewall integrity\nnmap -F wtkpro.site\n\n# Deep scan on a specific port\nnmap -p 3306 wtkpro.site"
      }
    ]
  },
  'js-obfuscator': {
    practical_application: "JavaScript cannot be truly encrypted because the browser must read it to execute it. However, obfuscation transforms readable code into a highly complex, unreadable matrix of arbitrary variables and anti-debugging traps. This is heavily utilized in anti-cheat systems, DRM video players, and proprietary enterprise algorithms.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Obfuscation Anti-Debugging Trap",
        code: "// Intentionally triggers debugger statements to crash dev tools\nsetInterval(function() {\n  debugger;\n}, 100);"
      }
    ]
  },
  'ascii-art': {
    practical_application: "ASCII art serves as the primary visual branding for Command Line Interfaces (CLIs). When an engineer runs `npm init` or boots up a complex backend service like Redis or Spring Boot, a stylized ASCII banner instantly signals that the service has initialized correctly and provides critical versioning information.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js Startup Banner",
        code: "const figlet = require('figlet');\n\nfiglet('WTK Pro', function(err, data) {\n  if (err) return;\n  console.log(data);\n  console.log('v1.0.0 Server Initialized on Port 8080');\n});"
      }
    ]
  },
  'morse-code': {
    practical_application: "Morse code is the ultimate fallback for low-bandwidth, high-noise communication environments. In software, it is occasionally utilized in embedded systems (like Arduino or Raspberry Pi) to flash LED diagnostic error codes when an electronic device fails to establish a serial or network connection.",
    code_blueprints: [
      {
        language: "cpp",
        title: "Arduino SOS Flash",
        code: "void flashSOS() {\n  // 3 short, 3 long, 3 short\n  for(int i=0; i<3; i++) { digitalWrite(LED_BUILTIN, HIGH); delay(200); digitalWrite(LED_BUILTIN, LOW); delay(200); }\n  for(int i=0; i<3; i++) { digitalWrite(LED_BUILTIN, HIGH); delay(600); digitalWrite(LED_BUILTIN, LOW); delay(200); }\n  for(int i=0; i<3; i++) { digitalWrite(LED_BUILTIN, HIGH); delay(200); digitalWrite(LED_BUILTIN, LOW); delay(200); }\n}"
      }
    ]
  }
};

let modified = false;

parsed.tools.forEach(tool => {
  if (enhancements[tool.slug]) {
    tool.content.practical_application = enhancements[tool.slug].practical_application;
    tool.content.code_blueprints = enhancements[tool.slug].code_blueprints;
    modified = true;
    console.log(`Updated ${tool.slug}`);
  }
});

if (modified) {
  fs.writeFileSync(yamlFile, yaml.dump(parsed));
  console.log('Successfully injected Batch 10 semantic depth.');
} else {
  console.log('No tools were modified.');
}
