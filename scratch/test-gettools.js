require('ts-node').register({ transpileOnly: true });
const { getTools } = require('./lib/tools');
const tools = getTools();
console.log('Total tools:', tools.length);
console.log('Tools not coming soon:', tools.filter(t => !t.isComingSoon).length);
console.log('Tools coming soon:', tools.filter(t => t.isComingSoon).length);
console.log('First 5 coming soon:', tools.filter(t => t.isComingSoon).slice(0, 5).map(t => t.slug));
