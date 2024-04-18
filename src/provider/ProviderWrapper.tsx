'use client'

import { ChakraProvider } from '@chakra-ui/react'
import WalletAdapter from './WalletAdapter'
import theme from '@/config/Theme'

export function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WalletAdapter>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </WalletAdapter>
  )
}