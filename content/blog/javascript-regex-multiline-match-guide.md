---
title: "JavaScript Regex Multiline Guide 2026 — Fix Matching Errors Fast"
seoTitle: "JavaScript Regex Multiline Guide 2026 — Fix Matching Errors Fast"
description: "Fix JavaScript regex multiline matching errors in 3 steps. Covers the m flag, s flag (dotAll), and cross-platform line breaks (\r\n). Tested on Node 20."
date: '2026-06-16'
category: "Engineering"
tags: ["JavaScript", "Regex", "Programming", "Web Development"]
keywords: ["javascript regex multiline guide 2026", "regex multiline match", "javascript dotall flag", "regex m flag", "match across multiple lines javascript"]
readTime: '6 min read'
tldr: "To match text across multiple lines in JavaScript, you must understand the difference between the `m` (multiline) flag, which modifies how `^` and `$` work, and the `s` (dotAll) flag, which allows the `.` character to match newline characters. Using `[\\s\\S]` is the legacy fallback."
author: "Abu Sufyan"
image: "/blog/regex-multiline-guide.jpg"
imageAlt: "JavaScript Regex Multiline matching code example"
expertTips:
  - "Use the `s` (dotAll) flag instead of the legacy `[\\s\\S]` hack for better readability and performance in modern V8 engines."
  - "Always account for Windows (`\\r\\n`) and Unix (`\\n`) line endings by using `\\r?\\n` when explicitly matching line breaks."
faqs:
  - q: "What does the m flag do in JavaScript regex?"
    a: "The `m` (multiline) flag changes the behavior of the `^` and `$` anchors. Instead of matching only the absolute start and end of the entire string, they will match the start and end of each individual line within the string."
  - q: "How do I match a dot across multiple lines in JavaScript?"
    a: "Use the `s` (dotAll) flag. For example, `/foo.*bar/s`. This allows the dot `.` character to match newline characters (`\\n`), which it normally ignores."
  - q: "Is the s flag supported in all browsers?"
    a: "Yes, the `s` (dotAll) flag is fully supported in all modern browsers (Chrome 68+, Firefox 78+, Safari 11.1+) and Node.js v9+ as of 2026."
  - q: "How do I replace all newlines in a string using regex?"
    a: "You can use the global flag with the newline characters: `text.replace(/\\r?\\n/g, ' ')`. This replaces all line breaks with a single space."
steps:
  - name: "Understand the m flag"
    text: "Learn how the m flag modifies anchor behavior."
  - name: "Understand the s flag"
    text: "Learn how the s flag enables dotAll matching."
  - name: "Combine flags safely"
    text: "Use m and s flags together for complex multiline extraction."
type: "blog"
---

# JavaScript Regex Multiline Guide 2026 — Fix Matching Errors Fast

A missing regex flag caused our markdown parser to silently drop half of our documentation pages during a migration. Here is the exact fix — and why multiline matching in JavaScript is so commonly misunderstood.

I've been using JavaScript regular expressions for over 8 years, and multiline string parsing remains one of the most frequent causes of silent bugs in data extraction pipelines. 

**JavaScript regex multiline matching** is the process of finding patterns that span across multiple lines of text, or anchoring patterns to the start/end of individual lines within a larger string. It works by utilizing two specific flags: `m` (multiline) and `s` (dotAll). In 2026, the standard approach is to use the `s` flag rather than legacy whitespace hacks.

TL;DR: The fix is using the correct flag for your goal. To make `^` and `$` match per line, add the `m` flag. To make `.` match across newlines, add the `s` flag. Example: `/pattern/ms`.

## What Is Multiline Regex Matching?

JavaScript regex multiline matching allows your pattern to correctly process strings containing newline characters (`\n` or `\r\n`). By default, JavaScript regex engines treat a string as one single continuous block, where `.` stops at a newline, and `^`/`$` only match the absolute beginning and end of the file. If you are new to V8 engine execution rules, read our [JS Regex Cheat Sheet](/blog/regex-cheat-sheet-javascript/) for a full primer.

When you parse CSV files, markdown documents, or raw HTTP responses, you are dealing with multiline strings. If you don't explicitly tell the V8 regex engine how to handle those newlines, your data extraction will fail.

## Why Multiline Regex Matters / The Problem It Solves

Imagine you are writing a script to extract all `<h2>` tags from an HTML document. You write a regex like `/<h2[^>]*>.*<\/h2>/g`. It works perfectly in your unit tests. 

But in production, a user formats their HTML with a line break inside the `<h2>` tag:
```html
<h2 class="title"
>My Header</h2>
```
Suddenly, your regex completely misses this header. Your table of contents generates incorrectly, and users complain about missing sections. This happens because the `.` character in JavaScript regex **does not match newline characters by default**.

## How to Match Across Multiple Lines — Step by Step

To fix multiline parsing errors, you need to apply the correct flags. As covered in our [performance optimization guide](/blog/performance-optimization-guide/), choosing the right flags avoids unnecessary string traversal overhead.

### Prerequisites
- Node.js v20+ or any modern browser
- A basic understanding of regex syntax

### Step 1 — Use the `m` (multiline) flag for Anchors
If you want to extract the first word of every line, you need the `^` anchor to trigger at the start of *each line*, not just the start of the string.

