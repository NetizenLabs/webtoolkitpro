import React, { useState } from 'react';

/**
 * JsonToCsvConverter
 * WebToolkit Pro Utility
 * Zero-latency, 100% Client-side JSON to CSV Conversion.
 */
export default function JsonToCsvConverter() {
  const [inputJson, setInputJson] = useState('');
  const [outputCsv, setOutputCsv] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    setError(null);
    try {
      if (!inputJson.trim()) {
        setOutputCsv('');
        return;
      }
      
      const parsed = JSON.parse(inputJson);
      const data = Array.isArray(parsed) ? parsed : [parsed];
      
      if (data.length === 0) {
        setOutputCsv('');
        return;
      }

      // Extract headers
      const headers = Object.keys(data[0]);
      
      // Map rows
      const rows = data.map(obj => {
        return headers.map(header => {
          let val = obj[header] === null || obj[header] === undefined ? '' : String(obj[header]);
          // Escape quotes and wrap in quotes if contains comma
          if (val.includes(',') || val.includes('"')) {
            val = `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        }).join(',');
      });

      setOutputCsv([headers.join(','), ...rows].join('\n'));
    } catch (err) {
      setError('Invalid JSON payload. Please ensure your input is valid JSON format.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCsv);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl" style={{ boxShadow: 'var(--shadow2)', transition: 'all 0.3s var(--ease-out)' }}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">JSON to CSV Converter</h2>
        <p className="text-gray-600 dark:text-gray-400">Convert complex JSON arrays into flattened CSV formats instantly. 100% Client-side execution ensures your proprietary data never touches our servers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Input JSON Array</label>
          <textarea 
            className="w-full h-64 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="[{&quot;id&quot;: 1, &quot;name&quot;: &quot;Netizen&quot;}]"
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-gray-700 dark:text-gray-300">Output CSV</label>
            <button 
              onClick={handleCopy}
              className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
              style={{ transition: 'background-color 0.2s var(--ease-in-out)' }}
            >
              Copy CSV
            </button>
          </div>
          <textarea 
            className="w-full h-64 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono outline-none"
            readOnly
            value={outputCsv}
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="mt-6">
        <button 
          onClick={handleConvert}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md w-full md:w-auto"
          style={{ transition: 'transform 0.2s var(--ease-spring), background-color 0.2s linear' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Convert Payload
        </button>
      </div>
    </div>
  );
}
