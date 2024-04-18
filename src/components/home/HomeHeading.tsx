'use client';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

export default function HomeHeading() {
    const dots = useColorModeValue('black', 'white')
    return (
        <Box>
            <Text
                fontSize={'32px'}
                lineHeight={'40px'}
                textAlign={'center'}
                fontFamily={'cpblack'}
            >
                Solana’s Leading MEME Coin Economy
            </Text>
            <Flex columnGap={'12px'} alignItems={'center'} justifyContent={'center'} marginTop={'8px'}>
                <Text
                    fontSize={'14px'}
                    lineHeight={'22px'}
                >
                    FASTEST DATA
                </Text>
                <Box
                    width={'5px'}
                    height={'5px'}
                    borderRadius={999}
                    bg={dots}
                />
                <Text
                    fontSize={'14px'}
                    lineHeight={'22px'}
                >
                    DEEPEST LIQUIDITY
                </Text>
                <Box
                    width={'5px'}
                    height={'5px'}
                    borderRadius={999}
                    bg={dots}
                />
                <Text
                    fontSize={'14px'}
                    lineHeight={'22px'}
                >
                    FUN REWARDS
                </Text>
            </Flex>
        </Box>
    )
}
