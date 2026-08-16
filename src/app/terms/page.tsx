"use client";

export const dynamic = "force-dynamic";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSystem } from "@/components/floating/FloatingSystem";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-neutral-100 font-sans swiss-grid-bg">
      <Header />

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 font-mono text-xs">
        <div className="swiss-card p-8 space-y-6">
          <div className="border-b border-surface-border pb-4 space-y-2">
            <div className="flex items-center space-x-2 text-swiss-blue font-bold">
              <FileText className="w-5 h-5" />
              <span>LEGAL DOCUMENTATION</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Terms of Service</h1>
            <p className="text-neutral-400 text-[11px]">Last Updated: August 16, 2026</p>
          </div>

          <div className="space-y-4 text-neutral-300 leading-relaxed">
            <h2 className="text-sm font-bold text-white uppercase">1. Protocol Usage &amp; Acceptance</h2>
            <p>
              By accessing the NuvaMed Web Application, S3 PACS Gateway, or Shelby SDK endpoints, you agree to comply with all applicable medical privacy regulations and protocol terms.
            </p>

            <h2 className="text-sm font-bold text-white uppercase">2. Off-Chain Micropayments &amp; Streaming</h2>
            <p>
              Off-chain USDC read sessions are billed per megabyte streamed ($0.005/MB). Session balances are non-refundable once data chunks are transmitted over the DoubleZero fiber network.
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingSystem />
    </div>
  );
}