```javascript
const text = `apple is red
banana is yellow
cherry is red`;

// Without 'm' flag: Only matches "apple"
const noFlag = text.match(/^\w+/g); 

// With 'm' flag: Matches "apple", "banana", "cherry"
const withMFlag = text.match(/^\w+/gm); // ← add this line
```
Expected output with the `m` flag: `['apple', 'banana', 'cherry']`.

### Step 2 — Use the `s` (dotAll) flag for Spanning Lines
If you want to capture everything between two delimiters, even if there are newlines between them, use the `s` flag.

```javascript
const html = `<div class="content">
  <p>Hello World</p>
</div>`;

// Fails because '.' stops at the first newline
const failMatch = html.match(/<div class="content">.*<\/div>/);

// Succeeds because 's' makes '.' match newlines
const successMatch = html.match(/<div class="content">.*<\/div>/s); // ← add this line
```
The `s` flag is the modern 2026 standard for spanning lines.

### Step 3 — The Legacy Fallback (`[\s\S]`)
If you are maintaining a legacy codebase (older than ES2018 / Node.js 9) where the `s` flag is not supported, you must use the `[\s\S]` character class hack.

```javascript
// Matches any whitespace OR any non-whitespace (effectively matching everything including newlines)
const legacyMatch = html.match(/<div class="content">[\s\S]*?<\/div>/);
```
Success confirmed. However, migrate to the `s` flag when possible for cleaner syntax.

## Common Multiline Regex Errors and How to Fix Them

### Error 1 — Missing matches on Windows line endings
Cause: Windows uses `\r\n` for newlines, while Unix/Linux uses `\n`. If your regex explicitly looks for `\n`, it will fail on Windows files.
Fix: Use `\r?\n` to make the carriage return optional.
```javascript
const extractLines = text.split(/\r?\n/);
```

### Error 2 — Greedy matching consuming the whole file
Cause: When using the `s` flag with a greedy `.*`, the engine will consume the entire document up to the *last* matching closing tag, rather than stopping at the first one.
Fix: Make the quantifier lazy by adding `?`.
```javascript
// BAD: Consumes from the first <div> to the very last </div> in the file
const greedy = /<div>.*<\/div>/s;

// GOOD: Stops at the first closing </div>
const lazy = /<div>.*?<\/div>/s;
```

## Multiline Regex Best Practices in 2026

- **Always prefer the `s` flag over `[\s\S]`.** It clearly communicates your intent to other developers.
- **Use `trim()` before applying line-start anchors.** Invisible leading whitespace will cause `^` anchors to fail if you aren't careful.
- **Don't use Regex for complex HTML parsing.** If you are parsing nested, deeply multiline HTML, use a proper DOM parser like `cheerio` or `JSDOM`. Regex cannot accurately parse nested recursive structures.

## `s` Flag vs `[\s\S]` Hack

| Feature       | `s` Flag (dotAll) | `[\s\S]` Hack | Winner |
|---------------|------------|------------|--------|
| Performance   | Fast        | Fast        | Tie    |
| Readability   | Excellent        | Poor        | `s` Flag    |
| Compatibility          | ES2018+        | Universal        | `[\s\S]` Hack    |
| Intent     | Explicit        | Implicit        | `s` Flag    |
| Best for      | Modern 2026 Stacks        | Legacy IE11/Node 8 Code        | `s` Flag    |

The clear winner for any modern development environment is the `s` flag.

## My Experience Using Multiline Regex — Honest Verdict

What I liked:
- The addition of the `s` (dotAll) flag in ES2018 finally fixed the most annoying quirk of JavaScript regex. It makes payload extraction significantly cleaner.
- The `m` flag is incredibly reliable for parsing `.env` files or CSV line items locally without needing a heavy parser library.

What frustrated me:
- The fact that `^` and `$` don't default to per-line matching still trips up junior developers.
- Debugging multiline regex failures in production logs is painful because standard log aggregators often strip or mangle newline characters, making it impossible to reproduce the exact string state.

Who I'd recommend it for:
- Developers building lightweight markdown parsers, log analyzers, or scraping scripts.

Who should look elsewhere:
- Teams trying to parse complex, user-generated HTML. Use a dedicated HTML parser instead.

## Frequently Asked Questions

Q: What does the m flag do in JavaScript regex?
A: The `m` (multiline) flag changes the behavior of the `^` and `$` anchors. Instead of matching only the absolute start and end of the entire string, they will match the start and end of each individual line within the string.

Q: How do I match a dot across multiple lines in JavaScript?
A: Use the `s` (dotAll) flag. For example, `/foo.*bar/s`. This allows the dot `.` character to match newline characters (`\n`), which it normally ignores.

Q: Is the s flag supported in all browsers?
A: Yes, the `s` (dotAll) flag is fully supported in all modern browsers (Chrome 68+, Firefox 78+, Safari 11.1+) and Node.js v9+ as of 2026.

Q: How do I replace all newlines in a string using regex?
A: You can use the global flag with the newline characters: `text.replace(/\r?\n/g, ' ')`. This replaces all line breaks with a single space.

---

Try our free [RegEx Tester & AI Explainer](/tools/regex-tester/) to validate your multiline patterns instantly →

---

**Abu Sufyan** · Full-stack developer · Founder of WebToolkit Pro
[LinkedIn](https://www.linkedin.com/in/abusufyan-wtkpro/)

Last updated: 2026-06-16
