'use client';

import React, { useState } from 'react';
import yaml from 'js-yaml';
import { ShieldCheck, AlertTriangle, FileCode, CheckCircle, RefreshCcw } from 'lucide-react';

export default function K8sYamlValidator() {
  const [input, setInput] = useState('apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\n  labels:\n    app: nginx\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.14.2\n        ports:\n        - containerPort: 80');
  const [results, setResults] = useState<{status: 'success' | 'error' | 'warning', message: string, line?: number}[]>([]);

  const handleValidate = () => {
    try {
      setResults([]);
      const newResults: typeof results = [];
      
      // Kubernetes manifests can contain multiple YAML documents separated by ---
      const docs = yaml.loadAll(input);
      
      if (docs.length === 0) {
        setResults([{status: 'error', message: 'No valid YAML documents found.'}]);
        return;
      }

      docs.forEach((doc: any, index: number) => {
        const docName = `Document ${index + 1}`;
        
        if (typeof doc !== 'object' || doc === null) {
          newResults.push({status: 'error', message: `${docName} is not a valid Kubernetes object.`});
          return;
        }

        if (!doc.apiVersion) {
          newResults.push({status: 'error', message: `${docName}: Missing mandatory 'apiVersion' field.`});
        }
        
        if (!doc.kind) {
          newResults.push({status: 'error', message: `${docName}: Missing mandatory 'kind' field.`});
        }
        
        if (!doc.metadata || !doc.metadata.name) {
          newResults.push({status: 'error', message: `${docName}: Missing mandatory 'metadata.name' field.`});
        }

        // Deprecation warnings (common k8s updates)
        if (doc.apiVersion === 'extensions/v1beta1' || doc.apiVersion === 'apps/v1beta1' || doc.apiVersion === 'apps/v1beta2') {
          newResults.push({status: 'warning', message: `${docName}: apiVersion '${doc.apiVersion}' is deprecated in modern K8s clusters. Use 'apps/v1'.`});
        }
        if (doc.apiVersion === 'networking.k8s.io/v1beta1') {
          newResults.push({status: 'warning', message: `${docName}: apiVersion Ingress networking.k8s.io/v1beta1 is deprecated. Use 'networking.k8s.io/v1'.`});
        }

        // Resource limit checks (best practices)
        if (doc.kind === 'Deployment' || doc.kind === 'Pod' || doc.kind === 'StatefulSet') {
          let containers = [];
          if (doc.kind === 'Pod') containers = doc.spec?.containers || [];
          else containers = doc.spec?.template?.spec?.containers || [];

          if (Array.isArray(containers)) {
            containers.forEach((c: any) => {
              if (!c.resources || !c.resources.limits || !c.resources.requests) {
                newResults.push({status: 'warning', message: `${docName}: Container '${c.name || 'unnamed'}' is missing CPU/Memory resources limits or requests. This is an anti-pattern.`});
              }
            });
          }
        }
      });

      if (newResults.length === 0) {
        newResults.push({status: 'success', message: 'All YAML documents are valid Kubernetes manifests.'});
      }

      setResults(newResults);
    } catch (e: any) {
      setResults([{
        status: 'error', 
        message: `YAML Parsing Error: ${e.message}`, 
        line: e.mark?.line 
      }]);
    }
  };

  const handleClear = () => {
    setInput('');
    setResults([]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-blue-500" />
            Kubernetes YAML Manifest
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[500px] p-4 font-mono text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-900 text-gray-100 resize-none"
            placeholder="Paste your K8s deployment, service, ingress, or configmap YAML here..."
            spellCheck="false"
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleValidate}
              className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" /> Lint & Validate Manifest
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-3 bg-white text-gray-700 border font-semibold rounded-xl hover:bg-gray-50 transition flex items-center justify-center"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Output */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Validation Results
          </label>
          <div className="w-full h-[500px] p-4 border rounded-xl bg-gray-50 overflow-y-auto">
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ShieldCheck className="w-12 h-12 mb-2 opacity-50" />
                <p>Click validate to lint your K8s manifests</p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((result, i) => (
                  <div key={i} className={`p-4 rounded-lg border ${
                    result.status === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                    result.status === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                    'bg-green-50 border-green-200 text-green-800'
                  }`}>
                    <div className="flex items-start gap-3">
                      {result.status === 'error' && <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />}
                      {result.status === 'warning' && <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-600" />}
                      {result.status === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />}
                      <div>
                        <p className="font-semibold text-sm">
                          {result.status === 'error' ? 'Error' : result.status === 'warning' ? 'Warning' : 'Success'}
                        </p>
                        <p className="text-sm mt-1">{result.message}</p>
                        {result.line !== undefined && (
                          <p className="text-xs mt-2 font-mono bg-white/50 inline-block px-2 py-1 rounded">Line: {result.line + 1}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
