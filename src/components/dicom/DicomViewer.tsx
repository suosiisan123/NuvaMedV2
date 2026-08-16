"use client";

import React, { useState, useRef, useEffect } from "react";
import { DicomStudyRecord } from "@/lib/store/useNuvaMedStore";
import {
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sun,
  Ruler,
  ShieldCheck,
  Download,
  Key,
  Eye,
  Lock,
  Layers,
} from "lucide-react";

interface DicomViewerProps {
  study: DicomStudyRecord;
  onDecrypt?: () => void;
}

export function DicomViewer({ study, onDecrypt }: DicomViewerProps) {
  const [sliceIndex, setSliceIndex] = useState(14);
  const totalSlices = 36;
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [windowWidth, setWindowWidth] = useState(400);
  const [windowCenter, setWindowCenter] = useState(40);
  const [isInverted, setIsInverted] = useState(false);
  const [isDeidentified, setIsDeidentified] = useState(true);
  const [isDecrypted, setIsDecrypted] = useState(true);
  const [showMetadata, setShowMetadata] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Draw procedural DICOM slice simulation onto HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = isInverted ? "#FFFFFF" : "#05060A";
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(zoomLevel, zoomLevel);
    ctx.translate(-width / 2, -height / 2);

    if (study.modality === "MRI" || study.modality === "CT") {
      // Brain / Chest Anatomical Slice Rendering Simulation
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = 140 + Math.sin(sliceIndex / 4) * 8;

      // Outer Skull Contour
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius, radius * 1.15, 0, 0, Math.PI * 2);
      ctx.strokeStyle = isInverted ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.85)";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Brain Parenchyma Tissue Rings
      for (let r = 20; r < radius - 15; r += 12) {
        ctx.beginPath();
        const numLobes = 8 + (r % 5);
        for (let a = 0; a <= Math.PI * 2; a += 0.05) {
          const distortion = Math.sin(a * numLobes + sliceIndex) * 6;
          const x = centerX + (r + distortion) * Math.cos(a);
          const y = centerY + (r + distortion) * 1.15 * Math.sin(a);
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        const alpha = Math.min(0.7, (r / radius) * (windowWidth / 600));
        ctx.fillStyle = isInverted
          ? `rgba(0,0,0,${alpha})`
          : `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }

      // Ventricles / Tumor lesion highlight
      ctx.beginPath();
      ctx.ellipse(centerX - 25, centerY - 10, 18, 35, -0.3, 0, Math.PI * 2);
      ctx.ellipse(centerX + 25, centerY - 10, 18, 35, 0.3, 0, Math.PI * 2);
      ctx.fillStyle = isInverted ? "rgba(255,255,255,0.9)" : "rgba(0, 199, 190, 0.45)";
      ctx.fill();
      ctx.strokeStyle = "#00C7BE";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else {
      // Radiograph X-Ray Ribcage Rendering
      const centerX = width / 2;
      const centerY = height / 2;
      ctx.strokeStyle = isInverted ? "#000" : "#FFF";
      ctx.lineWidth = 3;

      for (let i = -4; i <= 4; i++) {
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + i * 35, 120, 25, 0, 0, Math.PI);
        ctx.stroke();
      }
    }

    ctx.restore();

    // Draw HUD Grid & Orientation Labels (A, P, L, R)
    ctx.font = "12px monospace";
    ctx.fillStyle = isInverted ? "#000" : "#00C7BE";
    ctx.fillText("A (ANTERIOR)", width / 2 - 35, 20);
    ctx.fillText("P (POSTERIOR)", width / 2 - 35, height - 12);
    ctx.fillText("R", 15, height / 2);
    ctx.fillText("L", width - 25, height / 2);

    // Crosshair scale lines
    ctx.strokeStyle = "rgba(0, 199, 190, 0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2, 30);
    ctx.lineTo(width / 2, height - 30);
    ctx.moveTo(30, height / 2);
    ctx.lineTo(width - 30, height / 2);
    ctx.stroke();
  }, [sliceIndex, zoomLevel, windowWidth, windowCenter, isInverted, study.modality]);

  return (
    <div className="swiss-card border border-surface-border overflow-hidden flex flex-col h-full bg-[#05060A]">
      {/* Top Toolbar */}
      <div className="p-3 border-b border-surface-border bg-surface flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-neutral-300">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-white tracking-wider flex items-center">
            <Layers className="w-4 h-4 mr-1.5 text-swiss-teal" />
            {study.modality} VIEWER // {study.bodyPart}
          </span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-400">
            SLICE: <strong className="text-white">{sliceIndex}</strong> / {totalSlices}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
            className="p-1.5 hover:bg-white/10 text-neutral-300 hover:text-white transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
            className="p-1.5 hover:bg-white/10 text-neutral-300 hover:text-white transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsInverted((inv) => !inv)}
            className={`p-1.5 transition ${
              isInverted ? "bg-swiss-blue text-white" : "hover:bg-white/10 text-neutral-300"
            }`}
            title="Invert Grayscale"
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowMetadata((m) => !m)}
            className={`px-2 py-1 text-[11px] border font-bold transition flex items-center ${
              showMetadata
                ? "bg-swiss-teal/20 border-swiss-teal text-swiss-teal"
                : "border-surface-border text-neutral-400 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            TAGS
          </button>
        </div>
      </div>

      {/* Main Canvas View & Tag Inspector */}
      <div className="relative flex-1 flex items-center justify-center min-h-[380px] dicom-grid">
        <canvas
          ref={canvasRef}
          width={440}
          height={400}
          className="max-w-full max-h-full object-contain cursor-crosshair"
        />

        {/* Overlay Metadata Text (PACS Standard HUD) */}
        <div className="absolute top-3 left-3 font-mono text-[11px] text-swiss-teal pointer-events-none space-y-0.5 bg-black/60 p-2 border border-swiss-teal/20">
          <div>PATIENT: {isDeidentified ? study.anonymizedPatientId : "DOE^JOHN"}</div>
          <div>MODALITY: {study.modality} // {study.bodyPart}</div>
          <div>SERIES UID: {study.studyInstanceUid.substring(0, 18)}...</div>
          <div>WW: {windowWidth} | WL: {windowCenter}</div>
        </div>

        <div className="absolute bottom-3 left-3 font-mono text-[11px] text-neutral-400 pointer-events-none bg-black/60 p-2 border border-surface-border">
          <div>SHELBY BLOB: {study.blobUri.substring(0, 24)}...</div>
          <div>RETENTION: {study.retentionYears > 50 ? "INFINITE (LIFETIME)" : `${study.retentionYears} YEARS`}</div>
          <div>ENCRYPTION: AES-256-GCM (CLIENT-SIDE)</div>
        </div>

        {/* Floating Metadata Inspector Modal */}
        {showMetadata && (
          <div className="absolute inset-y-3 right-3 w-80 bg-surface/95 border border-swiss-teal/40 p-4 font-mono text-xs overflow-y-auto space-y-3 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-surface-border pb-2">
              <span className="font-bold text-swiss-teal flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1" />
                PHI SCRUBBED TAGS
              </span>
              <button
                onClick={() => setShowMetadata(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="p-2 bg-black/40 border border-surface-border">
                <div className="text-neutral-500">(0010,0010) PatientName</div>
                <div className="text-emerald-400 font-bold">[REDACTED_HIPAA_PS3.15]</div>
              </div>
              <div className="p-2 bg-black/40 border border-surface-border">
                <div className="text-neutral-500">(0010,0020) PatientID</div>
                <div className="text-white font-bold">{study.anonymizedPatientId}</div>
              </div>
              <div className="p-2 bg-black/40 border border-surface-border">
                <div className="text-neutral-500">(0008,0080) InstitutionName</div>
                <div className="text-swiss-teal">NUVAMED_VERIFIED_NODE</div>
              </div>
              <div className="p-2 bg-black/40 border border-surface-border">
                <div className="text-neutral-500">Placement Group ID</div>
                <div className="text-white">PG #14 (16 Cavalier SP Nodes)</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slice Carousel Slider Controls */}
      <div className="p-3 bg-surface border-t border-surface-border flex items-center space-x-4">
        <span className="font-mono text-xs text-neutral-400 shrink-0">AXIAL SLICE</span>
        <input
          type="range"
          min={1}
          max={totalSlices}
          value={sliceIndex}
          onChange={(e) => setSliceIndex(Number(e.target.value))}
          className="w-full accent-swiss-teal cursor-pointer"
        />
        <span className="font-mono text-xs text-swiss-teal font-bold shrink-0">
          {sliceIndex} / {totalSlices}
        </span>
      </div>
    </div>
  );
}
