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
  'text-to-speech-pro': {
    seo: {
      title: 'Text to Speech Engine — AI Voice Generator',
      description: 'Convert written text into natural-sounding speech. Use native browser Speech Synthesis APIs to read articles, essays, and text blocks aloud instantly.',
      keywords: ['text to speech engine', 'ai voice generator', 'read text aloud', 'browser speech synthesis', 'convert text to audio'],
      tldr: 'Convert any text into natural-sounding spoken audio using native browser APIs.',
      entity_definition: 'The Text to Speech (TTS) Engine is a web accessibility utility. Modern browsers ship with a native Web Speech API (`SpeechSynthesis`) that allows websites to translate text directly into spoken audio without relying on external servers. This tool hooks into that API, parsing raw string input and allowing users to select from a list of voices installed on their local operating system, dynamically adjusting pitch and speaking rate to generate real-time audio playback.'
    },
    faqs: [
      {
        question: 'Why do the voices sound different on my phone?',
        answer: 'This tool uses your device\'s native text-to-speech engine. Apple iOS, Android, and Windows all have their own proprietary, pre-installed voice sets, which means the exact same tool will sound different depending on the device you use.'
      },
      {
        question: 'Can I download the audio as an MP3?',
        answer: 'No. Because the audio is generated live by your browser\'s internal engine (not a remote server), it cannot easily be intercepted and downloaded as a static audio file.'
      },
      {
        question: 'Is my text sent to a server?',
        answer: 'No. The Web Speech API processes the text entirely offline on your local machine, ensuring complete privacy for whatever you type.'
      }
    ]
  },
  'case-inverter': {
    seo: {
      title: 'Case Inverter — tOGGLE cASE Converter',
      description: 'Invert the letter casing of your text instantly. Convert uppercase to lowercase, and lowercase to uppercase. Perfect for fixing accidental Caps Lock errors.',
      keywords: ['case inverter', 'toggle case converter', 'invert text case', 'fix caps lock error', 'switch uppercase to lowercase'],
      tldr: 'Instantly swap the capitalization of every letter in a text block.',
      entity_definition: 'The Case Inverter is a typographical formatting utility. Also known as "tOGGLE cASE", this algorithm parses a string of text character by character. It evaluates the current ASCII/Unicode state of the letter—if it detects an uppercase character, it mathematically shifts it to lowercase, and vice versa. It is primarily used to instantly salvage long blocks of text that were accidentally typed with Caps Lock enabled, without needing to retype the entire document.'
    },
    faqs: [
      {
        question: 'What is tOGGLE cASE?',
        answer: 'Toggle case simply means switching the current state of every single letter. An uppercase "A" becomes "a", and a lowercase "b" becomes "B".'
      },
      {
        question: 'Does this affect numbers or punctuation?',
        answer: 'No. Numbers, spaces, and punctuation marks do not have uppercase or lowercase states in computer encoding, so the algorithm ignores them completely.'
      },
      {
        question: 'How do you fix accidental Caps Lock?',
        answer: 'If you typed a sentence with Caps Lock on (e.g., "hELLO wORLD"), pasting it into a Case Inverter instantly transforms it back into the correctly capitalized "Hello World".'
      }
    ]
  },
  'rot13-cipher': {
    seo: {
      title: 'ROT13 Cipher Generator — Encrypt Text Instantly',
      description: 'Encrypt or decrypt text using the classic ROT13 substitution cipher. Hide spoilers, solve geocaching puzzles, and obscure text effortlessly.',
      keywords: ['rot13 cipher generator', 'encrypt text rot13', 'rot 13 decrypt', 'caesar cipher tool', 'hide text spoilers'],
      tldr: 'Encrypt or decrypt text instantly using the classic ROT13 substitution cipher.',
      entity_definition: 'The ROT13 Cipher Generator is a basic cryptographic utility. ROT13 ("rotate by 13 places") is a simple letter substitution cipher that replaces a letter with the 13th letter after it in the Latin alphabet. Because there are 26 letters in the alphabet, ROT13 is its own inverse; applying the algorithm a second time decrypts the text back to its original state. Historically used in early internet forums (Usenet) to hide movie spoilers and punchlines, it remains a popular puzzle and data-obfuscation tool.'
    },
    faqs: [
      {
        question: 'Is ROT13 secure?',
        answer: 'Absolutely not. ROT13 provides zero actual security. It is an incredibly weak cipher meant only for hiding text from a casual glance (like a movie spoiler). Never use it to encrypt passwords or sensitive data.'
      },
      {
        question: 'How do I decrypt ROT13?',
        answer: 'You just run it through the exact same ROT13 tool again! Because the alphabet has 26 letters, shifting 13 places twice brings you exactly back to where you started.'
      },
      {
        question: 'Is ROT13 the same as a Caesar Cipher?',
        answer: 'Yes, ROT13 is a specific variation of the Caesar Cipher. A standard Caesar Cipher can shift letters by any amount (e.g., shifting by 3), while ROT13 strictly shifts by exactly 13.'
      }
    ]
  },
  'contrast-checker': {
    seo: {
      title: 'Color Contrast Checker — WCAG Accessibility',
      description: 'Check the contrast ratio between text and background colors. Ensure your website design complies with strict WCAG AA and AAA accessibility standards.',
      keywords: ['color contrast checker', 'wcag accessibility test', 'check text contrast ratio', 'web design contrast tool', 'ada compliance colors'],
      tldr: 'Calculate the visual contrast ratio between two colors to ensure WCAG accessibility.',
      entity_definition: 'The Color Contrast Checker is a web accessibility and UI design utility. The Web Content Accessibility Guidelines (WCAG) define strict mathematical ratios for how much contrast must exist between text (foreground) and its background to be readable by visually impaired users. This tool calculates the relative luminance of two HEX/RGB colors and outputs a ratio (e.g., 4.5:1). It explicitly passes or fails the combination based on WCAG AA (standard) and AAA (enhanced) requirements for both large and small text.'
    },
    faqs: [
      {
        question: 'What is a good contrast ratio?',
        answer: 'For standard WCAG AA compliance, regular text must have a contrast ratio of at least 4.5:1 against its background. Large text (usually 18pt or 14pt bold) requires a lower ratio of 3.0:1.'
      },
      {
        question: 'What is WCAG AAA?',
        answer: 'WCAG AAA is the strictest level of accessibility compliance, typically required for government or medical websites. It demands a highly legible contrast ratio of 7.0:1 for normal text.'
      },
      {
        question: 'Why did my brand colors fail?',
        answer: 'Many popular "pastel" or "light mode" brand palettes lack sufficient mathematical contrast. To pass, you usually need to darken the text color significantly or lighten the background.'
      }
    ]
  },
  'password-tester': {
    seo: {
      title: 'Password Strength Tester — Security Analyzer',
      description: 'Test the cryptographic strength of your passwords. Calculate entropy, time-to-crack, and detect weak patterns to ensure maximum cybersecurity.',
      keywords: ['password strength tester', 'check password security', 'time to crack calculator', 'password entropy tool', 'secure password analyzer'],
      tldr: 'Analyze the cryptographic strength and estimated "time-to-crack" of any password.',
      entity_definition: 'The Password Strength Tester is a cybersecurity utility. Evaluating a password\'s strength goes far beyond simply checking its length. This tool uses advanced algorithms (often utilizing zxcvbn logic) to analyze the string\'s entropy—checking for sequential patterns (like "1234"), dictionary words, keyboard layouts ("qwerty"), and repeated characters. It calculates a mathematical resistance score and estimates the exact computational time required for a modern GPU to brute-force crack the password.'
    },
    faqs: [
      {
        question: 'Is my password sent to a server?',
        answer: 'No! You should never trust a website that transmits your password. This tool executes the entropy algorithms entirely offline in your local browser, ensuring your data is never captured.'
      },
      {
        question: 'What makes a password strong?',
        answer: 'Length is the most critical factor. A 16-character password made of entirely lowercase letters is computationally much harder to crack than an 8-character password packed with special symbols.'
      },
      {
        question: 'What is password entropy?',
        answer: 'Entropy is a mathematical measurement of how unpredictable a password is. A high entropy score means the password is highly random and resistant to automated brute-force guessing attacks.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 40');
