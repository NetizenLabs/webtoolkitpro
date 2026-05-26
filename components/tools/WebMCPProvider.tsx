'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

declare global {
  interface Navigator {
    modelContext?: {
      provideContext: (context: { tools: any[] }) => void;
    }
  }
}

export default function WebMCPProvider() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.modelContext) {
      try {
        navigator.modelContext.provideContext({
          tools: [
            {
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
              execute: async (args: any) => {
                router.push('/tools/jwt-decoder')
                return { 
                  status: 'success', 
                  message: 'Successfully navigated user to the JWT Decoder tool.' 
                }
              }
            },
            {
              name: 'open_json_formatter',
              description: 'Open the visual JSON Formatter and Validator tool.',
              inputSchema: {
                type: 'object',
                properties: {}
              },
              execute: async () => {
                router.push('/tools/json-formatter')
                return { 
                  status: 'success', 
                  message: 'Successfully navigated user to the JSON Formatter tool.' 
                }
              }
            }
          ]
        })
      } catch (error) {
        console.error('Failed to initialize WebMCP context:', error)
      }
    }
  }, [router])

  return null
}
