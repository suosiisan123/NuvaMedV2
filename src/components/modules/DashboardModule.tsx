"use client";

import React, { useState, useEffect } from "react";
import { useNuvaMedStore } from "@/lib/store/useNuvaMedStore";
import { DicomViewer } from "../dicom/DicomViewer";
import {
  Activity,
  Database,
  Server,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
  TrendingDown,
  Lock,
  Layers,
} from "lucide-react";

export function DashboardModule() {
  const { studies, setSelectedStudyForViewer, selectedStudyForViewer, setActiveTab } = useNuvaMedStore();
  const [activePg, setActivePg] = useState(14);

  // Generate 16 Cavalier SP nodes topology for selected placement group
  const spNodes = Array.from({ length: 16 }).map((_, idx) => ({
    id: idx,
    name: `SP-${(idx + 1).toString().padStart(2, "0")}`,
    isData: idx < 10,
    status: "ONLINE",
    latency: (1.1 + (idx % 4) * 0.3).toFixed(1),
    ioDepth: 128 - idx * 2,
  }));

  return (
    <div className="space-y-6">
      {/* Top Key Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="swiss-card p-4 border-l-4 border-l-swiss-blue">
          <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
            <span>STORAGE COST (SHELBY)</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">$0.0050 / GB</div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center">
            <span>-58% SAVINGS VS AWS S3 ($0.023/GB)</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="swiss-card p-4 border-l-4 border-l-swiss-teal">
          <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
            <span>DOUBLEZERO TAIL LATENCY</span>
            <Activity className="w-4 h-4 text-swiss-teal" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">&lt; 1.4 ms</div>
          <div className="text-[11px] font-mono text-swiss-teal mt-1">
            PRIVATE FIBER NETWORK ROUTING
          </div>
        </div>

        {/* Metric 3 */}
        <div className="swiss-card p-4 border-l-4 border-l-swiss-red">
          <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
            <span>ERASURE REPAIR EFFICIENCY</span>
            <ShieldCheck className="w-4 h-4 text-swiss-red" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">4X REDUCTION</div>
          <div className="text-[11px] font-mono text-neutral-400 mt-1">
            CLAY CODES 10 DATA + 6 PARITY
          </div>
        </div>

        {/* Metric 4 */}
        <div className="swiss-card p-4 border-l-4 border-l-amber-500">
          <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
            <span>ACTIVE DICOM STUDIES</span>
            <Database className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{studies.length} STUDIES</div>
          <div className="text-[11px] font-mono text-amber-400 mt-1">
            1,335 MB DE-IDENTIFIED & ENCRYPTED
          </div>
        </div>
      </div>

      {/* Main Grid: Topology Graph + DICOM Viewer Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Shelby Placement Group Topology Visualizer */}
        <div className="lg:col-span-5 space-y-6">
          {/* Placement Group Visualizer */}
          <div className="swiss-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <div>
                <h3 className="font-bold text-white text-sm tracking-tight flex items-center">
                  <Server className="w-4 h-4 mr-2 text-swiss-blue" />
                  PLACEMENT GROUP TOPOLOGY
                </h3>
                <p className="text-[11px] font-mono text-neutral-400">
                  16 Cavalier Storage Provider Nodes (10 Data + 6 Parity)
                </p>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-swiss-blue/20 text-swiss-blue border border-swiss-blue/40 font-bold">
                PG #{activePg}
              </span>
            </div>

            {/* 16 SP Node Grid */}
            <div className="grid grid-cols-4 gap-2">
              {spNodes.map((sp) => (
                <div
                  key={sp.id}
                  className={`p-2.5 border text-center transition font-mono ${
                    sp.isData
                      ? "bg-swiss-blue/10 border-swiss-blue/40 text-neutral-200"
                      : "bg-swiss-teal/10 border-swiss-teal/40 text-swiss-teal"
                  }`}
                >
                  <div className="text-[10px] font-bold tracking-wider">{sp.name}</div>
                  <div className="text-[9px] mt-1 text-neutral-400">{sp.latency} ms</div>
                  <div
                    className={`mt-1 text-[8px] font-bold uppercase px-1 py-0.2 ${
                      sp.isData ? "bg-swiss-blue/30 text-white" : "bg-swiss-teal/30 text-swiss-teal"
                    }`}
                  >
                    {sp.isData ? "DATA" : "PARITY"}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-black/40 border border-surface-border font-mono text-xs text-neutral-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-neutral-500">I/O ENGINE ARCHITECTURE:</span>
                <span className="text-white font-bold">io_uring (Kernel Bypass)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">RECONSTRUCTION THRESHOLD:</span>
                <span className="text-emerald-400 font-bold">ANY 10 OF 16 SPs</span>
              </div>
            </div>
          </div>

          {/* Network DICOM Studies Feed */}
          <div className="swiss-card p-5 space-y-3">
            <div className="flex justify-between items-center border-b border-surface-border pb-2">
              <h3 className="font-bold text-white text-sm tracking-tight flex items-center">
                <Layers className="w-4 h-4 mr-2 text-swiss-teal" />
                RECENT DICOM STUDIES
              </h3>
              <button
                onClick={() => setActiveTab("router")}
                className="text-[11px] font-mono text-swiss-blue hover:underline flex items-center"
              >
                UPLOAD NEW <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </button>
            </div>

            <div className="space-y-2">
              {studies.map((study) => (
                <div
                  key={study.id}
                  onClick={() => setSelectedStudyForViewer(study)}
                  className={`p-3 border cursor-pointer transition font-mono text-xs flex items-center justify-between ${
                    selectedStudyForViewer?.id === study.id
                      ? "bg-swiss-blue/15 border-swiss-blue text-white"
                      : "bg-surface border-surface-border text-neutral-400 hover:border-neutral-500"
                  }`}
                >
                  <div>
                    <div className="font-bold text-white flex items-center">
                      <span className="w-2 h-2 bg-swiss-teal rounded-full mr-2"></span>
                      {study.studyDescription}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">
                      {study.modality} // {study.bodyPart} // {(study.fileSizeBytes / (1024 * 1024)).toFixed(0)} MB
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-black/40 border border-neutral-700 font-bold text-neutral-300">
                    VIEW
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live PACS Interactive DICOM Canvas Viewer */}
        <div className="lg:col-span-7 h-[640px]">
          {selectedStudyForViewer ? (
            <DicomViewer study={selectedStudyForViewer} />
          ) : (
            <div className="swiss-card h-full flex flex-col items-center justify-center text-neutral-500 p-8">
              <Layers className="w-12 h-12 mb-3 text-neutral-600" />
              <p className="font-mono text-sm">SELECT A STUDY TO LAUNCH PACS VIEWER</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
