---
title: "CSS Units Explained: px, rem, em, vh, vw — When to Use Each"
description: "A comprehensive guide to CSS units. Learn when to use px, rem, em, vh, vw, and other CSS units for responsive, accessible web designs that work across all devices."
date: "2026-04-30"
category: "CSS"
tags: ["CSS", "responsive design", "web development", "frontend", "CSS units"]
keywords: ["CSS units explained", "px vs rem vs em", "CSS unit converter", "responsive CSS units", "when to use rem vs px", "viewport units CSS", "CSS best practices"]
readTime: "6 min read"
author: "WebToolkit Pro Team"
image: "/blog/css-units.jpg"
imageAlt: "Visual comparison of different CSS units including px, rem, em, vh, and vw"
canonical: "https://wtkpro.site/blog/css-units-explained/"
geo_region: "US"
geo_placename: "United States"
language: "en-US"
---

## CSS Units Explained: px, rem, em, vh, vw — When to Use Each

Choosing the right CSS unit is one of the most impactful decisions in frontend development. The wrong choice leads to layouts that break on different screens, text that's too small on mobile, and accessibility issues that alienate users.

## Absolute Units

### Pixels (px)

Pixels are the most familiar CSS unit. **1px = 1 device pixel** (on a standard display).

```css
.box {
  width: 300px;
  padding: 16px;
  border: 1px solid #ccc;
}
```

**When to use px:**
- Borders and shadows
- Fixed-size icons
- Media query breakpoints
- Elements that should never scale

**When to avoid px:**
- Font sizes (use rem instead)
- Layout widths (use %, vw, or max-width)
- Spacing in scalable components

## Relative Units

### rem (Root em)

**1rem = font size of the root `<html>` element** (default: 16px).

```css
html { font-size: 16px; }
h1 { font-size: 2rem; }     /* 32px */
p { font-size: 1rem; }      /* 16px */
small { font-size: 0.875rem; } /* 14px */
```

**Why rem is king for font sizes:**
- Users who set a larger browser font size get properly scaled text
- One change to `html { font-size }` scales the entire site
- Consistent, predictable sizing across components

### em (Relative to parent)

**1em = font size of the parent element.** This creates compound scaling:

```css
.parent { font-size: 20px; }
.child { font-size: 1.5em; }  /* 30px (20 × 1.5) */
.grandchild { font-size: 1.5em; } /* 45px! (30 × 1.5) */
```

**When to use em:**
- Padding and margins within a component (scales with text size)
- Icon sizes relative to surrounding text
- Component-level responsive scaling

**Danger zone:** Nested em values compound, creating unexpected sizes. Use rem for global consistency.

## Viewport Units

### vh and vw

- **1vh = 1% of viewport height**
- **1vw = 1% of viewport width**

```css
.hero {
  height: 100vh;        /* Full screen height */
  padding: 5vw;         /* Responsive padding */
}

.title {
  font-size: clamp(1.5rem, 4vw, 3.5rem); /* Fluid typography */
}
```

**When to use viewport units:**
- Full-screen hero sections
- Fluid typography (with clamp)
- Responsive spacing

**Watch out for:** On mobile, `100vh` can extend behind the browser's address bar. Use `100dvh` (dynamic viewport height) instead.

### The Modern Alternative: dvh, svh, lvh

CSS now has dynamic viewport units:
- **dvh** — Dynamic viewport height (accounts for mobile browser UI)
- **svh** — Small viewport height (UI fully visible)
- **lvh** — Large viewport height (UI hidden)

## Percentage (%)

Percentages are relative to the **parent element's** corresponding property:

```css
.container { width: 100%; max-width: 1200px; }
.sidebar { width: 30%; }
.content { width: 70%; }
```

## Quick Reference Table

| Unit | Relative To | Best For |
|------|------------|----------|
| `px` | Nothing (absolute) | Borders, shadows, breakpoints |
| `rem` | Root font-size | Font sizes, global spacing |
| `em` | Parent font-size | Component-level spacing |
| `%` | Parent element | Fluid layouts |
| `vw` | Viewport width | Responsive sizing |
| `vh` | Viewport height | Full-screen sections |
| `ch` | Width of "0" character | Input/textarea widths |

## Convert Between Units Instantly

Stop doing mental math. Our **[CSS Unit Converter](/tools/css-unit-converter/)** lets you convert between px, rem, em, and viewport units instantly with a custom base font size.

## Best Practices Summary

1. **Use rem for font sizes** — always
2. **Use px for borders and shadows** — they shouldn't scale
3. **Use em for component spacing** — padding/margin that should scale with text
4. **Use % for fluid layouts** — column widths, max-widths
5. **Use vw/vh for viewport-dependent sizing** — hero sections, fluid text
6. **Use clamp() for fluid typography** — `clamp(1rem, 2.5vw, 2rem)`

## Conclusion

Mastering CSS units is essential for building responsive, accessible websites. Use the right unit for each situation, and your layouts will work beautifully across every device and screen size.

**Convert CSS units instantly** with our free [CSS Unit Converter](/tools/css-unit-converter/).

