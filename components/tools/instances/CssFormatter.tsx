import React from 'react'
import CodeFormatter from '../CodeFormatter'

export default function CssFormatter() {
  return (
    <CodeFormatter 
      language="css"
      title="CSS Formatter"
      placeholder="Paste your unformatted CSS here..."
    />
  )
}
