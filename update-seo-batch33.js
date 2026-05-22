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
  'title-case': {
    seo: {
      title: 'Title Case Converter — AP & Chicago Style Formatter',
      description: 'Automatically capitalize your headlines and essays using standard AP, Chicago, or MLA Title Case rules. Ensure your typography is professional and correct.',
      keywords: ['title case converter', 'capitalize headline', 'ap style title generator', 'chicago style capitalization', 'headline formatter'],
      tldr: 'Format your headlines and titles using professional AP, Chicago, or MLA capitalization rules.',
      entity_definition: 'The Title Case Converter is a typographic formatting utility. In English grammar, "Title Case" dictates that major words in a heading are capitalized, while minor words (articles, short prepositions, and conjunctions) remain lowercase. However, style guides (like Associated Press, Chicago Manual of Style, and MLA) differ on exactly which minor words to exclude. This tool parses an input string against these specific grammatical dictionaries, automatically outputting a flawlessly capitalized headline ready for publication.'
    },
    faqs: [
      {
        question: 'What is AP Style?',
        answer: 'The Associated Press (AP) style is the standard grammar and formatting guide used by journalists and news organizations worldwide. It dictates keeping words with three or fewer letters (like "for" and "the") lowercase in headlines.'
      },
      {
        question: 'Should I capitalize the first word?',
        answer: 'Yes. In every major style guide (AP, Chicago, MLA, APA), the very first and very last word of a headline or title MUST always be capitalized, regardless of what part of speech they are.'
      },
      {
        question: 'What is Sentence case?',
        answer: 'Sentence case is a simpler formatting style where only the very first word of the headline (and any proper nouns) are capitalized, while the rest of the text remains lowercase, exactly like a standard sentence.'
      }
    ]
  },
  'readability-checker': {
    seo: {
      title: 'Readability Checker — Flesch-Kincaid Score',
      description: 'Analyze the reading level of your content. Calculate the Flesch-Kincaid Grade Level and Reading Ease scores to ensure your writing is accessible to your audience.',
      keywords: ['readability checker', 'flesch kincaid score', 'reading level calculator', 'check content readability', 'grade level text analyzer'],
      tldr: 'Algorithmically analyze your text to determine its Flesch-Kincaid Reading Grade Level.',
      entity_definition: 'The Readability Checker is a content analysis utility. Copywriters and SEO professionals use algorithms to determine how difficult a piece of text is to comprehend. The Flesch-Kincaid readability tests evaluate text based on a mathematical ratio of total syllables to total words, and total words to total sentences. This tool parses a text block, executes these ratios, and outputs a Reading Ease score (0-100) and a US Grade Level equivalent, helping authors tailor their content to their target demographic.'
    },
    faqs: [
      {
        question: 'What is a good Flesch Reading Ease score?',
        answer: 'A score between 60 and 70 is considered ideal for the general public. It translates to an 8th or 9th-grade reading level, which is easily understood by most adults.'
      },
      {
        question: 'Does readability affect SEO?',
        answer: 'Indirectly, yes. While Google does not use Flesch-Kincaid as a direct ranking factor, content that is overly complex or difficult to read has a high "bounce rate" (users leaving immediately), which negatively impacts rankings.'
      },
      {
        question: 'How do I improve my score?',
        answer: 'Use shorter sentences. Break complex paragraphs into smaller ideas, and replace long, multi-syllable jargon words with simpler, more direct vocabulary.'
      }
    ]
  },
  'pwa-manifest': {
    seo: {
      title: 'PWA Manifest Generator — manifest.json Builder',
      description: 'Generate a manifest.json file for your Progressive Web App (PWA). Configure app icons, theme colors, and display modes to make your website installable on mobile devices.',
      keywords: ['pwa manifest generator', 'generate manifest.json', 'progressive web app builder', 'web app manifest creator', 'make website installable'],
      tldr: 'Generate a strict `manifest.json` file to make your web app installable on mobile devices.',
      entity_definition: 'The PWA Manifest Generator is a modern web development utility. A Progressive Web App (PWA) behaves like a native mobile application, but requires a Web App Manifest (`manifest.json`) to instruct the browser how to install it. This JSON file dictates the app\'s name, home screen icons, theme colors, and display mode (e.g., hiding the browser URL bar). This tool provides a visual UI to configure these settings, outputting the exact, W3C-compliant JSON required to trigger the "Add to Home Screen" prompt.'
    },
    faqs: [
      {
        question: 'What does "standalone" display mode do?',
        answer: 'Setting the display mode to `standalone` tells the mobile device to hide the standard browser UI (like the URL bar and back buttons), making your website look and feel exactly like a native iOS or Android app.'
      },
      {
        question: 'What icon sizes are required?',
        answer: 'For a PWA to be fully compliant and installable, you must provide at least two icon sizes: 192x192 pixels and 512x512 pixels, usually in PNG format.'
      },
      {
        question: 'Why isn\'t my PWA installing?',
        answer: 'To trigger the installation prompt, your website MUST have a valid `manifest.json` linked in the HTML `<head>`, it MUST be served over a secure HTTPS connection, and it usually requires a registered Service Worker.'
      }
    ]
  },
  'css-keyframes': {
    seo: {
      title: 'CSS Keyframes Generator — Create Web Animations',
      description: 'Visually generate @keyframes for complex CSS animations. Create bounce, fade, slide, and pulse effects without writing tedious animation timelines by hand.',
      keywords: ['css keyframes generator', 'generate css animations', 'visual keyframe builder', 'css bounce animation code', 'web animation generator'],
      tldr: 'Visually construct and generate `@keyframes` timelines for complex CSS animations.',
      entity_definition: 'The CSS Keyframes Generator is a frontend design utility. In CSS3, the `@keyframes` rule is used to create complex, multi-step animations by defining the specific CSS styles an element should have at various percentage points (0% to 100%) along a timeline. Writing these transitional states manually is incredibly tedious. This tool provides a visual interface to define transformations (scale, rotate, translate) and opacities, outputting the precise, cross-browser compliant CSS code required to animate DOM elements.'
    },
    faqs: [
      {
        question: 'What is the difference between transition and animation?',
        answer: 'A CSS `transition` is a simple A-to-B effect (like a button turning blue on hover). A CSS `animation` (using `@keyframes`) allows for complex, multi-step sequences (A to B to C) that can loop infinitely.'
      },
      {
        question: 'What is an easing function?',
        answer: 'An easing function (like `ease-in-out`) dictates the acceleration curve of the animation. It makes animations feel more natural by starting slowly, speeding up in the middle, and slowing down before stopping.'
      },
      {
        question: 'Do I need vendor prefixes?',
        answer: 'Mostly no. Modern browsers natively support `@keyframes` and `transform`. However, if you are supporting legacy browsers (like old versions of Safari), you may still need the `-webkit-` prefix.'
      }
    ]
  },
  'css-color-extractor': {
    seo: {
      title: 'CSS Color Extractor — Find Colors in Code',
      description: 'Extract every HEX, RGB, and HSL color code from a stylesheet or website. Instantly build a color palette from messy CSS and SCSS code.',
      keywords: ['css color extractor', 'extract hex codes from text', 'find colors in css', 'generate color palette from code', 'css color parser'],
      tldr: 'Parse raw CSS or SCSS code to extract every HEX, RGB, and HSL color into a visual palette.',
      entity_definition: 'The CSS Color Extractor is a frontend design and refactoring utility. When inheriting a legacy codebase, stylesheets often contain dozens of slightly different, hardcoded color values rather than standardized CSS variables. This tool parses raw CSS, SCSS, or HTML code using Regular Expressions to identify and extract every valid color format (HEX, RGB, RGBA, HSL). It deduplicates the list and presents a visual palette, allowing developers to easily audit and refactor their design system.'
    },
    faqs: [
      {
        question: 'What is HSL?',
        answer: 'HSL stands for Hue, Saturation, and Lightness. It is a highly intuitive color model for developers because adjusting the "Lightness" percentage easily generates hover states or dark-mode variants.'
      },
      {
        question: 'Why should I extract colors?',
        answer: 'Extracting colors is the first step in refactoring a legacy site. Once you identify all 50 shades of hardcoded blue, you can consolidate them into 3 standardized CSS Custom Properties (Variables).'
      },
      {
        question: 'Does this extract named colors?',
        answer: 'Yes, advanced extractors will also identify standard CSS named colors (like `rebeccapurple` or `tomato`) provided they are used validly within the stylesheet syntax.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 33');
