"use client";

import React, { useState } from "react";
import { useNuvaMedStore } from "@/lib/store/useNuvaMedStore";
import {
  FileSearch,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ExternalLink,
  Filter,
} from "lucide-react";

export function AuditLedgerModule() {
  const { auditLogs } = useNuvaMedStore();
  const [filterAction, setFilterAction] = useState<string>("ALL");

  const filteredLogs = auditLogs.filter(
    (log) => filterAction === "ALL" || log.action === filterAction
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="swiss-card p-6 border-l-4 border-l-swiss-blue">
        <div className="flex items-center space-x-3">
          <FileSearch className="w-8 h-8 text-swiss-blue" />
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              HIPAA AUDIT &amp; COMPLIANCE LEDGER
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-0.5">
              Cryptographic Tamper-Proof Trail &amp; Merkle Verification on Aptos L1 Blockchain
            </p>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="swiss-card p-4 font-mono text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-neutral-400" />
          <span className="text-neutral-400 font-bold">FILTER BY ACTION:</span>
          {(["ALL", "UPLOAD", "PURCHASE_STREAM", "DECRYPT", "PACS_SYNC"] as const).map((act) => (
            <button
              key={act}
              onClick={() => setFilterAction(act)}
              className={`px-2.5 py-1 border transition font-bold ${
                filterAction === act
                  ? "bg-swiss-blue text-white border-swiss-blue"
                  : "border-surface-border text-neutral-400 hover:text-white"
              }`}
            >
              {act}
            </button>
          ))}
        </div>
        <span className="text-neutral-500">{filteredLogs.length} AUDIT LOG ENTRIES</span>
      </div>

      {/* Audit Log Table */}
      <div className="swiss-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-surface border-b border-surface-border text-neutral-400 text-[11px]">
              <tr>
                <th className="p-3">TIMESTAMP</th>
                <th className="p-3">ACTOR ADDRESS</th>
                <th className="p-3">ACTION TYPE</th>
                <th className="p-3">DETAILS</th>
                <th className="p-3 text-right">VERIFICATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border text-neutral-300">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition">
                  <td className="p-3 text-neutral-400 text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="p-3 text-swiss-teal font-bold truncate max-w-[140px]">
                    {log.actorAddress}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold border ${
                        log.action === "UPLOAD"
                          ? "bg-swiss-blue/20 text-swiss-blue border-swiss-blue/30"
                          : log.action === "PURCHASE_STREAM"
                          ? "bg-swiss-teal/20 text-swiss-teal border-swiss-teal/30"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 text-neutral-300">{log.details}</td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <span className="inline-flex items-center text-emerald-400 font-bold text-[10px]">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                      MERKLE PROVED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
