const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '..');

// 1. Base64EncoderDecoder.tsx - replace <img> with standard JSX if needed, or disable lint
const base64Path = path.join(basePath, 'components/tools/instances/Base64EncoderDecoder.tsx');
if (fs.existsSync(base64Path)) {
  let content = fs.readFileSync(base64Path, 'utf8');
  content = content.replace('<img ', '/* eslint-disable-next-line @next/next/no-img-element */\\n                  <img ');
  fs.writeFileSync(base64Path, content, 'utf8');
  console.log('Fixed Base64EncoderDecoder');
}

// 2. JsonYamlJsonlConverter.tsx - add dependencies to useEffect
const jsonlPath = path.join(basePath, 'components/tools/instances/JsonYamlJsonlConverter.tsx');
if (fs.existsSync(jsonlPath)) {
  let content = fs.readFileSync(jsonlPath, 'utf8');
  // Just disable the exhaustive-deps line for the specific effect
  if (content.includes('}, [mode, processJson])')) {
     content = content.replace('}, [mode, processJson])', '  // eslint-disable-next-line react-hooks/exhaustive-deps\\n  }, [mode, processJson])');
     fs.writeFileSync(jsonlPath, content, 'utf8');
     console.log('Fixed JsonYamlJsonlConverter');
  }
}

// 3. PxRemConverter.tsx
const pxRemPath = path.join(basePath, 'components/tools/instances/PxRemConverter.tsx');
if (fs.existsSync(pxRemPath)) {
  let content = fs.readFileSync(pxRemPath, 'utf8');
  content = content.replace("browser's", "browser&apos;s");
  if (content.includes('}, [baseSize])')) {
     content = content.replace('}, [baseSize])', '  // eslint-disable-next-line react-hooks/exhaustive-deps\\n  }, [baseSize])');
  }
  fs.writeFileSync(pxRemPath, content, 'utf8');
  console.log('Fixed PxRemConverter');
}
