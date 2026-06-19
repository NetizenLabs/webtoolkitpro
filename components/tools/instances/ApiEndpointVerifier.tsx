'use client';

import React, { useState } from 'react';
import { Play, Plus, Trash2, Code2, AlertCircle, RefreshCw, Send, CheckCircle2, Clock, Globe } from 'lucide-react';

interface HeaderParam {
  id: string;
  key: string;
  value: string;
}

export default function ApiEndpointVerifier() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState<HeaderParam[]>([
    { id: '1', key: 'Accept', value: 'application/json' }
  ]);
  const [body, setBody] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState<any>(null);
  
  const [activeTab, setActiveTab] = useState<'headers' | 'body'>('headers');
  const [activeResponseTab, setActiveResponseTab] = useState<'body' | 'headers'>('body');

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

  const addHeader = () => {
    setHeaders([...headers, { id: Date.now().toString(), key: '', value: '' }]);
  };

  const updateHeader = (id: string, field: 'key' | 'value', val: string) => {
    setHeaders(headers.map(h => h.id === id ? { ...h, [field]: val } : h));
  };

  const removeHeader = (id: string) => {
    setHeaders(headers.filter(h => h.id !== id));
  };

  const sendRequest = async () => {
    setLoading(true);
    setError('');
    setResponse(null);
    setActiveResponseTab('body');

    try {
      const res = await fetch('/api/proxy-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          method,
          headers,
          requestBody: (method !== 'GET' && method !== 'HEAD') ? body : undefined
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || `Error: ${res.status}`);
      } else {
        setResponse({
          status: data.status,
          statusText: data.statusText,
          timeMs: data.timeMs,
          headers: data.headers,
          data: data.data,
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send request. Check your network or the URL.');
    } finally {
      setLoading(false);
    }
  };

  const formatJSON = (jsonString: string) => {
    try {
      const obj = JSON.parse(jsonString);
      return JSON.stringify(obj, null, 2);
    } catch {
      return jsonString;
    }
  };

  return (
    <div className="flex flex-col gap-6 text-gray-800 dark:text-gray-200">
      
      {/* Top Bar: Method & URL */}
      <div className="flex flex-col md:flex-row gap-3">
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          className="px-4 py-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-[#1E2D47] rounded-lg focus:outline-none focus:border-blue-500 font-bold md:w-32"
        >
          {methods.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        
        <div className="flex-1 relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/v1/users"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-[#1E2D47] rounded-lg focus:outline-none focus:border-blue-500 font-mono text-sm"
          />
        </div>

        <button 
          onClick={sendRequest}
          disabled={loading || !url}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          Send
        </button>
      </div>

      {/* Request Configuration */}
      <div className="bg-white dark:bg-[#0D1526] border border-gray-200 dark:border-[#1E2D47] rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-[#1E2D47]">
          <button 
            onClick={() => setActiveTab('headers')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${activeTab === 'headers' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Headers ({headers.filter(h => h.key).length})
          </button>
          <button 
            onClick={() => setActiveTab('body')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${activeTab === 'body' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Body
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'headers' && (
            <div className="space-y-3">
              {headers.map((h) => (
                <div key={h.id} className="flex gap-2 items-center">
                  <input 
                    type="text" 
                    placeholder="Header Key" 
                    value={h.key}
                    onChange={(e) => updateHeader(h.id, 'key', e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-[#1E2D47] rounded-md font-mono text-sm focus:outline-none focus:border-blue-500"
                  />
                  <input 
                    type="text" 
                    placeholder="Value" 
                    value={h.value}
                    onChange={(e) => updateHeader(h.id, 'value', e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-[#1E2D47] rounded-md font-mono text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button onClick={() => removeHeader(h.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={addHeader} className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2">
                <Plus className="w-4 h-4" /> Add Header
              </button>
            </div>
          )}

          {activeTab === 'body' && (
            <div>
              {['GET', 'HEAD'].includes(method) ? (
                <div className="p-8 text-center text-gray-400">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>GET and HEAD requests usually don&apos;t have a body.</p>
                </div>
              ) : (
                <textarea 
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={`{\n  "key": "value"\n}`}
                  className="w-full h-48 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-[#1E2D47] rounded-md font-mono text-sm focus:outline-none focus:border-blue-500 resize-y"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="font-medium text-sm">{error}</p>
        </div>
      )}

      {/* Response Section */}
      {response && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-200 dark:border-[#1E2D47] rounded-xl overflow-hidden mt-4 shadow-xl">
          <div className="bg-gray-50 dark:bg-[#0B1120] border-b border-gray-200 dark:border-[#1E2D47] p-4 flex flex-wrap gap-6 items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase text-gray-500">Status</span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded ${response.status >= 200 && response.status < 300 ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : response.status >= 400 ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'}`}>
                  {response.status} {response.statusText}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase text-gray-500">Time</span>
                <span className="flex items-center gap-1 font-mono font-bold text-blue-600 dark:text-blue-400">
                  <Clock className="w-3.5 h-3.5" /> {response.timeMs} ms
                </span>
              </div>
            </div>
            
            <div className="flex bg-gray-200 dark:bg-[#1E2D47] p-1 rounded-lg">
              <button 
                onClick={() => setActiveResponseTab('body')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeResponseTab === 'body' ? 'bg-white dark:bg-[#0D1526] text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                Response Body
              </button>
              <button 
                onClick={() => setActiveResponseTab('headers')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeResponseTab === 'headers' ? 'bg-white dark:bg-[#0D1526] text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                Headers
              </button>
            </div>
          </div>

          <div className="p-4 bg-[#1E1E1E] text-gray-300 overflow-x-auto">
            {activeResponseTab === 'body' ? (
              <pre className="font-mono text-[13px] leading-relaxed">
                {formatJSON(response.data)}
              </pre>
            ) : (
              <div className="space-y-1">
                {Object.entries(response.headers).map(([key, value]) => (
                  <div key={key} className="flex gap-4 font-mono text-[13px]">
                    <span className="text-blue-400 w-1/3 break-words">{key}:</span>
                    <span className="text-green-400 w-2/3 break-words">{value as string}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
