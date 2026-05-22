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
  'ascii-art': {
    seo: {
      title: 'ASCII Art Generator — Convert Text to ASCII',
      description: 'Convert normal text into massive, decorative ASCII art. Generate custom terminal banners, code comments, and text graphics using hundreds of fonts.',
      keywords: ['ascii art generator', 'text to ascii', 'terminal banner maker', 'ascii font generator', 'generate ascii code comments'],
      tldr: 'Convert regular text into massive, decorative ASCII art for terminal banners and code comments.',
      entity_definition: 'The ASCII Art Generator is a typographic rendering utility. ASCII (American Standard Code for Information Interchange) is a character encoding standard dating back to the 1960s. In modern development, "ASCII Art" refers to the technique of mapping characters to massive font grids to create decorative text graphics. This tool uses libraries like FIGlet to parse standard string input and mathematically map each letter into multi-line text banners, commonly used to brand Linux terminal interfaces and source code headers.'
    },
    faqs: [
      {
        question: 'What is FIGlet?',
        answer: 'FIGlet (Frank, Ian and Glenn\'s LETters) is a classic computer program that generates text banners using large letters made up of ordinary ASCII characters. Most modern ASCII generators use FIGlet font files.'
      },
      {
        question: 'Can I use ASCII art in my code?',
        answer: 'Yes! Developers frequently paste ASCII art into the top of their source code files (inside a multi-line block comment `/* ... */`) as a creative signature or module header.'
      },
      {
        question: 'Why does the art look distorted when I paste it?',
        answer: 'ASCII art absolutely requires a "monospace" font (where every character takes up the exact same width) to render correctly. If you paste it into a word processor using a proportional font like Arial, the columns will misalign and break the image.'
      }
    ]
  },
  'morse-code': {
    seo: {
      title: 'Morse Code Translator — Encode & Decode',
      description: 'Translate English text to Morse Code, or decode Morse back to English. Generate dots and dashes for audio transmission or cryptographic puzzles.',
      keywords: ['morse code translator', 'encode text to morse', 'decode morse code', 'dots and dashes translator', 'learn morse code'],
      tldr: 'Instantly encode standard text into Morse code, or decode dots and dashes back into text.',
      entity_definition: 'The Morse Code Translator is a cryptographic and communications utility. Invented in the 1830s, Morse code is a method of transmitting text information as a series of on-off tones, lights, or clicks. It standardizes the alphabet into a binary system of "dots" (short signals) and "dashes" (long signals). This tool algorithmically parses string input, mapping each alphanumeric character to its standardized ITU (International Telecommunication Union) sequence, allowing users to encode or decode messages instantly.'
    },
    faqs: [
      {
        question: 'What is SOS in Morse Code?',
        answer: 'The internationally recognized distress signal SOS is `... --- ...` (three dots, three dashes, three dots). It was chosen because it is incredibly easy to transmit and recognize.'
      },
      {
        question: 'How are spaces handled in Morse?',
        answer: 'A standard space between letters is represented by a gap equivalent to three dots. A space between entirely different words is represented by a gap equivalent to seven dots (often visualized as a forward slash `/` in text translators).'
      },
      {
        question: 'Are there lowercase letters in Morse?',
        answer: 'No. Morse code is strictly case-insensitive. A dot and a dash (`.-`) means the letter "A", regardless of whether it is uppercase or lowercase in the original text.'
      }
    ]
  },
  'emoji-picker': {
    seo: {
      title: 'Emoji Picker & Search — Copy and Paste Emojis',
      description: 'Search, find, and copy thousands of emojis instantly. Browse by category or search by keyword to find the perfect emoji for your social media or code.',
      keywords: ['emoji picker', 'search emojis', 'copy paste emoji', 'find emoji by keyword', 'emoji keyboard online'],
      tldr: 'Search thousands of standard Unicode emojis by keyword and copy them to your clipboard.',
      entity_definition: 'The Emoji Picker is a Unicode character utility. Emojis are standardized pictograms defined by the Unicode Consortium. While mobile devices have built-in visual keyboards, desktop operating systems often make finding specific emojis difficult. This tool indexes the official Unicode emoji dataset, providing a rapid, fuzzy-searchable interface. Users can query keywords (e.g., "happy", "car") to instantly locate, preview, and copy the corresponding UTF-8 character payload to their system clipboard.'
    },
    faqs: [
      {
        question: 'Why do emojis look different on my phone vs my computer?',
        answer: 'The Unicode Consortium only defines the *concept* of the emoji (e.g., "Grinning Face"). It is entirely up to the operating system vendor (Apple, Google, Microsoft) to draw the actual artwork, which is why an iPhone emoji looks different than a Windows emoji.'
      },
      {
        question: 'Can I use emojis in my code?',
        answer: 'Yes! Because modern code files are saved in UTF-8 encoding, you can safely use emojis in strings, comments, and even variable names (though using them as variables is heavily discouraged by most style guides).'
      },
      {
        question: 'What are Emoji Modifiers?',
        answer: 'Modifiers are hidden Unicode characters (like the Fitzpatrick scale modifiers) that are appended to a base emoji to change its appearance, most commonly used to alter skin tones.'
      }
    ]
  },
  'text-similarity': {
    seo: {
      title: 'Text Similarity Checker — Compare String Distance',
      description: 'Calculate the similarity percentage between two blocks of text. Uses Levenshtein distance and Cosine similarity to detect plagiarism or fuzzy matches.',
      keywords: ['text similarity checker', 'compare string distance', 'levenshtein distance calculator', 'cosine similarity text', 'check text overlap'],
      tldr: 'Mathematically calculate the similarity percentage between two different blocks of text.',
      entity_definition: 'The Text Similarity Checker is a Natural Language Processing (NLP) utility. Comparing two strings to see if they are "similar" requires complex mathematics. This tool utilizes algorithms like the Levenshtein Distance (which counts the minimum number of single-character edits required to change one word into the other) and Cosine Similarity (which analyzes text overlap as mathematical vectors). It outputs a precise similarity percentage, aiding in plagiarism detection and fuzzy-search tuning.'
    },
    faqs: [
      {
        question: 'What is Levenshtein Distance?',
        answer: 'It is a string metric that measures the difference between two sequences. The "distance" is the number of deletions, insertions, or substitutions required to transform String A into String B (e.g., "kitten" to "sitting" has a distance of 3).'
      },
      {
        question: 'Is this the same as a plagiarism checker?',
        answer: 'Partially. Plagiarism checkers use similar algorithms (like Jaccard similarity or Cosine similarity) but they run those comparisons against billions of web pages. This tool strictly compares the two specific text blocks you provide.'
      },
      {
        question: 'What is Cosine Similarity?',
        answer: 'Cosine similarity ignores the exact order of characters and instead looks at the frequency of words. It maps the two texts as vectors in a multi-dimensional space and measures the mathematical angle between them.'
      }
    ]
  },
  'data-anonymizer': {
    seo: {
      title: 'Data Anonymizer — Mask PII Data Instantly',
      description: 'Anonymize and mask Personally Identifiable Information (PII). Automatically replace names, emails, and phone numbers in your text to comply with GDPR and CCPA.',
      keywords: ['data anonymizer', 'pii masking tool', 'anonymize text online', 'gdpr data masking', 'hide personal information text'],
      tldr: 'Automatically detect and mask Personally Identifiable Information (PII) within a block of text.',
      entity_definition: 'The Data Anonymizer is a privacy and compliance utility. In modern software engineering, raw data logs often inadvertently capture Personally Identifiable Information (PII) like email addresses, credit card numbers, or phone numbers, violating GDPR and CCPA regulations. This tool utilizes advanced Regular Expressions (RegEx) to scan unstructured text blocks, automatically identifying and masking (e.g., replacing with asterisks `***`) sensitive PII before the data is shared or stored.'
    },
    faqs: [
      {
        question: 'What is PII?',
        answer: 'Personally Identifiable Information (PII) is any data that could potentially identify a specific individual. Common examples include Social Security numbers, email addresses, phone numbers, and physical addresses.'
      },
      {
        question: 'Is my data sent to a server?',
        answer: 'No. The data anonymization executes entirely within your browser using client-side JavaScript. Your sensitive text is never transmitted over the network.'
      },
      {
        question: 'Does this comply with GDPR?',
        answer: 'Masking PII is a core requirement of the General Data Protection Regulation (GDPR) when handling analytics or sharing data with third parties. However, automated regex masking should be considered a "best effort" tool, not a foolproof legal guarantee.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 34');
