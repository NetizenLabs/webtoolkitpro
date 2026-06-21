import fs from 'fs';
import path from 'path';
import { fork } from 'child_process';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const AGENT_COUNT = 10;

async function runCoordinator() {
  console.log(`[Coordinator] Starting 10-Agent Blog Enrichment...`);
  
  // 1. Gather all files
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md') && f !== '_template.md');
  
  // 2. Filter to only the "programmatic" files (the ones we generated today)
  // We'll target ones that match our known patterns
  const targetFiles = files.filter(f => 
    f.includes('how-to-master-') || 
    f.includes('the-best-') || 
    f.includes('why-every-') ||
    f.includes('-vs-the-alternatives')
  );

  console.log(`[Coordinator] Found ${targetFiles.length} programmatic files to enrich.`);

  if (targetFiles.length === 0) {
    console.log('[Coordinator] No target files found. Exiting.');
    return;
  }

  // 3. Split into 10 chunks
  const chunkSize = Math.ceil(targetFiles.length / AGENT_COUNT);
  const chunks = [];
  for (let i = 0; i < targetFiles.length; i += chunkSize) {
    chunks.push(targetFiles.slice(i, i + chunkSize));
  }

  console.log(`[Coordinator] Split workload into ${chunks.length} chunks. Spawning agents...`);

  // 4. Spawn 10 Agents
  let completedAgents = 0;
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const agentId = i + 1;
    
    const worker = fork(path.join(process.cwd(), 'scripts', 'enrich-worker.mjs'), [agentId, JSON.stringify(chunk)]);
    
    worker.on('message', (msg) => {
      console.log(`[Agent ${agentId}] ${msg}`);
    });

    worker.on('exit', (code) => {
      console.log(`[Coordinator] Agent ${agentId} finished with code ${code}.`);
      completedAgents++;
      if (completedAgents === chunks.length) {
        console.log(`[Coordinator] All ${chunks.length} agents have completed their workload successfully!`);
      }
    });
  }
}

runCoordinator();
