# Security Policy & Vulnerability Disclosure

## Supported Versions

NuvaMed takes medical data privacy and cryptographic security seriously.

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |

---

## 🔒 Security Architecture Highlights

1. **Zero-Knowledge PHI Scrubbing**: Patient Health Information (PS 3.15 Annex E) is scrubbed client-side before network transmission.
2. **Web Crypto Envelope**: Images are encrypted with Web Crypto API AES-256-GCM. Decryption keys are never stored on central servers.
3. **Shelby 10+6 Clay Codes**: Encoded blob chunks are distributed across 16 Cavalier Storage Provider placement groups.

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability or potential PHI leak risk within NuvaMed, please **DO NOT** open a public issue.

Instead, please email our security response team directly at:
**security@nuvamed.io**

Please include:
- A description of the vulnerability and potential impact.
- Step-by-step instructions to reproduce the issue.
- Proof-of-concept code or network payloads if available.

We pledge to acknowledge receipt within 24 hours and issue a patch within 7 days.
