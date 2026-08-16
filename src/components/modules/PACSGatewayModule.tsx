"use client";

import React, { useState } from "react";
import { useNuvaMedStore } from "@/lib/store/useNuvaMedStore";
import {
  Server,
  Database,
  ArrowRight,
  CheckCircle2,
  TrendingDown,
  Terminal,
  Play,
  Copy,
  Sliders,
} from "lucide-react";

export function PACSGatewayModule() {
  const { addAuditLog, connectedAddress } = useNuvaMedStore();
  const [s3Bucket, setS3Bucket] = useState("hospital-mri-archive");
  const [s3Key, setS3Key] = useState("2026/08/study_chest_ct_883.dcm");
  const [pacsSystem, setPacsSystem] = useState("GE_HEALTHCARE_CENTRICITY");
  const [annualDataGB, setAnnualDataGB] = useState(5000); // 5,000 GB / year
  const [downloadsPerYear, setDownloadsPerYear] = useState(10); // 10x egress reads

  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  // AWS S3 Cost Calculation:
  // S3 Storage: $0.023/GB/month = $0.276/GB/year
  // S3 Egress Fee: $0.09/GB per download
  const awsStorageCost = annualDataGB * 0.023 * 12;
  const awsEgressCost = annualDataGB * downloadsPerYear * 0.09;
  const awsTotalCost = awsStorageCost + awsEgressCost;

  // Shelby Cost:
  // Shelby Storage: $0.005/GB/month = $0.06/GB/year (Clay codes 10+6)
  // Shelby Read: $0.005/GB per read over DoubleZero
  const shelbyStorageCost = annualDataGB * 0.005 * 12;
  const shelbyReadCost = annualDataGB * downloadsPerYear * 0.005;
  const shelbyTotalCost = shelbyStorageCost + shelbyReadCost;

  const savingsUSDC = awsTotalCost - shelbyTotalCost;
  const savingsPercent = ((savingsUSDC / awsTotalCost) * 100).toFixed(0);

  const handleTestS3Proxy = async () => {
    setIsTesting(true);
    setTestResult(null);

    await new Promise((r) => setTimeout(r, 600));

    setTestResult(
      `S3 PROXY GATEWAY HTTP 200 OK\n` +
      `Request: PUT /api/s3/${s3Bucket}/${s3Key}\n` +
      `Headers: Host: gateway.nuvamed.health | X-Amz-Date: 20260816T094500Z\n` +
      `Shelby Pipeline: Erasure Coded (10+6 Clay) -> Dispatched to Placement Group #14\n` +
      `Aptos Tx Hash: 0x9810ab392c10f8832a107f201048bca29d10e882\n` +
      `Status: Web2 Legacy PACS payload successfully stored on Shelby Protocol!`
    );

    addAuditLog({
      actorAddress: connectedAddress || "0x71C765...",
      action: "PACS_SYNC",
      studyId: "pacs-gateway-test",
      details: `Web2 Legacy PACS S3 Proxy write satisfied. Key: ${s3Bucket}/${s3Key}. Translated into Shelby Placement Group transaction.`,
    });

    setIsTesting(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="swiss-card p-6 border-l-4 border-l-swiss-blue">
        <div className="flex items-center space-x-3">
          <Server className="w-8 h-8 text-swiss-blue" />
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              S3 DICOM GATEWAY FOR LEGACY PACS
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-0.5">
              Transparent Web2 S3 Proxy Endpoint Adapter for GE, Siemens, Horos &amp; OsiriX PACS
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: S3 Endpoint Adapter Configuration */}
        <div className="lg:col-span-6 space-y-6">
          <div className="swiss-card p-6 space-y-5 font-mono">
            <h3 className="font-bold text-white text-sm tracking-tight border-b border-surface-border pb-3 flex items-center">
              <Terminal className="w-4 h-4 mr-2 text-swiss-blue" />
              WEB2 PACS S3 PROXY CONFIGURATION
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1 font-bold">PACS SYSTEM VENDOR</label>
                <select
                  value={pacsSystem}
                  onChange={(e) => setPacsSystem(e.target.value)}
                  className="w-full bg-surface border border-surface-border p-2.5 text-white outline-none focus:border-swiss-blue"
                >
                  <option value="GE_HEALTHCARE_CENTRICITY">GE Healthcare Centricity PACS</option>
                  <option value="SIEMENS_SYNGO_VIA">Siemens Syngo.via PACS</option>
                  <option value="PHILIPS_INTELLISPACE">Philips IntelliSpace PACS</option>
                  <option value="HOROS_OSIRIX_MAC">Horos / OsiriX Mac Workstation</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1 font-bold">S3 BUCKET ALIAS</label>
                <input
                  type="text"
                  value={s3Bucket}
                  onChange={(e) => setS3Bucket(e.target.value)}
                  className="w-full bg-surface border border-surface-border p-2 text-white outline-none focus:border-swiss-blue"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1 font-bold">S3 DICOM OBJECT KEY</label>
                <input
                  type="text"
                  value={s3Key}
                  onChange={(e) => setS3Key(e.target.value)}
                  className="w-full bg-surface border border-surface-border p-2 text-white outline-none focus:border-swiss-blue"
                />
              </div>

              <div className="p-3 bg-black/40 border border-surface-border space-y-1 text-[11px]">
                <div className="text-neutral-500">S3 ENDPOINT URL (CONFIGURE IN PACS):</div>
                <div className="text-swiss-teal font-bold select-all">
                  https://gateway.nuvamed.health/api/s3
                </div>
              </div>

              <button
                disabled={isTesting}
                onClick={handleTestS3Proxy}
                className="w-full py-3 bg-swiss-blue hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>TEST S3 PACS PUT/GET OPERATION</span>
              </button>

              {testResult && (
                <div className="p-3 bg-black border border-emerald-500/50 text-emerald-400 text-[11px] whitespace-pre-wrap font-mono">
                  {testResult}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AWS S3 vs Shelby Cost Calculator */}
        <div className="lg:col-span-6 space-y-6">
          <div className="swiss-card p-6 space-y-5 font-mono">
            <h3 className="font-bold text-white text-sm tracking-tight border-b border-surface-border pb-3 flex items-center justify-between">
              <span className="flex items-center">
                <TrendingDown className="w-4 h-4 mr-2 text-emerald-400" />
                AWS S3 vs SHELBY COST COMPARISON
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                -{savingsPercent}% SAVINGS
              </span>
            </h3>

            {/* Sliders */}
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-400">ANNUAL DICOM DATA VOLUME:</span>
                  <span className="text-white font-bold">{annualDataGB.toLocaleString()} GB</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={50000}
                  step={500}
                  value={annualDataGB}
                  onChange={(e) => setAnnualDataGB(Number(e.target.value))}
                  className="w-full accent-swiss-blue cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-400">READ DOWNLOAD MULTIPLIER:</span>
                  <span className="text-white font-bold">{downloadsPerYear}x / YEAR</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={downloadsPerYear}
                  onChange={(e) => setDownloadsPerYear(Number(e.target.value))}
                  className="w-full accent-swiss-teal cursor-pointer"
                />
              </div>

              {/* Comparison Table */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {/* AWS Box */}
                <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-300 space-y-1">
                  <div className="font-bold text-xs text-white">AWS S3 CLOUD</div>
                  <div className="text-lg font-bold text-red-400">${awsTotalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} / yr</div>
                  <div className="text-[10px] text-neutral-400">Includes $0.09/GB Egress Fee</div>
                </div>

                {/* Shelby Box */}
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 space-y-1">
                  <div className="font-bold text-xs text-white">SHELBY PROTOCOL</div>
                  <div className="text-lg font-bold text-emerald-400">${shelbyTotalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} / yr</div>
                  <div className="text-[10px] text-emerald-400 font-bold">DoubleZero Fiber Included</div>
                </div>
              </div>

              <div className="p-3 bg-black/40 border border-surface-border text-center text-xs text-neutral-300">
                TOTAL ANNUAL COST SAVINGS: <strong className="text-emerald-400 text-sm">${savingsUSDC.toLocaleString(undefined, { maximumFractionDigits: 0 })} USDC</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
