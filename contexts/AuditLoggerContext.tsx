'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type AuditLogEntry = {
  id: string;
  timestamp: string;
  toolName: string;
  action: string;
  status: 'SUCCESS' | 'ERROR' | 'WARNING';
  details?: string;
};

type AuditLoggerContextType = {
  logs: AuditLogEntry[];
  logAudit: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  exportLogs: () => void;
};

const AuditLoggerContext = createContext<AuditLoggerContextType | undefined>(undefined);

export function AuditLoggerProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);

  // Load existing logs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('wtkpro_audit_logs');
      if (stored) {
        setLogs(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load audit logs:', e);
    }
  }, []);

  // Save logs to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('wtkpro_audit_logs', JSON.stringify(logs));
    } catch (e) {
      console.error('Failed to save audit logs:', e);
    }
  }, [logs]);

  const logAudit = (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    const newLog: AuditLogEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    
    setLogs(prev => [newLog, ...prev].slice(0, 5000)); // Keep last 5000 logs
  };

  const clearLogs = () => {
    setLogs([]);
    localStorage.removeItem('wtkpro_audit_logs');
  };

  const exportLogs = () => {
    try {
      const json = JSON.stringify(logs, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `wtkpro_audit_logs_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      logAudit({
        toolName: 'Audit Exporter',
        action: 'EXPORTED_LOGS',
        status: 'SUCCESS',
        details: `Exported ${logs.length} logs to JSON.`
      });
    } catch (error) {
      logAudit({
        toolName: 'Audit Exporter',
        action: 'EXPORTED_LOGS',
        status: 'ERROR',
        details: 'Failed to generate export file.'
      });
    }
  };

  return (
    <AuditLoggerContext.Provider value={{ logs, logAudit, clearLogs, exportLogs }}>
      {children}
    </AuditLoggerContext.Provider>
  );
}

export function useAuditLogger() {
  const context = useContext(AuditLoggerContext);
  if (context === undefined) {
    throw new Error('useAuditLogger must be used within an AuditLoggerProvider');
  }
  return context;
}
