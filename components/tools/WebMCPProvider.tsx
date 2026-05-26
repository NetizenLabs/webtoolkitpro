'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

declare global {
  interface Navigator {
    modelContext?: {
      registerTool: (tool: any, options: { signal: AbortSignal }) => void;
    }
  }
}

export default function WebMCPProvider() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.modelContext) return;

    const controller = new AbortController();

    try {
      navigator.modelContext.registerTool({
        name: 'open_jwt_decoder',
        description: 'Open the visual JWT Decoder tool to analyze tokens.',
        inputSchema: {
          type: 'object',
          properties: {
            token: { 
              type: 'string', 
              description: 'Optional: A JWT to decode. The tool will open ready for input.' 
            }
          }
        },
        execute: async () => {
          router.push('/tools/jwt-decoder')
          return { status: 'success', message: 'Successfully navigated.' }
        }
      }, { signal: controller.signal });

      navigator.modelContext.registerTool({
        name: 'open_json_formatter',
        description: 'Open the visual JSON Formatter and Validator tool.',
        inputSchema: {
          type: 'object',
          properties: {}
        },
        execute: async () => {
          router.push('/tools/json-formatter')
          return { status: 'success', message: 'Successfully navigated.' }
        }
      }, { signal: controller.signal });

    } catch (error) {
      console.error('Failed to register WebMCP tools:', error)
    }

    // Unregister tools when the component unmounts
    return () => {
      controller.abort();
    }
  }, [router])

  return null
}
