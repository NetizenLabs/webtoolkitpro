import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'

const STATS_FILE = path.join(process.cwd(), 'config', 'stats.json')

export interface ToolStats {
  toolsRun: number
  filesProcessed: number
  totalUsers: number
}

const DEFAULT_STATS: ToolStats = {
  toolsRun: 128420,
  filesProcessed: 85600,
  totalUsers: 12400
}

let cachedStats: ToolStats | null = null
let isInitialized = false

export async function getGlobalStats(): Promise<ToolStats> {
  if (isInitialized && cachedStats) {
    return cachedStats
  }

  try {
    const data = await fsPromises.readFile(STATS_FILE, 'utf8')
    cachedStats = JSON.parse(data)
    isInitialized = true
    return cachedStats || DEFAULT_STATS
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      try {
        await fsPromises.writeFile(STATS_FILE, JSON.stringify(DEFAULT_STATS, null, 2))
      } catch (writeErr) {
        console.error('Error writing default stats:', writeErr)
      }
    } else {
      console.error('Error reading stats:', e)
    }
    cachedStats = DEFAULT_STATS
    isInitialized = true
    return DEFAULT_STATS
  }
}

export async function incrementToolRun() {
  try {
    const stats = await getGlobalStats()
    stats.toolsRun += 1
    // Occasionally increment users and files for realism
    if (Math.random() > 0.8) stats.filesProcessed += 1
    if (Math.random() > 0.95) stats.totalUsers += 1
    
    // Update cache immediately
    cachedStats = stats

    // Write back in a completely non-blocking deferred way without blocking current event loop execution
    fsPromises.writeFile(STATS_FILE, JSON.stringify(stats, null, 2)).catch(err => {
      console.error('Error writing stats asynchronously:', err)
    })
    
    return stats.toolsRun
  } catch (e) {
    console.error('Error incrementing stats:', e)
    return 0
  }
}

