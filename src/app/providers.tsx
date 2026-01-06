"use client";

import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { NextUIProvider } from "@nextui-org/react";
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <NuqsAdapter>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store} stabilityCheck="never">
            {mounted && children}
          </Provider>
        </QueryClientProvider>
      </NextUIProvider>
    </NuqsAdapter>
  );
}
