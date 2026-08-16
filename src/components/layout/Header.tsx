"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNuvaMedStore, UserRole } from "@/lib/store/useNuvaMedStore";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Activity, Database, Zap, Menu, X, ArrowUpRight, Server } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { userRole, setUserRole } = useNuvaMedStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Overview" },
    { href: "/app", label: "App Workspace", isHighlight: true },
    { href: "/docs", label: "Docs" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full border-b border-surface-border bg-background/90 backdrop-blur-md sticky top-0 z-50">
      {/* Top Banner Ticker */}
      <div className="bg-surface border-b border-surface-border px-4 py-1.5 flex items-center justify-between text-[11px] font-mono tracking-wider text-neutral-400">
        <div className="flex items-center space-x-6 overflow-x-auto">
          <span className="flex items-center text-emerald-400 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
            DOUBLEZERO FIBER: ACTIVE (&lt;2ms SLA)
          </span>
          <span className="hidden sm:flex items-center text-neutral-300 shrink-0">
            <Server className="w-3 h-3 mr-1 text-swiss-blue" />
            SHELBY L1 SETTLEMENT: APTOS TESTNET
          </span>
          <span className="hidden md:flex items-center text-swiss-teal font-bold shrink-0">
            <Zap className="w-3 h-3 mr-1" />
            STORAGE COST: $0.005/GB (-58% vs AWS S3)
          </span>
        </div>
        <div className="hidden lg:flex items-center space-x-4 shrink-0">
          <span className="text-neutral-500 text-[10px]">AIP-113 IDENTITY: VERIFIED</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 bg-swiss-blue flex items-center justify-center font-mono font-black text-white text-lg tracking-tighter shadow-lg shadow-swiss-blue/20 group-hover:bg-blue-600 transition">
            N+
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-tight text-white text-lg">NUVAMED</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono bg-swiss-blue/20 text-swiss-blue border border-swiss-blue/30 uppercase tracking-widest font-semibold">
                MVP
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-400 -mt-0.5 hidden sm:block">
              Decentralized Health Data Exchange &amp; DICOM Network
            </p>
          </div>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6 font-mono text-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors font-medium ${
                  isActive
                    ? "text-swiss-teal font-bold border-b-2 border-swiss-teal pb-0.5"
                    : link.isHighlight
                    ? "text-swiss-blue font-bold hover:text-white"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Role Switcher + Wallet + Mobile Toggle) */}
        <div className="flex items-center space-x-3">
          {/* Wallet Connect Button */}
          <div className="hidden sm:block">
            <ConnectButton
              accountStatus="avatar"
              chainStatus="icon"
              showBalance={false}
            />
          </div>

          {/* Launch App Button */}
          <Link
            href="/app"
            className="px-3.5 py-2 bg-swiss-blue hover:bg-blue-600 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center space-x-1"
          >
            <span>APP</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-neutral-300 hover:text-white bg-surface border border-surface-border"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface/95 border-b border-surface-border p-4 font-mono text-xs space-y-3 backdrop-blur-md">
          <div className="space-y-2 border-b border-surface-border pb-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-1.5 text-sm ${
                  pathname === link.href ? "text-swiss-teal font-bold" : "text-neutral-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} />
          </div>
        </div>
      )}
    </header>
  );
}
