import React from 'react'
import CodeFormatter from '../CodeFormatter'

export default function HtmlBeautifier() {
  return (
    <CodeFormatter 
      language="html"
      title="HTML Beautifier"
      placeholder="Paste your messy HTML code here..."
    />
  )
}
