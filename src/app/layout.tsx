import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/components/providers/Web3Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "NuvaMed | Decentralized Health Data Exchange & DICOM Network",
    template: "%s | NuvaMed Health Exchange",
  },
  description:
    "Enterprise-grade decentralized DICOM imaging network built on Shelby Protocol & Aptos L1. Zero-Knowledge PHI Scrubbing, 10+6 Clay Erasure Coding, and Sub-Second Off-Chain USDC Micropayments.",
  keywords: [
    "Shelby Protocol",
    "Aptos L1",
    "DICOM Imaging",
    "Medical Cloud Storage",
    "Zero-Knowledge PHI",
    "HIPAA Compliance",
    "Clay Erasure Coding",
    "USDC Micropayments",
    "DoubleZero Fiber",
  ],
  authors: [{ name: "NuvaMed Core Team" }],
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon/favicon-128x128.png", sizes: "128x128", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/favicon/safari-pinned-tab.svg", color: "#0047FF" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  other: {
    "msapplication-TileColor": "#0047FF",
    "theme-color": "#0047FF",
  },
  openGraph: {
    title: "NuvaMed | Decentralized Health Data Exchange",
    description:
      "Sub-second medical image streaming powered by Shelby Protocol & Aptos L1. Save -58% vs AWS S3 with zero-knowledge PHI scrubbing.",
    url: "https://nuvamed.io",
    siteName: "NuvaMed Health Exchange",
    images: [
      {
        url: "https://nuvamed.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "NuvaMed Decentralized Health Data Exchange",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NuvaMed | Decentralized DICOM Exchange",
    description:
      "Sub-second medical image streaming on Shelby Protocol & Aptos L1.",
    creator: "@NuvaMedHealth",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-neutral-100 min-h-screen selection:bg-swiss-blue selection:text-white`}
      >
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
