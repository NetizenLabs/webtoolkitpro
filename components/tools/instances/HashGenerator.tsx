'use client'
import React, { useState } from 'react'
import { Shield, Copy, Check } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<{[k:string]:string}>({})
  const [copied, setCopied] = useState<string|null>(null)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const md5 = (string: string) => {
    function md5cycle(x: any, k: any) {
      var a = x[0], b = x[1], c = x[2], d = x[3];
      a = ff(a, b, c, d, k[0], 7, -680876936);
      d = ff(d, a, b, c, k[1], 12, -389564586);
      c = ff(c, d, a, b, k[2], 17, 606105819);
      b = ff(b, c, d, a, k[3], 22, -1044525330);
      a = ff(a, b, c, d, k[4], 7, -176418897);
      d = ff(d, a, b, c, k[5], 12, 1200080426);
      c = ff(c, d, a, b, k[6], 17, -1473231341);
      b = ff(b, c, d, a, k[7], 22, -45705983);
      a = ff(a, b, c, d, k[8], 7, 1770035416);
      d = ff(d, a, b, c, k[9], 12, -1958414417);
      c = ff(c, d, a, b, k[10], 17, -42063);
      b = ff(b, c, d, a, k[11], 22, -1990404162);
      a = ff(a, b, c, d, k[12], 7, 1804603682);
      d = ff(d, a, b, c, k[13], 12, -40341101);
      c = ff(c, d, a, b, k[14], 17, -1502002290);
      b = ff(b, c, d, a, k[15], 22, 1236535329);
      a = gg(a, b, c, d, k[1], 5, -165796510);
      d = gg(d, a, b, c, k[6], 9, -1069501632);
      c = gg(c, d, a, b, k[11], 14, 643717713);
      b = gg(b, c, d, a, k[0], 20, -373897302);
      a = gg(a, b, c, d, k[5], 5, -701558691);
      d = gg(d, a, b, c, k[10], 9, 38016083);
      c = gg(c, d, a, b, k[15], 14, -660478335);
      b = gg(b, c, d, a, k[4], 20, -405537848);
      a = gg(a, b, c, d, k[9], 5, 568446438);
      d = gg(d, a, b, c, k[14], 9, -1019803690);
      c = gg(c, d, a, b, k[3], 14, -187363961);
      b = gg(b, c, d, a, k[8], 20, 1163531501);
      a = gg(a, b, c, d, k[13], 5, -1444681467);
      d = gg(d, a, b, c, k[2], 9, -51403784);
      c = gg(c, d, a, b, k[7], 14, 1735328473);
      b = gg(b, c, d, a, k[12], 20, -1926607734);
      a = hh(a, b, c, d, k[5], 4, -378558);
      d = hh(d, a, b, c, k[8], 11, -2022574463);
      c = hh(c, d, a, b, k[11], 16, 1839030562);
      b = hh(b, c, d, a, k[14], 23, -35309556);
      a = hh(a, b, c, d, k[1], 4, -1530992060);
      d = hh(d, a, b, c, k[4], 11, 1272893353);
      c = hh(c, d, a, b, k[7], 16, -155497632);
      b = hh(b, c, d, a, k[10], 23, -1094730640);
      a = hh(a, b, c, d, k[13], 4, 681279174);
      d = hh(d, a, b, c, k[0], 11, -358537222);
      c = hh(c, d, a, b, k[3], 16, -722521979);
      b = hh(b, c, d, a, k[6], 23, 76029189);
      a = hh(a, b, c, d, k[9], 4, -640364487);
      d = hh(d, a, b, c, k[12], 11, -421815835);
      c = hh(c, d, a, b, k[15], 16, 530742520);
      b = hh(b, c, d, a, k[2], 23, -995338651);
      a = ii(a, b, c, d, k[0], 6, -198630844);
      d = ii(d, a, b, c, k[7], 10, 1126891415);
      c = ii(c, d, a, b, k[14], 15, -1416354905);
      b = ii(b, c, d, a, k[5], 21, -57434055);
      a = ii(a, b, c, d, k[12], 6, 1700485571);
      d = ii(d, a, b, c, k[3], 10, -1894986606);
      c = ii(c, d, a, b, k[10], 15, -1051523);
      b = ii(b, c, d, a, k[1], 21, -2054922799);
      a = ii(a, b, c, d, k[8], 6, 1873313359);
      d = ii(d, a, b, c, k[15], 10, -30611744);
      c = ii(c, d, a, b, k[6], 15, -1560198380);
      b = ii(b, c, d, a, k[13], 21, 1309151649);
      a = ii(a, b, c, d, k[4], 6, -145523070);
      d = ii(d, a, b, c, k[11], 10, -1120210379);
      c = ii(c, d, a, b, k[2], 15, 718787259);
      b = ii(b, c, d, a, k[9], 21, -343485551);
      x[0] = add32(a, x[0]);
      x[1] = add32(b, x[1]);
      x[2] = add32(c, x[2]);
      x[3] = add32(d, x[3]);
    }
    function cmn(q: any, a: any, b: any, x: any, s: any, t: any) {
      a = add32(add32(a, q), add32(x, t));
      return add32((a << s) | (a >>> (32 - s)), b);
    }
    function ff(a: any, b: any, c: any, d: any, x: any, s: any, t: any) {
      return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function gg(a: any, b: any, c: any, d: any, x: any, s: any, t: any) {
      return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function hh(a: any, b: any, c: any, d: any, x: any, s: any, t: any) {
      return cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function ii(a: any, b: any, c: any, d: any, x: any, s: any, t: any) {
      return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }
    function md51(s: any) {
      var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i: any;
      for (i = 64; i <= s.length; i += 64) {
        md5cycle(state, md5blk(s.substring(i - 64, i)));
      }
      s = s.substring(i - 64);
      var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (i = 0; i < s.length; i++)
        tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
      tail[i >> 2] |= 0x80 << ((i % 4) << 3);
      if (i > 55) {
        md5cycle(state, tail);
        for (i = 0; i < 16; i++) tail[i] = 0;
      }
      tail[14] = n * 8;
      md5cycle(state, tail);
      return state;
    }
    function md5blk(s: any) {
      var md5blks = [], i;
      for (i = 0; i < 64; i += 4) {
        md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
      }
      return md5blks;
    }
    var hex_chr = "0123456789abcdef".split("");
    function rhex(n: any) {
      var s = "", j = 0;
      for (; j < 4; j++)
        s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
      return s;
    }
    function hex(x: any) {
      for (var i = 0; i < x.length; i++)
        x[i] = rhex(x[i]);
      return x.join("");
    }
    function add32(a: any, b: any) {
      return (a + b) & 0xFFFFFFFF;
    }
    return hex(md51(string));
  }

  const generate = async () => {
    if (!input) return
    const lines = isBulkMode ? input.split('\n') : [input]
    const results: {[k:string]:string} = {}
    
    // Add MD5 (Legacy but popular)
    results['MD5'] = lines.map(line => line.trim() ? md5(line) : '').join(isBulkMode ? '\n' : '')

    for (const algo of ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']) {
      const hashesForAlgo = []
      for (const line of lines) {
        if (!line.trim()) {
          hashesForAlgo.push('')
          continue
        }
        const data = new TextEncoder().encode(line)
        const buf = await crypto.subtle.digest(algo, data)
        hashesForAlgo.push(Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(''))
      }
      results[algo] = hashesForAlgo.join(isBulkMode ? '\n' : '')
    }
    setHashes(results)
  }

  const handleCopy = (key: string) => { 
    navigator.clipboard.writeText(hashes[key])
    setCopied(key)
    setTimeout(() => setCopied(null), 2000) 
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-2 px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Hash Generator" />
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2 flex items-center gap-2">
          Input Text {isBulkMode && <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-[9px] px-1.5 py-0.5 rounded-full">BULK</span>}
        </label>
        <textarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder={isBulkMode ? "Enter multiple lines of text to hash..." : "Enter text to hash..."}
          className="w-full h-32 p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-slate-500 outline-none resize-none mb-4 dark:text-white" 
        />
        <button onClick={generate} className="w-full py-4 bg-slate-800 dark:bg-slate-700 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg mb-8">Generate Secure Hashes</button>
        {Object.keys(hashes).length > 0 && (
          <div className="space-y-4">
            {Object.entries(hashes).map(([algo, hash]) => (
              <div key={algo} className="p-5 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 transition-all group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{algo}</span>
                  <button onClick={() => handleCopy(algo)} className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 font-bold transition-colors">
                    {copied===algo ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} 
                    <span>{copied===algo ? 'Copied' : 'Copy Hash'}</span>
                  </button>
                </div>
                <div className={`font-mono text-sm text-gray-600 dark:text-slate-300 break-all bg-white dark:bg-slate-900 p-3 rounded-xl border border-gray-100 dark:border-slate-800 ${isBulkMode ? 'whitespace-pre overflow-x-auto' : ''}`}>{hash}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
