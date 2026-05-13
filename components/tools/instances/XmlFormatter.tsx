import React from 'react'
import CodeFormatter from '../CodeFormatter'

export default function XmlFormatter() {
  return (
    <CodeFormatter 
      language="html"
      title="XML Formatter"
      placeholder="<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>"
    />
  )
}
