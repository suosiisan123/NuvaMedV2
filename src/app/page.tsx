"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSystem } from "@/components/floating/FloatingSystem";
import { DicomViewer } from "@/components/dicom/DicomViewer";
import { useNuvaMedStore } from "@/lib/store/useNuvaMedStore";
import {
  ShieldCheck,
  Zap,
  Server,
  Network,
  ArrowRight,
  CheckCircle2,
  Lock,
  Database,
  Activity,
  FileCode,
  TrendingDown,
  Sparkles,
  Users,
  Terminal,
  ExternalLink,
} from "lucide-react";

export default function LandingPage() {
  const { studies, setSelectedStudyForViewer, selectedStudyForViewer } = useNuvaMedStore();
  const [activeTab, setActiveTab] = useState<'FEATURES' | 'HOW' | 'TRUST'>("FEATURES");

  return (
    <div className="min-h-screen flex flex-col bg-background text-neutral-100 font-sans swiss-grid-bg">
      <Header />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-surface-border overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Action CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-swiss-blue/15 border border-swiss-blue/40 text-swiss-blue font-mono text-xs uppercase tracking-wider font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BUILT FOR SHELBY &amp; APTOS L1 HACKATHON MVP</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none">
              Decentralized <span className="text-swiss-blue">DICOM Exchange</span> for Modern Healthcare
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
              Sub-second medical image streaming powered by <strong>Shelby Protocol 10+6 Clay Erasure Coding</strong> &amp; <strong>Aptos L1</strong>. Scrub PHI client-side, store for $0.005/GB, and monetize research datasets via optimistic off-chain USDC micropayments.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2 font-mono text-xs">
              <Link
                href="/app"
                className="px-6 py-4 bg-swiss-blue hover:bg-blue-600 text-white font-bold uppercase tracking-wider transition shadow-xl shadow-swiss-blue/25 flex items-center justify-center space-x-2"
              >
                <span>LAUNCH APP WORKSPACE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/docs"
                className="px-6 py-4 bg-surface hover:bg-white/10 border border-surface-border text-neutral-300 hover:text-white font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2"
              >
                <span>EXPLORE DOCS</span>
              </Link>
            </div>

            {/* Micro Trust Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-surface-border font-mono text-xs">
              <div>
                <div className="text-xl font-bold text-white">$0.005</div>
                <div className="text-[10px] text-neutral-400">PER GB / MONTH</div>
              </div>
              <div>
                <div className="text-xl font-bold text-swiss-teal">&lt; 1.4 ms</div>
                <div className="text-[10px] text-neutral-400">DOUBLEZERO SLA</div>
              </div>
              <div>
                <div className="text-xl font-bold text-emerald-400">10+6 CLAY</div>
                <div className="text-[10px] text-neutral-400">ERASURE CODED</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive DICOM PACS Showcase Widget */}
          <div className="lg:col-span-6 h-[500px]">
            <div className="relative h-full swiss-card border border-swiss-blue/40 shadow-2xl overflow-hidden flex flex-col">
              <div className="p-3 bg-surface border-b border-surface-border flex items-center justify-between font-mono text-xs">
                <span className="text-white font-bold flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-swiss-teal" />
                  INTERACTIVE PACS DICOM PREVIEW
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 font-bold">
                  LIVE DEMO
                </span>
              </div>
              <div className="flex-1 p-2 bg-[#05060A]">
                {selectedStudyForViewer && (
                  <DicomViewer study={selectedStudyForViewer} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM VS SOLUTION COMPARISON GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-surface-border bg-surface/40">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-mono text-swiss-blue uppercase tracking-widest font-bold">
              THE WEB2 HEALTHCARE CHALLENGE
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Why Traditional Health Cloud Storage Holds Hospitals Back
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="swiss-card p-6 space-y-4 border-l-4 border-l-swiss-red font-mono text-xs">
              <div className="text-red-400 font-bold text-sm">01 // AWS S3 COST TRAP</div>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Standard AWS S3 charges $0.023/GB/mo plus $0.09/GB egress fees when sharing MRI/CT scans across hospital networks.
              </p>
              <div className="p-3 bg-black/40 border border-surface-border text-emerald-400 font-bold text-[11px]">
                NUVAMED SOLUTION: $0.005/GB on Shelby Protocol (-58% Cost Savings).
              </div>
            </div>

            {/* Card 2 */}
            <div className="swiss-card p-6 space-y-4 border-l-4 border-l-amber-500 font-mono text-xs">
              <div className="text-amber-400 font-bold text-sm">02 // PATIENT PRIVACY LEAKS</div>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Centralized PACS servers store raw PHI names and MRN tags in plaintext, leaving health networks vulnerable to ransomware.
              </p>
              <div className="p-3 bg-black/40 border border-surface-border text-swiss-teal font-bold text-[11px]">
                NUVAMED SOLUTION: Zero-Knowledge Client PHI Scrubbing &amp; AES-256.
              </div>
            </div>

            {/* Card 3 */}
            <div className="swiss-card p-6 space-y-4 border-l-4 border-l-swiss-blue font-mono text-xs">
              <div className="text-swiss-blue font-bold text-sm">03 // AI RESEARCH BOTTLENECKS</div>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Medical AI companies struggle to license DICOM datasets due to slow subscription billing and API key setup.
              </p>
              <div className="p-3 bg-black/40 border border-surface-border text-swiss-blue font-bold text-[11px]">
                NUVAMED SOLUTION: Per-MB Optimistic Off-Chain USDC Micropayments.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SYSTEM */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-surface-border">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-surface-border pb-6">
            <div>
              <h2 className="text-xs font-mono text-swiss-teal uppercase tracking-widest font-bold">
                FOUR CORE INFRASTRUCTURE MODULES
              </h2>
              <h3 className="text-3xl font-bold text-white mt-1">
                Engineered for Clinical Velocity
              </h3>
            </div>
            <Link
              href="/app"
              className="mt-4 md:mt-0 font-mono text-xs text-swiss-teal hover:underline flex items-center"
            >
              EXPLORE ALL MODULES IN APP WORKSPACE &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="swiss-card p-6 space-y-4 border-l-2 border-l-swiss-blue">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-6 h-6 text-swiss-blue" />
                <h4 className="font-bold text-white text-base">01 // Zero-Knowledge DICOM Router</h4>
              </div>
              <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                Client-side DICOM PS 3.15 Annex E scrubbing engine. Removes Patient Name, DOB, MRN, and Institution Address before AES-256 encryption.
              </p>
              <div className="p-3 bg-black/40 border border-surface-border font-mono text-[11px] text-swiss-blue">
                STANDARDS: DICOM PS 3.15 | AES-256-GCM | SHA-256 ANONYMOUS UID
              </div>
            </div>

            {/* Feature 2 */}
            <div className="swiss-card p-6 space-y-4 border-l-2 border-l-swiss-teal">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-swiss-teal" />
                <h4 className="font-bold text-white text-base">02 // AI Medical Micropayments Engine</h4>
              </div>
              <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                Optimistic off-chain read sessions allowing AI research labs to stream DICOM datasets over DoubleZero fiber with per-MB USDC billing ($0.005/MB).
              </p>
              <div className="p-3 bg-black/40 border border-surface-border font-mono text-[11px] text-swiss-teal">
                SLA: &lt;1.4ms LATENCY | DOUBLEZERO FIBER | NO BLOCK WAIT
              </div>
            </div>

            {/* Feature 3 */}
            <div className="swiss-card p-6 space-y-4 border-l-2 border-l-emerald-500">
              <div className="flex items-center space-x-3">
                <Network className="w-6 h-6 text-emerald-400" />
                <h4 className="font-bold text-white text-base">03 // Cross-Chain Identity Bridge (AIP-113)</h4>
              </div>
              <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                Aptos Derivable Account Abstraction mapping EVM and Solana wallet addresses to gasless Aptos account namespaces without requiring APT gas tokens.
              </p>
              <div className="p-3 bg-black/40 border border-surface-border font-mono text-[11px] text-emerald-400">
                AIP-113 | SIWE / SIWS | GASLESS TRANSACTION DELEGATION
              </div>
            </div>

            {/* Feature 4 */}
            <div className="swiss-card p-6 space-y-4 border-l-2 border-l-amber-500">
              <div className="flex items-center space-x-3">
                <Server className="w-6 h-6 text-amber-500" />
                <h4 className="font-bold text-white text-base">04 // Legacy PACS S3 Gateway Proxy</h4>
              </div>
              <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                S3-compatible REST proxy adapter for existing GE, Siemens, Horos, and OsiriX PACS workstations. Translates S3 PUT/GET into Shelby Placement Group transactions.
              </p>
              <div className="p-3 bg-black/40 border border-surface-border font-mono text-[11px] text-amber-400">
                S3 API PROXY: /api/s3/[...path] | GE &amp; SIEMENS PACS COMPATIBLE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (4-STEP FLOW) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-surface-border bg-surface/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xs font-mono text-swiss-blue uppercase tracking-widest font-bold">
              WORKFLOW PIPELINE
            </h2>
            <h3 className="text-3xl font-bold text-white">How NuvaMed Powers Decentralized DICOM</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
            <div className="swiss-card p-5 space-y-3">
              <div className="w-8 h-8 bg-swiss-blue text-white font-bold flex items-center justify-center">1</div>
              <div className="font-bold text-white text-sm">DROP DICOM FILE</div>
              <p className="text-neutral-400 text-xs">
                Hospital drops MRI/CT scan. PHI tags scrubbed client-side in browser.
              </p>
            </div>

            <div className="swiss-card p-5 space-y-3">
              <div className="w-8 h-8 bg-swiss-teal text-black font-bold flex items-center justify-center">2</div>
              <div className="font-bold text-white text-sm">ENCRYPT AES-256</div>
              <p className="text-neutral-400 text-xs">
                Web Crypto API locks data buffer with AES-256-GCM secret key envelope.
              </p>
            </div>

            <div className="swiss-card p-5 space-y-3">
              <div className="w-8 h-8 bg-emerald-500 text-black font-bold flex items-center justify-center">3</div>
              <div className="font-bold text-white text-sm">SHELBY CLAY CODING</div>
              <p className="text-neutral-400 text-xs">
                10+6 Clay Erasure chunks written to Placement Group across 16 Cavalier SPs.
              </p>
            </div>

            <div className="swiss-card p-5 space-y-3">
              <div className="w-8 h-8 bg-amber-500 text-black font-bold flex items-center justify-center">4</div>
              <div className="font-bold text-white text-sm">SUB-SECOND STREAM</div>
              <p className="text-neutral-400 text-xs">
                AI researchers stream DICOM bytes over DoubleZero with per-MB USDC session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-surface-border text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Experience the Future of Medical Data Exchange?
          </h2>
          <p className="text-neutral-400 font-mono text-xs max-w-xl mx-auto">
            Launch the NuvaMed MVP Web App now or explore the developer documentation to integrate with Shelby Protocol.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 font-mono text-xs">
            <Link
              href="/app"
              className="px-8 py-4 bg-swiss-blue hover:bg-blue-600 text-white font-bold uppercase tracking-wider transition shadow-xl shadow-swiss-blue/20 flex items-center space-x-2"
            >
              <span>LAUNCH WEB APP WORKSPACE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 bg-surface hover:bg-white/10 border border-surface-border text-neutral-300 hover:text-white font-bold uppercase tracking-wider transition"
            >
              READ DEVELOPER DOCS
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingSystem />
    </div>
  );
}
