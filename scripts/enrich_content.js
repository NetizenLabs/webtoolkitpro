const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

// Ensure you have installed 'openai': npm install openai
// Set your API key via environment variable: export OPENAI_API_KEY="your-key-here"
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const toolsYamlPath = path.join(__dirname, '../config/tools.yaml');

async function processThinTools() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("ERROR: OPENAI_API_KEY environment variable is missing.");
    process.exit(1);
  }

  const file = fs.readFileSync(toolsYamlPath, 'utf8');
  const doc = yaml.load(file);

  let updatedCount = 0;

  for (let i = 0; i < doc.tools.length; i++) {
    const tool = doc.tools[i];
    const content = tool.content;

    if (!content) continue;

    const hasGoodFaq = content.faq && content.faq.length > 1 && content.faq[0].answer.length > 50;
    const hasGoodUseCases = content.use_cases && content.use_cases.length > 2;
    const hasGoodHowItWorks = content.how_it_works && content.how_it_works.length > 50;

    if (!hasGoodFaq || !hasGoodUseCases || !hasGoodHowItWorks) {
      console.log(`\n[${updatedCount + 1}] Processing: ${tool.name} (${tool.slug})...`);
      
      const prompt = `
      You are an expert technical SEO copywriter. I need to enrich the content for a web tool called "${tool.name}" (Description: ${tool.meta?.description || tool.content?.description}).
      
      Requirements:
      1. Write in plain, humanized English. No generic AI jargon. Write like a senior developer explaining it to a junior.
      2. Focus on practical search intent and real-world use cases.
      3. Return ONLY a valid JSON object matching this exact schema:
      {
        "tldr": "A 1-2 sentence quick summary of what the tool does.",
        "entity_definition": "A comprehensive paragraph explaining what this technology/concept is.",
        "how_it_works": "A paragraph explaining how the tool functions locally in the browser.",
        "use_cases": [ "Use case 1", "Use case 2", "Use case 3", "Use case 4" ],
        "faq": [
          { "question": "Question 1?", "answer": "Answer 1" },
          { "question": "Question 2?", "answer": "Answer 2" },
          { "question": "Question 3?", "answer": "Answer 3" }
        ]
      }
      `;

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" }
        });

        const newContent = JSON.parse(response.choices[0].message.content);

        // Merge the new generated content back into the tool object
        doc.tools[i].content.tldr = newContent.tldr;
        doc.tools[i].content.entity_definition = newContent.entity_definition;
        doc.tools[i].content.how_it_works = newContent.how_it_works;
        doc.tools[i].content.use_cases = newContent.use_cases;
        doc.tools[i].content.faq = newContent.faq;

        console.log(`✅ Successfully enriched ${tool.name}`);
        updatedCount++;
      } catch (error) {
        console.error(`❌ Failed to process ${tool.name}:`, error.message);
      }
    }
  }

  if (updatedCount > 0) {
    // Write back to tools.yaml safely
    // Using styles options to ensure strings are properly quoted if they contain special chars
    const newYaml = yaml.dump(doc, { lineWidth: -1, noRefs: true, quotingType: '"' });
    fs.writeFileSync(toolsYamlPath, newYaml, 'utf8');
    console.log(`\n🎉 Finished! Successfully updated ${updatedCount} tools in tools.yaml.`);
  } else {
    console.log("\nNo thin tools found!");
  }
}

processThinTools();
