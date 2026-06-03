'use client';

import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Terminal, AlertCircle } from 'lucide-react';

// Tauri commands
import { invoke } from '@tauri-apps/api/core';

export default function DesktopLicenseGuard({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLicensed, setIsLicensed] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [licenseKey, setLicenseKey] = useState('');
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if running in Tauri
    const checkEnvironment = async () => {
      try {
        const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
        if (!isTauri) {
          setIsDesktop(false);
          setLoading(false);
          return;
        }

        setIsDesktop(true);

        // Check if previously licensed
        const storedLicense = localStorage.getItem('wtk_enterprise_license_valid');
        if (storedLicense === 'true') {
          setIsLicensed(true);
          setLoading(false);
          return;
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    checkEnvironment();
  }, []);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidating(true);

    try {
      if (!licenseKey.trim()) {
        throw new Error("Please enter a valid license key");
      }

      // Get hardware ID from Tauri plugin
      let hardwareId = "fallback_id_" + Math.random().toString(36).substring(7);
      try {
        const uidResult = await invoke<{ status: string, data?: { id: string } }>('plugin:machine-uid|get_machine_uid');
        if (uidResult && uidResult.status === 'ok' && uidResult.data) {
          hardwareId = uidResult.data.id;
        }
      } catch (e) {
        console.warn("Failed to get hardware ID, using fallback", e);
      }

      // We MUST use absolute URL if we are in Tauri because relative URLs won't hit the Next.js server
      const serverUrl = 'https://wtkpro.site/api/license/validate';

      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          licenseKey: licenseKey.trim(),
          hardwareId: hardwareId
        })
      });

      const data = await response.json();

      if (data.valid) {
        localStorage.setItem('wtk_enterprise_license_valid', 'true');
        localStorage.setItem('wtk_enterprise_tier', data.tier);
        setIsLicensed(true);
      } else {
        setError(data.error || "Invalid license key");
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to validation server");
    } finally {
      setValidating(false);
    }
  };

  // If loading or not desktop, just render children immediately
  if (loading || !isDesktop) {
    return <>{children}</>;
  }

  // If desktop and licensed, render children
  if (isDesktop && isLicensed) {
    return <>{children}</>;
  }

  // If desktop and UNLICENSED, render the strict lock screen
  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-4 selection:bg-[#00D4B4]/30">
      
      {/* Background Ornaments */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00D4B4]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-[#0094FF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00D4B4]/10 mb-6 border border-[#00D4B4]/20">
            <Lock className="w-8 h-8 text-[#00D4B4]" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-3">Enterprise Activation</h1>
          <p className="text-slate-400 text-sm">
            You are running the offline, air-gapped desktop edition. Please enter your Whop.com License Key to activate this machine.
          </p>
        </div>

        <form onSubmit={handleValidate} className="card-premium p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          <div className="mb-6 relative">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">License Key</label>
            <div className="relative">
              <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="whop_xxxxxxxxxxxx..."
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#00D4B4]/50 focus:border-[#00D4B4] transition-all font-mono text-sm"
                required
              />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <p className="text-sm text-rose-400 font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={validating || !licenseKey}
            className="w-full bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-slate-900 font-bold py-4 rounded-xl shadow-lg hover:shadow-[#00D4B4]/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {validating ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                Validating Server...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" /> Activate Machine
              </span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Don't have a license? Get one on <a href="https://whop.com/webtoolkit-pro/" target="_blank" rel="noreferrer" className="text-[#00D4B4] hover:underline">Whop.com</a></p>
        </div>
      </div>
    </div>
  );
}
