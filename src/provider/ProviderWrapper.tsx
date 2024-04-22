"use client";

import { ChakraProvider } from "@chakra-ui/react";
import WalletAdapter from "./WalletAdapter";
import theme from "@/config/Theme";
import { createContext, useState } from "react";
import AppAdapter from "./AppAdapter";

export function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WalletAdapter>
      <ChakraProvider theme={theme}>
        <AppAdapter>
          {children}
        </AppAdapter>
      </ChakraProvider>
    </WalletAdapter>
  );
}
