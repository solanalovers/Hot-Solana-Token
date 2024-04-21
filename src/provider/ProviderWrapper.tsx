'use client';

import { ChakraProvider } from '@chakra-ui/react';
import WalletAdapter from './WalletAdapter';
import theme from '@/config/Theme';
import { createContext, useState } from 'react';
export const AppContext = createContext<any>({});

export function ProviderWrapper({ children }: { children: React.ReactNode }) {
  const [isMainnet, setIsMainnet] = useState(true);

  return (
    <WalletAdapter>
      <ChakraProvider theme={theme}>
        <AppContext.Provider value={{ isMainnet, setIsMainnet }}>
          {children}
        </AppContext.Provider>
      </ChakraProvider>
    </WalletAdapter>
  );
}
