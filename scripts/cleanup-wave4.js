const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const componentsToDelete = [
  'CssMinifier.tsx', 'CssFormatter.tsx', 'CssShadowGen.tsx', 'CssKeyframes.tsx', 'CssGradientGenerator.tsx',
  'HeaderInspector.tsx', 'CacheHeaderGen.tsx',
  'RobotsGenerator.tsx', 'RobotsValidator.tsx', 'RobotsTxtTemplates.tsx',
  'HexToRgb.tsx', 'RgbaToHex.tsx', 'ColorPicker.tsx',
  'PxToRem.tsx', 'RemToPx.tsx',
  'BrowserCompat.tsx', 'AuthoritySimulation.tsx',
  'CoreWebVitalsGuide.tsx', 'SeoAuditChecklist.tsx'
];

const basePath = path.join(__dirname, '..', 'components', 'tools', 'instances');

let deleted = 0;
for (const file of componentsToDelete) {
  const filePath = path.join(basePath, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log('Deleted:', file);
    deleted++;
  }
}
console.log('Total components deleted:', deleted);

// 1. UPDATE NEXT.CONFIG.JS
const nextConfigPath = path.join(__dirname, '..', 'next.config.js');
let nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');

const wave4Redirects = `
      // Wave 4 Consolidation & Cleanup
      { source: '/tools/css-minifier', destination: '/tools/css-formatter-minifier/', permanent: true },
      { source: '/tools/css-formatter', destination: '/tools/css-formatter-minifier/', permanent: true },
      { source: '/tools/css-shadow-gen', destination: '/tools/css-generators/', permanent: true },
      { source: '/tools/css-keyframes', destination: '/tools/css-generators/', permanent: true },
      { source: '/tools/css-gradient-generator', destination: '/tools/css-generators/', permanent: true },
      { source: '/tools/header-inspector', destination: '/tools/http-headers-inspector/', permanent: true },
      { source: '/tools/cache-header-gen', destination: '/tools/http-headers-inspector/', permanent: true },
      { source: '/tools/robots-generator', destination: '/tools/robots-txt-toolkit/', permanent: true },
      { source: '/tools/robots-validator', destination: '/tools/robots-txt-toolkit/', permanent: true },
      { source: '/tools/robots-txt-templates', destination: '/tools/robots-txt-toolkit/', permanent: true },
      { source: '/tools/hex-to-rgb', destination: '/tools/color-converter/', permanent: true },
      { source: '/tools/rgba-to-hex', destination: '/tools/color-converter/', permanent: true },
      { source: '/tools/color-picker', destination: '/tools/color-converter/', permanent: true },
      { source: '/tools/px-to-rem', destination: '/tools/px-rem-converter/', permanent: true },
      { source: '/tools/rem-to-px', destination: '/tools/px-rem-converter/', permanent: true },
      { source: '/tools/browser-compat', destination: '/tools/browser-compat-checker/', permanent: true },
      { source: '/tools/authority-simulation', destination: '/tools/authority-simulator/', permanent: true },
      { source: '/tools/core-web-vitals-guide', destination: '/blog/core-web-vitals-guide/', permanent: true },
      { source: '/tools/seo-audit-checklist', destination: '/blog/seo-audit-checklist/', permanent: true },
`;

if (!nextConfigContent.includes('Wave 4 Consolidation')) {
  nextConfigContent = nextConfigContent.replace('// Tools Consolidation Redirects', wave4Redirects + '      // Tools Consolidation Redirects');
  // Annotate SQL Redirects
  nextConfigContent = nextConfigContent.replace(
    "{ source: '/tools/sql-injection-tester', destination: '/tools/sql-toolkit/', permanent: true },",
    "// Note: SQL Injection tools intentionally mapped here during Wave 2\n      { source: '/tools/sql-injection-tester', destination: '/tools/sql-toolkit/', permanent: true },"
  );
  fs.writeFileSync(nextConfigPath, nextConfigContent, 'utf8');
  console.log('Wave 4 redirects added to next.config.js');
}

// 2. UPDATE TOOL-REGISTRY.TSX
const registryPath = path.join(__dirname, '..', 'lib', 'tool-registry.tsx');
let registryContent = fs.readFileSync(registryPath, 'utf8');

