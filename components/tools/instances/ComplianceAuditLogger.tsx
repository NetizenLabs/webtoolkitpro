'use client';

import React from 'react';
import { useAuditLogger } from '@/contexts/AuditLoggerContext';
import { Download, Trash2, ShieldCheck, Clock, Activity } from 'lucide-react';

export default function ComplianceAuditLogger() {
  const { logs, clearLogs, exportLogs } = useAuditLogger();

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
              Local Compliance Audit Log
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Securely view and export all offline interactions with sensitive utilities. 
              <strong> Zero PII is logged.</strong>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportLogs}
              disabled={logs.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Export JSON
            </button>
            <button
              onClick={clearLogs}
              disabled={logs.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {logs.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No audit logs generated yet.</p>
            <p className="text-sm mt-1">Run a sensitive tool like the Password Entropy Tester to generate logs.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-medium">Timestamp</th>
                  <th className="px-6 py-3 font-medium">Tool</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        {new Date(log.timestamp).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{log.toolName}</td>
                    <td className="px-6 py-4">
                      <code className="px-2 py-1 bg-muted rounded text-xs">
                        {log.action}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        log.status === 'SUCCESS' ? 'bg-green-500/10 text-green-500' :
                        log.status === 'ERROR' ? 'bg-red-500/10 text-red-500' :
                        'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {log.details || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
