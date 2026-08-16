"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSystem } from "@/components/floating/FloatingSystem";
import { Search, ChevronDown, HelpCircle, ShieldCheck, Zap, DollarSign } from "lucide-react";

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: "what-is-nuvamed",
    category: "GENERAL",
    question: "What is NuvaMed?",
    answer: "NuvaMed is a decentralized medical imaging (DICOM) and health data exchange built on the Shelby Protocol and Aptos L1 blockchain. It enables hospitals to store medical scans securely while allowing AI researchers to stream datasets via off-chain USDC micropayments.",
  },
  {
    id: "how-does-it-work",
    category: "GENERAL",
    question: "How does NuvaMed handle patient data privacy (HIPAA)?",
    answer: "NuvaMed uses a Zero-Knowledge PHI Scrubbing engine (DICOM PS 3.15 Annex E) that strips all patient identification tags directly inside your web browser before encrypting the raw image data with AES-256-GCM. Plaintext PHI never leaves your device.",
  },
  {
    id: "storage-cost",
    category: "PRICING",
    question: "How much does storage cost on NuvaMed compared to AWS S3?",
    answer: "NuvaMed utilizes Shelby's 10+6 Clay Erasure Coding across 16 Cavalier Storage Provider nodes, achieving a fixed storage cost of $0.005 per GB/month (-58% savings compared to AWS S3 standard tier at $0.023/GB) with zero egress bandwidth lock-in fees.",
  },
  {
    id: "micropayments",
    category: "RESEARCH",
    question: "How do off-chain USDC micropayments work for AI research labs?",
    answer: "AI researchers open an off-chain read session with a signed USDC deposit. DICOM image data is streamed byte-by-byte over DoubleZero private fiber infrastructure with per-MB billing ($0.005/MB). Settlements are periodically batched to Aptos L1 without requiring per-chunk block waits.",
  },
  {
    id: "pacs-compatibility",
    category: "INTEGRATION",
    question: "Can NuvaMed integrate with our hospital's existing PACS system?",
    answer: "Yes! NuvaMed includes an S3-compatible Legacy PACS Gateway Proxy (/api/s3/[...path]). Your existing PACS workstations (such as GE Healthcare, Siemens Syngo, Horos, or OsiriX) can dispatch DICOM uploads to NuvaMed without code modifications.",
  },
  {
    id: "web3-wallets",
    category: "IDENTITY",
    question: "Do doctors or research engineers need APT gas tokens to use NuvaMed?",
    answer: "No. NuvaMed integrates Aptos AIP-113 Account Abstraction, allowing EVM (MetaMask/RainbowKit) and Solana (Phantom) wallets to sign transactions and delegate gas fees seamlessly.",
  },
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("what-is-nuvamed");

  const filteredFaqs = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-neutral-100 font-sans swiss-grid-bg">
      <Header />

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 font-mono">
        <div className="space-y-6 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-swiss-teal/10 border border-swiss-teal/30 text-swiss-teal text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Everything You Need to Know About NuvaMed
          </h1>
          <p className="text-neutral-400 text-xs">
            Search our knowledge base for questions about security, pricing, DICOM compatibility, and Shelby storage.
          </p>

          {/* Search Input Bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search className="w-4 h-4 text-swiss-blue absolute left-3.5 top-5" />
            <input
              type="text"
              placeholder="Search FAQ questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-surface-border text-white text-xs pl-10 pr-4 py-3 outline-none focus:border-swiss-teal transition"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="pt-10 space-y-3 text-xs">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center swiss-card text-neutral-400 font-mono">
              No matching questions found for "{searchQuery}".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="swiss-card overflow-hidden transition border border-surface-border"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="w-full p-4 flex items-center justify-between text-left bg-surface/60 hover:bg-surface transition"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-0.5 bg-black/40 text-[10px] font-bold text-swiss-teal border border-surface-border">
                        {faq.category}
                      </span>
                      <span className="font-bold text-white text-sm">{faq.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform ${
                        isExpanded ? "rotate-180 text-swiss-teal" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="p-4 bg-black/40 border-t border-surface-border text-neutral-300 text-xs leading-relaxed font-mono">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <Footer />
      <FloatingSystem />
    </div>
  );
}
