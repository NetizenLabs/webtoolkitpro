'use client'

import React, { useState } from 'react'
import { Landmark, ShieldCheck, ShieldAlert, Check } from 'lucide-react'

export default function IbanValidator() {
  const [iban, setIban] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const validate = (val: string) => {
    const clean = val.replace(/\s/g, '').toUpperCase()
    if (clean.length < 15) {
      setIsValid(null)
      return
    }

    // Basic IBAN Checksum
    const rearranged = clean.slice(4) + clean.slice(0, 4)
    const numeric = rearranged.split('').map(char => {
      const code = char.charCodeAt(0)
      return code >= 65 && code <= 90 ? (code - 55).toString() : char
    }).join('')

    let remainder: any = numeric
    while (remainder.length > 2) {
      const block = remainder.slice(0, 9)
      remainder = (parseInt(block) % 97) + remainder.slice(block.length)
    }
    
    setIsValid(parseInt(remainder) % 97 === 1)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Landmark className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">IBAN Format Validator</h3>
        </div>

        <input
          type="text"
          value={iban}
          onChange={(e) => {
            const val = e.target.value.toUpperCase()
            setIban(val)
            validate(val)
          }}
          placeholder="GB12 ABCD 1020 3012 3456 78"
          className="w-full p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-lg font-mono font-bold tracking-widest outline-none"
        />
      </div>

      {isValid !== null && (
        <div className={`p-8 rounded-3xl border flex items-center gap-6 animate-in zoom-in-95 duration-300 ${isValid ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isValid ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'}`}>
            {isValid ? <ShieldCheck className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
          </div>
          <div>
            <h4 className={`text-lg font-black uppercase tracking-widest ${isValid ? 'text-green-600' : 'text-red-600'}`}>
              {isValid ? 'Valid IBAN' : 'Invalid IBAN'}
            </h4>
            <p className="text-xs text-gray-500 dark:text-[#8A9BBE] mt-1">
              {isValid ? 'This IBAN follows the international standard format and checksum.' : 'Checksum failed or invalid country format.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
