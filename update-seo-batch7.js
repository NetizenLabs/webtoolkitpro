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
  'yaml-to-json': {
    seo: {
      title: 'YAML to JSON Converter — Online Serialization Tool',
      description: 'Convert YAML configuration files to valid JSON instantly. A secure, client-side data serialization utility for DevOps engineers and frontend developers.',
      keywords: ['yaml to json', 'convert yaml to json', 'yaml parser online', 'json serialization', 'devops yaml converter'],
      tldr: 'Instantly parse and serialize YAML configuration data into a standard JSON payload.',
      entity_definition: 'The YAML to JSON Converter is a structural data parsing utility that translates YAML (YAML Ain\'t Markup Language) into JSON (JavaScript Object Notation). YAML is heavily utilized in DevOps (Docker, Kubernetes, CI/CD pipelines) due to its human-readable indentation. However, web applications and APIs fundamentally require JSON to communicate. This tool utilizes an Abstract Syntax Tree (AST) to ingest the YAML structure, resolve anchors and aliases, and safely serialize the output into a strictly formatted, machine-readable JSON string.'
    },
    faqs: [
      {
        question: 'Are YAML and JSON the same thing?',
        answer: 'Technically, YAML 1.2 is a superset of JSON, meaning any valid JSON document is also a valid YAML document. However, YAML introduces complex features like relational anchors, explicit data typing, and comments, which JSON strictly forbids.'
      },
      {
        question: 'Is it safe to convert sensitive API keys?',
        answer: 'Yes. This tool operates 100% locally within your browser\'s memory cache via JavaScript. No data is ever transmitted to an external server, guaranteeing the security of your Kubernetes secrets and CI/CD variables.'
      },
      {
        question: 'Why did my YAML fail to convert?',
        answer: 'YAML relies strictly on spaces for indentation (tabs are strictly prohibited). If your YAML file throws a parsing error, check for mixed tabs and spaces, or unescaped colons in your string values.'
      }
    ]
  },
  'json-to-yaml': {
    seo: {
      title: 'JSON to YAML Converter — Format API Data to YAML',
      description: 'Instantly convert complex JSON objects into human-readable YAML configurations. Ideal for generating Kubernetes manifests and GitHub Actions workflows.',
      keywords: ['json to yaml', 'convert json to yaml online', 'json to yml', 'kubernetes yaml generator', 'json to yaml formatter'],
      tldr: 'Convert strict JSON data structures into human-readable YAML configuration files.',
      entity_definition: 'The JSON to YAML Converter is a data transformation utility that translates strict JavaScript Object Notation (JSON) into YAML format. While JSON is the universal standard for API communication, its heavy reliance on brackets, braces, and double-quotes makes it tedious for humans to read and edit. By converting JSON payloads into YAML, developers can generate clean, indentation-based configuration files suitable for infrastructure-as-code platforms like Ansible, Terraform, and Kubernetes.'
    },
    faqs: [
      {
        question: 'What is the main benefit of converting JSON to YAML?',
        answer: 'Readability. YAML strips away the syntactic noise of JSON (commas, curly braces, and strict quotation marks), relying instead on semantic indentation. This makes massive configuration files significantly easier for humans to audit.'
      },
      {
        question: 'Does converting JSON to YAML alter my data?',
        answer: 'No. The conversion process is lossless. Arrays remain arrays, nested objects remain nested, and data types (booleans, integers, strings) are preserved perfectly during the translation.'
      },
      {
        question: 'Can YAML contain comments?',
        answer: 'Yes, this is one of YAML\'s greatest advantages over JSON. While you cannot put comments in standard JSON, once converted to YAML, you can freely annotate your configurations using the hashtag (#) symbol.'
      }
    ]
  },
  'xml-to-json': {
    seo: {
      title: 'XML to JSON Converter — Modernize Legacy API Data',
      description: 'Convert legacy XML data structures into clean, modern JSON format. Easily migrate SOAP API responses into RESTful JSON for frontend JavaScript applications.',
      keywords: ['xml to json converter', 'convert xml to json online', 'soap to rest data', 'xml parser', 'json data generator'],
      tldr: 'Migrate and translate complex XML node trees into clean, JavaScript-ready JSON objects.',
      entity_definition: 'The XML to JSON Converter is a structural translation utility designed to bridge legacy systems with modern web architecture. Extensible Markup Language (XML) relies on verbose, nested tags and attributes, making it computationally heavy for browsers to parse. This tool employs a recursive Document Object Model (DOM) traversing algorithm to walk the XML tree, extract node values and @attributes, and serialize them into a lightweight JSON object, enabling seamless integration with React, Vue, and modern REST APIs.'
    },
    faqs: [
      {
        question: 'How are XML attributes converted to JSON?',
        answer: 'Because JSON does not have a native concept of "attributes" vs "node values," the converter nests XML attributes inside a specialized `@attributes` object key within the generated JSON structure to prevent data loss.'
      },
      {
        question: 'Why is JSON preferred over XML?',
        answer: 'JSON is native to JavaScript. While parsing XML requires a heavy DOMParser and recursive querying, JSON can be parsed natively into a JavaScript object in a fraction of a millisecond using JSON.parse().'
      },
      {
        question: 'Can this tool handle massive SOAP API payloads?',
        answer: 'Yes. Because the conversion happens synchronously within the client\'s local JavaScript thread, the only limitation is your browser\'s allocated RAM. It can easily handle multi-megabyte XML files in seconds.'
      }
    ]
  },
  'json-to-xml': {
    seo: {
      title: 'JSON to XML Converter — API Data Translation Tool',
      description: 'Convert modern JSON objects back into valid XML format. Essential for integrating modern REST API outputs with legacy SOAP enterprise systems.',
      keywords: ['json to xml', 'convert json to xml online', 'json payload to xml', 'rest to soap', 'generate xml from json'],
      tldr: 'Format JSON objects into structured XML node trees for legacy system integration.',
      entity_definition: 'The JSON to XML Converter is a reverse-serialization utility that transforms JavaScript Object Notation into Extensible Markup Language. While modern development heavily favors JSON, many enterprise financial systems, RSS feeds, and legacy SOAP APIs strictly require XML inputs. This tool recursively analyzes the JSON keys and values, wrapping each data point in mathematically corresponding open and close tags (<key>value</key>), and wrapping the entire payload in a designated Root Element.'
    },
    faqs: [
      {
        question: 'What is a Root Element?',
        answer: 'Unlike JSON, which can exist as an anonymous array or object, a valid XML document MUST have exactly one parent container that wraps all other elements. The tool allows you to define this container (defaulting to <root>).'
      },
      {
        question: 'How does it handle JSON arrays?',
        answer: 'When the parser encounters an array in JSON, it iterates through the items and wraps each one in a tag matching the parent key name, effectively creating repeating sibling nodes in the XML output.'
      },
      {
        question: 'Is the generated XML compliant with SOAP?',
        answer: 'The tool generates mathematically valid, well-formed XML 1.0. However, to communicate with a SOAP server, you may still need to manually wrap the output in a specific SOAP Envelope.'
      }
    ]
  },
  'csv-to-json': {
    seo: {
      title: 'CSV to JSON Converter — Spreadsheet Data Parser',
      description: 'Convert CSV (Comma-Separated Values) spreadsheet data into an array of JSON objects instantly. Essential for importing Excel data into NoSQL databases.',
      keywords: ['csv to json', 'convert csv to json', 'spreadsheet to json', 'excel to json', 'csv parser online'],
      tldr: 'Instantly parse flat CSV spreadsheet data into a highly structured JSON array.',
      entity_definition: 'The CSV to JSON Converter is a flat-file parsing utility that transforms tabular spreadsheet data into structured object arrays. Comma-Separated Values (CSV) is the universal export format for relational databases and Excel spreadsheets. This tool executes a split-parsing algorithm: it designates the first row as the key header, loops through subsequent rows, and maps every comma-delimited string to its corresponding header key, generating an array of JSON objects perfect for importing into MongoDB or Node.js environments.'
    },
    faqs: [
      {
        question: 'Does the CSV require a header row?',
        answer: 'Yes. The algorithm requires the very first row of the CSV to contain the column names. These names are mapped directly as the "keys" for every JSON object generated.'
      },
      {
        question: 'How are commas inside text handled?',
        answer: 'Standard CSV format wraps text containing commas in double quotes (e.g., "Smith, John"). The parser attempts to identify these boundaries and strip the surrounding quotes without splitting the inner string.'
      },
      {
        question: 'Why convert CSV to JSON?',
        answer: 'While CSV is excellent for human-readable spreadsheets, JSON is the required format for interacting with modern NoSQL databases (like MongoDB, Firebase) and transmitting data payloads via web APIs.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 7');
