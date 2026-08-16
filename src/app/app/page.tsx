"use client";

export const dynamic = "force-dynamic";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { useNuvaMedStore } from "@/lib/store/useNuvaMedStore";
import { DashboardModule } from "@/components/modules/DashboardModule";
import { RouterModule } from "@/components/modules/RouterModule";
import { MicropaymentsModule } from "@/components/modules/MicropaymentsModule";
import { IdentityBridgeModule } from "@/components/modules/IdentityBridgeModule";
import { PACSGatewayModule } from "@/components/modules/PACSGatewayModule";
import { AuditLedgerModule } from "@/components/modules/AuditLedgerModule";
import { FloatingSystem } from "@/components/floating/FloatingSystem";

export default function AppPage() {
  const { activeTab } = useNuvaMedStore();

  return (
    <div className="min-h-screen flex flex-col relative pb-16 bg-background text-neutral-100 font-sans swiss-grid-bg">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {activeTab === "dashboard" && <DashboardModule />}
          {activeTab === "router" && <RouterModule />}
          {activeTab === "micropayments" && <MicropaymentsModule />}
          {activeTab === "identity" && <IdentityBridgeModule />}
          {activeTab === "pacs" && <PACSGatewayModule />}
          {activeTab === "audit" && <AuditLedgerModule />}
        </main>
      </div>

      <Footer />
      <FloatingSystem />
    </div>
  );
}
