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
  'character-counter': {
    seo: {
      title: 'Character & Word Counter — Text Length Calculator',
      description: 'Count characters, words, sentences, and paragraphs in real-time. Essential for SEO meta tags, Twitter character limits, and academic essay word counts.',
      keywords: ['character counter', 'word count tool', 'count characters with spaces', 'text length calculator', 'twitter character limit'],
      tldr: 'Instantly calculate the exact number of characters, words, sentences, and paragraphs in your text.',
      entity_definition: 'The Character & Word Counter is a text analysis utility. In digital publishing and social media, strict length constraints are enforced (e.g., X/Twitter\'s 280 character limit, or Google\'s 160 character meta description limit). This tool utilizes Regular Expressions (RegEx) and string splitting algorithms to instantly parse text input, calculating real-time metrics including total characters (with and without spaces), total words, sentence count, and estimated reading time.'
    },
    faqs: [
      {
        question: 'Are spaces counted as characters?',
        answer: 'Yes. In computing and database storage, a space is a distinct ASCII or Unicode character. However, most academic essays and publishing guidelines care primarily about "Word Count," which ignores spaces.'
      },
      {
        question: 'How is reading time calculated?',
        answer: 'Reading time is estimated based on the average adult reading speed of 238 words per minute (WPM). The tool divides your total word count by 238 to calculate the minutes required to read the text.'
      },
      {
        question: 'Is my text saved on your servers?',
        answer: 'No. The counting algorithms execute entirely client-side within your browser. Your text is never transmitted or stored.'
      }
    ]
  },
  'whitespace-remover': {
    seo: {
      title: 'Whitespace Remover — Clean & Minify Text',
      description: 'Remove extra spaces, tabs, and line breaks from your text or code. Clean up messy formatting and minify strings for database insertion or programming.',
      keywords: ['whitespace remover', 'remove extra spaces', 'delete line breaks', 'text minifier', 'clean text formatting'],
      tldr: 'Automatically scrub extra spaces, tabs, and blank lines from messy text or code blocks.',
      entity_definition: 'The Whitespace Remover is a data sanitization utility. When copying text from PDFs or legacy word processors, invisible whitespace characters (tabs, trailing spaces, carriage returns) are often accidentally included. This creates formatting errors when pasting into CMS platforms or executing code. This tool uses aggressive Regular Expressions to target and strip these invisible characters, allowing users to consolidate multiple spaces into single spaces or completely minify the string.'
    },
    faqs: [
      {
        question: 'What is a trailing space?',
        answer: 'A trailing space is an invisible space character located at the very end of a line of text, after the last visible letter. They are useless, waste database storage, and can break strict string-matching algorithms.'
      },
      {
        question: 'Will this remove all spaces?',
        answer: 'By default, no. It only removes "extra" spaces (e.g., turning two consecutive spaces into one). However, you can select an aggressive mode to completely strip every single space, essentially minifying the text into a single block.'
      },
      {
        question: 'What are carriage returns?',
        answer: 'A carriage return (`\\r`) or line feed (`\\n`) is the invisible character created when you press the Enter key. This tool can detect and strip these to merge multiple paragraphs into one single line.'
      }
    ]
  },
  'duplicate-line-remover': {
    seo: {
      title: 'Duplicate Line Remover — Clean Lists & Datasets',
      description: 'Remove duplicate lines from massive text lists, CSV files, and email databases instantly. Deduplicate your data and sort it alphabetically with one click.',
      keywords: ['duplicate line remover', 'remove duplicate text', 'deduplicate list', 'delete duplicate lines', 'clean email list'],
      tldr: 'Instantly find and delete exact duplicate lines from massive lists and datasets.',
      entity_definition: 'The Duplicate Line Remover is a data cleansing utility. Marketers and data scientists frequently work with massive, unstructured lists (such as raw email databases or web scraping outputs) that contain redundant entries. This tool parses the text block, splitting it into an array of strings, and utilizes a mathematical `Set` data structure to instantly identify and eliminate exact-match duplicates, returning a clean, unique dataset.'
    },
    faqs: [
      {
        question: 'Is it case-sensitive?',
        answer: 'By default, yes. `Email@example.com` and `email@example.com` would be treated as two different, unique lines. You can toggle case-insensitivity to force the tool to treat them as duplicates.'
      },
      {
        question: 'Can it handle millions of lines?',
        answer: 'Yes. Because the tool uses native browser JavaScript `Set` structures rather than slow nested loops, it can deduplicate massive lists in milliseconds without crashing the browser.'
      },
      {
        question: 'Does it remove blank lines too?',
        answer: 'Yes, if you have multiple blank lines, the deduplication algorithm will see them as matching "empty" strings and remove all but one. You can optionally choose to strip all blank lines entirely.'
      }
    ]
  },
  'line-counter': {
    seo: {
      title: 'Line Counter — Count Lines of Text or Code',
      description: 'Count the total number of lines, blank lines, and non-empty lines in a text file or code snippet. Perfect for code audits and data analysis.',
      keywords: ['line counter', 'count lines of code', 'how many lines of text', 'text file line counter', 'LOC calculator'],
      tldr: 'Calculate the total number of lines, including empty and non-empty lines, in your text or code.',
      entity_definition: 'The Line Counter is a text analysis and software auditing utility. In software engineering, "Lines of Code" (LOC) is a historical metric used to measure the size and complexity of a codebase. This tool takes a raw text block or code snippet, detects all line break characters (such as `\\n` for Unix or `\\r\\n` for Windows), and calculates the total line count. It also algorithmically separates blank lines from lines containing actual characters.'
    },
    faqs: [
      {
        question: 'Are blank lines counted?',
        answer: 'Yes. The primary counter calculates every physical line in the document, regardless of content. However, the tool provides a secondary metric that explicitly counts only "non-empty" lines.'
      },
      {
        question: 'Is LOC a good way to measure code quality?',
        answer: 'No. While counting Lines of Code (LOC) shows the sheer volume of a project, a smaller codebase is often better because it implies efficient, refactored logic. Bill Gates famously said, "Measuring programming progress by lines of code is like measuring airplane building weight."'
      },
      {
        question: 'How does it detect a line break?',
        answer: 'It uses Regular Expressions to look for standard hidden newline characters. It supports both Unix/Linux/macOS (`\\n`) and legacy Windows (`\\r\\n`) formats.'
      }
    ]
  },
  'text-reverser': {
    seo: {
      title: 'Text Reverser — Reverse Words and Letters',
      description: 'Reverse the order of letters, words, or entire lines of text. Create backward text for puzzles, passwords, or data obfuscation.',
      keywords: ['text reverser', 'reverse text online', 'backward text generator', 'flip text backwards', 'reverse letters and words'],
      tldr: 'Instantly flip your text backwards. Reverse letter order, word order, or line order.',
      entity_definition: 'The Text Reverser is a string manipulation utility. While writing backwards is difficult for humans, computers process text as mathematical arrays. This tool takes a string of text, splits it into an array (either by character, by word, or by line break), and executes a fast array-reversal algorithm before joining the string back together. It is commonly used for cryptographic puzzles, generating complex passwords, or simple data obfuscation.'
    },
    faqs: [
      {
        question: 'Can I reverse just the words, not the letters?',
        answer: 'Yes. The tool offers a "Reverse Words" mode. Instead of reversing the spelling (e.g., "hello" to "olleh"), it keeps the spelling intact but reverses the sentence structure (e.g., "hello world" becomes "world hello").'
      },
      {
        question: 'Does it work with emojis?',
        answer: 'Emojis are complex Unicode characters often made up of multiple hidden "surrogate pairs." Standard text reversers will break the emoji into meaningless symbols. Our tool uses advanced Unicode parsing to keep emojis intact while reversing the text around them.'
      },
      {
        question: 'Why would someone reverse text?',
        answer: 'Aside from puzzles and games, reversing text is occasionally used in low-level data processing algorithms, or as a crude method of obfuscating emails on a webpage to stop simple spambots from reading them.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 38');
