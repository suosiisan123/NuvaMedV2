# NuvaMed Health Exchange (v2)

**Decentralized Medical Imaging (DICOM) & Health Data Exchange Network**

Built on **Shelby Protocol** (10+6 Clay Erasure Coding) & **Aptos L1 Blockchain**.

---

## 🚀 Key Features

* **Zero-Knowledge DICOM Router**: Client-side DICOM PS 3.15 Annex E scrubbing engine. Removes PHI attributes before Web Crypto AES-256-GCM encryption.
* **AI Medical Micropayments Engine**: Streaming byte-range datasets over DoubleZero private fiber infrastructure with optimistic per-MB USDC billing.
* **Cross-Chain Identity Bridge (AIP-113)**: Aptos Derivable Account Abstraction mapping EVM and Solana wallets to gasless Aptos account namespaces.
* **Legacy PACS S3 Gateway Proxy**: Standard `/api/s3/[...path]` proxy allowing GE Healthcare, Siemens, Horos, and OsiriX workstations to store directly to Shelby Placement Groups.
* **Swiss International Design System**: High-density dark mode, responsive layout, Cmd+K command palette, and real-time telemetry.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Styling**: TailwindCSS, Swiss International Color System
- **State Management**: Zustand
- **Web3**: RainbowKit v2, Wagmi v2, `@aptos-labs/ts-sdk`, `@shelby-xyz/sdk`
- **Crypto & Medical**: Web Crypto API (AES-256-GCM), `dicom-parser`

---

## 💻 Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Build for production
npx next build
```

---

## 📄 License
MIT License - Built for Shelby Protocol & Aptos L1 Ecosystem.
