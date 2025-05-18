"use client";

import React, { useEffect } from "react";
import "@rainbow-me/rainbowkit/styles.css";

import {
  DisclaimerComponent,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, createConfig } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';
import { NextUIProvider } from "@nextui-org/react";


const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID ?? "";

export const CHAIN_USED = (process.env.NEXT_PUBLIC_NETWORK === 'sepolia')?sepolia:mainnet

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId,
  chains: [CHAIN_USED],
  ssr: true, // If your dApp uses server side rendering (SSR)
});


export const wagmiConfig = (process.env.NEXT_PUBLIC_NETWORK === 'sepolia')?
  createConfig({
    chains: [sepolia],
    multiInjectedProviderDiscovery: false,
    transports: {
      [sepolia.id]: http()
    }
  })
  :
  createConfig({
    chains: [mainnet],
    multiInjectedProviderDiscovery: false,
    transports: {
      [mainnet.id]: http()
    }
  })
const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and
    acknowledge you have read and understand the protocol{" "}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
);

const demoAppInfo = {
  appName: "Rainbowkit Demo",
  learnMoreUrl: "https://learnaboutcryptowallets.example",
  disclaimer: Disclaimer,
};

const queryClient = new QueryClient();


export const publicClient = createPublicClient({
  chain: CHAIN_USED,
  transport: http(),
})





export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <NextUIProvider>
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            chain={base}
            config={{ appearance: { 
              mode: 'auto',
          }
        }}
      >
          <QueryClientProvider client={queryClient}>
              <Provider store={store} stabilityCheck="never">
              
                  {mounted && children}
                
              </Provider>
          </QueryClientProvider>
        </OnchainKitProvider>
    </NextUIProvider>
  );
}
