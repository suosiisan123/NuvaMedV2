# Contributing to NuvaMed Health Exchange

Thank you for your interest in contributing to NuvaMed! We welcome contributions from developers, radiologists, medical AI researchers, and Web3 enthusiasts.

---

## 🛠️ Development Setup

1. **Fork & Clone the Repository**
   ```bash
   git clone https://github.com/suosiisan123/NuvaMedV2.git
   cd NuvaMedV2
   ```

2. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

---

## 📐 Guidelines & Architecture

- **Design System**: Follow the Swiss International Design System tokens defined in `tailwind.config.ts` and `src/app/globals.css`.
- **Zero-Knowledge Privacy**: Never log or expose raw PHI data. All scrubbing logic must reside in `src/lib/crypto/dicom-deidentify.ts`.
- **TypeScript**: Ensure strict typing without using `any`. Run `npx tsc --noEmit` before submitting PRs.
- **Commit Messages**: Use conventional commits (`feat:`, `fix:`, `docs:`, `chore:`).

---

## 🔀 Submitting Pull Requests

1. Create a feature branch (`git checkout -b feat/my-feature`).
2. Verify production build locally (`npx next build`).
3. Push your branch and open a Pull Request against `main`.
