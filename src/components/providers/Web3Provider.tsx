"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia, arbitrum, base, polygon, optimism } from "wagmi/chains";
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

// Official RainbowKit v2 standard configuration
const config = getDefaultConfig({
  appName: "NuvaMed Health Exchange",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "3a817088523f27774921f058229b4700",
  chains: [mainnet, sepolia, base, arbitrum, polygon, optimism],
  ssr: true,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          coolMode
          theme={darkTheme({
            accentColor: "#0047FF", // Swiss Blue accent
            accentColorForeground: "white",
            borderRadius: "none", // Crisp Swiss International borders
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
