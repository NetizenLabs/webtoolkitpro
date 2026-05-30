const fs = require('fs');
const path = require('path');

const componentsToDelete = [
  // Binary
  'BinaryConverter.tsx', 'BinaryToDecimal.tsx', 'DecimalToBinary.tsx', 'BinaryToHex.tsx', 'HexToBinary.tsx', 'TextToBinary.tsx', 'BinaryToText.tsx',
  // Base64
  'Base64Encoder.tsx', 'Base64ToImage.tsx', 'ImageToBase64.tsx',
  // Text Case
  'CaseConverter.tsx', 'TitleCase.tsx', 'CaseInverter.tsx', 'TextReverser.tsx', 'TextCleaner.tsx', 'WhitespaceRemover.tsx', 'DuplicateLineRemover.tsx',
  // JWT
  'JwtDecoder.tsx', 'JwtSigner.tsx', 'JwtDebugger.tsx',
  // Alt text
  'AltTextAudit.tsx'
];

const basePath = path.join(__dirname, '..', 'components', 'tools', 'instances');

let deleted = 0;
for (const file of componentsToDelete) {
  const filePath = path.join(basePath, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log('Deleted:', file);
    deleted++;
  } else {
    console.log('File not found (already deleted?):', file);
  }
}

console.log('Total deleted:', deleted);

// Next: apply wave 3 redirects to next.config.js and update tool-registry.tsx
const nextConfigPath = path.join(__dirname, '..', 'next.config.js');
let nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');

const wave3Redirects = `
      // Wave 3 Consolidation
      { source: '/tools/binary-converter', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/binary-to-decimal', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/decimal-to-binary', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/binary-to-hex', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/hex-to-binary', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/text-to-binary', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/binary-to-text', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/base64-encoder', destination: '/tools/base64-encoder-decoder/', permanent: true },
      { source: '/tools/base64-to-image', destination: '/tools/base64-encoder-decoder/', permanent: true },
      { source: '/tools/image-to-base64', destination: '/tools/base64-encoder-decoder/', permanent: true },
      { source: '/tools/case-converter', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/title-case', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/case-inverter', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/text-reverser', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/text-cleaner', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/whitespace-remover', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/duplicate-line-remover', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/jwt-decoder', destination: '/tools/jwt-decoder-generator/', permanent: true },
      { source: '/tools/jwt-signer', destination: '/tools/jwt-decoder-generator/', permanent: true },
      { source: '/tools/jwt-debugger', destination: '/tools/jwt-decoder-generator/', permanent: true },
      { source: '/tools/alt-text-audit', destination: '/tools/alt-text-auditor/', permanent: true },
`;

if (!nextConfigContent.includes('Wave 3 Consolidation')) {
  nextConfigContent = nextConfigContent.replace('// Tools Consolidation Redirects', wave3Redirects + '      // Tools Consolidation Redirects');
  fs.writeFileSync(nextConfigPath, nextConfigContent, 'utf8');
  console.log('Wave 3 redirects added to next.config.js');
}

// Update registry
const registryPath = path.join(__dirname, '..', 'lib', 'tool-registry.tsx');
let registryContent = fs.readFileSync(registryPath, 'utf8');

const obsoleteKeys = [
  'binary-converter', 'binary-to-decimal', 'decimal-to-binary', 'binary-to-hex', 'hex-to-binary', 'text-to-binary', 'binary-to-text',
  'base64-encoder', 'base64-to-image', 'image-to-base64',
  'case-converter', 'title-case', 'case-inverter', 'text-reverser', 'text-cleaner', 'whitespace-remover', 'duplicate-line-remover',
  'jwt-decoder', 'jwt-signer', 'jwt-debugger',
  'alt-text-audit'
];

const lines = registryContent.split('\n');
const newLines = lines.filter(line => {
  for (const key of obsoleteKeys) {
    if (line.includes("'" + key + "': dynamic(")) return false;
  }
  return true;
});

let updatedRegistry = newLines.join('\n');

const newComponents = `
  // Wave 3 Consolidated Masters
  'binary-hex-decimal-converter': dynamic(() => import('../components/tools/instances/BinaryHexDecimalConverter'), { ssr: false }),
  'base64-encoder-decoder': dynamic(() => import('../components/tools/instances/Base64EncoderDecoder'), { ssr: false }),
  'text-case-formatter': dynamic(() => import('../components/tools/instances/TextCaseFormatter'), { ssr: false }),
  'jwt-decoder-generator': dynamic(() => import('../components/tools/instances/JwtDecoderGenerator'), { ssr: false }),
`;

if (!updatedRegistry.includes('binary-hex-decimal-converter')) {
  updatedRegistry = updatedRegistry.replace('// Batch 1: Core Utilities', newComponents + '\n  // Batch 1: Core Utilities');
  fs.writeFileSync(registryPath, updatedRegistry, 'utf8');
  console.log('Wave 3 tools mapped in tool-registry.tsx');
}
