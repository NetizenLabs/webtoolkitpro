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
  'json-to-ts': {
    seo: {
      title: 'JSON to TypeScript Interfaces — Generate TS Types Online',
      description: 'Convert JSON payloads into TypeScript interfaces and type definitions instantly. Automate type safety for your React and Node.js applications with our free converter.',
      keywords: ['json to typescript', 'generate ts interface', 'json to ts online', 'typescript type generator', 'json to interface'],
      tldr: 'Generate highly accurate TypeScript interfaces and types directly from JSON payloads.',
      entity_definition: 'JSON to TypeScript Interface is a code generation utility. TypeScript adds static typing to JavaScript, requiring developers to define the exact shape of their data. Instead of manually writing interfaces for massive API responses, this tool parses a JSON payload, recursively analyzes the data types of every property (string, number, boolean, array), and automatically generates the corresponding TypeScript interface declarations, ensuring type safety with zero manual effort.'
    },
    faqs: [
      {
        question: 'Does this handle nested objects?',
        answer: 'Yes. The generator recursively traverses your JSON. If it encounters a nested object, it treats it as a sub-type and generates clean, deeply-typed interfaces.'
      },
      {
        question: 'How does it handle arrays?',
        answer: 'It inspects the first element of the array. If the array contains strings, it generates `string[]`. If it contains objects, it generates an array of the root interface type.'
      },
      {
        question: 'What if a property is sometimes null?',
        answer: 'If the parser encounters a null value, it will safely type it as `any` or `null`, allowing you to manually refine it into an optional property (e.g., `id?: number`) later.'
      }
    ]
  },
  'json-to-go': {
    seo: {
      title: 'JSON to Go Struct — Generate Golang Structs Online',
      description: 'Convert JSON into Golang structs instantly. Automatically generate Go data models complete with JSON struct tags for unmarshaling API responses.',
      keywords: ['json to go', 'json to golang struct', 'go struct generator', 'golang json unmarshal', 'json to go online'],
      tldr: 'Instantly translate JSON objects into Golang structs with automatic JSON tag generation.',
      entity_definition: 'JSON to Go Struct is a backend code generation utility for Golang. When Go applications consume REST APIs, they must unmarshal JSON payloads into strict, statically typed "Structs". This tool automates that tedious process by parsing JSON objects, inferring the underlying types (int vs float64), and generating Go struct definitions complete with the necessary `` `json:"propertyName"` `` struct tags required by the `encoding/json` package.'
    },
    faqs: [
      {
        question: 'Does it support int vs float64?',
        answer: 'Yes! The parser inspects numerical values. If a number has no decimal (e.g., 42), it is typed as an `int`. If it contains a decimal (e.g., 42.5), it is typed as a `float64`.'
      },
      {
        question: 'Are the struct fields capitalized?',
        answer: 'Yes. In Go, struct fields must be capitalized (exported) in order for the `encoding/json` package to unmarshal data into them. Our tool automatically capitalizes your fields while preserving the original casing in the struct tags.'
      },
      {
        question: 'Is my JSON data uploaded?',
        answer: 'No. The parsing and Golang code generation happens 100% locally in your browser.'
      }
    ]
  },
  'json-to-java': {
    seo: {
      title: 'JSON to Java Class (POJO) — Generate Java Models',
      description: 'Generate Plain Old Java Objects (POJO) from JSON payloads. Automate your Java data layer with clean classes, fields, and types instantly.',
      keywords: ['json to java', 'json to pojo', 'java class generator', 'json to java online', 'generate java models'],
      tldr: 'Generate clean Java POJO classes from JSON data for your Spring Boot or Android apps.',
      entity_definition: 'JSON to Java Class (POJO) is an enterprise code generation utility. A Plain Old Java Object (POJO) is a standard Java class used to represent data without inheriting complex framework dependencies. This tool analyzes a JSON string, maps JavaScript primitives to their Java equivalents (e.g., numbers to `int` or `double`, arrays to `List<String>`), and outputs a ready-to-compile Java class definition, drastically speeding up API integration in Spring Boot or Android environments.'
    },
    faqs: [
      {
        question: 'What is a POJO?',
        answer: 'POJO stands for Plain Old Java Object. It is simply a Java class that holds data fields, unbound by any specific Java framework restrictions.'
      },
      {
        question: 'Does this generate Getters and Setters?',
        answer: 'This specific utility generates the raw class structure and public fields. Most modern Java developers use the Lombok library (`@Data`) to auto-generate getters and setters at compile time to keep code clean.'
      },
      {
        question: 'How are JSON arrays handled?',
        answer: 'JSON arrays are mapped to standard Java `List<>` interfaces, typically `List<String>` or a List of a custom sub-class depending on the array contents.'
      }
    ]
  },
  'html-table-to-json': {
    seo: {
      title: 'HTML Table to JSON Extractor — Convert Web Tables',
      description: 'Extract data from any HTML <table> and convert it into a structured JSON array. Perfect for web scraping and migrating legacy data into modern formats.',
      keywords: ['html table to json', 'extract html table', 'web scraper online', 'table to json converter', 'html to json array'],
      tldr: 'Scrape and extract data from raw HTML tables into a clean JSON array of objects.',
      entity_definition: 'The HTML Table to JSON Extractor is a web scraping and data migration utility. Often, valuable data is locked inside static HTML `<table>` tags on older websites. This tool utilizes the browser\'s native `DOMParser` to traverse the HTML tree, extracting text from table headers (`<th>`) to use as JSON object keys, and iterating through rows (`<tr>`) and data cells (`<td>`) to construct a highly structured, machine-readable JSON array.'
    },
    faqs: [
      {
        question: 'Do I paste the URL or the HTML code?',
        answer: 'You must paste the raw HTML code (e.g., `<table>...</table>`). The tool parses the HTML tags directly. It cannot scrape external URLs due to CORS security restrictions.'
      },
      {
        question: 'How does it determine the JSON keys?',
        answer: 'It automatically looks for a `<thead>` or the first `<tr>` containing `<th>` tags. The text inside those header cells becomes the keys for every resulting JSON object.'
      },
      {
        question: 'Will it remove internal HTML tags?',
        answer: 'Yes. By relying on the DOM\'s `.textContent` property, the tool safely strips out any nested formatting tags (like `<b>` or `<a>`) inside the table cells, leaving only clean text.'
      }
    ]
  },
  'xml-to-yaml': {
    seo: {
      title: 'XML to YAML Converter — Modernize Configuration Files',
      description: 'Convert verbose XML data and configurations into clean, human-readable YAML formatting. Perfect for DevOps engineers modernizing legacy infrastructure.',
      keywords: ['xml to yaml', 'xml to yml', 'convert xml to yaml', 'yaml config generator', 'xml parser online'],
      tldr: 'Transform dense, tag-heavy XML documents into clean, indentation-based YAML.',
      entity_definition: 'The XML to YAML Converter is a DevOps configuration utility. While XML relies on verbose opening and closing tags (`<node></node>`), YAML uses clean, indentation-based formatting, making it vastly superior for human readability and version control diffs. This tool recursively traverses an XML Document Object Model, extracting node hierarchies and attributes, and elegantly serializes them into strict YAML syntax, enabling seamless migrations of legacy configurations into modern CI/CD pipelines.'
    },
    faqs: [
      {
        question: 'How are XML attributes converted to YAML?',
        answer: 'Because YAML doesn\'t support native "attributes," our parser preserves them by prepending them with an underscore (e.g., `_id: 123`) directly underneath the parent node in the YAML hierarchy.'
      },
      {
        question: 'Why migrate from XML to YAML?',
        answer: 'YAML is much easier for humans to read and write. It is the industry standard for modern DevOps tools like Docker Compose, Kubernetes, and GitHub Actions, replacing legacy XML configurations.'
      },
      {
        question: 'Does indentation matter in YAML?',
        answer: 'Yes, absolutely. Unlike XML which relies on explicit closing tags, YAML uses exact space indentation to define data hierarchy. Our tool perfectly calculates these indentations automatically.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 22');
