"use client";

import React from "react";
import { useNuvaMedStore, ActiveTab } from "@/lib/store/useNuvaMedStore";
import {
  LayoutDashboard,
  ShieldAlert,
  Zap,
  Network,
  Server,
  FileSearch,
  CheckCircle2,
  HardDrive,
  Sliders,
} from "lucide-react";

export function Sidebar() {
  const { activeTab, setActiveTab, readSession, studies } = useNuvaMedStore();

  const navItems: { id: ActiveTab; label: string; icon: any; badge?: string; desc: string }[] = [
    {
      id: "dashboard",
      label: "Network Dashboard",
      icon: LayoutDashboard,
      desc: "Shelby SP Topology & DoubleZero Fiber SLA",
    },
    {
      id: "router",
      label: "ZK DICOM Router",
      icon: ShieldAlert,
      badge: "MODULE 1",
      desc: "PHI De-Identification & AES-256 Shelby Upload",
    },
    {
      id: "micropayments",
      label: "AI Micropayments Engine",
      icon: Zap,
      badge: "MODULE 2",
      desc: "Optimistic Per-MB Off-Chain DICOM Streaming",
    },
    {
      id: "identity",
      label: "Identity Bridge",
      icon: Network,
      badge: "MODULE 3",
      desc: "AIP-113 Aptos Derivable Accounts (SIWE/SIWS)",
    },
    {
      id: "pacs",
      label: "Legacy PACS S3 Gateway",
      icon: Server,
      badge: "MODULE 4",
      desc: "Web2 GE/Siemens PACS S3 Endpoint Proxy",
    },
    {
      id: "audit",
      label: "HIPAA Audit Ledger",
      icon: FileSearch,
      desc: "Cryptographic Tamper-Proof Access Trail",
    },
  ];

  return (
    <aside className="w-full lg:w-72 bg-surface/80 border-r border-surface-border p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div>
          <h2 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3 px-2">
            CORE INFRASTRUCTURE MODULES
          </h2>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-3 transition-all flex items-start space-x-3 border ${
                    isActive
                      ? "bg-swiss-blue/10 border-swiss-blue text-white shadow-md shadow-swiss-blue/5"
                      : "border-transparent text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      isActive ? "text-swiss-blue" : "text-neutral-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm tracking-tight truncate">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="text-[9px] font-mono px-1 py-0.2 bg-swiss-blue/20 text-swiss-blue border border-swiss-blue/30 font-bold shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-mono text-neutral-500 truncate leading-tight mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Live Session Summary Card */}
        <div className="swiss-card p-3 font-mono text-xs space-y-2 border-l-2 border-l-swiss-teal">
          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-swiss-teal" />
              READ SESSION
            </span>
            <span className="text-emerald-400 font-bold">ACTIVE</span>
          </div>
          <div className="flex justify-between items-baseline pt-1 border-t border-surface-border">
            <span className="text-neutral-500 text-[11px]">USDC BALANCE:</span>
            <span className="text-white font-bold text-sm">${readSession.balanceUSDC.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-neutral-500 text-[11px]">STREAMED:</span>
            <span className="text-swiss-teal font-bold">{readSession.totalMBStreamed.toFixed(1)} MB</span>
          </div>
        </div>
      </div>

      {/* Network SLA Footer */}
      <div className="pt-4 border-t border-surface-border text-[10px] font-mono text-neutral-500 space-y-1">
        <div className="flex justify-between">
          <span>ERASURE CODING:</span>
          <span className="text-neutral-300 font-bold">CLAY 10+6</span>
        </div>
        <div className="flex justify-between">
          <span>REPAIR BANDWIDTH:</span>
          <span className="text-emerald-400 font-bold">4X REDUCTION</span>
        </div>
        <div className="flex justify-between">
          <span>SHELBY TOTAL BLOBS:</span>
          <span className="text-neutral-300 font-bold">{studies.length * 42} CHUNKSETS</span>
        </div>
      </div>
    </aside>
  );
}
