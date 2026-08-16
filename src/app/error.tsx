"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSystem } from "@/components/floating/FloatingSystem";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("NuvaMed Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-neutral-100 font-sans swiss-grid-bg">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center font-mono">
        <div className="swiss-card p-8 max-w-md w-full space-y-6 border-l-4 border-l-amber-500">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500">
            <AlertCircle className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
              SYSTEM // RUNTIME EXCEPTION
            </span>
            <h1 className="text-2xl font-bold text-white">Application Exception Caught</h1>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {error.message || "An unexpected error occurred during DICOM payload processing."}
            </p>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              onClick={() => reset()}
              className="flex-1 py-3 bg-swiss-blue hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>RETRY ACTION</span>
            </button>
            <Link
              href="/"
              className="flex-1 py-3 bg-surface hover:bg-white/10 border border-surface-border text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>HOME</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingSystem />
    </div>
  );
}
