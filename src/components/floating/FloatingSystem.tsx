"use client";

import React, { useState, useEffect } from "react";
import { useNuvaMedStore, ActiveTab } from "@/lib/store/useNuvaMedStore";
import {
  Command,
  Activity,
  Zap,
  ShieldCheck,
  Server,
  Network,
  FileSearch,
  Search,
  X,
  ArrowRight,
  Layers,
  ChevronUp,
} from "lucide-react";

export function FloatingSystem() {
  const {
    activeTab,
    setActiveTab,
    readSession,
    updateReadSession,
    studies,
    setSelectedStudyForViewer,
  } = useNuvaMedStore();

  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isStatusExpanded, setIsStatusExpanded] = useState(false);

  // Cmd + K / Ctrl + K Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsCommandOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered Command Actions
  const commandActions = [
    {
      id: "nav-router",
      title: "Launch Zero-Knowledge DICOM Router",
      category: "MODULES",
      icon: ShieldCheck,
      action: () => {
        setActiveTab("router");
        setIsCommandOpen(false);
      },
    },
    {
      id: "nav-micropayments",
      title: "Open AI Medical Micropayments Engine",
      category: "MODULES",
      icon: Zap,
      action: () => {
        setActiveTab("micropayments");
        setIsCommandOpen(false);
      },
    },
    {
      id: "nav-identity",
      title: "Manage Cross-Chain Identity Bridge (AIP-113)",
      category: "MODULES",
      icon: Network,
      action: () => {
        setActiveTab("identity");
        setIsCommandOpen(false);
      },
    },
    {
      id: "nav-pacs",
      title: "Configure Legacy PACS S3 Gateway",
      category: "MODULES",
      icon: Server,
      action: () => {
        setActiveTab("pacs");
        setIsCommandOpen(false);
      },
    },
    {
      id: "nav-audit",
      title: "Inspect HIPAA Audit Ledger & Merkle Proofs",
      category: "MODULES",
      icon: FileSearch,
      action: () => {
        setActiveTab("audit");
        setIsCommandOpen(false);
      },
    },
  ];

  const filteredActions = commandActions.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* 1. BOTTOM LEFT: Floating Network Telemetry & DoubleZero SLA Pill */}
      <div className="fixed bottom-4 left-4 z-40 font-mono text-xs hidden sm:block">
        <div className="relative">
          {/* Collapsed Pill */}
          <button
            onClick={() => setIsStatusExpanded((prev) => !prev)}
            className="flex items-center space-x-2.5 px-3 py-2 bg-surface/90 border border-surface-border backdrop-blur-md shadow-2xl hover:border-swiss-teal transition-all text-neutral-300 rounded-none group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-[11px] tracking-wider text-white">
              SHELBY L1 NETWORK
            </span>
            <span className="text-[10px] text-swiss-teal bg-swiss-teal/10 px-1.5 py-0.5 border border-swiss-teal/30">
              &lt; 1.4ms FIBER
            </span>
            <ChevronUp
              className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${
                isStatusExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Expanded Telemetry Drawer */}
          {isStatusExpanded && (
            <div className="absolute bottom-11 left-0 w-72 bg-surface/95 border border-surface-border p-4 shadow-2xl backdrop-blur-lg space-y-3">
              <div className="flex items-center justify-between border-b border-surface-border pb-2 text-[11px]">
                <span className="font-bold text-white flex items-center">
                  <Activity className="w-3.5 h-3.5 mr-1.5 text-swiss-teal" />
                  PLACEMENT GROUP TELEMETRY
                </span>
                <span className="text-emerald-400 font-bold">PG #14</span>
              </div>
              <div className="space-y-1.5 text-[10px] text-neutral-400">
                <div className="flex justify-between">
                  <span>CLAY ERASURE CODES:</span>
                  <span className="text-white font-bold">10 DATA + 6 PARITY</span>
                </div>
                <div className="flex justify-between">
                  <span>SETTLEMENT LAYER:</span>
                  <span className="text-swiss-blue font-bold">APTOS L1 TESTNET</span>
                </div>
                <div className="flex justify-between">
                  <span>CAVALIER SP NODES:</span>
                  <span className="text-emerald-400 font-bold">16 ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span>STORAGE COST:</span>
                  <span className="text-swiss-teal font-bold">$0.005 / GB / MO</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. BOTTOM RIGHT: Sticky Micropayment Read Session Dock */}
      <div className="fixed bottom-4 right-4 z-40 font-mono text-xs">
        <div className="flex items-center space-x-2 bg-surface/90 border border-swiss-teal/40 p-2 pl-3 backdrop-blur-md shadow-2xl">
          <div className="space-y-0.5">
            <div className="text-[10px] text-neutral-400 leading-none">USDC BALANCE</div>
            <div className="text-white font-bold text-xs leading-none">
              ${readSession.balanceUSDC.toFixed(3)}
            </div>
          </div>
          <div className="h-6 w-px bg-surface-border my-auto"></div>
          <button
            onClick={() => setActiveTab("micropayments")}
            className="px-2.5 py-1.5 bg-swiss-teal hover:bg-teal-500 text-black font-bold text-[10px] uppercase tracking-wider transition flex items-center space-x-1"
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>TOP UP</span>
          </button>
        </div>
      </div>

      {/* 3. CENTER / COMMAND PALETTE TRIGGER BADGE */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden md:block font-mono text-xs">
        <button
          onClick={() => setIsCommandOpen(true)}
          className="flex items-center space-x-2 px-3 py-1.5 bg-black/80 border border-surface-border text-neutral-400 hover:text-white hover:border-swiss-blue transition backdrop-blur-md shadow-xl"
        >
          <Command className="w-3.5 h-3.5 text-swiss-blue" />
          <span className="text-[11px]">PRESS</span>
          <kbd className="px-1.5 py-0.5 bg-surface border border-neutral-700 text-[10px] text-white font-bold">
            ⌘K
          </kbd>
          <span className="text-[11px]">FOR COMMAND PALETTE</span>
        </button>
      </div>

      {/* 4. MODAL: Linear / Raycast Style Command Palette Modal */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
          <div className="w-full max-w-xl bg-surface border border-surface-border shadow-2xl overflow-hidden font-mono text-xs animate-in fade-in zoom-in-95 duration-150">
            {/* Search Input Bar */}
            <div className="p-3 border-b border-surface-border flex items-center space-x-3 bg-black/40">
              <Search className="w-4 h-4 text-swiss-blue shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search commands, modules, DICOM studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white text-xs outline-none placeholder:text-neutral-500"
              />
              <button
                onClick={() => setIsCommandOpen(false)}
                className="text-neutral-500 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              <div className="px-2 py-1 text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                NAVIGATION &amp; MODULES
              </div>
              {filteredActions.map((cmd) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    className="w-full text-left p-2.5 flex items-center justify-between hover:bg-swiss-blue/20 hover:border-swiss-blue border border-transparent transition text-neutral-300 hover:text-white group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className="w-4 h-4 text-swiss-teal group-hover:text-swiss-blue" />
                      <span className="font-bold">{cmd.title}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-swiss-blue transition-opacity" />
                  </button>
                );
              })}
            </div>

            {/* Footer Hints */}
            <div className="p-2.5 bg-black/60 border-t border-surface-border flex justify-between items-center text-[10px] text-neutral-500">
              <span>NUVAMED ENTERPRISE COMMAND PALETTE</span>
              <span>ESC TO CLOSE</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
