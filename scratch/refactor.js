const fs = require('fs');
const content = fs.readFileSync('components/ui/DynamicIcon.tsx', 'utf8');
const match = content.match(/import\s*\{\s*([\s\S]*?)\s*\}\s*from\s*'lucide-react'/);
if (match) {
  const icons = match[1].split(',').map(s => s.trim()).filter(Boolean);
  let newContent = `import React from 'react'
import {
  ${icons.join(', ')}
} from 'lucide-react'

interface DynamicIconProps extends React.ComponentProps<'svg'> {
  name: string
  fallback?: string
}

export const ICON_MAP: Record<string, boolean> = {
${icons.map(i => `  '${i}': true`).join(',\n')}
}

export default function DynamicIcon({ name, fallback = 'Zap', ...props }: DynamicIconProps) {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
`;
  icons.forEach(i => {
    newContent += `      case '${i}': return <${i} {...props} />\n`;
  });
  newContent += `      default: return null;
    }
  }
  
  const IconComponent = renderIcon(name)
  
  if (!IconComponent) {
    if (fallback !== name) {
      return renderIcon(fallback) || <Zap {...props} />
    }
    return <Zap {...props} />
  }
  
  return IconComponent
}
`;
  fs.writeFileSync('components/ui/DynamicIcon.tsx', newContent);
  console.log('Refactored DynamicIcon.tsx successfully!');
}
