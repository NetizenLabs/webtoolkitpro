'use client';

import React, { useState } from 'react';
import { Calendar, FileCode, ArrowRight, Copy, Check } from 'lucide-react';

export default function CronToK8s() {
  const [cronExpression, setCronExpression] = useState('0 2 * * *');
  const [jobName, setJobName] = useState('daily-backup');
  const [image, setImage] = useState('busybox:1.28');
  const [command, setCommand] = useState('/bin/sh, -c, date; echo Hello from the Kubernetes cluster');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    // Basic validation to ensure cron has 5 parts (K8s standard)
    const parts = cronExpression.trim().split(/\s+/);
    if (parts.length !== 5) {
      setOutput('# Error: Kubernetes CronJobs require exactly 5 fields (minute hour day-of-month month day-of-week).\n# Example: 0 2 * * *');
      return;
    }

    const commandArray = command.split(',').map(c => `"${c.trim()}"`).join(', ');

    const yaml = `apiVersion: batch/v1
kind: CronJob
metadata:
  name: ${jobName.toLowerCase().replace(/[^a-z0-9-]/g, '-')}
spec:
  schedule: "${cronExpression}"
  concurrencyPolicy: Forbid
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: ${jobName.toLowerCase().replace(/[^a-z0-9-]/g, '-')}
            image: ${image}
            imagePullPolicy: IfNotPresent
            command:
            - ${commandArray.replace(/, /g, '\n            - ').replace(/"/g, '')}
            resources:
              requests:
                memory: "64Mi"
                cpu: "50m"
              limits:
                memory: "128Mi"
                cpu: "100m"
          restartPolicy: OnFailure
`;
    setOutput(yaml);
  };

  const copyToClipboard = () => {
    if (output && !output.startsWith('# Error')) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Form */}
        <div className="flex flex-col space-y-4 p-6 bg-white border rounded-xl shadow-sm">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            CronJob Configuration
          </label>
          
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Cron Schedule Expression</label>
            <input 
              type="text" 
              value={cronExpression}
              onChange={(e) => setCronExpression(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="0 2 * * *"
            />
            <p className="text-xs text-gray-400 mt-1">Format: Minute Hour Day Month Weekday</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Job Name</label>
            <input 
              type="text" 
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="my-cron-job"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Container Image</label>
            <input 
              type="text" 
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="ubuntu:latest"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Command (comma separated array)</label>
            <input 
              type="text" 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="/bin/sh, -c, echo Hello"
            />
          </div>

          <button
            onClick={handleConvert}
            className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            Generate K8s Manifest <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        {/* Output */}
        <div className="flex flex-col space-y-4">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-green-500" />
            batch/v1 CronJob YAML
          </label>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              className="w-full h-[450px] p-6 font-mono text-sm border rounded-xl bg-gray-900 text-green-400 resize-none shadow-inner"
              spellCheck="false"
              placeholder="YAML will generate here..."
            />
            {output && !output.startsWith('# Error') && (
              <button
                onClick={copyToClipboard}
                className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition shadow flex items-center gap-2 text-xs font-bold"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy YAML'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
