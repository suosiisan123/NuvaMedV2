"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSystem } from "@/components/floating/FloatingSystem";
import {
  FileText,
  Code,
  Shield,
  Zap,
  Check,
  Copy,
  Terminal,
  Server,
  Layers,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sdkInstallCode = `npm install @shelby-xyz/sdk @aptos-labs/ts-sdk ethers`;

  const dicomUploadSnippet = `import { ShelbyClient } from "@shelby-xyz/sdk";
import { deidentifyDicomHeader } from "@/lib/crypto/dicom-deidentify";
import { encryptBufferAES256 } from "@/lib/crypto/aes-gcm";

// 1. Initialize Shelby SDK Client
const client = new ShelbyClient({
  network: "testnet",
  rpcUrl: "https://rpc.shelby.xyz",
});

// 2. Scrub Patient PHI Tags Client-Side (PS 3.15)
const scrubbedBytes = await deidentifyDicomHeader(rawDicomBuffer);

// 3. Encrypt Payload with Web Crypto AES-256-GCM
const { cipherBytes, ivHex, keyBase64 } = await encryptBufferAES256(scrubbedBytes);

// 4. Upload Coded Blob to Shelby Placement Group (10+6 Clay Codes)
const blobMetadata = await client.uploadBlob({
  blobName: "mri-brain-scan-001.dcm",
  data: cipherBytes,
  expirationDays: 1825, // 5-year retention
});

console.log("Shelby Blob URI:", blobMetadata.blobUri);`;

  return (
    <div className="min-h-screen flex flex-col bg-background text-neutral-100 font-sans swiss-grid-bg">
      <Header />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 font-mono">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-4 text-xs">
            <div className="swiss-card p-4 space-y-3">
              <div className="text-white font-bold text-xs uppercase tracking-wider flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-swiss-teal" />
                DOCUMENTATION
              </div>
              <nav className="space-y-1.5 text-[11px] text-neutral-400">
                <a href="#overview" className="block py-1 hover:text-swiss-teal transition">01. Protocol Overview</a>
                <a href="#quickstart" className="block py-1 hover:text-swiss-teal transition">02. Quick Start Guide</a>
                <a href="#erasure-coding" className="block py-1 hover:text-swiss-teal transition">03. Clay 10+6 Erasure Codes</a>
                <a href="#zk-router" className="block py-1 hover:text-swiss-teal transition">04. ZK PHI De-identification</a>
                <a href="#micropayments" className="block py-1 hover:text-swiss-teal transition">05. Off-Chain Micropayments</a>
                <a href="#aip113" className="block py-1 hover:text-swiss-teal transition">06. AIP-113 Identity Bridge</a>
              </nav>
            </div>
          </aside>

          {/* Main Docs Content */}
          <main className="lg:col-span-9 space-y-12 text-xs">
            {/* Section 1: Overview */}
            <section id="overview" className="swiss-card p-6 space-y-4 border-l-4 border-l-swiss-blue">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                NuvaMed Documentation &amp; Architecture
              </h1>
              <p className="text-neutral-300 text-xs leading-relaxed">
                NuvaMed is an enterprise-grade decentralized medical imaging and health data exchange platform built on <strong>Shelby Protocol</strong> and <strong>Aptos L1</strong>. It enables hospitals, imaging centers, and patients to store DICOM datasets securely while allowing AI research institutions to stream data via off-chain USDC micropayments.
              </p>
            </section>

            {/* Section 2: Quick Start */}
            <section id="quickstart" className="swiss-card p-6 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-swiss-teal" />
                02 // Quick Start SDK Integration
              </h2>

              <p className="text-neutral-300 text-xs">
                Install the official Shelby Protocol TypeScript SDK and dependencies:
              </p>

              <div className="relative bg-black/60 border border-surface-border p-3 flex items-center justify-between text-swiss-teal font-mono">
                <code>{sdkInstallCode}</code>
                <button
                  onClick={() => copyToClipboard(sdkInstallCode, "install")}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  {copiedCode === "install" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <h3 className="text-sm font-bold text-white pt-2">De-identify &amp; Upload DICOM Study</h3>
              <div className="relative bg-black/80 border border-surface-border p-4 overflow-x-auto text-[11px] text-neutral-200">
                <pre>{dicomUploadSnippet}</pre>
                <button
                  onClick={() => copyToClipboard(dicomUploadSnippet, "upload")}
                  className="absolute top-3 right-3 p-1 text-neutral-400 hover:text-white"
                >
                  {copiedCode === "upload" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </section>

            {/* Section 3: Clay 10+6 Erasure Codes */}
            <section id="erasure-coding" className="swiss-card p-6 space-y-4 border-l-4 border-l-emerald-500">
              <h2 className="text-lg font-bold text-white flex items-center">
                <Layers className="w-5 h-5 mr-2 text-emerald-400" />
                03 // Clay Erasure Coding (10 Data + 6 Parity)
              </h2>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Shelby Protocol uses <strong>Clay Codes</strong> to encode 10 MB chunksets into 16 chunks across a 16-node Placement Group of Cavalier Storage Providers. Clay Codes allow degraded chunk repair using 4x less network bandwidth than standard Reed-Solomon schemes.
              </p>
              <div className="p-3 bg-black/40 border border-surface-border text-emerald-400 text-[11px]">
                FIXED STORAGE COST: $0.005 / GB / Month (-58% cost vs AWS S3 standard tier)
              </div>
            </section>

            {/* Section 4: ZK Router */}
            <section id="zk-router" className="swiss-card p-6 space-y-4 border-l-4 border-l-swiss-blue">
              <h2 className="text-lg font-bold text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-swiss-blue" />
                04 // Zero-Knowledge PHI Scrubbing (PS 3.15)
              </h2>
              <p className="text-neutral-300 text-xs leading-relaxed">
                To guarantee HIPAA compliance, all Protected Health Information (PHI) attributes (Patient Name, DOB, MRN, Institution) are scrubbed strictly on the client side using Web Workers before encryption.
              </p>
            </section>
          </main>
        </div>
      </div>

      <Footer />
      <FloatingSystem />
    </div>
  );
}
