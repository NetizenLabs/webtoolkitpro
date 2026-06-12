---
name: seo-geo-ai-deep-research
description: "Use this skill whenever the user asks for SEO content, blog posts, keyword research, GEO (Generative Engine Optimization) strategy, AI search optimization, competitor analysis, or any content that needs to rank on Google AND appear in AI answers (ChatGPT, Gemini, Perplexity, Claude). Triggers: 'write a blog post', 'find keywords', 'SEO article', 'GEO optimize', 'rank on AI search', 'content strategy', 'search intent', 'semantic SEO'. This skill enforces a structured deep-research workflow before writing any word of content."
---

# SEO + GEO + AI Deep Research Skill
## For: wtkpro.site / severancecalculator.xyz / MAT Digital

---

## Core Philosophy

> **Never write before you research. Never research without a structure.**

Every piece of content must satisfy 4 engines simultaneously:
1. **Google** — classic SEO signals (E-E-A-T, backlinks, Core Web Vitals)
2. **AI Overviews** — Google's SGE snippets (structured answers, FAQ schema)
3. **LLM Answer Engines** — ChatGPT, Perplexity, Gemini (citations, definitions, comparisons)
4. **Human Intent** — the actual person behind the query

---

## Phase 1: Deep Search Protocol

### Step 1 — Seed Query Expansion
Run **3 search passes** before writing anything:

```
Pass 1 — Head term:        "[main topic] 2026"
Pass 2 — Long tail:        "how to [action] [topic] [context]"
Pass 3 — Question format:  "what is [topic]" OR "best [tool] for [use case]"
```

Always include the current year in at least one query. Fresh results only.

### Step 2 — SERP Intelligence
For each query, extract:
- **Who ranks #1–3?** (domain authority signals)
- **What format dominates?** (listicle / how-to / tool page / comparison)
- **Is there an AI Overview?** (if yes — study its structure, we must match it)
- **People Also Ask (PAA)** — scrape every PAA question, these become H3s
- **Featured snippet** — note exact format (paragraph / table / numbered list)

### Step 3 — Competitor Content Gap
Fetch top 2 ranking URLs and identify:
- What subtopics they cover → we must cover all of these
- What subtopics they MISS → these become our differentiation
- Word count range → our target is 110–130% of their length
- Schema types used → we must use the same + add more

### Step 4 — Search Intent Classification
Classify the primary intent before writing:

| Intent | Signal | Content Format |
|--------|---------|----------------|
| Informational | "what is", "how does", "why" | Long-form guide, definitions |
| Navigational | Brand name + tool name | Tool page, landing page |
| Commercial | "best", "vs", "review", "top" | Comparison, listicle |
| Transactional | "free", "download", "use", "calculate" | Tool page, CTA-heavy |
| GEO/AI intent | "explain", "summarize", "calculate for me" | Definition block + structured data |

---

## Phase 2: Keyword Architecture

### Primary Keyword Rules
- 1 primary keyword per page — never stuff
- Must appear in: Title, H1, first 100 words, URL slug, meta description, alt text of first image
- Search volume: target 100–2,000/month (avoid >10K — too competitive at our DA)
- Keyword difficulty: aim for KD <40 for new sites

### Semantic Keyword Map
For every article, build 3 layers:

```
Layer 1 — LSI keywords (related terms Google expects to see)
Layer 2 — Entity keywords (people, tools, standards, organizations)
Layer 3 — NLP phrases (natural language questions LLMs use to answer)
```

### Long-tail Strategy (our priority)
Since wtkpro.site has low DA, target:
- 3–5 word phrases with clear intent
- Example: NOT "JSON formatter" → YES "online JSON formatter with validation"
- Example: NOT "severance pay" → YES "severance pay calculator UAE 2026"

---

## Phase 3: GEO (Generative Engine Optimization)

GEO = making content appear in AI-generated answers on ChatGPT, Perplexity, Gemini, Claude.

### The 5 GEO Rules

**Rule 1 — Definition First**
Every article must open with a crisp 2–3 sentence definition of the main concept.
AI engines extract this as the "answer" when someone asks "what is X".

**Rule 2 — Answer Boxes**
For every H2 or H3, write a 40–60 word direct answer immediately after the heading.
This trains LLMs to cite your page when answering that specific question.

**Rule 3 — Comparison Tables**
AI engines love pulling structured comparisons. Include at least one table per article.
Format: Feature | Option A | Option B | Winner

**Rule 4 — Cite Real Data**
LLMs prefer pages that cite statistics, official sources, and dated references.
Always include: "According to [source], [stat] as of [year]"
Use: official labor laws, MDN docs, Google documentation, gov.uk, etc.

**Rule 5 — FAQ Schema**
Every article ends with 4–6 FAQ items covering PAA questions.
These appear in both Google's AI Overviews AND LLM answers.

---

## Phase 4: Content Structure Template

Use this exact structure for every article:

