'use client'

import React, { useState } from 'react'
import { CreditCard, ShieldCheck, ShieldAlert, Check } from 'lucide-react'

export default function CreditCardValidator() {
  const [number, setNumber] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [type, setType] = useState('')

  const validate = (val: string) => {
    const clean = val.replace(/\D/g, '')
    if (clean.length < 13) {
      setIsValid(null)
      setType('')
      return
    }

    // Luhn Algorithm
    let sum = 0
    for (let i = 0; i < clean.length; i++) {
      let digit = parseInt(clean[clean.length - 1 - i])
      if (i % 2 === 1) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      sum += digit
    }
    const valid = sum % 10 === 0
    setIsValid(valid)

    // Type detection
    if (/^4/.test(clean)) setType('Visa')
    else if (/^5[1-5]/.test(clean)) setType('Mastercard')
    else if (/^3[47]/.test(clean)) setType('American Express')
    else if (/^6(?:011|5)/.test(clean)) setType('Discover')
    else setType('Unknown')
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Card Security Validator</h3>
        </div>

        <div className="relative">
          <input
            type="text"
            value={number}
            onChange={(e) => {
              const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
              setNumber(val)
              validate(val)
            }}
            placeholder="0000 0000 0000 0000"
            className="w-full p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xl font-mono font-bold tracking-widest outline-none"
          />
          {type && (
            <div className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase rounded-lg">
              {type}
            </div>
          )}
        </div>
      </div>

      {isValid !== null && (
        <div className={`p-8 rounded-3xl border flex items-center gap-6 animate-in zoom-in-95 duration-300 ${isValid ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isValid ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'}`}>
            {isValid ? <ShieldCheck className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
          </div>
          <div>
            <h4 className={`text-lg font-black uppercase tracking-widest ${isValid ? 'text-green-600' : 'text-red-600'}`}>
              {isValid ? 'Valid Card Number' : 'Invalid Card Number'}
            </h4>
            <p className="text-xs text-gray-500 dark:text-[#8A9BBE] mt-1">
              {isValid ? 'This number passes the Luhn algorithm checksum.' : 'Checksum failed. This is not a real card number.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
