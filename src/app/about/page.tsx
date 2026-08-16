"use client";

export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSystem } from "@/components/floating/FloatingSystem";
import { ShieldCheck, Heart, Sparkles, Code, Cpu, Globe, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-neutral-100 font-sans swiss-grid-bg">
      <Header />

      <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 font-mono">
        <div className="space-y-12">
          {/* Header Story Banner */}
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-swiss-blue/15 border border-swiss-blue/40 text-swiss-blue text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE NUVAMED ORIGIN STORY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-none">
              Democratizing Global Health Data Exchange
            </h1>
            <p className="text-neutral-300 text-xs leading-relaxed">
              We built NuvaMed during the Shelby Protocol Hackathon to solve a critical issue in modern medicine: <strong>Medical image data lock-in</strong>.
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="swiss-card p-6 space-y-3 border-l-4 border-l-swiss-blue">
              <h2 className="text-white font-bold text-base flex items-center">
                <Heart className="w-5 h-5 mr-2 text-swiss-red" />
                OUR MISSION
              </h2>
              <p className="text-neutral-300 text-xs leading-relaxed">
                To liberate medical imaging datasets from costly Web2 cloud silos while maintaining strict HIPAA Zero-Knowledge privacy. We empower patients, radiologists, and AI researchers to collaborate without borders.
              </p>
            </div>

            <div className="swiss-card p-6 space-y-3 border-l-4 border-l-swiss-teal">
              <h2 className="text-white font-bold text-base flex items-center">
                <Globe className="w-5 h-5 mr-2 text-swiss-teal" />
                OUR VISION
              </h2>
              <p className="text-neutral-300 text-xs leading-relaxed">
                A world where medical AI models can be trained on millions of anonymized DICOM scans instantly using sub-second off-chain micropayments on Shelby Protocol and Aptos L1.
              </p>
            </div>
          </div>

          {/* The Technical Stack Story */}
          <div className="swiss-card p-8 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-surface-border pb-3">
              Why Built on Shelby &amp; Aptos?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="space-y-2">
                <div className="font-bold text-swiss-teal">10+6 CLAY ERASURE CODES</div>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Reduces fixed storage costs to $0.005/GB/mo while delivering 99.999999999% data durability across 16 Cavalier SP nodes.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-swiss-blue">DOUBLEZERO FIBER SLA</div>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Dedicated private network fiber infrastructure delivering sub-second byte-range streaming for heavy 500MB MRI/CT scans.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-emerald-400">AIP-113 IDENTITY BRIDGE</div>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Derives gasless Aptos account namespaces from EVM and Solana wallet signatures, eliminating Web3 onboarding complexity.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="swiss-card p-8 text-center space-y-4 border border-swiss-blue/40">
            <h3 className="text-xl font-bold text-white">Join Us in Building the Future of Health Data</h3>
            <div className="flex justify-center space-x-4">
              <Link
                href="/app"
                className="px-6 py-3 bg-swiss-blue hover:bg-blue-600 text-white font-bold uppercase text-xs tracking-wider transition"
              >
                TRY APP WORKSPACE
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-surface hover:bg-white/10 border border-surface-border text-neutral-300 hover:text-white font-bold uppercase text-xs tracking-wider transition"
              >
                CONTACT THE TEAM
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingSystem />
    </div>
  );
}
