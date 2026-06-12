with open('C:/xampp/htdocs/webtoolkit-pro/abusufyan-xyz/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1 & 2. Meta Title and Description
html = html.replace('<title>Abu Sufyan | Indie Maker & Tool Builder | 5 Live Projects | Pakistan</title>', '<title>Abu Sufyan | Solo Maker & Tool Builder | 9 Live Projects</title>')
html = html.replace('<meta name="description" content="Abu Sufyan — solo indie maker from Lahore, Pakistan. Building free professional tools used globally: WebToolkit Pro (150+ dev tools), Severance Calculator (30+ countries), TradeConvert. No sign-ups. Just answers.">', '<meta name="description" content="Solo indie maker building free professional tools like WebToolkit Pro and Severance Calculator. No sign-ups. No paywalls. Just instant answers.">')

html = html.replace('<meta property="og:title" content="Abu Sufyan — 5 Live Projects. 160+ Free Tools. One Maker.">', '<meta property="og:title" content="Abu Sufyan | Solo Maker & Tool Builder | 9 Live Projects">')
html = html.replace('<meta property="og:description" content="Solo indie maker from Pakistan. WebToolkit Pro (150+ dev tools), Severance Calculator (8 countries), TradeConvert. All free, all instant, no sign-up.">', '<meta property="og:description" content="Solo indie maker building free professional tools like WebToolkit Pro and Severance Calculator. No sign-ups. No paywalls. Just instant answers.">')

# 3. Heading Hierarchy (span to h2)
html = html.replace('<span class="sec-title">Tools &amp; Projects</span>', '<h2 class="sec-title" style="margin:0;display:inline;font-size:inherit;letter-spacing:inherit;text-transform:inherit;">What do I build?</h2>')
html = html.replace('<span class="sec-title">By The Numbers</span>', '<h2 class="sec-title" style="margin:0;display:inline;font-size:inherit;letter-spacing:inherit;text-transform:inherit;">What is the impact?</h2>')
html = html.replace('<span class="sec-title">About</span>', '<h2 class="sec-title" style="margin:0;display:inline;font-size:inherit;letter-spacing:inherit;text-transform:inherit;">Who is the maker?</h2>')
html = html.replace('<span class="sec-title">Latest Articles</span>', '<h2 class="sec-title" style="margin:0;display:inline;font-size:inherit;letter-spacing:inherit;text-transform:inherit;">What am I writing?</h2>')

# 4. Bulleted List
old_p = '<p class="about-p">I\'m a solo maker from <strong>Pakistan</strong>. I build free professional tools for people who need quick, reliable answers — HR managers calculating severance, developers formatting JSON, writers counting words.</p>'
new_p = """<p class="about-p">I'm a solo maker from <strong>Pakistan</strong>. I build free professional tools for people who need quick, reliable answers:</p>
      <ul class="about-ul" style="font-size: 16px; color: var(--muted); line-height: 1.8; margin-bottom: 14px; padding-left: 20px;">
        <li><strong>HR managers:</strong> Calculating severance across 30+ countries.</li>
        <li><strong>Developers:</strong> Formatting JSON securely with client-side execution.</li>
        <li><strong>Writers & SEOs:</strong> Optimizing content and tracking core web vitals.</li>
      </ul>"""
html = html.replace(old_p, new_p)

# 6. Font Sizes (CSS changes)
html = html.replace('.about-p{font-size:14px', '.about-p{font-size:16px')
html = html.replace('.story-item p { font-size: 15px;', '.story-item p { font-size: 16px;')
html = html.replace('.impact-quote { font-size: 15px;', '.impact-quote { font-size: 16px;')

# 5. Inject FAQPage schema just before </head>
faq_schema = """
<!-- FAQ Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Are the tools on WebToolkit Pro free to use?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, all 150+ developer tools on WebToolkit Pro are 100% free with no sign-ups or paywalls required."
    }
  }, {
    "@type": "Question",
    "name": "How does the Severance Calculator work?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The Severance Calculator uses official 2026 labor law formulas to compute end-of-service benefits and gratuity payouts across 30+ countries."
    }
  }, {
    "@type": "Question",
    "name": "Where is Abu Sufyan based?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Abu Sufyan is a solo indie maker and tool builder based in Lahore, Pakistan."
    }
  }]
}
</script>
</head>"""
html = html.replace('</head>', faq_schema)

with open('C:/xampp/htdocs/webtoolkit-pro/abusufyan-xyz/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
