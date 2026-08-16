"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Server, Github, Twitter, Disc as Discord, Send, Zap, Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#05060A] border-t border-surface-border font-mono text-xs text-neutral-400">
      {/* Top Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-surface-border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-swiss-blue flex items-center justify-center font-mono font-black text-white text-base tracking-tighter shadow-md">
                N+
              </div>
              <span className="font-bold tracking-tight text-white text-lg">NUVAMED</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Enterprise-grade decentralized DICOM imaging network built on Shelby Protocol &amp; Aptos L1. Eliminating cloud storage costs while unlocking AI medical research streaming.
            </p>
            <div className="flex items-center space-x-3 text-neutral-300 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-surface hover:bg-white/10 border border-surface-border text-neutral-300 hover:text-white transition"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-surface hover:bg-white/10 border border-surface-border text-neutral-300 hover:text-white transition text-swiss-blue"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-surface hover:bg-white/10 border border-surface-border text-neutral-300 hover:text-white transition text-indigo-400"
              >
                <Discord className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">PLATFORM</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/" className="hover:text-swiss-teal transition">Overview</Link>
              </li>
              <li>
                <Link href="/app" className="hover:text-swiss-teal transition text-swiss-teal font-bold">Launch App Workspace</Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-swiss-teal transition">Documentation</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-swiss-teal transition">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources & Developers */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">DEVELOPERS</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/docs#quickstart" className="hover:text-swiss-teal transition">Quick Start Guide</Link>
              </li>
              <li>
                <Link href="/docs#shelby-sdk" className="hover:text-swiss-teal transition">Shelby SDK Reference</Link>
              </li>
              <li>
                <Link href="/docs#aip113" className="hover:text-swiss-teal transition">AIP-113 Account Bridge</Link>
              </li>
              <li>
                <Link href="/app" className="hover:text-swiss-teal transition">S3 Gateway Endpoint</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">COMPANY</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/about" className="hover:text-swiss-teal transition">About &amp; Team</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-swiss-teal transition">Contact &amp; Support</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-swiss-teal transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-swiss-teal transition">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-2">
        <div>
          &copy; {new Date().getFullYear()} NuvaMed Health Exchange. Built on Shelby Protocol &amp; Aptos L1.
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            SHELBY TESTNET ONLINE
          </span>
          <span>HIPAA PS 3.15 COMPLIANT</span>
        </div>
      </div>
    </footer>
  );
}
