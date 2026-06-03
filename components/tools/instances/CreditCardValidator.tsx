'use client'

import React, { useState } from 'react'
import { CreditCard, ShieldCheck, ShieldAlert, Check } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function CreditCardValidator() {
  const [number, setNumber] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [type, setType] = useState('')
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [bulkResults, setBulkResults] = useState<{ number: string; valid: boolean; type: string }[]>([])

  const validate = (val: string) => {
    const checkCard = (cardStr: string) => {
      const clean = cardStr.replace(/\D/g, '')
      if (clean.length < 13) return { valid: false, type: '' }

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

      let ctype = 'Unknown'
      if (/^4/.test(clean)) ctype = 'Visa'
      else if (/^5[1-5]/.test(clean)) ctype = 'Mastercard'
      else if (/^3[47]/.test(clean)) ctype = 'American Express'
      else if (/^6(?:011|5)/.test(clean)) ctype = 'Discover'
      return { valid, type: ctype }
    }

    if (isBulkMode) {
      const lines = val.split('\n')
      const results = lines.map(line => {
        if (!line.trim()) return null
        const res = checkCard(line)
        return { number: line.trim(), valid: res.valid, type: res.type }
      }).filter(Boolean) as { number: string; valid: boolean; type: string }[]
      setBulkResults(results)
    } else {
      const clean = val.replace(/\D/g, '')
      if (clean.length < 13) {
        setIsValid(null)
        setType('')
      } else {
        const res = checkCard(val)
        setIsValid(res.valid)
        setType(res.type)
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Card Validator" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Card Security Validator</h3>
        </div>

        <div className="relative">
          {isBulkMode ? (
            <textarea
              value={number}
              onChange={(e) => {
                const val = e.target.value
                setNumber(val)
                validate(val)
              }}
              placeholder="0000 0000 0000 0000 (one per line)"
              className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono font-bold tracking-widest outline-none resize-none"
            />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {!isBulkMode && isValid !== null && (
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

      {isBulkMode && bulkResults.length > 0 && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Bulk Validation Results</h3>
          <div className="space-y-2 max-h-[300px] overflow-auto">
            {bulkResults.map((res, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold tracking-wider">{res.number}</span>
                  {res.type && res.type !== 'Unknown' && (
                    <span className="text-[10px] font-black uppercase text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">{res.type}</span>
                  )}
                </div>
                {res.valid ? (
                  <span className="text-xs font-bold text-green-600 flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Valid</span>
                ) : (
                  <span className="text-xs font-bold text-red-600 flex items-center gap-1"><ShieldAlert className="w-4 h-4" /> Invalid</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
