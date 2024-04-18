import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'cpb, sans-serif',
    body: 'cp, sans-serif',
    cpel: 'cpel',
    cpl: 'cpl',
    cp: 'cp',
    cpb: 'cpb',
    cpblack: 'cpblack',
  },
  colors: {
    border: '#012BBE',
    gradient: {
      from: '#0097FE',
      to: '#14358A'
    },
    dark: {
      bg: '#111314',
      text: 'var(--chakra-colors-cyan-300)',
      border: 'var(--chakra-colors-gray-400)'
    },
    light: {
      bg: '#F3F3F3',
      text: 'var(--chakra-colors-blue-500)',
      border: 'var(--chakra-colors-blackAlpha-400)'
    }
  }
})

export default theme