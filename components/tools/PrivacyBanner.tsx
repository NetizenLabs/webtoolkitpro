'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyBanner() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-start gap-3">
      <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-green-800">Strictly Client-Side Processing</p>
        <p className="text-xs text-green-700 mt-1">
          Your proprietary prompts and training data never leave your browser. All computations, formatting, and validation are executed locally on your machine.
        </p>
      </div>
    </div>
  );
}