const obsoleteKeys = [
  'css-minifier', 'css-formatter', 'css-shadow-gen', 'css-keyframes', 'css-gradient-generator',
  'header-inspector', 'cache-header-gen',
  'robots-generator', 'robots-validator', 'robots-txt-templates',
  'hex-to-rgb', 'rgba-to-hex', 'color-picker',
  'px-to-rem', 'rem-to-px',
  'browser-compat', 'authority-simulation',
  'core-web-vitals-guide', 'seo-audit-checklist'
];

const lines = registryContent.split('\\n');
const newLines = lines.filter(line => {
  for (const key of obsoleteKeys) {
    if (line.includes("'" + key + "': dynamic(")) return false;
  }
  return true;
});

let updatedRegistry = newLines.join('\\n');

const newComponents = `
  // Wave 4 Consolidated Masters
  'css-formatter-minifier': dynamic(() => import('../components/tools/instances/CssFormatterMinifier'), { ssr: false }),
  'css-generators': dynamic(() => import('../components/tools/instances/CssGenerators'), { ssr: false }),
  'robots-txt-toolkit': dynamic(() => import('../components/tools/instances/RobotsTxtToolkit'), { ssr: false }),
  'color-converter': dynamic(() => import('../components/tools/instances/ColorConverter'), { ssr: false }),
  'px-rem-converter': dynamic(() => import('../components/tools/instances/PxRemConverter'), { ssr: false }),
`;

if (!updatedRegistry.includes('css-formatter-minifier')) {
  updatedRegistry = updatedRegistry.replace('// Batch 1: Core Utilities', newComponents + '\\n  // Batch 1: Core Utilities');
  fs.writeFileSync(registryPath, updatedRegistry, 'utf8');
  console.log('Wave 4 tools mapped in tool-registry.tsx');
}

// 3. UPDATE TOOLS.YAML
const toolsYamlPath = path.join(__dirname, '..', 'config', 'tools.yaml');
const fileContents = fs.readFileSync(toolsYamlPath, 'utf8');
let toolsData = yaml.load(fileContents);

toolsData.tools = toolsData.tools.filter(tool => !obsoleteKeys.includes(tool.slug));

