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
  'json-to-jsonl': {
    seo: {
      title: 'JSON to JSONL Converter — Format Data for LLMs',
      description: 'Convert standard JSON arrays into JSON Lines (JSONL) format instantly. Essential for fine-tuning OpenAI models, streaming large datasets, and log processing.',
      keywords: ['json to jsonl converter', 'convert json to jsonl', 'json lines format', 'openai fine tuning data', 'format data for llm'],
      tldr: 'Convert standard JSON arrays into the JSON Lines (JSONL) format required for AI fine-tuning.',
      entity_definition: 'The JSON to JSONL Converter is a data formatting utility for Machine Learning engineers. Standard JSON is structured as a single massive object or array, which requires loading the entire file into memory to parse. JSON Lines (JSONL) solves this by formatting each individual JSON object on its own dedicated newline. This tool iterates through a standard JSON array and algorithmically serializes each object into a strict newline-delimited string, outputting the exact format required by OpenAI for fine-tuning Large Language Models (LLMs).'
    },
    faqs: [
      {
        question: 'What is JSONL?',
        answer: 'JSONL (JSON Lines) is a text format where every single line of the file is a completely valid, standalone JSON object. It is used for streaming massive datasets because the computer can read it line-by-line without running out of RAM.'
      },
      {
        question: 'Why does OpenAI require JSONL?',
        answer: 'When fine-tuning an LLM, OpenAI processes millions of training examples. If they used standard JSON, the file would be too massive to load into memory at once. JSONL allows them to process the training data sequentially.'
      },
      {
        question: 'Can I convert JSONL back to JSON?',
        answer: 'Yes. To revert JSONL, you simply wrap the entire text block in square brackets `[ ]` and place a comma at the end of every line (except the last one) to reconstruct the standard JSON array.'
      }
    ]
  },
  'rag-optimizer': {
    seo: {
      title: 'RAG Text Optimizer — Clean Text for Vector DBs',
      description: 'Optimize unstructured text for Retrieval-Augmented Generation (RAG). Clean, chunk, and sanitize documents for seamless ingestion into Pinecone or Weaviate.',
      keywords: ['rag text optimizer', 'clean text for vector db', 'retrieval augmented generation tools', 'text chunking for llm', 'prepare data for pinecone'],
      tldr: 'Clean and chunk unstructured text to prepare it for vector database embeddings (RAG).',
      entity_definition: 'The RAG Text Optimizer is an AI data pipeline utility. Retrieval-Augmented Generation (RAG) is a technique where an LLM is given relevant text snippets from a Vector Database (like Pinecone) to answer questions accurately without hallucinating. However, raw PDFs and web scrapes are full of messy whitespace, erratic line breaks, and massive paragraphs that ruin vector similarity searches. This tool sanitizes the text and intelligently "chunks" it into semantically meaningful blocks, optimizing it for accurate vector embedding.'
    },
    faqs: [
      {
        question: 'What is Text Chunking?',
        answer: 'LLMs have a limited "context window." Chunking is the process of breaking a massive document (like a 100-page PDF) into smaller, overlapping paragraphs (chunks) so the AI can retrieve and read only the exact sections relevant to the user\'s question.'
      },
      {
        question: 'Why do I need to clean the text?',
        answer: 'If you embed raw text full of random tabs, double spaces, and broken sentences, the Vector Database will generate mathematical "noise." Clean text ensures the vector embeddings are highly accurate.'
      },
      {
        question: 'What is a Vector Database?',
        answer: 'A Vector Database (like Weaviate or Pinecone) stores data as mathematical arrays (vectors) instead of tables. It allows AI to perform "semantic searches," finding text that means the same thing even if the exact keywords don\'t match.'
      }
    ]
  },
  'prompt-token-calculator': {
    seo: {
      title: 'Prompt Token Calculator — Estimate LLM Costs',
      description: 'Calculate exact Token counts for OpenAI (Tiktoken), Anthropic, and Llama prompts. Estimate API costs and prevent context window overflow errors.',
      keywords: ['prompt token calculator', 'count openai tokens', 'tiktoken estimator', 'calculate llm api cost', 'chatgpt token counter'],
      tldr: 'Algorithmically calculate the exact number of Tokens in a text prompt to estimate AI API costs.',
      entity_definition: 'The Prompt Token Calculator is a Machine Learning DevOps utility. Large Language Models (LLMs) like GPT-4 do not process text as "words"—they process text as "Tokens" (sub-word fragments). Because AI APIs charge per token, and models have strict maximum context limits (e.g., 128k tokens), developers must accurately measure their inputs. This tool utilizes algorithms like OpenAI\'s `tiktoken` (BPE encoding) to break down raw strings into exact token arrays, calculating precise API costs.'
    },
    faqs: [
      {
        question: 'What is a Token?',
        answer: 'A token is a piece of a word. The AI tokenizer splits words based on statistical frequency. A common word like "apple" might be one token, while a complex word like "hamburger" might be split into three tokens: `ham`, `bur`, `ger`.'
      },
      {
        question: 'Is one word equal to one token?',
        answer: 'No. A general rule of thumb for English text is that 1 token is approximately 4 characters, or about 0.75 of a word. 100 tokens generally equals 75 words.'
      },
      {
        question: 'Why do code snippets cost more tokens?',
        answer: 'Code contains a massive amount of punctuation, brackets, and non-standard spacing. Tokenizers often process these special characters as individual tokens, making code significantly more "expensive" to process than plain English sentences.'
      }
    ]
  },
  'json-to-prisma': {
    seo: {
      title: 'JSON to Prisma Schema — Generate ORM Models',
      description: 'Convert JSON objects into valid Prisma Schema models. Instantly scaffold your Node.js database architecture for PostgreSQL, MySQL, or MongoDB.',
      keywords: ['json to prisma schema', 'generate prisma models', 'convert json to database schema', 'prisma orm generator', 'node js database builder'],
      tldr: 'Parse a JSON object and instantly generate valid Node.js Prisma ORM Schema models.',
      entity_definition: 'The JSON to Prisma Schema tool is a backend scaffolding utility. Prisma is a next-generation Object-Relational Mapper (ORM) for Node.js and TypeScript. Writing `schema.prisma` files by hand to define database tables, types, and relations is incredibly tedious. This tool algorithmically parses a sample JSON payload, infers the data types (e.g., String, Int, DateTime, Boolean), detects nested objects to create relational models, and generates the strict Prisma syntax required to run database migrations.'
    },
    faqs: [
      {
        question: 'What is Prisma?',
        answer: 'Prisma is a modern ORM for Node.js. It allows developers to define their database architecture in a clean, readable `schema.prisma` file, and then automatically generates a type-safe TypeScript client to interact with the database.'
      },
      {
        question: 'How does it detect relationships?',
        answer: 'If your JSON contains an array of objects (e.g., a "User" object containing an array of "Posts"), the parser infers a One-to-Many relationship and scaffolds the corresponding relational fields in the Prisma models.'
      },
      {
        question: 'Can it detect Date types?',
        answer: 'Yes. The algorithm checks string values against strict ISO 8601 Regular Expressions. If a string looks like a timestamp (e.g., `2023-10-01T12:00:00Z`), it is mapped to Prisma\'s `DateTime` type instead of a standard `String`.'
      }
    ]
  },
  'json-to-pydantic': {
    seo: {
      title: 'JSON to Pydantic Models — FastAPI Python Classes',
      description: 'Convert JSON payloads into strict Python Pydantic models. Instantly scaffold data validation classes for FastAPI endpoints and Python data pipelines.',
      keywords: ['json to pydantic', 'generate pydantic models', 'json to fastapi schema', 'python data validation', 'convert json to python class'],
      tldr: 'Parse a JSON object and instantly scaffold strict Python Pydantic models for FastAPI.',
      entity_definition: 'The JSON to Pydantic tool is a Python backend development utility. Pydantic is the core data validation library used in modern Python frameworks like FastAPI. It enforces strict type hints at runtime. Writing these class models manually from complex API responses is tedious and prone to human error. This tool recursively traverses a JSON syntax tree, identifying Python native types (`str`, `int`, `float`, `list`), handling Optional/Null fields, and generating beautifully formatted, PEP 8 compliant Pydantic classes.'
    },
    faqs: [
      {
        question: 'What is Pydantic used for?',
        answer: 'Pydantic forces Python (which is normally dynamically typed) to become strictly typed. If a Pydantic model expects an `int` (like an age), and the user sends a `string` (like "twenty"), Pydantic will instantly reject the data and throw a validation error.'
      },
      {
        question: 'Why is this useful for FastAPI?',
        answer: 'FastAPI is built entirely around Pydantic. By generating these models, FastAPI can automatically validate all incoming HTTP POST requests and instantly generate interactive Swagger UI API documentation.'
      },
      {
        question: 'How are nested objects handled?',
        answer: 'If the JSON contains a nested object, the tool recursively generates a separate, distinct Pydantic class for that child object, and then references it within the parent class to maintain proper type composition.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 43');
