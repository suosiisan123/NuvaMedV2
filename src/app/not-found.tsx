"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSystem } from "@/components/floating/FloatingSystem";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-neutral-100 font-sans swiss-grid-bg">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center font-mono">
        <div className="swiss-card p-8 max-w-md w-full space-y-6 border-l-4 border-l-swiss-red">
          <div className="w-12 h-12 bg-swiss-red/10 border border-swiss-red/30 flex items-center justify-center mx-auto text-swiss-red">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-swiss-red uppercase tracking-widest">
              404 // RESOURCE NOT FOUND
            </span>
            <h1 className="text-2xl font-bold text-white">DICOM Endpoint Unavailable</h1>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The requested medical exchange route or placement group chunk does not exist on the Shelby network.
            </p>
          </div>

          <div className="flex space-x-3 pt-2">
            <Link
              href="/"
              className="flex-1 py-3 bg-swiss-blue hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>RETURN HOME</span>
            </Link>
            <Link
              href="/app"
              className="flex-1 py-3 bg-surface hover:bg-white/10 border border-surface-border text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>APP WORKSPACE</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingSystem />
    </div>
  );
}
