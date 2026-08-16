# NuvaMed Health Exchange 🏥⚡

> **Enterprise-Grade Decentralized Medical Imaging (DICOM) & Health Data Exchange Built on Shelby Protocol & Aptos L1**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.23-black)](https://nextjs.org/)
[![Shelby Protocol](https://img.shields.io/badge/Storage-Shelby_10%2B6_Clay-0047FF)](https://shelby.xyz)
[![Aptos L1](https://img.shields.io/badge/Settlement-Aptos_L1_AIP--113-00C7BE)](https://aptoslabs.com)
[![Build Status](https://img.shields.io/badge/Build-Passing-emerald)](https://github.com/suosiisan123/NuvaMedV2)

---

## 30-Second Elevator Pitch

Traditional Web2 healthcare storage forces hospitals into expensive cloud lock-in ($0.023/GB/mo AWS S3 plus $0.09/GB egress fees) while leaving plaintext patient health information (PHI) vulnerable to ransomware.

**NuvaMed** revolutionizes medical data exchange:
1. **Scrubs PHI client-side** using Zero-Knowledge DICOM PS 3.15 Annex E standards.
2. **Encodes images with 10+6 Clay Erasure Codes** onto 16 Cavalier Storage Provider placement groups on **Shelby Protocol** ($0.005/GB/mo — **-58% savings**).
3. **Monetizes research datasets** via sub-second off-chain USDC micropayments streamed over **DoubleZero private fiber infrastructure** (<1.4ms SLA).

---

## ⚡ Core Technical Features

- 🛡️ **Zero-Knowledge DICOM Router**: Client-side scrubbing of Patient Name, DOB, MRN, and Institution prior to Web Crypto AES-256-GCM encryption.
- ⚡ **AI Medical Micropayments Engine**: Per-MB optimistic off-chain USDC read sessions ($0.005/MB) for medical AI dataset training without per-chunk block waits.
- 🌉 **AIP-113 Account Abstraction Bridge**: Derives gasless Aptos account namespaces from EVM (MetaMask/RainbowKit) and Solana wallet signatures.
- 📡 **Legacy PACS S3 Gateway Proxy**: Standard S3 REST endpoint (`/api/s3/[...path]`) enabling legacy GE Healthcare, Siemens Syngo, and OsiriX PACS workstations to store directly to Shelby.
- 🎨 **Swiss International Design System**: High-density dark UI, responsive grid, Cmd+K command palette, and real-time telemetry pill.

---

## 🏗️ Architecture & Data Flow

```
[ Hospital PACS Workstation ] 
          │ (S3 PUT / API Drop)
          ▼
[ Client Browser Web Worker ] ──► (Scrub PHI Tags: DICOM PS 3.15 Annex E)
          │
          ▼
[ Web Crypto AES-256-GCM ] ──► (Encrypt Image Buffer with Envelope Key)
          │
          ▼
[ Shelby SDK Placement Group ] ──► (10 Data + 6 Parity Clay Erasure Encoding)
          │
          ├──────────────────────────┬──────────────────────────┐
          ▼                          ▼                          ▼
[ Cavalier SP Node 1 ]     [ Cavalier SP Node 2 ]    ... [ Cavalier SP Node 16 ]
          │
          ▼
[ DoubleZero Fiber SLA ] ──► (<1.4ms Byte-Range Stream to AI Research Labs)
```

---

## 💻 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (React 19) | Server-Side Rendering, App Router |
| **Storage Engine** | Shelby Protocol (`@shelby-xyz/sdk`) | 10+6 Clay Erasure Coded Blob Storage |
| **L1 Settlement** | Aptos L1 (`@aptos-labs/ts-sdk`) | Smart Contract Accounts & AIP-113 Bridge |
| **Web3 Identity** | RainbowKit v2, Wagmi v2, Ethers | Multi-Chain EVM & Solana Connectors |
| **Cryptography** | Web Crypto API, `dicom-parser` | Client-Side AES-256-GCM & DICOM Scrubbing |
| **Networking** | DoubleZero Private Fiber | Low-Latency (<1.4ms SLA) Streaming |
| **Design System** | Swiss International Style | Dark Mode, High Contrast (#0047FF, #00C7BE) |

---

## 🚀 Quick Start & Installation

Clone the repository and launch the local environment in seconds:

```bash
# 1. Clone the repository
git clone https://github.com/suosiisan123/NuvaMedV2.git
cd NuvaMedV2

# 2. Install dependencies (Node.js 18+ required)
npm install --legacy-peer-deps

# 3. Configure environment variables
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the NuvaMed MVP.

---

## 📁 Repository Structure

```text
NuvaMedV2/
├── public/
│   ├── favicon/                 # Production Retina favicon suite & webmanifest
│   ├── favicon.ico              # Multi-resolution fallback icon
│   ├── robots.txt               # SEO Crawler directives
│   └── sitemap.xml              # Dynamic search sitemap
├── src/
│   ├── app/                     # Next.js 15 App Router pages & endpoints
│   │   ├── api/s3/[...path]/    # Legacy PACS S3 Proxy API gateway
│   │   ├── about/               # Mission, origin story, and technical vision
│   │   ├── app/                 # Main Application Workspace (6 Core Modules)
│   │   ├── contact/             # Inquiry, Bug Report & Feature Request form
│   │   ├── docs/                # Developer SDK & Erasure Coding documentation
│   │   ├── faq/                 # Real-time searchable FAQ knowledge base
│   │   ├── privacy/             # HIPAA & Zero-Knowledge Privacy Policy
│   │   ├── terms/               # Protocol Terms of Service
│   │   ├── error.tsx            # Production Error Boundary
│   │   ├── not-found.tsx        # Production 404 Fallback UI
│   │   ├── layout.tsx           # Master Root Layout & Metadata
│   │   └── page.tsx             # Master Tier-1 Startup Landing Page
│   ├── components/
│   │   ├── dicom/               # Interactive 2D/3D DICOM PACS Viewer
│   │   ├── floating/            # Command Palette (Cmd+K) & Telemetry Pill
│   │   ├── layout/              # Header, Footer, and Workspace Sidebar
│   │   ├── modules/             # 6 Workspace Modules (Router, Micropayments...)
│   │   └── providers/           # RainbowKit v2 & TanStack Query Providers
│   └── lib/
│       ├── bridge/              # AIP-113 Aptos Account Abstraction Bridge
│       ├── crypto/              # ZK DICOM De-identify & Web Crypto AES-256
│       ├── shelby/              # Shelby SDK Client Wrapper & Fiber Configs
│       └── store/               # Zustand Global Application State
├── .env.example                 # Documented environment variable template
├── .gitignore                   # Production Git exclusion rules
├── CONTRIBUTING.md              # Open-source contribution guidelines
├── LICENSE                      # MIT Open-Source License
└── SECURITY.md                  # Security & vulnerability disclosure policy
```

---

## 🔧 Build & Code Quality Verification

```bash
# Verify TypeScript strict type compilation
npx tsc --noEmit

# Run Next.js linter
npm run lint

# Build production bundle
npm run build
```

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details. Built for the Shelby Protocol & Aptos L1 Ecosystem.
