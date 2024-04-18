"use client"
import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Box, useColorModeValue } from '@chakra-ui/react'

export default function DefaultLayout({ children }: any) {
    const bg = useColorModeValue('light.bg', 'dark.bg');
    return (
        <Box background={bg}>
            <Header />
            {children}
            <Footer />
        </Box>
    )
}
