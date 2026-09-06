import React from "react";
import { AdminLogEntry } from "../adminTypes";

interface LogsTabProps {
  adminLogs: AdminLogEntry[];
}

export const LogsTab: React.FC<LogsTabProps> = ({ adminLogs }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
          Simulated Change Audit Logs
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Per Specification §32: Demonstrates captured content changes recorded
          for future live database binding.
        </p>
      </div>

      {adminLogs.length === 0 ? (
        <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
          No simulated editor actions captured yet. Try clicking "Save Draft" in
          the Site Content Editor tab.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs">
          {adminLogs.map((log, idx) => (
            <div
              key={idx}
              className="p-4 text-xs flex items-start justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold font-mono text-[10px]">
                    {log.action}
                  </span>
                  <span className="font-bold text-slate-800">
                    {log.section}
                  </span>
                </div>
                <pre className="bg-slate-50 p-2 rounded text-[10px] text-slate-600 font-mono overflow-x-auto max-w-xl">
                  {JSON.stringify(log.data, null, 2)}
                </pre>
              </div>
              <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
