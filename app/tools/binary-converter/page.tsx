'use client'
import React, { useState } from 'react'
import { Binary } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function BinaryConverter() {
  const [input, setInput] = useState('')
  const [fromBase, setFromBase] = useState('10')
  const [results, setResults] = useState<{binary:string,decimal:string,hex:string,octal:string}>({binary:'',decimal:'',hex:'',octal:''})

  const convert = () => {
    try {
      const num = parseInt(input, parseInt(fromBase))
      if (isNaN(num)) throw new Error()
      setResults({ binary: num.toString(2), decimal: num.toString(10), hex: num.toString(16).toUpperCase(), octal: num.toString(8) })
    } catch { setResults({ binary: 'Invalid', decimal: 'Invalid', hex: 'Invalid', octal: 'Invalid' }) }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Binary Converter" slug="binary-converter" />
      <ToolSchema 
        name="Number System & Binary Converter" 
        description="Convert numbers between binary, decimal, hexadecimal, and octal systems instantly. A crucial tool for computer science and low-level programming."
        slug="binary-converter"
        steps={[
          "Enter your number in the input field.",
          "Select the base of your input number (Binary, Octal, Decimal, or Hex).",
          "Click 'Convert Now' to calculate the values in all other bases.",
          "Review the results for each number system in the grid below."
        ]}
      />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-lg shadow-red-500/20">
            <Binary className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Binary Converter</h1>
            <p className="text-gray-500 dark:text-slate-400">Convert between binary, decimal, hexadecimal, and octal</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Enter a number..." 
              className="flex-1 p-4 font-mono bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none dark:text-white" 
            />
            <select 
              value={fromBase} 
              onChange={(e) => setFromBase(e.target.value)} 
              className="p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none font-bold text-gray-700 dark:text-slate-300"
            >
              <option value="2">Binary (Base 2)</option>
              <option value="8">Octal (Base 8)</option>
              <option value="10">Decimal (Base 10)</option>
              <option value="16">Hex (Base 16)</option>
            </select>
          </div>
          <button onClick={convert} className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 mb-8">Convert Now</button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{l:'Binary (Base 2)',v:results.binary},{l:'Decimal (Base 10)',v:results.decimal},{l:'Hex (Base 16)',v:results.hex},{l:'Octal (Base 8)',v:results.octal}].map(r=>(
              <div key={r.l} className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700">
                <div className="text-[10px] text-gray-400 dark:text-slate-500 uppercase font-bold tracking-widest mb-1">{r.l}</div>
                <div className="font-mono text-lg font-black text-gray-900 dark:text-white break-all">{r.v || '—'}</div>
              </div>
            ))}
          </div>
        </div>
        <AdSlot className="mt-8" />

        <ToolInfo 
          title="Number System & Binary Converter"
          description="The WebToolkit Pro Binary Converter is a versatile utility for translating numbers between the four most common base systems used in computer science: Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hexadecimal (Base 16). Understanding these conversions is fundamental for software engineering, embedded systems development, and digital logic design."
          howItWorks="Our tool utilizes the built-in JavaScript `parseInt()` function to interpret the input based on the selected source base. Once converted to a base-10 integer, the tool uses `.toString(base)` to generate the representation in all other systems. This ensures precision across large integers and supports high-speed calculations entirely within your browser."
          features={[
            "Real-time conversion across four major number systems",
            "Support for Binary, Octal, Decimal, and Hexadecimal",
            "Safe-mode parsing with 'Invalid' input detection",
            "Responsive grid layout for comparing results",
            "Distraction-free dark mode interface",
            "100% Client-side: Your calculations stay private"
          ]}
          faqs={[
            {
              q: "What is the Binary system used for?",
              a: "Binary is the fundamental language of computers. It uses only two digits, 0 and 1, representing the 'on' and 'off' states of transistors in a CPU."
            },
            {
              q: "Why is Hexadecimal important in programming?",
              a: "Hexadecimal (Base 16) is a human-friendly way to represent binary data. Each hex digit represents exactly 4 bits (a nibble), making it much easier to read memory addresses and color codes."
            },
            {
              q: "How many bits are in a byte?",
              a: "A byte is a unit of digital information that consists of 8 bits. In binary, a byte can represent 256 different values (0 to 255)."
            },
            {
              q: "Can this tool handle fractional numbers?",
              a: "This version focus on integer conversions. For floating-point or fixed-point binary conversions, specialized IEEE 754 calculators are typically required."
            }
          ]}
        />
      </div>
    </div>
  )
}