const newTools = [
  {
    name: 'CSS Formatter & Minifier',
    slug: 'css-formatter-minifier',
    category: 'Developer Tools',
    icon: 'FileCode',
    tags: ['css', 'formatter', 'minifier', 'beautifier'],
    priority: 10,
    releaseDate: '2026-05-30',
    function: { primary: 'Format and minify CSS code' },
    technical: { processing: 'client-side' },
    meta: {
      title: 'CSS Formatter & Minifier | Clean & Compress Stylesheets',
      description: 'Format messy CSS into readable code or minify it for production. 100% client-side for zero latency.'
    },
    content: {
      title: 'CSS Formatter & Minifier',
      description: 'Quickly prettify unreadable CSS strings, or compress them down to strip out all unnecessary whitespace before deploying to production.',
      how_it_works: 'All formatting is performed locally using robust regex engines running in your browser.',
      keywords: ['css formatter', 'css minifier', 'beautify css']
    },
    seo: {
      title: 'CSS Formatter & Minifier | Clean & Compress Stylesheets',
      description: 'Format messy CSS into readable code or minify it for production. 100% client-side for zero latency.',
      keywords: ['css formatter', 'css minifier', 'beautify css']
    }
  },
  {
    name: 'CSS Generators Toolkit',
    slug: 'css-generators',
    category: 'Design Tools',
    icon: 'Palette',
    tags: ['css', 'generator', 'shadow', 'gradient', 'keyframes'],
    priority: 10,
    releaseDate: '2026-05-30',
    function: { primary: 'Generate CSS for shadows, gradients, and animations' },
    technical: { processing: 'client-side' },
    meta: {
      title: 'CSS Shadow, Gradient & Animation Generator',
      description: 'Instantly generate cross-browser CSS code for complex box-shadows, linear gradients, and keyframe animations.'
    },
    content: {
      title: 'CSS Generators Toolkit',
      description: 'A visual sandbox for generating complex CSS properties. Dial in your drop shadows, blend your perfect gradient, and easily structure CSS keyframe animations.',
      how_it_works: 'Visual slider inputs are mapped to live DOM styles and immediately compiled into copy-pasteable CSS rules.',
      keywords: ['css shadow generator', 'css gradient maker', 'css keyframes animation generator']
    },
    seo: {
      title: 'CSS Shadow, Gradient & Animation Generator',
      description: 'Instantly generate cross-browser CSS code for complex box-shadows, linear gradients, and keyframe animations.',
      keywords: ['css shadow generator', 'css gradient maker', 'css keyframes animation generator']
    }
  },
  {
    name: 'Robots.txt Toolkit',
    slug: 'robots-txt-toolkit',
    category: 'SEO Tools',
    icon: 'FileCode2',
    tags: ['seo', 'robots', 'crawler', 'generator', 'validator'],
    priority: 10,
    releaseDate: '2026-05-30',
    function: { primary: 'Generate, Validate, and browse Robots.txt templates' },
    technical: { processing: 'client-side' },
    meta: {
      title: 'Robots.txt Generator & Validator Toolkit',
      description: 'Easily generate a standard robots.txt file, validate your existing file for syntax errors, or browse pre-made templates.'
    },
    content: {
      title: 'Robots.txt Generator & Validator Toolkit',
      description: 'A complete workbench for managing crawler access. Generate new rules, validate your syntax against the official robots exclusion protocol, and explore common templates for WordPress and blocking AI bots.',
      how_it_works: 'Validates syntax by splitting string entries and evaluating regex conditions locally against standard directives.',
      keywords: ['robots txt generator', 'robots txt validator', 'block ai bots robots txt']
    },
    seo: {
      title: 'Robots.txt Generator & Validator Toolkit',
      description: 'Easily generate a standard robots.txt file, validate your existing file for syntax errors, or browse pre-made templates.',
      keywords: ['robots txt generator', 'robots txt validator', 'block ai bots robots txt']
    }
  },
  {
    name: 'Color Converter & Picker',
    slug: 'color-converter',
    category: 'Design Tools',
    icon: 'Palette',
    tags: ['color', 'hex', 'rgba', 'converter', 'picker'],
    priority: 10,
    releaseDate: '2026-05-30',
    function: { primary: 'Convert between HEX and RGBA values' },
    technical: { processing: 'client-side' },
    meta: {
      title: 'HEX to RGBA Color Converter & Picker',
      description: 'Instantly convert between Hexadecimal and RGBA color strings. Use the visual sliders to fine-tune opacity and RGB values.'
    },
    content: {
      title: 'Color Converter & Picker',
      description: 'Convert between Hex and RGBA colors instantly. The visual workbench lets you input any color format and immediately output the equivalent syntax.',
      how_it_works: 'Performs mathematical conversion between base-16 and base-10 values in real-time.',
      keywords: ['hex to rgb', 'rgba to hex converter', 'css color picker']
    },
    seo: {
      title: 'HEX to RGBA Color Converter & Picker',
      description: 'Instantly convert between Hexadecimal and RGBA color strings. Use the visual sliders to fine-tune opacity and RGB values.',
      keywords: ['hex to rgb', 'rgba to hex converter', 'css color picker']
    }
  },
  {
    name: 'PX to REM Converter',
    slug: 'px-rem-converter',
    category: 'Design Tools',
    icon: 'Ruler',
    tags: ['css', 'px', 'rem', 'converter', 'accessibility'],
    priority: 10,
    releaseDate: '2026-05-30',
    function: { primary: 'Bidirectional conversion between Pixels and REMs' },
    technical: { processing: 'client-side' },
    meta: {
      title: 'PX to REM & REM to PX Converter',
      description: 'A bidirectional CSS unit converter for modern web typography. Instantly translate Pixels to REMs based on your root font size.'
    },
    content: {
      title: 'PX to REM Converter',
      description: 'Instantly convert pixels to relative root EM (REM) values to ensure your typography and layouts scale accessibly for all users.',
      how_it_works: 'Divides your target pixel value by the declared root HTML font size (typically 16px) to determine the exact REM equivalent.',
      keywords: ['px to rem converter', 'rem to px calculator', 'css unit conversion']
    },
    seo: {
      title: 'PX to REM & REM to PX Converter',
      description: 'A bidirectional CSS unit converter for modern web typography. Instantly translate Pixels to REMs based on your root font size.',
      keywords: ['px to rem converter', 'rem to px calculator', 'css unit conversion']
    }
  }
];

const existingSlugs = new Set(toolsData.tools.map(t => t.slug));
for (const newTool of newTools) {
  if (!existingSlugs.has(newTool.slug)) {
    toolsData.tools.unshift(newTool);
  }
}

fs.writeFileSync(toolsYamlPath, yaml.dump(toolsData, { lineWidth: 500 }), 'utf8');
console.log('Wave 4 YAML updated.');
