import re

with open('C:/xampp/htdocs/webtoolkit-pro/abusufyan-xyz/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Hero Stats (5 to 9)
html = html.replace('data-count="5"', 'data-count="9"')
html = html.replace('data-suffix="">5</div>', 'data-suffix="">9</div>')

# 2. Update Tools Count (07 items to 09 items)
html = html.replace('<span class="sec-count">07 items</span>', '<span class="sec-count">09 items</span>')

# 3. Add 4 new story items
new_stories = """
    <div class="story-item reveal" data-delay="6">
      <h3><a href="#" target="_blank" rel="noopener">MCP Playground ↗</a></h3>
      <p>Testing Model Context Protocol (MCP) tools through raw LLM prompts is slow. I wanted a visual way to build and debug them, so I engineered a standalone, single-file playground. It features an auto-drawing SVG node graph and a built-in terminal simulator, running entirely in the browser without a backend.</p>
    </div>
    <div class="story-item reveal" data-delay="7">
      <h3><a href="#" target="_blank" rel="noopener">Studio Context Catalog ↗</a></h3>
      <p>Copy-pasting context into AI coding tools gets messy. I built this Next.js 15 dashboard to visually organize "Context Commits." Developers can drag-and-drop code blocks, manage global rules in a strict IDE-style dark theme, and instantly copy structured context payloads directly to their clipboard.</p>
    </div>
    <div class="story-item reveal" data-delay="8">
      <h3><a href="#" target="_blank" rel="noopener">Niche Storefront Dashboard ↗</a></h3>
      <p>A high-density administrative backend for specialized e-commerce. Built on the bleeding edge using TanStack Start (React 19) and PostgreSQL, it handles dynamic inventory, complex <code>zod</code> validations, and interactive sales analytics through a clean, enterprise-grade Radix UI architecture.</p>
    </div>
    <div class="story-item reveal" data-delay="9">
      <h3><a href="#" target="_blank" rel="noopener">Query Purf ↗</a></h3>
      <p>A high-performance data querying dashboard built with Next.js App Router. I designed it specifically for deep system analytics and technical readability. It streams complex datasets from Server Components straight to heavily optimized Client Component data tables and charts.</p>
    </div>
  </div>"""

html = html.replace('    </div>\n  </div>\n</section>', '    </div>' + new_stories + '\n</section>')

# 4. Add timeline items
new_timeline = """
          <div class="tl-item">
            <div class="tl-date">SEP 2026</div>
            <div><div class="tl-n"><span class="dot dot-g"></span>MCP Playground — launched</div><div class="tl-d">Standalone local testing environment for AI servers.</div></div>
          </div>
          <div class="tl-item">
            <div class="tl-date">OCT 2026</div>
            <div><div class="tl-n"><span class="dot dot-g"></span>Studio Context Catalog — launched</div><div class="tl-d">Local dev tool for managing Context Commits for LLM prompts.</div></div>
          </div>
          <div class="tl-item">
            <div class="tl-date">NOV 2026</div>
            <div><div class="tl-n"><span class="dot dot-g"></span>Query Purf — launched</div><div class="tl-d">High-performance data querying and visualization dashboard.</div></div>
          </div>
          <div class="tl-item">
            <div class="tl-date">DEC 2026</div>
            <div><div class="tl-n"><span class="dot dot-g"></span>Niche Storefront — launched</div><div class="tl-d">Enterprise-grade e-commerce dashboard built on TanStack Start.</div></div>
          </div>
        </div>"""

html = html.replace('          </div>\n        </div>\n      </div>', '          </div>' + new_timeline + '\n      </div>')

with open('C:/xampp/htdocs/webtoolkit-pro/abusufyan-xyz/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
