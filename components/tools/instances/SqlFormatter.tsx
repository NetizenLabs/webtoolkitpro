import React from 'react'
import CodeFormatter from '../CodeFormatter'

export default function SqlFormatter() {
  return (
    <CodeFormatter 
      language="sql"
      title="SQL Formatter"
      placeholder="SELECT * FROM users WHERE status = 'active'..."
    />
  )
}
