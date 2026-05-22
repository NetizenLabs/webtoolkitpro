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
  'what-is-my-ip': {
    seo: {
      title: 'What Is My IP? — Public IPv4 & IPv6 Address Checker',
      description: 'Find out your public IPv4 or IPv6 address instantly. Check your IP location, ISP, and browser user-agent string for secure network troubleshooting.',
      keywords: ['what is my ip', 'find my ip address', 'public ipv4', 'ipv6 checker', 'check ip location'],
      tldr: 'Instantly discover your router\'s public-facing IP address and browser fingerprint.',
      entity_definition: 'The "What Is My IP" utility is a network diagnostic tool that identifies the public IP address of the device requesting the page. When you browse the internet, your local device (which has a private network IP like 192.168.x.x) passes traffic through your ISP\'s router, which assigns you a public IPv4 or IPv6 address. This tool acts as an echo server—it intercepts the HTTP request headers sent by your browser and returns the exact IP address and User-Agent string that external web servers see when you connect to them.'
    },
    faqs: [
      {
        question: 'What is the difference between IPv4 and IPv6?',
        answer: 'IPv4 is the original IP system (e.g., 192.168.1.1) but it ran out of unique addresses globally. IPv6 is the modern standard, utilizing an infinitely larger hexadecimal format (e.g., 2001:0db8::) to accommodate the billions of new devices connecting to the internet.'
      },
      {
        question: 'Why does my IP address change?',
        answer: 'Most internet service providers (ISPs) assign "Dynamic IPs." This means every time your router restarts, or a lease expires, your ISP assigns you a new public IP from their available pool. If you need a permanent IP for hosting a server, you must request a "Static IP."'
      },
      {
        question: 'Can a website see my physical location?',
        answer: 'Websites can only estimate your location based on your IP address (known as GeoIP). This usually pinpoints your city or the location of your ISP\'s nearest data center, but it cannot reveal your exact physical street address.'
      }
    ]
  },
  'ping-test': {
    seo: {
      title: 'HTTP Ping Test — Website Latency Checker',
      description: 'Ping any website or IP address to measure server latency and response time. Troubleshoot connectivity issues and calculate packet loss in real-time.',
      keywords: ['ping test online', 'website latency checker', 'http ping tool', 'server response time', 'check packet loss'],
      tldr: 'Measure the latency and response time of any website instantly via HTTP requests.',
      entity_definition: 'The Ping Test is a network diagnostic utility used to measure latency—the total round-trip time it takes for a data packet to travel from a client to a server and back. While traditional CLI ping uses the ICMP protocol (which is often blocked by modern web browsers), this web-based tool utilizes HTTP/HTTPS latency measurement. It continuously sends requests to a target host, recording the millisecond delay for each connection to establish an average response time and calculate potential connection drops.'
    },
    faqs: [
      {
        question: 'What is considered a "good" ping?',
        answer: 'A ping below 50ms is considered excellent and is ideal for real-time gaming or video calls. A ping between 50ms and 150ms is perfectly acceptable for normal web browsing. Anything above 250ms will feel noticeably slow and laggy.'
      },
      {
        question: 'Why does my ping fluctuate?',
        answer: 'Ping fluctuates based on network congestion, the physical distance between you and the server, and the quality of your ISP routing. Using a hardwired Ethernet connection rather than Wi-Fi is the easiest way to stabilize your latency.'
      },
      {
        question: 'Does this use ICMP or HTTP?',
        answer: 'Because web browsers strictly forbid raw ICMP sockets for security reasons, this tool measures HTTP latency. It provides a highly accurate reflection of how long it takes a web server to respond to an actual browser request.'
      }
    ]
  },
  'port-scanner': {
    seo: {
      title: 'Open Port Scanner — Check Firewall Security',
      description: 'Scan external IP addresses for open TCP ports. Verify if crucial services like HTTP (80), HTTPS (443), SSH (22), and MySQL (3306) are exposed to the public internet.',
      keywords: ['port scanner online', 'check open ports', 'tcp port scan', 'firewall tester', 'is my port open'],
      tldr: 'Audit an IP address or domain to verify which server ports are open to the internet.',
      entity_definition: 'The Open Port Scanner is a cybersecurity utility that probes a target server or IP address to determine if specific network ports are listening for connections. A server has 65,535 possible ports, each acting as a communication endpoint for specific protocols (e.g., Port 80 for HTTP, Port 22 for SSH). This tool initiates a TCP connection handshake from our backend infrastructure to the target. If the target server responds, the port is flagged as "Open," alerting administrators to potentially exposed services.'
    },
    faqs: [
      {
        question: 'Is port scanning illegal?',
        answer: 'Scanning your own servers to verify firewall configurations is standard IT practice. However, aggressively scanning third-party infrastructure without permission can be interpreted as a malicious reconnaissance attack by automated intrusion detection systems.'
      },
      {
        question: 'Why is my port showing as "Timeout"?',
        answer: 'A "Timeout" usually means the server\'s firewall is configured to drop packets silently rather than rejecting them. This is a secure "stealth" configuration, preventing attackers from knowing if the server even exists at that IP address.'
      },
      {
        question: 'Which ports should always be closed?',
        answer: 'Unless strictly necessary, you should never expose database ports (like 3306 for MySQL or 5432 for Postgres) or remote management ports (like 3389 for RDP) to the public internet. They should be hidden behind a VPN or strict IP whitelists.'
      }
    ]
  },
  'dns-propagation': {
    seo: {
      title: 'DNS Propagation Checker — Verify Global Records',
      description: 'Check global DNS propagation instantly. Verify A, AAAA, MX, and CNAME records across top-tier DNS resolvers like Google (8.8.8.8) and Cloudflare (1.1.1.1).',
      keywords: ['dns propagation checker', 'check dns records', 'global dns lookup', 'verify nameservers', 'dns resolution online'],
      tldr: 'Check if your domain\'s DNS records have successfully updated across global resolvers.',
      entity_definition: 'The DNS Propagation Checker is a network utility used when migrating a website or changing domain registrars. When you update a domain\'s DNS records (such as pointing an A Record to a new IP address), it does not update instantly worldwide due to ISP caching. This tool queries the Domain Name System using top-tier DNS-over-HTTPS (DoH) providers (like Google and Cloudflare) to verify exactly what IP address or text string those global servers are currently caching for your domain.'
    },
    faqs: [
      {
        question: 'How long does DNS propagation take?',
        answer: 'Historically, propagation could take up to 48 hours. Today, major public resolvers (like Google 8.8.8.8 or Cloudflare 1.1.1.1) usually update within 15 to 30 minutes. However, local ISP caches may still take several hours to flush.'
      },
      {
        question: 'What is a TTL (Time To Live)?',
        answer: 'TTL dictates how long a DNS server is allowed to cache your record before it must ask the authoritative nameserver for an update. Setting a low TTL (e.g., 300 seconds) before migrating a site ensures the propagation happens quickly.'
      },
      {
        question: 'Why are some locations showing old IP addresses?',
        answer: 'This is the nature of decentralized DNS. If a server in London cached your old IP address one hour ago, and the TTL was set to 24 hours, it will not fetch your new IP address until that 24-hour countdown expires.'
      }
    ]
  },
  'whois-lookup': {
    seo: {
      title: 'WHOIS Domain Lookup — Find Domain Ownership',
      description: 'Perform a WHOIS lookup to reveal domain registration data. Discover domain expiration dates, registrar information, nameservers, and ownership status.',
      keywords: ['whois lookup', 'domain ownership search', 'check domain registration', 'whois database online', 'find domain owner'],
      tldr: 'Query the global WHOIS database to reveal the registration and expiration details of a domain.',
      entity_definition: 'The WHOIS Domain Lookup is an investigative utility that queries the global WHOIS database—a distributed public directory containing registration details for internet resources. When a person or company purchases a domain name, the Internet Corporation for Assigned Names and Numbers (ICANN) requires them to provide contact and technical data. This tool connects to the relevant registry via an API to extract the domain\'s exact creation date, expiration timeline, sponsoring registrar, and authoritative nameservers.'
    },
    faqs: [
      {
        question: 'Why is the owner\'s name "Redacted for Privacy"?',
        answer: 'Due to strict international privacy laws (like the GDPR in Europe), most domain registrars now automatically obscure the registrant\'s personal name, email, and phone number from the public WHOIS database to prevent spam and identity theft.'
      },
      {
        question: 'What does "clientTransferProhibited" mean?',
        answer: 'This is a standard security status applied by your registrar. It "locks" the domain so that malicious actors cannot illicitly transfer it to another registrar. You must manually unlock the domain before transferring it to a new host.'
      },
      {
        question: 'How accurate is the expiration date?',
        answer: 'The expiration date retrieved from the registry is 100% accurate. If you recently renewed your domain and the WHOIS data still shows the old date, wait a few hours; registries update their public databases periodically.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 11');
