"use client";

import React, { useState } from "react";
import { useNuvaMedStore } from "@/lib/store/useNuvaMedStore";
import {
  deriveAptosAccountFromEVM,
  deriveAptosAccountFromSolana,
  createSIWEAuthChallenge,
  DerivedIdentity,
} from "@/lib/bridge/aip113-account";
import {
  Network,
  ShieldCheck,
  Key,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Users,
  Copy,
} from "lucide-react";

export function IdentityBridgeModule() {
  const { connectedAddress, derivedIdentity, setDerivedIdentity, userRole, addAuditLog } = useNuvaMedStore();
  const [selectedChain, setSelectedChain] = useState<'EVM' | 'SOLANA' | 'APTOS'>("EVM");
  const [inputWalletAddress, setInputWalletAddress] = useState(
    connectedAddress || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
  );
  const [solanaAddressInput, setSolanaAddressInput] = useState("PhantomW3s91048b29c1048b291048b291048b29104");
  const [authChallengeText, setAuthChallengeText] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [granteeAddress, setGranteeAddress] = useState("0x3f12A901B7828D9C02E11894A76291F00AB948210");
  const [grantStatus, setGrantStatus] = useState<string | null>(null);

  // Derive Aptos Account under AIP-113
  const handleDeriveAccount = async () => {
    setIsSigning(true);
    let identity: DerivedIdentity;

    if (selectedChain === "EVM") {
      identity = await deriveAptosAccountFromEVM(inputWalletAddress);
      setAuthChallengeText(createSIWEAuthChallenge(inputWalletAddress, "Ethereum/EVM"));
    } else if (selectedChain === "SOLANA") {
      identity = await deriveAptosAccountFromSolana(solanaAddressInput);
      setAuthChallengeText(createSIWEAuthChallenge(solanaAddressInput, "Solana"));
    } else {
      identity = {
        sourceChain: "APTOS",
        originalAddress: inputWalletAddress,
        aptosDerivedAddress: inputWalletAddress,
        derivedNamespace: `${inputWalletAddress}/nuvamed/studies`,
        verificationHash: "0x" + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
        authenticatedAt: new Date().toISOString(),
        isGaslessEnabled: true,
      };
      setAuthChallengeText("APTOS NATIVE ACCOUNT DIRECT MAPPING");
    }

    await new Promise((r) => setTimeout(r, 400));
    setDerivedIdentity(identity);
    setIsSigning(false);

    addAuditLog({
      actorAddress: identity.aptosDerivedAddress,
      action: "UPLOAD",
      studyId: "identity-auth",
      details: `AIP-113 Derivable Account Mapping established for ${selectedChain} wallet: ${identity.originalAddress}`,
    });
  };

  // Issue Cryptographic Access Grant
  const handleIssueGrant = () => {
    setGrantStatus("ISSUING...");
    setTimeout(() => {
      setGrantStatus(`GRANT ISSUED! Key envelope delegated to ${granteeAddress.substring(0, 10)}... (Gasless via AIP-113)`);
      addAuditLog({
        actorAddress: derivedIdentity?.aptosDerivedAddress || "0x894a...9910",
        action: "DECRYPT",
        studyId: "study-001",
        details: `Issued encrypted AES key grant to doctor/researcher address: ${granteeAddress}`,
      });
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="swiss-card p-6 border-l-4 border-l-swiss-blue">
        <div className="flex items-center space-x-3">
          <Network className="w-8 h-8 text-swiss-blue" />
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              CROSS-CHAIN MEDICAL IDENTITY BRIDGE
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-0.5">
              SIWE / SIWS Multi-Chain Authentication &amp; Aptos Derivable Account Abstraction (AIP-113)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Chain Selection & AIP-113 Mapping */}
        <div className="lg:col-span-6 space-y-6">
          <div className="swiss-card p-6 space-y-5 font-mono">
            <h3 className="font-bold text-white text-sm tracking-tight border-b border-surface-border pb-3 flex items-center">
              <Key className="w-4 h-4 mr-2 text-swiss-blue" />
              SELECT ORIGIN WALLET CHAIN
            </h3>

            {/* Chain Selector Tabs */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              {(["EVM", "SOLANA", "APTOS"] as const).map((chain) => (
                <button
                  key={chain}
                  onClick={() => setSelectedChain(chain)}
                  className={`p-3 border font-bold transition ${
                    selectedChain === chain
                      ? "bg-swiss-blue/20 border-swiss-blue text-white"
                      : "border-surface-border text-neutral-400 hover:text-white"
                  }`}
                >
                  {chain} WALLET
                </button>
              ))}
            </div>

            {/* Address Input */}
            <div className="space-y-2 text-xs">
              <label className="text-neutral-400 font-bold block">
                {selectedChain} PUBLIC KEY / ADDRESS
              </label>
              {selectedChain === "EVM" ? (
                <input
                  type="text"
                  value={inputWalletAddress}
                  onChange={(e) => setInputWalletAddress(e.target.value)}
                  className="w-full bg-surface border border-surface-border p-2.5 text-white text-xs outline-none focus:border-swiss-blue"
                />
              ) : selectedChain === "SOLANA" ? (
                <input
                  type="text"
                  value={solanaAddressInput}
                  onChange={(e) => setSolanaAddressInput(e.target.value)}
                  className="w-full bg-surface border border-surface-border p-2.5 text-white text-xs outline-none focus:border-swiss-blue"
                />
              ) : (
                <input
                  type="text"
                  value={inputWalletAddress}
                  onChange={(e) => setInputWalletAddress(e.target.value)}
                  className="w-full bg-surface border border-surface-border p-2.5 text-white text-xs outline-none focus:border-swiss-blue"
                />
              )}
            </div>

            {/* Derive Account Trigger */}
            <button
              disabled={isSigning}
              onClick={handleDeriveAccount}
              className="w-full py-3 bg-swiss-blue hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>MAP DERIVABLE ACCOUNT (AIP-113)</span>
            </button>
          </div>
        </div>

        {/* Right Column: AIP-113 Account Namespace & Access Grant Generator */}
        <div className="lg:col-span-6 space-y-6">
          {/* Active Identity Mapping Summary Card */}
          <div className="swiss-card p-6 space-y-4 font-mono">
            <h3 className="font-bold text-white text-sm tracking-tight border-b border-surface-border pb-3 flex items-center justify-between">
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-swiss-teal" />
                DERIVED APTOS IDENTITY (AIP-113)
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-swiss-teal/20 text-swiss-teal border border-swiss-teal/40 font-bold">
                GASLESS ENABLED
              </span>
            </h3>

            {derivedIdentity && (
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-black/40 border border-surface-border space-y-1">
                  <div className="text-neutral-500 text-[10px]">ORIGIN CHAIN ({derivedIdentity.sourceChain}):</div>
                  <div className="text-white font-bold truncate">{derivedIdentity.originalAddress}</div>
                </div>

                <div className="p-3 bg-black/40 border border-swiss-teal/30 space-y-1">
                  <div className="text-swiss-teal text-[10px]">APTOS DERIVED ACCOUNT ADDRESS:</div>
                  <div className="text-white font-bold truncate">{derivedIdentity.aptosDerivedAddress}</div>
                </div>

                <div className="p-3 bg-black/40 border border-surface-border space-y-1">
                  <div className="text-neutral-500 text-[10px]">SHELBY USER NAMESPACE:</div>
                  <div className="text-neutral-300 font-mono text-[11px] truncate">{derivedIdentity.derivedNamespace}</div>
                </div>
              </div>
            )}
          </div>

          {/* Access Grant Delegation Form */}
          <div className="swiss-card p-6 space-y-4 font-mono">
            <h3 className="font-bold text-white text-sm tracking-tight border-b border-surface-border pb-3 flex items-center">
              <Users className="w-4 h-4 mr-2 text-swiss-blue" />
              DELEGATE DICOM ACCESS PERMISSION
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1 font-bold">RECIPIENT DOCTOR / RESEARCHER ADDRESS</label>
                <input
                  type="text"
                  value={granteeAddress}
                  onChange={(e) => setGranteeAddress(e.target.value)}
                  className="w-full bg-surface border border-surface-border p-2 text-white outline-none focus:border-swiss-blue text-xs"
                />
              </div>

              <button
                onClick={handleIssueGrant}
                className="w-full py-2.5 bg-swiss-teal hover:bg-teal-500 text-black font-bold text-xs uppercase tracking-wider transition"
              >
                GRANT CRYPTOGRAPHIC AES KEY ACCESS
              </button>

              {grantStatus && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  {grantStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
