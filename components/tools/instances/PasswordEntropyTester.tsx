'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Shield, ShieldAlert, ShieldCheck, RefreshCw, KeyRound, Check } from 'lucide-react';
import { useAuditLogger } from '@/contexts/AuditLoggerContext';

// Basic entropy calculation logic since zxcvbn isn't available
function calculateEntropy(password: string): { score: number, crackTime: string, color: string, feedback: string } {
  if (!password) return { score: 0, crackTime: '0 seconds', color: 'bg-muted', feedback: '' };
  
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(password)) pool += 32;
  
  if (pool === 0) return { score: 0, crackTime: '0 seconds', color: 'bg-destructive', feedback: 'Very weak.' };
  
  const entropy = password.length * Math.log2(pool);
  
  let score = 0;
  let crackTime = '';
  let color = '';
  let feedback = '';

  if (entropy < 40) {
    score = 1; crackTime = 'Instantly'; color = 'bg-destructive'; feedback = 'Extremely vulnerable.';
  } else if (entropy < 60) {
    score = 2; crackTime = 'Minutes to hours'; color = 'bg-orange-500'; feedback = 'Weak. Add length or symbols.';
  } else if (entropy < 80) {
    score = 3; crackTime = 'Months to years'; color = 'bg-yellow-500'; feedback = 'Good. Resistant to basic attacks.';
  } else {
    score = 4; crackTime = 'Centuries'; color = 'bg-green-500'; feedback = 'Excellent. Highly secure.';
  }

  return { score, crackTime, color, feedback };
}

export default function PasswordEntropyTester() {
  const { logAudit } = useAuditLogger();
  const [activeTab, setActiveTab] = useState<'generate' | 'audit'>('generate');
  
  // Generator State
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  
  // Auditor State
  const [auditPassword, setAuditPassword] = useState('');
  
  const [copied, setCopied] = useState(false);

  const generatePasswordCore = useCallback(() => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let pool = '';
    if (useUpper) pool += upper;
    if (useLower) pool += lower;
    if (useNumbers) pool += nums;
    if (useSymbols) pool += syms;
    
    if (pool === '') {
      setGeneratedPassword('Select at least one option');
      return;
    }
    
    let result = '';
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);
    
    for (let i = 0; i < length; i++) {
      result += pool[randomValues[i] % pool.length];
    }
    setGeneratedPassword(result);
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const handleGenerateClick = () => {
    generatePasswordCore();
    logAudit({
      toolName: 'Password Entropy Tester',
      action: 'GENERATED_PASSWORD',
      status: 'SUCCESS',
      details: `Generated password of length ${length}`
    });
  };

  useEffect(() => {
    generatePasswordCore();
  }, [generatePasswordCore]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const auditResult = calculateEntropy(activeTab === 'audit' ? auditPassword : generatedPassword);

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto bg-background">
      
      {/* Tabs */}
      <div className="flex p-1 bg-muted/50 rounded-lg w-full sm:w-fit mx-auto border border-border">
        <button
          onClick={() => setActiveTab('generate')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'generate' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <KeyRound className="w-4 h-4" /> Generator
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'audit' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Shield className="w-4 h-4" /> Auditor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Interactive Area */}
        <div className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-card shadow-sm">
          
          {activeTab === 'generate' ? (
            <>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">Generator Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Password Length</span>
                    <span className="font-bold text-primary">{length}</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                    <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} className="w-4 h-4 accent-primary" />
                    <span className="text-sm font-medium">Uppercase</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                    <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} className="w-4 h-4 accent-primary" />
                    <span className="text-sm font-medium">Lowercase</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                    <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="w-4 h-4 accent-primary" />
                    <span className="text-sm font-medium">Numbers</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                    <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="w-4 h-4 accent-primary" />
                    <span className="text-sm font-medium">Symbols</span>
                  </label>
                </div>

                <button 
                  onClick={handleGenerateClick}
                  className="w-full py-3 mt-4 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" /> Generate New Password
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">Security Auditor</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Paste a password below. Processing is 100% local; your password never leaves this browser.</p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Type password to audit..."
                  value={auditPassword}
                  onChange={(e) => setAuditPassword(e.target.value)}
                  className="w-full px-4 py-4 rounded-lg bg-secondary text-secondary-foreground border-none text-sm font-mono focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </>
          )}

        </div>

        {/* Right Column: Results Area */}
        <div className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-card shadow-sm">
          <h3 className="font-semibold text-sm mb-2 text-muted-foreground">Resulting Password</h3>
          
          <div className="relative group">
            <div className="w-full min-h-[80px] p-4 rounded-lg bg-muted/50 border border-border font-mono text-lg break-all flex items-center shadow-inner">
              {activeTab === 'generate' ? generatedPassword : (auditPassword || 'Waiting for input...')}
            </div>
            {(activeTab === 'generate' || auditPassword) && (
              <button
                onClick={() => handleCopy(activeTab === 'generate' ? generatedPassword : auditPassword)}
                className="absolute top-2 right-2 p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-background shadow-sm transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-end">
              <h4 className="text-sm font-semibold">Strength Analysis</h4>
              <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${auditResult.color}`}>
                Score: {auditResult.score}/4
              </span>
            </div>
            
            <div className="flex gap-1 h-2 w-full rounded-full overflow-hidden bg-muted">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`flex-1 ${i <= auditResult.score ? auditResult.color : 'bg-transparent'}`} 
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Est. Offline Crack Time</p>
                <p className="text-sm font-bold mt-1">{auditResult.crackTime}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Feedback</p>
                <p className="text-sm font-medium mt-1">{auditResult.feedback}</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
