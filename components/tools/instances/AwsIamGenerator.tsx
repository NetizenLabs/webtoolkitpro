'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Key, Copy, Check, Plus, Trash2 } from 'lucide-react';

interface Statement {
  Effect: 'Allow' | 'Deny';
  Action: string[];
  Resource: string[];
}

export default function AwsIamGenerator() {
  const [statements, setStatements] = useState<Statement[]>([
    { Effect: 'Allow', Action: ['s3:GetObject', 's3:ListBucket'], Resource: ['arn:aws:s3:::my-bucket', 'arn:aws:s3:::my-bucket/*'] }
  ]);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const policy = {
      Version: "2012-10-17",
      Statement: statements.map(s => ({
        Effect: s.Effect,
        Action: s.Action.length === 1 ? s.Action[0] : s.Action,
        Resource: s.Resource.length === 1 ? s.Resource[0] : s.Resource
      }))
    };
    setOutput(JSON.stringify(policy, null, 2));
  }, [statements]);

  const addStatement = () => {
    setStatements([...statements, { Effect: 'Allow', Action: [''], Resource: ['*'] }]);
  };

  const removeStatement = (index: number) => {
    setStatements(statements.filter((_, i) => i !== index));
  };

  const updateStatement = (index: number, field: keyof Statement, value: any) => {
    const newStatements = [...statements];
    newStatements[index] = { ...newStatements[index], [field]: value };
    setStatements(newStatements);
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Visual Builder */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-500" />
              Policy Statements (Visual Builder)
            </label>
            <button 
              onClick={addStatement}
              className="text-xs font-bold text-orange-600 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Statement
            </button>
          </div>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {statements.map((stmt, idx) => (
              <div key={idx} className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3 relative">
                <button 
                  onClick={() => removeStatement(idx)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                  disabled={statements.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Effect</label>
                  <select 
                    value={stmt.Effect}
                    onChange={(e) => updateStatement(idx, 'Effect', e.target.value)}
                    className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  >
                    <option value="Allow">Allow</option>
                    <option value="Deny">Deny</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Actions (comma separated)</label>
                  <input 
                    type="text" 
                    value={stmt.Action.join(', ')}
                    onChange={(e) => updateStatement(idx, 'Action', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 font-mono text-blue-600"
                    placeholder="s3:GetObject, dynamodb:PutItem"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Resources (comma separated)</label>
                  <input 
                    type="text" 
                    value={stmt.Resource.join(', ')}
                    onChange={(e) => updateStatement(idx, 'Resource', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 font-mono text-green-600"
                    placeholder="arn:aws:s3:::my-bucket/*"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* JSON Output */}
        <div className="flex flex-col space-y-4">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Key className="w-4 h-4 text-gray-800" />
            Generated JSON Policy
          </label>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              className="w-full h-[600px] p-6 font-mono text-sm border rounded-xl bg-gray-900 text-orange-400 resize-none shadow-inner"
              spellCheck="false"
            />
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition shadow flex items-center gap-2 text-xs font-bold"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy JSON'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
