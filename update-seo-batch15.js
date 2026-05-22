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
  'bcrypt-hasher': {
    seo: {
      title: 'Bcrypt Password Hasher — Secure Hash Generator',
      description: 'Generate secure Bcrypt password hashes instantly. Adjust the work factor (rounds) to test hashing performance and salt generation.',
      keywords: ['bcrypt generator', 'bcrypt hash online', 'password hashing', 'generate bcrypt', 'bcrypt simulator'],
      tldr: 'Generate a highly secure, salted Bcrypt password hash instantly in your browser.',
      entity_definition: 'The Bcrypt Hasher is a cryptographic utility that implements the blowfish-based Bcrypt hashing algorithm. Designed by Niels Provos and David Mazières in 1999, Bcrypt remains the industry standard for securely storing user passwords. Unlike fast hashes (MD5, SHA-256), Bcrypt incorporates a "cost factor" (work factor) that artificially slows down the hashing process, making it exponentially more difficult for attackers to execute brute-force or dictionary attacks.'
    },
    faqs: [
      {
        question: 'What does the cost factor (rounds) do?',
        answer: 'The cost factor determines how many iterations of the key expansion algorithm are executed (2^cost). A cost of 10 means 1,024 iterations, while 12 means 4,096. Increasing the cost makes the hash mathematically slower to generate, crippling brute-force attacks.'
      },
      {
        question: 'Why does the same password generate a different hash every time?',
        answer: 'Bcrypt automatically generates a random 16-byte "salt" for every hash. This salt is mathematically combined with your password before hashing, ensuring that two users with the exact same password will have completely different hashes in the database (preventing Rainbow Table attacks).'
      },
      {
        question: 'Is my password sent to a server?',
        answer: 'No. The Bcrypt algorithm in this tool runs entirely on your local machine using client-side JavaScript. Your plain-text password never traverses the network.'
      }
    ]
  },
  'argon2-hasher': {
    seo: {
      title: 'Argon2 Hasher — Generate Argon2id/Argon2i Hashes',
      description: 'Generate secure Argon2 password hashes using WebAssembly. Test Argon2id, Argon2i, and Argon2d variants with custom memory, iterations, and parallelism constraints.',
      keywords: ['argon2 generator', 'argon2id hash online', 'argon2 webassembly', 'password hashing', 'phc string format'],
      tldr: 'Generate memory-hard Argon2 hashes (the winner of the Password Hashing Competition) using WebAssembly.',
      entity_definition: 'The Argon2 Hasher is a next-generation cryptographic utility that implements the Argon2 algorithm, the official winner of the 2015 Password Hashing Competition (PHC). Unlike Bcrypt which only limits CPU speed, Argon2 is "memory-hard." It forces the computer to allocate a massive block of RAM to compute the hash. This specifically defends against attackers using specialized hardware (ASICs and GPUs) which have thousands of cores but very limited individual memory.'
    },
    faqs: [
      {
        question: 'Which Argon2 variant should I use?',
        answer: 'Argon2id is the current industry recommendation. It is a hybrid approach that provides excellent resistance against both side-channel attacks (like Argon2i) and GPU cracking (like Argon2d).'
      },
      {
        question: 'What is the PHC String Format?',
        answer: 'The PHC string format is the standard output structure for modern password hashes. It contains the algorithm name, version, tuning parameters (memory, time, parallelism), the base64-encoded salt, and the actual hash data, all separated by dollar signs (`$`).'
      },
      {
        question: 'How is this running in the browser?',
        answer: 'This tool leverages `hash-wasm`, executing the highly optimized C-based Argon2 algorithm directly inside your browser via WebAssembly, ensuring maximum performance and complete privacy.'
      }
    ]
  },
  'scrypt-hasher': {
    seo: {
      title: 'Scrypt KDF Hasher — Secure Key Derivation Tool',
      description: 'Compute Scrypt hashes with custom cost (N), block size (r), and parallelism (p) factors. A secure, WebAssembly-powered Scrypt simulator.',
      keywords: ['scrypt generator', 'scrypt hash online', 'key derivation function', 'memory hard hash', 'scrypt wasm'],
      tldr: 'Generate memory-hard Scrypt hashes using a high-performance WebAssembly implementation.',
      entity_definition: 'The Scrypt Hasher is a cryptographic utility that executes the Scrypt Key Derivation Function (KDF) designed by Colin Percival. Originally created for the Tarsnap backup system, Scrypt was one of the first algorithms designed explicitly to be "memory-hard." By forcing the algorithm to require large amounts of RAM (tuned via the N, r, and p parameters), it renders custom ASIC mining hardware economically unviable, making it highly secure for password storage and cryptocurrency implementations.'
    },
    faqs: [
      {
        question: 'What do the N, r, and p parameters mean?',
        answer: 'N is the CPU/Memory cost factor (must be a power of 2). r is the block size (dictating the underlying hash size). p is the parallelization parameter (how many independent threads can be used).'
      },
      {
        question: 'Is Scrypt better than Bcrypt?',
        answer: 'Yes. Because Bcrypt only requires a few kilobytes of RAM, modern GPUs can crack thousands of Bcrypt hashes simultaneously. Scrypt\'s massive memory requirement prevents GPUs from running multiple cracks in parallel.'
      },
      {
        question: 'Does this execute securely?',
        answer: 'Yes. By utilizing WebAssembly (`hash-wasm`), the complex mathematical operations required by Scrypt are executed natively and securely within your browser\'s local sandbox.'
      }
    ]
  },
  'hmac-generator': {
    seo: {
      title: 'HMAC Generator — Sign Data with SHA-256',
      description: 'Generate HMAC (Hash-based Message Authentication Code) signatures instantly. Sign payloads using secure keys and algorithms like SHA-256, SHA-384, or SHA-512.',
      keywords: ['hmac generator', 'hmac sha256 online', 'generate hmac signature', 'message authentication code', 'jwt signature'],
      tldr: 'Cryptographically sign data payloads using a secret key and standard HMAC algorithms.',
      entity_definition: 'The HMAC Generator is a cryptographic utility that produces a Hash-based Message Authentication Code (HMAC). Used extensively in modern web development (including JWT token signing and OAuth API authentication), HMAC combines a cryptographic hash function (like SHA-256) with a secret cryptographic key. This process generates an unforgeable signature that guarantees both the data integrity (it hasn\'t been tampered with) and the authenticity (it was created by someone possessing the secret key).'
    },
    faqs: [
      {
        question: 'Why not just hash the data without a key?',
        answer: 'If you only hash the data (e.g., standard SHA-256), a Man-in-the-Middle attacker could alter your data payload, generate a new SHA-256 hash, and pass it along. Because HMAC requires a secret key known only to the sender and receiver, an attacker cannot generate a valid signature for their altered data.'
      },
      {
        question: 'Is this tool safe for real API keys?',
        answer: 'Yes. The tool utilizes the `window.crypto.subtle` API built directly into modern web browsers. The cryptographic signing happens entirely on your local machine; your secret key is never transmitted.'
      },
      {
        question: 'Which hashing algorithm should I use?',
        answer: 'HMAC-SHA256 is the current industry standard and is widely used for JWTs and API webhooks. SHA-512 offers even higher security for extreme use-cases, while SHA-1 is considered legacy and should be avoided for new systems.'
      }
    ]
  },
  'aes-encryption': {
    seo: {
      title: 'AES-256 GCM Encryption — Secure Browser Decryption',
      description: 'Encrypt and decrypt data securely in your browser using military-grade AES-256-GCM encryption. Powered by the native Web Crypto API for maximum security.',
      keywords: ['aes encryption online', 'aes 256 gcm', 'encrypt text online', 'aes decrypt online', 'web crypto api'],
      tldr: 'Securely encrypt and decrypt sensitive text using military-grade AES-256-GCM in your browser.',
      entity_definition: 'The AES Encryption tool is a high-security utility that implements the Advanced Encryption Standard (AES) utilizing the Galois/Counter Mode (GCM). Adopted by the U.S. government, AES is a symmetric-key algorithm (the same key is used to both encrypt and decrypt the data). GCM is specifically chosen because it provides Authenticated Encryption—meaning it not only encrypts the payload to preserve confidentiality but also cryptographically guarantees that the ciphertext has not been tampered with in transit.'
    },
    faqs: [
      {
        question: 'How is the Initialization Vector (IV) handled?',
        answer: 'AES-GCM requires a unique, random Initialization Vector for every encryption operation to prevent pattern analysis. This tool generates a cryptographically secure 12-byte IV, prepends it to the resulting ciphertext, and automatically extracts it during the decryption phase.'
      },
      {
        question: 'Can you recover my data if I forget the password?',
        answer: 'No. The encryption executes entirely on your local machine via the `window.crypto.subtle` API. We do not transmit, log, or store your passwords or ciphertext. If you lose your password, the data is mathematically unrecoverable.'
      },
      {
        question: 'What is symmetric vs asymmetric encryption?',
        answer: 'AES is symmetric, meaning you use the exact same password to lock and unlock the data. Asymmetric encryption (like RSA) uses two separate keys: a Public Key to lock the data, and a Private Key to unlock it.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 15');
