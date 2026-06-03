'use client'

import React, { useState } from 'react'
import { Landmark, ShieldCheck, ShieldAlert, Check } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function IbanValidator() {
  const [iban, setIban] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [bulkResults, setBulkResults] = useState<{iban: string; valid: boolean}[]>([])

  const validate = (val: string) => {
    const checkIBAN = (ibanStr: string) => {
      const clean = ibanStr.replace(/\s/g, '').toUpperCase()
      if (clean.length < 15) return false
      
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
      return parseInt(remainder) % 97 === 1
    }

    if (isBulkMode) {
      const lines = val.split('\n')
      const results = lines.map(line => {
        if (!line.trim()) return null
        return { iban: line.trim(), valid: checkIBAN(line) }
      }).filter(Boolean) as {iban: string; valid: boolean}[]
      setBulkResults(results)
    } else {
      const clean = val.replace(/\s/g, '').toUpperCase()
      if (clean.length < 15) {
        setIsValid(null)
      } else {
        setIsValid(checkIBAN(val))
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk IBAN Validator" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Landmark className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">IBAN Format Validator</h3>
        </div>

        {isBulkMode ? (
          <textarea
            value={iban}
            onChange={(e) => {
              const val = e.target.value.toUpperCase()
              setIban(val)
              validate(val)
            }}
            placeholder="GB12 ABCD 1020 3012 3456 78 (one per line)"
            className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono font-bold outline-none resize-none"
          />
        ) : (
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
        )}
      </div>

      {!isBulkMode && isValid !== null && (
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

      {isBulkMode && bulkResults.length > 0 && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Bulk Validation Results</h3>
          <div className="space-y-2 max-h-[300px] overflow-auto">
            {bulkResults.map((res, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47]">
                <span className="text-xs font-mono font-bold tracking-wider">{res.iban}</span>
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
