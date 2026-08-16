"use client";

import React, { useState } from "react";
import { useNuvaMedStore } from "@/lib/store/useNuvaMedStore";
import { shelbyClient } from "@/lib/shelby/client";
import {
  Zap,
  Play,
  Pause,
  DollarSign,
  DownloadCloud,
  CheckCircle2,
  Database,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";

export function MicropaymentsModule() {
  const { studies, readSession, updateReadSession, addAuditLog, connectedAddress } = useNuvaMedStore();
  const [selectedStudy, setSelectedStudy] = useState(studies[0]);
  const [depositAmount, setDepositAmount] = useState(10);
  const [isTopupLoading, setIsTopupLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [downloadedMB, setDownloadedMB] = useState(0);
  const [currentSpeedMBs, setCurrentSpeedMBs] = useState(0);

  // Handle Off-chain Session Top-up
  const handleTopupSession = async () => {
    setIsTopupLoading(true);
    const newSession = await shelbyClient.openReadSession(connectedAddress || "0x71C765...", depositAmount);
    updateReadSession({
      sessionToken: newSession.sessionToken,
      balanceUSDC: readSession.balanceUSDC + depositAmount,
    });
    setIsTopupLoading(false);
  };

  // Simulate Optimistic Byte-Range Streaming with Live Off-Chain Micropayment Deductions
  const handleToggleStreaming = () => {
    if (isStreaming) {
      setIsStreaming(false);
      setCurrentSpeedMBs(0);
      return;
    }

    setIsStreaming(true);
    let currentMB = 0;
    const targetMB = selectedStudy.fileSizeBytes / (1024 * 1024);

    const interval = setInterval(() => {
      currentMB += 18.5; // Stream ~18.5 MB every tick
      const speed = 180 + Math.random() * 40; // ~180-220 MB/s over DoubleZero
      setCurrentSpeedMBs(speed);

      const incrementalCost = 18.5 * 0.005; // $0.005 / MB

      updateReadSession({
        balanceUSDC: Math.max(0, readSession.balanceUSDC - incrementalCost),
        totalMBStreamed: readSession.totalMBStreamed + 18.5,
      });

      setDownloadedMB((prev) => {
        if (prev + 18.5 >= targetMB) {
          clearInterval(interval);
          setIsStreaming(false);
          setCurrentSpeedMBs(0);

          addAuditLog({
            actorAddress: connectedAddress || "0x71C765...",
            action: "PURCHASE_STREAM",
            studyId: selectedStudy.id,
            details: `Optimistic Medical Read Stream completed. Downloaded ${targetMB.toFixed(1)} MB from Shelby Placement Group. Paid $${(targetMB * 0.005).toFixed(4)} USDC via off-chain read session.`,
          });

          return targetMB;
        }
        return prev + 18.5;
      });
    }, 200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="swiss-card p-6 border-l-4 border-l-swiss-teal">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8 text-swiss-teal" />
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              OPTIMISTIC MEDICAL MICROPAYMENTS ENGINE
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-0.5">
              AI Dataset Marketplace &amp; Zero-Latency Byte-Range Streamer ($0.005 / MB)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Medical Dataset Marketplace Catalog */}
        <div className="lg:col-span-7 space-y-6">
          <div className="swiss-card p-6 space-y-4">
            <h3 className="font-bold text-white text-sm tracking-tight border-b border-surface-border pb-3 flex items-center justify-between">
              <span className="flex items-center">
                <Database className="w-4 h-4 mr-2 text-swiss-teal" />
                AI TRAINING DATASET CATALOG
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                PRICE: <strong className="text-swiss-teal">$0.005 / MB</strong>
              </span>
            </h3>

            <div className="space-y-3">
              {studies.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    setSelectedStudy(s);
                    setDownloadedMB(0);
                  }}
                  className={`p-4 border cursor-pointer transition font-mono text-xs ${
                    selectedStudy.id === s.id
                      ? "bg-swiss-teal/15 border-swiss-teal text-white"
                      : "bg-surface border-surface-border text-neutral-400 hover:border-neutral-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white text-sm flex items-center">
                        <span className="w-2.5 h-2.5 bg-swiss-teal rounded-full mr-2"></span>
                        {s.studyDescription}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-1">
                        {s.hospitalName} // {s.modality} // {s.bodyPart}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-swiss-teal font-bold">
                        ${((s.fileSizeBytes / (1024 * 1024)) * 0.005).toFixed(2)} USDC
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        {(s.fileSizeBytes / (1024 * 1024)).toFixed(0)} MB TOTAL
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-surface-border flex justify-between items-center text-[10px] text-neutral-500">
                    <span>BLOB: {s.blobUri.substring(0, 26)}...</span>
                    <span className="text-emerald-400 font-bold">PLACEMENT GROUP #14</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Read Session & Live Byte Streaming Meter */}
        <div className="lg:col-span-5 space-y-6">
          {/* Read Session Management Card */}
          <div className="swiss-card p-6 space-y-4 font-mono">
            <h3 className="font-bold text-white text-sm tracking-tight border-b border-surface-border pb-3 flex items-center justify-between">
              <span className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1 text-emerald-400" />
                OFF-CHAIN READ SESSION
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                ACTIVE
              </span>
            </h3>

            <div className="p-3 bg-black/40 border border-surface-border space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">SESSION BALANCE:</span>
                <span className="text-white font-bold text-base">
                  ${readSession.balanceUSDC.toFixed(4)} USDC
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-neutral-500">TOTAL STREAMED:</span>
                <span className="text-swiss-teal font-bold">{readSession.totalMBStreamed.toFixed(1)} MB</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-neutral-500">SESSION TOKEN:</span>
                <span className="text-neutral-300 truncate max-w-[160px]">
                  {readSession.sessionToken?.substring(0, 16)}...
                </span>
              </div>
            </div>

            {/* Top-up Form */}
            <div className="space-y-2">
              <label className="text-[11px] text-neutral-400 block font-bold">DEPOSIT USDC READ FUNDS</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full bg-surface border border-surface-border px-3 py-2 text-white text-xs outline-none focus:border-swiss-teal font-mono"
                />
                <button
                  disabled={isTopupLoading}
                  onClick={handleTopupSession}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs uppercase tracking-wider transition shrink-0"
                >
                  {isTopupLoading ? "FUNDING..." : "+ DEPOSIT"}
                </button>
              </div>
            </div>
          </div>

          {/* Live Streaming Meter Card */}
          <div className="swiss-card p-6 space-y-4 font-mono">
            <h3 className="font-bold text-white text-sm tracking-tight border-b border-surface-border pb-3 flex items-center justify-between">
              <span className="flex items-center">
                <Activity className="w-4 h-4 mr-2 text-swiss-teal animate-pulse" />
                BYTE-RANGE STREAMING METER
              </span>
              {isStreaming && (
                <span className="text-[10px] text-emerald-400 font-bold animate-pulse">
                  {currentSpeedMBs.toFixed(0)} MB/s OVER FIBER
                </span>
              )}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">TARGET DATASET:</span>
                <span className="text-white font-bold">{selectedStudy.modality} ({selectedStudy.bodyPart})</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500">PROGRESS:</span>
                  <span className="text-swiss-teal font-bold">
                    {downloadedMB.toFixed(1)} / {(selectedStudy.fileSizeBytes / (1024 * 1024)).toFixed(0)} MB
                  </span>
                </div>
                <div className="w-full bg-black h-3 border border-surface-border overflow-hidden p-0.5">
                  <div
                    className="bg-swiss-teal h-full transition-all duration-150"
                    style={{
                      width: `${(downloadedMB / (selectedStudy.fileSizeBytes / (1024 * 1024))) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Stream Trigger Button */}
              <button
                onClick={handleToggleStreaming}
                className={`w-full py-3 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 ${
                  isStreaming
                    ? "bg-swiss-red text-white"
                    : "bg-swiss-teal hover:bg-teal-500 text-black shadow-lg shadow-swiss-teal/20"
                }`}
              >
                {isStreaming ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>PAUSE OPTIMISTIC STREAM</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>START OPTIMISTIC STREAM &amp; READ</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
