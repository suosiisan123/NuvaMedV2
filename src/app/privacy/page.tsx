"use client";

export const dynamic = "force-dynamic";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSystem } from "@/components/floating/FloatingSystem";
import { ShieldCheck, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-neutral-100 font-sans swiss-grid-bg">
      <Header />

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 font-mono text-xs">
        <div className="swiss-card p-8 space-y-6">
          <div className="border-b border-surface-border pb-4 space-y-2">
            <div className="flex items-center space-x-2 text-swiss-teal font-bold">
              <ShieldCheck className="w-5 h-5" />
              <span>LEGAL DOCUMENTATION</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Privacy Policy &amp; HIPAA Compliance</h1>
            <p className="text-neutral-400 text-[11px]">Last Updated: August 16, 2026</p>
          </div>

          <div className="space-y-4 text-neutral-300 leading-relaxed">
            <h2 className="text-sm font-bold text-white uppercase">1. Zero-Knowledge Architecture &amp; Client PHI Scrubbing</h2>
            <p>
              NuvaMed operates on a strict Zero-Knowledge (ZK) data paradigm. All DICOM Protected Health Information (PHI) attributes—including Patient Name (0010,0010), Date of Birth (0010,0030), Medical Record Number (0010,0020), and Institution Name (0008,0080)—are scrubbed directly within your web browser client in accordance with DICOM PS 3.15 Annex E guidelines before any data payload leaves your local hardware.
            </p>

            <h2 className="text-sm font-bold text-white uppercase">2. Encryption Standards</h2>
            <p>
              All image binary payloads are encrypted client-side using Web Crypto API AES-256-GCM prior to being split into 10+6 Clay Erasure Chunks for storage across Shelby Placement Groups. NuvaMed servers do not store or possess secret decryption keys.
            </p>

            <h2 className="text-sm font-bold text-white uppercase">3. Decentralized Storage Durability</h2>
            <p>
              Coded data chunks are distributed to 16 independent Cavalier Storage Providers (SPs). No single SP holds a readable copy of the DICOM file.
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingSystem />
    </div>
  );
}
