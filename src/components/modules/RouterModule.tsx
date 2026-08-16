"use client";

import React, { useState } from "react";
import { useNuvaMedStore } from "@/lib/store/useNuvaMedStore";
import { deidentifyDicomFile, DicomHeaderTag } from "@/lib/crypto/dicom-deidentify";
import { encryptBufferAES256 } from "@/lib/crypto/aes-gcm";
import { shelbyClient } from "@/lib/shelby/client";
import {
  UploadCloud,
  ShieldCheck,
  Lock,
  Key,
  Database,
  CheckCircle2,
  FileCode,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

export function RouterModule() {
  const { addStudy, addAuditLog, connectedAddress, derivedIdentity, setActiveTab, setSelectedStudyForViewer } =
    useNuvaMedStore();

  const [fileName, setFileName] = useState("mri_brain_t2_sequence.dcm");
  const [fileSizeBytes, setFileSizeBytes] = useState(380 * 1024 * 1024); // 380 MB
  const [modality, setModality] = useState<'MRI' | 'CT' | 'XRAY' | 'ULTRASOUND' | 'PET'>("MRI");
  const [bodyPart, setBodyPart] = useState("BRAIN");
  const [retentionYears, setRetentionYears] = useState<number>(100); // 100 = Infinite

  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"IDLE" | "SCRUBBING" | "ENCRYPTING" | "SHELBY_UPLOAD" | "COMPLETE">("IDLE");
  const [uploadProgress, setUploadProgress] = useState(0);

  const [deidentifiedTags, setDeidentifiedTags] = useState<DicomHeaderTag[]>([]);
  const [encryptionKeyBase64, setEncryptionKeyBase64] = useState<string>("");
  const [resultTxHash, setResultTxHash] = useState<string>("");
  const [resultBlobUri, setResultBlobUri] = useState<string>("");

  const handleStartUpload = async () => {
    setIsProcessing(true);
    setStep("SCRUBBING");

    // Create synthetic file buffer
    const buffer = new Uint8Array(fileSizeBytes > 10000000 ? 5000000 : fileSizeBytes).buffer;

    // 1. Client-Side PHI De-Identification
    const deidentified = await deidentifyDicomFile(buffer, fileName, modality, bodyPart);
    setDeidentifiedTags(deidentified.tagsAuditLog);

    await new Promise((r) => setTimeout(r, 600));
    setStep("ENCRYPTING");

    // 2. Client-Side AES-256-GCM Encryption
    const encrypted = await encryptBufferAES256(deidentified.scrubbedBuffer);
    setEncryptionKeyBase64(encrypted.keyBase64);

    await new Promise((r) => setTimeout(r, 600));
    setStep("SHELBY_UPLOAD");

    // 3. Dispatch to Shelby Protocol Placement Group
    const accountAddr = derivedIdentity?.aptosDerivedAddress || "0x894a91f04b28d9c02e11894a76291f00ab948210bc781048bca29d10e8829910";
    const blobName = `studies/${modality.toLowerCase()}_${bodyPart.toLowerCase()}_${Date.now()}.dcm`;

    const shelbyResult = await shelbyClient.uploadDicomBlob({
      blobName,
      accountAddress: accountAddr,
      encryptedData: encrypted.cipherBytes,
      expirationDays: retentionYears * 365,
      onProgress: (p) => setUploadProgress(p),
    });

    setResultTxHash(shelbyResult.txHash);
    setResultBlobUri(shelbyResult.blobUri);

    // 4. Register Study Record & Audit Log
    const newRecord = {
      id: `study-${Date.now()}`,
      studyInstanceUid: deidentified.studyInstanceUid,
      anonymizedPatientId: deidentified.anonymizedPatientId,
      hospitalName: "Metropolitan General Hospital Node",
      modality,
      bodyPart,
      studyDescription: `De-Identified ${modality} (${bodyPart}) Scan`,
      fileSizeBytes,
      blobUri: shelbyResult.blobUri,
      txHash: shelbyResult.txHash,
      merkleRoot: "0x" + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      retentionYears,
      encryptionKeyBase64: encrypted.keyBase64,
      isMarketListed: true,
      pricePerMB: 0.005,
      uploadedAt: new Date().toISOString(),
    };

    addStudy(newRecord);
    addAuditLog({
      actorAddress: accountAddr,
      action: "UPLOAD",
      studyId: newRecord.id,
      details: `Zero-Knowledge DICOM Upload. Scrubbed PHI tags & encrypted with AES-256. Dispatched to Shelby Placement Group #${shelbyResult.placementGroupId}.`,
      txHash: shelbyResult.txHash,
    });

    setStep("COMPLETE");
    setIsProcessing(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="swiss-card p-6 border-l-4 border-l-swiss-blue">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-8 h-8 text-swiss-blue" />
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              ZERO-KNOWLEDGE DICOM ROUTER
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-0.5">
              Client-Side PHI De-Identification (DICOM PS 3.15 Annex E) &amp; AES-256 Shelby Storage
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload Configuration Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="swiss-card p-6 space-y-5">
            <h3 className="font-bold text-white text-sm tracking-tight border-b border-surface-border pb-3 flex items-center">
              <UploadCloud className="w-4 h-4 mr-2 text-swiss-blue" />
              SELECT MEDICAL DICOM FILE
            </h3>

            {/* Simulated Drag & Drop Zone */}
            <div className="border-2 border-dashed border-surface-border p-6 text-center bg-black/30 hover:border-swiss-blue transition cursor-pointer space-y-2">
              <FileCode className="w-10 h-10 mx-auto text-swiss-teal" />
              <div className="font-mono text-xs text-white font-bold">{fileName}</div>
              <div className="font-mono text-[11px] text-neutral-500">
                {(fileSizeBytes / (1024 * 1024)).toFixed(0)} MB // DICOM Medical Image Payload
              </div>
            </div>

            {/* Modality & Body Part Dropdowns */}
            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <label className="text-neutral-400 block mb-1 font-bold">MODALITY</label>
                <select
                  value={modality}
                  onChange={(e: any) => setModality(e.target.value)}
                  className="w-full bg-surface border border-surface-border p-2 text-white focus:border-swiss-blue outline-none"
                >
                  <option value="MRI">MRI (Magnetic Resonance)</option>
                  <option value="CT">CT (Computed Tomography)</option>
                  <option value="XRAY">X-RAY Radiograph</option>
                  <option value="ULTRASOUND">Ultrasound Sonogram</option>
                  <option value="PET">PET Scan</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1 font-bold">BODY PART</label>
                <select
                  value={bodyPart}
                  onChange={(e) => setBodyPart(e.target.value)}
                  className="w-full bg-surface border border-surface-border p-2 text-white focus:border-swiss-blue outline-none"
                >
                  <option value="BRAIN">Brain / Head</option>
                  <option value="CHEST">Chest / Lung</option>
                  <option value="SPINE">Spine / Lumbar</option>
                  <option value="CARDIAC">Heart / Cardiac</option>
                  <option value="ABDOMEN">Abdomen / Pelvis</option>
                </select>
              </div>
            </div>

            {/* Retention Expiration Policy */}
            <div className="font-mono text-xs space-y-2">
              <label className="text-neutral-400 block font-bold">SHELBY RETENTION POLICY</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRetentionYears(5)}
                  className={`p-3 border text-left transition ${
                    retentionYears === 5
                      ? "bg-swiss-blue/20 border-swiss-blue text-white"
                      : "border-surface-border text-neutral-400"
                  }`}
                >
                  <div className="font-bold">5 YEARS</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Short-Term Records</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRetentionYears(100)}
                  className={`p-3 border text-left transition ${
                    retentionYears === 100
                      ? "bg-swiss-teal/20 border-swiss-teal text-white"
                      : "border-surface-border text-neutral-400"
                  }`}
                >
                  <div className="font-bold text-swiss-teal">INFINITE (LIFETIME)</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Permanent Archive</div>
                </button>
              </div>
            </div>

            {/* Execute Button */}
            <button
              disabled={isProcessing}
              onClick={handleStartUpload}
              className="w-full py-3.5 bg-swiss-blue hover:bg-blue-600 text-white font-mono font-bold text-sm tracking-wider uppercase transition shadow-lg shadow-swiss-blue/20 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>EXECUTING ZK ROUTER FLOW...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>DISPATCH TO SHELBY NETWORK</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Execution Live Pipeline Progress */}
        <div className="lg:col-span-6 space-y-6">
          <div className="swiss-card p-6 space-y-5 font-mono">
            <h3 className="font-bold text-white text-sm tracking-tight border-b border-surface-border pb-3 flex items-center">
              <Lock className="w-4 h-4 mr-2 text-swiss-teal" />
              PIPELINE EXECUTION STATUS
            </h3>

            {/* Step Indicators */}
            <div className="space-y-3 text-xs">
              {/* Step 1 */}
              <div
                className={`p-3 border flex items-center justify-between ${
                  step === "SCRUBBING"
                    ? "bg-swiss-blue/20 border-swiss-blue text-white"
                    : step === "ENCRYPTING" || step === "SHELBY_UPLOAD" || step === "COMPLETE"
                    ? "bg-black/40 border-emerald-500/50 text-emerald-400"
                    : "border-surface-border text-neutral-500"
                }`}
              >
                <span className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  1. PHI DE-IDENTIFICATION (PS 3.15)
                </span>
                {step === "SCRUBBING" && <span className="animate-pulse">SCRUBBING...</span>}
                {(step === "ENCRYPTING" || step === "SHELBY_UPLOAD" || step === "COMPLETE") && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>

              {/* Step 2 */}
              <div
                className={`p-3 border flex items-center justify-between ${
                  step === "ENCRYPTING"
                    ? "bg-swiss-blue/20 border-swiss-blue text-white"
                    : step === "SHELBY_UPLOAD" || step === "COMPLETE"
                    ? "bg-black/40 border-emerald-500/50 text-emerald-400"
                    : "border-surface-border text-neutral-500"
                }`}
              >
                <span className="flex items-center">
                  <Key className="w-4 h-4 mr-2" />
                  2. CLIENT AES-256-GCM ENCRYPTION
                </span>
                {step === "ENCRYPTING" && <span className="animate-pulse">ENCRYPTING...</span>}
                {(step === "SHELBY_UPLOAD" || step === "COMPLETE") && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>

              {/* Step 3 */}
              <div
                className={`p-3 border space-y-2 ${
                  step === "SHELBY_UPLOAD"
                    ? "bg-swiss-blue/20 border-swiss-blue text-white"
                    : step === "COMPLETE"
                    ? "bg-black/40 border-emerald-500/50 text-emerald-400"
                    : "border-surface-border text-neutral-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Database className="w-4 h-4 mr-2" />
                    3. SHELBY 10+6 PLACEMENT GROUP DISPATCH
                  </span>
                  {step === "SHELBY_UPLOAD" && <span>{uploadProgress}%</span>}
                  {step === "COMPLETE" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>

                {step === "SHELBY_UPLOAD" && (
                  <div className="w-full bg-black h-2 overflow-hidden">
                    <div
                      className="bg-swiss-blue h-full transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>

            {/* Output Result Card when Complete */}
            {step === "COMPLETE" && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 text-xs space-y-2 text-emerald-300">
                <div className="font-bold flex items-center text-white">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-400" />
                  SUCCESSFULLY DISPATCHED TO SHELBY NETWORK
                </div>
                <div>BLOB URI: <span className="text-white font-bold">{resultBlobUri}</span></div>
                <div>APTOS TX HASH: <span className="text-white font-bold">{resultTxHash}</span></div>
                <div className="pt-2 border-t border-emerald-500/30 flex justify-end">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className="px-3 py-1.5 bg-emerald-500 text-black font-bold text-[11px] hover:bg-emerald-400 transition"
                  >
                    LAUNCH IN PACS VIEWER &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* De-identified Scrubbed Headers Preview */}
            {deidentifiedTags.length > 0 && (
              <div className="space-y-2">
                <div className="text-neutral-400 text-xs font-bold">PHI SCRUBBED TAGS AUDIT</div>
                <div className="p-3 bg-black/40 border border-surface-border text-[11px] space-y-1 max-h-40 overflow-y-auto">
                  {deidentifiedTags.map((t) => (
                    <div key={t.tag} className="flex justify-between border-b border-white/5 py-1">
                      <span className="text-neutral-500">{t.tag} {t.name}</span>
                      <span className="text-emerald-400 font-bold">{t.anonymizedValue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
