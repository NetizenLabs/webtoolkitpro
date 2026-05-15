'use client'

import { useCallback, KeyboardEvent } from 'react'

/**
 * A custom hook to handle 'Enter' key submission for tool inputs.
 * @param callback The function to execute when Enter is pressed.
 * @returns An onKeyDown handler.
 */
export function useEnterSubmit(callback: () => void) {
  return useCallback(
    (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        // Only prevent default if it's not a multiline textarea or if we explicitly want to submit
        // For standard inputs, this is the desired behavior.
        if (e.currentTarget.tagName === 'INPUT') {
          e.preventDefault()
          callback()
        }
      }
    },
    [callback]
  )
}