```
[TITLE] — Primary keyword + year + power word
  Max 55 chars. No "| WebToolkit Pro Blog" suffix.

[META DESCRIPTION] — 140–155 chars
  Formula: [Primary keyword] + [key benefit] + [CTA]
  Example: "Calculate severance pay for 30+ countries free. Based on 2026 labor laws. Instant PDF report — no signup needed."

[URL SLUG] — lowercase, hyphens, no stop words
  Example: /blog/severance-pay-calculator-uae-2026

---

H1: [Same intent as title, can vary slightly]

[DEFINITION BLOCK — 2–3 sentences, GEO-optimized]
What is X? X is... Used for... In 2026...

[KEY STATS OR HOOK — cite a real number in first 100 words]

---

H2: What Is [Topic]? [or "How Does X Work?"]
  [40–60 word direct answer — AI snippet target]
  [Expanded explanation 150–200 words]

H2: How to [Main Action] [Topic] [Step by step OR tool-based]
  H3: Step 1 — [Action]
  H3: Step 2 — [Action]
  H3: Step 3 — [Action]

H2: [Topic] for [Specific Use Case / Country / Audience]
  [Targets a secondary long-tail keyword]
  [Include comparison table here]

H2: [Topic] vs [Alternative] [optional — for commercial intent]
  [Comparison table]

H2: Common [Topic] Mistakes / Tips / Best Practices
  [Listicle format — 5–7 items]
  [Each item: bold label + 2–3 sentence explanation]

H2: Frequently Asked Questions
  [4–6 FAQ items — pulled from PAA research]
  [Each answer: 40–80 words, direct]

[CTA BLOCK]
  Link to relevant wtkpro.site tool or severancecalculator.xyz
  Anchor text: descriptive, not "click here"

[INTERNAL LINKS — minimum 3]
  To related blog posts and tool pages
```

---

## Phase 5: Schema Markup Checklist

Every page must have:

- [ ] **Article schema** — headline, datePublished, dateModified, author, publisher
- [ ] **FAQPage schema** — all FAQ items from the article
- [ ] **BreadcrumbList schema** — ONE only (no duplicates — known wtkpro.site issue)
- [ ] **HowTo schema** — if article contains step-by-step instructions
- [ ] **Tool pages only:** SoftwareApplication schema

Self-referencing canonical — always matches the published URL exactly (trailing slash consistent).

---

## Phase 6: E-E-A-T Signals

Google ranks pages higher when they demonstrate:

**Experience** — "I built this tool because I faced this problem"
**Expertise** — cite specific technical details, version numbers, law references
**Authoritativeness** — link out to official sources (MDN, GOV, Google Docs)
**Trustworthiness** — no false claims, accurate data, date-stamped updates

For wtkpro.site specifically:
- Add "Last updated: [date]" to every article
- Add author bio block at bottom (even minimal — name + title)
- Link out to official labor law sources on severance articles

---

## Phase 7: Internal Linking Rules

Every piece of content must:
- Link to **3+ related blog posts** (use descriptive anchor text)
- Link to **1–2 relevant tool pages** on wtkpro.site
- Be linked FROM **at least 2 existing pages** (fix orphan page issue)
- Never use "click here" or "read more" as anchor text

---

## Phase 8: Output Format

After research is complete, deliver:

```
1. KEYWORD REPORT
   - Primary keyword + volume + KD
   - 5–8 semantic keywords
   - 4–6 PAA questions (become H3s and FAQs)
   - Search intent classification
   - Competitor gap summary (2 URLs)

2. CONTENT BRIEF
   - Title (≤55 chars)
   - Meta description (140–155 chars)
   - URL slug
   - Outline (H1 → H2 → H3 structure)
   - Word count target
   - Internal links to include
   - Schema types to implement

3. FULL ARTICLE
   - Written to brief
   - GEO answer boxes after every H2
   - Comparison table included
   - FAQ section (4–6 items)
   - CTA to relevant tool

4. SCHEMA JSON-LD
   - Article + FAQPage + BreadcrumbList
   - Ready to paste into <head>
```

---

## Quick Reference — wtkpro.site Context

| Signal | Current Status | Target |
|--------|---------------|--------|
| Indexed pages | 11 | 50+ |
| Sitemap pages | 284 | — |
| DA | Very low (new) | — |
| LCP | Poor (5,400ms) | <2,500ms |
| TTFB | Poor (3,461ms) | <800ms |
| Weekly clicks | ~4 | 200+ |
| Content target | 30 posts live | 66+ posts |

**Priority keyword targets:**
- Long-tail, KD <40, intent-specific
- Tool-supporting blog clusters (regex, JWT, CSS gradient, cron, etc.)
- Severance calculator: country-specific queries ("severance pay UAE 2026", "redundancy calculator UK 2026")

**Avoid:**
- Head terms (base64 encoder, JSON formatter) — too competitive at current DA
- Broad informational posts with no tool connection
- Any title over 55 characters
- Meta descriptions over 155 characters
