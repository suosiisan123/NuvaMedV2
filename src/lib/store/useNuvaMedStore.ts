import { create } from "zustand";
import { DerivedIdentity } from "../bridge/aip113-account";

export type UserRole = "HOSPITAL" | "DOCTOR" | "RESEARCHER" | "PATIENT";
export type ActiveTab = "dashboard" | "router" | "micropayments" | "identity" | "pacs" | "audit";

export interface DicomStudyRecord {
  id: string;
  studyInstanceUid: string;
  anonymizedPatientId: string;
  hospitalName: string;
  modality: 'MRI' | 'CT' | 'XRAY' | 'ULTRASOUND' | 'PET';
  bodyPart: string;
  studyDescription: string;
  fileSizeBytes: number;
  blobUri: string;
  txHash: string;
  merkleRoot: string;
  retentionYears: number;
  encryptionKeyBase64?: string;
  isMarketListed: boolean;
  pricePerMB: number;
  uploadedAt: string;
}

export interface ReadSessionState {
  sessionToken: string | null;
  balanceUSDC: number;
  totalMBStreamed: number;
  activeBytesPerSec: number;
  isStreaming: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorAddress: string;
  action: 'UPLOAD' | 'DECRYPT' | 'PURCHASE_STREAM' | 'PACS_EXPORT' | 'KEY_REVOKE' | 'PACS_SYNC';
  studyId: string;
  details: string;
  txHash?: string;
}

interface NuvaMedState {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  userRole: UserRole;
  setUserRole: (role: UserRole) => void;

  connectedAddress: string | null;
  setConnectedAddress: (addr: string | null) => void;

  derivedIdentity: DerivedIdentity | null;
  setDerivedIdentity: (identity: DerivedIdentity | null) => void;

  readSession: ReadSessionState;
  updateReadSession: (updater: Partial<ReadSessionState>) => void;

  studies: DicomStudyRecord[];
  addStudy: (study: DicomStudyRecord) => void;

  auditLogs: AuditLogEntry[];
  addAuditLog: (entry: Omit<AuditLogEntry, "id" | "timestamp">) => void;

  selectedStudyForViewer: DicomStudyRecord | null;
  setSelectedStudyForViewer: (study: DicomStudyRecord | null) => void;
}

// Initial Mock Seed Data for Demonstration & Instant Polish
const initialStudies: DicomStudyRecord[] = [
  {
    id: "study-001",
    studyInstanceUid: "2.25.18492049182940294104921",
    anonymizedPatientId: "NUVAMED-ANON-88A92F1C",
    hospitalName: "Metropolitan General Hospital",
    modality: "MRI",
    bodyPart: "BRAIN",
    studyDescription: "Brain T2-FLAIR High Resolution 3D MRI",
    fileSizeBytes: 420 * 1024 * 1024, // 420 MB
    blobUri: "0x894a...291f/studies/brain_mri_3d_001.dcm",
    txHash: "0x7f201048bca29d10e8829910ab392c10f8832a10",
    merkleRoot: "0x3f1a4e5c6b7d8e9f0a1b2c3d4e5f6a7b",
    retentionYears: 100, // Infinite lifetime retention
    isMarketListed: true,
    pricePerMB: 0.005,
    uploadedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "study-002",
    studyInstanceUid: "2.25.99281048102948291048201",
    anonymizedPatientId: "NUVAMED-ANON-1049B7E3",
    hospitalName: "St. Jude Cardiac Center",
    modality: "CT",
    bodyPart: "CHEST",
    studyDescription: "Cardiac Angiography Contrast CT Scan",
    fileSizeBytes: 850 * 1024 * 1024, // 850 MB
    blobUri: "0x894a...291f/studies/chest_ct_cardiac_002.dcm",
    txHash: "0x9810ab392c10f8832a107f201048bca29d10e882",
    merkleRoot: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d",
    retentionYears: 5,
    isMarketListed: true,
    pricePerMB: 0.005,
    uploadedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "study-003",
    studyInstanceUid: "2.25.77382049102938491028301",
    anonymizedPatientId: "NUVAMED-ANON-77C104FA",
    hospitalName: "Mayo Orthopedic Institute",
    modality: "XRAY",
    bodyPart: "SPINE",
    studyDescription: "Lumbar Spine Lateral & AP Digital Radiograph",
    fileSizeBytes: 65 * 1024 * 1024, // 65 MB
    blobUri: "0x894a...291f/studies/spine_xray_lumbar_003.dcm",
    txHash: "0x29d10e8829910ab392c10f8832a107f201048bca",
    merkleRoot: "0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e",
    retentionYears: 5,
    isMarketListed: false,
    pricePerMB: 0.005,
    uploadedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

const initialLogs: AuditLogEntry[] = [
  {
    id: "log-1",
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    actorAddress: "0x894a...291f",
    action: "UPLOAD",
    studyId: "study-001",
    details: "Zero-Knowledge DICOM upload completed. 42 Chunksets written across Placement Group #14.",
    txHash: "0x7f201048bca29d10e8829910ab392c10f8832a10",
  },
  {
    id: "log-2",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    actorAddress: "0x3f12...a901",
    action: "PURCHASE_STREAM",
    studyId: "study-001",
    details: "AI Research Institute opened off-chain read session. Streamed 420 MB via DoubleZero fiber.",
  },
];

export const useNuvaMedStore = create<NuvaMedState>((set) => ({
  activeTab: "dashboard",
  setActiveTab: (tab) => set({ activeTab: tab }),

  userRole: "HOSPITAL",
  setUserRole: (role) => set({ userRole: role }),

  connectedAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  setConnectedAddress: (addr) => set({ connectedAddress: addr }),

  derivedIdentity: {
    sourceChain: "EVM",
    originalAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    aptosDerivedAddress: "0x894a91f04b28d9c02e11894a76291f00ab948210bc781048bca29d10e8829910",
    derivedNamespace: "0x894a...9910/nuvamed/studies",
    verificationHash: "0xa1b2c3d4e5f6",
    authenticatedAt: new Date().toISOString(),
    isGaslessEnabled: true,
  },
  setDerivedIdentity: (identity) => set({ derivedIdentity: identity }),

  readSession: {
    sessionToken: "shelby_sess_a89104b29c1048b29104",
    balanceUSDC: 25.0,
    totalMBStreamed: 1420.5,
    activeBytesPerSec: 0,
    isStreaming: false,
  },
  updateReadSession: (updater) =>
    set((state) => ({
      readSession: { ...state.readSession, ...updater },
    })),

  studies: initialStudies,
  addStudy: (study) => set((state) => ({ studies: [study, ...state.studies] })),

  auditLogs: initialLogs,
  addAuditLog: (entry) =>
    set((state) => ({
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          ...entry,
        },
        ...state.auditLogs,
      ],
    })),

  selectedStudyForViewer: initialStudies[0],
  setSelectedStudyForViewer: (study) => set({ selectedStudyForViewer: study }),
}));
